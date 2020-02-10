import React, { useState } from 'react';
import UserPrediction from './UserPrediction';
import Pagination from '../../shared/Pagination';

const MakePredictions = ({ networks, lid, members, changes }) => {
  const [currentNetwork, setCurrentNetwork] = useState(1);
  const [networksPerPage] = useState(1);

  // Get current posts
  const indexOfLastPost = currentNetwork * networksPerPage;
  const indexOfFirstPost = indexOfLastPost - networksPerPage;
  const currentNetworks = networks.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentNetwork(pageNumber);

  // const prevNetwork = () => {
  //   setCurrentNetwork(currentNetwork - 1);
  // };

  // const nextNetwork = () => {
  //   setCurrentNetwork(currentNetwork + 1);
  // };

  return (
    <div className='columns'>
      <div className='column'></div>
      <div className='column'>
        <div className='box'>
          <h3 className='title has-text-centered is-3 has-text-grey-darker'>
            Make Predicitons
          </h3>

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
              />
              {/* {console.log('currentNetwork', currentNetwork)} */}
              {/* <p onClick={prevNetwork}>{`<-`}</p>
              <p onClick={nextNetwork}>{`->`}</p> */}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default MakePredictions;
