import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import axios from 'axios';

const ForgotPassword = () => {
  const { register, handleSubmit, errors } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async data => {
    try {
      const response = await axios.post(`http://localhost:5000/user/resetPassword`, {
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
        <form id='passwordReset' onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label htmlFor='email'>Enter the email address associated with your account</label>
            <div className='control'>
              <input
                className='input is-small'
                name='email'
                type='email'
                ref={register({ required: 'Please Enter a Valid Email' })}
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

export default ForgotPassword;
