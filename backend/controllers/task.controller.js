import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";

const canManageTask = (task, user) => {
    if (user.role === "admin") return true;
    return task.createdBy.toString() === user._id.toString();
};

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;

    const task = await Task.create({
        title,
        description,
        status,
        createdBy: req.user._id,
    });

    res.status(201).json({ message: "Task created", task });
});

const getAllTasks = asyncHandler(async (req, res) => {
    const { status, search = "", page = 1, limit = 10 } = req.query;

    const query = {};
    if (req.user.role !== "admin") {
        query.createdBy = req.user._id;
    }

    if (status && ["pending", "completed"].includes(status)) {
        query.status = status;
    }

    if (search) {
        const searchCondition = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];

        if (query.createdBy) {
            query.$and = [
                { createdBy: query.createdBy },
                { $or: searchCondition },
            ];
            delete query.createdBy;
        } else {
            query.$or = searchCondition;
        }
    }

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
        .populate("createdBy", "name email role")
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

    res.status(200).json({
        tasks,
        pagination: {
            total,
            page: pageNumber,
            limit: pageSize,
            pages: Math.ceil(total / pageSize),
        },
    });
});

const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id).populate(
        "createdBy",
        "name email role",
    );

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (!canManageTask(task, req.user)) {
        return res
            .status(403)
            .json({ message: "You can only access your own tasks" });
    }

    res.status(200).json({ task });
});

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (!canManageTask(task, req.user)) {
        return res
            .status(403)
            .json({ message: "You can only update your own tasks" });
    }

    const fieldsToUpdate = ["title", "description", "status"];
    fieldsToUpdate.forEach((field) => {
        if (req.body[field] !== undefined) {
            task[field] = req.body[field];
        }
    });

    await task.save();

    res.status(200).json({ message: "Task updated", task });
});

const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (!canManageTask(task, req.user)) {
        return res
            .status(403)
            .json({ message: "You can only delete your own tasks" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted" });
});

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
