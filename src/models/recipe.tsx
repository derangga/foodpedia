import z from "zod";

export const RecipeSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  image: z.string().optional(),
  authorId: z.string().min(1),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  ingredients: z
    .array(z.string())
    .min(1, "At least one ingredient is required"),
  story: z.string().optional(),
  guide: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
