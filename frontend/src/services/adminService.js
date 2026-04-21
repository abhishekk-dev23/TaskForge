import api from "./api";

export const fetchAllUsers = async () => {
    const { data } = await api.get("/admin/users");
    return data;
};

export const fetchAllTasksAdmin = async () => {
    const { data } = await api.get("/admin/tasks");
    return data;
};

export const deleteTaskByAdmin = async (taskId) => {
    const { data } = await api.delete(`/admin/tasks/${taskId}`);
    return data;
};
