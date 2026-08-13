import { Router } from "express";
import { presignUpload } from "../controllers/uploadController.js";

export const uploadsRouter = Router();

uploadsRouter.post("/presign", presignUpload);
