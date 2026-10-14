import { useState } from "react";
import { createWorkout } from "../../services/fitnessService";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import Loader from "../ui/Loader";

// ==========================================
// CONSTANTS
// ==========================================

const MUSCLE_GROUPS = [
    "Chest",
    "Back",
    "Shoulders",
    "Arms",
    "Core",
    "Legs",
    "Glutes",
    "Full Body",
    "Cardio",
];

const GOALS = [
    { value: "strength", label: "Build Strength" },
    { value: "muscle_gain", label: "Muscle Gain" },
    { value: "weight_loss", label: "Weight Loss" },
    { value: "endurance", label: "Improve Endurance" },
    { value: "general_fitness", label: "General Fitness" },
];

const DIFFICULTIES = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

// ==========================================
// EMPTY EXERCISE ROW
// ==========================================

function emptyExerciseRow() {
    return {
        id: Date.now() + Math.random(),
        exerciseId: "",
        exerciseName: "",
        sets: 3,
        reps: 10,
        weightKg: "",
        durationSeconds: "",
        notes: "",
    };
}

// ==========================================
// COMPONENT
// ==========================================

function WorkoutForm({ exercises = [], onWorkoutCreated }) {

    // ==========================================
    // FORM STATE
    // ==========================================

    const [workoutName, setWorkoutName] = useState("");
    const [workoutGoal, setWorkoutGoal] = useState("");
    const [workoutDifficulty, setWorkoutDifficulty] = useState("");
    const [workoutDuration, setWorkoutDuration] = useState("");
    const [exerciseRows, setExerciseRows] = useState([emptyExerciseRow()]);
    const [workoutNotes, setWorkoutNotes] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // ==========================================
    // EXERCISE ROW HANDLERS
    // ==========================================

    const addExerciseRow = () => {
        setExerciseRows((prev) => [...prev, emptyExerciseRow()]);
    };

    const removeExerciseRow = (rowId) => {
        if (exerciseRows.length === 1) return; // keep at least one row
        setExerciseRows((prev) => prev.filter((r) => r.id !== rowId));
    };

    const updateExerciseRow = (rowId, field, value) => {
        setExerciseRows((prev) =>
            prev.map((row) => {
                if (row.id !== rowId) return row;

                // If the exercise picker changes, populate the name automatically
                if (field === "exerciseId") {
                    const found = exercises.find(
                        (e) => String(e.id) === String(value)
                    );
                    return {
                        ...row,
                        exerciseId: value,
                        exerciseName: found ? found.name || found.exerciseName || "" : "",
                    };
                }

                return { ...row, [field]: value };
            })
        );
    };

    // ==========================================
    // FORM SUBMIT
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        // Validation
        if (!workoutName.trim()) {
            setError("Please enter a workout name.");
            return;
        }

        const validExercises = exerciseRows.filter(
            (r) => r.exerciseName.trim() !== "" || r.exerciseId !== ""
        );

        if (validExercises.length === 0) {
            setError(
                "Please add at least one exercise (enter a name or pick from the list)."
            );
            return;
        }

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.userId || user.id || null;

        const payload = {
            userId,
            name: workoutName.trim(),
            goal: workoutGoal || "general_fitness",
            difficulty: workoutDifficulty || "intermediate",
            durationMinutes: workoutDuration ? Number(workoutDuration) : null,
            notes: workoutNotes.trim() || null,
            exercises: validExercises.map((r) => ({
                exerciseId: r.exerciseId ? Number(r.exerciseId) : null,
                exerciseName: r.exerciseName.trim(),
                sets: Number(r.sets) || 1,
                reps: Number(r.reps) || 1,
                weightKg: r.weightKg !== "" ? Number(r.weightKg) : null,
                durationSeconds: r.durationSeconds !== "" ? Number(r.durationSeconds) : null,
                notes: r.notes.trim() || null,
            })),
        };

        try {
            setLoading(true);
            await createWorkout(payload);
            setSuccess(`✅ "${workoutName}" saved successfully!`);
            // Reset form
            setWorkoutName("");
            setWorkoutGoal("");
            setWorkoutDifficulty("");
            setWorkoutDuration("");
            setExerciseRows([emptyExerciseRow()]);
            setWorkoutNotes("");
            if (onWorkoutCreated) onWorkoutCreated();
        } catch (err) {
            console.error("Error creating workout:", err);
            setError(
                err?.response?.data?.message ||
                "Failed to save workout. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setWorkoutName("");
        setWorkoutGoal("");
        setWorkoutDifficulty("");
        setWorkoutDuration("");
        setExerciseRows([emptyExerciseRow()]);
        setWorkoutNotes("");
        setError("");
        setSuccess("");
    };

    // ==========================================
    // SHARED INPUT STYLE
    // ==========================================

    const inputCls = `
        w-full rounded-[var(--radius-md)] border border-[var(--border-color-default)]
        bg-[var(--color-surface)] px-3 py-2.5 text-sm
        text-[var(--color-text-primary)] outline-none transition
        focus:border-[var(--border-color-focus)] focus:ring-2
        focus:ring-[var(--border-color-focus)]/30
    `;

    const labelCls =
        "mb-1.5 block text-sm font-semibold text-[var(--color-text-primary)]";

    // ==========================================
    // UI
    // ==========================================

    return (
        <Card>
            <div>
                {/* ============================= */}
                {/* HEADER                       */}
                {/* ============================= */}

                <div className="mb-6 border-b border-[var(--border-color-default)] pb-5">
                    <p className="text-sm font-medium text-[var(--color-brand)]">
                        Workout Planning
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                        Log a Workout Session
                    </h2>

                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        Add your workout details, exercises, sets, reps, and
                        weight — then save to your history.
                    </p>
                </div>

                {/* ============================= */}
                {/* ALERTS                       */}
                {/* ============================= */}

                {success && (
                    <div className="mb-4">
                        <Alert variant="success">{success}</Alert>
                    </div>
                )}
                {error && (
                    <div className="mb-4">
                        <Alert variant="danger">{error}</Alert>
                    </div>
                )}

                {/* ============================= */}
                {/* FORM                         */}
                {/* ============================= */}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* ── Workout Basics ────────────────────────── */}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        {/* Workout Name */}
                        <div className="sm:col-span-2">
                            <label htmlFor="workoutName" className={labelCls}>
                                Workout Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="workoutName"
                                type="text"
                                value={workoutName}
                                onChange={(e) => setWorkoutName(e.target.value)}
                                placeholder="e.g. Morning Push Day, Leg Day, Full Body HIIT"
                                className={inputCls}
                                required
                            />
                        </div>

                        {/* Fitness Goal */}
                        <div>
                            <label htmlFor="workoutGoal" className={labelCls}>
                                Fitness Goal
                            </label>
                            <select
                                id="workoutGoal"
                                value={workoutGoal}
                                onChange={(e) => setWorkoutGoal(e.target.value)}
                                className={inputCls}
                            >
                                <option value="">Select goal (optional)</option>
                                {GOALS.map((g) => (
                                    <option key={g.value} value={g.value}>
                                        {g.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label htmlFor="workoutDifficulty" className={labelCls}>
                                Difficulty Level
                            </label>
                            <select
                                id="workoutDifficulty"
                                value={workoutDifficulty}
                                onChange={(e) =>
                                    setWorkoutDifficulty(e.target.value)
                                }
                                className={inputCls}
                            >
                                <option value="">Select difficulty (optional)</option>
                                {DIFFICULTIES.map((d) => (
                                    <option key={d.value} value={d.value}>
                                        {d.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Duration */}
                        <div>
                            <label htmlFor="workoutDuration" className={labelCls}>
                                Session Duration (minutes)
                            </label>
                            <div className="relative">
                                <input
                                    id="workoutDuration"
                                    type="number"
                                    min="5"
                                    max="300"
                                    step="5"
                                    value={workoutDuration}
                                    onChange={(e) =>
                                        setWorkoutDuration(e.target.value)
                                    }
                                    placeholder="e.g. 45"
                                    className={`${inputCls} pr-14`}
                                />
                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)]">
                                    min
                                </span>
                            </div>
                        </div>

                        {/* Workout Notes */}
                        <div>
                            <label htmlFor="workoutNotes" className={labelCls}>
                                Session Notes (Optional)
                            </label>
                            <input
                                id="workoutNotes"
                                type="text"
                                value={workoutNotes}
                                onChange={(e) => setWorkoutNotes(e.target.value)}
                                placeholder="e.g. Felt strong today, PR on bench"
                                className={inputCls}
                            />
                        </div>
                    </div>

                    {/* ── Exercises Table ────────────────────────── */}

                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                                    Exercises <span className="text-red-500">*</span>
                                </h3>
                                <p className="text-xs text-[var(--color-text-secondary)]">
                                    Add exercises with sets, reps, and weight.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addExerciseRow}
                                className="flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-light)] px-3 py-2 text-xs font-semibold text-[var(--color-brand)] transition hover:bg-[var(--color-brand)] hover:text-white"
                            >
                                + Add Exercise
                            </button>
                        </div>

                        {/* Desktop Table Header */}
                        <div className="hidden rounded-t-lg border border-b-0 border-[var(--border-color-default)] bg-[var(--color-slate-50)] px-3 py-2.5 sm:grid sm:grid-cols-12 sm:gap-2">
                            <p className="col-span-4 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                                Exercise
                            </p>
                            <p className="col-span-1 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                                Sets
                            </p>
                            <p className="col-span-1 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                                Reps
                            </p>
                            <p className="col-span-2 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                                Weight (kg)
                            </p>
                            <p className="col-span-2 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                                Duration (s)
                            </p>
                            <p className="col-span-2 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                                Notes
                            </p>
                        </div>

                        {/* Exercise Rows */}
                        <div className="divide-y divide-[var(--border-color-default)] rounded-b-lg border border-[var(--border-color-default)] sm:rounded-t-none">
                            {exerciseRows.map((row, idx) => (
                                <div
                                    key={row.id}
                                    className="space-y-3 p-3 sm:grid sm:grid-cols-12 sm:items-center sm:gap-2 sm:space-y-0"
                                >
                                    {/* Row number badge (mobile) */}
                                    <div className="flex items-center justify-between sm:hidden">
                                        <span className="text-xs font-bold text-[var(--color-brand)]">
                                            Exercise #{idx + 1}
                                        </span>
                                        {exerciseRows.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeExerciseRow(row.id)}
                                                className="text-xs font-semibold text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    {/* Exercise Name / Picker */}
                                    <div className="sm:col-span-4">
                                        <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)] sm:hidden">
                                            Exercise Name *
                                        </label>
                                        {exercises.length > 0 ? (
                                            <select
                                                value={row.exerciseId}
                                                onChange={(e) =>
                                                    updateExerciseRow(
                                                        row.id,
                                                        "exerciseId",
                                                        e.target.value
                                                    )
                                                }
                                                className={inputCls}
                                            >
                                                <option value="">
                                                    — Pick exercise —
                                                </option>
                                                {MUSCLE_GROUPS.map((group) => {
                                                    const grouped = exercises.filter(
                                                        (ex) =>
                                                            (ex.muscleGroup ||
                                                                ex.category ||
                                                                "Other") === group
                                                    );
                                                    return grouped.length > 0 ? (
                                                        <optgroup
                                                            key={group}
                                                            label={group}
                                                        >
                                                            {grouped.map((ex) => (
                                                                <option
                                                                    key={ex.id}
                                                                    value={ex.id}
                                                                >
                                                                    {ex.name ||
                                                                        ex.exerciseName}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    ) : null;
                                                })}
                                                {/* Exercises without a known group */}
                                                {exercises
                                                    .filter(
                                                        (ex) =>
                                                            !MUSCLE_GROUPS.includes(
                                                                ex.muscleGroup ||
                                                                ex.category
                                                            )
                                                    )
                                                    .map((ex) => (
                                                        <option
                                                            key={ex.id}
                                                            value={ex.id}
                                                        >
                                                            {ex.name ||
                                                                ex.exerciseName}
                                                        </option>
                                                    ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={row.exerciseName}
                                                onChange={(e) =>
                                                    updateExerciseRow(
                                                        row.id,
                                                        "exerciseName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g. Bench Press"
                                                className={inputCls}
                                            />
                                        )}
                                    </div>

                                    {/* Sets */}
                                    <div className="sm:col-span-1">
                                        <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)] sm:hidden">
                                            Sets
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="20"
                                            value={row.sets}
                                            onChange={(e) =>
                                                updateExerciseRow(
                                                    row.id,
                                                    "sets",
                                                    e.target.value
                                                )
                                            }
                                            className={inputCls}
                                        />
                                    </div>

                                    {/* Reps */}
                                    <div className="sm:col-span-1">
                                        <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)] sm:hidden">
                                            Reps
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={row.reps}
                                            onChange={(e) =>
                                                updateExerciseRow(
                                                    row.id,
                                                    "reps",
                                                    e.target.value
                                                )
                                            }
                                            className={inputCls}
                                        />
                                    </div>

                                    {/* Weight */}
                                    <div className="sm:col-span-2">
                                        <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)] sm:hidden">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.5"
                                            value={row.weightKg}
                                            onChange={(e) =>
                                                updateExerciseRow(
                                                    row.id,
                                                    "weightKg",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="kg"
                                            className={inputCls}
                                        />
                                    </div>

                                    {/* Duration seconds (for cardio) */}
                                    <div className="sm:col-span-2">
                                        <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)] sm:hidden">
                                            Duration (s)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="5"
                                            value={row.durationSeconds}
                                            onChange={(e) =>
                                                updateExerciseRow(
                                                    row.id,
                                                    "durationSeconds",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="sec"
                                            className={inputCls}
                                        />
                                    </div>

                                    {/* Notes */}
                                    <div className="sm:col-span-2">
                                        <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)] sm:hidden">
                                            Notes
                                        </label>
                                        <input
                                            type="text"
                                            value={row.notes}
                                            onChange={(e) =>
                                                updateExerciseRow(
                                                    row.id,
                                                    "notes",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Optional note"
                                            className={inputCls}
                                        />
                                    </div>

                                    {/* Remove button (desktop) */}
                                    {exerciseRows.length > 1 && (
                                        <div className="hidden sm:col-span-1 sm:flex sm:items-center sm:justify-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeExerciseRow(row.id)
                                                }
                                                title="Remove exercise"
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add another exercise (below table) */}
                        <button
                            type="button"
                            onClick={addExerciseRow}
                            className="mt-3 w-full rounded-lg border-2 border-dashed border-[var(--border-color-default)] py-3 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                        >
                            + Add Another Exercise
                        </button>
                    </div>

                    {/* ── Form Actions ────────────────────────────── */}

                    <div className="flex flex-col gap-3 border-t border-[var(--border-color-default)] pt-5 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleReset}
                            disabled={loading}
                        >
                            Reset Form
                        </Button>

                        <Button
                            type="submit"
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "💾 Save Workout"}
                        </Button>
                    </div>

                </form>
            </div>
        </Card>
    );
}

export default WorkoutForm;