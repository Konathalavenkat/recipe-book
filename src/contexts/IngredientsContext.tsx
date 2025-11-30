"use client"
import { Item } from "@/types/Ingredients";
import { createContext } from "react";

export interface IngredientsContextType {
  state: {
    items: Item[];
  };
  addIngredient: (ingredient: Item) => void;
  removeIngredient: (id: string) => void;
  addIngredients: (ingredients: Item[]) => void;
  removeAllIngredients: () => void;
}

export interface IngredientsState {
  items: Item[];
}


// Provide a default value that matches the context type
const IngredientContext = createContext<IngredientsContextType | null>(
  null
);

export default IngredientContext;