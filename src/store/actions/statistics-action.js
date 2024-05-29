import axios from "axios"
import {
	ADD_COUNTRY,
	DEL_COUNTRY,
	EDIT_COUNTRY,
	GET_BOX_CURRENT,
	GET_BOX_STATISTIC,
	GET_COUNTRIES,
	GET_HOME_STATISTICS,
	GET_OWNER_CURRENT,
	GET_OWNER_STATISTIC,
	GET_USER_CURRENT,
	GET_USER_STATISTIC,
} from "../types"
import { keys } from "../../keys"
import Swal from "sweetalert2"

export const getCountries = () => {
	return dispatch => {
		axios
			.get(`${keys.api}/country`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(response => {
				dispatch({
					type: GET_COUNTRIES,
					payload: response.data,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const delCountries = id => {
	return dispatch => {
		axios
			.post(
				`${keys.api}/country/del`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${keys.token}`,
					},
				}
			)
			.then(response => {
				if (response.data.succes) {
					dispatch({
						type: DEL_COUNTRY,
						payload: id,
					})
					Swal.fire({
						position: "center",
						iconColor: "#008491",
						icon: "success",
						showConfirmButton: false,
						timer: 1500,
					})
				}
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const editCountries = (id, name, short) => {
	return dispatch => {
		axios
			.post(
				`${keys.api}/country/edit`,
				{ id, name, short },
				{
					headers: {
						Authorization: `Bearer ${keys.token}`,
					},
				}
			)
			.then(response => {
				if (response.data.succes) {
					dispatch({
						type: EDIT_COUNTRY,
						payload: { id, name, short },
					})
					Swal.fire({
						position: "center",
						iconColor: "#008491",
						icon: "success",
						showConfirmButton: false,
						timer: 1500,
					})
				}
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const addCountries = data => {
	return dispatch => {
		axios
			.post(`${keys.api}/country/create`, data, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(response => {
				if (response.data.succes) {
					dispatch({
						type: ADD_COUNTRY,
						payload: { ...data, id: 99 },
					})
					Swal.fire({
						position: "center",
						iconColor: "#008491",
						icon: "success",
						showConfirmButton: false,
						timer: 1500,
					})
				}
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const getBoxStatistics = data => {
	return dispatch => {
		axios
			.get(`${keys.api}/statistics/box`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
				params: data,
			})
			.then(response => {
				dispatch({
					type: GET_BOX_STATISTIC,
					payload: response.data.data,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const getOwnerStatistics = data => {
	return dispatch => {
		axios
			.get(`${keys.api}/statistics/owner`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
				params: data,
			})
			.then(response => {
				dispatch({
					type: GET_OWNER_STATISTIC,
					payload: response.data.data,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const getUserStatistics = data => {
	return dispatch => {
		axios
			.get(`${keys.api}/statistics/user`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
				params: data,
			})
			.then(response => {
				dispatch({
					type: GET_USER_STATISTIC,
					payload: response.data.data,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

//------

export const getBoxCurrent = data => {
	return dispatch => {
		axios
			.get(`${keys.api}/statistics/box-current`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
				params: data,
			})
			.then(response => {
				dispatch({
					type: GET_BOX_CURRENT,
					payload: response.data.data,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const getOwnerCurrent = data => {
	return dispatch => {
		axios
			.get(`${keys.api}/statistics/owner-current`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
				params: data,
			})
			.then(response => {
				dispatch({
					type: GET_OWNER_CURRENT,
					payload: response.data.data,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const getUserCurrent = data => {
	return dispatch => {
		axios
			.get(`${keys.api}/statistics/user-current`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
				params: data,
			})
			.then(response => {
				dispatch({
					type: GET_USER_CURRENT,
					payload: response.data.data,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}
}
