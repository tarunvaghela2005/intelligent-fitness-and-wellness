import { useState, useCallback } from "react";
import {
    login as loginService,
    register as registerService,
    logout as logoutService,
    getCurrentUser,
    isAuthenticated as checkAuth,
} from "../services/authService";

// ==========================================
// useAuth
// Central authentication hook.
// Provides login, register, logout, user state and auth status.
// Usage: const { user, isAuthenticated, login, logout, loading, error } = useAuth()
// ==========================================

function useAuth() {
    const [user, setUser] = useState(() => getCurrentUser());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuth());

    // ------------------------------------------
    // Login
    // ------------------------------------------
    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError("");

        try {
            const result = await loginService(email, password);

            if (result.success) {
                setUser(getCurrentUser());
                setIsAuthenticated(true);
                return { success: true };
            } else {
                setError(result.message);
                return { success: false, message: result.message };
            }
        } catch (err) {
            const msg = "Login failed. Please try again.";
            setError(msg);
            return { success: false, message: msg };
        } finally {
            setLoading(false);
        }
    }, []);

    // ------------------------------------------
    // Register
    // ------------------------------------------
    const register = useCallback(async (userData) => {
        setLoading(true);
        setError("");

        try {
            const result = await registerService(userData);

            if (result.success) {
                setUser(getCurrentUser());
                setIsAuthenticated(true);
                return { success: true };
            } else {
                setError(result.message);
                return { success: false, message: result.message };
            }
        } catch (err) {
            const msg = "Registration failed. Please try again.";
            setError(msg);
            return { success: false, message: msg };
        } finally {
            setLoading(false);
        }
    }, []);

    // ------------------------------------------
    // Logout
    // ------------------------------------------
    const logout = useCallback(() => {
        logoutService();
        setUser(null);
        setIsAuthenticated(false);
        setError("");
    }, []);

    // ------------------------------------------
    // Clear Error
    // ------------------------------------------
    const clearError = useCallback(() => {
        setError("");
    }, []);

    return {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
    };
}

export default useAuth;
