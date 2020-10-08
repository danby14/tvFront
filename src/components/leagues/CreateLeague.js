import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Box from '../shared/Box';
import Modal from '../shared/Modal';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import startOfDay from 'date-fns/startOfDay';

function CreateLeague() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { control, register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [leagueId, setLeagueId] = useState('');

  useEffect(() => {
    if (leagueId.length > 0) {
      history.push(`/LeagueHome/${leagueId}/settings`);
    }
  }, [leagueId, history]);

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    try {
      const response = await axios.post(`${BASE_URL}/leagues/create`, {
        leagueName: data.leagueName,
        password: data.password,
        startDate: data.startDate,
      });
      setLeagueId(response.data.league._id);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='container'>
      <div className=' columns is-gapless is-lower is-mobile is-centered'>
        <div className='column is-11-mobile is-7-tablet is-6-desktop is-5-widescreen'>
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
                      required: 'Please enter a name for your league',
                    })}
                  />
                  <p className='has-text-danger'>
                    {errors.leagueName && errors.leagueName.message}
                  </p>
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
                      minLength: { value: 6, message: 'miniumum of 6 characters' },
                    })}
                  />
                  <p className='has-text-danger'>{errors.password && errors.password.message}</p>
                </div>
              </div>

              <div className='field'>
                <label htmlFor='startDate'>
                  League Start Date <br /> (Day predictions get locked for all users. Can be edited
                  later)
                </label>
                <div className='control'>
                  <Controller
                    as={
                      <ReactDatePicker
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode='select'
                        dateFormat=' MMMM d, yyyy'
                        minDate={addDays(new Date(), 1)}
                      />
                    }
                    control={control}
                    defaultValue={startOfDay(addDays(new Date(), 7))}
                    name='startDate'
                    valueName='selected'
                    onChange={([selected]) => selected}
                    rules={{
                      required: 'Please enter a Valid Date',
                      validate: value =>
                        new Date(value).getTime() > new Date().getTime() || `must be a future date`,
                    }}
                    className='input is-small'
                  />
                  <p className='has-text-danger'>{errors.startDate && errors.startDate.message}</p>
                </div>
              </div>

              <input className='button' type='submit' value='Create League'></input>
            </form>
          </Box>
          {error && (
            <div className='has-text-left has-text-dark'>
              <Modal title='Creating League Failed' message={error} stateHandler={setError} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateLeague;
