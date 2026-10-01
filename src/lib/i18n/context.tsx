"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dictionaries, Dictionary, Lang } from "./dictionaries";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "id",
  setLang: () => {},
  t: dictionaries.id,
});

const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "id" || stored === "en") {
      setLangState(stored);
    } else {
      // fallback to browser language
      const browser = navigator.language.toLowerCase();
      if (browser.startsWith("en")) setLangState("en");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, mounted]);

  const setLang = (l: Lang) => setLangState(l);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
