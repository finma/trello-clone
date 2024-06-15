"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { FormErrors } from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs text-neutral-700 font-semibold"
            >
              {label}
            </Label>
          )}
          <Input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            disabled={disabled || pending}
            required={required}
            defaultValue={defaultValue}
            onBlur={onBlur}
            className={className}
            aria-describedby={`${id}-error`}
            {...props}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
