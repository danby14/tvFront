import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Standings from './standings/Standings';

import { AuthContext } from '../context/auth-context';

const LeagueHome = props => {
  const [league, setLeague] = useState([]);
  const [members, setMembers] = useState([]);
  // const [commissioner, setCommissioner] = useState([]);
  // const [leagueStarted, setLeagueStarted] = useState(true);
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
        // setCommissioner(response.data.commissioner);
      } catch (err) {}
    };
    fetchLeague();
  }, [leagueId]);

  return (
    <>
      {members.length !== 0 && (
        <Standings members={members} lid={leagueId} listId={league.listUsed} />
      )}
    </>
  );
};

export default LeagueHome;
