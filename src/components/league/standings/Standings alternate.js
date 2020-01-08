import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './standings2.css';

const Standings2 = ({ members, listId }) => {
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get`http://localhost:5000/monthlyLists/5dfa5a75746fa43e8c3dbdbe`;
        setNetworks(response.data.networks);
      } catch (err) {}
    };
    fetchList();
  }, [listId]);

  return (
    <>
      {networks.length !== 0 && (
        <div className='table-container'>
          <table className='table is-fullwidth is-hoverable'>
            <thead>
              <tr>
                <th></th>
                {networks.map(network => (
                  <>
                    <th className='has-text-primary blah'>{network.network}</th>
                    {network.shows.map(show => (
                      <th className='blah'>{show}</th>
                    ))}
                  </>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                {/* <td className='has-text-primary'>{network.network}</td> */}
              </tr>

              {members.map(member => (
                <tr>
                  <td> {member.username}</td>
                  {member.predictions.map(prediction => (
                    <td>{prediction}</td>
                  ))}
                </tr>
              ))}

              <tr>
                <td>Finals Result</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Standings2;
