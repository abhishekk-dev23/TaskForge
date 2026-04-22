export default function Spinner({ message = "Loading..." }) {
    return (
        <div className="spinner-wrap">
            <div className="spinner" />
            <p>{message}</p>
            <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
                Note: Initial backend startup may take 40-60 seconds.
            </p>
        </div>
    );
}
