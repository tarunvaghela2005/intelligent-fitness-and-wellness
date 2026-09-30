import api from "./api";
import * as nutritionService from "./nutritionService";

// Exercise Catalog
export const getExercises = async () => {
    try {
        const res = await api.get("/api/fitness/exercises");
        return res.data;
    } catch (e) {
        console.error("Error fetching exercises:", e);
        return [];
    }
};

export const createExercise = async (exercise) => {
    const res = await api.post("/api/fitness/exercises", exercise);
    return res.data;
};

// Workouts
export const getWorkouts = async (userId) => {
    try {
        const url = userId ? `/api/fitness/workouts/user/${userId}` : "/api/fitness/workouts";
        const res = await api.get(url);
        return res.data;
    } catch (e) {
        console.error("Error fetching workouts:", e);
        return [];
    }
};

export const createWorkout = async (workoutData) => {
    const res = await api.post("/api/fitness/workouts", workoutData);
    return res.data;
};

export const completeWorkout = async (workoutId, duration, caloriesBurned) => {
    try {
        const res = await api.put(`/api/fitness/workouts/${workoutId}`, {
            duration,
            caloriesBurned,
        });
        return res.data;
    } catch (e) {
        console.error("Error completing workout:", e);
        return null;
    }
};

export const deleteWorkout = async (workoutId) => {
    const res = await api.delete(`/api/fitness/workouts/${workoutId}`);
    return res.data;
};

// Fitness Goals
export const getGoals = async (userId) => {
    try {
        const res = await api.get(`/api/fitness/goals/${userId}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching goals:", e);
        return [];
    }
};

export const createGoal = async (goalData) => {
    const res = await api.post("/api/fitness/goals", goalData);
    return res.data;
};

export const updateGoal = async (id, goalData) => {
    const res = await api.put(`/api/fitness/goals/${id}`, goalData);
    return res.data;
};

// Progress
export const getProgress = async (userId) => {
    try {
        const res = await api.get(`/api/fitness/progress/${userId}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching progress:", e);
        return [];
    }
};

export const logProgress = async (progressData) => {
    const res = await api.post("/api/fitness/progress", progressData);
    return res.data;
};

// Backward-compatible aliases for existing pages
export const getProgressRecords = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id || 1;
    return getProgress(userId);
};

export const logProgressRecord = async (recordData) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return logProgress({ ...recordData, userId: recordData.userId || user.id || 1 });
};

// Nutrition forwarders for backward compatibility with Nutrition.jsx
export const getFoods = nutritionService.getFoods;
export const logMeal = nutritionService.logMeal;
export const getTodayMeals = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id || 1;
    return nutritionService.getMeals(userId);
};
export const getNutritionSummary = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id || 1;
    return nutritionService.getDailyNutritionSummary(userId);
};