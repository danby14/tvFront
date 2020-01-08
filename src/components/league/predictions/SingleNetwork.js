import React from 'react';
import ShowList from './ShowList';

const SingleNetwork = ({ id, shows }) => {
  return (
    <div className='box'>
      <h3 className='title is-4 is-spaced'>{id}</h3>
      <div className='subtitle is-6'>
        <ShowList sList={shows} />
      </div>
      {/* <button className='button is-link'>submit</button> */}
    </div>
  );
};

export default SingleNetwork;
