import { useCallback, useEffect, useRef, useState } from "react";

/** Wall-clock countdown for games that previously had no common timer. */
export function useRoundCountdown(seconds: number, active: boolean) {
  const [remainingMs, setRemainingMs] = useState(seconds * 1000);
  const remaining = useRef(seconds * 1000);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (!active || remaining.current <= 0) return;
    const deadline = performance.now() + remaining.current;
    const tick = () => { remaining.current = Math.max(0, deadline - performance.now()); setRemainingMs(remaining.current); };
    tick();
    const interval = window.setInterval(tick, 200);
    return () => window.clearInterval(interval);
  }, [active, version]);
  const reset = useCallback(() => { remaining.current = seconds * 1000; setRemainingMs(remaining.current); setVersion(v => v + 1); }, [seconds]);
  const left = Math.ceil(remainingMs / 1000);
  return { display: `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`, progress: remainingMs / (seconds * 1000), expired: remainingMs <= 0, elapsedMs: Math.round(seconds * 1000 - remainingMs), reset };
}
