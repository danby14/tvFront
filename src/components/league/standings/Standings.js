import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MakePredictions from '../predictions/MakePredictions';

const Standings = ({ members, listId, lid }) => {
  const [networks, setNetworks] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/monthlyLists/${listId}`
        );
        setNetworks(response.data.networks);
        setReady(true);
      } catch (err) {}
    };
    fetchList();
  }, [listId]);

  const modeSwitcher = () => {
    setReady(!ready);
  };

  const members1 = members.map(member => member.username);

  return (
    <>
      {networks.length !== 0 && (
        <>
          {!ready && (
            <div className='columns'>
              <div className='column'></div>
              <div className='column'>
                <MakePredictions
                  members={members}
                  networks={networks}
                  lid={lid}
                />
                <button onClick={modeSwitcher}>view standings</button>
              </div>
              <div className='column'></div>
            </div>
          )}

          {ready && (
            <div className='table-container'>
              <button onClick={modeSwitcher}>make predictions</button>
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
                              {members.map((member, m) => {
                                // find if predictions were made for that network
                                const findPredictions = member.predictions.find(
                                  ({ network }) => network === n
                                );
                                return (
                                  <td key={`${n}${s}${m}`}>
                                    {/* only show predictions made by users, make empty predictions default to 0 */}
                                    {findPredictions
                                      ? findPredictions.shows[s]
                                      : 0}
                                  </td>
                                );
                              })}
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
      )}
    </>
  );
};

export default Standings;
