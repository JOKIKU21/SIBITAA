import { apiFetch } from "@/lib/api-client";

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

  /** Update lecturer profile (e.g. name). */
  updateProfile(payload: { name: string }) {
    return apiFetch<unknown>("/api/users/profile", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
};
