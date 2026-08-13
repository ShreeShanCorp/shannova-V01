import { apiRequest } from "@/lib/api-client";

interface PresignResult {
  uploadUrl: string;
  fileKey: string;
  publicUrl: string;
}

/** Presigns with the API, then PUTs the file straight to R2 (no auth needed there —
 * the presigned URL itself is the credential). Returns the file's eventual public URL. */
export async function uploadFile(file: File): Promise<string> {
  const { data } = await apiRequest<PresignResult>({
    method: "POST",
    url: "/uploads/presign",
    data: { fileName: file.name, contentType: file.type || "application/octet-stream" },
  });

  await fetch(data.uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type || "application/octet-stream" },
  });

  return data.publicUrl;
}
