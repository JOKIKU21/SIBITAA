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
    <div className="text-left mb-[16px]">
      <label htmlFor={id} className="block text-[13px] font-semibold text-neutral-text mb-[6px]">
        {label}
      </label>
      <input
        className="w-full bg-neutral-bg border-[1.5px] border-transparent rounded-[10px] py-[12px] px-[16px] text-[14px] text-neutral-text outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light focus:bg-[#f8f9ff] disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-neutral-bg"
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
