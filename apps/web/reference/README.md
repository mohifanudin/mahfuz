# Quran text provenance

The numbered ayat use **Tanzil Quran Text (Uthmani, version 1.1)**, from the [official download](https://tanzil.net/download/), with pause marks enabled and optional sajdah/rub-el-hizb markers, tatweel, and sequential tanween disabled. Sajdah is already represented by separate reading metadata.

Copyright © 2007–2026 Tanzil Project. License: Creative Commons Attribution 3.0. The Quran text must be copied verbatim; it may not be changed. The original file and its copyright notice are included here. See [Tanzil text license](https://tanzil.net/docs/Text_License) and [updates](https://tanzil.net/updates/).

The app separates the opening unnumbered bismillah from ayah 1 in surahs 2–114 (except At-Taubah); no text within a numbered ayah is synthesized. Run `pnpm --filter @mahfuz/web exec tsx scripts/verify-uthmani.ts` to compare all 6,236 numbered ayat, including harakat, word spaces and pause marks, to the original Tanzil text.
