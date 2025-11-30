import ApiService, {SERVICE_TYPE} from "@/services/http";


export const fetchAllIngredients = async () => {
    try{
        const response = await ApiService.get(SERVICE_TYPE.RECIPE, '/ingredients');
        return response;
    }
    catch(e){
        console.log(e);
        throw new Error('Error fetching ingredients');
    }
} 

export const fetchIngredient = async (id: string) => {
    try{
        const response = await ApiService.get(SERVICE_TYPE.RECIPE, `/ingredients?id=${id}`);
        return response;
    }
    catch(e){
        console.log(e);
        throw new Error('Error fetching ingredient');
    }
}

export const fetchIngredients = async (ids: string[]) => {
    try{
        const response = await ApiService.get(SERVICE_TYPE.RECIPE, `/ingredients?ids=${ids.join(',')}`);
        return response;
    }
    catch(e){
        console.log(e);
        throw new Error('Error fetching ingredients');
    }
}