import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Modal from '../shared/Modal';

import axios from 'axios';
import useForm from 'react-hook-form';

function CreateLeague() {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    try {
      await axios.post('http://localhost:5000/leagues/create', {
        leagueName: data.leagueName,
        password: data.password
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

          <input className='button' type='submit' value='Create League'></input>
        </form>
        {error && (
          <div className='has-text-left'>
            <Modal title='Creating League Failed' error={error} setError={setError} />
          </div>
        )}
      </div>
      <div className='column'></div>
    </div>
  );
}

export default CreateLeague;
