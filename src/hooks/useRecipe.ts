"use client"
import RecipeContext from "@/contexts/RecipeContext";
import { useContext } from "react"

export const useRecipe = () => {
    return useContext(RecipeContext);
}