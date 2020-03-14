import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Box from '../../shared/Box';
import Modal from '../../shared/Modal';
import ChangeDate from './ChangeDate';

const Commissioner = ({ league }) => {
  const [changeDate, setChangeDate] = useState(false);
  let { url } = useRouteMatch();

  function changeHandler() {
    setChangeDate(true);
  }

  return (
    <div className='columns has-text-dark'>
      <div className='column'></div>
      <div className='column is-half has-text-centered'>
        <Box>
          <ul>
            <li>League Name: {league.leagueName}</li>
            <br />
            <li>League ID: {league._id}</li>
            <br />
            <li>--Invite Users (9/9 remaining)</li>
            <br />
            <li>
              --Start Date: {new Date(league.startDate).toLocaleString()}{' '}
              <span
                className='is-clickable has-text-link has-text-weight-bold'
                onClick={changeHandler}
              >
                *Change*
              </span>
            </li>
            <li>
              Can set Start Date to a future date to keep predictions open for that long / reopen
              closed predictions. Or you can set it to any day in the past to close predictions for
              all users.
            </li>
            <br />
            <li>--Choose Networks</li>
            <br />
            <li>--Add Network</li>
            <br />
            <li>--Add Show</li>
            <br />
            <br />
            <li>
              <p className='has-text-danger'>
                WARNING: This Following Action Can Not Be Undone. All predictions for this user and
                associations with this league will be lost forever.
              </p>
              <Link to={`${url}/removeUser`}>Remove a user from league</Link>
            </li>
            <br />
            <li>
              <p className='has-text-danger'>
                WARNING: This Following Action Can Not Be Undone. All league information(including
                name and id), user predictions, and user associations with this league will be lost
                forever.
              </p>
              <Link to={`${url}/removeLeague`}>Delete This Entire League</Link>
            </li>
          </ul>
        </Box>
      </div>
      <div className='column'></div>
      {changeDate && (
        <Modal title='Change Start Date' stateHandler={setChangeDate}>
          <ChangeDate id={league._id} />
          <br />
          <span>
            **After hitting the submit button, changes may not be seen until after the page is
            refreshed.
          </span>
        </Modal>
      )}
    </div>
  );
};

export default Commissioner;
