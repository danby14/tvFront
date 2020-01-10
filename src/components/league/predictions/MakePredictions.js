import React from 'react';
import UserPrediction from './UserPrediction';

// maybe use paginations so user sees 1 network to predict at a time

const MakePredictions = ({ networks }) => {
  return (
    <div className='content'>
      <h1>MAKE PREDICTIONS</h1>
      {networks.map(network => (
        <>
          <h2 className='has-text-primary'>{network.network}</h2>
          <UserPrediction shows={network.shows} />
        </>
      ))}
    </div>
  );
};

export default MakePredictions;
