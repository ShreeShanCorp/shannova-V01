import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openapiPath = path.resolve(__dirname, "../../openapi/openapi.yaml");

export function loadOpenApiDocument(): Record<string, unknown> {
  const file = fs.readFileSync(openapiPath, "utf8");
  return yaml.load(file) as Record<string, unknown>;
}
