import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MakePredictions from '../predictions/MakePredictions';

const Standings5 = ({ members, listId, lid, lgName }) => {
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

  // get predictions for all users, besides user 0
  const otherMembers = (networkNum, shows) => {
    let others = [];
    for (let memberNumber = 1; memberNumber < members.length; memberNumber++) {
      others.push(members[memberNumber].predictions[networkNum].shows[shows]);
    }
    return others;
  };

  const findClosest = (users, result) => {
    const usersAdjusted = users
      .map(user =>
        user === 0
          ? 0
          : user.endsWith('e')
          ? user.slice(0, -1) * 1
          : user.slice(0, -1) * 20
      )
      .sort((a, b) => a - b);

    const closestNumber = usersAdjusted.reduce((prev, curr) =>
      Math.abs(curr - result) < Math.abs(prev - result) ? curr : prev
    );

    return closestNumber < 36 ? closestNumber + 'e' : closestNumber / 20 + 's';
  };

  let totals = Array(members.length).fill(0);
  const memberTotals = m => {
    // winner adds 1 to user's total wins
    totals[m] += 1;
  };

  let winners = [];
  const findWinnerUsername = user => {
    winners.push(user);
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
              <table className='table is-hoverable is-fullwidth'>
                <thead>
                  <tr className='has-background-light'>
                    <th>League: {lgName}</th>
                    {members.map(member => (
                      <th className='has-text-centered' key={member.memberId}>
                        {member.username}
                      </th>
                    ))}

                    <th className='has-text-centered'>Final Result</th>
                  </tr>
                </thead>

                <tbody>
                  {networks.map((network, n) => (
                    <React.Fragment key={n}>
                      <tr>
                        <td className='has-text-info'>{network.network}</td>
                      </tr>
                      {members[0].predictions[n].shows.map(
                        (memberZeroPredictions, i) => {
                          const finalResult = network.shows[i].finalResult;
                          const showPredictions = [
                            memberZeroPredictions,
                            otherMembers(n, i)
                          ].flat();

                          return (
                            <tr key={`${n}${i}`}>
                              <>
                                <td>{network.shows[i].show}</td>
                                {showPredictions.map((memberPrediction, m) => (
                                  <React.Fragment key={`${i}${m}`}>
                                    {finalResult !== 0 &&
                                    memberPrediction ===
                                      findClosest(
                                        showPredictions,
                                        finalResult
                                      ) ? (
                                      <td className='has-text-info has-text-weight-semibold has-text-centered'>
                                        {memberTotals(m)}
                                        {memberPrediction}
                                      </td>
                                    ) : (
                                      <td className='has-text-centered'>
                                        {memberPrediction}
                                      </td>
                                    )}
                                  </React.Fragment>
                                ))}
                                {finalResult > 0 ? (
                                  <td className='has-text-info has-text-centered'>
                                    {finalResult}
                                  </td>
                                ) : (
                                  <td className='has-text-centered'>-</td>
                                )}
                              </>
                            </tr>
                          );
                        }
                      )}
                    </React.Fragment>
                  ))}
                  <tr className='has-background-light'>
                    <td className='has-text-info has-text-weight-bold'>
                      Totals
                    </td>
                    {totals.map((total, t) => (
                      <React.Fragment key={t}>
                        {Math.max(...totals) === total ? (
                          <td className='has-text-info has-text-weight-bold has-text-centered'>
                            {total}
                            {total > 0 && findWinnerUsername(t)}
                          </td>
                        ) : (
                          <td className='has-text-centered'>{total}</td>
                        )}
                      </React.Fragment>
                    ))}
                    <td className='is-outlined has-text-info has-text-weight-bold has-text-centered '>
                      {winners.length > 0 &&
                        winners.map(winner => `${members[winner].username} `)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Standings5;
