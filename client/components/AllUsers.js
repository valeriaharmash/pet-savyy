import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectAllUsers, fetchUsers } from '../store/slices/users';
import { useDispatch, useSelector } from 'react-redux';

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className='container'>
      {users.map((user) => {
        return (
          <div className='user' key={user.id}>
            <Link to={`/users/${user.id}`} className='link'>
              {user.firstName} {user.lastName}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;
