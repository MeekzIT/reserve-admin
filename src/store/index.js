import { applyMiddleware, createStore } from "redux"
import { combineReducers } from "redux"
import thunk from "redux-thunk"
import { isAuthReducer } from "./reducers/auth-reducer"
import { languageReducer } from "./reducers/language-reducer"
import { statisticsReducer } from "./reducers/statistics-reducer"
import { userReducer } from "./reducers/user-reducer"
import { categoryReducer } from "./reducers/category-reducer"
import { adminReducer } from "./reducers/admin-reducer"
import { suportReducer } from "./reducers/suport-reducer"
import { membersReducer } from "./reducers/members.reducer"

const rootReducer = combineReducers({
	auth: isAuthReducer,
	lang: languageReducer,
	statistics: statisticsReducer,
	user: userReducer,
	category: categoryReducer,
	admins: adminReducer,
	suport: suportReducer,
	members: membersReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
