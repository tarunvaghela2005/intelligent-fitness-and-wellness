import api from "./api";

export const getNotifications = async (userId) => {
    try {
        const res = await api.get(`/api/notifications/${userId}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching notifications:", e);
        return [];
    }
};

export const createNotification = async (notificationData) => {
    const res = await api.post("/api/notifications", notificationData);
    return res.data;
};

export const markNotificationAsRead = async (id) => {
    const res = await api.put(`/api/notifications/${id}/read`);
    return res.data;
};

export const deleteNotification = async (id) => {
    const res = await api.delete(`/api/notifications/${id}`);
    return res.data;
};
