import { z } from "zod";

export const CreateCard = z.object({
  boardId: z.string(),
  listId: z.string(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short",
    }),
});
