import { apiFetch } from "@/lib/api-client";
import type { BackendStage, StudentProgress, GetStageDetailResponse, ChatMessage } from "./student";

export interface LecturerProfile {
  userId: string;
  nidn: string;
  campus: string;
  department: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetLecturerProfileResponse {
  profile: LecturerProfile;
}

export interface LecturerDashboardSummary {
  totalStudents: number;
  approachingDeadlineCount: number;
  overdueCount: number;
}

export interface LecturerStudentStage {
  id: string;
  order: number;
  name: string;
  durationDays: number;
}

export interface LecturerStudent {
  studentId: string;
  name: string;
  nim: string;
  studyProgram: string;
  image: string | null;
  email: string;
  thesisTitle: string;
  currentStageName: string;
  currentStage: LecturerStudentStage | null;
  progressPercentage: number;
  status: string;
}

export interface GetLecturerStudentsResponse {
  students: LecturerStudent[];
}

export interface MahasiswaBimbingan {
  userId: string;
  nim: string;
  nama: string;
  prodi: string;
  judul: string;
  tahapanAktif: number;
  tahapanNama: string;
  status: "aktif" | "mendekati-tenggat" | "terlambat";
  progress: number;
  avatarColor: string;
}

export interface GetLecturerStudentProgressResponse {
  stages: BackendStage[];
  progress: StudentProgress | null;
}

export interface GetLecturerChatMessagesResponse {
  messages: ChatMessage[];
  student: {
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

export interface ChatThreadLatestMessage {
  id: string;
  studentId: string;
  senderId: string;
  stageOrder: number;
  message: string | null;
  fileName: string | null;
  fileUrl: string | null;
  fileType: string | null;
  fileSize: number | null;
  createdAt: string;
  stage: {
    order: number;
    name: string;
  };
}

export interface ChatThread {
  student: {
    userId: string;
    name: string;
    email: string;
    image: string | null;
  };
  latestMessage: ChatThreadLatestMessage | null;
  totalMessages: number;
}

export interface GetLecturerChatThreadsResponse {
  threads: ChatThread[];
}

export const lecturerService = {
  /** Fetch the signed-in lecturer's profile information. */
  getProfile() {
    return apiFetch<GetLecturerProfileResponse>("/api/lecturer/profile", {
      method: "GET",
    });
  },

  /** Fetch statistics summary for the lecturer dashboard. */
  getDashboardSummary() {
    return apiFetch<LecturerDashboardSummary>("/api/lecturer/dashboard/summary", {
      method: "GET",
    });
  },

  /** Fetch all students guided by the lecturer. */
  getStudents() {
    return apiFetch<GetLecturerStudentsResponse>("/api/lecturer/students", {
      method: "GET",
    });
  },

  /** Fetch a specific student's bimbingan stages and progress. */
  getStudentProgress(studentId: string) {
    return apiFetch<GetLecturerStudentProgressResponse>(`/api/lecturer/bimbingan/${studentId}`, {
      method: "GET",
    });
  },

  /** Fetch details of a specific stage (notes and files) for a student. */
  getStudentStageDetail(studentId: string, stageId: string) {
    return apiFetch<GetStageDetailResponse>(`/api/lecturer/bimbingan/${studentId}/${stageId}`, {
      method: "GET",
    });
  },

  /** Fetch chat messages for a specific student and stage. */
  getChatMessages(studentId: string, stageId: string) {
    return apiFetch<GetLecturerChatMessagesResponse>(`/api/lecturer/chat/${studentId}/${stageId}`, {
      method: "GET",
    });
  },

  /** Send a chat message to a student for a stage. */
  sendChatMessage(
    studentId: string,
    stageId: string,
    payload: {
      message?: string;
      fileName?: string;
      fileUrl?: string;
      fileType?: string;
      fileSize?: number;
    }
  ) {
    return apiFetch<{ message: ChatMessage }>(`/api/lecturer/chat/${studentId}/${stageId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** Approve a bimbingan stage and advance progress. */
  approveStage(studentId: string, stageId: string) {
    return apiFetch<{ message: string; currentStageOrder: number; status: string }>(
      `/api/lecturer/bimbingan/${studentId}/${stageId}/approve`,
      {
        method: "POST",
      }
    );
  },

  /** Update lecturer profile. */
  updateProfile(payload: {
    name?: string;
    nidn?: string;
    campus?: string;
    department?: string;
    phoneNumber?: string;
  }) {
    return apiFetch<unknown>("/api/users/profile", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /** Fetch all chat threads/conversations with students. */
  getChatThreads() {
    return apiFetch<GetLecturerChatThreadsResponse>("/api/lecturer/chat", {
      method: "GET",
    });
  },
};
