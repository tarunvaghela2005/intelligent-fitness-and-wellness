import { useTranslation } from "react-i18next";

// ==========================================
// Language Switcher Component
// Allows switching between English, Hindi, and Gujarati.
// ==========================================

const LANGUAGES = [
    { code: "en", label: "EN", name: "English" },
    { code: "hi", label: "हि", name: "Hindi" },
    { code: "gu", label: "ગુ", name: "Gujarati" },
];

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || "en";

    return (
        <div className="flex items-center gap-1" role="group" aria-label="Language selector">
            {LANGUAGES.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    title={lang.name}
                    aria-pressed={currentLang === lang.code}
                    className={`
                        min-w-[2rem] rounded-lg px-2 py-1 text-xs font-semibold
                        transition-colors duration-150
                        ${
                            currentLang === lang.code
                                ? "bg-[var(--color-brand)] text-white"
                                : "bg-[var(--color-slate-100)] text-[var(--color-text-secondary)] hover:bg-[var(--color-brand-light)] hover:text-[var(--color-brand)]"
                        }
                    `}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}

export default LanguageSwitcher;
