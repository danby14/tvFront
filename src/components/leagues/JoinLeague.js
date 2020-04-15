import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Modal from '../shared/Modal';

import axios from 'axios';
import { useForm } from 'react-hook-form';

const JoinLeague = () => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  // need to generate :lid from leagueName | have user follow links with :lid in them | change :lid to leagueName, then adjust for alteration on backend
  const onSubmit = async data => {
    try {
      await axios.patch(`http://localhost:5000/leagues/${data.leagueId}`, {
        leaguePassword: data.leaguePassword
      });
      history.push('/Leagues');
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className='columns has-text-centered has-text-dark '>
      <div className='column'></div>
      <div className='column'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label htmlFor='leagueId'>League Id</label>
            <div className='control'>
              <input
                className='input is-small'
                name='leagueId'
                type='text'
                ref={register({ required: 'Please Enter a Valid League ID' })}
              />
              <p className='has-text-danger'>{errors.leagueId && errors.leagueId.message}</p>
            </div>
          </div>

          <div className='field'>
            <label htmlFor='leaguePassword'>League Password</label>
            <div className='control'>
              <input
                className='input is-small'
                name='leaguePassword'
                type='password'
                ref={register({
                  required: 'Please Enter a Valid Password',
                  minLength: { value: 6, message: 'miniumum of 6 characters' }
                })}
              />
              <p className='has-text-danger'>
                {errors.leaguePassword && errors.leaguePassword.message}
              </p>
            </div>
          </div>

          <input className='button' type='submit' value='Submit'></input>
        </form>
        {error && (
          <div className='has-text-left'>
            <Modal title='Joining League Failed' message={error} stateHandler={setError} />
          </div>
        )}
      </div>
      <div className='column'></div>
    </div>
  );
};

export default JoinLeague;
