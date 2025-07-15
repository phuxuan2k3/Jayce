import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { en } from "./language/en";
import { vi } from "./language/vi";

type Language = "en" | "vi";
type Translations = Record<string, string>;
export type LanguageTranslations = Record<Language, Translations>;

const translations: Record<Language, Translations> = { en, vi };

interface LanguageContextProps {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
	tTranslation: (key: string, translation: LanguageTranslations) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
	undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [language, setLanguage] = useState<Language>("en");

	const t = useCallback((key: string) => translations[language][key] || key, [language]);

	const tTranslation = useCallback((key: keyof typeof translations[Language], translation: LanguageTranslations) =>
		translation[language][key] || key, [language]);

	return (
		<LanguageContext.Provider value={{
			language,
			setLanguage,
			t,
			tTranslation
		}}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context)
		throw new Error("useLanguage must be used within LanguageProvider");
	return context;
};
