import { useState, useEffect, useCallback } from "react";
import { getGoals, createGoal, updateGoal } from "../../services/fitnessService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";

// ==========================================
// CONSTANTS
// ==========================================

const GOAL_TYPES = [
    { value: "weight_loss", label: "Weight Loss", icon: "⚖️" },
    { value: "muscle_gain", label: "Muscle Gain", icon: "💪" },
    { value: "strength", label: "Build Strength", icon: "🏋️" },
    { value: "endurance", label: "Improve Endurance", icon: "🏃" },
    { value: "flexibility", label: "Flexibility", icon: "🧘" },
    { value: "general_fitness", label: "General Fitness", icon: "❤️" },
];

const STATUS_VARIANTS = {
    active: "success",
    in_progress: "warning",
    completed: "info",
    paused: "default",
};

// ==========================================
// PROGRESS RING (SVG)
// ==========================================

function ProgressRing({ pct = 0, size = 72, stroke = 7, color = "#6366f1" }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;

    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke="#e5e7eb"
                strokeWidth={stroke}
                fill="none"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={color}
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
        </svg>
    );
}

// ==========================================
// GOAL CARD
// ==========================================

function GoalCard({ goal, onUpdate }) {
    const pct = goal.targetValue && goal.currentValue != null
        ? Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100))
        : 0;

    const typeInfo = GOAL_TYPES.find((t) => t.value === goal.goalType) || {
        label: goal.goalType || "Goal",
        icon: "🎯",
    };

    const isCompleted = pct >= 100 || goal.status === "completed";

    const ringColor =
        isCompleted
            ? "#22c55e"
            : pct >= 60
            ? "#6366f1"
            : pct >= 30
            ? "#f59e0b"
            : "#ef4444";

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-[var(--border-color-default)] bg-[var(--color-surface)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center">

            {/* Ring */}
            <div className="relative flex shrink-0 items-center justify-center">
                <ProgressRing pct={pct} color={ringColor} />
                <span className="absolute text-xs font-bold text-[var(--color-text-primary)]">
                    {pct}%
                </span>
            </div>

            {/* Info */}
            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xl">{typeInfo.icon}</span>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                        {goal.title || goal.goalType}
                    </h3>
                    <Badge variant={STATUS_VARIANTS[goal.status] || "default"}>
                        {goal.status || "active"}
                    </Badge>
                </div>

                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {typeInfo.label}
                </p>

                {goal.targetValue != null && (
                    <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">
                        Progress:{" "}
                        <span className="font-semibold text-[var(--color-text-primary)]">
                            {goal.currentValue ?? 0}
                        </span>{" "}
                        / {goal.targetValue}{" "}
                        {goal.unit || ""}
                    </p>
                )}

                {/* Progress bar */}
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: ringColor }}
                    />
                </div>

                {goal.deadline && (
                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                        🗓 Deadline:{" "}
                        {new Date(goal.deadline).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                )}
            </div>

            {/* Actions */}
            {onUpdate && (
                <div className="shrink-0">
                    {!isCompleted && (
                        <button
                            onClick={() => onUpdate(goal)}
                            className="rounded-lg border border-[var(--border-color-default)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                        >
                            Update
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

// ==========================================
// MAIN COMPONENT
// ==========================================

function Goals() {

    // ==========================================
    // STATE
    // ==========================================

    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    // Form state
    const [title, setTitle] = useState("");
    const [goalType, setGoalType] = useState("weight_loss");
    const [targetValue, setTargetValue] = useState("");
    const [currentValue, setCurrentValue] = useState("");
    const [unit, setUnit] = useState("kg");
    const [deadline, setDeadline] = useState("");
    const [notes, setNotes] = useState("");

    // ==========================================
    // DATA LOADING
    // ==========================================

    const fetchGoals = useCallback(async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = user.userId || user.id || null;
            if (!userId) { setLoading(false); return; }

            const data = await getGoals(userId);
            setGoals(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Error loading goals:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

    // ==========================================
    // FORM RESET
    // ==========================================

    const resetForm = () => {
        setTitle("");
        setGoalType("weight_loss");
        setTargetValue("");
        setCurrentValue("");
        setUnit("kg");
        setDeadline("");
        setNotes("");
        setEditingGoal(null);
        setShowForm(false);
        setError("");
        setMessage("");
    };

    const openEdit = (goal) => {
        setEditingGoal(goal);
        setTitle(goal.title || "");
        setGoalType(goal.goalType || "weight_loss");
        setTargetValue(goal.targetValue ?? "");
        setCurrentValue(goal.currentValue ?? "");
        setUnit(goal.unit || "kg");
        setDeadline(goal.deadline ? goal.deadline.slice(0, 10) : "");
        setNotes(goal.notes || "");
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!title.trim()) {
            setError("Please enter a goal title.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.userId || user.id || null;

        const payload = {
            userId,
            title: title.trim(),
            goalType,
            targetValue: targetValue !== "" ? Number(targetValue) : null,
            currentValue: currentValue !== "" ? Number(currentValue) : null,
            unit: unit.trim() || null,
            deadline: deadline || null,
            notes: notes.trim() || null,
        };

        try {
            setSubmitting(true);
            if (editingGoal) {
                await updateGoal(editingGoal.id || editingGoal.goalId, payload);
                setMessage("✅ Goal updated successfully!");
            } else {
                await createGoal(payload);
                setMessage("✅ Goal created successfully!");
            }
            resetForm();
            await fetchGoals();
        } catch (err) {
            console.error("Error saving goal:", err);
            setError(err?.response?.data?.message || "Failed to save goal.");
        } finally {
            setSubmitting(false);
        }
    };

    const inputCls =
        "mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-color-default)] bg-[var(--color-surface)] p-2.5 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--border-color-focus)] focus:ring-2 focus:ring-[var(--border-color-focus)]/30";

    const labelCls = "block text-sm font-semibold text-[var(--color-text-primary)]";

    // ==========================================
    // STATS
    // ==========================================

    const active = goals.filter((g) => (g.status || "active") !== "completed").length;
    const completed = goals.filter((g) => g.status === "completed").length;
    const avgPct =
        goals.length > 0
            ? Math.round(
                  goals.reduce((sum, g) => {
                      const p =
                          g.targetValue && g.currentValue != null
                              ? Math.min(100, (g.currentValue / g.targetValue) * 100)
                              : 0;
                      return sum + p;
                  }, 0) / goals.length
              )
            : 0;

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="space-y-8">

            {/* ============================= */}
            {/* PAGE HEADER                  */}
            {/* ============================= */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-[var(--color-brand)]">
                        Goal Setting
                    </p>
                    <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                        My Fitness Goals
                    </h1>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">
                        Set, track, and achieve your fitness milestones.
                    </p>
                </div>

                <button
                    onClick={() => { resetForm(); setShowForm((v) => !v); }}
                    className="flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-dark)] hover:shadow-md"
                >
                    {showForm ? "✕ Cancel" : "+ Add New Goal"}
                </button>
            </div>

            {/* ============================= */}
            {/* STAT CARDS                   */}
            {/* ============================= */}

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    {
                        label: "Total Goals",
                        value: goals.length,
                        icon: "🎯",
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                    },
                    {
                        label: "Active",
                        value: active,
                        icon: "🔥",
                        color: "text-green-600",
                        bg: "bg-green-50",
                    },
                    {
                        label: "Completed",
                        value: completed,
                        icon: "✅",
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                    },
                    {
                        label: "Avg Progress",
                        value: `${avgPct}%`,
                        icon: "📈",
                        color: "text-orange-600",
                        bg: "bg-orange-50",
                    },
                ].map((s) => (
                    <div
                        key={s.label}
                        className="rounded-xl border border-[var(--border-color-default)] bg-[var(--color-surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div
                            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-xl ${s.bg}`}
                        >
                            {s.icon}
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                            {s.label}
                        </p>
                        <p className={`mt-1 text-2xl font-bold ${s.color}`}>
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* ============================= */}
            {/* ALERTS                       */}
            {/* ============================= */}

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* ============================= */}
            {/* CREATE / EDIT FORM           */}
            {/* ============================= */}

            {showForm && (
                <Card>
                    <div className="mb-5 border-b border-[var(--border-color-default)] pb-4">
                        <p className="text-sm font-medium text-[var(--color-brand)]">
                            {editingGoal ? "Update Goal" : "Create Goal"}
                        </p>
                        <h2 className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                            {editingGoal ? "Edit Fitness Goal" : "Add a New Fitness Goal"}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            {/* Goal Title */}
                            <div className="sm:col-span-2">
                                <label className={labelCls}>
                                    Goal Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Lose 5 kg by March, Run 10 km"
                                    className={inputCls}
                                    required
                                />
                            </div>

                            {/* Goal Type */}
                            <div>
                                <label className={labelCls}>Goal Type</label>
                                <select
                                    value={goalType}
                                    onChange={(e) => setGoalType(e.target.value)}
                                    className={inputCls}
                                >
                                    {GOAL_TYPES.map((t) => (
                                        <option key={t.value} value={t.value}>
                                            {t.icon} {t.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Unit */}
                            <div>
                                <label className={labelCls}>Unit</label>
                                <input
                                    type="text"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    placeholder="e.g. kg, km, reps, minutes"
                                    className={inputCls}
                                />
                            </div>

                            {/* Target Value */}
                            <div>
                                <label className={labelCls}>Target Value</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    value={targetValue}
                                    onChange={(e) => setTargetValue(e.target.value)}
                                    placeholder="e.g. 70 (kg), 10 (km)"
                                    className={inputCls}
                                />
                            </div>

                            {/* Current Value */}
                            <div>
                                <label className={labelCls}>Current Value</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    value={currentValue}
                                    onChange={(e) => setCurrentValue(e.target.value)}
                                    placeholder="e.g. 78 (kg), 3 (km)"
                                    className={inputCls}
                                />
                            </div>

                            {/* Deadline */}
                            <div>
                                <label className={labelCls}>
                                    Deadline <span className="text-xs font-normal text-gray-400">(Optional)</span>
                                </label>
                                <input
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    className={inputCls}
                                />
                            </div>

                            {/* Notes */}
                            <div className="sm:col-span-2">
                                <label className={labelCls}>
                                    Notes <span className="text-xs font-normal text-gray-400">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Any additional notes about this goal"
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 border-t border-[var(--border-color-default)] pt-5">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={resetForm}
                                disabled={submitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" loading={submitting} disabled={submitting}>
                                {submitting
                                    ? "Saving..."
                                    : editingGoal
                                    ? "💾 Update Goal"
                                    : "🎯 Create Goal"}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            {/* ============================= */}
            {/* GOALS LIST                   */}
            {/* ============================= */}

            <div>
                {goals.length === 0 ? (
                    <EmptyState
                        icon="🎯"
                        title="No goals set yet"
                        description='Click "Add New Goal" above to create your first fitness goal and start tracking your progress.'
                        action={
                            <button
                                onClick={() => setShowForm(true)}
                                className="rounded-xl bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-brand-dark)]"
                            >
                                + Add First Goal
                            </button>
                        }
                    />
                ) : (
                    <div className="space-y-4">
                        {/* Active goals first */}
                        {goals
                            .filter((g) => g.status !== "completed")
                            .concat(goals.filter((g) => g.status === "completed"))
                            .map((goal) => (
                                <GoalCard
                                    key={goal.id || goal.goalId}
                                    goal={goal}
                                    onUpdate={openEdit}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Goals;
