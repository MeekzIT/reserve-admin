import {
  ADD_CATEGORIES,
  ADD_ITEM_CATEGORY,
  ADD_ITEM_TYPE,
  ADD_TYPE,
  DEL_CATEGORIES,
  DEL_ITEM_CATEGORY,
  DEL_ITEM_TYPE,
  DEL_TYPE,
  EDIR_CATEGORIES,
  EDIT_TYPE,
  GET_CATEGORIES,
  GET_ITEM_CATEGORY,
  GET_ITEM_TYPE,
  GET_TYPE,
} from "../types";

const initialState = {
  categories: null,
  type: null,
  itemCategories: null,
  newCategories: null,
  itemTypes: null,
  newTypes: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    //categories
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case DEL_CATEGORIES:
      return {
        ...state,
        categories: state.categories.filter((i) => i.id !== action.payload),
      };
    case EDIR_CATEGORIES:
      const { id, nameAm, nameRu, nameEn, nameGe, nameAz } = action.payload;
      const updatedItems = state.categories.map((item) =>
        item.id === id
          ? { ...item, nameAm, nameRu, nameEn, nameGe, nameAz }
          : item
      );
      return { ...state, categories: updatedItems };
    case ADD_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };
    ///types
    case GET_TYPE:
      return { ...state, type: action.payload };
    case DEL_TYPE:
      return {
        ...state,
        type: state.type.filter((i) => i.id !== action.payload),
      };
    case EDIT_TYPE:
      const updatedTypeItems = state.type.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return { ...state, type: updatedTypeItems };
    case ADD_TYPE:
      return { ...state, type: [...state.type, action.payload] };
    // item modes
    case GET_ITEM_CATEGORY:
      return {
        ...state,
        itemCategories: action.payload.data,
        newCategories: action.payload.newCategories,
      };
    case DEL_ITEM_CATEGORY:
      const updatedItemCategory = state.itemCategories.map((item) =>
        item.id === action.payload ? null : item
      );
      return {
        ...state,
        itemCategories: updatedItemCategory,
      };
    case ADD_ITEM_CATEGORY:
      return {
        ...state,
        itemCategories: action.payload.data,
        newCategories: action.payload.newCategories,
      };
    // intem types

    case GET_ITEM_TYPE:
      return {
        ...state,
        itemTypes: action.payload.data,
        newTypes: action.payload.newCategories,
      };
    case DEL_ITEM_TYPE:
      // const updatedItemType = state.itemTypes.map((item) =>
      //   item.id === action.payload ? null : item
      // );
      return {
        ...state,
        itemTypes: action.payload.data,
        newTypes: action.payload.newCategories,
      };
    case ADD_ITEM_TYPE:
      return {
        ...state,
        itemTypes: action.payload.data,
        newTypes: action.payload.newCategories,
      };
    default:
      return state;
  }
};
