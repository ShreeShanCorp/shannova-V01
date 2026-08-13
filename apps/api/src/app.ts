import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./lib/env.js";
import { loadOpenApiDocument } from "./lib/swagger.js";
import { attachUser, withClerk } from "./middleware/auth.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { v1Router } from "./routes/index.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(loadOpenApiDocument()));

  app.use(withClerk, attachUser);
  app.use("/api/v1", v1Router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
