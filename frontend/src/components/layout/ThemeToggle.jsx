import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                isDark
                    ? "Switch to light theme"
                    : "Switch to dark theme"
            }
            title={
                isDark
                    ? "Switch to light theme"
                    : "Switch to dark theme"
            }
            className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-[var(--radius-md)]
                border
                border-[var(--border-color-default)]
                bg-[var(--color-surface)]
                text-lg
                text-[var(--color-text-primary)]
                transition-colors
                duration-200
                hover:bg-[var(--color-slate-100)]
                focus:outline-none
                focus:ring-2
                focus:ring-[var(--border-color-focus)]
                focus:ring-offset-2
            "
        >
            {isDark ? "☀️" : "🌙"}
        </button>
    );
}

export default ThemeToggle;