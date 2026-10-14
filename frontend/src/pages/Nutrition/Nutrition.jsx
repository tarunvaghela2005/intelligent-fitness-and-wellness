import { useState, useEffect, useCallback } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { getFoods, logMeal, getTodayMeals, getNutritionSummary } from "../../services/fitnessService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

// ==========================================
// CONSTANTS
// ==========================================

const MACRO_TARGETS = {
    calories: 2200,
    protein: 140,
    carbs: 250,
    fats: 60,
};

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack", "Pre-Workout", "Post-Workout"];

const MACRO_COLORS = {
    protein: "#6366f1",
    carbs: "#f59e0b",
    fats: "#ef4444",
    remaining: "#e5e7eb",
};

// ==========================================
// MACRO PROGRESS BAR
// ==========================================

function MacroBar({ label, current, target, color, unit = "g" }) {
    const pct = Math.min(100, target > 0 ? Math.round((current / target) * 100) : 0);
    const isOver = pct >= 100;

    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--color-text-primary)]">
                    {label}
                </span>
                <span className={isOver ? "font-bold text-red-500" : "text-[var(--color-text-secondary)]"}>
                    {Math.round(current)} / {target} {unit}
                    {isOver && " ⚠️"}
                </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${pct}%`,
                        backgroundColor: isOver ? "#ef4444" : color,
                    }}
                />
            </div>
            <p className="mt-0.5 text-right text-xs text-[var(--color-text-muted)]">
                {pct}%
            </p>
        </div>
    );
}

// ==========================================
// MEAL TYPE BADGE COLOR
// ==========================================

function mealTypeBg(type) {
    const map = {
        Breakfast: "bg-yellow-100 text-yellow-800",
        Lunch: "bg-green-100 text-green-800",
        Dinner: "bg-blue-100 text-blue-800",
        Snack: "bg-purple-100 text-purple-800",
        "Pre-Workout": "bg-orange-100 text-orange-800",
        "Post-Workout": "bg-pink-100 text-pink-800",
    };
    return map[type] || "bg-gray-100 text-gray-700";
}

// ==========================================
// COMPONENT
// ==========================================

function Nutrition() {

    // ==========================================
    // STATE
    // ==========================================

    const [foods, setFoods] = useState([]);
    const [todayMeals, setTodayMeals] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedFoodId, setSelectedFoodId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [mealType, setMealType] = useState("Breakfast");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ==========================================
    // DATA LOADING
    // ==========================================

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [foodsData, mealsData, summaryData] = await Promise.all([
                getFoods(),
                getTodayMeals(),
                getNutritionSummary(),
            ]);

            const f = Array.isArray(foodsData) ? foodsData : [];
            const m = Array.isArray(mealsData) ? mealsData : [];
            setFoods(f);
            setTodayMeals(m);
            setSummary(summaryData);

            if (f.length > 0 && !selectedFoodId) {
                setSelectedFoodId(String(f[0].id));
            }
        } catch (e) {
            console.error("Error loading nutrition data:", e);
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // ==========================================
    // LOG MEAL
    // ==========================================

    const handleLogMeal = async (e) => {
        e.preventDefault();
        if (!selectedFoodId) return;

        try {
            setSubmitting(true);
            setError("");
            setMessage("");

            await logMeal({
                foodId: Number(selectedFoodId),
                quantity: Number(quantity),
                mealType: mealType,
            });

            setMessage(`✅ Meal logged to ${mealType}!`);
            setQuantity(1);
            await fetchData();
        } catch (err) {
            console.error("Error logging meal:", err);
            setError("Failed to log meal. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // COMPUTED MACROS
    // ==========================================

    const totals = {
        calories: summary?.totalCalories ?? 0,
        protein: summary?.totalProtein ?? 0,
        carbs: summary?.totalCarbs ?? summary?.totalCarbohydrates ?? 0,
        fats: summary?.totalFats ?? summary?.totalFat ?? 0,
    };

    const pieMacroData = [
        { name: "Protein", value: Math.round(totals.protein * 4), color: MACRO_COLORS.protein },
        { name: "Carbs", value: Math.round(totals.carbs * 4), color: MACRO_COLORS.carbs },
        { name: "Fats", value: Math.round(totals.fats * 9), color: MACRO_COLORS.fats },
    ].filter((d) => d.value > 0);

    const inputCls =
        "mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-color-default)] bg-[var(--color-surface)] p-2.5 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--border-color-focus)] focus:ring-2 focus:ring-[var(--border-color-focus)]/30";

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

            <div>
                <p className="text-sm font-medium text-[var(--color-brand)]">
                    Nutrition &amp; Diet
                </p>
                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    Nutrition Tracker
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">
                    Track your daily food intake, calories, and macronutrients.
                </p>
            </div>

            {/* ============================= */}
            {/* MACRO SUMMARY STAT CARDS     */}
            {/* ============================= */}

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    {
                        label: "Calories",
                        value: Math.round(totals.calories),
                        unit: "kcal",
                        target: MACRO_TARGETS.calories,
                        icon: "🔥",
                        color: "text-orange-600",
                        bg: "bg-orange-50",
                    },
                    {
                        label: "Protein",
                        value: Math.round(totals.protein),
                        unit: "g",
                        target: MACRO_TARGETS.protein,
                        icon: "💪",
                        color: "text-indigo-600",
                        bg: "bg-indigo-50",
                    },
                    {
                        label: "Carbohydrates",
                        value: Math.round(totals.carbs),
                        unit: "g",
                        target: MACRO_TARGETS.carbs,
                        icon: "🍞",
                        color: "text-amber-600",
                        bg: "bg-amber-50",
                    },
                    {
                        label: "Fats",
                        value: Math.round(totals.fats),
                        unit: "g",
                        target: MACRO_TARGETS.fats,
                        icon: "🥑",
                        color: "text-rose-600",
                        bg: "bg-rose-50",
                    },
                ].map((m) => (
                    <div
                        key={m.label}
                        className="rounded-xl border border-[var(--border-color-default)] bg-[var(--color-surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div
                            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-xl ${m.bg}`}
                        >
                            {m.icon}
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                            {m.label}
                        </p>
                        <p className={`mt-1 text-2xl font-bold ${m.color}`}>
                            {m.value}
                            <span className="ml-1 text-sm font-normal text-gray-400">
                                {m.unit}
                            </span>
                        </p>
                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            Target: {m.target} {m.unit}
                        </p>
                    </div>
                ))}
            </div>

            {/* ============================= */}
            {/* MACRO PROGRESS + PIE CHART   */}
            {/* ============================= */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Macro Progress Bars */}
                <Card>
                    <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
                        Today's Macro Progress
                    </h2>
                    <div className="space-y-5">
                        <MacroBar
                            label="Calories"
                            current={totals.calories}
                            target={MACRO_TARGETS.calories}
                            color="#f97316"
                            unit="kcal"
                        />
                        <MacroBar
                            label="Protein"
                            current={totals.protein}
                            target={MACRO_TARGETS.protein}
                            color={MACRO_COLORS.protein}
                        />
                        <MacroBar
                            label="Carbohydrates"
                            current={totals.carbs}
                            target={MACRO_TARGETS.carbs}
                            color={MACRO_COLORS.carbs}
                        />
                        <MacroBar
                            label="Fats"
                            current={totals.fats}
                            target={MACRO_TARGETS.fats}
                            color={MACRO_COLORS.fats}
                        />
                    </div>
                </Card>

                {/* Macro Distribution Pie Chart */}
                <Card>
                    <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
                        Calorie Distribution
                    </h2>
                    {pieMacroData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={pieMacroData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {pieMacroData.map((entry) => (
                                        <Cell key={entry.name} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(v) => [`${v} kcal`, ""]}
                                />
                                <Legend
                                    formatter={(v) => (
                                        <span className="text-xs">{v}</span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <EmptyState
                            icon="🥗"
                            title="No meals logged"
                            description="Log your first meal to see the macro distribution."
                            size="sm"
                        />
                    )}
                </Card>
            </div>

            {/* ============================= */}
            {/* LOG MEAL + TODAY'S MEALS     */}
            {/* ============================= */}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                {/* Log Meal Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                            Log a Meal
                        </h2>
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                            Select food, serving count, and meal type.
                        </p>

                        <form onSubmit={handleLogMeal} className="mt-5 space-y-4">
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}

                            {/* Meal Type */}
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-primary)]">
                                    Meal Type
                                </label>
                                <select
                                    value={mealType}
                                    onChange={(e) => setMealType(e.target.value)}
                                    className={inputCls}
                                >
                                    {MEAL_TYPES.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Food Item */}
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-primary)]">
                                    Food Item
                                </label>
                                {foods.length === 0 ? (
                                    <p className="mt-1.5 rounded-lg border border-dashed border-gray-300 p-3 text-center text-xs text-gray-400">
                                        No food items available in the catalog.
                                    </p>
                                ) : (
                                    <select
                                        value={selectedFoodId}
                                        onChange={(e) => setSelectedFoodId(e.target.value)}
                                        className={inputCls}
                                    >
                                        {foods.map((food) => (
                                            <option key={food.id} value={food.id}>
                                                {food.foodName || food.name} (
                                                {food.servingSize || "1 serving"} —{" "}
                                                {food.calories} kcal)
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Preview macros for selected food */}
                            {selectedFoodId && foods.length > 0 && (() => {
                                const f = foods.find((x) => String(x.id) === String(selectedFoodId));
                                if (!f) return null;
                                return (
                                    <div className="rounded-lg bg-[var(--color-slate-50)] p-3 text-xs">
                                        <p className="font-semibold text-[var(--color-text-primary)]">
                                            Per {quantity} serving(s)
                                        </p>
                                        <div className="mt-1.5 grid grid-cols-3 gap-2 text-center">
                                            <div>
                                                <p className="font-bold text-indigo-600">
                                                    {Math.round((f.protein || 0) * quantity)}g
                                                </p>
                                                <p className="text-gray-400">Protein</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-amber-600">
                                                    {Math.round((f.carbohydrates || f.carbs || 0) * quantity)}g
                                                </p>
                                                <p className="text-gray-400">Carbs</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-rose-600">
                                                    {Math.round((f.fats || f.fat || 0) * quantity)}g
                                                </p>
                                                <p className="text-gray-400">Fats</p>
                                            </div>
                                        </div>
                                        <p className="mt-1.5 text-center font-bold text-orange-600">
                                            {Math.round((f.calories || 0) * quantity)} kcal total
                                        </p>
                                    </div>
                                );
                            })()}

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-primary)]">
                                    Quantity (Servings)
                                </label>
                                <input
                                    type="number"
                                    min="0.25"
                                    step="0.25"
                                    max="10"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className={inputCls}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                loading={submitting}
                                disabled={submitting || foods.length === 0}
                                className="w-full"
                            >
                                🍽 Log to {mealType}
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Today's Meals List */}
                <div className="lg:col-span-2">
                    <Card>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                                Today's Meals
                            </h2>
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                {todayMeals.length} logged
                            </span>
                        </div>

                        {todayMeals.length === 0 ? (
                            <EmptyState
                                icon="🥗"
                                title="No meals logged today"
                                description="Use the form on the left to log your first meal."
                                size="sm"
                            />
                        ) : (
                            <div className="space-y-3">
                                {todayMeals.map((meal, idx) => (
                                    <div
                                        key={meal.id || idx}
                                        className="flex flex-col gap-3 rounded-xl border border-[var(--border-color-default)] bg-[var(--color-bg)] p-4 transition hover:border-green-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-base">
                                                🍽
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[var(--color-text-primary)]">
                                                    {meal.foodName || meal.name || "Food Item"}
                                                </p>
                                                <div className="mt-0.5 flex items-center gap-2">
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${mealTypeBg(meal.mealType)}`}
                                                    >
                                                        {meal.mealType || "Meal"}
                                                    </span>
                                                    <span className="text-xs text-[var(--color-text-muted)]">
                                                        × {meal.quantity || 1} serving(s)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-orange-600">
                                                {meal.calories} kcal
                                            </p>
                                            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                                                P {meal.protein}g · C {meal.carbohydrates ?? meal.carbs}g · F {meal.fats ?? meal.fat}g
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Nutrition;