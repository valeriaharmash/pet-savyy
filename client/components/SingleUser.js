import React, { useEffect, useState } from 'react';
import { fetchSingleUser, updateUser } from '../store/slices/users';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleUser = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.users.selectedUser);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (user && user.id) {
      try {
        await dispatch(
          updateUser({
            id: user.id,
            firstName,
            lastName,
            email,
          })
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!user) {
    return 'User does not exist!';
  }

  return (
    <div>
      <h1>Account Info</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default SingleUser;
