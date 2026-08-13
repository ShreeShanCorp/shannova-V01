import { Router } from "express";
import { getMe, listUsers, updateUserRole } from "../controllers/userController.js";
import { requireRole } from "../middleware/auth.js";

export const usersRouter = Router();

usersRouter.get("/me", getMe);
usersRouter.get("/", requireRole("ADMIN"), listUsers);
usersRouter.patch("/:id/role", requireRole("ADMIN"), updateUserRole);
