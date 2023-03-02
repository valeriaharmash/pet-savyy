import React from 'react';
import { connect, useSelector } from 'react-redux';
import Items from './Items';

/**
 * COMPONENT
 */
export const Home = () => {
  const firstName = useSelector((state) => state.auth.user.firstName);
  return (
    <div>
      <h3>Welcome back, {firstName}!</h3>
      <Items />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.user.firstName,
  };
};

export default connect(mapState)(Home);
