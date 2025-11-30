"use client"
import RecipeContext from "@/contexts/RecipeContext";
import { fetchRecipe } from "@/services/api/recipe";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipe, setRecipe] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const query = useParams();
  const recipeId: string = query["recipeId"] as string || "";

  useEffect(() => {
    const getRecipe = async () => {
      setIsLoading(true);
      try {
        const response = await fetchRecipe(recipeId);
        setRecipe(response);
      } catch (error) {
        console.error(error);
        setRecipe(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (recipeId) {
      getRecipe();
    } else {
        setIsLoading(false);
        setRecipe(null);
    }
  }, [recipeId]);

  return (
    <RecipeContext.Provider value={{ recipe, isLoading }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
