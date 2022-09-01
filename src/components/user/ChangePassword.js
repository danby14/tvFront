import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '../shared/Box';

const ChangePassword = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { token } = useParams();
  const { register, handleSubmit, errors, getValues } = useForm({ mode: 'onBlur' });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async data => {
    try {
      const response = await axios.post(`${BASE_URL}/user/changePassword`, {
        password: data.password,
        token: token,
      });
      setSuccess(response.data.msg);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='container'>
      <div className='columns is-gapless is-lower is-mobile is-centered'>
        <div className='column is-10-mobile is-6-tablet is-4-widescreen '>
          <Box svgSize={35}>
            {!success ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='field'>
                  <label htmlFor='password'>New Password</label>
                  <div className='control'>
                    <input
                      className='input is-small'
                      {...register('password', {
                        required: 'Please Enter a Valid Password',
                        minLength: { value: 6, message: 'minimum of 6 characters' },
                      })}
                      type='password' />
                    <p className='has-text-danger'>{errors.password && errors.password.message}</p>
                  </div>
                </div>

                <div className='field'>
                  <label htmlFor='password2'>Confirm New Password</label>
                  <div className='control'>
                    <input
                      className='input is-small'
                      {...register('password2', {
                        required: 'Please confirm password!',
                        minLength: { value: 6, message: 'minimum of 6 characters' },
                        validate: {
                          matchesPreviousPassword: value => {
                            const { password } = getValues();
                            return password === value || 'Passwords do not match!';
                          },
                        },
                      })}
                      type='password' />
                    <p className='has-text-danger'>
                      {errors.password2 && errors.password2.message}
                    </p>
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
      </div>
    </div>
  );
};

export default ChangePassword;
