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

function Sidebar() {
    return (
        <aside className="hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-[var(--border-color-default)] bg-[var(--color-surface)] md:block">
            <div className="flex h-full flex-col p-4">

                <nav className="flex-1 space-y-1">
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        Main Menu
                    </p>

                    {navigationItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                [
                                    "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                                    isActive
                                        ? "bg-[var(--color-brand-light)] text-[var(--color-brand)]"
                                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-slate-100)] hover:text-[var(--color-text-primary)]",
                                ].join(" ")
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span
                                        className={`text-lg transition-transform duration-200 ${isActive ? "scale-110" : ""
                                            }`}
                                        aria-hidden="true"
                                    >
                                        {item.icon}
                                    </span>

                                    <span>{item.name}</span>

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

                <div className="border-t border-[var(--border-color-default)] pt-4">
                    <div className="rounded-[var(--radius-lg)] bg-[var(--color-ai-light)] p-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🤖</span>

                            <span className="text-sm font-semibold text-[var(--color-ai)]">
                                AI Wellness
                            </span>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                            Get personalized fitness and wellness recommendations.
                        </p>
                    </div>
                </div>

            </div>
        </aside>
    );
}

export default Sidebar;