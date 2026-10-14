import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    // ------------------------------------------
    // Validation
    // ------------------------------------------
    const validateEmail = () => {
        const trimmed = email.trim();

        if (!trimmed) {
            setEmailError("Email is required.");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setEmailError("Please enter a valid email address.");
            return false;
        }

        setEmailError("");
        return true;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError("");
        if (error) setError("");
        if (isSuccess) setIsSuccess(false);
    };

    // ------------------------------------------
    // Submit
    // ------------------------------------------
    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!validateEmail()) return;

        setIsLoading(true);
        setIsSuccess(false);
        setError("");

        try {
            const result = await forgotPassword(email);

            if (result.success) {
                setIsSuccess(true);
            } else {
                setError(result.message || "Unable to process your request. Please try again.");
            }
        } catch (err) {
            console.error("Forgot password error:", err);
            setError("Unable to connect to the server. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                {/* Logo & Heading */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-900/40">
                            <span className="text-3xl font-extrabold text-white">F</span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                        Forgot Password?
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-blue-100/80">
                        Enter your email and we'll send you a password reset link.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 p-6 sm:p-8">

                    {/* Success State */}
                    {isSuccess && (
                        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-5 text-center">
                            <div className="text-4xl mb-3">✅</div>
                            <h2 className="text-lg font-bold text-green-700">
                                Reset Link Sent!
                            </h2>
                            <p className="mt-2 text-sm text-green-600">
                                If an account exists with this email, you will receive a
                                password reset link shortly. Check your inbox and spam folder.
                            </p>
                            <Link
                                to="/login"
                                className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
                            >
                                ← Back to Sign In
                            </Link>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3" role="alert">
                            <p className="text-sm font-medium text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Form — hide after success */}
                    {!isSuccess && (
                        <form onSubmit={handleResetPassword} noValidate className="space-y-5">

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="fp-email"
                                    className="block mb-2 text-sm font-semibold text-slate-800"
                                >
                                    Email Address <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="fp-email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={validateEmail}
                                    placeholder="Enter your registered email"
                                    disabled={isLoading}
                                    autoComplete="email"
                                    aria-describedby={emailError ? "fp-email-error" : undefined}
                                    aria-invalid={!!emailError}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 outline-none transition ${emailError
                                            ? "border-red-500 focus:ring-4 focus:ring-red-100"
                                            : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        } ${isLoading ? "bg-slate-100 cursor-not-allowed" : ""}`}
                                />

                                {emailError && (
                                    <p id="fp-email-error" className="mt-2 text-sm font-medium text-red-500" role="alert">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-lg transition duration-200 ${isLoading
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98]"
                                    }`}
                            >
                                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
                            </button>
                        </form>
                    )}

                    {/* Back to Login */}
                    {!isSuccess && (
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <p className="text-center text-sm text-slate-600">
                                Remember your password?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-blue-600 hover:text-indigo-600 hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    )}
                </div>

                <p className="text-center text-xs text-blue-100/50 mt-6">
                    © 2026 Intelligent Fitness &amp; Wellness
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
