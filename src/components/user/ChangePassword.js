import React, { useState } from 'react';
import Box from '../shared/Box';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { token } = useParams();
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async data => {
    if (data.password === data.password2) {
      try {
        const response = await axios.post(`${BASE_URL}/user/changePassword`, {
          password: data.password,
          token: token,
        });
        setSuccess(response.data.msg);
      } catch (err) {
        setError(err.response.data);
      }
    } else setError('passwords must match each other');
  };

  return (
    <div className='columns has-text-dark'>
      <div className='column'></div>
      <div className='column is-half has-text-centered '>
        <Box>
          {!success ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='field'>
                <label htmlFor='password'>New Password</label>
                <div className='control'>
                  <input
                    className='input is-small'
                    name='password'
                    type='password'
                    ref={register({
                      required: 'Please Enter a Valid Password',
                      minLength: { value: 6, message: 'minimum of 6 characters' },
                    })}
                  />
                  <p className='has-text-danger'>{errors.password && errors.password.message}</p>
                </div>
              </div>
              <div className='field'>
                <label htmlFor='password2'>Confirm New Password</label>
                <div className='control'>
                  <input
                    className='input is-small'
                    name='password2'
                    type='password'
                    ref={register({
                      required: 'Please Enter a Valid Password',
                      minLength: { value: 6, message: 'minimum of 6 characters' },
                    })}
                  />
                  <p className='has-text-danger'>{errors.password2 && errors.password2.message}</p>
                </div>
                <p className='has-text-danger'>{error}</p>
              </div>
              <button value='submit' className='button is-outline is-dark'>
                Submit
              </button>
            </form>
          ) : (
            <div>{success}</div>
          )}
        </Box>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default ChangePassword;
