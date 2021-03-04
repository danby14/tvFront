import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ChangePredictions = ({
  id,
  networks,
  toggles,
  changes,
  currentStartDate,
  submitted,
  setSubmitted,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const { control, register, handleSubmit, errors } = useForm();

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
          network: i,
        };
      });
      await axios.patch(`${BASE_URL}/leagues/${id}/togglePredictions`, {
        predictionEdits: updatedToggles,
        startDate: data.startDate,
      });
      setSubmitted(true);
      changes(); // so parent can update
    } catch (err) {
      console.log(err.response.data);
    }
  };

  if (!submitted) {
    return (
      <form id='changePredictions' onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <label htmlFor='startDate'>Choose date when predictions must be submitted by.</label>
          <div className='control'>
            <Controller
              control={control}
              defaultValue={new Date(currentStartDate)}
              name='startDate'
              render={props => (
                <ReactDatePicker
                  className='input'
                  placeholderText='Click to select a date'
                  onChange={e => props.onChange(e)}
                  selected={props.value}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  dateFormat=' MMMM d, yyyy'
                  todayButton='Today'
                />
              )}
              rules={{
                required: 'Please enter a Valid Date',
              }}
              className='input is-small'
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
      </form>
    );
  } else {
    return <div>Changes saved!</div>;
  }
};

export default ChangePredictions;
