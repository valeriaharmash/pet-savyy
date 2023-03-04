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
    <div>
      <h1>All Users</h1>
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <Link to={`/users/${user.id}`}>
                {user.firstName} {user.lastName}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;
