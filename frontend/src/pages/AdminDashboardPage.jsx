import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import TaskList from "../components/TaskList";
import {
    deleteTaskByAdmin,
    fetchAllTasksAdmin,
    fetchAllUsers,
} from "../services/adminService";

export default function AdminDashboardPage() {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadAdminData = async () => {
        setIsLoading(true);
        try {
            const [usersResponse, tasksResponse] = await Promise.all([
                fetchAllUsers(),
                fetchAllTasksAdmin(),
            ]);
            setUsers(usersResponse.users);
            setTasks(tasksResponse.tasks);
        } catch (error) {
            const message =
                error.response?.data?.message || "Could not load admin data";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAdminData();
    }, []);

    const handleDeleteAnyTask = async (taskId) => {
        try {
            await deleteTaskByAdmin(taskId);
            toast.success("Task deleted by admin");
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
        } catch (error) {
            const message =
                error.response?.data?.message || "Could not delete task";
            toast.error(message);
        }
    };

    if (isLoading) {
        return <Spinner message="Loading admin dashboard..." />;
    }

    return (
        <section className="dashboard-wrap container">
            <div className="card page-header">
                <h2>Admin Dashboard</h2>
                <p>Manage all users and tasks in one place.</p>
            </div>

            <div className="card users-card">
                <h3>All Users</h3>
                {!users.length ? (
                    <p>No users found.</p>
                ) : (
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            {new Date(
                                                user.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="card">
                <h3>All Tasks</h3>
                <TaskList
                    tasks={tasks}
                    onDelete={handleDeleteAnyTask}
                    emptyMessage="No tasks available in the system"
                />
            </div>
        </section>
    );
}
