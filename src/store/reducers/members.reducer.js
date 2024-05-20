import { BLOCK_MEMBERS, DEL_MEMBERS, GET_MEMBERS } from "../types"

const initialState = {
	members: null,
	count: null,
}

export const membersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MEMBERS:
			return {
				...state,
				members: action.payload.paginateData,
				count: action.payload.count,
			}
		case DEL_MEMBERS:
			let mutable = state.members?.filter(i => i.id !== action.payload)
			return { ...state, members: mutable }
		case BLOCK_MEMBERS:
			let edited = state.members?.filter(i =>
				i.id === action.payload.id
					? { ...i, activity: action.payload.activity }
					: i
			)
			return { ...state, members: edited }
		default:
			return state
	}
}
