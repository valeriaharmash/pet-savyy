import React from 'react';
import LimitedItems from './LimitedItems';
import { Link } from 'react-router-dom';
import { avocadoPic, saleBanner } from './Images';

const Main = () => {
  return (
    <div className='main'>
      <div className='item-list'>
        <Link to='/signup'>
          {' '}
          <img src={saleBanner}></img>
        </Link>
        <LimitedItems maxItems={12} />
      </div>
      <div className='welcome-page'>
        <div className='welcome'>
          <p>
            {' '}
            <img className='welcome-image' src={avocadoPic} />
          </p>
          <p>
            Hi, I'm Palta! Welcome to Grace Shopper Pet Store, a one-stop shop
            for all your pet's needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
