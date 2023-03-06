import React, { useEffect, useState } from 'react';
import { fetchSingleUser, updateUser } from '../store/slices/users';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleUser = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const loggedUser = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.users.selectedUser);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [update, setUpdate] = useState('');

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (user && user.id) {
      if (loggedUser.role !== 'admin' && user.id !== loggedUser.id) {
        console.error('You cannot edit this profile!');
        return;
      }
      try {
        await dispatch(
          updateUser({
            id: user.id,
            firstName,
            lastName,
            email,
          })
        );
        setUpdate('User info has been updated.');
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!user || !user.id) {
    return 'User does not exist!';
  }

  return (
    <div>
      <h2>Account Info</h2>
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
        {update && <div className='notif'>{update}</div>}
        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default SingleUser;
