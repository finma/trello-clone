"use client";

import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Copy, Trash2 } from "lucide-react";

import { CardWithList } from "@/types";
import { copyCard } from "@/actions/copy-card";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/actions/delete-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionProps {
  card: CardWithList;
}

export const Action = ({ card }: ActionProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: card.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: card.id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Action</p>
      <Button
        size="inline"
        variant="gray"
        onClick={onCopy}
        disabled={isLoadingCopy}
        className="w-full justify-start"
      >
        <Copy className="size-4 mr-2" />
        Copy
      </Button>
      <Button
        size="inline"
        variant="gray"
        onClick={onDelete}
        disabled={isLoadingDelete}
        className="w-full justify-start"
      >
        <Trash2 className="size-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Action.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
