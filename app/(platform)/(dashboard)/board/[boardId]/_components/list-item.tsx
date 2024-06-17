"use client";

import { ElementRef, useRef, useState } from "react";

import { ListWithCards } from "@/types";
import { cn } from "@/lib/utils";

import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { ListHeader } from "./list-header";

interface ListItemProps {
  list: ListWithCards;
  index: number;
}

export const ListItem = ({ list, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none ">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md p-2 ">
        <ListHeader onAddCard={enableEditing} list={list} />

        <ol className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2")}>
          {list.cards.map((card, index) => (
            <CardItem key={card.id} index={index} card={card} />
          ))}
        </ol>

        <CardForm
          listId={list.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};
