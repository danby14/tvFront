import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

const LeagueNavbar = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <div className=' columns is-mobile is-marginless heading has-text-weight-bold'>
        <div className='column left'>
          {/* {auth.isLoggedIn && (
            <Link to='/Leagues'>
              <p className='navbar-item has-text-dark'>LEAGUES</p>
            </Link>
          )} */}

          {auth.isLoggedIn && (
            <Link to='/Predictions'>
              <p className='navbar-item has-text-dark'>MAKE PREDICTIONS</p>
            </Link>
          )}

          {auth.isLoggedIn && (
            <Link to='/Standings'>
              <p className='navbar-item has-text-dark'>STANDINGS</p>
            </Link>
          )}

          {/* <p className='navbar-item has-text-dark'>RESEARCH</p> */}

          {auth.isLoggedIn && (
            <Link to='/Commissioner'>
              <p className='navbar-item has-text-dark'>Commissioner</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeagueNavbar;
