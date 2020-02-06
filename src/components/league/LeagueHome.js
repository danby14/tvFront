import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import Standings5 from './standings/Standings5';

const LeagueHome = () => {
  const [league, setLeague] = useState([]);
  const [members, setMembers] = useState([]);
  // const [commissioner, setCommissioner] = useState([]);
  // const [leagueStarted, setLeagueStarted] = useState(true);

  const auth = useContext(AuthContext);
  const [, setLeagueName] = auth.leagueName;
  const [, setLeagueNum] = auth.leagueNum;

  // get league id# from url
  const { lid } = useParams();

  setLeagueNum(lid);
  setLeagueName(league.leagueName);

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/leagues/${lid}`
        );
        setLeague(response.data);
        setMembers(response.data.members);
        // setCommissioner(response.data.commissioner);
      } catch (err) {}
    };
    fetchLeague();
  }, [lid]);

  return (
    <>
      {members.length !== 0 && (
        <Standings5
          members={members}
          lid={lid}
          lgName={league.leagueName}
          listId={league.listUsed}
        />
      )}
    </>
  );
};

export default LeagueHome;
