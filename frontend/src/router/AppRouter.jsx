import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<h1>Intelligent Fitness & Wellness</h1>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;