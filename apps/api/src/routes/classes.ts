import { Router } from "express";
import { createClass, getClass, listClasses, listUpcomingClasses } from "../controllers/classController.js";
import { requireRole } from "../middleware/auth.js";

export const classesRouter = Router();

classesRouter.get("/upcoming", listUpcomingClasses);
classesRouter.get("/", listClasses);
classesRouter.get("/:id", getClass);
classesRouter.post("/", requireRole("ADMIN", "INSTRUCTOR"), createClass);
