import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Standings from './standings/Standings';

import { AuthContext } from '../context/auth-context';

const LeagueHome = props => {
  const [league, setLeague] = useState([]);
  const [members, setMembers] = useState([]);
  const [commissioner, setCommissioner] = useState([]);
  const [leagueStarted, setLeagueStarted] = useState(true);
  const auth = useContext(AuthContext);

  let leagueId = props.match.params.lid;
  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/leagues/${leagueId}`
        );
        setLeague(response.data);
        setMembers(response.data.members);
        setCommissioner(response.data.commissioner);
      } catch (err) {}
    };
    fetchLeague();
  }, [leagueId]);

  if (leagueStarted) {
    return (
      <>
        {members.length !== 0 && (
          <Standings members={members} listId={league.listUsed} />
        )}
      </>
    );
  }
  return (
    <div className='content'>
      <h1>Welcome to {league.leagueName}. </h1>
      <div>
        <h3>commissioner:</h3>
        {commissioner.username}
      </div>
      <div>
        <h3>members:</h3>
        {members.map(member => (
          <p key={member.memberId}>{member.username}</p>
        ))}
      </div>
    </div>
  );
};

export default LeagueHome;
