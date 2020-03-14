import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';
import Box from '../shared/Box';

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
        const response = await axios.get(`http://localhost:5000/user/${uid}/leagues`);
        setLeagues(response.data);
        setIsLoading(false);
      } catch (err) {
        setLeagues(null);
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
      <div className='columns'>
        <div className='column'></div>
        <div className='column'>
          <Box svgSize={35}>
            <div className='has-text-dark has-text-centered'>
              <div className='content'>
                <p className='is-size-5 has-text-info'>You are not currently in any leagues.</p>
                <p className='is-size-5 has-text-info'>What would you like to do?</p>
              </div>
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
          </Box>
        </div>
        <div className='column'></div>
      </div>
    );
  }

  return (
    <div className='columns'>
      <div className='column'></div>
      <div className='column'>
        <Box className='box has-text-centered' svgSize={28}>
          <h2 className='title has-text-dark'>Your Leagues</h2>
          <div className='content has-text-centered'>
            {leagues.length > 0 &&
              leagues.map(lg => (
                <p key={lg._id} id={lg._id}>
                  <Link className='has-text-link is-size-5' to={`/LeagueHome/${lg._id}`}>
                    {lg.leagueName}
                  </Link>
                </p>
              ))}
            <p>-----</p>
          </div>
          <Link to='/JoinLeague'>
            <button className='button'>Join an Existing League</button>
          </Link>

          <Link to='/CreateLeague'>
            <button className='button'>Create a New League</button>
          </Link>
        </Box>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default Leagues;
