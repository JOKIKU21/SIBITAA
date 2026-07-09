"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  studentService,
  type ChangePasswordPayload,
  type StudentProfile,
  type UpdateProfilePayload,
} from "@/services/student";

/** Centralised query keys for student data — keeps invalidation typo-proof. */
export const studentKeys = {
  all: ["student"] as const,
  profile: () => [...studentKeys.all, "profile"] as const,
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
