import { useState } from "react";

function Dashboard() {
    const [userName] = useState("Tarun");

    return (
        <div className="space-y-6">

            {/* ============================= */}
            {/* Dashboard Header */}
            {/* ============================= */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <p className="text-sm font-medium text-[var(--color-brand)]">
                        Dashboard
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                        Welcome back, {userName}! 👋
                    </h1>

                    <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">
                        Here's an overview of your fitness and wellness journey.
                    </p>
                </div>

                {/* Date */}
                <div className="rounded-[var(--radius-lg)] border border-[var(--border-color-default)] bg-[var(--color-surface)] px-4 py-3 shadow-[var(--shadow-sm)]">
                    <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                        Today
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                        {new Date().toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                </div>

            </div>


            {/* ============================= */}
            {/* Dashboard Main Layout */}
            {/* ============================= */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* Main Welcome Card */}
                <div className="rounded-[var(--radius-xl)] border border-[var(--border-color-default)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] xl:col-span-2">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <span className="inline-flex rounded-full bg-[var(--color-brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-brand)]">
                                Your Wellness Journey
                            </span>

                            <h2 className="mt-4 text-xl font-bold text-[var(--color-text-primary)]">
                                Stay consistent. Stay healthy.
                            </h2>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)]">
                                Track your health, workouts, nutrition, and daily
                                wellness activities from one place.
                            </p>

                            <button
                                type="button"
                                className="mt-5 rounded-[var(--radius-lg)] bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Wellness Icon */}
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[var(--color-brand)]/10 text-5xl">
                            💪
                        </div>

                    </div>

                </div>


                {/* Today's Focus */}
                <div className="rounded-[var(--radius-xl)] border border-[var(--border-color-default)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)]">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                            Today's Focus
                        </h2>

                        <span className="text-xl">
                            🎯
                        </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                        Build healthy habits by staying active, hydrated,
                        and consistent with your wellness goals.
                    </p>

                    <div className="mt-5 rounded-[var(--radius-lg)] bg-[var(--color-background)] p-4">
                        <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                            Progress
                        </p>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                                className="h-full rounded-full bg-[var(--color-brand)]"
                                style={{ width: "0%" }}
                            />
                        </div>

                        <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                            No activities recorded yet
                        </p>
                    </div>

                </div>

            </div>


            {/* ============================= */}
            {/* Dashboard Sections Placeholder */}
            {/* ============================= */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Health Overview */}
                <div className="rounded-[var(--radius-xl)] border border-[var(--border-color-default)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
                            ❤️
                        </div>

                        <div>
                            <h2 className="font-bold text-[var(--color-text-primary)]">
                                Health Overview
                            </h2>

                            <p className="text-xs text-[var(--color-text-secondary)]">
                                Your health metrics will appear here.
                            </p>
                        </div>
                    </div>

                </div>


                {/* Fitness Overview */}
                <div className="rounded-[var(--radius-xl)] border border-[var(--border-color-default)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                            🏃
                        </div>

                        <div>
                            <h2 className="font-bold text-[var(--color-text-primary)]">
                                Fitness Overview
                            </h2>

                            <p className="text-xs text-[var(--color-text-secondary)]">
                                Your fitness statistics will appear here.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;