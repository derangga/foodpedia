export type Recipe = {
  id: number;
  categories: string[];
  title: string;
  image: string | null;
  userId: number;
  ingredients: string[];
  story: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};
