import React, { useState, useContext } from 'react';

import { AuthContext } from '../../context/auth-context';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Box from '../../shared/Box';
import Modal from '../../shared/Modal';

const DeleteLeague = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const lid = auth.leagueNum[0];
  const lgName = auth.leagueName[0];

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  // need to generate :lid from leagueName | have user follow links with :lid in them | change :lid to leagueName, then adjust for alteration on backend
  const onSubmit = async data => {
    try {
      const response = await axios.delete(`${BASE_URL}/leagues/removeUser/${data.leagueId}`, {
        data: {
          leagueName: data.leagueName,
          leagueId: data.leagueId,
          leaguePassword: data.leaguePassword,
          userToDel: data.userToDel,
        },
      });
      console.warn(response.data.message);
      setSuccess(response.data.message);
      // history.push('/Leagues');
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className='columns has-text-centered has-text-dark '>
      <div className='column'></div>
      <div className='column'>
        <Box>
          <h1 className='title has-text-danger pb-2'>
            Are you sure you want to remove a member from {lgName}?
          </h1>
          <h2 className='subtitle has-text-dark'>
            To proceed, please fill out the following information.
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='field'>
              <label htmlFor='leagueName'>League Name (must match exactly)</label>
              <div className='control'>
                <input
                  className='input'
                  name='leagueName'
                  type='text'
                  ref={register({ required: 'Please Enter Valid League Name' })}
                />
                <p className='has-text-danger'>{errors.leagueName && errors.leagueName.message}</p>
              </div>
            </div>

            <div className='field'>
              <label htmlFor='leagueId'>League Id</label>
              <div className='control'>
                <input
                  className='input'
                  name='leagueId'
                  type='text'
                  defaultValue={lid}
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
                    minLength: { value: 6, message: 'miniumum of 6 characters' },
                  })}
                />
                <p className='has-text-danger'>
                  {errors.leaguePassword && errors.leaguePassword.message}
                </p>
              </div>
            </div>

            <div className='field'>
              <label htmlFor='userToDel'>Member you wish to remove from the league.</label>
              <div className='control'>
                <input
                  className='input'
                  name='userToDel'
                  type='text'
                  // defaultValue={lid}
                  ref={register({ required: 'Please Enter a Valid User Name or ID' })}
                />
                <p className='has-text-danger'>{errors.userToDel && errors.userToDel.message}</p>
              </div>
            </div>

            <input className='button' type='submit' value='Submit'></input>
          </form>
        </Box>
      </div>
      <div className='column'></div>

      {success && (
        <div className='has-text-left'>
          <Modal
            title='User has been deleted'
            message={success}
            stateHandler={setSuccess}
            extras={setRedirectOnSuccess}
          />
        </div>
      )}

      {redirectOnSuccess &&
        setTimeout(() => {
          history.push('/Leagues');
        }, 1)}

      {error && (
        <div className='has-text-left'>
          <Modal title='Deleting League Failed' message={error} stateHandler={setError} />
        </div>
      )}
    </div>
  );
};

export default DeleteLeague;
