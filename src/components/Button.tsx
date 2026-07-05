"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

export type ButtonVariant =
  | "brand"
  | "brand-dark"
  | "brand-light"
  | "brand-bg"
  | "success"
  | "warning"
  | "danger"
  | "danger-light"
  | "outline"
  | "outline-white"
  | "outline-neutral"
  | "white"
  | "neutral"
  | "ghost"
  | "link"
  | "google"
  | "custom";

export type ButtonSize = "sm" | "md" | "lg" | "icon" | "custom";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  fullWidth?: boolean;
  // If rendering as a Link, we might pass anchor attributes
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  brand: "bg-brand text-white border-none hover:bg-brand-dark",
  "brand-dark": "bg-brand-dark text-white border-none hover:bg-brand",
  "brand-light": "bg-brand-light text-white border-none hover:bg-brand",
  "brand-bg": "bg-brand-bg text-brand border-none hover:bg-brand-light/15",
  success: "bg-success text-white border-none hover:bg-[#15803d]",
  warning: "bg-warning text-white border-none hover:bg-amber-800",
  danger: "bg-danger text-white border-none hover:bg-red-700",
  "danger-light": "bg-danger/12 text-[#fca5a5] border-none hover:bg-danger/22",
  outline: "bg-white border-[1.5px] border-brand text-brand hover:bg-[#f0f3ff]",
  "outline-white": "bg-transparent text-white border-[1.5px] border-white/40 hover:bg-white/8 hover:border-white/70",
  "outline-neutral": "border-[1.5px] border-neutral-border bg-white text-neutral-text hover:bg-neutral-bg",
  white: "bg-white text-brand border-none hover:bg-brand-bg hover:shadow-md",
  neutral: "bg-neutral-bg text-neutral-text hover:bg-neutral-border/50",
  ghost: "bg-transparent text-neutral-muted hover:text-neutral-text hover:bg-neutral-bg/30",
  link: "bg-transparent border-none text-brand hover:underline p-0 inline-flex items-center",
  google: "border-[1.5px] border-neutral-border bg-white text-neutral-text hover:bg-neutral-bg font-semibold rounded-2.5 p-3 text-3.5 justify-center gap-2.5",
  custom: "",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "py-1.5 px-3 rounded-1.75 text-3.5 font-bold",
  md: "py-2.5 px-5.5 rounded-2.25 text-3.5 font-bold",
  lg: "p-3.5 rounded-2.5 text-[15px] font-bold",
  icon: "p-2 rounded-full flex items-center justify-center shrink-0",
  custom: "",
};

const GOOGLE_ICON = (
  <svg className="w-5.5 h-5.5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "brand",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      href,
      fullWidth = false,
      className = "",
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isButtonDisabled = disabled || isLoading;

    // Common styling classes
    const baseClasses = "inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 font-sans disabled:opacity-60 disabled:cursor-not-allowed select-none";
    const variantClass = variantStyles[variant];
    const sizeClass = variant === "google" ? "" : sizeStyles[size];
    const widthClass = fullWidth ? "w-full" : "";
    const activeHoverClass = variant === "brand" ? "hover:-translate-y-px active:translate-y-0" : "";

    const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${activeHoverClass} ${className}`.trim();

    // Spinner svg component for loading state
    const loadingSpinner = (
      <svg
        className="animate-spin -ml-1 mr-2 h-4.5 w-4.5 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const finalLeftIcon = leftIcon || (variant === "google" ? GOOGLE_ICON : undefined);

    const buttonContent = (
      <>
        {isLoading && loadingSpinner}
        {!isLoading && finalLeftIcon && <span className="flex shrink-0">{finalLeftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="flex shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClasses}
          {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          style={{ textDecoration: "none" }}
        >
          {buttonContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={combinedClasses}
        disabled={isButtonDisabled}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
