import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AuthForm, Home, Items } from './components';
import Cart from './features/cart';
import { getUserByToken } from './store';
import { getUserToken, isLoggedIn } from './utils';
import SingleItem from './components/SingleItem';

const Router = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(getUserByToken(getUserToken()));
    }
  }, []);

  return (
    <div>
      {user ? (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route exact path="/items/:itemId" element={<SingleItem />} />
          <Route path="/items" element={<Items />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/login" element={<AuthForm mode="login" />} />
          <Route exact path="/signup" element={<AuthForm mode="signup" />} />
          <Route path="*" element={<AuthForm mode="login" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      )}
    </div>
  );
};

export default Router;
