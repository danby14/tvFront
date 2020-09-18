import React from 'react';
import { useForm } from 'react-hook-form';

const Research = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='field-body'>
        <div className='field'>
          <label className='label'>show1</label>
          <div className='control'>
            <div className='select'>
              <select name='a' ref={register({ required: true })}>
                <option value='0'>Please Select One</option>
                <option value='1e'>1 Episode</option>
              </select>
            </div>
          </div>
        </div>
        <div className='field'>
          <label className='label'>show1</label>
          <div className='control'>
            <div className='select'>
              <select name='a' ref={register({ required: true })}>
                <option value='0'>Please Select One</option>
                <option value='1e'>1 Episode</option>
              </select>
            </div>
          </div>
        </div>
        <div className='field'>
          <label className='label'>show1</label>
          <div className='control'>
            <div className='select'>
              <select name='a' ref={register({ required: true })}>
                <option value='0'>Please Select One</option>
                <option value='1e'>1 Episode</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='field'>
        <div className='control'>
          <button type='submit' className='button is-link'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Research;
