import axios from "axios";
import { keys } from "../../keys";
import {
  ADD_OWNER,
  ADD_USER,
  ADD_WORKER,
  DELETE_OWNER,
  EDIT_BOX,
  GET_BOXES,
  GET_ITEM_CURRENT,
  GET_SINGLE_BOX,
  GET_SINGLE_ITEM,
  GET_SINGLE_OWNER,
  GET_SINGLE_USER,
  GET_USERS,
  GET_WORKERS,
} from "../types";
import Swal from "sweetalert2";

export const getUsers = (page, adminId) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/tech/`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          offset: page,
          adminId,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addUsers = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/tech/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_USER,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getSingleUser = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/tech/single`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_SINGLE_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getBoxes = (id, boxId) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/box`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          ownerId: id,
          boxId,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_BOXES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const changeCredentials = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/admin/changeSettings`, data, {
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

export const changePassword = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/admin/changePassword`, data, {
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

export const changeBoxSettings = (data) => {
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
            type: EDIT_BOX,
            payload: data,
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

export const getSingleOwners = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_SINGLE_OWNER,
      payload: id,
    });
  };
};

export const getSingleBox = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_SINGLE_BOX,
      payload: id,
    });
  };
};

export const addOwner = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/owner/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_OWNER,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const deleteOwner = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/owner/delete-owner`,
        {
          id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DELETE_OWNER,
            payload: data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemSingle = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-single`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_SINGLE_ITEM,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemCurrent = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-calc-current`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_ITEM_CURRENT,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const changeName = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/item/edit`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getBoxWorkers = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/worker`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_WORKERS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addWorker = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/worker`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_WORKER,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const resetWorkerPassword = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/worker/reset`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_WORKER,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
