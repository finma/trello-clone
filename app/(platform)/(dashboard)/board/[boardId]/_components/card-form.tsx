"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";

import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created.`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      execute({
        title,
        listId,
        boardId,
      });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextarea
            ref={ref}
            id="title"
            errors={fieldErrors}
            onKeyDown={onTextareaKeyDown}
            placeholder="Enter a title for this card..."
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit variant="primary">Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="size-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 ">
        <Button
          variant="ghost"
          size="sm"
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        >
          <Plus className="size-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
