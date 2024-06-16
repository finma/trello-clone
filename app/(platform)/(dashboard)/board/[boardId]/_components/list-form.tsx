"use client";

import { Plus, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";

import { ListWrapper } from "./list-wrapper";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created!`);
      disableEditing();
      router.refresh();
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

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          action={onSubmit}
          className="w-full p-3 rounded-md bg-white shadow-md space-y-4"
        >
          <FormInput
            id="title"
            ref={inputRef}
            errors={fieldErrors}
            placeholder="Enter list title..."
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
          />
          <input hidden value={params.boardId} name="boardId" />

          <div className="flex items-center gap-x-1">
            <FormSubmit variant="primary">Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="size-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition flex p-3 items-center font-medium text-sm"
      >
        <Plus className="size-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
