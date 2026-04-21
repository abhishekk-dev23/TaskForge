import express from "express";
import { body, param, query } from "express-validator";
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../../controllers/task.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import validateRequest from "../../middleware/validate.middleware.js";

const router = express.Router();

router.use(protect);

router.post(
    "/",
    [
        body("title").trim().notEmpty().withMessage("Title is required"),
        body("description").optional().trim(),
        body("status")
            .optional()
            .isIn(["pending", "completed"])
            .withMessage("Invalid task status"),
        validateRequest,
    ],
    createTask,
);

router.get(
    "/",
    [
        query("status").optional({ values: "falsy" }).isIn(["pending", "completed"]),
        query("search").optional({ values: "falsy" }).isString(),
        query("page").optional({ values: "falsy" }).isInt({ min: 1 }),
        query("limit").optional({ values: "falsy" }).isInt({ min: 1, max: 100 }),
        validateRequest,
    ],
    getAllTasks,
);

router.get(
    "/:id",
    [param("id").isMongoId().withMessage("Invalid task id"), validateRequest],
    getTaskById,
);

router.patch(
    "/:id",
    [
        param("id").isMongoId().withMessage("Invalid task id"),
        body("title")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Title cannot be empty"),
        body("description").optional().trim(),
        body("status")
            .optional()
            .isIn(["pending", "completed"])
            .withMessage("Invalid task status"),
        validateRequest,
    ],
    updateTask,
);

router.delete(
    "/:id",
    [param("id").isMongoId().withMessage("Invalid task id"), validateRequest],
    deleteTask,
);

export default router;
