import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
	AuthForm,
	Home,
	SingleItem,
	UpdateItem,
	Main,
	CreateItem,
} from "./components";
import { getUserByToken } from "./store";
import { isLoggedIn } from "./utils";
import Cart from "./features/cart";

const Router = ({}) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (isLoggedIn()) {
			dispatch(getUserByToken());
		}
	}, []);

	if (user && user.role === "admin") {
		return (
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route exact path="/items/:itemId" element={<SingleItem />} />
				<Route exact path="/items/:itemId/update" element={<UpdateItem />} />
				<Route exact path="/items/create" element={<CreateItem />} />
				<Route path="*" element={<Main />} />
			</Routes>
		);
	} else {
		return (
			<Routes>
				<Route exact path="/login" element={<AuthForm mode="login" />} />
				<Route exact path="/signup" element={<AuthForm mode="signup" />} />
				<Route path="/home" element={<Home />} />
				<Route exact path="/items/:itemId" element={<SingleItem />} />
				<Route path="/user/:userId/cart" element={<Cart />} />
				<Route path="*" element={<Main />} />
			</Routes>
		);
	}
};

export default Router;
