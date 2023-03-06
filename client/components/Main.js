import React from 'react';
import LimitedItems from './LimitedItems';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className='main'>
      <div className='item-list'>
        <Link to='/signup'>
          {' '}
          <img src='https://i.ibb.co/F4TMvxF/CODE-AVOCADO-1.png'></img>
        </Link>
        <LimitedItems maxItems={12} />
      </div>
      <div className='welcome-page'>
        <div className='welcome'>
          <h3>Welcome to Grace Shopper!</h3>
          <p>
            {' '}
            <img
              className='welcome-image'
              src='https://heydjangles.com/wp-content/uploads/2020/08/halloween-costumes-for-chihuahuas-21-768x702.png'
            />
          </p>
          <p>Hi, I'm Palta!</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
