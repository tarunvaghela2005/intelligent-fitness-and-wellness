// ==========================================
// Authentication Service
// ==========================================
// Currently uses localStorage for mock authentication.
// Later this service can be connected to Spring Boot APIs
// without changing the Login/Register UI components.

// ------------------------------------------
// Register User
// ------------------------------------------
export const register = async (userData) => {
    try {
        // Mock registration
        const mockUser = {
            fullName: userData.fullName.trim(),
            email: userData.email.trim(),
            username: userData.username.trim(),
            password: userData.password,
        };

        localStorage.setItem(
            "mockUser",
            JSON.stringify(mockUser)
        );

        return {
            success: true,
            message: "Account created successfully.",
            user: {
                fullName: mockUser.fullName,
                email: mockUser.email,
                username: mockUser.username,
            },
        };
    } catch (error) {
        console.error("Registration service error:", error);

        return {
            success: false,
            message: "Unable to create account.",
        };
    }
};


// ------------------------------------------
// Login User
// ------------------------------------------
export const login = async (email, password) => {
    try {
        const storedUser = localStorage.getItem("mockUser");

        if (!storedUser) {
            return {
                success: false,
                message: "No registered account found.",
            };
        }

        const mockUser = JSON.parse(storedUser);

        const isValidUser =
            email.trim().toLowerCase() ===
            mockUser.email.trim().toLowerCase() &&
            password === mockUser.password;

        if (!isValidUser) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        // Save authentication state
        localStorage.setItem(
            "isAuthenticated",
            "true"
        );

        return {
            success: true,
            message: "Login successful.",
            user: {
                fullName: mockUser.fullName,
                email: mockUser.email,
                username: mockUser.username,
            },
        };
    } catch (error) {
        console.error("Login service error:", error);

        return {
            success: false,
            message: "Unable to login.",
        };
    }
};


// ------------------------------------------
// Forgot Password
// ------------------------------------------
export const forgotPassword = async (email) => {
    try {
        const trimmedEmail = email.trim().toLowerCase();

        console.log(
            "Password reset requested for:",
            trimmedEmail
        );

        // Mock password reset request
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        return {
            success: true,
            message:
                "If an account exists with this email, you will receive a password reset link.",
        };
    } catch (error) {
        console.error(
            "Forgot password service error:",
            error
        );

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
    return (
        localStorage.getItem("isAuthenticated") === "true"
    );
};


// ------------------------------------------
// Get Current User
// ------------------------------------------
export const getCurrentUser = () => {
    try {
        const storedUser = localStorage.getItem("mockUser");

        if (!storedUser) {
            return null;
        }

        const mockUser = JSON.parse(storedUser);

        return {
            fullName: mockUser.fullName,
            email: mockUser.email,
            username: mockUser.username,
        };
    } catch (error) {
        console.error(
            "Get current user service error:",
            error
        );

        return null;
    }
};