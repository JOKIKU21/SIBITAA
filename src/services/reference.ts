import { apiFetch } from "@/lib/api-client";

export interface ReferenceFile {
  id: string;
  title: string;
  description: string;
  type: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetReferenceFilesResponse {
  referenceFiles: ReferenceFile[];
}

export const referenceService = {
  /** Fetch references files for students */
  getReferenceFiles() {
    return apiFetch<GetReferenceFilesResponse>("/api/reference-files", {
      method: "GET",
    });
  },
};
