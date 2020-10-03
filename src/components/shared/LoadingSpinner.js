import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className='container'>
      <div className='columns is-centered'>
        <div className='column has-text-dark has-text-centered'>
          <button className='button is-loading isLoading-button'>Loading</button>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
