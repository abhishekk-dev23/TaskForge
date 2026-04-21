import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <section className="auth-wrap">
            <div className="card auth-card">
                <h2>404 - Page Not Found</h2>
                <p>The page you requested does not exist.</p>
                <Link className="btn btn-primary" to="/login">
                    Go to Login
                </Link>
            </div>
        </section>
    );
}
