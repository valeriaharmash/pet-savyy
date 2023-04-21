import React from 'react';
import { useSelector } from 'react-redux';
import UserCart from './UserCart';
import GuestCart from './GuestCart';

const Cart = () => {
  const user = useSelector((state) => state.auth.user);

  return <>{user ? <UserCart /> : <GuestCart />}</>;
};

export default Cart;
