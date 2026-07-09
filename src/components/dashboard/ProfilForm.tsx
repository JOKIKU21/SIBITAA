"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useToast } from "@/components/providers/ToastProvider";
import { authClient } from "@/lib/auth-client";
import {
  useChangePassword,
  useStudentProfile,
  useUpdateProfile,
} from "@/hooks/useStudentProfile";
import {
  useLecturerProfile,
  useUpdateLecturerProfile,
} from "@/hooks/useLecturer";
import { StudentProfile } from "@/services/student";
import { GetLecturerProfileResponse } from "@/services/lecturer";
import ProfilLoading from "@/app/dashboard/mahasiswa/profil/loading";

interface ProfilFormProps {
  initialRole?: "student" | "lecturer" | "admin" | "superadmin";
}

const EMPTY_PROFILE_FORM = {
  name: "",
  education: "",
  studyProgram: "",
  campus: "",
};

const EMPTY_PASSWORD_FORM = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ProfilForm({ initialRole }: ProfilFormProps = {}) {
  const toast = useToast();
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const user = session?.user as any;

  const resolvedRole =
    initialRole ||
    (user?.role as "student" | "lecturer" | "admin" | "superadmin") ||
    "student";

  // Student profile queries
  const {
    data: studentProfileData,
    isLoading: isStudentLoading,
    isError: isStudentError,
    error: studentError,
    refetch: refetchStudent,
  } = useStudentProfile({
    enabled: resolvedRole === "student" && !!session,
  });
  const studentProfile = studentProfileData as StudentProfile | undefined;
  const updateStudentProfile = useUpdateProfile();

  // Lecturer profile queries
  const {
    data: lecturerProfileData,
    isLoading: isLecturerLoading,
    isError: isLecturerError,
    error: lecturerError,
    refetch: refetchLecturer,
  } = useLecturerProfile({
    enabled: resolvedRole === "lecturer" && !!session,
  });
  const lecturerProfileResponse = lecturerProfileData as GetLecturerProfileResponse | undefined;
  const updateLecturerProfile = useUpdateLecturerProfile();

  // Common password query
  const changePassword = useChangePassword();

  const [form, setForm] = useState(EMPTY_PROFILE_FORM);
  const [passwordForm, setPasswordForm] = useState(EMPTY_PASSWORD_FORM);
  const [isEditing, setIsEditing] = useState(false);

  // Seed form data based on role and loaded profile
  useEffect(() => {
    if (resolvedRole === "student" && studentProfile) {
      setForm({
        name: studentProfile.name ?? "",
        education: studentProfile.education ?? "",
        studyProgram: studentProfile.studyProgram ?? "",
        campus: studentProfile.campus ?? "",
      });
    } else if (
      resolvedRole === "lecturer" &&
      user &&
      lecturerProfileResponse?.profile
    ) {
      setForm({
        name: user.name ?? "",
        education: "",
        studyProgram: lecturerProfileResponse.profile.department ?? "",
        campus: lecturerProfileResponse.profile.campus ?? "",
      });
    } else if (
      (resolvedRole === "admin" || resolvedRole === "superadmin") &&
      user
    ) {
      setForm({
        name: user.name ?? "",
        education: "",
        studyProgram: "",
        campus: "",
      });
    }
  }, [studentProfile, lecturerProfileResponse, user, resolvedRole]);

  const resetFormFromProfile = () => {
    if (resolvedRole === "student") {
      setForm({
        name: studentProfile?.name ?? "",
        education: studentProfile?.education ?? "",
        studyProgram: studentProfile?.studyProgram ?? "",
        campus: studentProfile?.campus ?? "",
      });
    } else if (resolvedRole === "lecturer") {
      setForm({
        name: user?.name ?? "",
        education: "",
        studyProgram: lecturerProfileResponse?.profile?.department ?? "",
        campus: lecturerProfileResponse?.profile?.campus ?? "",
      });
    } else if (resolvedRole === "admin" || resolvedRole === "superadmin") {
      setForm({
        name: user?.name ?? "",
        education: "",
        studyProgram: "",
        campus: "",
      });
    }
  };

  const handleCancelEdit = () => {
    resetFormFromProfile();
    setIsEditing(false);
  };

  const handleSaveProfile = () => {
    if (resolvedRole === "student") {
      updateStudentProfile.mutate(
        {
          name: form.name,
          education: form.education,
          studyProgram: form.studyProgram,
          campus: form.campus,
        },
        {
          onSuccess: () => {
            setIsEditing(false);
            toast.success("Profil diperbarui", {
              description: "Perubahan berhasil disimpan.",
            });
          },
          onError: (err) =>
            toast.error("Gagal menyimpan profil", {
              description: err instanceof Error ? err.message : undefined,
            }),
        }
      );
    } else {
      // For lecturer, admin, superadmin - updates user name
      updateLecturerProfile.mutate(
        {
          name: form.name,
        },
        {
          onSuccess: async () => {
            setIsEditing(false);
            // Refresh Better Auth session to sync the header/sidebar immediately
            await authClient.getSession();
            toast.success("Profil diperbarui", {
              description: "Perubahan berhasil disimpan.",
            });
          },
          onError: (err) =>
            toast.error("Gagal menyimpan profil", {
              description: err instanceof Error ? err.message : undefined,
            }),
        }
      );
    }
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword.length < 8) {
      toast.warning("Password terlalu pendek", {
        description: "Password baru minimal 8 karakter.",
      });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.warning("Konfirmasi tidak cocok", {
        description: "Pastikan konfirmasi password sama dengan password baru.",
      });
      return;
    }

    changePassword.mutate(
      {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      },
      {
        onSuccess: () => {
          setPasswordForm(EMPTY_PASSWORD_FORM);
          toast.success("Password berhasil diubah");
        },
        onError: (err) =>
          toast.error("Gagal mengubah password", {
            description: err instanceof Error ? err.message : undefined,
          }),
      }
    );
  };

  // Determine displays
  let displayName = "";
  let avatarInitial = "?";
  let displaySub = "";
  let badgeText = "";

  if (resolvedRole === "student") {
    displayName = form.name || studentProfile?.name || "";
    avatarInitial = displayName.charAt(0).toUpperCase() || "?";
    displaySub = studentProfile
      ? `${studentProfile.studyProgram} · ${studentProfile.campus}`
      : "";
    badgeText =
      studentProfile?.status === "active"
        ? "Mahasiswa Aktif"
        : studentProfile?.status || "Mahasiswa";
  } else if (resolvedRole === "lecturer") {
    displayName = form.name || user?.name || "";
    avatarInitial = displayName.charAt(0).toUpperCase() || "?";
    displaySub = lecturerProfileResponse?.profile
      ? `${lecturerProfileResponse.profile.department} · ${lecturerProfileResponse.profile.campus}`
      : "";
    badgeText = "Dosen Pembimbing";
  } else if (resolvedRole === "admin") {
    displayName = form.name || user?.name || "";
    avatarInitial = displayName.charAt(0).toUpperCase() || "?";
    displaySub = "Administrator";
    badgeText = "Admin";
  } else if (resolvedRole === "superadmin") {
    displayName = form.name || user?.name || "";
    avatarInitial = displayName.charAt(0).toUpperCase() || "?";
    displaySub = "Super Administrator";
    badgeText = "Super Admin";
  }

  const isEditingAllowed = true;
  const isUpdatingPending =
    updateStudentProfile.isPending || updateLecturerProfile.isPending;

  const editableVariant = isEditing ? "bordered" : "ghost";

  const isLoading =
    isSessionLoading ||
    (resolvedRole === "student" && isStudentLoading) ||
    (resolvedRole === "lecturer" && isLecturerLoading);

  const isError =
    !session ||
    (resolvedRole === "student" && (isStudentError || !studentProfile)) ||
    (resolvedRole === "lecturer" &&
      (isLecturerError || !lecturerProfileResponse));

  const errorObj = resolvedRole === "student" ? studentError : lecturerError;
  const refetchFn = resolvedRole === "student" ? refetchStudent : refetchLecturer;

  if (isLoading) {
    return <ProfilLoading />;
  }

  if (isError) {
    return (
      <div className="p-7 max-[600px]:p-4">
        <div className="bg-white border border-neutral-border rounded-4 p-6.5 max-w-md">
          <h2 className="font-display text-4.5 font-extrabold mb-1">
            Gagal memuat profil
          </h2>
          <p className="text-3.5 text-neutral-muted mb-4">
            {errorObj instanceof Error
              ? errorObj.message
              : "Terjadi kesalahan saat mengambil data profil."}
          </p>
          <Button variant="brand" size="md" onClick={() => refetchFn?.()}>
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-extrabold mb-1">
            Profil Saya
          </h2>
          <p className="text-lg text-neutral-muted">
            Kelola informasi akun dan keamanan Anda
          </p>
        </div>
        <div className="grid grid-cols-[300px_1fr] gap-5.5 items-start max-[900px]:grid-cols-1">
          {/* left: avatar */}
          <div className="bg-white border border-neutral-border rounded-4 py-7.5 px-6 text-center">
            <div className="relative w-24 h-24 my-0 mx-auto mb-4">
              <div
                className="w-24 h-24 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-9 font-bold text-white overflow-hidden"
                id="pf-avatar-big"
              >
                {avatarInitial}
              </div>
              <label
                className="absolute bottom-0.5 right-0.5 w-7.5 h-7.5 rounded-full bg-brand border-2 border-white flex items-center justify-center cursor-pointer"
                title="Ubah foto"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-3.5 h-3.5 text-white"
                >
                  <path
                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="13"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => alert("Upload foto!")}
                />
              </label>
            </div>
            <div className="font-display text-4.5 font-extrabold mb-1">
              {displayName}
            </div>
            {displaySub && (
              <div className="text-[13px] text-neutral-muted mb-4.5">
                {displaySub}
              </div>
            )}
            <span className="inline-flex items-center gap-1.5 bg-brand-bg text-brand py-1.5 px-3.5 rounded-full text-[12.5px] font-bold">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 10 12 5 2 10l10 5 10-5ZM6 12.5v5"
                  stroke="#2B3BAF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {badgeText}
            </span>
          </div>

          {/* right */}
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-neutral-border rounded-4 p-6.5">
              <div className="flex items-center justify-between gap-3 mb-4.5 pb-3 border-b border-neutral-border">
                <h3 className="font-display text-[15px] font-extrabold">
                  Informasi Pribadi
                </h3>
                {!isEditing && isEditingAllowed && (
                  <Button
                    variant="outline"
                    size="custom"
                    className="py-2 px-4 rounded-2.25 text-[13px] font-bold"
                    leftIcon={
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                {/* Nama Lengkap */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">
                    Nama Lengkap
                  </label>
                  <Input
                    variant={editableVariant}
                    type="text"
                    value={form.name}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>

                {/* NIM / NIDN */}
                {resolvedRole === "student" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      NIM
                    </label>
                    <Input
                      variant="ghost"
                      type="text"
                      value={studentProfile?.nim}
                      readOnly
                    />
                  </div>
                )}
                {resolvedRole === "lecturer" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      NIDN
                    </label>
                    <Input
                      variant="ghost"
                      type="text"
                      value={lecturerProfileResponse?.profile?.nidn}
                      readOnly
                    />
                  </div>
                )}

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">
                    Email
                  </label>
                  <Input
                    variant="ghost"
                    type="email"
                    value={
                      resolvedRole === "student"
                        ? studentProfile?.email
                        : user?.email
                    }
                    readOnly
                  />
                </div>

                {/* No. HP */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">
                    No. HP
                  </label>
                  <Input
                    variant="ghost"
                    type="text"
                    value={
                      (resolvedRole === "student"
                        ? studentProfile?.phoneNumber
                        : user?.phoneNumber) || "-"
                    }
                    readOnly
                  />
                </div>

                {/* Program Studi / Departemen */}
                {resolvedRole === "student" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      Program Studi
                    </label>
                    <Input
                      variant={editableVariant}
                      type="text"
                      value={form.studyProgram}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, studyProgram: e.target.value }))
                      }
                    />
                  </div>
                )}
                {resolvedRole === "lecturer" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      Departemen
                    </label>
                    <Input
                      variant="ghost"
                      type="text"
                      value={form.studyProgram}
                      readOnly
                    />
                  </div>
                )}

                {/* Asal Kampus */}
                {resolvedRole === "student" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      Asal Kampus
                    </label>
                    <Input
                      variant={editableVariant}
                      type="text"
                      value={form.campus}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, campus: e.target.value }))
                      }
                    />
                  </div>
                )}
                {resolvedRole === "lecturer" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      Asal Kampus
                    </label>
                    <Input
                      variant="ghost"
                      type="text"
                      value={form.campus}
                      readOnly
                    />
                  </div>
                )}

                {/* Jenjang Pendidikan (student only) */}
                {resolvedRole === "student" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      Jenjang Pendidikan
                    </label>
                    <Input
                      variant={editableVariant}
                      type="text"
                      value={form.education}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, education: e.target.value }))
                      }
                    />
                  </div>
                )}

                {/* Dosen Pembimbing (student only) */}
                {resolvedRole === "student" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      Dosen Pembimbing
                    </label>
                    <Input
                      variant="ghost"
                      type="text"
                      value={studentProfile?.advisor?.name ?? "Belum ada"}
                      readOnly
                    />
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="flex items-center justify-end gap-3 mt-4.5">
                  <Button
                    variant="outline-neutral"
                    size="custom"
                    className="py-2.75 px-6.5 rounded-2.25 text-3.5 font-bold"
                    disabled={isUpdatingPending}
                    onClick={handleCancelEdit}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="brand"
                    size="custom"
                    className="py-2.75 px-6.5 rounded-2.25 text-3.5 font-bold"
                    isLoading={isUpdatingPending}
                    onClick={handleSaveProfile}
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-white border border-neutral-border rounded-4 p-6.5">
              <h3 className="font-display text-[15px] font-extrabold mb-4.5 pb-3 border-b border-neutral-border">
                Ubah Password
              </h3>
              <div className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">
                    Password Saat Ini
                  </label>
                  <Input
                    variant="bordered"
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((f) => ({
                        ...f,
                        currentPassword: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">
                    Password Baru
                  </label>
                  <Input
                    variant="bordered"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((f) => ({
                        ...f,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">
                    Konfirmasi Password Baru
                  </label>
                  <Input
                    variant="bordered"
                    type="password"
                    placeholder="Ulangi password baru"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((f) => ({
                        ...f,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-4.5">
                <Button
                  variant="brand"
                  size="custom"
                  className="py-2.75 px-6.5 rounded-2.25 text-3.5 font-bold"
                  isLoading={changePassword.isPending}
                  onClick={handleChangePassword}
                >
                  Ubah Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
