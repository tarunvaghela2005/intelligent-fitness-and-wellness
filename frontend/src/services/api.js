import axios from "axios";

// ==========================================
// Centralized Axios API Client
// ==========================================

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

// ------------------------------------------
// Request Interceptor — attach Bearer token
// ------------------------------------------
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ------------------------------------------
// Response Interceptor — centralized error handling
// ------------------------------------------
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        // 401 Unauthorized — token expired or invalid, force logout
        if (status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");

            // Redirect to login only if not already there
            if (!window.location.pathname.startsWith("/login")) {
                window.location.href = "/login";
            }
        }

        // 403 Forbidden
        if (status === 403) {
            console.warn("API: Access forbidden (403) —", error.config?.url);
        }

        // 500+ Server errors
        if (status >= 500) {
            console.error("API: Server error —", status, error.config?.url);
        }

        // Network / timeout errors
        if (!error.response) {
            console.error(
                "API: Network error — backend may be unreachable.",
                error.message
            );
        }

        return Promise.reject(error);
    }
);

export default api;
