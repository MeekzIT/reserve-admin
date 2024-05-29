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

const initialState = {
	home: null,
	countries: null,
	box: [],
	owner: [],
	user: [],
	boxCurrent: null,
	ownerCurrent: null,
	userCurrent: null,
}

export const statisticsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_HOME_STATISTICS:
			return { ...state, home: action.payload }
		case GET_COUNTRIES:
			return { ...state, countries: action.payload }
		case DEL_COUNTRY:
			return {
				...state,
				countries: state.countries.filter(i => i.id !== action.payload),
			}
		case EDIT_COUNTRY:
			const { id, name, short } = action.payload
			const updatedItems = state.countries.map(item =>
				item.id === id ? { ...item, name, short } : item
			)
			return { ...state, countries: updatedItems }
		case ADD_COUNTRY:
			return { ...state, countries: [...state.countries, action.payload] }
		case GET_BOX_STATISTIC:
			return { ...state, box: action.payload }
		case GET_OWNER_STATISTIC:
			return { ...state, owner: action.payload }
		case GET_USER_STATISTIC:
			return { ...state, user: action.payload }
		case GET_BOX_CURRENT:
			return {
				...state,
				boxCurrent: action.payload,
			}
		case GET_OWNER_CURRENT:
			return {
				...state,
				ownerCurrent: action.payload,
			}
		case GET_USER_CURRENT:
			return {
				...state,
				userCurrent: action.payload,
			}
		default:
			return state
	}
}
