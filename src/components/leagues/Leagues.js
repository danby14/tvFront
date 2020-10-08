import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';
import Box from '../shared/Box';
import LoadingSpinner from '../shared/LoadingSpinner';

const Leagues = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const [leagues, setLeagues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const uid = auth.userId;

  useEffect(() => {
    const fetchLeague = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/leagues/${uid}/leagues`);
        setLeagues(response.data);
        setIsLoading(false);
      } catch (err) {
        setLeagues(null);
        setIsLoading(false);
      }
    };
    fetchLeague();
  }, [uid, BASE_URL]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (leagues.length === 0 && !isLoading) {
    return (
      <div className='container'>
        <div className='columns is-gapless is-lower is-mobile is-centered'>
          <div className='column is-10-mobile is-6-tablet is-4-widescreen'>
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
        </div>
      </div>
    );
  }

  if (leagues.length !== 0 && !isLoading) {
    return (
      <div className='container'>
        <div className='columns is-gapless is-lower is-mobile is-centered'>
          <div className='column is-10-mobile is-6-tablet is-4-widescreen'>
            <Box className='box has-text-centered' svgSize={28}>
              <h2 className='title has-text-dark'>Your Leagues</h2>
              <div className='content'>
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
              <p className='pb-2'>
                <Link to='/JoinLeague'>
                  <button className='button'>Join an Existing League</button>
                </Link>
              </p>
              <p>
                <Link to='/CreateLeague'>
                  <button className='button'>Create a New League</button>
                </Link>
              </p>
            </Box>
          </div>
        </div>
      </div>
    );
  }
};

export default Leagues;
