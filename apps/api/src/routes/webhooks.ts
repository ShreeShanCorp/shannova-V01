import { Router } from "express";
import { googleMeetWebhook } from "../controllers/webhookController.js";

export const webhooksRouter = Router();

webhooksRouter.post("/google-meet", googleMeetWebhook);
