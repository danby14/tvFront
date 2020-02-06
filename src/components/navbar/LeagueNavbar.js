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
          {/* {auth.isLoggedIn && (
            <Link to='/Predictions'>
              <p className='navbar-item has-text-dark'>MAKE PREDICTIONS</p>
            </Link>
          )} */}

          <Link to={`/leagueHome/${auth.leagueNum[0]}`}>
            <p className='navbar-item has-text-dark'>
              League: {auth.leagueName[0]}
            </p>
          </Link>

          {/* <Link to={`/leagueHome/${auth.leagueNum[0]}/predictions`}>
            <p className='navbar-item has-text-dark'>MAKE PREDICTIONS 1</p>
          </Link> */}

          {/* <p className='navbar-item has-text-dark'>STANDINGS</p> */}

          <p className='navbar-item has-text-dark'>MAKE PREDICTIONS 2</p>

          <Link to='/commissioner'>
            <p className='navbar-item has-text-dark'>Commissioner</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeagueNavbar;
