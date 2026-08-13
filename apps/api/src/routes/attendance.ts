import { Router } from "express";
import { updateAttendance } from "../controllers/attendanceController.js";
import { requireRole } from "../middleware/auth.js";

export const attendanceRouter = Router();

attendanceRouter.patch("/:id", requireRole("ADMIN", "INSTRUCTOR"), updateAttendance);
