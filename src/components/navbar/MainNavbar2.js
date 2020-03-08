import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

const MainNavbar2 = ({ leagueName, token }) => {
  const auth = useContext(AuthContext);
  const [isActive, setisActive] = useState(false);

  const clickAndClose = () => {
    setisActive(false);
  };

  return (
    <nav className='navbar is-link is-fixed-top' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <NavLink
          exact
          to='/'
          className='navbar-item'
          activeClassName='is-underlined'
          onClick={clickAndClose}
        >
          TV Predictions
        </NavLink>
        <label
          onClick={() => {
            setisActive(!isActive);
          }}
          role='button'
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </label>
      </div>

      {/* <input type='checkbox' id='nav-toggle-state' /> */}

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        {/* <div className='navbar-start'> */}
        <div className={`navbar-start ${isActive ? 'is-active' : ''}`}>
          {auth.isLoggedIn && (
            <NavLink
              to='/leagues'
              className='navbar-item'
              activeClassName='is-underlined'
              onClick={clickAndClose}
            >
              Leagues
            </NavLink>
          )}

          {token && leagueName && (
            <div className='navbar-item has-dropdown is-hoverable '>
              <div className='navbar-link'>{leagueName}</div>

              <div className='navbar-dropdown'>
                <NavLink
                  exact
                  to={`/leagueHome/${auth.leagueNum[0]}`}
                  className='navbar-item has-text-dark'
                  activeClassName='has-text-weight-bold'
                  onClick={clickAndClose}
                >
                  Standings
                </NavLink>
                <NavLink
                  to={`/leagueHome/${auth.leagueNum[0]}/predictions`}
                  className='navbar-item has-text-dark'
                  activeClassName='has-text-weight-bold'
                  onClick={clickAndClose}
                >
                  Make Predictions
                </NavLink>
                <NavLink
                  to={`/leagueHome/${auth.leagueNum[0]}/settings`}
                  className='navbar-item has-text-dark'
                  activeClassName='has-text-weight-bold'
                  onClick={clickAndClose}
                >
                  Settings
                </NavLink>
              </div>
            </div>
          )}

          <div className='navbar-item has-dropdown is-hoverable '>
            <div className='navbar-link'>More</div>

            <div className='navbar-dropdown'>
              <NavLink
                to='/blog'
                className='navbar-item has-text-dark'
                activeClassName='has-text-weight-bold'
                onClick={clickAndClose}
              >
                Blog
              </NavLink>
              <NavLink
                to='/research'
                className='navbar-item has-text-dark'
                activeClassName='has-text-weight-bold'
                onClick={clickAndClose}
              >
                Research
              </NavLink>
              <Link to='/faq' className='navbar-item has-text-dark' onClick={clickAndClose}>
                FAQ
              </Link>
              <Link to='/contact' className='navbar-item has-text-dark' onClick={clickAndClose}>
                Contact
              </Link>
              <Link to='/help' className='navbar-item has-text-dark' onClick={clickAndClose}>
                Help
              </Link>
            </div>
          </div>
        </div>

        <div className='navbar-end'>
          {token && auth.isLoggedIn && (
            <NavLink
              to='/account'
              className='navbar-item'
              activeClassName='is-underlined'
              onClick={clickAndClose}
            >
              {auth.userName}
            </NavLink>
          )}
          <div className='navbar-item'>
            <div className='buttons'>
              {!auth.isLoggedIn && (
                <Link to='/auth' className='button is-primary' onClick={clickAndClose}>
                  Sign In
                </Link>
              )}

              {auth.isLoggedIn && (
                <button
                  className='button is-primary'
                  onClick={() => {
                    auth.logout();
                    clickAndClose();
                  }}
                >
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

export default MainNavbar2;
