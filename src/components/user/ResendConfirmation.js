import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import axios from 'axios';

const ResendConfirmation = ({ submitted, setSubmitted }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async data => {
    try {
      const response = await axios.post(`${BASE_URL}/user/resendConfirmation`, {
        email: data.email,
      });
      setSubmitted(true);
      setSuccess(response.data.msg);
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  if (!submitted) {
    return (
      <>
        <form id='resendConfirmation' onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label htmlFor='email'>Enter the email address you would like to verify</label>
            <div className='control'>
              <input
                className='input is-small'
                {...register('email', { required: 'Please Enter a Valid Email' })}
                type='email'
              />
              <p className='has-text-danger'>{errors.email && errors.email.message}</p>
              <p className='has-text-danger'>{error}</p>
            </div>
          </div>
        </form>
      </>
    );
  } else {
    return <div>{success}</div>;
  }
};

export default ResendConfirmation;
