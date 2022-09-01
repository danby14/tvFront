import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import Modal from '../shared/Modal';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays, subYears } from 'date-fns';

function Register() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {
    control,
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/register`,
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
              {...register('username', {
                required: 'Please Enter a Valid Username',
                minLength: { value: 3, message: 'min of 3 characters' },
                maxLength: { value: 20, message: 'max of 20 characters' },
                validate: value =>
                  value.match(/[a-z0-9]+/i) + '' === value || 'Letters and numbers only',
              })}
              type='text'
            />
            <p className='has-text-danger'>{errors.username && errors.username.message}</p>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='email'>Email</label>
          <div className='control'>
            <input
              className='input is-small'
              {...register('email', { required: 'Please Enter a Valid Email' })}
              type='email'
            />
            <p className='has-text-danger'>{errors.email && errors.email.message}</p>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='password'>Password</label>
          <div className='control'>
            <input
              className='input is-small'
              {...register('password', {
                required: 'Please Enter a Valid Password',
                minLength: { value: 6, message: 'minimum of 6 characters' },
              })}
              type='password'
            />
            <p className='has-text-danger'>{errors.password && errors.password.message}</p>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='password2'>Confirm Password</label>
          <div className='control'>
            <input
              className='input is-small'
              {...register('password2', {
                required: 'Please confirm password!',
                validate: {
                  matchesPreviousPassword: value => {
                    const { password } = getValues();
                    return password === value || 'Passwords do not match!';
                  },
                },
              })}
              type='password'
            />
            <p className='has-text-danger'>{errors.password2 && errors.password2.message}</p>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='birthdate'>Birthdate</label>
          <div className='control'>
            <Controller
              control={control}
              defaultValue={subYears(new Date(), 18)}
              name='birthdate'
              render={({ field }) => (
                <ReactDatePicker
                  className='input'
                  placeholderText='Click to select a date'
                  onChange={e => field.onChange(e)}
                  selected={field.value}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  dateFormat=' MMMM d, yyyy'
                  maxDate={new Date()}
                />
              )}
              rules={{
                required: 'Please enter a Valid Date',
                validate: value =>
                  new Date(value).getTime() < subDays(new Date(), 365) ||
                  `Ga ga goo goo (no babies allowed)`,
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
              {...register('gender', { required: 'Please Choose One' })}
              type='select'
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
                {...register('optIn', { required: 'Please Choose One' })}
                type='radio'
                value='true'
              />
              {' Yes  '}&nbsp;
            </label>
            <label className='radio'>
              <input
                {...register('optIn', { required: 'Please Choose One' })}
                type='radio'
                value='false'
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
