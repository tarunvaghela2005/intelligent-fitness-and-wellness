import { useState } from "react";

function ForgotPassword() {
    // Email
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    // Loading State
    const [isLoading, setIsLoading] = useState(false);

    // Success State
    const [isSuccess, setIsSuccess] = useState(false);

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

        if (isSuccess) {
            setIsSuccess(false);
        }
    };

    // Send Reset Link
    const handleResetPassword = () => {
        const isEmailValid = validateEmail();

        if (!isEmailValid) {
            return;
        }

        // Start loading
        setIsLoading(true);
        setIsSuccess(false);

        console.log("Reset password email:", email);

        // Mock API response
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

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
                        Forgot Password?
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-blue-100/80">
                        Enter your email address and we'll send you a
                        password reset link.
                    </p>

                </div>

                {/* Forgot Password Card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 p-6 sm:p-8">

                    {/* Success Message */}
                    {isSuccess && (
                        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-center">

                            <div className="text-3xl mb-2">
                                ✅
                            </div>

                            <h2 className="text-lg font-bold text-green-700">
                                Reset Link Sent!
                            </h2>

                            <p className="mt-1 text-sm text-green-600">
                                If an account exists with this email,
                                you will receive a password reset link.
                            </p>

                        </div>
                    )}

                    <div className="space-y-5">

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
                                disabled={isLoading}
                                className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 outline-none transition ${emailError
                                        ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                        : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    } ${isLoading
                                        ? "bg-slate-100 cursor-not-allowed"
                                        : ""
                                    }`}
                            />

                            {emailError && (
                                <p className="mt-2 text-sm font-medium text-red-500">
                                    {emailError}
                                </p>
                            )}

                        </div>

                        {/* Reset Button */}
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            disabled={isLoading}
                            className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-lg transition duration-200 ${isLoading
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98]"
                                }`}
                        >
                            {isLoading
                                ? "Sending Reset Link..."
                                : "Send Reset Link"}
                        </button>

                    </div>

                    {/* Back to Login */}
                    <div className="mt-6 pt-6 border-t border-slate-200">

                        <p className="text-center text-sm text-slate-600">
                            Remember your password?{" "}
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

export default ForgotPassword;