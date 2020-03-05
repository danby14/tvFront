import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Commissioner = () => {
  let { url } = useRouteMatch();

  return (
    <div className='columns has-text-dark'>
      <div className='column'></div>
      <div className='column has-text-centered'>
        <ul>
          <li>--Invite Users (9/9 remaining)</li>
          <li>--Change start date</li>
          <li>--Allow Users to Update Predictions</li>
          <li>--Choose Networks</li>
          <li>--Add Network</li>
          <li>--Add Show</li>
          <br />
          <br />
          <li>
            <p className='has-text-danger'>
              WARNING: This Following Action Can Not Be Undone. All league information(including
              name and id), user predictions, and user associations with this league will be lost
              forever.
            </p>
            <Link to={`${url}/removeLeague`}>Delete This Entire League</Link>
          </li>
          <br />
          <li>
            <p className='has-text-danger'>
              WARNING: This Following Action Can Not Be Undone. All predictions for this user and
              associations with this league will be lost forever.
            </p>
            <Link to={`${url}/removeUser`}>Remove a user from league</Link>
          </li>
        </ul>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default Commissioner;
