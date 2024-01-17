import {
  ADD_CATEGORIES,
  ADD_ITEM_CATEGORY,
  DEL_CATEGORIES,
  DEL_ITEM_CATEGORY,
  EDIR_CATEGORIES,
  GET_CATEGORIES,
  GET_ITEM_CATEGORY,
} from "../types";

const initialState = {
  categories: null,
  itemCategories: null,
  newCategories: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case DEL_CATEGORIES:
      return {
        ...state,
        categories: state.categories.filter((i) => i.id !== action.payload),
      };
    case EDIR_CATEGORIES:
      const { id, name } = action.payload;
      const updatedItems = state.categories.map((item) =>
        item.id === id ? { ...item, name } : item
      );
      return { ...state, categories: updatedItems };
    case ADD_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };
    case GET_ITEM_CATEGORY:
      return {
        ...state,
        itemCategories: action.payload.data,
        newCategories: action.payload.newCategories,
      };
    case DEL_ITEM_CATEGORY:
      const updatedItemCategory = state.itemCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        itemCategories: action.payload.data,
        newCategories: action.payload.newCategories,
      };
    case ADD_ITEM_CATEGORY:
      return {
        ...state,
        // itemCategories: [...state.itemCategories, action.payload.mode],
        itemCategories: action.payload.data,
        newCategories: action.payload.newCategories,
      };

    default:
      return state;
  }
};
