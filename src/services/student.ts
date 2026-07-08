import { apiFetch } from "@/lib/api-client";

export interface StudentAdvisor {
  name: string;
  email: string;
}

/** Shape returned by `GET /api/student/profile`. */
export interface StudentProfile {
  name: string;
  nim: string;
  email: string;
  education: string;
  phoneNumber: string;
  studyProgram: string;
  campus: string;
  advisor: StudentAdvisor | null;
  status: string;
}

/**
 * Fields accepted by `PATCH /api/users/profile`. Everything is optional so the
 * form can send a partial update; NIM, email, phone and advisor are managed by
 * the backend and are not editable here.
 */
export interface UpdateProfilePayload {
  name?: string;
  campus?: string;
  studyProgram?: string;
  education?: string;
}

/** Body for `POST /api/auth/change-password`. */
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface BackendStage {
  id: string;
  order: number;
  name: string;
  description: string | null;
  durationDays: number;
}

export interface StudentProgress {
  studentId: string;
  currentStageId: string | null;
  startedAt: string;
  status: string;
  finishedAt: string | null;
  updatedAt: string;
}

export interface GetBimbinganResponse {
  stages: BackendStage[];
  progress: StudentProgress | null;
}

export interface StageNote {
  id: string;
  studentId: string;
  stageId: string;
  data: Record<string, any> | null;
  createdAt: string;
  completedAt: string | null;
  updatedAt: string;
}

export interface StageFile {
  id: string;
  studentId: string;
  stageId: string;
  fileName: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: number;
  createdAt: string;
}

export interface GetStageDetailResponse {
  stage: BackendStage;
  notes: StageNote[];
  files: StageFile[];
}

export interface ChatMessage {
  id: string;
  studentId: string;
  senderId: string;
  stageId: string;
  message: string | null;
  fileName: string | null;
  fileUrl: string | null;
  fileType: string | null;
  fileSize: number | null;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface GetChatMessagesResponse {
  messages: ChatMessage[];
  advisor: {
    id: string;
    name: string;
    image: string | null;
  } | null;
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export const studentService = {
  /** Fetch the signed-in student's profile. */
  getProfile() {
    return apiFetch<StudentProfile>("/api/student/profile", { method: "GET" });
  },

  /** Update the editable subset of the student's profile. */
  updateProfile(payload: UpdateProfilePayload) {
    return apiFetch<StudentProfile>("/api/users/profile", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /** Change the password for the current session. */
  changePassword(payload: ChangePasswordPayload) {
    return apiFetch<unknown>("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** Fetch the student's stages and overall progress. */
  getBimbingan() {
    return apiFetch<GetBimbinganResponse>("/api/student/bimbingan", { method: "GET" });
  },

  /** Fetch details of a specific stage (notes and files). */
  getBimbinganDetail(stageId: string) {
    return apiFetch<GetStageDetailResponse>(`/api/student/bimbingan/${stageId}`, { method: "GET" });
  },

  /** Create a new note for a stage. */
  createNote(stageId: string, data: Record<string, any>) {
    return apiFetch<{ note: StageNote }>(`/api/student/bimbingan/${stageId}/notes`, {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  },

  /** Update a stage note. */
  updateNote(stageId: string, noteId: string, payload: { data?: Record<string, any>; completedAt?: string | null }) {
    return apiFetch<{ note: StageNote }>(`/api/student/bimbingan/${stageId}/notes/${noteId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /** Delete a stage note. */
  deleteNote(stageId: string, noteId: string) {
    return apiFetch<{ message: string }>(`/api/student/bimbingan/${stageId}/notes/${noteId}`, {
      method: "DELETE",
    });
  },

  /** Add a file to a stage. */
  createFile(stageId: string, payload: { fileName: string; fileUrl: string; fileType?: string; fileSize?: number }) {
    return apiFetch<{ file: StageFile }>(`/api/student/bimbingan/${stageId}/files`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** Delete a file from a stage. */
  deleteFile(stageId: string, fileId: string) {
    return apiFetch<{ message: string }>(`/api/student/bimbingan/${stageId}/files/${fileId}`, {
      method: "DELETE",
    });
  },

  /** Fetch chat messages for a specific stage. */
  getChatMessages(stageId: string) {
    return apiFetch<GetChatMessagesResponse>(`/api/student/chat/${stageId}`, { method: "GET" });
  },

  /** Send a chat message. */
  sendChatMessage(stageId: string, payload: { message?: string; fileName?: string; fileUrl?: string; fileType?: string; fileSize?: number }) {
    return apiFetch<{ message: ChatMessage }>(`/api/student/chat/${stageId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
