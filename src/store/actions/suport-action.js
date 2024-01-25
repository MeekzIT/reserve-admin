import axios from "axios";
import { keys } from "../../keys";
import { ACTIVE_SUPORT, DELETE_SUPORT, SUPORT_HISTORY } from "../types";
import Swal from "sweetalert2";

export const getActiveSuports = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/suport/active-questions`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: ACTIVE_SUPORT,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getSuportsHistory = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/suport/archive-questions`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: SUPORT_HISTORY,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const sendAnswer = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/suport/answer`, data, {
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

export const delQuestion = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/suport/destroy`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DELETE_SUPORT,
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
