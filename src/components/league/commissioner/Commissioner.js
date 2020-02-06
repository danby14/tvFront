import React from 'react';
import { Link } from 'react-router-dom';

const Commissioner = () => {
  return (
    <div className='columns has-text-dark has-text-centered'>
      <div className='column'></div>
      <div className='column'>
        <Link to='/createLeague'>
          <li>Create New League</li>
        </Link>
        <ul>
          <li>--Choose Networks</li>
          <li>--Choose start date</li>
          <li>--Invite Users (9/9 remaining)</li>
        </ul>
        <li>Add Network</li>
        <li>Add Show</li>
        <li>Edit Predictions</li>
      </div>
    </div>
  );
};

export default Commissioner;
