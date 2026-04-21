import { useEffect, useState } from "react";

const initialTaskState = {
    title: "",
    description: "",
    status: "pending",
};

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
    const [formData, setFormData] = useState(initialTaskState);

    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title,
                description: editingTask.description || "",
                status: editingTask.status,
            });
        } else {
            setFormData(initialTaskState);
        }
    }, [editingTask]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
        setFormData(initialTaskState);
    };

    return (
        <div className="card task-form-card">
            <h3>{editingTask ? "Edit Task" : "Add New Task"}</h3>
            <form onSubmit={handleSubmit} className="form-grid">
                <label>
                    Title
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                    />
                </label>

                <label>
                    Description
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter task details"
                        rows={3}
                    />
                </label>

                <label>
                    Status
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>

                <div className="actions-row">
                    <button className="btn btn-primary" type="submit">
                        {editingTask ? "Update Task" : "Create Task"}
                    </button>
                    {editingTask && (
                        <button
                            className="btn btn-ghost"
                            type="button"
                            onClick={onCancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
