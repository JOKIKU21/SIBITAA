import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    if (!apiURL) {
      return window.location.origin;
    }
    if (apiURL.includes("localhost")) {
      try {
        const url = new URL(apiURL);
        url.protocol = window.location.protocol;
        return url.origin;
      } catch {
        return window.location.origin;
      }
    }
    return apiURL;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    emailOTPClient(),
  ],
});
