"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentService } from "@/services/student";

export const bimbinganKeys = {
  all: ["student", "bimbingan"] as const,
  list: () => [...bimbinganKeys.all, "list"] as const,
  detail: (stageId: string) => [...bimbinganKeys.all, "detail", stageId] as const,
};

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
    mutationFn: ({ stageId, data }: { stageId: string; data: Record<string, any> }) =>
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
      payload: { data?: Record<string, any>; completedAt?: string | null };
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
