import React from "react";
import IngredientContext, { IngredientsContextType } from "@/contexts/IngredientsContext";

export const useIngredients = () => {
    return React.useContext(IngredientContext);
}