import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LOCALE_CODES, DEFAULT_LOCALE, type Locale } from "~/locales/registry";
import { useSettingsStore } from "~/stores/settings.store";

/** Default translation slug per locale */
const LOCALE_DEFAULT_TRANSLATION: Partial<Record<Locale, string>> = {
  id: "kfqpc-id-v2",
  en: "yusufali-en",
  tr: "omer-celik",
};

interface LocaleState {
  locale: Locale;
  /** Whether the user has explicitly chosen a locale (first-visit gate). */
  hasChosenLocale: boolean;
  setLocale: (locale: Locale) => void;
  confirmLocale: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      hasChosenLocale: true,
      setLocale: (locale) => {
        set({ locale, hasChosenLocale: true });
        const defaultSlug = LOCALE_DEFAULT_TRANSLATION[locale];
        if (defaultSlug) {
          useSettingsStore.getState().setTranslation(defaultSlug);
        }
      },
      confirmLocale: () => set({ hasChosenLocale: true }),
    }),
    {
      name: "mahfuz-core-locale",
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        // Validate persisted locale
        if (!LOCALE_CODES.includes(state.locale)) {
          state.locale = DEFAULT_LOCALE;
        }

        // This edition always opens in Indonesian; other languages remain optional.
        if (!state.hasChosenLocale) {
          state.locale = DEFAULT_LOCALE;
          state.hasChosenLocale = true;
        }
      },
    },
  ),
);
