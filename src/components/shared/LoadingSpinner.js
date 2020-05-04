import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className='columns'>
      <div className='column'></div>
      <div className='column has-text-dark has-text-centered'>
        <button className='button is-loading isLoading-button'>Loading</button>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default LoadingSpinner;
