import { Router } from "express";
import { createWeek, deleteWeek, getWeek, listWeeks, updateWeek } from "../controllers/weekController.js";
import { requireRole } from "../middleware/auth.js";

export const weeksRouter = Router();

weeksRouter.get("/", listWeeks);
weeksRouter.get("/:id", getWeek);
weeksRouter.post("/", requireRole("ADMIN", "INSTRUCTOR"), createWeek);
weeksRouter.patch("/:id", requireRole("ADMIN", "INSTRUCTOR"), updateWeek);
weeksRouter.delete("/:id", requireRole("ADMIN", "INSTRUCTOR"), deleteWeek);
