import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import axios from 'axios';
import useForm from 'react-hook-form';

const ChangePredictions = ({ id, networks, toggles }) => {
  const auth = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    try {
      let submittedChanges = Object.values(data);
      let updatedToggles = networks.map((network, i) => {
        return {
          shows: network.shows.map((show, j) => {
            return submittedChanges[i].includes(j.toString()) ? true : false;
          }),
          network: i
        };
      });
      await axios.patch(`http://localhost:5000/leagues/${id}/togglePredictions`, {
        predictionEdits: updatedToggles
      });
      setSubmitted(true);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
