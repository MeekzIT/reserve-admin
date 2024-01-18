import axios from "axios";
import {
  ADD_ITEM_TYPE,
  ADD_TYPE,
  DEL_CATEGORIES,
  DEL_ITEM_TYPE,
  DEL_TYPE,
  EDIT_TYPE,
  GET_CATEGORIES,
  GET_ITEM_TYPE,
  GET_TYPE,
} from "../types";
import { keys } from "../../keys";
import { EDIR_CATEGORIES } from "../types";
import { ADD_CATEGORIES } from "../types";
import Swal from "sweetalert2";

export const getType = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/type`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_TYPE,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const delType = (id) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/type/del`,
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
            type: DEL_TYPE,
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

export const editType = (id, nameAm, nameRu, nameEn, nameGe, nameAz) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/type/edit`,
        { id, nameAm, nameRu, nameEn, nameGe, nameAz },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: EDIT_TYPE,
            payload: { id, nameAm, nameRu, nameEn, nameGe, nameAz },
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

export const addType = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/type/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_TYPE,
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

export const getItemType = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/item/type`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_ITEM_TYPE,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addItemType = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/item/add-type`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_ITEM_TYPE,
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

export const delItemType = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/item/destroy-type`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DEL_ITEM_TYPE,
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

export const editItemType = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/item/edit-type`, data, {
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
