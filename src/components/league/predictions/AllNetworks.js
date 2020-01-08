import React, { useState, useEffect } from 'react';
// import Network from './SingleNetwork';
// import { networks } from '../Data';
import axios from 'axios';
const url = 'http://localhost:3000/monthlyLists';

// const AllNetworks = () => {
//   console.log('by network', 'localhost:3000/networks');
//   console.log('all networks monthly', 'localhost:3000/monthlyLists');
//   return (
//     <div className='has-text-centered'>
//       {networks.map((network, id) => {
//         return <Network key={id} id={network.id} shows={network.shows} />;
//       })}
//     </div>
//   );
// };

// export default AllNetworks;

const AllNetworks = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async resource => {
      const response = await axios.get(url);
      setResources(response.data);
      console.log(response.data);
    })();
  }, []);
  return (
    <ul>
      {resources.map(record => (
        <li key={record._id}>{record.title}</li>
      ))}
    </ul>
  );
};

export default AllNetworks;
