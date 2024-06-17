"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [orderedLists, setOrderedLists] = useState(lists);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: (data) => {
      toast.success("Lists reordered.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: (data) => {
      toast.success("Cards reordered.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    //* if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    //* if user moves a list
    if (type === "list") {
      const items = reorder(orderedLists, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedLists(items);
      executeUpdateListOrder({ boardId, items });
    }

    //* if user moves a card
    if (type === "card") {
      const newOrderedLists = [...orderedLists];

      // source & destination list
      const sourceList = newOrderedLists.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedLists.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      // check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // check if cards exists on the destinationList
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // moving a card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderCards;

        setOrderedLists(newOrderedLists);
        executeUpdateCardOrder({ boardId, items: reorderCards });

        //* user moves the card to another list
      } else {
        // remove card from the sourceList
        const [removedCard] = sourceList.cards.splice(source.index, 1);

        // assign the new listId to the moved card
        removedCard.listId = destination.droppableId;

        // add card to the destinationList
        destinationList.cards.splice(destination.index, 0, removedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // update the order for each card in the destinationList
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedLists(newOrderedLists);
        executeUpdateCardOrder({ boardId, items: destinationList.cards });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedLists.map((list, index) => (
              <ListItem key={list.id} list={list} index={index} />
            ))}

            {provided.placeholder}

            <ListForm />

            <div className="flex shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
