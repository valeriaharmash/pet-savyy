import React from 'react';
import Items from '../features/Items';
import { useSelector } from 'react-redux';

export const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className='banner'>
        <h2>
          {user ? `Welcome back, ${user.firstName}!` : 'Browse all products'}
        </h2>
      </div>
      <Items />
    </div>
  );
};

export default Home;
