import React from 'react';
import Navbar from './components/Navbar';
import Router from './Routes';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SingleItem from './components/SingleItem';

const App = () => {
  return (
    <div>
      <Navbar />
      <Router />
    </div>
  );
};

export default App;
