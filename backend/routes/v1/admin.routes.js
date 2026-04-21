import express from "express";
import { param } from "express-validator";
import {
    getAllUsers,
    getAllTasksAdmin,
    deleteTaskAdmin,
} from "../../controllers/admin.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import allowRoles from "../../middleware/role.middleware.js";
import validateRequest from "../../middleware/validate.middleware.js";

const router = express.Router();

router.use(protect, allowRoles("admin"));

router.get("/users", getAllUsers);
router.get("/tasks", getAllTasksAdmin);
router.delete(
    "/tasks/:id",
    [param("id").isMongoId().withMessage("Invalid task id"), validateRequest],
    deleteTaskAdmin,
);

export default router;
