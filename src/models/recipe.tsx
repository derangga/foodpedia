interface Recipe {
  id: number;
  title: string;
  image?: string;
  authorId: string;
  categories: string[];
  ingredients: string[];
  story?: string;
  guide: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export default Recipe;
