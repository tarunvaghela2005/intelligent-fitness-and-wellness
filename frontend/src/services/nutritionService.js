import api from "./api";

// Foods
export const getFoods = async () => {
    try {
        const res = await api.get("/api/nutrition/foods");
        return res.data;
    } catch (e) {
        console.error("Error fetching foods:", e);
        return [];
    }
};

export const createFood = async (food) => {
    const res = await api.post("/api/nutrition/foods", food);
    return res.data;
};

// Meals
export const getMeals = async (userId) => {
    try {
        const res = await api.get(`/api/nutrition/meals/${userId}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching meals:", e);
        return [];
    }
};

export const logMeal = async (mealData) => {
    const res = await api.post("/api/nutrition/meals", mealData);
    return res.data;
};

export const deleteMeal = async (mealId) => {
    const res = await api.delete(`/api/nutrition/meals/${mealId}`);
    return res.data;
};

export const getDailyNutritionSummary = async (userId, date) => {
    try {
        const url = date
            ? `/api/nutrition/meals/user/${userId}/daily?date=${date}`
            : `/api/nutrition/meals/user/${userId}/daily`;
        const res = await api.get(url);
        return res.data;
    } catch (e) {
        console.error("Error fetching daily nutrition:", e);
        return null;
    }
};

// Water Intake
export const getWaterIntake = async (userId) => {
    try {
        const res = await api.get(`/api/nutrition/water/${userId}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching water:", e);
        return [];
    }
};

export const getTodayWaterSummary = async (userId) => {
    try {
        const res = await api.get(`/api/nutrition/water/user/${userId}/today`);
        return res.data;
    } catch (e) {
        console.error("Error fetching today water summary:", e);
        return { totalAmountMl: 0, targetAmountMl: 2500, logs: [] };
    }
};

export const logWater = async (waterData) => {
    const res = await api.post("/api/nutrition/water", waterData);
    return res.data;
};
