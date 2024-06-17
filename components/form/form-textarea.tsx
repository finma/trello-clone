"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { FormErrors } from "./form-errors";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  errors?: Record<string, string[] | undefined>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement | undefined>;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}

          <Textarea
            id={id}
            name={id}
            ref={ref}
            placeholder={placeholder}
            required={required}
            disabled={pending || disabled}
            defaultValue={defaultValue}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-describedby={`${id}-error`}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            {...props}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
