/** Tanzil Quran Text Uthmani v1.1; see https://tanzil.net/download/. */
const BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
const JOINED_BISMILLAH = "بِّسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

/** The unnumbered header is kept separate from the numbered ayah. */
export function getUthmaniBismillah(surahId?: number): string {
  return surahId === 95 || surahId === 97 ? JOINED_BISMILLAH : BISMILLAH;
}
