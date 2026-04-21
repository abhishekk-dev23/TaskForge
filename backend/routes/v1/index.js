import express from "express";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js";
import adminRoutes from "./admin.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/admin", adminRoutes);

export default router;
