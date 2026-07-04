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
    <div className="text-left mb-4">
      <label htmlFor={id} className="block text-[13px] font-semibold text-neutral-text mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full bg-neutral-bg border-[1.5px] border-transparent rounded-2.5 py-3 px-4 text-3.5 text-neutral-text outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light focus:bg-[#f8f9ff] disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-neutral-bg"
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
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-neutral-muted text-4 p-0.5 flex items-center justify-center"
          type="button"
          title={visible ? "Sembunyikan password" : "Tampilkan password"}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? EYE_CLOSED : EYE_OPEN}
        </button>
      </div>
    </div>
  );
}
