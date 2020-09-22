import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import axios from 'axios';
import { useForm } from 'react-hook-form';

const ChangeLeaguePassword = ({ id, currentPass, changes, submitted, setSubmitted }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState(false);

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    try {
      if (currentPass !== data.oldPassword) return setError('old password incorrect');
      if (data.password !== data.password2) return setError('new passwords must match');
      await axios.patch(`${BASE_URL}/leagues/${id}/changePassword`, {
        oldPassword: data.oldPassword,
        newPassword: data.password,
      });
      setSubmitted(true);
      changes();
    } catch (err) {
      setError(err.response.data);
    }
  };

  if (!submitted) {
    return (
      <div>
        <form id='changePassword' onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label htmlFor='oldPassword'>Old Password</label>
            <div className='control'>
              <input
                className='input is-small'
                name='oldPassword'
                type='password'
                ref={register({
                  required: 'Please Enter a Valid Password',
                  minLength: { value: 6, message: 'minimum of 6 characters' },
                })}
              />
              <p className='has-text-danger'>{errors.oldPassword && errors.oldPassword.message}</p>
            </div>
          </div>

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
        </form>
      </div>
    );
  } else {
    return <div>Password Updated Successfully!</div>;
  }
};

export default ChangeLeaguePassword;
