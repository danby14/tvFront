import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

const MainNavbar = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <div className='columns is-mobile is-marginless heading has-text-weight-bold'>
        <div className='column left'>
          <Link to='/'>
            <p className='navbar-item image'>TV Predictions</p>
          </Link>
        </div>
        <div className='column center desktop'>
          {auth.isLoggedIn && (
            <Link to='/leagues'>
              <p className='navbar-item'>LEAGUES</p>
            </Link>
          )}

          <Link to='/blog'>
            <p className='navbar-item'>BLOG</p>
          </Link>

          <Link to='/blog/2'>
            <p className='navbar-item'>BLOG 2</p>
          </Link>

          <Link to='/blog/3'>
            <p className='navbar-item'>BLOG 3</p>
          </Link>

          <Link to='/research'>
            <p className='navbar-item'>RESEARCH</p>
          </Link>
        </div>
        <div className='column right'>
          {!auth.isLoggedIn && (
            <Link to='/auth'>
              <p className='navbar-item desktop'>SIGN IN</p>
            </Link>
          )}

          {auth.isLoggedIn && (
            <Link to='/account'>
              <p className='navbar-item'>Account</p>
            </Link>
          )}

          {auth.isLoggedIn && (
            <button className='button is-link is-small' onClick={auth.logout}>
              SIGN OUT
            </button>
          )}

          <figure className='navbar-item image center'>
            <i className='fas fa-bars' style={{ width: '1rem', height: '1rem' }}></i>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
