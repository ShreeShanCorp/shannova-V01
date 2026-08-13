import { Router } from "express";
import { runCode } from "../controllers/executeController.js";

export const executeRouter = Router();

executeRouter.post("/", runCode);
