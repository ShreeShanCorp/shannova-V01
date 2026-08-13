import { Router } from "express";
import {
  createModule,
  deleteModule,
  getModule,
  listModules,
  updateModule,
} from "../controllers/moduleController.js";
import { requireRole } from "../middleware/auth.js";

export const modulesRouter = Router();

modulesRouter.get("/", listModules);
modulesRouter.get("/:id", getModule);
modulesRouter.post("/", requireRole("ADMIN", "INSTRUCTOR"), createModule);
modulesRouter.patch("/:id", requireRole("ADMIN", "INSTRUCTOR"), updateModule);
modulesRouter.delete("/:id", requireRole("ADMIN", "INSTRUCTOR"), deleteModule);
