import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await login(formData);
            toast.success("Login successful");
            navigate(response.user.role === "admin" ? "/admin" : "/dashboard");
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="auth-wrap">
            <div className="card auth-card">
                <h2>Login</h2>
                <p>Access your TaskForge dashboard.</p>

                <form onSubmit={handleSubmit} className="form-grid">
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Login"}
                    </button>
                </form>

                <p className="auth-footer">
                    New user? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </section>
    );
}
