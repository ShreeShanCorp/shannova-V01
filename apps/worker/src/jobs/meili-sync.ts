import type { Job } from "bullmq";
import type { Resource } from "@shannova/shared-types";
import { meiliClient, RESOURCES_INDEX } from "../lib/meilisearch.js";

// Mirrors apps/api/src/lib/queue.ts — queue name + payload shape are a contract
// between the producer (api) and this consumer, keep the two in sync.
export const MEILI_SYNC_QUEUE_NAME = "meili-sync";

interface MeiliUpsertJobData {
  index: "resources";
  action: "upsert";
  document: Pick<Resource, "id" | "title" | "type" | "url" | "content" | "topicId">;
}

interface MeiliDeleteJobData {
  index: "resources";
  action: "delete";
  documentId: string;
}

export type MeiliSyncJobData = MeiliUpsertJobData | MeiliDeleteJobData;

export async function processMeiliSyncJob(job: Job<MeiliSyncJobData>): Promise<void> {
  const { data } = job;

  if (data.index !== "resources") {
    throw new Error(`Unknown Meilisearch index: ${data.index}`);
  }

  const index = meiliClient.index(RESOURCES_INDEX);

  if (data.action === "upsert") {
    await index.addDocuments([data.document], { primaryKey: "id" });
    return;
  }

  if (data.action === "delete") {
    await index.deleteDocument(data.documentId);
    return;
  }
}
