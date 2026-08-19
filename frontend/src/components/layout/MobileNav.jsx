import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const navigationItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: "📊",
    },
    {
        name: "Health",
        path: "/health",
        icon: "❤️",
    },
    {
        name: "Workout",
        path: "/workout",
        icon: "🏋️",
    },
    {
        name: "Nutrition",
        path: "/nutrition",
        icon: "🥗",
    },
    {
        name: "Progress",
        path: "/progress",
        icon: "📈",
    },
    {
        name: "AI Assistant",
        path: "/ai-chat",
        icon: "🤖",
    },
];

function MobileNav({ isOpen, onClose }) {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 md:hidden">

            {/* Overlay */}
            <button
                type="button"
                aria-label="Close navigation menu"
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <aside className="relative flex h-full w-72 max-w-[85vw] flex-col border-r border-[var(--border-color-default)] bg-[var(--color-surface)] shadow-[var(--shadow-xl)]">

                {/* Header */}
                <div className="flex h-16 items-center justify-between border-b border-[var(--border-color-default)] px-4">

                    <div className="flex items-center gap-3">

                        {/* Logo */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand)] text-lg font-bold text-white">
                            F
                        </div>

                        {/* Brand Name */}
                        <div>
                            <p className="text-sm font-bold text-[var(--color-text-primary)]">
                                Intelligent Fitness
                            </p>

                            <p className="text-xs text-[var(--color-text-muted)]">
                                Wellness System
                            </p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close navigation menu"
                        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-xl text-[var(--color-text-secondary)] transition hover:bg-[var(--color-slate-100)] hover:text-[var(--color-text-primary)]"
                    >
                        ×
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto p-4">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        Main Menu
                    </p>

                    {navigationItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                [
                                    "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-3 text-sm font-medium transition-colors duration-200",
                                    isActive
                                        ? "bg-[var(--color-brand-light)] text-[var(--color-brand)]"
                                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-slate-100)] hover:text-[var(--color-text-primary)]",
                                ].join(" ")
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Icon */}
                                    <span
                                        className={`text-lg transition-transform duration-200 ${isActive ? "scale-110" : ""
                                            }`}
                                        aria-hidden="true"
                                    >
                                        {item.icon}
                                    </span>

                                    {/* Label */}
                                    <span>{item.name}</span>

                                    {/* Active Indicator */}
                                    {isActive && (
                                        <span
                                            className="ml-auto h-2 w-2 rounded-full bg-[var(--color-brand)]"
                                            aria-hidden="true"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* AI Wellness */}
                <div className="border-t border-[var(--border-color-default)] p-4">
                    <div className="rounded-[var(--radius-lg)] bg-[var(--color-ai-light)] p-4">

                        <div className="flex items-center gap-2">
                            <span className="text-lg">
                                🤖
                            </span>

                            <span className="text-sm font-semibold text-[var(--color-ai)]">
                                AI Wellness
                            </span>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                            Get personalized fitness and wellness recommendations.
                        </p>
                    </div>
                </div>

            </aside>
        </div>
    );
}

export default MobileNav;