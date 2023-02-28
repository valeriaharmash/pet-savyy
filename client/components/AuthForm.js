import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate, getUserByToken } from '../store';
import { getUserToken } from '../utils';

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      await dispatch(
        authenticate({ firstName, lastName, email, password, method: authMode })
      );
      await dispatch(getUserByToken(getUserToken()));
      setEmail('');
      setPassword('');
      navigate('/home');
    }
  };

  if (!mode) return null;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {authMode === 'signup' && (
          <div>
            <label htmlFor="firstName">
              <small>First name</small>
            </label>
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
        )}
        {authMode === 'signup' && (
          <div>
            <label htmlFor="lastName">
              <small>Last name</small>
            </label>
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">{authMode}</button>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
    </div>
  );
};

export { AuthForm };
