/**
 * Compare all 6,236 ayat byte-for-byte with the official Tanzil Quran Text.
 * Download Uthmani, text with ayah numbers, pause marks enabled, sajdah,
 * rub-el-hizb, and optional tatweel/sequential tanween disabled from:
 * https://tanzil.net/download/
 * Tanzil Quran Text (Uthmani, version 1.1), copyright Tanzil Project,
 * CC BY 3.0; its text may not be modified: https://tanzil.net/docs/Text_License
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { openSeedClient } from "./remote-db";
import { getUthmaniBismillah } from "../src/lib/uthmani-text";

const flags = new Set(process.argv.slice(2).filter(a => a.startsWith("--")));
const referencePath = process.argv.slice(2).find(a => !a.startsWith("--")) ?? resolve(import.meta.dirname, "../reference/quran-uthmani-tanzil-1.1.txt");

const ref = new Map<string, string>();
for (const line of readFileSync(referencePath, "utf8").split(/\r?\n/)) {
  const match = /^(\d+)\|(\d+)\|(.*)$/.exec(line);
  if (match) {
    const key = `${Number(match[1])}:${Number(match[2])}`;
    if (ref.has(key)) throw new Error(`Duplicate reference ayah ${key}`);
    ref.set(key, match[3]);
  }
}
if (ref.size !== 6236) throw new Error(`Expected 6236 reference ayat; found ${ref.size}`);

// Tanzil includes the unnumbered opening bismillah on the first verse of
// every surah except 1 and 9. Our app renders it separately as a heading.
// In 95 and 97, the downloaded prefix has a contextual shadda for joining
// recitation. Separate that exact prefix too, but never alter the ayah.
const bismillah = ref.get("1:1")!;
const connectedBismillah = "بِّ" + bismillah.slice(2);
const openingPrefixes = new Map<number, string>();
for (let surah = 2; surah <= 114; surah++) {
  if (surah === 9) continue;
  const key = `${surah}:1`;
  const first = ref.get(key)!;
  const prefix = [bismillah, connectedBismillah].find(b => first.startsWith(`${b} `));
  if (!prefix) throw new Error(`Unexpected opening bismillah for ${key}`);
  openingPrefixes.set(surah, prefix);
  if (getUthmaniBismillah(surah) !== prefix) throw new Error(`Reader bismillah does not match reference for ${surah}`);
  ref.set(key, first.slice(prefix.length + 1));
}

// The old source omitted standalone waqf signs. This narrow comparison
// allows adding ONLY the original signs from the official text. No letters,
// harakat, punctuation, or other symbols may be synthesized or deleted.
const withoutPauseMarks = (s: string) => s.replace(/\s+[\u06D6-\u06DC]+(?=\s|$)/g, "");

const mismatches: string[] = [];
const seen = new Set<string>();
const local = new Map<string, string>();
const patches: { path: string; data: { verses: { v: number; t: string }[]; bismillah?: string } }[] = [];
for (let surah = 1; surah <= 114; surah++) {
  const path = resolve(import.meta.dirname, `../public/quran/uthmani/${surah}.json`);
  const data: { verses: { v: number; t: string }[]; bismillah?: string } = JSON.parse(readFileSync(path, "utf8"));
  let changed = false;
  for (const verse of data.verses) {
    const key = `${surah}:${verse.v}`;
    if (seen.has(key)) throw new Error(`Duplicate local ayah ${key}`);
    seen.add(key);
    local.set(key, verse.t);
    const official = ref.get(key);
    if (verse.t !== official) {
      mismatches.push(key);
      if (flags.has("--sync-local")) {
        if (!official || withoutPauseMarks(verse.t) !== withoutPauseMarks(official)) throw new Error(`Unexpected spelling or diacritic mismatch at ${key}; refusing to modify`);
        verse.t = official;
        local.set(key, official);
        changed = true;
      }
    }
  }
  if (data.bismillah && data.bismillah !== openingPrefixes.get(surah)) throw new Error(`Unexpected bismillah for ${surah}`);
  if (changed) patches.push({ path, data });
}
for (const key of ref.keys()) if (!seen.has(key)) mismatches.push(`${key} (missing)`);
const digest = (verses: Map<string, string>) => createHash("sha256").update([...ref.keys()].map(key => `${key}|${verses.get(key) ?? ""}\n`).join(""), "utf8").digest("hex");

if (seen.size !== 6236 || [...ref.keys()].some(k => !seen.has(k))) throw new Error("Local corpus is incomplete");
if (flags.has("--sync-local")) for (const { path, data } of patches) writeFileSync(path, JSON.stringify(data) + "\n", "utf8");
console.log(JSON.stringify({ reference: ref.size, local: seen.size, differencesBeforeSync: mismatches.length, localFilesUpdated: flags.has("--sync-local") ? patches.length : 0, referenceSha256: digest(ref), localSha256: digest(local), identical: digest(ref) === digest(local) }, null, 2));
if (digest(ref) !== digest(local)) process.exitCode = 1;

if (flags.has("--verify-db") || flags.has("--sync-db")) {
  if (!process.env.TURSO_DATABASE_URL?.startsWith("libsql://") || !process.env.TURSO_AUTH_TOKEN) throw new Error("Remote DB credentials must be configured");
  if (digest(ref) !== digest(local)) throw new Error("Local source must match before checking database");
  const client = await openSeedClient();
  try {
    const select = "SELECT surah_id, ayah_number, text_uthmani FROM ayahs ORDER BY surah_id, ayah_number";
    const getDb = async () => {
      const rows = (await client.execute(select)).rows;
      const map = new Map<string, string>();
      for (const row of rows) {
        const key = `${row.surah_id}:${row.ayah_number}`;
        if (map.has(key)) throw new Error(`Duplicate DB ayah ${key}`);
        map.set(key, String(row.text_uthmani));
      }
      if (map.size !== 6236 || [...ref.keys()].some(k => !map.has(k))) throw new Error("DB corpus is incomplete");
      return map;
    };
    const before = await getDb();
    const changes = [...ref].filter(([key, text]) => before.get(key) !== text);
    for (const [key, text] of changes) if (withoutPauseMarks(before.get(key)!) !== withoutPauseMarks(text)) throw new Error(`Unexpected DB spelling or diacritic mismatch at ${key}; refusing to modify`);
    if (flags.has("--sync-db")) {
      // Idempotent, guarded updates of the text column only. No row is deleted,
      // IDs and metadata remain unchanged, and translations are untouched.
      for (let i = 0; i < changes.length; i += 100) {
        const batch = changes.slice(i, i + 100).map(([key, text]) => {
          const [surah, ayah] = key.split(":").map(Number);
          return { sql: "UPDATE ayahs SET text_uthmani = ? WHERE surah_id = ? AND ayah_number = ? AND text_uthmani = ?", args: [text, surah, ayah, before.get(key)!] };
        });
        const result = await client.batch(batch, "write");
        if (result.some(r => r.rowsAffected !== 1)) throw new Error(`Guarded update could not complete batch ${i / 100 + 1}; rerun safely after checking`);
      }
    }
    const after = await getDb();
    console.log(JSON.stringify({ dbAyat: after.size, differencesBeforeSync: changes.length, dbUpdated: flags.has("--sync-db") ? changes.length : 0, databaseSha256: digest(after), identical: digest(ref) === digest(after) }, null, 2));
    if (digest(ref) !== digest(after)) process.exitCode = 1;
  } finally {
    client.close();
  }
}
