import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

const LeagueNavbar = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <div className=' columns is-mobile is-marginless heading has-text-weight-bold'>
        <div className='column left'>
          <Link to={`/leagueHome/${auth.leagueNum[0]}`}>
            <p className='navbar-item has-text-dark'>
              League: {auth.leagueName[0]}
            </p>
          </Link>

          <Link to={`/leagueHome/${auth.leagueNum[0]}/predictions`}>
            <p className='navbar-item has-text-dark'>Make Predictions</p>
          </Link>

          <Link to='/commissioner'>
            <p className='navbar-item has-text-dark'>Commissioner</p>
          </Link>

          <Link to='/help'>
            <p className='navbar-item has-text-dark'>Help</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeagueNavbar;
