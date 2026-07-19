"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  studentService,
  type ChangePasswordPayload,
  type StudentProfile,
  type UpdateProfilePayload,
} from "@/services/student";

/** Centralised query keys for student profile data — keeps invalidation typo-proof. */
export const studentKeys = {
  all: ["student"] as const,
  profile: () => [...studentKeys.all, "profile"] as const,
  payments: () => [...studentKeys.all, "payments"] as const,
  paymentDetail: (paymentId: string) => [...studentKeys.all, "payments", paymentId] as const,
};

/** Centralised query keys for student bimbingan data. */
export const bimbinganKeys = {
  all: ["student", "bimbingan"] as const,
  list: () => [...bimbinganKeys.all, "list"] as const,
  detail: (stageId: string) => [...bimbinganKeys.all, "detail", stageId] as const,
};

/** Read the current student's profile. */
export function useStudentProfile(options?: any) {
  return useQuery({
    queryKey: studentKeys.profile(),
    queryFn: () => studentService.getProfile(),
    ...options,
  });
}

/**
 * Update the profile. On success we seed the cache with the server's response
 * (when it echoes the profile back) and invalidate so any stale reader refetches.
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      studentService.updateProfile(payload),
    onSuccess: (updated) => {
      if (updated && typeof updated === "object" && "name" in updated) {
        queryClient.setQueryData<StudentProfile>(studentKeys.profile(), updated);
      }
      queryClient.invalidateQueries({ queryKey: studentKeys.profile() });
    },
  });
}

/** Change the signed-in user's password. */
export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      studentService.changePassword(payload),
  });
}

/** Get overall bimbingan stages and progress. */
export function useStudentBimbingan() {
  return useQuery({
    queryKey: bimbinganKeys.list(),
    queryFn: () => studentService.getBimbingan(),
  });
}

/** Get detail notes and files for a specific stage. */
export function useStudentBimbinganDetail(stageId?: string) {
  return useQuery({
    queryKey: bimbinganKeys.detail(stageId || ""),
    queryFn: () => studentService.getBimbinganDetail(stageId!),
    enabled: !!stageId,
  });
}

/** Create a new note. */
export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stageId, data }: { stageId: string; data: Record<string, unknown> }) =>
      studentService.createNote(stageId, data),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: bimbinganKeys.detail(stageId) });
    },
  });
}

/** Update an existing note (data and/or completedAt). */
export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      stageId,
      noteId,
      payload,
    }: {
      stageId: string;
      noteId: string;
      payload: { data?: Record<string, unknown>; completedAt?: string | null };
    }) => studentService.updateNote(stageId, noteId, payload),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: bimbinganKeys.detail(stageId) });
    },
  });
}

/** Add a file to the stage. */
export function useCreateFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      stageId,
      payload,
    }: {
      stageId: string;
      payload: { fileName: string; fileUrl: string; fileType?: string; fileSize?: number };
    }) => studentService.createFile(stageId, payload),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: bimbinganKeys.detail(stageId) });
    },
  });
}

/** Delete a file from the stage. */
export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stageId, fileId }: { stageId: string; fileId: string }) =>
      studentService.deleteFile(stageId, fileId),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: bimbinganKeys.detail(stageId) });
    },
  });
}

/** Fetch chat messages for a specific stage. */
export function useChatMessages(stageId?: string) {
  return useQuery({
    queryKey: ["student", "chat", stageId || ""],
    queryFn: () => studentService.getChatMessages(stageId!),
    enabled: !!stageId,
  });
}

/** Send a chat message. */
export function useSendChatMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      stageId,
      payload,
    }: {
      stageId: string;
      payload: { message?: string; fileName?: string; fileUrl?: string; fileType?: string; fileSize?: number };
    }) => studentService.sendChatMessage(stageId, payload),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: ["student", "chat", stageId] });
    },
  });
}

/** Get student's installment payments */
export function useStudentPayments() {
  return useQuery({
    queryKey: studentKeys.payments(),
    queryFn: () => studentService.getPayments(),
  });
}

/** Get details of a specific payment installment */
export function useStudentPaymentDetail(paymentId?: string) {
  return useQuery({
    queryKey: studentKeys.paymentDetail(paymentId || ""),
    queryFn: () => studentService.getPaymentDetail(paymentId!),
    enabled: !!paymentId,
  });
}

/** Upload a registration file (ukt, contract, payment proof) */
export function useUploadRegistrationFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      type: "ukt" | "contract" | "payment_proof";
      fileName: string;
      fileUrl: string;
      fileType: string;
      fileSize: number;
      registrationPaymentId?: string | null;
    }) => studentService.uploadRegistrationFile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.payments() });
    },
  });
}

/** Upload payment proof for a specific installment */
export function useUploadPaymentProof() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      file,
      amount,
    }: {
      paymentId: string;
      file: File;
      amount?: number;
    }) => studentService.uploadPaymentProof(paymentId, file, amount),
    onSuccess: (_, { paymentId }) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.payments() });
      queryClient.invalidateQueries({ queryKey: studentKeys.paymentDetail(paymentId) });
    },
  });
}

/** Edit an unapproved installment payment */
export function useEditPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      payload,
    }: {
      paymentId: string;
      payload: {
        installment?: number;
        amount?: number;
        note?: string;
        file?: File;
      };
    }) => studentService.editPayment(paymentId, payload),
    onSuccess: (_, { paymentId }) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.payments() });
      queryClient.invalidateQueries({ queryKey: studentKeys.paymentDetail(paymentId) });
    },
  });
}

/** Delete an unapproved installment payment */
export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: string) => studentService.deletePayment(paymentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.payments() });
    },
  });
}
