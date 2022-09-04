import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

import { AuthContext } from '../context/auth-context';

import Logo from '../../assets/Logo';

const MainNavbar = ({ leagueName, token }) => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    // Init Google Analytics
    ReactGA.initialize('UA-18711782-3');
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  const clickAndClose = () => {
    setisActive(false);
  };

  return (
    <nav
      className='navbar is-size-6-touch is-size-5 is-light is-fixed-top is-transparent container is-fullhd is-hoverable py-1 pr-2'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <NavLink
          exact='true'
          to='/'
          className={({ isActive }) => 'navbar-item' + (isActive ? ' has-text-info' : '')}
          onClick={clickAndClose}
        >
          <Logo size='161' unit='px' color='currentColor' />
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

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className={`navbar-start ${isActive ? 'is-active' : ''}`}>
          {auth.isLoggedIn && (
            <NavLink
              to='/leagues'
              className={({ isActive }) =>
                'navbar-item' + (isActive ? ' has-text-info has-text-weight-semibold' : '')
              }
              onClick={clickAndClose}
            >
              Leagues
            </NavLink>
          )}

          {token && leagueName && (
            <div className='navbar-item has-dropdown is-hoverable '>
              <div className='navbar-link'>{leagueName}</div>

              <div className='navbar-dropdown is-boxed'>
                <NavLink
                  exact='true'
                  to={`/leagueHome/${auth.leagueNum[0]}`}
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? ' has-text-info has-text-weight-semibold' : '')
                  }
                  onClick={clickAndClose}
                  end
                >
                  Standings
                </NavLink>
                <NavLink
                  to={`/leagueHome/${auth.leagueNum[0]}/predictions`}
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? ' has-text-info has-text-weight-semibold' : '')
                  }
                  onClick={clickAndClose}
                >
                  Make Predictions
                </NavLink>
                <NavLink
                  to={`/leagueHome/${auth.leagueNum[0]}/settings`}
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? ' has-text-info has-text-weight-semibold' : '')
                  }
                  onClick={clickAndClose}
                >
                  Settings
                </NavLink>
              </div>
            </div>
          )}
        </div>

        <div className='navbar-end'>
          <div className='navbar-item has-dropdown is-hoverable '>
            <div className='navbar-link'>Resources</div>

            <div className='navbar-dropdown is-boxed'>
              <NavLink
                to='/help'
                className={({ isActive }) =>
                  'navbar-item' + (isActive ? ' has-text-info has-text-weight-semibold' : '')
                }
                onClick={clickAndClose}
              >
                Help
              </NavLink>
              {/* <NavLink
                to='/blog'
                className={({ isActive }) =>
                  'navbar-item' + (isActive ? ' has-text-info has-text-weight-semibold' : '')
                }
                onClick={clickAndClose}
              >
                Blog
              </NavLink> */}
              <NavLink
                to='/research'
                className={({ isActive }) =>
                  'navbar-item' + (isActive ? ' has-text-info has-text-weight-semibold' : '')
                }
                onClick={clickAndClose}
              >
                Research
              </NavLink>
              <NavLink
                to='/contact'
                className={({ isActive }) =>
                  'navbar-item' + (isActive ? ' has-text-info has-text-weight-semibold' : '')
                }
                onClick={clickAndClose}
              >
                Contact
              </NavLink>
            </div>
          </div>

          {!auth.isLoggedIn && (
            <div className='navbar-item'>
              <div className='buttons'>
                <Link
                  to='/auth'
                  className='button is-info is-rounded is-medium'
                  onClick={clickAndClose}
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}

          {auth.isLoggedIn && (
            <div className='navbar-item has-dropdow is-hoverable'>
              <div className='button is-info is-rounded is-size-6-touch is-size-5-tablet is-uppercase'>
                {auth.userName ? auth.userName[0] : 'empty'}
              </div>
              <div className='navbar-dropdown is-right is-boxed'>
                <NavLink
                  to='/account'
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? ' has-text-info has-text-weight-semibold' : '')
                  }
                  onClick={clickAndClose}
                >
                  Account
                </NavLink>
                <NavLink
                  to='/auth'
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? 'has-text-weight-semibold' : '')
                  }
                  onClick={() => {
                    auth.logout();
                    clickAndClose();
                  }}
                >
                  Sign Out
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
