import {
  ADD_OWNER,
  ADD_USER,
  EDIT_BOX,
  EDIT_ITEM,
  GET_BOXES,
  GET_SINGLE_BOX,
  GET_SINGLE_OWNER,
  GET_SINGLE_USER,
  GET_USERS,
  DELETE_OWNER,
  GET_SINGLE_ITEM,
  ADD_BOX,
  DESTSROY_BOX,
  GET_WORKERS,
  ADD_WORKER,
  DLE_WORKER,
} from "../types";

const initialState = {
  users: null,
  count: null,
  single: null,
  boxes: null,
  items: null,
  owner: null,
  box: null,
  workers: null,
  itemInfo: null,
  singleItem: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.paginateData,
        count: action.payload.count,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        count: Number(state.count) + 1,
      };
    case GET_SINGLE_USER:
      return {
        ...state,
        single: action.payload,
      };
    case GET_BOXES:
      return {
        ...state,
        boxes: action.payload.paginateData,
        items: action.payload.items,
      };
    case EDIT_BOX:
      const { id, name, desc, lat, lng } = action.payload;
      const updatedItems = state.boxes.map((item) =>
        item.id === id ? { ...item, name, desc, lat, lng } : item
      );
      return { ...state, boxes: updatedItems };
    case ADD_BOX:
      return {
        ...state,
        boxes: [...state.boxes, action.payload],
      };
    case DESTSROY_BOX:
      const editedNoxData = state.boxes.filter((i) => i.id !== action.payload);
      return {
        ...state,
        boxes: editedNoxData,
      };
    case GET_SINGLE_OWNER:
      let singleOwner = state.single?.Owners?.filter(
        (i) => i.id == action.payload
      );
      return {
        ...state,
        owner: singleOwner[0],
      };
    case GET_SINGLE_BOX:
      let singleBox = state.boxes?.filter((i) => i.id == action.payload);
      return {
        ...state,
        box: singleBox[0],
      };
    case ADD_OWNER:
      return {
        ...state,
        single: {
          ...state.single,
          Owners: [...state.single.Owners, action.payload],
        },
      };
    case DELETE_OWNER:
      const editedData = state.single.Owners.filter(
        (i) => i.id !== action.payload
      );
      return {
        ...state,
        single: {
          ...state.single,
          Owners: editedData,
        },
      };
    case GET_SINGLE_ITEM:
      return { ...state, singleItem: action.payload };
    case GET_WORKERS:
      return { ...state, workers: action.payload };
    case ADD_WORKER:
      return { ...state, workers: [...state.workers, action.payload] };
    case DLE_WORKER:
      const editedWorklers = state.workers.filter(
        (i) => i.id !== action.payload
      );
      return {
        ...state,
        workers: editedWorklers,
      };
    default:
      return state;
  }
};
