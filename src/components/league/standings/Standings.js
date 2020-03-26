import React from 'react';
// import Person from '../../../assets/StandingGuy';
import { Link, useRouteMatch } from 'react-router-dom';
import CelebratingGirl from '../../../assets/CelebratingGirl';
import CelebratingGuy from '../../../assets/CelebratingGuy';

const Standings = ({ members, networks, lgName, startDate }) => {
  let { url } = useRouteMatch();
  // get predictions for all users, besides user 0
  const otherMembers = (networkNum, shows) => {
    let others = [];
    for (let memberNumber = 1; memberNumber < members.length; memberNumber++) {
      others.push(members[memberNumber].predictions[networkNum].shows[shows]);
    }
    return others;
  };

  const findClosest = (users, result) => {
    // 0 = undefined, so you can't win if you pick 0. next best gets it.
    const usersAdjusted = users
      .map(user =>
        user === '0'
          ? undefined
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
    <div className='columns'>
      <div className='column'>
        <div className='has-svg is-hidden-touch'>
          <CelebratingGirl size={85} />
        </div>
      </div>
      <div className='column is-four-fifths'>
        <div className='content has-text-dark has-text-centered'>
          {/* {!leagueStarted && ( */}
          <Link to={`${url}/predictions`}>
            Predictions must be submitted by {new Date(startDate).toLocaleString()}. Click here to
            make yours now.
          </Link>
          {/* )} */}
        </div>
        <div className='fix-table-scroll'>
          {networks.length !== 0 && (
            <table className='table is-hoverable is-fullwidth '>
              <thead>
                <tr className='has-background-light'>
                  <th className='is-stuck'>League: {lgName}</th>
                  {members.map(member => (
                    <th className='has-text-centered is-stuck' key={member.memberId[0]._id}>
                      {member.memberId[0].username}
                      {/* {member.memberId[0].username.slice(0, 6) +
                        ' ' +
                        member.memberId[0].username.slice(6, 12)} */}
                    </th>
                  ))}

                  <th className='has-text-centered is-stuck'>Final Result</th>
                </tr>
              </thead>

              <tbody>
                {networks.map((network, n) => (
                  <React.Fragment key={n}>
                    <tr className='has-background-white-bis'>
                      <td className='has-text-info has-text-weight-medium'>{network.network}</td>
                      {members.map((member, x) => (
                        <td key={x}></td>
                      ))}
                      <td></td>
                    </tr>
                    {members[0].predictions[n].shows.map((memberZeroPredictions, i) => {
                      const finalResult = network.shows[i].finalResult;
                      const showPredictions = [memberZeroPredictions, otherMembers(n, i)].flat();

                      // ternary hides shows with null predictions, so new leagues don't show finished shows or unpredicted shows
                      return memberZeroPredictions === null ? (
                        <tr key={`${n}${i}`} style={{ display: 'none' }}></tr>
                      ) : (
                        <tr key={`${n}${i}`}>
                          <>
                            <td>{network.shows[i].show}</td>
                            {showPredictions.map((memberPrediction, m) => (
                              <React.Fragment key={`${i}${m}`}>
                                {finalResult !== 0 &&
                                memberPrediction === findClosest(showPredictions, finalResult) ? (
                                  <td className='has-text-info has-text-weight-semibold has-text-centered'>
                                    {memberTotals(m)}
                                    {memberPrediction}
                                  </td>
                                ) : (
                                  <td className='has-text-centered'>{memberPrediction}</td>
                                )}
                              </React.Fragment>
                            ))}
                            {finalResult > 0 ? (
                              <td className='has-text-info has-text-centered'>{finalResult}</td>
                            ) : (
                              <td className='has-text-centered'>-</td>
                            )}
                          </>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
                <tr className='has-background-dark'>
                  <td className='has-text-white has-text-weight-bold'>Totals</td>
                  {totals.map((total, t) => (
                    <React.Fragment key={t}>
                      {Math.max(...totals) === total ? (
                        <td className='has-text-white has-text-weight-bold has-text-centered'>
                          {total}
                          {total > 0 && findWinnerUsername(t)}
                        </td>
                      ) : (
                        <td className='has-text-grey has-text-centered'>{total}</td>
                      )}
                    </React.Fragment>
                  ))}
                  <td className='has-text-white has-text-weight-bold has-text-centered '>
                    {winners.length > 0 &&
                      winners.map(winner => `${members[winner].memberId[0].username} `)}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className='column has-text-centered'>
        <div className='has-svg'>
          <CelebratingGuy size={95} />
        </div>
      </div>
    </div>
  );
};

export default Standings;
