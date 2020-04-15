import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Box from '../shared/Box';
import Modal from '../shared/Modal';

import axios from 'axios';
import { useForm } from 'react-hook-form';

function CreateLeague() {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  function makeISODate(date, days) {
    let timeAhead = 1000 * 60 * 60 * 24 * days;
    let offset = date.getTimezoneOffset();
    let netMilliseconds = date.getTime() - offset * 1000 * 60 + timeAhead;
    let putAsDefault = new Date(netMilliseconds).toISOString().slice(0, -8);
    return putAsDefault;
  }

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    try {
      await axios.post('http://localhost:5000/leagues/create', {
        leagueName: data.leagueName,
        password: data.password,
        startDate: new Date(data.startDate)
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
        <Box>
          <p className='title has-text-dark'>Create League</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='field'>
              <label htmlFor='leagueName'>League Name</label>
              <div className='control'>
                <input
                  className='input is-small'
                  name='leagueName'
                  type='text'
                  ref={register({
                    required: 'Please enter a name for your league'
                  })}
                />
                <p className='has-text-danger'>{errors.leagueName && errors.leagueName.message}</p>
              </div>
            </div>

            <div className='field'>
              <label htmlFor='password'>Password</label>
              <div className='control'>
                <input
                  className='input is-small'
                  name='password'
                  type='password'
                  ref={register({
                    required: 'Required (min. 6 characters)',
                    minLength: { value: 6, message: 'miniumum of 6 characters' }
                  })}
                />
                <p className='has-text-danger'>{errors.password && errors.password.message}</p>
              </div>
            </div>

            <div className='field'>
              <label htmlFor='startDate'>
                League Start Date <br /> (Date predictions get locked for all users. Can be changed
                later on league settings page.)
              </label>
              <div className='control'>
                <input
                  className='input is-small'
                  name='startDate'
                  type='datetime-local'
                  defaultValue={makeISODate(new Date(), 7)}
                  ref={register({
                    required: 'Please enter a valid date.',
                    min: {
                      value: makeISODate(new Date(), 0),
                      message: 'must be a future date'
                    }
                  })}
                />
                <p className='has-text-danger'>{errors.startDate && errors.startDate.message}</p>
              </div>
            </div>

            <input className='button' type='submit' value='Create League'></input>
          </form>
        </Box>
        {error && (
          <div className='has-text-left'>
            <Modal title='Creating League Failed' message={error} stateHandler={setError} />
          </div>
        )}
      </div>
      <div className='column'></div>
    </div>
  );
}

export default CreateLeague;
