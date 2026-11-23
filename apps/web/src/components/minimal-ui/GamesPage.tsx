/**
 * Games hub -- game cards with difficulty, streak, leaderboard.
 * Minimal UI editorial design.
 */

import { useState } from "react";
import { Link, useRouteContext } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "~/hooks/useTranslation";
import { MuIcons } from "./icons";
import { getGlobalLeaderboard, GAME_TITLES } from "~/lib/score-service";

const GAMES = [
  {
    id: "fill-blank",
    t: GAME_TITLES["fill-blank"]!,
    tag: "Kur'an",
    s: "Eksik kelimeyi seçerek ayeti doğru tamamla.",
    img: "/images/games/mahfuz-fill-in-the-blank.webp",
    path: "/games/fill-blank",
  },
  {
    id: "surah-guess",
    t: GAME_TITLES["surah-guess"]!,
    tag: "Sûreler",
    s: "Türkçe anlama bakıp doğru sûreyi seç.",
    img: "/images/games/mahfuz-surah-recognition.webp",
    path: "/games/surah-guess",
  },
  {
    id: "word-meaning",
    t: GAME_TITLES["word-meaning"]!,
    tag: "Arapça",
    s: "Kur'an Arapçasında sık geçen kelimeleri öğren.",
    img: "/images/games/mahfuz-word-meaning.webp",
    path: "/games/word-meaning",
  },
  {
    id: "verse-chain",
    t: GAME_TITLES["verse-chain"]!,
    tag: "Hifz",
    s: "Ayetleri doğru sıraya dizerek zinciri tamamla.",
    img: "/images/games/mahfuz-verse-chain.webp",
    path: "/games/verse-chain",
  },
  {
    id: "hexagon",
    t: GAME_TITLES["hexagon"]!,
    tag: "Elifba",
    s: "Arap harflerini Latin karşılıklarıyla eşleştir.",
    img: "/images/games/mahfuz-hexagon-letters.webp",
    path: "/games/hexagon",
  },
  {
    id: "kelime-tahmini",
    t: GAME_TITLES["kelime-tahmini"]!,
    tag: "Bulmaca",
    s: "Türkçe ipucundan gizli Arapça kelimeyi 6 denemede bul.",
    img: "/images/games/mahfuz-kelime-tahmini.webp",
    path: "/games/kelime-tahmini",
  },
  {
    id: "ayet-2048",
    t: GAME_TITLES["ayet-2048"]!,
    tag: "Bulmaca",
    s: "Aynı sureleri birleştirerek Tegabun'a (64) ulaş.",
    img: "/images/games/mahfuz-ayet-2048.webp",
    path: "/games/ayah-2048",
  },
  {
    id: "word-match",
    t: GAME_TITLES["word-match"]!,
    tag: "Bulmaca",
    s: "Türkçe anlamla Arapça kelimeyi eşleştir.",
    img: "/images/games/mahfuz-word-match.webp",
    path: "/games/word-match",
  },
];

export function GamesPageMinimal() {
  const { t } = useTranslation();
  const { session } = useRouteContext({ from: "__root__" });
  const { data: leaderboard } = useQuery({
    queryKey: ["global-leaderboard", "season"],
    queryFn: () => getGlobalLeaderboard({ data: { period: "season" } }),
    staleTime: 60_000,
  });
  const [cat, setCat] = useState("all");
  const labels: Record<string, [string, string, string, string]> = {
    "verse-chain": [t.gamesHub.verseChainTitle, t.gamesHub.verseChainDesc, "🔗", "#DDF8F0"],
    "fill-blank": [t.gamesHub.fillBlankTitle, t.gamesHub.fillBlankDesc, "🧩", "#FFECCB"],
    "surah-guess": [t.gamesHub.surahGuessTitle, t.gamesHub.surahGuessDesc, "⭐", "#E4F2FF"],
    "word-meaning": [t.gamesHub.wordMeaningTitle, t.gamesHub.wordMeaningDesc, "💡", "#F3E6FF"],
    "hexagon": [t.gamesHub.hexagonTitle, t.gamesHub.hexagonDesc, "🔤", "#E7F7D9"],
    "kelime-tahmini": [t.gamesHub.kelimeTahminiTitle, t.gamesHub.kelimeTahminiDesc, "❓", "#FFF4D5"],
    "ayet-2048": [t.gamesHub.ayet2048Title, t.gamesHub.ayet2048Desc, "🎯", "#FFE5EA"],
    "word-match": [t.gamesHub.wordMatchTitle, t.gamesHub.wordMatchDesc, "🃏", "#E4F2FF"],
  };
  const categoryLabels: Record<string, string> = { all: t.gamesHub.catAll, Elifba: t.gamesHub.catElifba, "Kur'an": t.common.surah, "Sûreler": t.home.chips.surahList, Hifz: t.gamesHub.catHifz, "Arapça": t.settings.arabic, Bulmaca: t.gamesHub.catPuzzle };
  const cats = ["all", "Elifba", "Kur'an", "Sûreler", "Hifz", "Arapça", "Bulmaca"];
  const list = cat === "all" ? [...GAMES].sort((a, b) => Number(b.id === "verse-chain") - Number(a.id === "verse-chain")) : GAMES.filter((g) => g.tag === cat);

  return (
    <div className="mu-games">
      {/* Hero — minimal, centered */}
      <section className="mu-games-hero">
        <p className="mu-eyebrow">
          <span className="mu-eb-line" />
          {t.gamesHub?.title ?? "Oyunlar"}
          <span className="mu-eb-line" />
        </p>
        <h1 className="mu-display">
          {t.hub.featPlay} <span className="mu-display-accent">{t.hub.featMemorize}</span>
        </h1>
        <p className="mu-lede">
          {t.gamesHub.verseChainDesc} {t.hub.gamesDesc}
        </p>
      </section>

      {/* Filters */}
      <div className="mu-games-filters">
        {cats.map((c) => (
          <button
            key={c}
            className={`mu-tab ${cat === c ? "on" : ""}`}
            onClick={() => setCat(c)}
          >
            {categoryLabels[c] ?? c}
          </button>
        ))}
      </div>

      {/* Game list — App Store-style rows */}
      <ul className="mu-games-list">
        {list.map((g) => (
          <li key={g.id}>
            <Link to={g.path as any} className="mu-grow">
              <span className="kid-game-icon" style={{ background: labels[g.id]?.[3] }} aria-hidden="true">{labels[g.id]?.[2]}</span>
              <span className="mu-grow-meta">
                <span className="mu-grow-title">{labels[g.id]?.[0] ?? g.t}</span>
                <span className="mu-grow-desc">{labels[g.id]?.[1] ?? g.s}</span>
                <span className="mu-grow-tag">{categoryLabels[g.tag] ?? g.tag}</span>
              </span>
              <span className="mu-grow-chev" aria-hidden="true">{MuIcons.chev}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Leaderboard */}
      <section className="mu-games-lboard">
        <div className="mu-games-lboard-head">
          <h2 className="mu-h2">{t.gamesHub.scoreboard}</h2>
          <Link to="/games/scoreboard" className="mu-link-arrow">
            {t.gamesHub.seeAll} {MuIcons.arrowRight}
          </Link>
        </div>
        <ol className="mu-lboard-compact" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {leaderboard && leaderboard.length > 0 ? (
            leaderboard.slice(0, 10).map((entry) => {
              const isYou = session?.user?.id === entry.userId;
              return (
                <li
                  key={entry.userId}
                  className={`mu-lrow ${isYou ? "you" : ""} ${entry.rank <= 3 ? `rank-${entry.rank}` : ""}`}
                >
                  <span className="mu-lrank">{entry.rank}</span>
                  <span className="mu-lname">
                    {entry.userName || t.nav.guestName}
                    {isYou && <span className="mu-ybadge">{t.nav.profile}</span>}
                  </span>
                  <span className="mu-lxp">{entry.bestScore} XP</span>
                </li>
              );
            })
          ) : (
            <li className="mu-lrow">
              <span className="mu-lname mu-muted" style={{ fontSize: 13 }}>{t.gamesHub.noScores}</span>
            </li>
          )}
        </ol>
        <div className="mu-games-foot">
          <Link to="/meclis" className="mu-link-arrow">{t.gamesHub.rivalTitle} {MuIcons.arrowRight}</Link>
        </div>
      </section>
    </div>
  );
}

