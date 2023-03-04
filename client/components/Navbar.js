import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../store';
import { removeUserToken } from '../utils';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <h1>Grace Shopper Pet Store</h1>
      <nav className="apart">
        <div>
          <Link to="/home">Home</Link>
          <Link to="/home">Costumes</Link>
          <Link to="/home">Supplies</Link>
          {user && user.role !== 'admin' && (
            <Link to={`/user/${user.id}/cart`}>Cart</Link>
          )}
          {!user && <Link to="/user/guest/cart">Cart</Link>}
        </div>
        {user && user.role === 'admin' && <Link to={`/users`}>Users</Link>}
        {user ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">My Account</Link>
            <a
              onClick={() => {
                dispatch(setUser(null));
                removeUserToken();
                navigate('/');
              }}
            >
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr/>
    </div>
  );
};

export default Navbar;
