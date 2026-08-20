import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    // Mock authentication check
    const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;