// src/types/index.ts
export type Ingredient = {
  id: number;
  name: string;
  created_at?: string;
};

export type RecipeIngredient = {
  id: number;
  qty?: number;
  unit?: string;
  name?: string;
};

export type Recipe = {
  id?: string;
  title: string;
  ingredients: RecipeIngredient[]; // denormalized objects
  image_url?: string | null;
  created_by?: string | null;
  created_at?: string;
  recipe?: string;
};
