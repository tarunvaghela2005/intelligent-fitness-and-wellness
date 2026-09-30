import { useState, useEffect } from "react";
import { getWorkoutRecommendation, getMealRecommendation, getProgressAnalysis, getWellnessGuidance } from "../../services/aiService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

function AiChat() {
    const [selectedTab, setSelectedTab] = useState("workout");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    // Form parameters
    const [goal, setGoal] = useState("Muscle Gain & Strength");
    const [level, setLevel] = useState("Intermediate");
    const [calories, setCalories] = useState(2400);
    const [diet, setDiet] = useState("High Protein");

    const fetchAdvice = async (tab = selectedTab) => {
        try {
            setLoading(true);
            let res = "";
            if (tab === "workout") {
                res = await getWorkoutRecommendation({ goal, experienceLevel: level });
            } else if (tab === "meal") {
                res = await getMealRecommendation({ targetCalories: Number(calories), dietaryPreference: diet });
            } else if (tab === "progress") {
                res = await getProgressAnalysis({ startWeight: 75.0, currentWeight: 72.5 });
            } else if (tab === "wellness") {
                res = await getWellnessGuidance();
            }
            setResponse(res);
        } catch (e) {
            console.error("AI Error:", e);
            setResponse("Error generating AI response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdvice(selectedTab);
    }, [selectedTab]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-sm font-medium text-[var(--color-brand)]">AI Fitness Intelligence</p>
                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    AI Wellness Coach
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    Ask your smart AI coach for personalized workout routines, nutrition plans, and recovery advice.
                </p>
            </div>

            {/* Coach Category Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                {[
                    { id: "workout", label: "🏋️ Workout Split Plan" },
                    { id: "meal", label: "🥗 Meal & Macro Plan" },
                    { id: "progress", label: "📊 Progress Assessment" },
                    { id: "wellness", label: "🧘 Holistic Recovery" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setSelectedTab(tab.id); }}
                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                            selectedTab === tab.id
                                ? "bg-[var(--color-brand)] text-white shadow-md shadow-blue-500/20"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Interactive Customization Controls */}
            {selectedTab === "workout" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl bg-white p-5 border border-gray-100 shadow-sm">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500">Fitness Goal</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-gray-200 p-2.5 text-sm"
                        >
                            <option value="Muscle Gain & Strength">Muscle Gain & Strength</option>
                            <option value="Fat Loss & Definition">Fat Loss & Definition</option>
                            <option value="Endurance & Stamina">Endurance & Stamina</option>
                            <option value="General Health">General Health</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500">Experience Level</label>
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-gray-200 p-2.5 text-sm"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 flex justify-end">
                        <Button onClick={() => fetchAdvice("workout")} loading={loading}>
                            Generate Custom Routine
                        </Button>
                    </div>
                </div>
            )}

            {selectedTab === "meal" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl bg-white p-5 border border-gray-100 shadow-sm">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500">Target Calories (kcal)</label>
                        <input
                            type="number"
                            step="50"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-gray-200 p-2.5 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500">Dietary Preference</label>
                        <select
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-gray-200 p-2.5 text-sm"
                        >
                            <option value="High Protein">High Protein</option>
                            <option value="Keto / Low Carb">Keto / Low Carb</option>
                            <option value="Balanced / Mediterranean">Balanced / Mediterranean</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 flex justify-end">
                        <Button onClick={() => fetchAdvice("meal")} loading={loading}>
                            Generate Meal Plan
                        </Button>
                    </div>
                </div>
            )}

            {/* AI Coach Output Response */}
            <Card>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-xl">
                            🤖
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900">AI Coach Response</h2>
                            <p className="text-xs text-green-600 font-medium">● Online • Powered by Gemini Engine</p>
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => fetchAdvice(selectedTab)} disabled={loading}>
                        Regenerate
                    </Button>
                </div>

                <div className="mt-6">
                    {loading ? (
                        <div className="flex min-h-[220px] flex-col items-center justify-center gap-3">
                            <Loader size="lg" />
                            <p className="text-sm text-gray-500">Generating personalized recommendations...</p>
                        </div>
                    ) : (
                        <div className="whitespace-pre-line rounded-2xl bg-slate-50 p-6 text-sm leading-relaxed text-slate-800 font-sans border border-slate-200">
                            {response}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default AiChat;