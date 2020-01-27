import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MakePredictions from '../predictions/MakePredictions';

const Standings5 = ({ members, listId, lid }) => {
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
                      {members[0].predictions[n].shows.map((member, i) => (
                        <tr key={`${n}${i}`}>
                          <>
                            <td>{network.shows[i].show}</td>
                            {[member, otherMembers(n, i)]
                              .flat()
                              .map((show, s) => (
                                <td key={`${i}${s}`}>{show}</td>
                              ))}
                          </>
                        </tr>
                      ))}
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

export default Standings5;
