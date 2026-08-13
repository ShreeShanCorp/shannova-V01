import { Router } from "express";
import {
  listMyProgress,
  markTopicComplete,
  markTopicIncomplete,
} from "../controllers/progressController.js";

export const progressRouter = Router();

progressRouter.get("/", listMyProgress);
progressRouter.post("/:topicId", markTopicComplete);
progressRouter.delete("/:topicId", markTopicIncomplete);
