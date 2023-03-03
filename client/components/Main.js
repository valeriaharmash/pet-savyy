import React from 'react';
import Items from './Items';
import { AuthForm } from './AuthForm';

const Main = () => {
  return (
    <div className="main">
      <div className="item-list">
        <Items />
      </div>
      <div className="login-form">
        <AuthForm mode="login" />
      </div>
    </div>
  );
};

export default Main;
