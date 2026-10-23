//! Мини-выборочный профилировщик (SIGPROF + ITIMER_PROF) для окружений
//! без perf/valgrind (контейнеры без root).
//!
//! Принцип: таймер шлёт SIGPROF каждые `interval_us` микросекунд
//! ПРОЦЕССОРНОГО времени; хендлер читает RIP из ucontext и пишет его в
//! lock-free ring buffer (только атомики — async-signal-safe). После
//! прогона адреса символизируются внешне (tools/symbolize.py через `nm`).
//!
//! Подключение (из examples):
//! ```ignore
//! #[path = "../../../tools/sampler.rs"]
//! mod sampler;
//! ```
//!
//! Использование:
//! ```ignore
//! sampler::start(250);
//! ... горячий цикл ...
//! let (n, addrs) = sampler::stop_and_dump();
//! sampler::write_raw("prof.txt", n, &addrs);
//! ```

use std::sync::atomic::{AtomicUsize, Ordering};

const RING_CAP: usize = 1 << 17; // 131072 отсчётов (~32 мс CPU при 250 мкс)

static RING: [AtomicUsize; RING_CAP] = {
    #[allow(clippy::declare_interior_mutable_const)]
    const ZERO: AtomicUsize = AtomicUsize::new(0);
    [ZERO; RING_CAP]
};
static W_IDX: AtomicUsize = AtomicUsize::new(0);
static SAMPLES: AtomicUsize = AtomicUsize::new(0);
static ACTIVE: AtomicUsize = AtomicUsize::new(0);

extern "C" {
    fn setitimer(which: i32, new_value: *const ITimerVal, old_value: *mut ITimerVal) -> i32;
    fn sigaction(signum: i32, act: *const SigAction, old: *mut SigAction) -> i32;
}

const ITIMER_PROF: i32 = 2;
const SIGPROF: i32 = 27;

#[repr(C)]
#[derive(Clone, Copy)]
struct TimeVal {
    sec: i64,
    usec: i64,
}

#[repr(C)]
#[derive(Clone, Copy)]
struct ITimerVal {
    interval: TimeVal,
    value: TimeVal,
}

/// glibc public struct sigaction (x86_64): handler(8) + mask(128) +
/// flags(4)+pad(4) + restorer(8). glibc сама подставляет __restore_rt,
/// когда SA_RESTORER не выставлен — поле передаём нулём.
#[repr(C)]
struct SigAction {
    handler: usize,
    mask: [u64; 16],
    flags: i32,
    restorer: usize,
}

const SA_SIGINFO: i32 = 4;

unsafe extern "C" fn on_prof(_sig: i32, _info: *mut u8, ctx: *mut u8) {
    if ACTIVE.load(Ordering::Relaxed) == 0 {
        return;
    }
    // ucontext_t x86_64 (glibc): uc_flags(0..8) uc_link(8..16)
    // uc_stack(16..40) uc_mcontext(40..): gregs[0..23], REG_RIP = gregs[16]
    // => смещение RIP = 40 + 16*8 = 168 БАЙТ.
    const UC_MCONTEXT_GREGS_RIP: usize = 40 + 16 * 8;
    // ctx: *mut u8 — add() в байтах; затем приведение к *mut usize.
    let rip = ctx.add(UC_MCONTEXT_GREGS_RIP).cast::<usize>().read();
    let w = W_IDX.fetch_add(1, Ordering::Relaxed);
    RING[w % RING_CAP].store(rip, Ordering::Relaxed);
    SAMPLES.fetch_add(1, Ordering::Relaxed);
}

/// Установить хендлер и запустить профайлер (`interval_us` — микросекунды
/// CPU-времени между сэмплами).
pub fn start(interval_us: u64) {
    SAMPLES.store(0, Ordering::SeqCst);
    W_IDX.store(0, Ordering::SeqCst);
    ACTIVE.store(1, Ordering::SeqCst);
    let act = SigAction {
        handler: on_prof as unsafe extern "C" fn(i32, *mut u8, *mut u8) as usize,
        mask: [0; 16],
        flags: SA_SIGINFO,
        restorer: 0,
    };
    let it = ITimerVal {
        interval: TimeVal {
            sec: 0,
            usec: interval_us as i64,
        },
        value: TimeVal {
            sec: 0,
            usec: interval_us as i64,
        },
    };
    unsafe {
        sigaction(SIGPROF, &act, std::ptr::null_mut());
        setitimer(ITIMER_PROF, &it, std::ptr::null_mut());
    }
}

/// Остановить профайлер; вернуть (число сэмплов, адреса RIP).
pub fn stop_and_dump() -> (usize, Vec<usize>) {
    let zero = TimeVal { sec: 0, usec: 0 };
    let it = ITimerVal {
        interval: zero,
        value: zero,
    };
    unsafe {
        setitimer(ITIMER_PROF, &it, std::ptr::null_mut());
    }
    ACTIVE.store(0, Ordering::SeqCst);
    let n = SAMPLES.load(Ordering::SeqCst);
    let w = W_IDX.load(Ordering::SeqCst);
    let kept = n.min(RING_CAP);
    let mut addrs = Vec::with_capacity(kept);
    let start = w.saturating_sub(kept);
    for k in start..w {
        let a = RING[k % RING_CAP].load(Ordering::Relaxed);
        if a != 0 {
            addrs.push(a);
        }
    }
    (addrs.len(), addrs)
}

/// Слить адреса в файл (по одному hex-адресу на строку).
pub fn write_raw(path: &str, addrs: &[usize]) {
    use std::fmt::Write as _;
    let mut s = String::with_capacity(addrs.len() * 16);
    for &a in addrs {
        let _ = writeln!(s, "{a:#x}");
    }
    std::fs::write(path, s).expect("write raw profile");
}
