import { Item, State } from "@/types/Ingredients";

type Action =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: { id: string }}
  | { type: 'ADD_ITEMS'; payload: Item[] }
  | { type: 'REMOVE_ALL_ITEMS' }
;


const initialState: State = {
  items: [],
};

const itemReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items.filter(item => item.id !== action.payload.id), action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'ADD_ITEMS':
      return {
        ...state,
        items: [...state.items.filter(item => !action.payload.some(item2 => item2.id === item.id)), ...action.payload],
      };
    case 'REMOVE_ALL_ITEMS':
      return {
        ...state,
        items: [],
      };  
    default:
      return state;
  }
};

export { itemReducer, initialState };
export type { Item, State, Action };