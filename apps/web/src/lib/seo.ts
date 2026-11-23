/**
 * Tüm route'lar için merkezi başlık + açıklama yardımcısı.
 * TanStack Start `head` fonksiyonundan dönen meta dizisini üretir.
 *
 * Kullanım:
 *   import { staticHead, surahHead } from "~/lib/seo";
 *   export const Route = createFileRoute("/bookmarks")({
 *     head: () => staticHead("bookmarks"),
 *   });
 *
 *   export const Route = createFileRoute("/surah/$surahSlug")({
 *     head: ({ params }) => surahHead(params.surahSlug),
 *   });
 */

import { surahIdFromSlug } from "./surah-slugs";
import { getSurahName } from "./surah-names-i18n";

const SITE = "Mahfuz";
const SEP = " · ";
const DEFAULT_DESC = "Teman mengaji, hafalan, dan permainan Al-Qur'an untuk anak-anak.";

interface HeadMeta {
  title: string;
  description?: string;
}

function buildMeta({ title, description }: HeadMeta) {
  const fullTitle = `${title}${SEP}${SITE}`;
  const desc = description ?? DEFAULT_DESC;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: desc },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: desc },
      { property: "og:site_name", content: SITE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: desc },
    ],
  };
}

// ── Statik route registry ────────────────────────────────

const STATIC: Record<string, HeadMeta> = {
  home: { title: "Ana Sayfa", description: "Günün ayeti, son okudukların ve sure listesi tek bir sade ekranda." },
  fihrist: { title: "Sure Fihristi", description: "Kuran'ın 114 sûresi — filtre, arama ve alfabetik düzenle." },
  about: { title: "Hakkında", description: "Mahfuz'un amacı, kaynakları ve geliştiricisi hakkında." },
  bookmarks: { title: "Yer İmlerim", description: "Kaydettiğin ayetler tek liste hâlinde — sure veya tarih sırasıyla." },
  changelog: { title: "Değişiklik Kaydı", description: "Mahfuz'a eklenen yeni özellikler ve düzeltmeler." },
  discover: { title: "Keşfet", description: "Konulara, köklere ve önerilere göre Kuran'da yeni şeyler keşfet." },
  hifz: { title: "Hifz", description: "Ezberlediğin ayetleri sure bazlı takip et, hedef belirle." },
  notes: { title: "Notlarım", description: "Ayetlere düştüğün notlar tek yerde." },
  premium: { title: "Mürşid Plan", description: "Mahfuz'un genişletilmiş özellikleri ve planlar." },
  profile: { title: "Profilim", description: "İstatistiklerin, hifz durumun ve hesap ayarların." },
  "profile-privacy": { title: "Gizlilik", description: "Skor tablosunda adının nasıl görüneceğini seç." },
  promo: { title: "Mahfuz" },
  recite: { title: "Tilavet", description: "Mikrofonla ayet okuma, doğrulama ve takip modu." },
  search: { title: "Arama", description: "Kuran metninde ve çevirilerde tam metin arama." },
  stats: { title: "İstatistikler", description: "Okuma serisi, geçen süre ve hedef ilerlemen." },
  tajweed: { title: "Tecvid", description: "16 tecvid kuralı, örnekleriyle birlikte." },
  mahfuz: { title: "Mahfûz · Kuran nasıl korunuyor?", description: "Hicr 15:9'un sözü, hafız geleneği ve Kuran metnindeki sayısal denge örnekleri." },
  games: { title: "Oyunlar", description: "Kuran kelime ve sure bilgini sınayan mini oyunlar." },
  "games-scoreboard": { title: "Skor Tablosu", description: "Mahfuz oyunlarındaki en yüksek skorlar." },
  "games-ayah-2048": { title: "Ayah 2048", description: "Sure sıralı 2048 — ayetleri birleştir, kombo yap." },
  "games-fill-blank": { title: "Kelime Doldurma", description: "Ayetteki eksik kelimeyi seç, ayeti tamamla." },
  "games-hexagon": { title: "Hexagon", description: "Harfleri birleştirerek Kuran kelimeleri kur." },
  "games-kelime-tahmini": { title: "Kelime Tahmini", description: "Günlük ve serbest modda Kuran kelimesi tahmin oyunu." },
  "games-surah-guess": { title: "Sûre Tanıma", description: "Türkçe anlama bakıp doğru sûreyi bul." },
  "games-verse-chain": { title: "Ayet Zinciri", description: "Verilen ayetten sonra gelen kelimeleri sırala." },
  "games-word-match": { title: "Kelime Eşleştirme", description: "Türkçe anlamı doğru Arapça kelimeyle eşleştir." },
  "games-word-meaning": { title: "Kelime Anlamı", description: "Arapça kelimenin Türkçe anlamını seç." },
  meclis: { title: "Meclis", description: "Arkadaşlarla canlı, çok-cihazlı parti modu — kodla katıl ya da yeni meclis aç." },
  khatm: { title: "Hatim Grupları", description: "Arkadaşlarla birlikte hatim et — grup oluştur veya katıl." },
  alifba: { title: "Elifba", description: "Adım adım Arap harflerini ve okumayı öğren." },
  "alifba-letters": { title: "Harfler", description: "Arap alfabesi — harf harf gez, dinle, çalış." },
  "alifba-exam": { title: "Elifba Sınavı", description: "Öğrendiğin harfleri pekiştiren karma sınav." },
  "alifba-exam-index": { title: "Sınavlar", description: "Adım sınavları ve karma sınav." },
  "alifba-games": { title: "Elifba Oyunları", description: "Harf öğrenirken eğlenmen için küçük oyunlar." },
  "alifba-games-fill": { title: "Eksik Harf", description: "Boşluktaki doğru harfi seç." },
  "alifba-games-memory": { title: "Hafıza", description: "Aynı harfin iki kartını bul." },
  "alifba-games-speed": { title: "Hız Oyunu", description: "Süreyle yarışarak harfleri tanı." },
  "alifba-games-word": { title: "Kelime Avı", description: "Harflerden kelime kur." },
  "alifba-quiz-forms": { title: "Harf Formları", description: "Başta, ortada, sonda — her bağlamda harf tanıma." },
  "alifba-quiz-voice": { title: "Sesli Quiz", description: "Sesi dinle, doğru harfi seç." },
  "auth-login": { title: "Giriş Yap", description: "Mahfuz'a e-posta, Google veya Apple ile giriş yap." },
  "auth-callback": { title: "Giriş Yapılıyor" },
  "not-found": { title: "Sayfa Bulunamadı", description: "Aradığın sayfa burada değil." },
};

export function staticHead(key: keyof typeof STATIC) {
  const titles: Record<string, string> = { home: "Beranda", fihrist: "Daftar surah", about: "Tentang", bookmarks: "Ayat tersimpan", changelog: "Apa yang baru?", discover: "Belajar", hifz: "Hafalanku", notes: "Catatanku", premium: "Dukungan", profile: "Profilku", "profile-privacy": "Privasi", promo: "Mahfuz", recite: "Baca bersuara", search: "Cari", stats: "Perkembangan", tajweed: "Belajar tajwid", mahfuz: "Penjagaan Al-Qur'an", games: "Bermain", "games-scoreboard": "Papan skor", "games-ayah-2048": "Surah 2048", "games-fill-blank": "Lengkapi ayat", "games-hexagon": "Susun huruf", "games-kelime-tahmini": "Tebak kata", "games-surah-guess": "Tebak surah", "games-verse-chain": "Sambung Ayat", "games-word-match": "Cocokkan kata", "games-word-meaning": "Arti kata", meclis: "Main bersama", khatm: "Khatam bersama", alifba: "Huruf hijaiyah", "alifba-letters": "Kenali huruf", "alifba-exam": "Kuis hijaiyah", "alifba-exam-index": "Kuis", "alifba-games": "Permainan hijaiyah", "alifba-games-fill": "Cari huruf", "alifba-games-memory": "Pasangan huruf", "alifba-games-speed": "Huruf kilat", "alifba-games-word": "Cari kata", "alifba-quiz-forms": "Bentuk huruf", "alifba-quiz-voice": "Kuis suara", "auth-login": "Masuk", "auth-callback": "Sedang masuk", "not-found": "Halaman tidak ditemukan" };
  return buildMeta({ title: titles[key] ?? SITE });
}

// ── Dinamik route yardımcıları ──────────────────────────

function surahNameFromSlug(slug: string | undefined): string | null {
  if (!slug) return null;
  const id = surahIdFromSlug(slug);
  if (!id) return null;
  return getSurahName(id, "id") || null;
}

export function surahHead(slug: string | undefined) {
  const name = surahNameFromSlug(slug);
  if (!name) return buildMeta({ title: "Surah", description: "Baca surah Al-Qur'an." });
  return buildMeta({
    title: `Surah ${name}`,
    description: `Baca dan dengarkan surah ${name} beserta terjemahan Bahasa Indonesia.`,
  });
}

export function pageHead(pageNumber: string | number | undefined) {
  const n = Number(pageNumber);
  if (!n || n < 1 || n > 604) return buildMeta({ title: "Halaman mushaf" });
  return buildMeta({
    title: `Halaman mushaf ${n}`,
    description: `Baca halaman ${n} dalam mushaf Madinah.`,
  });
}

export function juzHead(juzId: string | number | undefined) {
  const n = Number(juzId);
  if (!n || n < 1 || n > 30) return buildMeta({ title: "Juz" });
  return buildMeta({
    title: `Juz ${n}`,
    description: `Baca juz ${n} Al-Qur'an.`,
  });
}

export function analyseHead(verseKey: string | undefined) {
  if (!verseKey || !/^\d+:\d+$/.test(verseKey)) return buildMeta({ title: "Pelajari ayat" });
  const [s, a] = verseKey.split(":").map(Number);
  const name = getSurahName(s, "id") || `Surah ${s}`;
  return buildMeta({
    title: `${name} ${a} · Pelajari ayat`,
    description: `Terjemahan dan penjelasan ayat ${a} surah ${name}.`,
  });
}

export function tafsirHead(verseKey: string | undefined) {
  if (!verseKey || !/^\d+:\d+$/.test(verseKey)) return buildMeta({ title: "Tafsir" });
  const [s, a] = verseKey.split(":").map(Number);
  const name = getSurahName(s, "id") || `Surah ${s}`;
  return buildMeta({
    title: `${name} ${a} · Tafsir`,
    description: `Tafsir ayat ${a} surah ${name}.`,
  });
}

export function meclisCodeHead(code: string | undefined) {
  if (!code) return buildMeta({ title: "Main bersama" });
  return buildMeta({
    title: `Main bersama ${code.toUpperCase()}`,
    description: "Bergabung dalam permainan bersama teman.",
  });
}

export function khatmGroupHead(groupId: string | undefined) {
  return buildMeta({
    title: "Khatam bersama",
    description: "Pantau kegiatan khatam bersama.",
  });
}

export function alifbaLetterHead(letterId: string | undefined) {
  return buildMeta({
    title: letterId ? `${letterId.toUpperCase()} · Huruf` : "Huruf",
    description: "Pelajari suara, bentuk, dan cara menulis huruf.",
  });
}

export function alifbaStepHead(stepId: string | undefined) {
  return buildMeta({
    title: stepId ? `Langkah ${stepId}` : "Belajar mengaji",
    description: "Latihan dan kuis dalam perjalanan belajar mengaji.",
  });
}

export function alifbaExamHead(stepId: string | undefined) {
  return buildMeta({
    title: stepId ? `Kuis langkah ${stepId}` : "Kuis hijaiyah",
    description: "Uji pemahaman setelah menyelesaikan pelajaran.",
  });
}
