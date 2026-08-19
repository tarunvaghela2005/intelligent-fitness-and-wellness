import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar({ onMenuClick }) {
    return (
        <header className="sticky top-0 z-40 border-b border-[var(--border-color-default)] bg-[var(--color-surface)] transition-colors duration-200">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left Side */}
                <div className="flex items-center gap-3">

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={onMenuClick}
                        aria-label="Open navigation menu"
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-[var(--radius-md)]
                            text-xl
                            text-[var(--color-text-secondary)]
                            transition-colors
                            hover:bg-[var(--color-slate-100)]
                            hover:text-[var(--color-text-primary)]
                            md:hidden
                        "
                    >
                        ☰
                    </button>

                    {/* Brand */}
                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand)] text-lg font-bold text-white">
                            F
                        </div>

                        <div className="hidden sm:block">
                            <h1 className="text-sm font-bold text-[var(--color-text-primary)]">
                                Intelligent Fitness
                            </h1>

                            <p className="text-xs text-[var(--color-text-muted)]">
                                Wellness System
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 md:flex">

                    <Link
                        to="/"
                        className="
                            rounded-[var(--radius-md)]
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-[var(--color-text-secondary)]
                            transition-colors
                            hover:bg-[var(--color-slate-100)]
                            hover:text-[var(--color-text-primary)]
                        "
                    >
                        Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className="
                            rounded-[var(--radius-md)]
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-[var(--color-text-secondary)]
                            transition-colors
                            hover:bg-[var(--color-slate-100)]
                            hover:text-[var(--color-text-primary)]
                        "
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/workout"
                        className="
                            rounded-[var(--radius-md)]
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-[var(--color-text-secondary)]
                            transition-colors
                            hover:bg-[var(--color-slate-100)]
                            hover:text-[var(--color-text-primary)]
                        "
                    >
                        Workout
                    </Link>

                    <Link
                        to="/nutrition"
                        className="
                            rounded-[var(--radius-md)]
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-[var(--color-text-secondary)]
                            transition-colors
                            hover:bg-[var(--color-slate-100)]
                            hover:text-[var(--color-text-primary)]
                        "
                    >
                        Nutrition
                    </Link>

                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2">

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Login */}
                    <Link
                        to="/login"
                        className="
                            hidden
                            rounded-[var(--radius-md)]
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-[var(--color-text-secondary)]
                            transition-colors
                            hover:bg-[var(--color-slate-100)]
                            hover:text-[var(--color-text-primary)]
                            md:block
                        "
                    >
                        Login
                    </Link>

                    {/* Get Started */}
                    <Link
                        to="/register"
                        className="
                            rounded-[var(--radius-md)]
                            bg-[var(--color-brand)]
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition-colors
                            hover:bg-[var(--color-brand-hover)]
                        "
                    >
                        Get Started
                    </Link>

                </div>

            </div>
        </header>
    );
}

export default Navbar;