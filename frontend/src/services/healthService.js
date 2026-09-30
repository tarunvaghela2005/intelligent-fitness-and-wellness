import api from "./api";

export const getHealthMetrics = async () => {
    try {
        const res = await api.get("/api/v1/health/metrics");
        return res.data;
    } catch (e) {
        console.error("Error fetching health metrics:", e);
        return null;
    }
};

export const calculateHealthMetrics = async (data = {}) => {
    try {
        const res = await api.post("/api/v1/health/calculate", data);
        return res.data;
    } catch (e) {
        console.error("Error calculating health metrics:", e);
        return null;
    }
};