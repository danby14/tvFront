import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';

const Leagues = () => {
  const auth = useContext(AuthContext);
  const [leagues, setLeagues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const uid = auth.userId;

  useEffect(() => {
    const fetchLeague = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${uid}/leagues`
        );
        setIsLoading(false);
        setLeagues(response.data);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchLeague();
  }, [uid]);

  if (isLoading) {
    return (
      <div className='columns'>
        <div className='column'></div>
        <div className='column has-text-dark has-text-centered'>
          <p>Loading...</p>
        </div>
        <div className='column'></div>
      </div>
    );
  }

  if (leagues.length === 0 && !isLoading) {
    return (
      <div className='container has-text-dark has-text-centered'>
        <p className='title has-text-primary'>
          {auth.userId} is not currently in any leagues. What would you like to
          do?
        </p>
        <br />
        <br />
        <Link to='/JoinLeague'>
          <button className='button'>Join an Existing League</button>
        </Link>

        <br />
        <br />
        <p>or</p>
        <br />
        <Link to='/CreateLeague'>
          <button className='button'>Create a New League</button>
        </Link>
      </div>
    );
  }

  return (
    <div className='container content has-text-centered'>
      <h2>Your Leagues</h2>
      <div className='content has-text-primary has-text-centered'>
        {leagues.map(lg => (
          <p key={lg.leagueId} id={lg.leagueId}>
            <Link to={`/LeagueHome/${lg.leagueId}`}>{lg.leagueName}</Link>
          </p>
        ))}
      </div>
      <Link to='/JoinLeague'>
        <button className='button is-small'>Join an Existing League</button>
      </Link>
      <Link to='/CreateLeague'>
        <button className='button is-small'>Create a New League</button>
      </Link>
    </div>
  );
};

export default Leagues;
