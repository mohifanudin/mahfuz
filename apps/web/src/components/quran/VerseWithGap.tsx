import type { ReactNode } from "react";

/** Preserve real inter-word spaces. Adjacent inline spans alone can cause
 * Arabic shaping to join separate Qur'an words. Keep the original tokens
 * intact, including their diacritics and pause marks. */
export function VerseWithGap({ words, blankIndex, gap }: {
  words: readonly string[];
  blankIndex: number;
  gap: ReactNode;
}) {
  const before = words.slice(0, blankIndex).join(" ");
  const after = words.slice(blankIndex + 1).join(" ");
  return <>{before && `${before} `}{gap}{after && ` ${after}`}</>;
}
