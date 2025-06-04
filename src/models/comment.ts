import z from "zod";

export const CommentSchema = z.object({
  recipeId: z.number().gte(0),
  comment: z.string().min(1),
});
