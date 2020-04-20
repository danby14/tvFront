import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Box from '../../shared/Box';
import Modal from '../../shared/Modal';
import ChangePredictions from './ChangePredictions';

const Commissioner = ({ league, networks, toggles, changes }) => {
  const [enablePredictions, setEnablePredictions] = useState(false);
  let { url } = useRouteMatch();

  function changePredictionsHandler() {
    setEnablePredictions(true);
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
            <li>--Start Date: {new Date(league.startDate).toLocaleString()}</li>
            <li>
              Can set Start Date to a future date to keep predictions open for that long / reopen
              closed predictions. Or you can set it to any day in the past to close predictions for
              all users.
            </li>
            <br />
            <li>--Choose Networks</li>
            <br />
            <li>
              --Open Up Predictions for Individual Shows
              <span
                className='is-clickable has-text-link has-text-weight-bold'
                onClick={changePredictionsHandler}
              >
                *Change*
              </span>
            </li>
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
      {enablePredictions && (
        <Modal title='Enable/Disable Individual Predictions' stateHandler={setEnablePredictions}>
          <ChangePredictions
            currentStartDate={league.startDate}
            id={league._id}
            toggles={toggles}
            networks={networks}
            changes={changes}
          />
          <br />
          <span>
            **After hitting the enter button, changes may not be seen until after the page is
            refreshed.
          </span>
        </Modal>
      )}
    </div>
  );
};

export default Commissioner;
