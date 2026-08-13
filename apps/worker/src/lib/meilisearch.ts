import { MeiliSearch } from "meilisearch";
import { env } from "./env.js";

export const meiliClient = new MeiliSearch({
  host: env.MEILI_HOST,
  apiKey: env.MEILI_MASTER_KEY,
});

export const RESOURCES_INDEX = "resources";

export async function ensureResourcesIndex(): Promise<void> {
  await meiliClient.createIndex(RESOURCES_INDEX, { primaryKey: "id" }).catch((err) => {
    // 202/index_already_exists is expected on every restart after the first.
    if (err?.cause?.code !== "index_already_exists") throw err;
  });

  await meiliClient.index(RESOURCES_INDEX).updateSettings({
    searchableAttributes: ["title", "content"],
    filterableAttributes: ["topicId", "type"],
  });
}
