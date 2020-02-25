import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

const MainNavbar2 = ({ leagueName, token }) => {
  const auth = useContext(AuthContext);
  return (
    <nav className='navbar is-link is-fixed-top' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <NavLink exact to='/' className='navbar-item' activeClassName='is-underlined'>
          TV Predictions
        </NavLink>
        <label
          role='button'
          className='navbar-burger burger'
          aria-label='menu'
          aria-expanded='false'
          htmlFor='nav-toggle-state'
          // data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </label>
      </div>

      <input type='checkbox' id='nav-toggle-state' />

      <div className='navbar-menu'>
        <div className='navbar-start'>
          {auth.isLoggedIn && (
            <NavLink to='/leagues' className='navbar-item' activeClassName='is-underlined'>
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
                >
                  Standings
                </NavLink>
                <NavLink
                  to={`/leagueHome/${auth.leagueNum[0]}/predictions`}
                  className='navbar-item has-text-dark'
                  activeClassName='has-text-weight-bold'
                >
                  Make Predictions
                </NavLink>
                <NavLink
                  to='/commissioner'
                  className='navbar-item has-text-dark'
                  activeClassName='has-text-weight-bold'
                >
                  Commissioner
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
              >
                Blog
              </NavLink>
              <NavLink
                to='/research'
                className='navbar-item has-text-dark'
                activeClassName='has-text-weight-bold'
              >
                Research
              </NavLink>
              <Link to='faq' className='navbar-item has-text-dark'>
                FAQ
              </Link>
              <Link to='contact' className='navbar-item has-text-dark'>
                Contact
              </Link>
              <Link to='help' className='navbar-item has-text-dark'>
                Help
              </Link>
            </div>
          </div>
        </div>

        <div className='navbar-end'>
          {token && auth.isLoggedIn && (
            <NavLink to='/account' className='navbar-item' activeClassName='is-underlined'>
              {auth.userName}
            </NavLink>
          )}
          <div className='navbar-item'>
            <div className='buttons'>
              {/* <button className='button is-primary'>
                <strong>Sign up</strong>
              </button> */}
              {!auth.isLoggedIn && (
                <Link to='/auth' className='button is-primary'>
                  Sign In
                </Link>
              )}

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

export default MainNavbar2;
