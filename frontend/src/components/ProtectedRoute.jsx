import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Spinner message="Checking session..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <Navigate
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                replace
            />
        );
    }

    return children;
}
