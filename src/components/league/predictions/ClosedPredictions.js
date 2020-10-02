import React from 'react';
import Person from '../../../assets/Person';
import Antenna from '../../../assets/Antenna';

const ClosedPredictions = () => {
  return (
    <div className='container pt-4 px-4'>
      <div className='columns'>
        <div className='column'></div>
        <div className='column is-6-tablet is-5'>
          <div className='has-text-centered'>
            <Antenna size={28} />
          </div>
          <div className='box'>
            <h3 className='title has-text-centered is-4 has-text-info'>Predictions are closed.</h3>
            <h2 className='subtitle has-text-centered is-5 has-text-grey'>
              The commissioner can choose to reopen them for edits or to add mid-season shows of
              their choosing (as they become available). So you are set for now, but stay informed
              of all league happenings and don't get left behind.
            </h2>
          </div>
        </div>
        )
        <div className='column'>
          <div className='has-svg has-text-centered'>
            <Person size={55} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedPredictions;
