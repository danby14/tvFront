import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Box from '../shared/Box';
import Modal from '../shared/Modal';

import axios from 'axios';
import { useForm } from 'react-hook-form';

const JoinLeague = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [leagueId, setLeagueId] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (leagueId.length > 0) {
      history.push(`/LeagueHome/${leagueId}`);
    }
  }, [leagueId, history]);

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  // need to generate :lid from leagueName | have user follow links with :lid in them | change :lid to leagueName, then adjust for alteration on backend
  const onSubmit = async data => {
    try {
      const response = await axios.patch(`${BASE_URL}/leagues/${data.leagueId}`, {
        leaguePassword: data.leaguePassword,
      });
      setLeagueId(response.data.league._id);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className='container'>
      <div className='columns is-gapless is-lower is-mobile is-centered'>
        <div className='column is-11-mobile is-7-tablet is-6-desktop is-5-widescreen'>
          <Box>
            <p className='title has-text-dark'>Join League</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='field'>
                <label htmlFor='leagueId'>League Id</label>
                <div className='control'>
                  <input
                    className='input is-small'
                    {...register('leagueId', { required: 'Please Enter a Valid League ID' })}
                    type='text'
                  />
                  <p className='has-text-danger'>{errors.leagueId && errors.leagueId.message}</p>
                </div>
              </div>

              <div className='field'>
                <label htmlFor='leaguePassword'>League Password</label>
                <div className='control'>
                  <input
                    className='input is-small'
                    {...register('leaguePassword', {
                      required: 'Please Enter a Valid Password',
                      minLength: { value: 6, message: 'miniumum of 6 characters' },
                    })}
                    type='password'
                  />
                  <p className='has-text-danger'>
                    {errors.leaguePassword && errors.leaguePassword.message}
                  </p>
                </div>
              </div>

              <input className='button' type='submit' value='Submit'></input>
            </form>
          </Box>
          {error && (
            <div className='has-text-left has-text-dark'>
              <Modal title='Joining League Failed' message={error} stateHandler={setError} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinLeague;
