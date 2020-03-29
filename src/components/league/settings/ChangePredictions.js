import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import axios from 'axios';
import useForm from 'react-hook-form';

const ChangePredictions = ({ id, networks, toggles }) => {
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
      const { startDate, ...noStartDate } = data;
      let submittedChanges = Object.values(noStartDate);
      let updatedToggles = networks.map((network, i) => {
        return {
          shows: network.shows.map((show, j) => {
            return submittedChanges[i].includes(j.toString()) ? true : false;
          }),
          network: i
        };
      });
      await axios.patch(`http://localhost:5000/leagues/${id}/togglePredictions`, {
        predictionEdits: updatedToggles,
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
        <label htmlFor='startDate'>Choose date when predictions must be submitted by.</label>
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
      {networks.map((network, i) => (
        <div key={i} className='box'>
          <p className='has-text-weight-semibold'>{network.network}</p>
          {network.shows.map((show, j) => (
            <React.Fragment key={j}>
              {show.finalResult === 0 && (
                <label className='checkbox'>
                  <input
                    type='checkbox'
                    name={[network.network, network.shows.length - 1]}
                    value={j}
                    defaultChecked={toggles[i].shows[j] === true ? true : false}
                    ref={register}
                  />
                  {show.show} &ensp;
                </label>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
      {!submitted && <input className='button' type='submit' value='Submit'></input>}
    </form>
  );
};

export default ChangePredictions;
