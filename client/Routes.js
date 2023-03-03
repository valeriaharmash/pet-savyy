import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AuthForm, Home, SingleItem, UpdateItem, Main } from "./components";
import { getUserByToken } from "./store";
import { isLoggedIn } from "./utils";
import {Cart, Checkout} from "./features";

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
				<Route path="*" element={<Main />} />
			</Routes>
		);
	} else {
		return (
			<Routes>
				<Route exact path="/login" element={<AuthForm mode="login" />} />
				<Route exact path="/signup" element={<AuthForm mode="signup" />} />
				<Route path="/home" element={<Home />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route exact path="/items/:itemId" element={<SingleItem />} />
				<Route path="/user/:userId/cart" element={<Cart />} />
				<Route path="*" element={<Main />} />
			</Routes>
		);
	}
};

export default Router;
