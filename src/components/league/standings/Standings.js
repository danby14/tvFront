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

  const findClosest = (users, result, s) => {
    // const usersAdjusted = users.map(user =>
    //   user.endsWith('e') ? user.slice(0, -1) * 1 : user.slice(0, -1) * 20
    // );
    // const closestNumber = usersAdjusted.reduce((prev, curr) =>
    //   Math.abs(curr - result) < Math.abs(prev - result) ? curr : prev
    // );
    // console.log('user', users, result, s);
    // console.log(
    //   'closest',
    //   closestNumber < 36 ? closestNumber + 'e' : closestNumber / 20 + 's'
    // );
    // return closestNumber < 36 ? closestNumber + 'e' : closestNumber / 20 + 's';
  };

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

              <table className='table is-fullwidth is-hoverable is-narrow'>
                <thead>
                  <tr>
                    <th></th>
                    {members.map(member => (
                      <th key={member.memberId}>{member.username}</th>
                    ))}

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
                            <td>{show.show}</td>
                            <>
                              {members.map((member, m) => {
                                // find if predictions were made for that network
                                const findPredictions = member.predictions.find(
                                  ({ network }) => network === n
                                );
                                return (
                                  <td key={`${n}${s}${m}`}>
                                    {/* add logic from codewars.js file to calculate closest prediction, current logic is only for exact matches */}
                                    {/* after logic is added, will need to push winner to a new totals array or add to it if are already in it. then add total wins array to bottom of standings*/}
                                    {findPredictions ? (
                                      findPredictions.shows[s] ===
                                      findClosest(
                                        findPredictions.shows[s],
                                        show.finalResult,
                                        [s]
                                      ) ? (
                                        <p className='has-text-success'>
                                          {findPredictions.shows[s]}
                                        </p>
                                      ) : (
                                        findPredictions.shows[s]
                                      )
                                    ) : (
                                      0
                                    )}
                                    {/* above code will only show predictions made by users and make empty predictions default to 0 */}
                                  </td>
                                );
                              })}
                            </>
                            {show.finalResult > 0 ? (
                              <td className='has-text-success'>
                                {show.finalResult}
                              </td>
                            ) : (
                              <td>tbd</td>
                            )}
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
