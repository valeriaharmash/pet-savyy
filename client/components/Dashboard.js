import React from 'react';
import AllUsers from './AllUsers';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='main'>
        <div className='left'>
          <h3>Item Management</h3>
          <div className='inner-left'>
            <ul>
              <li>
                {' '}
                <Link to='/items/add' className='link'>
                  ✎ Add Item
                </Link>
              </li>
              <li>
                {' '}
                <Link to='/items/' className='link'>
                  ✎ Edit Items
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='right'>
          <h3>User Management</h3>
          <div className='inner-right'>
            <AllUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
