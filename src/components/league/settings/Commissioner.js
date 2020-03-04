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
          <li>--Remove a User from the League</li>
          <li>
            <Link to={`${url}/removeLeague`}>
              <button className='button'>Delete League</button>
            </Link>
          </li>
          <li>
            <Link to={`${url}/removeUser`}>
              <button className='button'>Remove a user from league</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default Commissioner;
