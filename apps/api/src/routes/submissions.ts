import { Router } from "express";
import {
  createSubmission,
  getMyAllSubmissions,
  getMySubmission,
  listSubmissionsForTask,
  saveDraft,
  updateSubmission,
} from "../controllers/submissionController.js";
import { requireRole } from "../middleware/auth.js";

export const submissionsRouter = Router();

submissionsRouter.get("/mine", getMyAllSubmissions);
submissionsRouter.get("/me", getMySubmission);
submissionsRouter.get("/", requireRole("ADMIN", "INSTRUCTOR"), listSubmissionsForTask);
submissionsRouter.post("/", createSubmission);
submissionsRouter.patch("/draft", saveDraft);
submissionsRouter.patch("/:id", requireRole("ADMIN", "INSTRUCTOR"), updateSubmission);
