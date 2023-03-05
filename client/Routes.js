import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  AllUsers,
  AuthForm,
  CreateItem,
  Home,
  Main,
  SingleItem,
  UpdateItem,
  Dashboard,
  SingleUser,
  LimitedItems,
} from './components';
import { Items } from './features';
import { getUserByToken } from './store';
import { isLoggedIn } from './utils';
import Cart from './features/cart';
import { Checkout } from './features';

const Router = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(getUserByToken());
    }
  }, []);

  if (user && user.role === 'admin') {
    return (
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/items' element={<Items />} />
        <Route exact path='/items/add' element={<CreateItem />} />
        <Route exact path='/items/:itemId' element={<SingleItem />} />
        <Route exact path='/items/:itemId/update' element={<UpdateItem />} />
        <Route path='/items/selection' element={<LimitedItems />} />
        <Route exact path='/users' element={<AllUsers />} />
        <Route exact path='/users/:userId' element={<SingleUser />} />
        <Route path='*' element={<Main />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route exact path='/login' element={<AuthForm mode='login' />} />
        <Route exact path='/signup' element={<AuthForm mode='signup' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route exact path='/items' element={<CreateItem />} />
        <Route exact path='/items/:itemId' element={<SingleItem />} />
        <Route path='/items/selection' element={<LimitedItems />} />
        <Route path='/user/:userId/cart' element={<Cart />} />
        <Route path='/user/guest/cart' element={<Cart />} />
        {user && <Route path='/users/:userId' element={<SingleUser />} />}
        <Route path='*' element={<Main />} />
      </Routes>
    );
  }
};

export default Router;
