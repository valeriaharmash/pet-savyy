import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate, getUserByToken } from '../store';
import { mergeLocalCart } from '../store/slices/cart';
import { createOrder } from '../store/slices/orders';

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [notification, setNotification] = useState();

  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (authMode === 'signup' && !firstName) {
      setNotification('Please enter first name.');
    } else if (authMode === 'signup' && !lastName) {
      setNotification('Please enter last name.');
    } else if (!email) {
      setNotification('Please enter email.');
    } else if (!password) {
      setNotification('Please enter password.');
    } else {
      const result = await dispatch(
        authenticate({ firstName, lastName, email, password, method: authMode })
      );
      if (result.payload && result.payload.error) {
        setNotification('Invalid username or password.');
      } else {
        const {payload: user} = await dispatch(getUserByToken());

        // create blank order on sign up
        if(authMode === 'signup') {
          // TODO merge local cart if any
          dispatch(createOrder({userId: user.id}))
        }

        // TODO refactor merge local cart logic
        const localCartItems =
          JSON.parse(localStorage.getItem('cartItems')) || [];
        if (localCartItems.length > 0) {
          const input = { userId: user.id, cartItems: localCartItems };
          dispatch(mergeLocalCart(input));
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        navigate('/home');
      }
    }
  };

  if (!mode) return null;

  return (
    <div className='column'>
      <form onSubmit={handleSubmit} name={name}>
        {authMode === 'signup' && (
          <div className='row apart'>
            <label htmlFor='firstName'>
              <small>First name</small>
            </label>
            <input
              name='firstName'
              type='text'
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
        )}
        {authMode === 'signup' && (
          <div className='row apart'>
            <label htmlFor='lastName'>
              <small>Last name</small>
            </label>
            <input
              name='lastName'
              type='text'
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        )}
        <div className='row apart'>
          <label htmlFor='email'>
            <small>Email</small>
          </label>
          <input
            name='email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='row apart'>
          <label htmlFor='password'>
            <small>Password</small>
          </label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          {notification && <div className='notif'>{notification}</div>}
          <div className='row around'>
            <button type='submit'>{authMode}</button>
          </div>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
    </div>
  );
};

export { AuthForm };
