import axios from "axios";
import {
  ADD_ITEM_CATEGORY,
  DEL_CATEGORIES,
  DEL_ITEM_CATEGORY,
  GET_CATEGORIES,
  GET_ITEM_CATEGORY,
} from "../types";
import { keys } from "../../keys";
import { EDIR_CATEGORIES } from "../types";
import { ADD_CATEGORIES } from "../types";
import Swal from "sweetalert2";

export const getCategories = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/category`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_CATEGORIES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const delCategories = (id) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/category/del`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DEL_CATEGORIES,
            payload: id,
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const editCategories = (id, nameHy) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/category/edit`,
        { id, name: nameHy },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: EDIR_CATEGORIES,
            payload: { id, name: nameHy },
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addCategories = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/category/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_CATEGORIES,
            payload: { ...data, id: 99 },
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemCategories = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/item/mode`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_ITEM_CATEGORY,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addItemCategories = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/item/add-mode`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_ITEM_CATEGORY,
            payload: response.data,
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const delItemCategories = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/item/destroy-mode`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DEL_ITEM_CATEGORY,
            payload: data.id,
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const editItemCategories = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/item/edit-mode`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
