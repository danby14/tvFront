import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';

import Box from '../shared/Box';

const Contact = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async data => {
    setSuccess(false);
    setError(false);
    try {
      const response = await axios.post(`${BASE_URL}/email/contact`, {
        reason: data.reason,
        username: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      setSuccess(response.data.msg);
      reset();
    } catch (err) {
      setSuccess(false);
      console.error(err.response.data.errors.message.message);
      setError(err.response.data.errors.message.message);
    }
  };

  return (
    <div className='container'>
      <div className='columns is-centered is-gapless is-lower is-mobile'>
        <div className='column is-11-mobile is-7-tablet is-6-desktop is-5-widescreen'>
          <Box svgSize={28}>
            <p className='title has-text-info is-outlined'>Contact Us</p>
            <form className='has-text-left' onSubmit={handleSubmit(onSubmit)}>
              <div className='field'>
                <label htmlFor='reason' className='label'>
                  Reason
                </label>
                <label className='radio'>
                  <input
                    {...register('reason', { required: 'Please Choose One' })}
                    type='radio'
                    value='Bugs'
                    className='mr-1'
                  />
                  Bugs
                </label>
                <label className='radio'>
                  <input
                    {...register('reason', { required: 'Please Choose One' })}
                    type='radio'
                    value='Feedback'
                    className='mr-1'
                  />
                  Feedback
                </label>
                <label className='radio'>
                  <input
                    {...register('reason', { required: 'Please Choose One' })}
                    type='radio'
                    value='Suggestions'
                    className='mr-1'
                  />
                  Suggestions
                </label>
                <label className='radio'>
                  <input
                    {...register('reason', { required: 'Please Choose One' })}
                    type='radio'
                    value='Add show'
                    className='mr-1'
                  />
                  Request to add a show
                </label>
                <label className='radio'>
                  <input
                    {...register('reason', { required: 'Please Choose One' })}
                    type='radio'
                    value='Show cancelled'
                    className='mr-1'
                  />
                  Report a cancelled show
                </label>
                <label className='radio'>
                  <input
                    {...register('reason', { required: true })}
                    type='radio'
                    value='Other'
                    className='mr-1'
                  />
                  Other
                </label>
                <p className='has-text-danger'>{errors.reason && errors.reason.type}</p>
              </div>

              <div className='field'>
                <label htmlFor='name' className='label'>
                  Your Name or Username
                </label>
                <input type='text' {...register('name', { required: true })} />
                <p className='has-text-danger'>{errors.name && errors.name.type}</p>
              </div>

              <div className='field'>
                <label htmlFor='email' className='label'>
                  Email
                </label>
                <input type='email' {...register('email', { required: true })} />
                <p className='has-text-danger'>{errors.email && errors.email.type}</p>
              </div>

              <div className='field'>
                <label htmlFor='subject' className='label'>
                  Subject
                </label>
                <input type='text' {...register('subject', { required: true })} />
                <p className='has-text-danger'>{errors.subject && errors.subject.type}</p>
              </div>

              <div className='field'>
                <label htmlFor='message' className='label'>
                  Message
                </label>
                <textarea
                  {...register('message', { required: true, maxLength: 500 })}
                  placeholder='max 500 characters'
                  className='textarea'
                />
                <p className='has-text-danger'>{errors.message && errors.message.type}</p>
              </div>

              <input type='submit' className='button' />
            </form>
            <p className='has-text-info'>{success}</p>
            <div className='has-text-danger'>{error}</div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Contact;
