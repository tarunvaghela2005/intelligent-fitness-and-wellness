import { useState } from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";
import Loader from "../ui/Loader";

// ==========================================
// HELPERS
// ==========================================

function formatDate(dateStr) {
    if (!dateStr) return "—";
    try {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    } catch {
        return dateStr;
    }
}

function difficultyVariant(difficulty) {
    const d = (difficulty || "").toLowerCase();
    if (d === "beginner") return "success";
    if (d === "intermediate") return "warning";
    if (d === "advanced") return "danger";
    return "default";
}

// ==========================================
// COMPONENT
// ==========================================

function WorkoutHistoryCard({ workouts = [], onRefresh }) {

    const [expanded, setExpanded] = useState(null);

    const toggleExpand = (id) => {
        setExpanded((prev) => (prev === id ? null : id));
    };

    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (workouts.length === 0) {
        return (
            <Card>
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                        Workout History
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        Your completed workouts will appear here.
                    </p>
                </div>
                <EmptyState
                    icon="🏋️"
                    title="No workouts logged yet"
                    description='Use the "Log a Workout Session" form above to save your first workout.'
                />
            </Card>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <Card>
            <div>
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                            Workout History
                        </h2>
                        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            {workouts.length} workout{workouts.length !== 1 ? "s" : ""} recorded.
                        </p>
                    </div>

                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            className="text-xs font-semibold text-[var(--color-brand)] hover:underline"
                        >
                            🔄 Refresh
                        </button>
                    )}
                </div>

                {/* List */}
                <div className="space-y-3">
                    {workouts.map((workout) => {
                        const wId = workout.id || workout.workoutId;
                        const isExpanded = expanded === wId;
                        const exercises = workout.exercises || workout.workoutExercises || [];

                        return (
                            <div
                                key={wId}
                                className="rounded-xl border border-[var(--border-color-default)] bg-[var(--color-bg)] transition hover:border-[var(--color-brand)]/30 hover:shadow-sm"
                            >
                                {/* ── Summary row ── */}
                                <button
                                    type="button"
                                    onClick={() => toggleExpand(wId)}
                                    className="flex w-full flex-col gap-3 px-4 py-4 text-left sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-lg">
                                            🏋️
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-[var(--color-text-primary)]">
                                                {workout.name || "Workout Session"}
                                            </h3>
                                            <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                                                {formatDate(workout.createdAt || workout.date)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3">
                                        {workout.difficulty && (
                                            <Badge variant={difficultyVariant(workout.difficulty)}>
                                                {workout.difficulty.charAt(0).toUpperCase() +
                                                    workout.difficulty.slice(1)}
                                            </Badge>
                                        )}

                                        {workout.durationMinutes && (
                                            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                                ⏱ {workout.durationMinutes} min
                                            </span>
                                        )}

                                        {workout.caloriesBurned && (
                                            <span className="text-sm font-medium text-orange-600">
                                                🔥 {workout.caloriesBurned} kcal
                                            </span>
                                        )}

                                        {exercises.length > 0 && (
                                            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                                💪 {exercises.length} exercise{exercises.length !== 1 ? "s" : ""}
                                            </span>
                                        )}

                                        <span className="text-xs text-[var(--color-text-muted)]">
                                            {isExpanded ? "▲ Less" : "▼ Details"}
                                        </span>
                                    </div>
                                </button>

                                {/* ── Expanded Exercise Detail ── */}
                                {isExpanded && exercises.length > 0 && (
                                    <div className="border-t border-[var(--border-color-default)] px-4 pb-4">
                                        <p className="mb-3 mt-3 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                                            Exercises
                                        </p>

                                        {/* Desktop header */}
                                        <div className="mb-1 hidden grid-cols-12 gap-2 px-2 sm:grid">
                                            {["Exercise", "Sets", "Reps", "Weight", "Duration", "Notes"].map(
                                                (col) => (
                                                    <p
                                                        key={col}
                                                        className={`text-xs font-semibold text-[var(--color-text-muted)] ${col === "Exercise" ? "col-span-4" : col === "Notes" ? "col-span-2" : "col-span-1"}`}
                                                    >
                                                        {col}
                                                    </p>
                                                )
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            {exercises.map((ex, idx) => (
                                                <div
                                                    key={ex.id || idx}
                                                    className="rounded-lg bg-[var(--color-surface)] px-3 py-2.5 text-sm sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center"
                                                >
                                                    {/* Mobile: stacked */}
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 sm:contents">
                                                        <p className="font-semibold text-[var(--color-text-primary)] sm:col-span-4">
                                                            {ex.exerciseName ||
                                                                ex.name ||
                                                                `Exercise ${idx + 1}`}
                                                        </p>

                                                        <p className="text-[var(--color-text-secondary)] sm:col-span-1">
                                                            <span className="sm:hidden text-xs text-gray-400">Sets: </span>
                                                            {ex.sets ?? "—"}
                                                        </p>

                                                        <p className="text-[var(--color-text-secondary)] sm:col-span-1">
                                                            <span className="sm:hidden text-xs text-gray-400">Reps: </span>
                                                            {ex.reps ?? "—"}
                                                        </p>

                                                        <p className="text-[var(--color-text-secondary)] sm:col-span-1">
                                                            <span className="sm:hidden text-xs text-gray-400">Weight: </span>
                                                            {ex.weightKg != null
                                                                ? `${ex.weightKg} kg`
                                                                : "BW"}
                                                        </p>

                                                        <p className="text-[var(--color-text-secondary)] sm:col-span-2">
                                                            <span className="sm:hidden text-xs text-gray-400">Duration: </span>
                                                            {ex.durationSeconds
                                                                ? `${ex.durationSeconds}s`
                                                                : "—"}
                                                        </p>

                                                        <p className="text-[var(--color-text-muted)] sm:col-span-2">
                                                            {ex.notes || "—"}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Notes section */}
                                {isExpanded && workout.notes && (
                                    <div className="border-t border-[var(--border-color-default)] px-4 pb-4">
                                        <p className="mt-3 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                                            Session Notes
                                        </p>
                                        <p className="mt-1 text-sm italic text-[var(--color-text-secondary)]">
                                            {workout.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
}

export default WorkoutHistoryCard;