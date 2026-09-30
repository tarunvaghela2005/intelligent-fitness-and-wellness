import { useState, useEffect } from "react";
import { getFoods, logMeal, getTodayMeals, getNutritionSummary } from "../../services/fitnessService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Loader from "../../components/ui/Loader";

function Nutrition() {
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

    const fetchData = async () => {
        try {
            setLoading(true);
            const [foodsData, mealsData, summaryData] = await Promise.all([
                getFoods(),
                getTodayMeals(),
                getNutritionSummary()
            ]);
            setFoods(foodsData);
            setTodayMeals(mealsData);
            setSummary(summaryData);
            if (foodsData.length > 0 && !selectedFoodId) {
                setSelectedFoodId(foodsData[0].id);
            }
        } catch (e) {
            console.error("Error loading nutrition data:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

            setMessage("Meal logged successfully!");
            await fetchData();
        } catch (err) {
            console.error("Error logging meal:", err);
            setError("Failed to log meal. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-sm font-medium text-[var(--color-brand)]">Nutrition & Diet</p>
                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    Nutrition Tracker
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    Track your daily food intake, calories, and macronutrients.
                </p>
            </div>

            {/* Daily Nutrition Summary Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">Total Calories</p>
                    <p className="mt-2 text-3xl font-bold text-orange-600">
                        {summary?.totalCalories ? Math.round(summary.totalCalories) : 0} <span className="text-sm font-normal text-gray-500">kcal</span>
                    </p>
                    <p className="mt-2 text-xs text-gray-400">Target: ~2,200 kcal</p>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">Protein</p>
                    <p className="mt-2 text-3xl font-bold text-blue-600">
                        {summary?.totalProtein ? Math.round(summary.totalProtein) : 0} <span className="text-sm font-normal text-gray-500">g</span>
                    </p>
                    <p className="mt-2 text-xs text-gray-400">Target: ~140g</p>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">Carbohydrates</p>
                    <p className="mt-2 text-3xl font-bold text-amber-600">
                        {summary?.totalCarbs ? Math.round(summary.totalCarbs) : 0} <span className="text-sm font-normal text-gray-500">g</span>
                    </p>
                    <p className="mt-2 text-xs text-gray-400">Target: ~250g</p>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">Fats</p>
                    <p className="mt-2 text-3xl font-bold text-rose-600">
                        {summary?.totalFats ? Math.round(summary.totalFats) : 0} <span className="text-sm font-normal text-gray-500">g</span>
                    </p>
                    <p className="mt-2 text-xs text-gray-400">Target: ~60g</p>
                </Card>
            </div>

            {/* Log Meal Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <Card>
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Log a Meal</h2>
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Select food and serving count</p>

                        <form onSubmit={handleLogMeal} className="mt-5 space-y-4">
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Meal Type</label>
                                <select
                                    value={mealType}
                                    onChange={(e) => setMealType(e.target.value)}
                                    className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                                >
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Food Item</label>
                                <select
                                    value={selectedFoodId}
                                    onChange={(e) => setSelectedFoodId(e.target.value)}
                                    className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                                >
                                    {foods.map((food) => (
                                        <option key={food.id} value={food.id}>
                                            {food.foodName} ({food.servingSize} - {food.calories} kcal)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Quantity (Servings)</label>
                                <input
                                    type="number"
                                    min="0.25"
                                    step="0.25"
                                    max="10"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                                    required
                                />
                            </div>

                            <Button type="submit" loading={submitting} className="w-full">
                                + Log to Today's Meals
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Today's Logged Meals */}
                <div className="lg:col-span-2">
                    <Card>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Today's Meals</h2>
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                {todayMeals.length} logged
                            </span>
                        </div>

                        {todayMeals.length === 0 ? (
                            <div className="mt-8 py-10 text-center text-gray-400">
                                <span className="text-4xl">🥗</span>
                                <p className="mt-2 text-sm">No meals logged for today yet. Use the form to add one!</p>
                            </div>
                        ) : (
                            <div className="mt-5 space-y-3">
                                {todayMeals.map((meal, idx) => (
                                    <div
                                        key={meal.id || idx}
                                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-900">{meal.foodName}</p>
                                            <p className="text-xs text-gray-500">
                                                {meal.mealType || "Meal"} • {meal.quantity || 1} serving(s)
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-orange-600">{meal.calories} kcal</p>
                                            <p className="text-xs text-gray-400">
                                                P: {meal.protein}g | C: {meal.carbohydrates}g | F: {meal.fats}g
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