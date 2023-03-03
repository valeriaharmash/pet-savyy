import React from 'react';
import Items from '../features/Items';
import { AuthForm } from './AuthForm';

const Main = () => {
  return (
    <div className="main">
      <div className="item-list">
        <div className="banner">
          <h2>Your pet deserves the best, and so do you.</h2>
        </div>
        <Items />
      </div>
      <div className="login-form">
        <AuthForm mode="login" />
      </div>
    </div>
  );
};

export default Main;
