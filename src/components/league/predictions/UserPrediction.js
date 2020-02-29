import React, { useState, useContext } from 'react';
import useForm from 'react-hook-form';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

export default function App({ shows, lid, networkNumber, members, changes }) {
  const [currentData, setCurrentData] = useState({});
  const auth = useContext(AuthContext);
  const { register, handleSubmit, watch } = useForm();
  // const { register, handleSubmit, watch, errors } = useForm();
  const watchAllFields = watch();

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  const onSubmit = async data => {
    try {
      await axios.patch(`http://localhost:5000/leagues/${lid}/predictions`, {
        predictions: { network: networkNumber, shows: Object.values(data) },
        currentNetwork: networkNumber,
        userId: auth.userId
      });
      // console.log(response.data.league.members);
      // response.json({ message: response.data.league.members });
      setCurrentData(watchAllFields); // so we can tell if data has been submitted by user or not yet
      changes(); // so parent can update
      // history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const member = members.find(({ memberId }) => memberId[0]._id === auth.userId);

  const networkFinder = member.predictions.find(({ network }) => network === networkNumber);

  const isEqual = (obj1, obj2) => {
    let obj1Keys = Object.keys(obj1);
    let obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length)
      for (let objKey of obj1Keys) {
        if (obj1[objKey] !== obj2[objKey]) {
          return false;
        }
      }
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {shows.map((show, i) => (
        <div key={i} className='field'>
          <label className='label'>{show.show}</label>
          <div className='control'>
            <div className='select'>
              <select
                name={show.show}
                // update each show's default value to match what user has already predicted
                defaultValue={networkFinder === undefined ? 0 : networkFinder.shows[i]}
                ref={register({ required: true })}
              >
                <option value='0'>Please Select One</option>
                <option value='1e'>1 Episode</option>
                <option value='2e'>2 Episodes</option>
                <option value='3e'>3 Episodes</option>
                <option value='4e'>4 Episodes</option>
                <option value='5e'>5 Episodes</option>
                <option value='6e'>6 Episodes</option>
                <option value='7e'>7 Episodes</option>
                <option value='8e'>8 Episodes</option>
                <option value='9e'>9 Episodes</option>
                <option value='10e'>10 Episodes</option>
                <option value='11e'>11 Episodes</option>
                <option value='12e'>12 Episodes</option>
                <option value='13e'>13 Episodes</option>
                <option value='14e'>14 Episodes</option>
                <option value='15e'>15 Episodes</option>
                <option value='16e'>16 Episodes</option>
                <option value='17e'>17 Episodes</option>
                <option value='18e'>18 Episodes</option>
                <option value='19e'>19 Episodes</option>
                <option value='20e'>20 Episodes</option>
                <option value='21e'>21 Episodes</option>
                <option value='22e'>22 Episodes</option>
                <option value='23e'>23 Episodes</option>
                <option value='24e'>24 Episodes</option>
                <option value='25e'>25 Episodes</option>
                <option value='26e'>26 Episodes</option>
                <option value='27e'>27 Episodes</option>
                <option value='28e'>28 Episodes</option>
                <option value='29e'>29 Episodes</option>
                <option value='30e'>30 Episodes</option>
                <option value='2s'>2 Seasons</option>
                <option value='2.5s'>2.5 Seasons</option>
                <option value='3s'>3 Seasons</option>
                <option value='3.5s'>3.5 Seasons</option>
                <option value='4s'>4 Seasons</option>
                <option value='4.5s'>4.5 Seasons</option>
                <option value='5s'>5 Seasons</option>
                <option value='5.1s'>5+ Seasons</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <div className='field'>
        <div className='control'>
          <button type='submit' className='button is-link'>
            Submit
          </button>
          {isEqual(watchAllFields, currentData) ? (
            <p className='has-text-success'>&ensp; saved</p>
          ) : (
            <p className='has-text-danger'>&ensp;not saved</p>
          )}
        </div>
      </div>
    </form>
  );
}
