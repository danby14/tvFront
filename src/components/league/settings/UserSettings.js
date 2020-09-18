import React from 'react';

import Box from '../../shared/Box';

function UserSettings({ league, members, lid }) {
  let timeUntilStart = new Date(league.startDate).getTime() - Date.now();
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
              <p className='is-size-5 has-text-weight-medium'>Predictions:</p>
              {timeUntilStart < 1
                ? `Closed as of ${new Date(league.startDate).toLocaleString()}`
                : `Open until ${new Date(league.startDate).toLocaleString()}`}
            </li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>Commissioner:</p>
              {members[0].memberId[0].username}
            </li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>League ID:</p>
              {lid}
            </li>
            <li className='pb-3'>
              <p className='is-size-5 has-text-weight-medium'>League Created:</p>
              {new Date(league.createdAt).toLocaleString().split(',')[0]}
            </li>
            <p className='has-text-info'>
              Please contact the commissioner if you want to be removed from this league or would
              like to request an opportunity to edit your predictions.
            </p>
          </ul>
        </Box>
      </div>
      <div className='column'></div>
    </div>
  );
}

export default UserSettings;
