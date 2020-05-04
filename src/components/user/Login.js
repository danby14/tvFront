import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import Modal from '../shared/Modal';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import ForgotPassword from './ForgotPassword';

function Login() {
  const auth = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, errors } = useForm();

  const handleClick = () => {
    setSubmitted(null);
    setResetPassword(true);
  };

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/user/login',
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      setIsLoading(false);
      auth.login(response.data.user, response.data.username, response.data.token);
    } catch (err) {
      setError(err.response.data);
      setIsLoading(false);
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
          <button
            className={`button is-dark is-outlined  ${isLoading ? 'is-loading' : ''}`}
            type='submit'
          >
            Sign In
          </button>

          <section className='has-text-info is-clickable has-text-right' onClick={handleClick}>
            forgot password?
          </section>
        </div>
      </form>
      {resetPassword && (
        <Modal
          title='Forgot Password'
          stateHandler={setResetPassword}
          success
          form='passwordReset'
          submitted={submitted}
        >
          <ForgotPassword submitted={submitted} setSubmitted={setSubmitted} />
        </Modal>
      )}
      {error && <Modal title='Login Failed' message={error} stateHandler={setError} />}
    </div>
  );
}

export default Login;
