import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import Modal from '../shared/Modal';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import subDays from 'date-fns/subDays';
import startOfDay from 'date-fns/startOfDay';

function Register() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { control, register, handleSubmit, reset, errors } = useForm();
  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/user/register',
        {
          username: data.username,
          email: data.email,
          password: data.password,
          birthdate: data.birthdate,
          gender: data.gender,
          optIn: data.optIn,
        },
        { withCredentials: true }
      );
      setSuccess(response.data.msg);
      reset();
      setIsLoading(false);
      // auth.login(response.data.user, response.data.username, response.data.token);
    } catch (err) {
      setError(err.response.data);
      setIsLoading(false);
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
                maxLength: { value: 20, message: 'max of 20 characters' },
              })}
            />
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
                minLength: { value: 6, message: 'minimum of 6 characters' },
              })}
            />
            <p className='has-text-danger'>{errors.password && errors.password.message}</p>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='birthdate'>Birthdate</label>
          <div className='control'>
            <Controller
              as={
                <ReactDatePicker
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  dateFormat=' MMMM d, yyyy'
                  maxDate={new Date()}
                />
              }
              control={control}
              defaultValue={startOfDay(new Date())}
              // defaultValue={new Date(new Date())}
              name='birthdate'
              valueName='selected'
              onChange={([selected]) => selected}
              rules={{
                required: 'Please enter a Valid Date',
                validate: value =>
                  new Date(value).getTime() < subDays(new Date(), 365) ||
                  `ga ga goo goo, no babies allowed`,
              }}
              className='input is-small'
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
          <button
            className={`button is-dark is-outlined ${isLoading ? 'is-loading' : ''}`}
            type='submit'
          >
            Register
          </button>
        </div>
      </form>
      {error && <Modal title='Registration Failed' message={error} stateHandler={setError} />}
      {success && (
        <Modal title='Registration Submitted' message={success} stateHandler={setSuccess} success />
      )}
    </div>
  );
}

export default Register;
