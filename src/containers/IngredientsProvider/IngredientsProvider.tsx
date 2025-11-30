"use client"
import React, { useEffect, useMemo, useReducer } from "react";
import IngredientContext, { IngredientsContextType } from "@/contexts/IngredientsContext";
import { itemReducer, initialState } from "./IngredientsProvider.reducer";
import { Item } from "@/types/Ingredients";
import { addIngredient, removeIngredient, addIngredients, removeAllIngredients } from "./ingredientsProvider.actions";

interface IngredientsProviderProps {
  children: React.ReactNode;
}

const IngredientsProvider = ({ children }: IngredientsProviderProps) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);

  const value = useMemo(
    (): IngredientsContextType => ({
      state,
      addIngredient: (ingredient: Item) => addIngredient(dispatch, ingredient),
      removeIngredient: (id: number) => removeIngredient(dispatch, id),
      addIngredients: (ingredients: Item[]) => addIngredients(dispatch, ingredients),
      removeAllIngredients: () => removeAllIngredients(dispatch)
    }),
    [state]
  );

  return (
    <IngredientContext.Provider value={value}>
      {children}
    </IngredientContext.Provider>
  );
};

export default IngredientsProvider;
