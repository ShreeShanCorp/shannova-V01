import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function loadOpenApiDocument(): Record<string, unknown> {
  const candidatePaths = [
    path.resolve(__dirname, "../../openapi/openapi.yaml"),
    path.resolve(__dirname, "../openapi/openapi.yaml"),
    path.resolve(process.cwd(), "openapi/openapi.yaml"),
    path.resolve(process.cwd(), "apps/api/openapi/openapi.yaml"),
  ];

  for (const candidate of candidatePaths) {
    if (fs.existsSync(candidate)) {
      const file = fs.readFileSync(candidate, "utf8");
      return yaml.load(file) as Record<string, unknown>;
    }
  }

  console.warn("[Swagger] openapi.yaml not found, returning minimal fallback spec.");
  return {
    openapi: "3.0.0",
    info: {
      title: "Shan Nova LMS API",
      version: "1.0.0",
      description: "90-Day PERN Full-Stack Platform API",
    },
    paths: {},
  };
}
