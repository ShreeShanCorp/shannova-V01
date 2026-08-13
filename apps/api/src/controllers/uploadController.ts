import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { getR2Client } from "../lib/r2.js";
import { ApiError, sendSuccess } from "../lib/response.js";

const presignSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().min(1),
});

export const presignUpload = asyncHandler(async (req, res) => {
  const client = getR2Client();
  const bucket = process.env.R2_BUCKET;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!client || !bucket || !publicUrl) {
    throw ApiError.badRequest(
      "File uploads are not configured yet. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, and R2_PUBLIC_URL.",
    );
  }

  const { fileName, contentType } = presignSchema.parse(req.body);
  const key = `${randomUUID()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  const uploadUrl = await getSignedUrl(
    client,
    new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType }),
    { expiresIn: 300 },
  );

  return sendSuccess(res, { uploadUrl, fileKey: key, publicUrl: `${publicUrl}/${key}` });
});
