import React, { useState } from 'react';
import UserPrediction from './UserPrediction';
import Pagination from '../../shared/Pagination';

// maybe use paginations so user sees 1 network to predict at a time

const MakePredictions = ({ networks }) => {
  const [currentNetwork, setCurrentNetwork] = useState(1);
  const [networksPerPage] = useState(1);

  // Get current posts
  const indexOfLastPost = currentNetwork * networksPerPage;
  const indexOfFirstPost = indexOfLastPost - networksPerPage;
  const currentNetworks = networks.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentNetwork(pageNumber);

  return (
    <div className='content'>
      <h1>MAKE PREDICTIONS</h1>
      {/* {networks.map(network => ( // to be used when no pagination is in place*/}
      {currentNetworks.map(network => (
        <>
          <Pagination
            networks={networks}
            networksPerPage={networksPerPage}
            totalNetworks={networks.length}
            paginate={paginate}
          />
          <h2 className='has-text-primary'>{network.network}</h2>
          <UserPrediction shows={network.shows} />
        </>
      ))}
    </div>
  );
};

export default MakePredictions;
