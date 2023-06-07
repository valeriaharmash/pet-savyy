import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  AllUsers,
  AuthForm,
  Checkout,
  Completion,
  CreateItem,
  Dashboard,
  Items,
  Payment,
  SingleItem,
  SingleUser,
  UpdateItem
} from './components';
import { getUserByToken } from './store';
import { doesGuestOrderExit, getGuestOrderId, isLoggedIn, setGuestOrderId } from './utils';
import Cart from './components/cart';
import { createOrder, fetchOrder, fetchOrders, setPendingOrder } from './store/slices/orders';

const Router = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { allOrders: orders, selectedOrder } = useSelector((state) => state.orders);

  const [initialLoad, setInitialLoad] = useState(true);

  // fetch user info from user token if exists
  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(getUserByToken());
    } else {
      if (doesGuestOrderExit()) {
        dispatch(fetchOrder(getGuestOrderId()));
      } else {
        dispatch(createOrder({}));
      }
    }
  }, []);

  // fetch pending user orders once logged in
  useEffect(() => {
    if (initialLoad && user) {
      dispatch(fetchOrders({ userId: user.id, status: 'in progress' }));
      setInitialLoad(false);
    }
  }, [user, initialLoad]);

  // find pending user's order and set it to redux state (it's guaranteed that logged in use has exactly one
  // "in progress" order at any time)
  useEffect(() => {
    if (orders) {
      const pendingOrder = orders.reduce((acc, order) => {
        if (order.status === 'in progress') {
          return order;
        }
        return acc;
      }, null);
      if (pendingOrder) {
        dispatch(setPendingOrder(pendingOrder));
      }
    }
  }, [orders]);

  // set guest's pending order on initial load.
  useEffect(() => {
    if (initialLoad && !user && selectedOrder && selectedOrder.status === 'in progress') {
      setGuestOrderId(selectedOrder.id);
      dispatch(setPendingOrder(selectedOrder));
      setInitialLoad(false);
    }
  }, [selectedOrder, initialLoad]);

  if (user && user.role === 'admin') {
    return (
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/items" element={<Items/>}/>
        <Route exact path="/items/add" element={<CreateItem/>}/>
        <Route exact path="/items/:itemId" element={<SingleItem/>}/>
        <Route exact path="/items/:itemId/update" element={<UpdateItem/>}/>
        <Route exact path="/users" element={<AllUsers/>}/>
        <Route exact path="/users/:userId" element={<SingleUser/>}/>
        <Route path="*" element={<Items/>}/>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route exact path="/login" element={<AuthForm mode="login" onSuccess={() => setInitialLoad(true)}/>}/>
        <Route exact path="/signup" element={<AuthForm mode="signup" onSuccess={() => setInitialLoad(true)}/>}/>
        <Route exact path="/items" element={<CreateItem/>}/>
        <Route exact path="/items/:itemId" element={<SingleItem/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/checkout/pay" element={<Payment onSuccess={() => setInitialLoad(true)}/>}/>
        <Route path="/completion" element={<Completion/>}/>
        {user && <Route path="/users/:userId" element={<SingleUser/>}/>}
        <Route path="*" element={<Items/>}/>
      </Routes>
    );
  }
};

export default Router;
