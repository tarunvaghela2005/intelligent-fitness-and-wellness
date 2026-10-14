import api from "./api";

// ==========================================
// GEMINI AI SERVICE (Real AI Integration)
// ==========================================

export const getWorkoutRecommendation = async (request = {}) => {
    try {
        const res = await api.post("/api/ai/workout", {
            goal: request.goal || "Muscle Gain & Strength",
            experienceLevel: request.experienceLevel || "Intermediate",
        });
        return res.data?.recommendation || "Unable to generate workout plan. Please try again.";
    } catch (e) {
        console.error("Error fetching workout recommendation:", e);
        return "Failed to connect to AI Coach. Please check your connection and try again.";
    }
};

export const getMealRecommendation = async (request = {}) => {
    try {
        const res = await api.post("/api/ai/meal", {
            targetCalories: request.targetCalories || 2200,
            dietaryPreference: request.dietaryPreference || "High Protein",
        });
        return res.data?.recommendation || "Unable to generate meal plan. Please try again.";
    } catch (e) {
        console.error("Error fetching meal recommendation:", e);
        return "Failed to connect to AI Coach. Please check your connection and try again.";
    }
};

export const getProgressAnalysis = async (request = {}) => {
    try {
        const res = await api.post("/api/ai/progress", {
            startWeight: request.startWeight || 75.0,
            currentWeight: request.currentWeight || 72.5,
        });
        return res.data?.recommendation || "Unable to analyze progress. Please try again.";
    } catch (e) {
        console.error("Error fetching progress analysis:", e);
        return "Failed to connect to AI Coach. Please check your connection and try again.";
    }
};

export const getWellnessGuidance = async () => {
    try {
        const res = await api.post("/api/ai/wellness", {});
        return res.data?.recommendation || "Unable to fetch wellness guidance. Please try again.";
    } catch (e) {
        console.error("Error fetching wellness guidance:", e);
        return "Failed to connect to AI Coach. Please check your connection and try again.";
    }
};

// ==========================================
// RULE-BASED RECOMMENDATIONS (Backward Compat)
// ==========================================

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

function getCurrentUserId() {
    try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        return user.userId || user.id || 1;
    } catch (e) {
        return 1;
    }
}
