import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  AuthForm,
  Home,
  Items,
  SingleItem,
  UpdateItem,
  Main,
} from './components';
import { getUserByToken } from './store';
import { isLoggedIn } from './utils';
import Cart from './features/cart';

const Router = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(getUserByToken());
    }
  }, []);

  return (
    <div>
      {user ? (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route exact path="/items/:itemId" element={<SingleItem />} />
          <Route exact path="/items/:itemId/update" element={<UpdateItem />} />
          <Route path="/user/:userId/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/login" element={<AuthForm mode="login" />} />
          <Route exact path="/signup" element={<AuthForm mode="signup" />} />
          <Route path="/user/:userId/cart" element={<Cart />} />
          <Route path="*" element={<Main />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      )}
    </div>
  );
};

export default Router;
