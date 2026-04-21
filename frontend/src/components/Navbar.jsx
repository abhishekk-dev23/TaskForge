import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <header className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="brand">
                    TaskForge
                </Link>

                <nav className="nav-links">
                    {!isAuthenticated && (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Register</NavLink>
                        </>
                    )}

                    {isAuthenticated && user?.role === "user" && (
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    )}
                    {isAuthenticated && user?.role === "admin" && (
                        <NavLink to="/admin">Admin</NavLink>
                    )}
                </nav>

                {isAuthenticated && (
                    <button className="btn btn-ghost" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}
