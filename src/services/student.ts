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
  phoneNumber?: string;
}

/** Body for `POST /api/auth/change-password`. */
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface BackendStage {
  order: number;
  name: string;
  durationDays: number;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  currentStageOrder: number;
  startedAt: string;
  status: string;
  stageDeadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetBimbinganResponse {
  stages: BackendStage[];
  progress: StudentProgress | null;
}

export interface StageNote {
  id: string;
  studentId: string;
  stageOrder: number;
  authorId: string;
  data: Record<string, unknown> | null;
  comment?: string | null;
  status?: string;
  createdAt: string;
  completedAt: string | null;
  updatedAt: string;
}

export interface StageFile {
  id: string;
  studentId: string;
  stageOrder: number;
  uploadedById: string;
  fileName: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetStageDetailResponse {
  stage: BackendStage;
  notes: StageNote[];
  files: StageFile[];
}

export interface RegistrationPaymentFile {
  id: string;
  type: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
}

export interface RegistrationPayment {
  id: string;
  registrationId: string;
  installment: number;
  amount: number;
  status: string;
  paidAt: string | null;
  note: string | null;
  createdAt: string;
  updatedAt?: string;
  files?: RegistrationPaymentFile[];
}

export interface StudentPaymentGroup {
  registrationId: string;
  studentId: string;
  studentName: string;
  totalAmount: number;
  paidAmount: number;
  paymentOption: string;
  status: string;
  payments: RegistrationPayment[];
}

export interface GetStudentPaymentsResponse {
  payments: StudentPaymentGroup[];
}

export interface GetStudentPaymentDetailResponse {
  payment: RegistrationPayment;
}

export interface ChatMessage {
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
  updatedAt: string;
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
  createNote(stageId: string, data: Record<string, unknown>) {
    return apiFetch<{ note: StageNote }>(`/api/student/bimbingan/${stageId}/notes`, {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  },

  /** Update a stage note. */
  updateNote(stageId: string, noteId: string, payload: { data?: Record<string, unknown>; completedAt?: string | null }) {
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

  /** Upload and persist a registration file */
  uploadRegistrationFile(payload: {
    type: "ukt" | "contract" | "payment_proof";
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    registrationPaymentId?: string | null;
  }) {
    return apiFetch<{ file: { id: string; registrationId: string; type: string; fileName: string; fileUrl: string; fileSize?: number; createdAt: string } }>("/api/student/registration/files", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** Fetch the student's registration progress and files */
  getRegistration() {
    return apiFetch<{
      registration: {
        id: string;
        studentId: string;
        paymentOption: string;
        totalAmount: number;
        status: string;
        approvedBy: string | null;
        approvedAt: string | null;
        createdAt: string;
        updatedAt: string;
        files: Array<{
          id: string;
          registrationId: string;
          registrationPaymentId: string | null;
          type: string;
          fileName: string;
          fileUrl: string;
          fileType?: string;
          fileSize?: number;
          createdAt: string;
        }>;
        payments: Array<{
          id: string;
          registrationId: string;
          installment: number;
          amount: number;
          status: string;
          paidAt: string | null;
          note: string | null;
          createdAt: string;
          files: any[];
        }>;
      };
    }>("/api/student/registration", { method: "GET" });
  },

  /** Create a new registration pengajuan */
  createRegistration(payload: { 
    paymentOption: string; 
    totalAmount?: number;
    uktFile?: {
      fileName: string;
      fileUrl: string;
      fileType?: string;
      fileSize?: number;
    };
  }) {
    return apiFetch<{
      registration: {
        id: string;
        studentId: string;
        paymentOption: string;
        totalAmount: number;
        status: string;
        approvedBy: string | null;
        approvedAt: string | null;
        createdAt: string;
        updatedAt: string;
        payments: Array<{
          id: string;
          registrationId: string;
          installment: number;
          amount: number;
          status: string;
          paidAt: string | null;
          note: string | null;
          createdAt: string;
          files: any[];
        }>;
      };
    }>("/api/student/registration", {
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

  /** Fetch student's installment payments */
  getPayments() {
    return apiFetch<GetStudentPaymentsResponse>("/api/student/payments", { method: "GET" });
  },

  /** Fetch details of a specific installment payment */
  getPaymentDetail(paymentId: string) {
    return apiFetch<GetStudentPaymentDetailResponse>(`/api/student/payments/${paymentId}`, { method: "GET" });
  },

  /** Upload proof of payment for a specific installment */
  uploadPaymentProof(paymentId: string, file: File, amount?: number) {
    const formData = new FormData();
    formData.append("file", file);
    if (amount !== undefined) {
      formData.append("amount", String(amount));
    }

    return apiFetch<{ payment: RegistrationPayment; file: any }>(
      `/api/student/payments/${paymentId}/proof`,
      {
        method: "POST",
        body: formData,
      }
    );
  },

  /** Edit installment payment (unapproved) */
  editPayment(
    paymentId: string,
    payload: {
      installment?: number;
      amount?: number;
      note?: string;
      file?: File;
    }
  ) {
    if (payload.file) {
      const formData = new FormData();
      if (payload.installment !== undefined) {
        formData.append("installment", String(payload.installment));
      }
      if (payload.amount !== undefined) {
        formData.append("amount", String(payload.amount));
      }
      if (payload.note !== undefined) {
        formData.append("note", payload.note);
      }
      formData.append("file", payload.file);

      return apiFetch<{ payment: RegistrationPayment; file: any }>(
        `/api/student/payments/${paymentId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
    } else {
      return apiFetch<{ payment: RegistrationPayment; file: any }>(
        `/api/student/payments/${paymentId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            installment: payload.installment,
            amount: payload.amount,
            note: payload.note,
          }),
        }
      );
    }
  },

  /** Delete installment payment (unapproved) */
  deletePayment(paymentId: string) {
    return apiFetch<{ success: boolean; message: string }>(
      `/api/student/payments/${paymentId}`,
      {
        method: "DELETE",
      }
    );
  },
};
