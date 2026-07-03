"use client";

// ponytail: minimal client component — just the input + label pattern
// Used across masuk (email) and daftar (name, email)

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
  minLength,
  maxLength,
  name,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  name?: string;
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        className="form-input"
        type={type}
        id={id}
        name={name ?? id}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
}
