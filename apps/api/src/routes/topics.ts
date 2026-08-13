import { Router } from "express";
import {
  createTopic,
  deleteTopic,
  getTopic,
  listTopics,
  updateTopic,
} from "../controllers/topicController.js";
import { requireRole } from "../middleware/auth.js";

export const topicsRouter = Router();

topicsRouter.get("/", listTopics);
topicsRouter.get("/:id", getTopic);
topicsRouter.post("/", requireRole("ADMIN", "INSTRUCTOR"), createTopic);
topicsRouter.patch("/:id", requireRole("ADMIN", "INSTRUCTOR"), updateTopic);
topicsRouter.delete("/:id", requireRole("ADMIN", "INSTRUCTOR"), deleteTopic);
