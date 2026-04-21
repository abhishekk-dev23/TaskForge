import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/authService";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await registerUser(formData);
            const response = await login({
                email: formData.email,
                password: formData.password,
            });
            toast.success("Registration successful! Welcome aboard.");
            navigate(response.user.role === "admin" ? "/admin" : "/dashboard");
        } catch (error) {
            const message =
                error.response?.data?.message || "Registration failed";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="auth-wrap">
            <div className="card auth-card">
                <h2>Create Account</h2>
                <p>Register as user or admin to continue.</p>

                <form onSubmit={handleSubmit} className="form-grid">
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

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
                            minLength={6}
                            required
                        />
                    </label>


                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already registered? <Link to="/login">Login here</Link>
                </p>
            </div>
        </section>
    );
}
