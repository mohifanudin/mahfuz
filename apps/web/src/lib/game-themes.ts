export interface GameTheme {
  bg: string;
  primary: string;
  secondary: string;
  surface: string;
  glow: string;
  img: string;
  isDark: boolean;
}

export const GAME_THEMES: Record<string, GameTheme> = {
  // Kelime Doldurma - warm parchment/manuscript feel (filling in ancient text)
  "fill-blank": {
    bg: "#FFF7E5", primary: "#A85D00", secondary: "#E8A23A", surface: "#FFFFFF",
    glow: "rgba(232,162,58,0.22)", img: "/images/games/mahfuz-fill-in-the-blank.webp", isDark: false,
  },
  // Ayet Zinciri - deep emerald chain links (connecting verses)
  "verse-chain": {
    bg: "#E0F9F2", primary: "#087C72", secondary: "#24B9A2", surface: "#FFFFFF",
    glow: "rgba(36,185,162,0.23)", img: "/images/games/mahfuz-verse-chain.webp", isDark: false,
  },
  // Kelime Anlami - calm slate-blue (quiet study feel)
  "word-meaning": {
    bg: "#EAF5FF", primary: "#246CB5", secondary: "#74B2EE", surface: "#FFFFFF",
    glow: "rgba(116,178,238,0.24)", img: "/images/games/mahfuz-word-meaning.webp", isDark: false,
  },
  // Hexagon Harf - deep forest green (honeycomb in nature)
  "hexagon": {
    bg: "#EFFAE6", primary: "#408329", secondary: "#89C65B", surface: "#FFFFFF",
    glow: "rgba(137,198,91,0.23)", img: "/images/games/mahfuz-hexagon-letters.webp", isDark: false,
  },
  // Sure Tanima - midnight blue/teal (listening, contemplation)
  "surah-guess": {
    bg: "#E6F7FF", primary: "#2476AF", secondary: "#70C7ED", surface: "#FFFFFF",
    glow: "rgba(112,199,237,0.23)", img: "/images/games/mahfuz-surah-recognition.webp", isDark: false,
  },
  // Kelime Tahmini - dark olive/sage (wordle-style, thoughtful)
  "kelime-tahmini": {
    bg: "#EAF8EC", primary: "#377C4B", secondary: "#8CD6A4", surface: "#FFFFFF",
    glow: "rgba(140,214,164,0.23)", img: "/images/games/mahfuz-kelime-tahmini.webp", isDark: false,
  },
  // Quranic 2048 - deep navy/crimson (arcade energy)
  "ayet-2048": {
    bg: "#F7EEFF", primary: "#8751B5", secondary: "#C2A3F6", surface: "#FFFFFF",
    glow: "rgba(194,163,246,0.23)", img: "/images/games/mahfuz-ayet-2048.webp", isDark: false,
  },
  // Kelime Eslestirme - warm amber/parchment (matching cards aesthetic)
  "word-match": {
    bg: "#FFF0EB", primary: "#B75C34", secondary: "#F5A57C", surface: "#FFFFFF",
    glow: "rgba(245,165,124,0.23)", img: "/images/games/mahfuz-word-match.webp", isDark: false,
  },
};

/**
 * CSS patterns per game -- subtle geometric overlays.
 * Each returns a CSS background-image value (repeating SVG-encoded patterns).
 */
const GAME_PATTERNS: Record<string, { pattern: string; size: string; opacity: string }> = {
  // Manuscript grid lines (horizontal ruled lines like ancient text)
  "fill-blank": {
    pattern: `repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(212,160,76,0.15) 28px,
      rgba(212,160,76,0.15) 29px
    )`,
    size: "100% 30px",
    opacity: "0.5",
  },
  // Chain links -- interlocking circles
  "verse-chain": {
    pattern: `radial-gradient(circle at 30px 15px, transparent 12px, rgba(201,168,76,0.12) 12px, rgba(201,168,76,0.12) 14px, transparent 14px),
      radial-gradient(circle at 0px 15px, transparent 12px, rgba(201,168,76,0.12) 12px, rgba(201,168,76,0.12) 14px, transparent 14px)`,
    size: "60px 30px",
    opacity: "0.6",
  },
  // Book pages -- subtle horizontal lines
  "word-meaning": {
    pattern: `repeating-linear-gradient(
      0deg,
      transparent,
      transparent 24px,
      rgba(126,186,200,0.06) 24px,
      rgba(126,186,200,0.06) 25px
    )`,
    size: "100% 26px",
    opacity: "0.5",
  },
  // Honeycomb hex pattern
  "hexagon": {
    pattern: `radial-gradient(circle at 25px 0, rgba(74,155,106,0.12) 8px, transparent 8px),
      radial-gradient(circle at 0 43px, rgba(74,155,106,0.12) 8px, transparent 8px),
      radial-gradient(circle at 50px 43px, rgba(74,155,106,0.12) 8px, transparent 8px)`,
    size: "50px 86px",
    opacity: "0.5",
  },
  // Sound waves -- concentric arcs
  "surah-guess": {
    pattern: `repeating-radial-gradient(
      circle at 50% 100%,
      transparent,
      transparent 18px,
      rgba(72,191,227,0.06) 18px,
      rgba(72,191,227,0.06) 20px
    )`,
    size: "200px 100px",
    opacity: "0.8",
  },
  // Letter tiles grid
  "kelime-tahmini": {
    pattern: `linear-gradient(rgba(107,158,91,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(107,158,91,0.1) 1px, transparent 1px)`,
    size: "48px 58px",
    opacity: "0.6",
  },
  // Grid cells (4x4 board feel)
  "ayet-2048": {
    pattern: `linear-gradient(rgba(233,69,96,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(83,52,131,0.08) 1px, transparent 1px)`,
    size: "80px 80px",
    opacity: "0.7",
  },
  // Matching grid (card pairs)
  "word-match": {
    pattern: `linear-gradient(rgba(245,166,35,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,166,35,0.08) 1px, transparent 1px)`,
    size: "64px 64px",
    opacity: "0.5",
  },
};

/** Build inline style object for a game background.
 *  Overrides CSS custom properties so child components
 *  (option cards, score badges, stat boxes, etc.) inherit dark theme. */
export function gameBgStyle(theme: GameTheme, gameId?: string): React.CSSProperties {
  const pat = gameId ? GAME_PATTERNS[gameId] : undefined;
  return {
    // Background layers
    "--game-bg-color": theme.bg,
    "--game-bg-gradient": `linear-gradient(180deg, ${theme.bg}, ${theme.surface})`,
    ...(pat && {
      "--game-bg-pattern": pat.pattern,
      "--game-pattern-size": pat.size,
      "--game-pattern-opacity": pat.opacity,
    }),
    ...(!theme.isDark && {
      "--color-surface": theme.surface,
      "--color-bg": theme.bg,
      "--color-border": `${theme.primary}25`,
      "--color-text-primary": "#1D3444",
      "--color-text-secondary": "#506579",
      "--color-accent": theme.primary,
      "--mushaf-bg": "#FFFFFF",
      "--mushaf-border": `${theme.primary}22`,
    }),
    // Override app-level CSS custom properties for dark game UIs
    ...(theme.isDark && {
      "--color-surface": theme.surface,
      "--color-bg": theme.bg,
      "--color-border": `${theme.primary}20`,
      "--color-text-primary": "rgba(255,255,255,0.92)",
      "--color-text-secondary": "rgba(255,255,255,0.50)",
      "--color-accent": theme.primary,
      // Mushaf overrides (fill-blank verse card)
      "--mushaf-bg": theme.surface,
      "--mushaf-border": `${theme.primary}18`,
      "--mushaf-shadow": "rgba(0,0,0,0.25)",
      "--mushaf-inner-shadow": "rgba(0,0,0,0.15)",
    }),
  } as React.CSSProperties;
}
