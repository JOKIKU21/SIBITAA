import { Suspense } from "react";
import VerifikasiForm from "./VerifikasiForm";

// ponytail: server component wrapper — only exists for Suspense boundary
// useSearchParams() in VerifikasiForm requires Suspense to avoid CSR bailout

export default function VerifikasiPage() {
  return (
    <Suspense
      fallback={
        <div className="login-page">
          <div
            className="login-card"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Memuat...</p>
          </div>
        </div>
      }
    >
      <VerifikasiForm />
    </Suspense>
  );
}
