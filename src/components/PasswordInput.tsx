"use client";

import { useState } from "react";

// ponytail: password field with show/hide toggle — needs useState for visibility

// Hoisted static SVGs outside component to avoid re-creation on each render
const EYE_OPEN = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EYE_CLOSED = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

export default function PasswordInput({
  id = "password",
  label = "Password",
  placeholder,
  required,
  disabled,
  minLength,
  maxLength,
  name,
}: {
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  name?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          className="form-input"
          type={visible ? "text" : "password"}
          id={id}
          name={name ?? id}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
        />
        <button
          className="eye-btn"
          type="button"
          title={visible ? "Sembunyikan password" : "Tampilkan password"}
          onClick={() => setVisible((v) => !v)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {visible ? EYE_CLOSED : EYE_OPEN}
        </button>
      </div>
    </div>
  );
}
