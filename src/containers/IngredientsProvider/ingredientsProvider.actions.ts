import { Dispatch } from "react";
import { Item } from "@/types/Ingredients";

export const addIngredient = (dispatch: Dispatch<any>, Item: Item) => {
    dispatch({ type: 'ADD_ITEM', payload: Item })
}

export const removeIngredient = (dispatch: Dispatch<any>, id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
}

export const addIngredients = (dispatch: Dispatch<any>, Items: Item[]) => {
    dispatch({ type: 'ADD_ITEMS', payload: Items });
}

export const removeAllIngredients = (dispatch: Dispatch<any>) => {
    dispatch({ type: 'REMOVE_ALL_ITEMS' });
}
