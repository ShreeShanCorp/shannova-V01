import { Router } from "express";
import { createTask, deleteTask, getTask, listTasks, updateTask } from "../controllers/taskController.js";
import { requireRole } from "../middleware/auth.js";

export const tasksRouter = Router();

tasksRouter.get("/", listTasks);
tasksRouter.get("/:id", getTask);
tasksRouter.post("/", requireRole("ADMIN", "INSTRUCTOR"), createTask);
tasksRouter.patch("/:id", requireRole("ADMIN", "INSTRUCTOR"), updateTask);
tasksRouter.delete("/:id", requireRole("ADMIN", "INSTRUCTOR"), deleteTask);
