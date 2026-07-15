"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { lecturerService } from "@/services/lecturer";

/** Centralised query keys for lecturer data — keeps invalidation typo-proof. */
export const lecturerKeys = {
  all: ["lecturer"] as const,
  profile: () => [...lecturerKeys.all, "profile"] as const,
  summary: () => [...lecturerKeys.all, "summary"] as const,
  students: () => [...lecturerKeys.all, "students"] as const,
  chatThreads: () => [...lecturerKeys.all, "chatThreads"] as const,
};

/** Read the current lecturer's profile. */
export function useLecturerProfile(options?: any) {
  return useQuery({
    queryKey: lecturerKeys.profile(),
    queryFn: () => lecturerService.getProfile(),
    ...options,
  });
}

/** Update the current lecturer's profile. */
export function useUpdateLecturerProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      name?: string;
      nidn?: string;
      campus?: string;
      department?: string;
      phoneNumber?: string;
    }) => lecturerService.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lecturerKeys.profile() });
    },
  });
}

/** Read the lecturer's dashboard stats summary. */
export function useLecturerDashboardSummary() {
  return useQuery({
    queryKey: lecturerKeys.summary(),
    queryFn: () => lecturerService.getDashboardSummary(),
  });
}

/** Read all students guided by this lecturer. */
export function useLecturerStudents() {
  return useQuery({
    queryKey: lecturerKeys.students(),
    queryFn: () => lecturerService.getStudents(),
  });
}

/** Read a specific student's bimbingan progress. */
export function useLecturerStudentProgress(studentId: string) {
  return useQuery({
    queryKey: [...lecturerKeys.students(), studentId] as const,
    queryFn: () => lecturerService.getStudentProgress(studentId),
    enabled: !!studentId,
  });
}

/** Read a specific student's stage details. */
export function useLecturerStudentStageDetail(studentId: string, stageId?: string) {
  return useQuery({
    queryKey: [...lecturerKeys.students(), studentId, "detail", stageId || ""] as const,
    queryFn: () => lecturerService.getStudentStageDetail(studentId, stageId!),
    enabled: !!studentId && !!stageId,
  });
}

/** Fetch chat messages for a specific student and stage. */
export function useLecturerChatMessages(studentId: string, stageId?: string) {
  return useQuery({
    queryKey: ["lecturer", "chat", studentId, stageId || ""],
    queryFn: () => lecturerService.getChatMessages(studentId, stageId!),
    enabled: !!studentId && !!stageId,
  });
}

/** Send a chat message to a student. */
export function useLecturerSendChatMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studentId,
      stageId,
      payload,
    }: {
      studentId: string;
      stageId: string;
      payload: { message?: string; fileName?: string; fileUrl?: string; fileType?: string; fileSize?: number };
    }) => lecturerService.sendChatMessage(studentId, stageId, payload),
    onSuccess: (_, { studentId, stageId }) => {
      queryClient.invalidateQueries({ queryKey: ["lecturer", "chat", studentId, stageId] });
      queryClient.invalidateQueries({ queryKey: lecturerKeys.chatThreads() });
    },
  });
}

/** Fetch all chat threads for the lecturer. */
export function useLecturerChatThreads() {
  return useQuery({
    queryKey: lecturerKeys.chatThreads(),
    queryFn: () => lecturerService.getChatThreads(),
  });
}

/** Mutation to approve a student's stage bimbingan and advance progress. */
export function useLecturerApproveStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studentId,
      stageId,
    }: {
      studentId: string;
      stageId: string;
    }) => lecturerService.approveStage(studentId, stageId),
    onSuccess: (_, { studentId, stageId }) => {
      // Invalidate both the stage details and student progress / lists
      queryClient.invalidateQueries({ queryKey: [...lecturerKeys.students(), studentId, "detail", stageId] });
      queryClient.invalidateQueries({ queryKey: [...lecturerKeys.students(), studentId] });
      queryClient.invalidateQueries({ queryKey: lecturerKeys.students() });
    },
  });
}
