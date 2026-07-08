import { InputProps } from "@/components/Input";
import Input from "@/components/Input";

export default function FormInput({
  id,
  label,
  type = "text",
  wrapperClassName = "text-left mb-4",
  ...props
}: {
  id: string;
  label?: string;
} & Omit<InputProps, "id" | "label">) {
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
