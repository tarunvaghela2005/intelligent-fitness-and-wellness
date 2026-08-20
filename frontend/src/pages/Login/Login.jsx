import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Alert from "../../components/ui/Alert";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const [fieldErrors, setFieldErrors] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setFieldErrors((previous) => ({
            ...previous,
            [name]: "",
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {
            email: "",
            password: "",
        };

        // Email validation
        if (!formData.email.trim()) {
            errors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ) {
            errors.email = "Please enter a valid email address.";
        }

        // Password validation
        if (!formData.password) {
            errors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters.";
        } else if (!/[A-Z]/.test(formData.password)) {
            errors.password =
                "Password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(formData.password)) {
            errors.password =
                "Password must contain at least one lowercase letter.";
        } else if (!/[0-9]/.test(formData.password)) {
            errors.password =
                "Password must contain at least one number.";
        }

        setFieldErrors(errors);

        // Stop submission if validation fails
        if (errors.email || errors.password) {
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Simulate API request
            await new Promise((resolve) => {
                setTimeout(resolve, 1500);
            });

            // Get registered mock user
            const storedUser = localStorage.getItem("mockUser");

            if (!storedUser) {
                throw new Error("No registered account found.");
            }

            const mockUser = JSON.parse(storedUser);

            // Check email and password
            const isValidUser =
                formData.email.trim().toLowerCase() ===
                mockUser.email.trim().toLowerCase() &&
                formData.password === mockUser.password;

            if (!isValidUser) {
                throw new Error("Invalid email or password.");
            }

            // Save mock authentication state
            localStorage.setItem("isAuthenticated", "true");

            // Mock success
            setSuccess("Login successful! Welcome back.");

            console.log("Mock login successful:", {
                email: mockUser.email,
                username: mockUser.username,
            });

            // Redirect to dashboard
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (loginError) {
            console.error("Mock login failed:", loginError);

            setError(
                "Invalid email or password. Please check your credentials and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

                {/* Logo & Heading */}
                <div className="mb-8 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-brand)] text-2xl font-bold text-white">
                        F
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-[var(--color-text-primary)]">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                        Sign in to your Intelligent Fitness & Wellness account
                    </p>

                </div>

                {/* Login Card */}
                <div className="rounded-[var(--radius-xl)] border border-[var(--border-color-default)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* General Error */}
                        {error && (
                            <Alert variant="danger">
                                {error}
                            </Alert>
                        )}

                        {/* Success Message */}
                        {success && (
                            <Alert variant="success">
                                {success}
                            </Alert>
                        )}

                        {/* Email */}
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            error={fieldErrors.email}
                            required
                        />

                        {/* Password */}
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            error={fieldErrors.password}
                            required
                        />

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-hover)]"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            size="lg"
                            loading={loading}
                            disabled={loading}
                            className="w-full"
                        >
                            Sign In
                        </Button>

                    </form>

                    {/* Register Link */}
                    <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
                        >
                            Create an account
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;