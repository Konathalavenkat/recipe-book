"use client";
import React from "react";

type Ingredient = {
  id: number;
  qty: number;
  name: string;
  units: string | null;
};

type IngredientsListProps = {
  ingredients: Ingredient[];
};

const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients: ingredients_with_names,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 pb-2 border-b-gray-300">Ingredients</h2>
      <div className="rounded-lg w-full">
        <ul className="space-y-2">
          {ingredients_with_names.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex items-center bg-gray-100 p-2 text-gray-700"
              >
                <span className="font-medium">{ingredient.name}</span>
                <span className="ml-auto">
                  {ingredient.qty} {ingredient.units}
                </span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default IngredientsList;
