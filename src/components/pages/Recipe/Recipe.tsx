"use client"
import React from 'react';
import { useRecipe } from '@/hooks/useRecipe';
import RecipeHeader from './components/RecipeHeader';
import IngredientsList from './components/IngredientsList';
import Instructions from './components/Instructions';
import BackButton from './components/BackButton';
import Link from 'next/link';
import RecipeSkeleton from './components/RecipeSkeleton';

type Ingredient = {
    id: number;
    qty: number;
    name: string;
    unit: string | null;
};

type Recipe = {
    id: string;
    title: string;
    image_url: string;
    recipe: string;
    ingredients: Ingredient[];
};

const RecipePage: React.FC = () => {
    const { recipe, isLoading } = useRecipe() as { recipe: Recipe | null, isLoading: boolean };

    if (isLoading) {
        return <RecipeSkeleton />;
    }

    if (!recipe) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <h1 className="text-4xl font-bold text-gray-800">Recipe not found</h1>
                <Link href="/" className="mt-4 text-lg text-blue-500 hover:underline">
                    Go back to home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <BackButton />
                    <RecipeHeader imageUrl={recipe.image_url} title={recipe.title} />
                    <div className="grid grid-cols-1 gap-8 mt-8">
                        <IngredientsList ingredients={recipe.ingredients} />
                        <Instructions instructions={recipe.recipe} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipePage;
