import axios from "axios"
import Swal from "sweetalert2"
import { keys } from "../../keys"
import { BLOCK_MEMBERS, DEL_MEMBERS, GET_MEMBERS } from "../types"

export const getMembers = data => {
	return dispatch => {
		axios
			.get(`${keys.api}/users/`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
				params: data,
			})
			.then(response => {
				dispatch({
					type: GET_MEMBERS,
					payload: response.data,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const destroyMember = data => {
	return dispatch => {
		axios
			.post(`${keys.api}/users/destroy`, data, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(response => {
				if (response.data.succes) {
					dispatch({
						type: DEL_MEMBERS,
						payload: data.id,
					})
				}
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const activityMember = data => {
	return dispatch => {
		axios
			.post(`${keys.api}/users/activity`, data, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(response => {
				if (response.data.succes) {
					dispatch({
						type: BLOCK_MEMBERS,
						payload: data,
					})
				}
			})
			.catch(error => {
				console.error(error)
			})
	}
}
