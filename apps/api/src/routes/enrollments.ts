import { Router } from "express";
import {
  createEnrollment,
  deleteEnrollment,
  listEnrollments,
  listMyEnrollments,
} from "../controllers/enrollmentController.js";
import { requireRole } from "../middleware/auth.js";

export const enrollmentsRouter = Router();

enrollmentsRouter.get("/me", listMyEnrollments);
enrollmentsRouter.get("/", requireRole("ADMIN", "INSTRUCTOR"), listEnrollments);
enrollmentsRouter.post("/", requireRole("ADMIN"), createEnrollment);
enrollmentsRouter.delete("/:id", requireRole("ADMIN"), deleteEnrollment);
