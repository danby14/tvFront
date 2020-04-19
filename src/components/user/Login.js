import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import Modal from '../shared/Modal';

import axios from 'axios';
import { useForm } from 'react-hook-form';

function Login() {
  const auth = useContext(AuthContext);

  const [error, setError] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/user/login',
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      auth.login(response.data.user, response.data.username, response.data.token);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className=' has-text-dark '>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <label htmlFor='email'>Email</label>
          <div className='control'>
            <input
              className='input is-small'
              name='email'
              type='email'
              ref={register({ required: 'Please Enter a Valid Email' })}
            />
            <p className='has-text-danger'>{errors.email && errors.email.message}</p>
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
                required: 'Please Enter a Valid Password',
                minLength: { value: 6, message: 'miniumum of 6 characters' },
              })}
            />
            <p className='has-text-danger'>{errors.password && errors.password.message}</p>
          </div>
        </div>

        <div className='has-text-centered'>
          <input className='button is-dark is-outlined' type='submit' value='Sign In'></input>
        </div>
      </form>
      {error && <Modal title='Login Failed' message={error} stateHandler={setError} />}
    </div>
  );
}

export default Login;
