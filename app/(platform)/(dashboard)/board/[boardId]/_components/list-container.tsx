"use client";

import { useEffect, useState } from "react";

import { ListWithCards } from "@/types";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [orderedLists, setOrderedLists] = useState(lists);

  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedLists.map((list, index) => (
        <ListItem key={list.id} list={list} index={index} />
      ))}
      <ListForm />
      <div className="flex shrink-0 w-1" />
    </ol>
  );
};
