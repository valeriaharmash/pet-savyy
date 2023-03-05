import React from 'react';
import LimitedItems from './LimitedItems';

const Main = () => {
  return (
    <div className='main'>
      <div className='item-list'>
        <div className='banner'>
          <h2>Your pet deserves the best, and so do you.</h2>
        </div>
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
          <p>Our pet site is unlike any other--because we made it that way.</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
