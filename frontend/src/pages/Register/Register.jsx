import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    // Full Name
    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState("");

    // Email
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    // Username
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    // Password
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Confirm Password
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // Loading State
    const [isLoading, setIsLoading] = useState(false);

    // Success State
    const [isSuccess, setIsSuccess] = useState(false);

    // Full Name Validation
    const validateFullName = () => {
        const trimmedName = fullName.trim();

        if (!trimmedName) {
            setFullNameError("Full name is required.");
            return false;
        }

        if (trimmedName.length < 3) {
            setFullNameError("Full name must be at least 3 characters.");
            return false;
        }

        if (!/^[A-Za-z]+(?: [A-Za-z]+)+$/.test(trimmedName)) {
            setFullNameError("Please enter your first and last name.");
            return false;
        }

        setFullNameError("");
        return true;
    };

    // Full Name Change
    const handleFullNameChange = (event) => {
        const value = event.target.value;

        setFullName(value);

        if (fullNameError) {
            setFullNameError("");
        }
    };

    // Email Validation
    const validateEmail = () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setEmailError("Email is required.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            setEmailError("Please enter a valid email address.");
            return false;
        }

        setEmailError("");
        return true;
    };

    // Email Change
    const handleEmailChange = (event) => {
        const value = event.target.value;

        setEmail(value);

        if (emailError) {
            setEmailError("");
        }
    };

    const validateUsername = () => {
        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setUsernameError("Username is required.");
            return false;
        }

        if (trimmedUsername.length < 3) {
            setUsernameError("Username must be at least 3 characters.");
            return false;
        }

        if (trimmedUsername.length > 20) {
            setUsernameError("Username must not exceed 20 characters.");
            return false;
        }

        if (!/^[A-Za-z0-9_]+$/.test(trimmedUsername)) {
            setUsernameError(
                "Username can only contain letters, numbers, and underscores."
            );
            return false;
        }

        setUsernameError("");
        return true;
    };

    const handleUsernameChange = (event) => {
        const value = event.target.value;

        setUsername(value);

        if (usernameError) {
            setUsernameError("");
        }
    };

    // Password Validation
    const validatePassword = () => {
        const trimmedPassword = password.trim();

        if (!trimmedPassword) {
            setPasswordError("Password is required.");
            return false;
        }

        if (trimmedPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters.");
            return false;
        }

        if (!/[A-Z]/.test(trimmedPassword)) {
            setPasswordError(
                "Password must contain at least one uppercase letter."
            );
            return false;
        }

        if (!/[a-z]/.test(trimmedPassword)) {
            setPasswordError(
                "Password must contain at least one lowercase letter."
            );
            return false;
        }

        if (!/[0-9]/.test(trimmedPassword)) {
            setPasswordError(
                "Password must contain at least one number."
            );
            return false;
        }

        if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]\/'`~+=;]/.test(trimmedPassword)) {
            setPasswordError(
                "Password must contain at least one special character."
            );
            return false;
        }

        setPasswordError("");
        return true;
    };

    // Password Change
    const handlePasswordChange = (event) => {
        const value = event.target.value;

        setPassword(value);

        if (passwordError) {
            setPasswordError("");
        }
    };

    // Confirm Password Validation
    const validateConfirmPassword = () => {
        const trimmedConfirmPassword = confirmPassword.trim();

        if (!trimmedConfirmPassword) {
            setConfirmPasswordError("Please confirm your password.");
            return false;
        }

        if (trimmedConfirmPassword !== password.trim()) {
            setConfirmPasswordError("Passwords do not match.");
            return false;
        }

        setConfirmPasswordError("");
        return true;
    };

    // Confirm Password Change
    const handleConfirmPasswordChange = (event) => {
        const value = event.target.value;

        setConfirmPassword(value);

        if (confirmPasswordError) {
            setConfirmPasswordError("");
        }
    };

    // Create Account Button
    const handleRegister = () => {
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (
            !isFullNameValid ||
            !isEmailValid ||
            !isUsernameValid ||
            !isPasswordValid ||
            !isConfirmPasswordValid
        ) {
            return;
        }

        // Start loading
        setIsLoading(true);
        setIsSuccess(false);

        // Mock user data
        const mockUser = {
            fullName: fullName.trim(),
            email: email.trim(),
            username: username.trim(),
            password: password,
        };

        // Save mock user
        localStorage.setItem(
            "mockUser",
            JSON.stringify(mockUser)
        );

        console.log("Mock user created:", {
            fullName: mockUser.fullName,
            email: mockUser.email,
            username: mockUser.username,
        });

        // Mock registration request
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);

            console.log("Registration successful");
            console.log("Redirecting to /login...");

            // Redirect to Login
            setTimeout(() => {
                console.log("Navigating now...");
                navigate("/login");
            }, 1500);
        }, 2000);
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-xl">

                {/* Logo & Heading */}
                <div className="text-center mb-8">

                    {/* Logo */}
                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-900/40">
                            <span className="text-3xl font-extrabold text-white">
                                F
                            </span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                        Create Your Account
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-blue-100/80">
                        Join Intelligent Fitness & Wellness and start your
                        personalized journey.
                    </p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 p-6 sm:p-8">

                    <form className="space-y-5">

                        {isSuccess && (
                            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-center">
                                <div className="text-3xl mb-2">
                                    ✅
                                </div>

                                <h2 className="text-lg font-bold text-green-700">
                                    Account Created Successfully!
                                </h2>

                                <p className="mt-1 text-sm text-green-600">
                                    Welcome to Intelligent Fitness & Wellness.
                                </p>
                            </div>
                        )}

                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block mb-2 text-sm font-semibold text-slate-800"
                            >
                                Full Name*
                            </label>

                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={handleFullNameChange}
                                onBlur={validateFullName}
                                placeholder="Enter your full name"
                                className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 outline-none transition ${fullNameError
                                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    }`}
                            />

                            {fullNameError && (
                                <p className="mt-2 text-sm font-medium text-red-500">
                                    {fullNameError}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-semibold text-slate-800"
                            >
                                Email*
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={validateEmail}
                                placeholder="Enter your email"
                                className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 outline-none transition ${emailError
                                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    }`}
                            />

                            {emailError && (
                                <p className="mt-2 text-sm font-medium text-red-500">
                                    {emailError}
                                </p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-semibold text-slate-800"
                            >
                                Username*
                            </label>

                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                onBlur={validateUsername}
                                placeholder="Choose a username"
                                className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 outline-none transition ${usernameError
                                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    }`}
                            />

                            {usernameError && (
                                <p className="mt-2 text-sm font-medium text-red-500">
                                    {usernameError}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-semibold text-slate-800"
                            >
                                Password*
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={validatePassword}
                                placeholder="Create a password"
                                className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 outline-none transition ${passwordError
                                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    }`}
                            />

                            {passwordError && (
                                <p className="mt-2 text-sm font-medium text-red-500">
                                    {passwordError}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-2 text-sm font-semibold text-slate-800"
                            >
                                Confirm Password*
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                onBlur={validateConfirmPassword}
                                placeholder="Confirm your password"
                                className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 outline-none transition ${confirmPasswordError
                                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    }`}
                            />

                            {confirmPasswordError && (
                                <p className="mt-2 text-sm font-medium text-red-500">
                                    {confirmPasswordError}
                                </p>
                            )}
                        </div>

                        {/* Create Account */}
                        <button
                            type="button"
                            onClick={handleRegister}
                            disabled={isLoading}
                            className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-lg transition duration-200 ${isLoading
                                ? "bg-slate-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98]"
                                }`}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    {/* Sign In */}
                    <div className="mt-6 pt-6 border-t border-slate-200">

                        <p className="text-center text-sm text-slate-600">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="font-semibold text-blue-600 hover:text-indigo-600 hover:underline"
                            >
                                Sign In
                            </a>
                        </p>

                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-xs text-blue-100/50 mt-6">
                    © 2026 Intelligent Fitness & Wellness
                </p>

            </div>
        </div>
    );
}

export default Register;