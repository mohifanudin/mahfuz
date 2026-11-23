/** Shape shared by the dynamic game. Do not hardcode or abbreviate Qur'an
 * text in question data; all ayat come from the verified Uthmani corpus. */
export interface ChainQuestion {
  currentVerse: {
    verseKey: string;
    surahName: string;
    textUthmani: string;
    lastWordArabic: string;
  };
  options: {
    verseKey: string;
    surahName: string;
    textUthmani: string;
    firstWords: string;
    isCorrect: boolean;
  }[];
  correctIndex: number;
}
