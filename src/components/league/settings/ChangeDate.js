import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import axios from 'axios';
import useForm from 'react-hook-form';

const ChangeDate = ({ id }) => {
  const auth = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  const [submitted, setSubmitted] = useState(false);

  function makeISODate(date, days) {
    let timeAhead = 1000 * 60 * 60 * 24 * days;
    let offset = date.getTimezoneOffset();
    let netMilliseconds = date.getTime() - offset * 1000 * 60 + timeAhead;
    let putAsDefault = new Date(netMilliseconds).toISOString().slice(0, -8);
    return putAsDefault;
  }

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    try {
      await axios.patch(`http://localhost:5000/leagues/${id}/upDate`, {
        startDate: data.startDate
      });
      setSubmitted(true);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='field'>
        <label htmlFor='startDate'>Choose new start date.</label>
        <div className='control'>
          <input
            className='input is-small'
            name='startDate'
            type='datetime-local'
            defaultValue={makeISODate(new Date(), 0)}
            ref={register({ required: 'Please enter a valid date.' })}
          />
          <p className='has-text-danger'>{errors.startDate && errors.startDate.message}</p>
        </div>
      </div>
      {!submitted && <input className='button' type='submit' value='Submit'></input>}
    </form>
  );
};

export default ChangeDate;
