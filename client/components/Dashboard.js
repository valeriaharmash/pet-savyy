import React from 'react';
import AllUsers from './AllUsers';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='dashboard'>
      <div className='main'>
        <div className='left'>
          <h3>Items</h3>
          <p>
            <Link to='/items/add' className='link'>
              Add Item
            </Link>
          </p>
          <p>
            <Link to='/items/' className='link'>
              Update Items
            </Link>
          </p>
        </div>
        <div className='right'>
          <h3>Users</h3>
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default Home;
