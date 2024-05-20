import HomePage from "../Pages/home/Home";
import {
  ADMINS_PAGE,
  ADMIN_USERS,
  BOXES_PAGE,
  CATEGORIES_PAGE,
  COUNTRIES_PAGE,
  HOME_PAGE,
  ITEM_PAGE,
  ITEM_SINGLE_PAGE,
  LOGIN_PAGE,
  MEMBERS_PAGE,
  OWNERS_BOXES,
  OWNER_ITEMS_PAGE,
  SETTIGS_PAGE,
  SUPORT_PAGE,
  TYPES_PAGE,
  USERS_PAGE,
  USER_DETAIL,
} from "./pats";
import LoginPage from "../Pages/login/Login";
import UserPage from "../Pages/users/User";
import Items from "../Pages/items/Items";
import UserDetail from "../Pages/userDetail/UserDetail";
import Countries from "../Pages/countries/Countries";
import Settings from "../Pages/settings/Settings";
import Boxes from "../Pages/Boxes/Boxes";
import OwnerBoxes from "../Pages/ownerBoxes/OwnerBoxes";
import OwnerItems from "../Pages/ownerBoxes/OwnerItems";
import Admins from "../Pages/admins/Admins";
import AdminUser from "../Pages/admins/AdminUsers";
import Categories from "../Pages/categories/Categories";
import Single from "../Pages/items/Single";
import TypesPage from "../Pages/typesPage/TypesPage";
import Suport from "../Pages/suport/Suport";
import Members from "../Pages/members/Members";

export const isAuthPages = [
	{ id: 1, path: HOME_PAGE, Component: <HomePage /> },
	{ id: 2, path: USERS_PAGE, Component: <UserPage /> },
	{ id: 3, path: ITEM_PAGE, Component: <Items /> },
	{ id: 4, path: CATEGORIES_PAGE, Component: <Categories /> },
	{ id: 5, path: TYPES_PAGE, Component: <TypesPage /> },
	{ id: 6, path: USER_DETAIL, Component: <UserDetail /> },
	{ id: 7, path: COUNTRIES_PAGE, Component: <Countries /> },
	{ id: 8, path: ITEM_SINGLE_PAGE, Component: <Single /> },
	{ id: 9, path: SETTIGS_PAGE, Component: <Settings /> },
	{ id: 10, path: OWNERS_BOXES, Component: <Boxes /> },
	{ id: 11, path: BOXES_PAGE, Component: <OwnerBoxes /> },
	{ id: 12, path: OWNER_ITEMS_PAGE, Component: <OwnerItems /> },
	{ id: 13, path: ADMINS_PAGE, Component: <Admins /> },
	{ id: 14, path: ADMIN_USERS, Component: <AdminUser /> },
	{ id: 15, path: SUPORT_PAGE, Component: <Suport /> },
	{ id: 16, path: MEMBERS_PAGE, Component: <Members /> },
]

export const notAuthPages = [{ id: 2, path: LOGIN_PAGE, Component: LoginPage }];
