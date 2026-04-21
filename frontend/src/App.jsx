import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./context/AuthContext";

function RootRedirect() {
    const { user, isAuthenticated, isLoading } = useAuth();
    if (isLoading) return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
}

export default function App() {
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<RootRedirect />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["user"]}>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <AdminDashboardPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        borderRadius: "10px",
                        border: "1px solid #d3d8e0",
                        color: "#1e2a3a",
                    },
                }}
            />
        </>
    );
}
