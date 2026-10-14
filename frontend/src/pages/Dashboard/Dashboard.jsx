import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tooltip from "../../components/ui/Tooltip";
import Loader from "../../components/ui/Loader";
import { getHealthMetrics } from "../../services/healthService";
import { getDailyNutritionSummary } from "../../services/nutritionService";
import { getTodayWaterSummary } from "../../services/nutritionService";
import { getWorkouts } from "../../services/fitnessService";

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [bmi, setBmi] = useState(null);
    const [calories, setCalories] = useState({ consumed: 0, target: 2200, remaining: 2200 });
    const [water, setWater] = useState({ current: 0, target: 2500 });
    const [todayWorkout, setTodayWorkout] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userName = user.firstName || "User";
    const userId = user.userId || user.id || 1;

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Parallel API calls
            const [healthData, nutritionData, waterData, workoutsData] = await Promise.all([
                getHealthMetrics(),
                getDailyNutritionSummary(userId),
                getTodayWaterSummary(userId),
                getWorkouts(userId),
            ]);

            // BMI
            if (healthData?.bmi) {
                setBmi({
                    value: healthData.bmi.toFixed(1),
                    category: getBmiCategory(healthData.bmi),
                });
            }

            // Calories
            if (nutritionData) {
                const consumed = nutritionData.totalCalories || 0;
                const target = nutritionData.targetCalories || 2200;
                const remaining = Math.max(0, target - consumed);
                setCalories({ consumed, target, remaining });
            }

            // Water
            if (waterData) {
                setWater({
                    current: (waterData.totalAmountMl || 0) / 1000,
                    target: (waterData.targetAmountMl || 2500) / 1000,
                });
            }

            // Today's Workout
            if (workoutsData && workoutsData.length > 0) {
                const today = new Date().toISOString().split("T")[0];
                const todayWorkouts = workoutsData.filter((w) => w.date?.startsWith(today));
                if (todayWorkouts.length > 0) {
                    const totalDuration = todayWorkouts.reduce((acc, w) => acc + (w.duration || 0), 0);
                    setTodayWorkout({ duration: totalDuration });
                }
            }

            // Recent Activity
            const activity = [];
            if (workoutsData && workoutsData.length > 0) {
                activity.push({
                    type: "workout",
                    text: `Logged ${workoutsData[0].name || "a workout"}`,
                    time: formatTime(workoutsData[0].date),
                });
            }
            if (nutritionData && nutritionData.totalCalories > 0) {
                activity.push({
                    type: "meal",
                    text: `Logged meals (${nutritionData.totalCalories} kcal)`,
                    time: "Today",
                });
            }
            if (waterData && waterData.totalAmountMl > 0) {
                activity.push({
                    type: "water",
                    text: `Logged water intake (${(waterData.totalAmountMl / 1000).toFixed(1)}L)`,
                    time: "Today",
                });
            }
            setRecentActivity(activity);
        } catch (error) {
            console.error("Dashboard data fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getBmiCategory = (bmiValue) => {
        if (bmiValue < 18.5) return "Underweight";
        if (bmiValue < 25) return "Healthy";
        if (bmiValue < 30) return "Overweight";
        return "Obese";
    };

    const formatTime = (dateStr) => {
        if (!dateStr) return "Recently";
        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 60) return `${diffMins}m ago`;
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) return `${diffHours}h ago`;
            return date.toLocaleDateString();
        } catch {
            return "Recently";
        }
    };

    const caloriePercentage = calories.target > 0 ? Math.round((calories.consumed / calories.target) * 100) : 0;

    const summaryCards = [
        {
            title: "BMI",
            value: bmi?.value || "--",
            subtitle: bmi?.category || "Loading...",
            description:
                "BMI (Body Mass Index) is a measure that uses your height and weight to estimate your healthy weight range.",
            icon: "⚖️",
            iconBg: "bg-blue-100",
            iconText: "text-blue-600",
        },
        {
            title: "Calories",
            value: calories.consumed.toLocaleString(),
            subtitle: "kcal consumed today",
            description:
                "Calories represent the amount of energy you have consumed from food and drinks today.",
            icon: "🔥",
            iconBg: "bg-orange-100",
            iconText: "text-orange-600",
        },
        {
            title: "Water Intake",
            value: `${water.current.toFixed(1)} L`,
            subtitle: `of ${water.target.toFixed(1)} L daily goal`,
            description:
                "Track how much water you drink throughout the day to stay properly hydrated.",
            icon: "💧",
            iconBg: "bg-cyan-100",
            iconText: "text-cyan-600",
        },
        {
            title: "Today's Workout",
            value: todayWorkout ? `${todayWorkout.duration} min` : "0 min",
            subtitle: todayWorkout ? "Workout completed" : "No workout logged",
            description:
                "The total amount of time you have spent exercising today.",
            icon: "🏋️",
            iconBg: "bg-purple-100",
            iconText: "text-purple-600",
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Dashboard Header */}
            <div>
                <p className="text-sm font-medium text-[var(--color-brand)]">Today</p>
                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    Dashboard
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">
                    Welcome back, {userName}! 👋 Here's an overview of your fitness and wellness journey.
                </p>
            </div>

            {/* Summary Cards */}
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
                                                    flex h-5 w-5 items-center justify-center
                                                    rounded-full bg-[var(--color-slate-100)]
                                                    text-xs font-bold text-[var(--color-text-muted)]
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
                                        flex h-12 w-12 items-center justify-center
                                        rounded-[var(--radius-lg)]
                                        ${card.iconBg} ${card.iconText}
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

            {/* Quick Actions */}
            <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--color-text-primary)]">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Link
                        to="/workout"
                        className="
                            rounded-[var(--radius-xl)] border border-[var(--border-color-default)]
                            bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]
                            transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-xl">
                                🏋️
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--color-text-primary)]">
                                    Log Workout
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    Track your exercise
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/nutrition"
                        className="
                            rounded-[var(--radius-xl)] border border-[var(--border-color-default)]
                            bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]
                            transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-xl">
                                🍽️
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--color-text-primary)]">
                                    Log Meal
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    Track your nutrition
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/health"
                        className="
                            rounded-[var(--radius-xl)] border border-[var(--border-color-default)]
                            bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]
                            transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xl">
                                📊
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--color-text-primary)]">
                                    Health Metrics
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    Calculate BMI & more
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/ai-chat"
                        className="
                            rounded-[var(--radius-xl)] border border-[var(--border-color-default)]
                            bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]
                            transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-xl">
                                🤖
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--color-text-primary)]">
                                    AI Coach
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    Get recommendations
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Recent Activity */}
            <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--color-text-primary)]">
                    Recent Activity
                </h2>
                <div
                    className="
                        rounded-[var(--radius-xl)] border border-[var(--border-color-default)]
                        bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]
                    "
                >
                    {recentActivity.length === 0 ? (
                        <p className="text-center text-sm text-[var(--color-text-muted)]">
                            No recent activity. Start logging your workouts, meals, and water intake!
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {recentActivity.map((activity, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div
                                        className={`
                                            flex h-10 w-10 items-center justify-center rounded-full text-lg
                                            ${
                                                activity.type === "workout"
                                                    ? "bg-purple-100"
                                                    : activity.type === "meal"
                                                    ? "bg-orange-100"
                                                    : "bg-cyan-100"
                                            }
                                        `}
                                    >
                                        {activity.type === "workout"
                                            ? "🏋️"
                                            : activity.type === "meal"
                                            ? "🍽️"
                                            : "💧"}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[var(--color-text-primary)]">
                                            {activity.text}
                                        </p>
                                        <p className="text-xs text-[var(--color-text-muted)]">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Calorie Progress */}
            <section
                className="
                    rounded-[var(--radius-xl)] border border-[var(--border-color-default)]
                    bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8
                "
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                                Calorie Information
                            </h2>
                            <Tooltip content="Calories are units of energy that your body gets from food and drinks.">
                                <button
                                    type="button"
                                    className="
                                        flex h-6 w-6 items-center justify-center rounded-full
                                        bg-[var(--color-slate-100)] text-xs font-bold
                                        text-[var(--color-text-muted)] transition-colors
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
                        {caloriePercentage < 80 ? "Below Target" : caloriePercentage > 110 ? "Over Target" : "On Track"}
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
                                    {calories.consumed.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                            kcal consumed today
                        </p>
                    </div>

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
                                    {calories.target.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                            recommended daily target
                        </p>
                    </div>

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
                                    {calories.remaining.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                            kcal remaining today
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                                Daily Calorie Progress
                            </p>
                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {calories.consumed.toLocaleString()} of {calories.target.toLocaleString()} kcal consumed
                            </p>
                        </div>
                        <p className="text-sm font-bold text-[var(--color-brand)]">
                            {caloriePercentage}%
                        </p>
                    </div>

                    <div className="h-4 overflow-hidden rounded-full bg-[var(--color-slate-100)]">
                        <div
                            className="
                                h-full rounded-full bg-gradient-to-r
                                from-orange-400 to-orange-600 transition-all duration-500
                            "
                            style={{ width: `${Math.min(100, caloriePercentage)}%` }}
                        />
                    </div>

                    <div className="mt-2 flex justify-between text-xs text-[var(--color-text-muted)]">
                        <span>0 kcal</span>
                        <span>Goal: {calories.target.toLocaleString()} kcal</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
