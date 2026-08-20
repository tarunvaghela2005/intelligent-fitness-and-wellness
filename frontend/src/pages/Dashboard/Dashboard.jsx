import { Link } from "react-router-dom";
import Tooltip from "../../components/ui/Tooltip";

const summaryCards = [
    {
        title: "BMI",
        value: "22.4",
        subtitle: "Healthy",
        description:
            "BMI (Body Mass Index) is a measure that uses your height and weight to estimate your healthy weight range.",
        icon: "⚖️",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
    },
    {
        title: "Calories",
        value: "1,850",
        subtitle: "kcal consumed today",
        description:
            "Calories represent the amount of energy you have consumed from food and drinks today.",
        icon: "🔥",
        iconBg: "bg-orange-100",
        iconText: "text-orange-600",
    },
    {
        title: "Water Intake",
        value: "1.5 L",
        subtitle: "of 2.5 L daily goal",
        description:
            "Track how much water you drink throughout the day to stay properly hydrated.",
        icon: "💧",
        iconBg: "bg-cyan-100",
        iconText: "text-cyan-600",
    },
    {
        title: "Today's Workout",
        value: "45 min",
        subtitle: "Workout completed",
        description:
            "The total amount of time you have spent exercising today.",
        icon: "🏋️",
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
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
                        <div
                            key={card.title}
                            className="
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

                            <div className="flex items-start justify-between">

                                <div>
                                    <div className="flex items-center gap-1.5">

                                        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                                            {card.title}
                                        </p>

                                        <Tooltip content={card.description}>
                                            <button
                                                type="button"
                                                className="
                                                    flex
                                                    h-5
                                                    w-5
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-[var(--color-slate-100)]
                                                    text-xs
                                                    font-bold
                                                    text-[var(--color-text-muted)]
                                                    transition-colors
                                                    hover:bg-[var(--color-brand-light)]
                                                    hover:text-[var(--color-brand)]
                                                "
                                                aria-label={`More information about ${card.title}`}
                                            >
                                                ?
                                            </button>
                                        </Tooltip>

                                    </div>

                                    <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                                        {card.value}
                                    </p>
                                </div>

                                <div
                                    className={`
                                        flex
                                        h-12
                                        w-12
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

                            <p className="mt-4 text-xs text-[var(--color-text-muted)]">
                                {card.subtitle}
                            </p>

                        </div>
                    ))}

                </div>
            </section>


            {/* ============================= */}
            {/* BMI Information */}
            {/* ============================= */}

            <section
                className="
                    rounded-[var(--radius-xl)]
                    border
                    border-[var(--border-color-default)]
                    bg-[var(--color-surface)]
                    p-6
                    shadow-[var(--shadow-sm)]
                    sm:p-8
                "
            >

                {/* Section Header */}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                                BMI Information
                            </h2>

                            <Tooltip content="BMI stands for Body Mass Index. It uses your height and weight to estimate whether your weight falls within a healthy range.">
                                <button
                                    type="button"
                                    className="
                                        flex
                                        h-6
                                        w-6
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[var(--color-slate-100)]
                                        text-xs
                                        font-bold
                                        text-[var(--color-text-muted)]
                                        hover:bg-[var(--color-brand-light)]
                                        hover:text-[var(--color-brand)]
                                    "
                                    aria-label="What is BMI?"
                                >
                                    ?
                                </button>
                            </Tooltip>

                        </div>

                        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            Understand your current Body Mass Index and
                            healthy weight range.
                        </p>

                    </div>

                    <div className="inline-flex w-fit items-center rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
                        Healthy
                    </div>

                </div>


                {/* BMI Main Content */}

                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">

                    {/* Current BMI */}

                    <div className="rounded-[var(--radius-xl)] bg-[var(--color-slate-50)] p-6">

                        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                            Your Current BMI
                        </p>

                        <div className="mt-3 flex items-end gap-3">

                            <span className="text-5xl font-bold text-[var(--color-text-primary)]">
                                22.4
                            </span>

                            <span className="mb-1 text-sm text-[var(--color-text-muted)]">
                                kg/m²
                            </span>

                        </div>

                        <p className="mt-3 text-sm text-green-600">
                            Your BMI is currently within the healthy range.
                        </p>

                    </div>


                    {/* Healthy Range */}

                    <div className="rounded-[var(--radius-xl)] bg-[var(--color-slate-50)] p-6">

                        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                            Healthy BMI Range
                        </p>

                        <p className="mt-3 text-3xl font-bold text-[var(--color-text-primary)]">
                            18.5 – 24.9
                        </p>

                        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                            A BMI between 18.5 and 24.9 is generally
                            considered within the healthy range for adults.
                        </p>

                    </div>

                </div>


                {/* BMI Scale */}

                <div className="mt-8">

                    <div className="mb-3 flex items-center justify-between">

                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                            BMI Scale
                        </p>

                        <p className="text-sm font-semibold text-[var(--color-brand)]">
                            Your BMI: 22.4
                        </p>

                    </div>

                    <div className="relative">

                        {/* Scale */}

                        <div className="grid grid-cols-4 overflow-hidden rounded-full">

                            <div className="h-4 bg-blue-400" />

                            <div className="h-4 bg-green-500" />

                            <div className="h-4 bg-yellow-400" />

                            <div className="h-4 bg-red-500" />

                        </div>

                        {/* Current BMI Indicator */}

                        <div
                            className="
                                absolute
                                left-[37%]
                                top-1/2
                                flex
                                -translate-x-1/2
                                -translate-y-1/2
                                items-center
                                justify-center
                                h-7
                                w-7
                                rounded-full
                                border-4
                                border-white
                                bg-[var(--color-brand)]
                                shadow-md
                            "
                            title="Your BMI: 22.4"
                        />

                    </div>

                    {/* Scale Labels */}

                    <div className="mt-2 grid grid-cols-4 text-xs text-[var(--color-text-muted)]">

                        <span>
                            Underweight
                        </span>

                        <span className="text-center">
                            Healthy
                        </span>

                        <span className="text-center">
                            Overweight
                        </span>

                        <span className="text-right">
                            Obese
                        </span>

                    </div>

                </div>


                {/* BMI Explanation */}

                <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border-color-default)] bg-[var(--color-background)] p-5">

                    <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-light)] text-lg">
                            ℹ️
                        </div>

                        <div>

                            <h3 className="font-semibold text-[var(--color-text-primary)]">
                                What does BMI mean?
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                Body Mass Index (BMI) is a simple measurement
                                calculated using your weight and height. It
                                can provide a general indication of whether
                                your weight is within a healthy range.
                            </p>

                            <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
                                BMI is a general screening measurement and
                                does not account for factors such as muscle
                                mass, body composition, age, or individual
                                health conditions.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ============================= */}
            {/* Calorie Information */}
            {/* ============================= */}

            <section
                className="
        rounded-[var(--radius-xl)]
        border
        border-[var(--border-color-default)]
        bg-[var(--color-surface)]
        p-6
        shadow-[var(--shadow-sm)]
        sm:p-8
    "
            >

                {/* Section Header */}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                                Calorie Information
                            </h2>

                            <Tooltip content="Calories are units of energy that your body gets from food and drinks. Tracking calories can help you understand your daily energy intake.">
                                <button
                                    type="button"
                                    className="
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            bg-[var(--color-slate-100)]
                            text-xs
                            font-bold
                            text-[var(--color-text-muted)]
                            transition-colors
                            hover:bg-[var(--color-brand-light)]
                            hover:text-[var(--color-brand)]
                        "
                                    aria-label="What are calories?"
                                >
                                    ?
                                </button>
                            </Tooltip>

                        </div>

                        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            Track your daily calorie intake and energy goal.
                        </p>

                    </div>

                    <div className="inline-flex w-fit items-center rounded-full bg-orange-100 px-3 py-1.5 text-sm font-semibold text-orange-700">
                        On Track
                    </div>

                </div>


                {/* Main Calorie Statistics */}

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">

                    {/* Consumed */}

                    <div className="rounded-[var(--radius-xl)] bg-orange-50 p-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-lg)] bg-orange-100 text-xl">
                                🔥
                            </div>

                            <div>

                                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                                    Consumed
                                </p>

                                <p className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">
                                    1,850
                                </p>

                            </div>

                        </div>

                        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                            kcal consumed today
                        </p>

                    </div>


                    {/* Daily Goal */}

                    <div className="rounded-[var(--radius-xl)] bg-blue-50 p-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-lg)] bg-blue-100 text-xl">
                                🎯
                            </div>

                            <div>

                                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                                    Daily Goal
                                </p>

                                <p className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">
                                    2,200
                                </p>

                            </div>

                        </div>

                        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                            recommended daily target
                        </p>

                    </div>


                    {/* Remaining */}

                    <div className="rounded-[var(--radius-xl)] bg-green-50 p-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-lg)] bg-green-100 text-xl">
                                ✅
                            </div>

                            <div>

                                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                                    Remaining
                                </p>

                                <p className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">
                                    350
                                </p>

                            </div>

                        </div>

                        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                            kcal remaining today
                        </p>

                    </div>

                </div>


                {/* Calorie Progress */}

                <div className="mt-8">

                    <div className="mb-3 flex items-center justify-between">

                        <div>

                            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                                Daily Calorie Progress
                            </p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                1,850 of 2,200 kcal consumed
                            </p>

                        </div>

                        <p className="text-sm font-bold text-[var(--color-brand)]">
                            84%
                        </p>

                    </div>


                    {/* Progress Bar */}

                    <div className="h-4 overflow-hidden rounded-full bg-[var(--color-slate-100)]">

                        <div
                            className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-orange-400
                    to-orange-600
                    transition-all
                    duration-500
                "
                            style={{ width: "84%" }}
                        />

                    </div>

                    <div className="mt-2 flex justify-between text-xs text-[var(--color-text-muted)]">

                        <span>
                            0 kcal
                        </span>

                        <span>
                            Goal: 2,200 kcal
                        </span>

                    </div>

                </div>


                {/* Calorie Breakdown */}

                <div className="mt-8">

                    <div className="flex items-center gap-2">

                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                            Today's Calorie Breakdown
                        </h3>

                        <Tooltip content="This shows how your consumed calories are distributed across your meals throughout the day.">
                            <button
                                type="button"
                                className="
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--color-slate-100)]
                        text-xs
                        font-bold
                        text-[var(--color-text-muted)]
                        hover:bg-[var(--color-brand-light)]
                        hover:text-[var(--color-brand)]
                    "
                                aria-label="Calorie breakdown information"
                            >
                                ?
                            </button>
                        </Tooltip>

                    </div>


                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

                        {/* Breakfast */}

                        <div className="rounded-[var(--radius-lg)] border border-[var(--border-color-default)] p-4">

                            <div className="flex items-center justify-between">

                                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                    🍳 Breakfast
                                </span>

                                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                                    450 kcal
                                </span>

                            </div>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-slate-100)]">

                                <div
                                    className="h-full rounded-full bg-orange-400"
                                    style={{ width: "65%" }}
                                />

                            </div>

                        </div>


                        {/* Lunch */}

                        <div className="rounded-[var(--radius-lg)] border border-[var(--border-color-default)] p-4">

                            <div className="flex items-center justify-between">

                                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                    🍱 Lunch
                                </span>

                                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                                    700 kcal
                                </span>

                            </div>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-slate-100)]">

                                <div
                                    className="h-full rounded-full bg-orange-500"
                                    style={{ width: "80%" }}
                                />

                            </div>

                        </div>


                        {/* Dinner */}

                        <div className="rounded-[var(--radius-lg)] border border-[var(--border-color-default)] p-4">

                            <div className="flex items-center justify-between">

                                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                    🍽️ Dinner
                                </span>

                                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                                    700 kcal
                                </span>

                            </div>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-slate-100)]">

                                <div
                                    className="h-full rounded-full bg-orange-600"
                                    style={{ width: "80%" }}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* Information Note */}

                <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border-color-default)] bg-[var(--color-background)] p-5">

                    <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg">
                            🔥
                        </div>

                        <div>

                            <h3 className="font-semibold text-[var(--color-text-primary)]">
                                Understanding your calorie intake
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                Your daily calorie goal represents an estimated amount
                                of energy your body may need each day. Your actual needs
                                can vary depending on factors such as age, height,
                                weight, activity level, and personal goals.
                            </p>

                            <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
                                These values are currently sample data and will later be
                                calculated from your personal health information and
                                connected nutrition data.
                            </p>

                        </div>

                    </div>

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
                                transition-colors
                                hover:bg-[var(--color-brand-hover)]
                            "
                        >
                            View Health
                        </Link>

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

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-[var(--radius-lg)]
                            bg-[var(--color-brand-light)]
                            text-xl
                        "
                    >
                        🎯
                    </div>

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