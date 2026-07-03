import type { ReactNode } from "react";

// ponytail: pure presentational wrapper — no client JS needed
// Shared layout for masuk, daftar, verifikasi pages

export default function AuthCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-avatar">{icon}</div>
        <h1 className="login-title">{title}</h1>
        {children}
      </div>
    </div>
  );
}
