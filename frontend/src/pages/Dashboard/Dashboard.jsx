import { Link } from "react-router-dom";
import Tooltip from "../../components/ui/Tooltip";

const summaryCards = [
    {
        title: "BMI",
        value: "22.4",
        subtitle: "Healthy",
        icon: "⚖️",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        description:
            "BMI (Body Mass Index) is a measure that compares your weight with your height to indicate whether your weight is in a healthy range.",
    },
    {
        title: "Calories",
        value: "1,850",
        subtitle: "kcal consumed today",
        icon: "🔥",
        iconBg: "bg-orange-100",
        iconText: "text-orange-600",
        description:
            "Calories are units of energy from the food and drinks you consume. This shows your estimated calorie intake for today.",
    },
    {
        title: "Water Intake",
        value: "1.5 L",
        subtitle: "of 2.5 L daily goal",
        icon: "💧",
        iconBg: "bg-cyan-100",
        iconText: "text-cyan-600",
        description:
            "Water intake tracks how much water you have consumed today compared with your daily hydration goal.",
    },
    {
        title: "Today's Workout",
        value: "45 min",
        subtitle: "Workout completed",
        icon: "🏋️",
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
        description:
            "This shows the amount of time you have spent exercising today and helps you keep track of your daily workout activity.",
    },
];

function Dashboard() {
    return (
        <div className="space-y-8">

            {/* ============================= */}
            {/* Dashboard Header */}
            {/* ============================= */}

            <div>
                <p className="text-sm font-medium text-[var(--color-brand)]">
                    Today
                </p>

                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">
                    Welcome back, Tarun! 👋 Here's an overview of your
                    fitness and wellness journey.
                </p>
            </div>


            {/* ============================= */}
            {/* Summary Cards */}
            {/* ============================= */}

            <section>

                <div className="mb-4">
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                        Today's Overview
                    </h2>

                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        Keep track of your daily wellness activities.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                    {summaryCards.map((card) => (
                        <Tooltip
                            key={card.title}
                            text={card.description}
                        >
                            <div
                                className="
                                    h-full
                                    cursor-help
                                    rounded-[var(--radius-xl)]
                                    border
                                    border-[var(--border-color-default)]
                                    bg-[var(--color-surface)]
                                    p-5
                                    shadow-[var(--shadow-sm)]
                                    transition-all
                                    duration-200
                                    hover:-translate-y-1
                                    hover:shadow-[var(--shadow-md)]
                                "
                            >

                                {/* Card Header */}

                                <div className="flex items-start justify-between">

                                    <div>

                                        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                                            {card.title}
                                        </p>

                                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                                            {card.value}
                                        </p>

                                    </div>


                                    {/* Icon */}

                                    <div
                                        className={`
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-[var(--radius-lg)]
                                            ${card.iconBg}
                                            ${card.iconText}
                                            text-xl
                                        `}
                                    >
                                        {card.icon}
                                    </div>

                                </div>


                                {/* Card Footer */}

                                <p className="mt-4 text-xs text-[var(--color-text-muted)]">
                                    {card.subtitle}
                                </p>

                            </div>
                        </Tooltip>
                    ))}

                </div>

            </section>


            {/* ============================= */}
            {/* Wellness Journey */}
            {/* ============================= */}

            <section
                className="
                    overflow-hidden
                    rounded-[var(--radius-xl)]
                    border
                    border-[var(--border-color-default)]
                    bg-[var(--color-surface)]
                    shadow-[var(--shadow-sm)]
                "
            >

                <div className="p-6 sm:p-8">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-sm font-semibold text-[var(--color-brand)]">
                                Your Wellness Journey
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">
                                Stay consistent. Stay healthy.
                            </h2>

                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                Track your health, workouts, nutrition,
                                hydration, and daily wellness activities
                                from one place.
                            </p>

                        </div>


                        {/* View Health Button */}

                        <Tooltip text="Open your health section to view detailed health information.">

                            <Link
                                to="/health"
                                className="
                                    inline-flex
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-[var(--radius-md)]
                                    bg-[var(--color-brand)]
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition-all
                                    hover:bg-[var(--color-brand-hover)]
                                    hover:-translate-y-0.5
                                "
                            >
                                View Health
                            </Link>

                        </Tooltip>

                    </div>

                </div>

            </section>


            {/* ============================= */}
            {/* Today's Focus */}
            {/* ============================= */}

            <section
                className="
                    rounded-[var(--radius-xl)]
                    border
                    border-[var(--border-color-default)]
                    bg-[var(--color-surface)]
                    p-6
                    shadow-[var(--shadow-sm)]
                "
            >

                <div className="flex items-start gap-4">

                    {/* Focus Icon */}

                    <Tooltip text="Your daily wellness focus helps you build healthy and consistent habits.">

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                cursor-help
                                items-center
                                justify-center
                                rounded-[var(--radius-lg)]
                                bg-[var(--color-brand-light)]
                                text-xl
                            "
                        >
                            🎯
                        </div>

                    </Tooltip>


                    <div>

                        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                            Today's Focus
                        </h2>

                        <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                            Build healthy habits by staying active,
                            hydrated, and consistent with your wellness
                            goals.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;