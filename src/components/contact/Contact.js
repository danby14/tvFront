import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';

import Box from '../shared/Box';

const Contact = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { register, handleSubmit, reset, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async data => {
    setSuccess(false);
    setError(false);
    try {
      const response = await axios.post(`${BASE_URL}/admin/contact`, {
        reason: data.reason,
        name: data.name,
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
    <div className='columns is-gapless is-lower is-mobile'>
      <div className='column'></div>
      <div className='column is-11-mobile is-7-tablet is-6-desktop is-5-widescreen'>
        <Box svgSize={28}>
          <p className='title has-text-primary is-outlined'>Contact Us</p>
          <form className='has-text-left' onSubmit={handleSubmit(onSubmit)}>
            <div className='field'>
              <label htmlFor='reason' className='label'>
                Reason
              </label>
              <label className='radio'>
                <input
                  name='reason'
                  type='radio'
                  value='Bugs'
                  className='mr-1'
                  ref={register({ required: 'Please Choose One' })}
                />
                Bugs
              </label>
              <label className='radio'>
                <input
                  name='reason'
                  type='radio'
                  value='Feedback'
                  className='mr-1'
                  ref={register({ required: 'Please Choose One' })}
                />
                Feedback
              </label>
              <label className='radio'>
                <input
                  name='reason'
                  type='radio'
                  value='Suggestions'
                  className='mr-1'
                  ref={register({ required: 'Please Choose One' })}
                />
                Suggestions
              </label>
              <label className='radio'>
                <input
                  name='reason'
                  type='radio'
                  value='Add show'
                  className='mr-1'
                  ref={register({ required: 'Please Choose One' })}
                />
                Request to add show
              </label>
              <label className='radio'>
                <input
                  name='reason'
                  type='radio'
                  value='Show cancelled'
                  className='mr-1'
                  ref={register({ required: 'Please Choose One' })}
                />
                This show got cancelled
              </label>
              <label className='radio'>
                <input
                  name='reason'
                  type='radio'
                  value='Other'
                  className='mr-1'
                  ref={register({ required: true })}
                />
                Other
              </label>
              <p className='has-text-danger'>{errors.reason && errors.reason.type}</p>
            </div>

            <div className='field'>
              <label htmlFor='name' className='label'>
                Your Name or Username
              </label>
              <input type='text' name='name' ref={register({ required: true })} />
              <p className='has-text-danger'>{errors.name && errors.name.type}</p>
            </div>

            <div className='field'>
              <label htmlFor='email' className='label'>
                Email
              </label>
              <input type='email' name='email' ref={register({ required: true })} />
              <p className='has-text-danger'>{errors.email && errors.email.type}</p>
            </div>

            <div className='field'>
              <label htmlFor='subject' className='label'>
                Subject
              </label>
              <input type='text' name='subject' ref={register({ required: true })} />
              <p className='has-text-danger'>{errors.subject && errors.subject.type}</p>
            </div>

            <div className='field'>
              <label htmlFor='message' className='label'>
                Message
              </label>
              <textarea
                name='message'
                placeholder='max 500 characters'
                className='textarea'
                ref={register({ required: true, maxLength: 500 })}
              />
              <p className='has-text-danger'>{errors.message && errors.message.type}</p>
            </div>

            <input type='submit' className='button' />
          </form>
          <p className='has-text-info'>{success}</p>
          <div className='has-text-danger'>{error}</div>
        </Box>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default Contact;
