/**
 * Production Client-Side Rate Limiter & Anti-Spam Protection
 */

const STORAGE_KEY = 'sr_contact_last_submission';
const DEFAULT_COOLDOWN_SECONDS = 45;

export interface RateLimitCheck {
  allowed: boolean;
  remainingSeconds: number;
}

export function checkFormRateLimit(cooldownSeconds: number = DEFAULT_COOLDOWN_SECONDS): RateLimitCheck {
  if (typeof window === 'undefined') return { allowed: true, remainingSeconds: 0 };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { allowed: true, remainingSeconds: 0 };

    const lastTime = parseInt(raw, 10);
    const elapsedSeconds = Math.floor((Date.now() - lastTime) / 1000);

    if (elapsedSeconds < cooldownSeconds) {
      return {
        allowed: false,
        remainingSeconds: cooldownSeconds - elapsedSeconds,
      };
    }

    return { allowed: true, remainingSeconds: 0 };
  } catch {
    return { allowed: true, remainingSeconds: 0 };
  }
}

export function recordFormSubmission(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  } catch {}
}

/**
 * Audio / Action throttle limiter to prevent hammering
 */
export function throttle<T extends (...args: unknown[]) => void>(fn: T, waitMs: number): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= waitMs) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

