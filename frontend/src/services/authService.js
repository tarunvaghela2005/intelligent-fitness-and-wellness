import api from "./api";

// ==========================================
// Authentication Service (Connected to Backend)
// ==========================================

// ------------------------------------------
// Register User
// ------------------------------------------
export const register = async (userData) => {
    try {
        const rawFullName = userData.fullName ? userData.fullName.trim() : "";
        const nameParts = rawFullName.split(" ");
        const firstName = userData.firstName || nameParts[0] || "User";
        const lastName = userData.lastName || nameParts.slice(1).join(" ") || "Member";

        const payload = {
            email: userData.email.trim().toLowerCase(),
            password: userData.password,
            firstName: firstName,
            lastName: lastName,
            age: userData.age ? Number(userData.age) : 25,
            gender: userData.gender || "MALE",
            heightCm: userData.heightCm ? Number(userData.heightCm) : 175.0,
            weightKg: userData.weightKg ? Number(userData.weightKg) : 70.0,
            targetWeightKg: userData.targetWeightKg ? Number(userData.targetWeightKg) : 68.0,
            activityLevel: userData.activityLevel || "MODERATELY_ACTIVE",
            fitnessGoal: userData.fitnessGoal || "GENERAL_FITNESS",
            dietaryPreference: userData.dietaryPreference || "BALANCED",
        };

        const response = await api.post("/api/v1/auth/register", payload);
        const data = response.data?.data || response.data;

        if (data?.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("isAuthenticated", "true");
        }

        return {
            success: true,
            message: response.data?.message || "Account created successfully.",
            user: data,
        };
    } catch (error) {
        console.error("Registration API error:", error);
        const errorMsg =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Unable to create account. Please ensure all fields are valid.";

        return {
            success: false,
            message: errorMsg,
        };
    }
};

// ------------------------------------------
// Login User
// ------------------------------------------
export const login = async (email, password) => {
    try {
        const payload = {
            email: email.trim().toLowerCase(),
            password: password,
        };

        const response = await api.post("/api/v1/auth/login", payload);
        const data = response.data?.data || response.data;

        if (data?.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("isAuthenticated", "true");
        }

        return {
            success: true,
            message: response.data?.message || "Login successful.",
            user: data,
        };
    } catch (error) {
        console.error("Login API error:", error);
        const errorMsg =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Invalid email or password. Please check your credentials.";

        return {
            success: false,
            message: errorMsg,
        };
    }
};

// ------------------------------------------
// Forgot Password
// ------------------------------------------
export const forgotPassword = async (email) => {
    try {
        const trimmedEmail = email.trim().toLowerCase();
        console.log("Password reset requested for:", trimmedEmail);

        // Fallback simulation / endpoint placeholder
        await new Promise((resolve) => setTimeout(resolve, 800));

        return {
            success: true,
            message:
                "If an account exists with this email, you will receive a password reset link.",
        };
    } catch (error) {
        console.error("Forgot password service error:", error);
        return {
            success: false,
            message: "Unable to process password reset request.",
        };
    }
};

// ------------------------------------------
// Logout User
// ------------------------------------------
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("mockUser");
    localStorage.removeItem("isAuthenticated");

    return {
        success: true,
        message: "Logged out successfully.",
    };
};

// ------------------------------------------
// Check Authentication
// ------------------------------------------
export const isAuthenticated = () => {
    return Boolean(
        localStorage.getItem("token") ||
        localStorage.getItem("isAuthenticated") === "true"
    );
};

// ------------------------------------------
// Get Current User
// ------------------------------------------
export const getCurrentUser = () => {
    try {
        const storedUser = localStorage.getItem("user") || localStorage.getItem("mockUser");
        if (!storedUser) {
            return null;
        }

        const user = JSON.parse(storedUser);
        return {
            fullName: user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : (user.fullName || "User"),
            firstName: user.firstName || (user.fullName ? user.fullName.split(" ")[0] : "User"),
            lastName: user.lastName || "",
            email: user.email,
            username: user.username || user.email?.split("@")[0],
            userId: user.userId || user.id,
            role: user.role,
        };
    } catch (error) {
        console.error("Get current user error:", error);
        return null;
    }
};