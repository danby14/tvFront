import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Standings = ({ members, listId }) => {
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

  const members1 = members.map(member => member.username);

  return (
    <>
      {networks.length !== 0 && (
        <div className='table-container'>
          {/* {console.log(members.map(member => member.predictions))} */}
          <table className='table is-fullwidth is-hoverable is-narrow'>
            <thead>
              <tr>
                <th></th>
                <th>{members1[0]}</th>
                <th>{members1[1]}</th>
                <th>{members1[2]}</th>
                <th>{members1[3]}</th>
                <th>{members1[4]}</th>
                <th>{members1[5]}</th>
                <th>{members1[6]}</th>
                <th>{members1[7]}</th>
                <th>{members1[8]}</th>
                <th>{members1[9]}</th>
                <th>Final Result</th>
              </tr>
            </thead>

            <tbody>
              {networks.map((network, n) => (
                <React.Fragment key={n}>
                  <tr>
                    <td className='has-text-primary'>{network.network}</td>
                  </tr>
                  <>
                    {network.shows.map((show, s) => (
                      <tr key={`${n}${s}`}>
                        <td>{show}</td>
                        <>
                          {members.map((member, m) => (
                            <td key={`${n}${s}${m}`}>
                              {member.predictions[n][s]}
                            </td>
                          ))}
                        </>
                      </tr>
                    ))}
                  </>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Standings;
