import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

function Page({ title }) {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                {title}
            </h1>

            <p className="mt-2 text-[var(--color-text-secondary)]">
                Intelligent Fitness & Wellness
            </p>
        </div>
    );
}

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication Pages */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Main Application Layout */}
                <Route element={<MainLayout />}>

                    {/* Home */}
                    <Route
                        path="/"
                        element={<Page title="Home" />}
                    />

                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={<Page title="Dashboard" />}
                    />

                    {/* Health */}
                    <Route
                        path="/health"
                        element={<Page title="Health" />}
                    />

                    {/* Workout */}
                    <Route
                        path="/workout"
                        element={<Page title="Workout" />}
                    />

                    {/* Nutrition */}
                    <Route
                        path="/nutrition"
                        element={<Page title="Nutrition" />}
                    />

                    {/* Progress */}
                    <Route
                        path="/progress"
                        element={<Page title="Progress" />}
                    />

                    {/* AI Assistant */}
                    <Route
                        path="/ai-chat"
                        element={<Page title="AI Assistant" />}
                    />

                </Route>

                {/* Unknown Routes */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

                <Route path="/forgot-password" element={<ForgotPassword />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;