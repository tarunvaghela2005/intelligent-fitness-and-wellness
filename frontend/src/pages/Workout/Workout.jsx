import { useState, useEffect, useCallback } from "react";
import { getWorkouts, getExercises, createWorkout } from "../../services/fitnessService";
import WorkoutForm from "../../components/workout/WorkoutForm";
import WorkoutHistoryCard from "../../components/workout/WorkoutHistoryCard";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

function Workout() {

    // ==========================================
    // STATE
    // ==========================================

    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // DATA LOADING
    // ==========================================

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = user.userId || user.id || null;

            const [workoutsData, exercisesData] = await Promise.all([
                getWorkouts(userId),
                getExercises(),
            ]);

            setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
            setExercises(Array.isArray(exercisesData) ? exercisesData : []);
        } catch (err) {
            console.error("Error loading workout data:", err);
            setError("Failed to load workout data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // ==========================================
    // HANDLERS
    // ==========================================

    const handleWorkoutCreated = () => {
        loadData();
    };

    // ==========================================
    // LOADING STATE
    // ==========================================

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    // ==========================================
    // ERROR STATE
    // ==========================================

    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                        Workout Logger
                    </h1>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        Plan, track, and manage your workouts.
                    </p>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
                    ⚠️ {error}
                    <button
                        onClick={loadData}
                        className="ml-3 font-semibold underline hover:no-underline"
                    >
                        Retry
                    </button>
                </div>
                {/* Still show the form even if data load failed */}
                <WorkoutForm exercises={exercises} onWorkoutCreated={handleWorkoutCreated} />
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    const todayWorkout = workouts.find((w) => {
        if (!w.createdAt && !w.date) return false;
        const d = new Date(w.createdAt || w.date);
        const today = new Date();
        return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
        );
    });

    return (
        <div className="space-y-8">

            {/* ============================= */}
            {/* PAGE HEADER                  */}
            {/* ============================= */}

            <div>
                <p className="text-sm font-medium text-[var(--color-brand)]">
                    Fitness Training
                </p>

                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    Workout Logger
                </h1>

                <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">
                    Plan your sessions, track sets & reps, and review your
                    workout history.
                </p>
            </div>

            {/* ============================= */}
            {/* TODAY'S SUMMARY               */}
            {/* ============================= */}

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    {
                        label: "Total Workouts",
                        value: workouts.length,
                        icon: "🏋️",
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                    },
                    {
                        label: "Today's Session",
                        value: todayWorkout ? "1 Done" : "Not Yet",
                        icon: "📅",
                        color: todayWorkout ? "text-green-600" : "text-gray-500",
                        bg: todayWorkout ? "bg-green-50" : "bg-gray-50",
                    },
                    {
                        label: "This Week",
                        value: workouts.filter((w) => {
                            const d = new Date(w.createdAt || w.date || 0);
                            const now = new Date();
                            const diff = (now - d) / (1000 * 60 * 60 * 24);
                            return diff <= 7;
                        }).length,
                        icon: "🔥",
                        color: "text-orange-600",
                        bg: "bg-orange-50",
                    },
                    {
                        label: "Exercises Available",
                        value: exercises.length,
                        icon: "💪",
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                    },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-[var(--border-color-default)] bg-[var(--color-surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-xl ${stat.bg}`}>
                            {stat.icon}
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                            {stat.label}
                        </p>
                        <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* ============================= */}
            {/* CREATE WORKOUT FORM          */}
            {/* ============================= */}

            <WorkoutForm
                exercises={exercises}
                onWorkoutCreated={handleWorkoutCreated}
            />

            {/* ============================= */}
            {/* WORKOUT HISTORY              */}
            {/* ============================= */}

            <WorkoutHistoryCard workouts={workouts} onRefresh={loadData} />

        </div>
    );
}

export default Workout;