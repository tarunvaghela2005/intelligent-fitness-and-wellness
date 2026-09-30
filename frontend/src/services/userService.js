import api from "./api";

export const getCurrentUser = async () => {
    const res = await api.get("/api/users/me");
    return res.data?.data || res.data;
};

export const getUserById = async (id) => {
    const res = await api.get(`/api/users/${id}`);
    return res.data?.data || res.data;
};

export const updateUserProfile = async (id, profileData) => {
    const res = await api.put(`/api/users/${id}`, profileData);
    return res.data?.data || res.data;
};

export const getAllUsers = async () => {
    const res = await api.get("/api/users");
    return res.data?.data || res.data;
};
