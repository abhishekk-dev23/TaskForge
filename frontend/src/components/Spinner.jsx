export default function Spinner({ message = "Loading..." }) {
    return (
        <div className="spinner-wrap">
            <div className="spinner" />
            <p>{message}</p>
        </div>
    );
}
