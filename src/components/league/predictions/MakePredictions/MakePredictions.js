import React, { useState } from 'react';
import UserPrediction from '../UserPrediction';
import Pagination from '../../../shared/Pagination';
import Person from '../../../../assets/Person';
import Antenna from '../../../../assets/Antenna';

import './MakePredictions.css';
/* <link href="https://css.gg/css?=|chevron-left|chevron-right" rel="stylesheet" /> */

const MakePredictions = ({ lid, startDate, networks, members, changes, toggles }) => {
  const [currentNetwork, setCurrentNetwork] = useState(1);
  const [networksPerPage] = useState(1);

  // Get current posts
  const indexOfLastPost = currentNetwork * networksPerPage;
  const indexOfFirstPost = indexOfLastPost - networksPerPage;
  const currentNetworks = networks.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentNetwork(pageNumber);

  const prevNetwork = () => {
    if (currentNetwork > 1) setCurrentNetwork(currentNetwork - 1);
  };

  const nextNetwork = () => {
    if (currentNetwork < networks.length) setCurrentNetwork(currentNetwork + 1);
  };

  let leftArrowClass = 'has-text-grey-lighter';
  if (currentNetwork > 1) leftArrowClass = 'has-text-info is-clickable';

  let rightArrowClass = 'has-text-grey-lighter';
  if (currentNetwork < networks.length) rightArrowClass = 'has-text-info is-clickable';

  return (
    <div className='columns'>
      <div className='column'></div>
      <div id='predictions-width' className='column '>
        <div className='has-text-centered'>
          <Antenna size={22} />
        </div>
        <div className='box'>
          <h3 className='title has-text-centered is-3 has-text-grey-darker'>Make Predicitons</h3>

          {currentNetworks.map((network, index) => (
            <React.Fragment key={network._id}>
              <Pagination
                networks={networks}
                networksPerPage={networksPerPage}
                totalNetworks={networks.length}
                paginate={paginate}
              />
              <h2 className='is-size-4 has-text-primary'>{network.network}</h2>
              <UserPrediction
                lid={lid}
                networkNumber={currentNetwork - 1}
                members={members}
                shows={network.shows}
                changes={changes}
                toggles={toggles}
              />
              <div className='has-text-centered'>
                <span onClick={prevNetwork} className={`icon ${leftArrowClass}`}>
                  <i className='gg-chevron-left'></i>
                </span>
                <span>&emsp; &emsp;</span>
                <span onClick={nextNetwork} className={`icon ${rightArrowClass}`}>
                  <i className='gg-chevron-right'></i>
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      )
      <div className='column'>
        <div className='has-svg has-text-centered'>
          <Person size={55} />
        </div>
      </div>
    </div>
  );
};

export default MakePredictions;
