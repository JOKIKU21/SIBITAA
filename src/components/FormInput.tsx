"use client";

import React, { InputHTMLAttributes } from "react";
import Input from "@/components/Input";

export default function FormInput({
  id,
  label,
  type = "text",
  wrapperClassName = "text-left mb-4",
  ...props
}: {
  id: string;
  label: string;
  type?: string;
  wrapperClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "label" | "type">) {
  return (
    <Input
      type={type}
      id={id}
      label={label}
      name={props.name ?? id}
      wrapperClassName={wrapperClassName}
      {...props}
    />
  );
}
