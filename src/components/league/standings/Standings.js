import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiYoutube, FiRotateCcw } from 'react-icons/fi';
import { CgUserRemove } from 'react-icons/cg';
import ReactPlayer from 'react-player/lazy';

import Modal from '../../shared/Modal';
import CelebratingGirl from '../../../assets/CelebratingGirl';
import CelebratingGuy from '../../../assets/CelebratingGuy';

const Standings = ({ members, networks, lgName, startDate, predictionsAvailable }) => {
  let { url } = useRouteMatch();
  let [usersToHide, setUsersToHide] = useState([]);
  let [count, setCount] = useState(0);
  const [enableTrailer, setEnableTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);

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

  const hidePlayer = playerNum => {
    if (playerNum === 'reset') {
      setUsersToHide([]);
    } else {
      let updatedList = usersToHide;
      updatedList.push(playerNum);
      setUsersToHide(updatedList);
      // let updatedList;
      // if (usersToHide.length > 0 && usersToHide.includes(playerNum)) {
      //   updatedList = usersToHide.filter(num => num !== playerNum);
      //   setUsersToHide(updatedList);
      // } else {
      //   updatedList = usersToHide;
      //   updatedList.push(playerNum);
      //   setUsersToHide(updatedList);
      // }
    }
    setCount((count += 1));
  };

  const activateTrailer = selectedUrl => {
    setEnableTrailer(true);
    setTrailerUrl(selectedUrl);
  };

  return (
    <div className='columns'>
      <div className='column'>
        <div className='has-svg is-hidden-touch is-hidden-desktop-only'>
          <CelebratingGirl size={85} />
        </div>
      </div>
      <div className='column is-four-fifths'>
        <div className='content has-text-dark has-text-centered'>
          {predictionsAvailable && (
            <Link to={`${url}/predictions`}>
              Predictions must be submitted by {new Date(startDate).toLocaleString()}.
            </Link>
          )}
        </div>
        <div className='fix-table-scroll'>
          {networks.length !== 0 && (
            <table className='table is-hoverable is-fullwidth '>
              <thead>
                <tr className='has-background-light'>
                  <th></th>
                  {members.map((member, idx) => (
                    <th
                      key={idx}
                      className={`has-text-centered ${
                        usersToHide.includes(idx) ? 'make-disappear' : ''
                      }`}
                    >
                      <CgUserRemove
                        className={`is-icon-top is-clickable`}
                        onClick={() => hidePlayer(idx)}
                        title='Hide User'
                      />
                    </th>
                  ))}

                  <th className='has-text-centered'>
                    {usersToHide.length > 0 ? (
                      <FiRotateCcw
                        onClick={() => hidePlayer('reset')}
                        title='Show All Users'
                        className='is-clickable is-centered-icon'
                      />
                    ) : (
                      ''
                    )}
                  </th>
                </tr>
                <tr>
                  <th className='is-stuck'>{lgName}</th>
                  {members.map((member, idx) => (
                    <th
                      className={`has-text-centered is-stuck ellipsis ${
                        usersToHide.includes(idx) ? 'make-disappear' : ''
                      }`}
                      data-text={member.memberId[0].username}
                      key={member.memberId[0]._id}
                      onClick={() => hidePlayer(idx)}
                    >
                      {member.memberId[0].username}
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
                        <td
                          key={x}
                          className={`has-text-centered ${
                            usersToHide.includes(x) ? 'make-disappear' : ''
                          }`}
                        ></td>
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
                            <td>
                              {network.shows[i].show}{' '}
                              <FiYoutube
                                className='is-clickable'
                                onClick={() => activateTrailer(network.shows[i].trailer)}
                              />
                            </td>
                            {showPredictions.map((memberPrediction, m) => (
                              <React.Fragment key={`${i}${m}`}>
                                {finalResult !== 0 &&
                                memberPrediction === findClosest(showPredictions, finalResult) ? (
                                  <td
                                    className={`has-text-info has-text-weight-semibold has-text-centered ${
                                      usersToHide.includes(m) ? 'make-disappear' : ''
                                    }`}
                                  >
                                    {memberTotals(m)}
                                    {memberPrediction}
                                  </td>
                                ) : (
                                  <td
                                    className={`has-text-centered ${
                                      usersToHide.includes(m) ? 'make-disappear' : ''
                                    }`}
                                  >
                                    {memberPrediction}
                                  </td>
                                )}
                              </React.Fragment>
                            ))}
                            {finalResult > 0 ? (
                              <td className='has-text-info has-text-centered'>
                                {finalResult < 36 ? finalResult + 'e' : finalResult / 20 + 's'}
                              </td>
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
                  <td className='has-text-white has-text-weight-bold is-stuck2'>Totals</td>
                  {totals.map((total, t) => (
                    <React.Fragment key={t}>
                      {Math.max(...totals) === total ? (
                        <td
                          className={`has-text-white has-text-weight-bold has-text-centered is-stuck2 ${
                            usersToHide.includes(t) ? 'make-disappear' : ''
                          }`}
                        >
                          {total}
                          {total > 0 && findWinnerUsername(t)}
                        </td>
                      ) : (
                        <td
                          className={`has-text-grey has-text-centered is-stuck2 ${
                            usersToHide.includes(t) ? 'make-disappear' : ''
                          }`}
                        >
                          {total}
                        </td>
                      )}
                    </React.Fragment>
                  ))}
                  <td className='has-text-white has-text-weight-bold has-text-centered ellipsis is-stuck2'>
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
        <div className='has-svg is-hidden-touch is-hidden-desktop-only'>
          <CelebratingGuy size={95} />
        </div>
      </div>
      {enableTrailer && (
        <Modal title='Trailer' stateHandler={setEnableTrailer} success submitted={true} trailer>
          <ReactPlayer
            url={trailerUrl}
            width='100%'
            height='100%'
            controls
            className='react-player'
          />
        </Modal>
      )}
    </div>
  );
};

export default Standings;
