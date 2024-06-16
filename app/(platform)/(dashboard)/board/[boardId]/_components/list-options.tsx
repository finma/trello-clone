"use client";

import { toast } from "sonner";
import { List } from "@prisma/client";
import { ElementRef, useRef } from "react";
import { Copy, MoreHorizontal, Plus, Trash2, X } from "lucide-react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
import { copyList } from "@/actions/copy-list";

interface ListOptionsProps {
  list: List;
  onAddCard: () => void;
}
export const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="size-auto p-2">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" side="bottom" className="px-0 py-3">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="size-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="ghost"
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-3 justify-start items-center flex font-normal text-sm"
        >
          <Plus className="size-4 mr-2 text-neutral-600" />
          Add card
        </Button>

        <form action={onCopy}>
          <input hidden id="id" name="id" value={list.id} />
          <input hidden id="boardId" name="boardId" value={list.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-3 justify-start items-center flex font-normal text-sm"
          >
            <Copy className="size-4 mr-2 text-neutral-600" />
            Copy list
          </FormSubmit>
        </form>

        <Separator />

        <form action={onDelete}>
          <input hidden id="id" name="id" value={list.id} />
          <input hidden id="boardId" name="boardId" value={list.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-3 justify-start items-center flex font-normal text-sm text-rose-500 hover:text-rose-600"
          >
            <Trash2 className="size-4 mr-2 " />
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
