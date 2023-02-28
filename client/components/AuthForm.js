import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate, getUserByToken } from '../store';
import { getUserToken } from '../utils';

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState(mode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && password) {
      await dispatch(authenticate({ username, password, method: authMode }));
      await dispatch(getUserByToken(getUserToken()));
      setUsername('');
      setPassword('');
      navigate('/home');
    }
  };

  if (!mode) return null;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input
            name="username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            name="password"
            type="password"
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

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
// const mapLogin = (state) => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error,
//   };
// };

// const mapSignup = (state) => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault();
//       const formName = evt.target.name;
//       const username = evt.target.username.value;
//       const password = evt.target.password.value;
//       dispatch(authenticate(username, password, formName));
//     },
//   };
// };

// export const Login = connect(mapLogin, mapDispatch)(AuthForm);
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

export { AuthForm };
