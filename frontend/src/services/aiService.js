import api from "./api";

// Core rule-based AI recommendations
export const getAiRecommendations = async (userId) => {
    try {
        const id = userId || getCurrentUserId();
        const res = await api.get(`/api/ai/recommendation/${id}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching AI recommendations:", e);
        return null;
    }
};

export const getBmiAnalysis = async (userId) => {
    try {
        const id = userId || getCurrentUserId();
        const res = await api.get(`/api/ai/bmi/${id}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching BMI analysis:", e);
        return null;
    }
};

export const getCalorieAnalysis = async (userId) => {
    try {
        const id = userId || getCurrentUserId();
        const res = await api.get(`/api/ai/calories/${id}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching calorie analysis:", e);
        return null;
    }
};

// UI helper methods used by AiChat and Progress
export const getWorkoutRecommendation = async (goal, level) => {
    const data = await getAiRecommendations();
    const workoutRec = data?.recommendations?.find((r) => r.type === "WORKOUT") || {
        title: "Balanced Split Routine",
        description: "Focus on 3 days of progressive compound lifts (Squats, Bench Press) and 2 days of 20-30 min cardio.",
    };
    return {
        title: workoutRec.title,
        plan: workoutRec.description,
        recommendations: data?.recommendations || [],
    };
};

export const getMealRecommendation = async (calorieTarget, preference) => {
    const data = await getAiRecommendations();
    const nutRec = data?.recommendations?.find((r) => r.type === "NUTRITION") || {
        title: "Nutrient-Dense Meal Balance",
        description: "Focus on high-protein sources (chicken breast, eggs, dal, paneer) and complex carbs (rice, roti, oats).",
    };
    return {
        title: nutRec.title,
        dietPlan: nutRec.description,
        calorieTarget: data?.calorieAnalysis?.targetDailyCalories || 2000,
    };
};

export const getProgressAnalysis = async () => {
    const data = await getAiRecommendations();
    return {
        bmi: data?.bmiAnalysis?.bmi || 22.0,
        category: data?.bmiAnalysis?.category || "Normal",
        statusColor: data?.bmiAnalysis?.statusColor || "#10b981",
        tdee: data?.calorieAnalysis?.tdee || 2200,
        recommendations: data?.recommendations || [],
    };
};

export const getWellnessGuidance = async () => {
    const data = await getAiRecommendations();
    return {
        guidance: "Stay consistent with daily hydration (2.5L minimum), aim for 7-8 hours of restful sleep, and take 5-minute mobility breaks during sedentary hours.",
        disclaimer: data?.disclaimer || "Rule-based fitness guidance, not medical diagnosis.",
    };
};

function getCurrentUserId() {
    try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        return user.id || 1;
    } catch (e) {
        return 1;
    }
}