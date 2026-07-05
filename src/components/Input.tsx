"use client";

import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import Button from "@/components/Button";

export type InputVariant = "default" | "bordered" | "custom";
export type InputSize = "sm" | "md" | "lg" | "custom";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: InputVariant;
  inputSize?: InputSize; // renamed to avoid conflict with HTML input's size attribute
  fullWidth?: boolean;
  wrapperClassName?: string;
}

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

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      variant = "default",
      inputSize = "md",
      fullWidth = true,
      className = "",
      wrapperClassName = "",
      type = "text",
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isCheckboxOrRadio = type === "checkbox" || type === "radio";
    const isPassword = type === "password";

    // Standard styling classes for text/password/email inputs
    const baseStyles = "w-full outline-none transition-all duration-200 font-sans disabled:opacity-60 disabled:cursor-not-allowed text-neutral-text";

    const variantStyles: Record<InputVariant, string> = {
      default: "bg-neutral-bg border-[1.5px] border-transparent rounded-2.5 py-3 px-4 text-3.5 focus:border-brand-light focus:bg-[#f8f9ff] disabled:bg-neutral-bg",
      bordered: "bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 focus:border-brand-light",
      custom: "",
    };

    const sizeStyles: Record<InputSize, string> = {
      sm: "py-2 px-3 text-3.5 rounded-2",
      md: "py-3 px-4 text-3.5 rounded-2.5",
      lg: "py-3.5 px-4 text-4 rounded-3",
      custom: "",
    };

    const checkboxStyles = "w-4 h-4 accent-brand cursor-pointer shrink-0";

    // If checkbox or radio
    if (isCheckboxOrRadio) {
      return (
        <input
          type={type}
          id={id}
          ref={ref}
          className={`${checkboxStyles} ${className}`.trim()}
          {...props}
        />
      );
    }

    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    const passwordToggle = isPassword ? (
      <Button
        variant="ghost"
        size="custom"
        className="text-neutral-muted p-0.5 flex items-center justify-center hover:bg-transparent hover:text-neutral-text"
        type="button"
        title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        onClick={() => setShowPassword((v) => !v)}
      >
        {showPassword ? EYE_CLOSED : EYE_OPEN}
      </Button>
    ) : undefined;

    const finalRightIcon = rightIcon || passwordToggle;

    const leftIconPadding = leftIcon ? "pl-10.5" : "";
    const rightIconPadding = finalRightIcon ? "pr-10.5" : "";

    // If default variant and size is default/md, we use default styles, else adjust size styles
    const resolvedSizeClass = variant === "default" && inputSize !== "md" && inputSize !== "custom" 
      ? sizeStyles[inputSize] 
      : "";

    const combinedInputClasses = `
      ${variant === "custom" ? "" : baseStyles}
      ${variantStyles[variant]}
      ${resolvedSizeClass}
      ${leftIconPadding}
      ${rightIconPadding}
      ${error ? "border-danger focus:border-danger bg-danger-bg/20" : ""}
      ${className}
    `.replace(/\s+/g, " ").trim();

    return (
      <div className={`${fullWidth ? "w-full" : ""} flex flex-col gap-1.5 ${wrapperClassName}`.trim()}>
        {label && (
          <label htmlFor={id} className="block text-[13px] font-semibold text-neutral-text">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <span className="absolute left-3.5 text-neutral-muted flex items-center justify-center pointer-events-none shrink-0">
              {leftIcon}
            </span>
          )}
          <input
            type={resolvedType}
            id={id}
            ref={ref}
            className={combinedInputClasses}
            {...props}
          />
          {finalRightIcon && (
            <span className="absolute right-3.5 text-neutral-muted flex items-center justify-center shrink-0">
              {finalRightIcon}
            </span>
          )}
        </div>
        {error && (
          <span className="text-2.5 text-danger font-semibold mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
