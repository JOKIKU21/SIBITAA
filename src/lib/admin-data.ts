import { apiFetch } from "./api-client";
import {
  adminService,
  type AdminSummaryResponse,
  type LecturerItem,
  type StudentItem,
  type RegistrationItem,
  type AdminPaymentRecord,
} from "@/services/admin";
import { referenceService, type ReferenceFile } from "@/services/reference";

export interface AdminProfile {
  id: string;
  nama: string;
  email: string;
  role?: string;
  image?: string | null;
}

export type {
  LecturerItem as DosenItem,
  StudentItem as MahasiswaItem,
  RegistrationItem,
  AdminPaymentRecord as PembayaranItem,
  AdminSummaryResponse as AdminSummary,
  ReferenceFile as ReferensiItem,
};

/**
 * Fetch current admin user profile from API.
 */
export async function getAdminProfile(): Promise<AdminProfile> {
  const user = await apiFetch<{ id: string; name: string; email: string; role?: string; image?: string | null }>(
    "/api/users/profile",
    { method: "GET" }
  );
  return {
    id: user.id,
    nama: user.name,
    email: user.email,
    role: user.role,
    image: user.image,
  };
}

/**
 * Fetch admin summary statistics from API.
 */
export async function getAdminSummary(): Promise<AdminSummaryResponse> {
  return adminService.getSummary();
}

/**
 * Fetch lecturers list from API.
 */
export async function getDosenList(search?: string): Promise<LecturerItem[]> {
  const res = await adminService.getLecturers(search);
  return res.lecturers;
}

/**
 * Fetch students list from API.
 */
export async function getMahasiswaList(search?: string): Promise<StudentItem[]> {
  const res = await adminService.getStudents(search);
  return res.students;
}

/**
 * Fetch student registrations list from API.
 */
export async function getRegistrasiList(
  status?: "pending" | "approved" | "rejected",
  search?: string
): Promise<RegistrationItem[]> {
  const res = await adminService.getRegistrations(status, search);
  return res.registrations;
}

/**
 * Fetch payments records from API.
 */
export async function getPembayaranList(search?: string): Promise<AdminPaymentRecord[]> {
  const res = await adminService.getPayments(search);
  return res.payments;
}

/**
 * Fetch reference files from API.
 */
export async function getReferensiList(type?: string, search?: string): Promise<ReferenceFile[]> {
  const res = await referenceService.getReferenceFiles(type, search);
  return res.referenceFiles;
}
