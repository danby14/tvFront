import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Box from '../../shared/Box';
import Modal from '../../shared/Modal';
import ChangeLeaguePassword from './ChangeLeaguePassword';
import ChangePredictions from './ChangePredictions';

const Commissioner = ({ league, networks, toggles, changes }) => {
  const [enablePredictions, setEnablePredictions] = useState(false);
  const [enablePasswordUpdater, setEnablePasswordUpdater] = useState(false);
  let { url } = useRouteMatch();

  function changePredictionsHandler() {
    setEnablePredictions(true);
  }

  function updatePasswordHandler() {
    setEnablePasswordUpdater(true);
  }

  return (
    <div className='columns has-text-dark'>
      <div className='column'></div>
      <div className='column is-half'>
        <Box>
          <ul className='has-text-left'>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>League Name:</p>
              {league.leagueName}
            </li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>League ID:</p>
              {league._id}
            </li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>League Password:</p> {league.password}
              <span onClick={updatePasswordHandler} className='has-text-link is-clickable'>
                &nbsp; Change
              </span>
            </li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>Invite Users</p>
              {10 - league.members.length}/10 slots remaining
            </li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>Start Date:</p>
              {new Date(league.startDate).toLocaleString()}
            </li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium pb-1'>
                Change Start Date / Available Predictions:
              </p>
              <span
                className='is-clickable has-text-link has-text-weight-bold is-size-5'
                onClick={changePredictionsHandler}
              >
                ⇒ Change ⇐
              </span>
              <ul className='has-text-info pt-1'>
                <li>▫ Can reopen or extend Start Date by choosing a future date.</li>
                <li>▫ Can close predictions for all users by choosing a date in the past.</li>
                <li>▫ Can close predictions for certain shows by unchecking their boxes.</li>
                <li>▫ Can open predictions for newly added shows by checking their boxes.</li>
                <li className='pl-4'>
                  ↳ Make sure all other boxes are unchecked if you don't want already predicted
                  shows to open back up.
                </li>
              </ul>
            </li>
            <li className='pb-2'>
              <p className='is-size-5 has-text-weight-medium'>League Created:</p>
              {new Date(league.createdAt).toLocaleString().split(',')[0]}
            </li>
            <li className='has-text-danger is-size-5 has-text-centered pb-3'>⇓ DANGER ZONE ⇓</li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>Remove a User from this League:</p>
              <p className='has-text-danger pb-1'>
                WARNING: The Following Action Can Not Be Undone. All predictions for this user and
                associations with this league will be lost forever.
              </p>
              <Link to={`${url}/removeUser`} className='has-text-weight-medium'>
                Remove a User
              </Link>
            </li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>Delete this League from Existence:</p>
              <p className='has-text-danger pb-1'>
                WARNING: The Following Action Can Not Be Undone. All league information(including
                name and id), user predictions, and user associations with this league will be lost
                forever.
              </p>
              <Link to={`${url}/removeLeague`} className='has-text-weight-medium'>
                Delete This Entire League
              </Link>
            </li>
          </ul>
        </Box>
      </div>
      <div className='column'></div>
      {enablePredictions && (
        <Modal
          title='Enable/Disable Individual Predictions'
          stateHandler={setEnablePredictions}
          success
          form='changePredictions'
        >
          <ChangePredictions
            currentStartDate={league.startDate}
            id={league._id}
            toggles={toggles}
            networks={networks}
            changes={changes}
          />
        </Modal>
      )}
      {enablePasswordUpdater && (
        <Modal
          title='Update League Password'
          stateHandler={setEnablePasswordUpdater}
          success
          form='changePassword'
        >
          <ChangeLeaguePassword id={league._id} currentPass={league.password} changes={changes} />
        </Modal>
      )}
    </div>
  );
};

export default Commissioner;
