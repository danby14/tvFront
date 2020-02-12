import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

const MainNavbar3 = () => {
  const auth = useContext(AuthContext);
  return (
    <nav className='navbar is-link is-fixed-top ' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link to='/' className='navbar-item'>
          TV Predictions
        </Link>
        {/* <a
          role='button'
          className='navbar-burger burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a> */}
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          {/* <Link to='/' className='navbar-item'>
            Home
          </Link> */}
          {auth.isLoggedIn && (
            <Link to='/leagues' className='navbar-item'>
              Leagues
            </Link>
          )}

          <div className='navbar-item has-dropdown is-hoverable '>
            <div className='navbar-link'>More</div>

            <div className='navbar-dropdown'>
              <Link to='/blog' className='navbar-item has-text-dark'>
                Blog
              </Link>
              <Link to='/research' className='navbar-item has-text-dark'>
                Research
              </Link>
              <Link to='faq' className='navbar-item has-text-dark'>
                FAQ
              </Link>
              {auth.isLoggedIn && (
                <Link to='/account' className='navbar-item has-text-dark'>
                  Account
                </Link>
              )}
              <Link to='contact' className='navbar-item has-text-dark'>
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              {/* <button className='button is-primary'>
                <strong>Sign up</strong>
              </button> */}
              {!auth.isLoggedIn && (
                <Link to='/auth'>
                  <button className='button is-primary'>Log in</button>
                </Link>
              )}
              {/* <button className='button is-light'>Log in</button> */}
              {auth.isLoggedIn && (
                <button className='button is-primary' onClick={auth.logout}>
                  Sign out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar3;
