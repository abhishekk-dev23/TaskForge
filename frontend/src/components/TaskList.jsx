export default function TaskList({
    tasks,
    onEdit,
    onDelete,
    emptyMessage = "No tasks found",
}) {
    if (!tasks.length) {
        return (
            <div className="card">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <article key={task._id} className="card task-card">
                    <div className="task-head">
                        <h4>{task.title}</h4>
                        <span className={`badge ${task.status}`}>
                            {task.status}
                        </span>
                    </div>

                    <p className="task-description">
                        {task.description || "No description provided"}
                    </p>

                    {task.createdBy?.name && (
                        <p className="meta">
                            Owner: {task.createdBy.name} ({task.createdBy.role})
                        </p>
                    )}

                    <div className="task-actions">
                        {onEdit && (
                            <button
                                className="btn btn-ghost"
                                onClick={() => onEdit(task)}
                            >
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(task._id)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}
