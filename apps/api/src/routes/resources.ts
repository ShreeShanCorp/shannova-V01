import { Router } from "express";
import {
  createResource,
  deleteResource,
  getResource,
  listResources,
  updateResource,
} from "../controllers/resourceController.js";
import { requireRole } from "../middleware/auth.js";

export const resourcesRouter = Router();

resourcesRouter.get("/", listResources);
resourcesRouter.get("/:id", getResource);
resourcesRouter.post("/", requireRole("ADMIN", "INSTRUCTOR"), createResource);
resourcesRouter.patch("/:id", requireRole("ADMIN", "INSTRUCTOR"), updateResource);
resourcesRouter.delete("/:id", requireRole("ADMIN", "INSTRUCTOR"), deleteResource);
