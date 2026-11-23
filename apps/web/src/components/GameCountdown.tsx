export function GameCountdown({ display, progress }: { display: string; progress: number }) {
  return <div className={`game-countdown ${progress < .18 ? "game-countdown-low" : ""}`} role="timer" aria-label={`Sisa waktu ${display}`}><span aria-hidden="true">◷</span><span>Sisa waktu</span><strong>{display}</strong><span className="game-countdown-track" aria-hidden="true"><i style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }} /></span></div>;
}
