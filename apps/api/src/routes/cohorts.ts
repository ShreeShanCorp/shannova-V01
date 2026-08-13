import { Router } from "express";
import {
  createCohort,
  deleteCohort,
  getCohort,
  getCohortCurriculum,
  listCohorts,
  updateCohort,
} from "../controllers/cohortController.js";
import { requireRole } from "../middleware/auth.js";

export const cohortsRouter = Router();

cohortsRouter.get("/", listCohorts);
cohortsRouter.get("/:id/curriculum", getCohortCurriculum);
cohortsRouter.get("/:id", getCohort);
cohortsRouter.post("/", requireRole("ADMIN"), createCohort);
cohortsRouter.patch("/:id", requireRole("ADMIN"), updateCohort);
cohortsRouter.delete("/:id", requireRole("ADMIN"), deleteCohort);
