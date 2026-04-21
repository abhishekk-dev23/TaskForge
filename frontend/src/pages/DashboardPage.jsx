import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import {
    createTask,
    deleteTask,
    fetchTasks,
    updateTask,
} from "../services/taskService";

export default function DashboardPage() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: "",
        search: "",
        page: 1,
        limit: 6,
    });
    const [pagination, setPagination] = useState({ page: 1, pages: 1 });

    const loadTasks = async (activeFilters = filters) => {
        setIsLoading(true);
        try {
            const response = await fetchTasks(activeFilters);
            setTasks(response.tasks);
            setPagination(response.pagination);
        } catch (error) {
            const message =
                error.response?.data?.message || "Could not load tasks";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTasks(filters);
    }, [filters]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
    };

    const handleSearch = (event) => {
        event.preventDefault();
    };

    const handleTaskSubmit = async (payload) => {
        try {
            if (editingTask) {
                await updateTask(editingTask._id, payload);
                toast.success("Task updated");
                setEditingTask(null);
            } else {
                await createTask(payload);
                toast.success("Task created");
            }

            setFilters((prev) => ({ ...prev, page: 1 }));
        } catch (error) {
            const message =
                error.response?.data?.message || "Could not save task";
            toast.error(message);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            toast.success("Task deleted");
            loadTasks();
        } catch (error) {
            const message =
                error.response?.data?.message || "Could not delete task";
            toast.error(message);
        }
    };

    return (
        <section className="dashboard-wrap container">
            <div className="page-header card">
                <h2>Dashboard</h2>
                <p>
                    Welcome, <strong>{user?.name}</strong> ({user?.role})
                </p>
            </div>

            <TaskForm
                onSubmit={handleTaskSubmit}
                editingTask={editingTask}
                onCancelEdit={() => setEditingTask(null)}
            />

            <div className="card filter-card">
                <form className="filter-grid" onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Search by title or description"
                    />
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button className="btn btn-primary" type="submit">
                        Apply
                    </button>
                </form>
            </div>

            {isLoading ? (
                <Spinner message="Loading tasks..." />
            ) : (
                <>
                    <TaskList
                        tasks={tasks}
                        onEdit={setEditingTask}
                        onDelete={handleDelete}
                    />
                    <Pagination
                        page={pagination.page}
                        pages={pagination.pages}
                        onPageChange={(nextPage) =>
                            setFilters((prev) => ({ ...prev, page: nextPage }))
                        }
                    />
                </>
            )}
        </section>
    );
}
