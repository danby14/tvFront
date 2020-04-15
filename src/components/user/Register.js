import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import Modal from '../shared/Modal';

import axios from 'axios';
import { useForm } from 'react-hook-form';

function Register() {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    try {
      const response = await axios.post('http://localhost:5000/user/register', {
        username: data.username,
        email: data.email,
        password: data.password,
        birthdate: data.birthdate,
        gender: data.gender,
        optIn: data.optIn
      });
      auth.login(response.data.user, response.data.username, response.data.token);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className='has-text-dark '>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <label htmlFor='username'>Username</label>
          <div className='control'>
            <input
              className='input is-small'
              name='username'
              type='text'
              ref={register({
                required: 'Please Enter a Valid Username',
                maxLength: { value: 20, message: 'max of 20 characters' }
              })}
            />
            {console.log(errors)}
            <p className='has-text-danger'>{errors.username && errors.username.message}</p>
          </div>
        </div>

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
                minLength: { value: 6, message: 'minimum of 6 characters' }
              })}
            />
            <p className='has-text-danger'>{errors.password && errors.password.message}</p>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='birthdate'>Birthdate</label>
          <div className='control'>
            <input
              className='input is-small'
              name='birthdate'
              type='date'
              ref={register({ required: 'Please Enter a Valid Date' })}
            />
            <p className='has-text-danger'>{errors.birthdate && errors.birthdate.message}</p>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='gender'>Gender</label>
          <div className='control'>
            <select
              className='select is-small'
              name='gender'
              type='select'
              ref={register({ required: 'Please Choose One' })}
            >
              <option value='M'>Male</option>
              <option value='F'>Female</option>
              <option value='O'>Other</option>
              <option value='N/A'>I'd rather not say</option>
            </select>
            <p className='has-text-danger'>{errors.gender && errors.gender.message}</p>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='optIn'>Opt-in to future newsletters</label>
          <div className='control'>
            <label className='radio'>
              &nbsp;
              <input
                name='optIn'
                type='radio'
                value='true'
                ref={register({ required: 'Please Choose One' })}
              />
              {' Yes  '}&nbsp;
            </label>
            <label className='radio'>
              <input
                name='optIn'
                type='radio'
                value='false'
                ref={register({ required: 'Please Choose One' })}
              />
              {' No'}
            </label>
            <p className='has-text-danger'>{errors.optIn && errors.optIn.message}</p>
          </div>
        </div>

        <div className='has-text-centered'>
          <input className='button is-dark is-outlined' type='submit' value='Register'></input>
        </div>
      </form>
      {error && <Modal title='Registration Failed' message={error} stateHandler={setError} />}
    </div>
  );
}

export default Register;
