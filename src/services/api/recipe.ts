import ApiService, { SERVICE_TYPE } from '@/services/http'
import { Item } from '@/types/Ingredients';
export const fetchRecipeWithIngredients = async (ingredients: Item[]) => {
    try{
        console.log(ingredients, 'ingredients')
        const response = await ApiService.get(
            SERVICE_TYPE.RECIPE,
            '/recipes',
            {
                params: {
                    ingredient_ids: ingredients.map(item => (item.id)).join(',')
                }
            }
        );
        return response;
    }
    catch(e){
        console.log(e);
        throw new Error('Error fetching recipe');
    }
}

export const fetchRecipe = async (id: string) => {
    try{
        const response = await ApiService.get(
            SERVICE_TYPE.RECIPE,
            `/recipes?id=${id}`
        );
        return response;    
    }
    catch(e){
        console.log(e);
        throw new Error('Error fetching recipe');
    }
}