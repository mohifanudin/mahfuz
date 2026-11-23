/** Regression test for Arabic word boundaries and gap games. */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { splitWords } from "../src/lib/split-words";
import { VerseWithGap } from "../src/components/quran/VerseWithGap";

let checked = 0;
for (let surah = 1; surah <= 114; surah++) {
  const rows: { verses: { v: number; t: string }[] } = JSON.parse(readFileSync(resolve(import.meta.dirname, `../public/quran/uthmani/${surah}.json`), "utf8"));
  for (const ayah of rows.verses) {
    const words = splitWords(ayah.t);
    const normalizeSpacing = (s: string) => s.replace(/\u00a0/g, " ");
    if (normalizeSpacing(words.join(" ")) !== ayah.t) throw new Error(`Word split mismatch ${surah}:${ayah.v}`);
    // Every possible gap position must preserve the surrounding word spaces
    // and reproduce the exact canonical verse when the correct word is shown.
    for (let i = 0; i < words.length; i++) {
      const markup = renderToStaticMarkup(createElement(VerseWithGap, { words, blankIndex: i, gap: createElement("span", null, words[i]) }));
      const text = markup.replace(/<\/?span>/g, "").replace(/<!-- -->/g, "");
      if (normalizeSpacing(text) !== ayah.t) throw new Error(`Game rendering mismatch $${surah}:${ayah.v} word ${i + 1}`);
      checked++;
    }
  }
}
console.log(`Verified ${checked} possible word-gap positions across all 6,236 ayat.`);
