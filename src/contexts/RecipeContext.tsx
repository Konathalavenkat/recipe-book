"use client"
import { createContext } from "react";
import { Recipe } from "@/types";

export interface RecipeContextType {
    recipe: Recipe | null;
    isLoading: boolean;
}

export default createContext<RecipeContextType | null>(null);