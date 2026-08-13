import { describe, expect, it, vi } from "vitest";
import type { Job } from "bullmq";

const addDocuments = vi.fn();
const deleteDocument = vi.fn();

vi.mock("../lib/meilisearch.js", () => ({
  RESOURCES_INDEX: "resources",
  meiliClient: {
    index: () => ({ addDocuments, deleteDocument }),
  },
}));

const { processMeiliSyncJob } = await import("../jobs/meili-sync.js");

describe("processMeiliSyncJob", () => {
  it("upserts a document into the resources index", async () => {
    const job = {
      data: {
        index: "resources",
        action: "upsert",
        document: { id: "r1", title: "Intro", type: "ARTICLE", url: null, content: null, topicId: "t1" },
      },
    } as unknown as Job;

    await processMeiliSyncJob(job as never);

    expect(addDocuments).toHaveBeenCalledWith(
      [{ id: "r1", title: "Intro", type: "ARTICLE", url: null, content: null, topicId: "t1" }],
      { primaryKey: "id" },
    );
  });

  it("deletes a document from the resources index", async () => {
    const job = {
      data: { index: "resources", action: "delete", documentId: "r1" },
    } as unknown as Job;

    await processMeiliSyncJob(job as never);

    expect(deleteDocument).toHaveBeenCalledWith("r1");
  });
});
