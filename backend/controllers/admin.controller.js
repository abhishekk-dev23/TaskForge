import User from "../models/User.js";
import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
        .select("-password")
        .sort({ createdAt: -1 });
    res.status(200).json({ users });
});

const getAllTasksAdmin = asyncHandler(async (req, res) => {
    const tasks = await Task.find({})
        .populate("createdBy", "name email role")
        .sort({ createdAt: -1 });

    res.status(200).json({ tasks });
});

const deleteTaskAdmin = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted by admin" });
});

export { getAllUsers, getAllTasksAdmin, deleteTaskAdmin };
