import { Router } from "express";
import {
  createCurriculum,
  deleteCurriculum,
  getCurriculum,
  getCurriculumTree,
  listCurricula,
  updateCurriculum,
} from "../controllers/curriculumController.js";
import { requireRole } from "../middleware/auth.js";

export const curriculaRouter = Router();

curriculaRouter.get("/", listCurricula);
curriculaRouter.get("/:id/tree", getCurriculumTree);
curriculaRouter.get("/:id", getCurriculum);
curriculaRouter.post("/", requireRole("ADMIN"), createCurriculum);
curriculaRouter.patch("/:id", requireRole("ADMIN"), updateCurriculum);
curriculaRouter.delete("/:id", requireRole("ADMIN"), deleteCurriculum);
