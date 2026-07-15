import { authClient } from "@/lib/auth-client";

export const authService = {
  /**
   * Register a new user with name, email, and password.
   */
  async signUp(name: string, email: string, password: string) {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      throw new Error(error.message || "Gagal melakukan pendaftaran.");
    }
    return data;
  },

  /**
   * Login a user with email and password.
   */
  async signIn(email: string, password: string) {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message || "Gagal masuk.");
    }
    return data;
  },

  /**
   * Logout the current user session.
   */
  async signOut() {
    const { error } = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Hard redirect to ensure middleware runs and all client state is cleared
          window.location.href = "/masuk";
        },
      },
    });
    if (error) {
      throw new Error(error.message || "Gagal keluar.");
    }
  },

  /**
   * Verify the 6-digit OTP code sent to the email.
   */
  async verifyEmailOtp(email: string, code: string) {
    const { data, error } = await authClient.emailOtp.verifyEmail({
      email,
      otp: code,
    });

    if (error) {
      throw new Error(error.message || "Kode OTP tidak valid atau kedaluwarsa.");
    }
    return data;
  },

  /**
   * Resend a verification OTP code to the email.
   */
  async resendOtp(email: string) {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });

    if (error) {
      throw new Error(error.message || "Gagal mengirim ulang kode OTP.");
    }
    return data;
  },

  /**
   * Trigger Google Social Sign-in.
   */
  async signInWithGoogle() {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
    });

    if (error) {
      throw new Error(error.message || "Gagal masuk dengan Google.");
    }
    return data;
  },

  /**
   * Get the active session data.
   */
  async getSession() {
    const { data, error } = await authClient.getSession();
    if (error) {
      throw new Error(error.message || "Gagal mengambil sesi.");
    }
    return data;
  }
};
