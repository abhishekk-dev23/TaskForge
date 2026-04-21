import api from "./api";

export const fetchTasks = async (params = {}) => {
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== "" && v !== undefined),
    );
    const { data } = await api.get("/tasks", { params: cleanParams });
    return data;
};

export const createTask = async (payload) => {
    const { data } = await api.post("/tasks", payload);
    return data;
};

export const updateTask = async (taskId, payload) => {
    const { data } = await api.patch(`/tasks/${taskId}`, payload);
    return data;
};

export const deleteTask = async (taskId) => {
    const { data } = await api.delete(`/tasks/${taskId}`);
    return data;
};
