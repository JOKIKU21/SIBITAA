"use client";

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
    <div className="text-left mb-4">
      <label htmlFor={id} className="block text-[13px] font-semibold text-neutral-text mb-1.5">
        {label}
      </label>
      <input
        className="w-full bg-neutral-bg border-[1.5px] border-transparent rounded-2.5 py-3 px-4 text-3.5 text-neutral-text outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light focus:bg-[#f8f9ff] disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-neutral-bg"
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
