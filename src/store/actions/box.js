import axios from "axios";
import { keys } from "../../keys";
import {
  ADD_BOX,
  ADD_BOX_EXSPENSE,
  ADD_BOX_IMAGE,
  DESTROY_BOX_EXSPENSE,
  DESTROY_BOX_IMAGE,
  DESTSROY_BOX,
  EDIT_BOX_EXSPENSES,
  GET_BOX_EXPENSES,
  GET_BOX_IMAGE,
} from "../types";
import Swal from "sweetalert2";

export const getBoxExpenses = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/box`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_BOX_EXPENSES,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const editBoxExpenses = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/edit`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: EDIT_BOX_EXSPENSES,
            payload: response.data.data,
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

export const addBoxExpenses = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_BOX_EXSPENSE,
            payload: response.data.data,
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

export const addBox = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_BOX,
            payload: response.data.data,
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

export const destroyBoxExpenses = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/del`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DESTROY_BOX_EXSPENSE,
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

export const destroyBox = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/destroy`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DESTSROY_BOX,
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

export const getBoxImages = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/box/image`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_BOX_IMAGE,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addBoxImages = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/image`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_BOX_IMAGE,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const destroyBoxImage = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/image-destroy`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DESTROY_BOX_IMAGE,
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
