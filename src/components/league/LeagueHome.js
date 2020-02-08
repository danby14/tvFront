import React, { useState, useContext, useEffect } from 'react';
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import Standings5 from './standings/Standings5';
import MakePredictions from './predictions/MakePredictions';

const LeagueHome = () => {
  const [league, setLeague] = useState([]);
  const [members, setMembers] = useState([]);
  const [networks, setNetworks] = useState([]);
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
        const response1 = await axios.get(
          `http://localhost:5000/leagues/${lid}`
        );
        const listId = response1.data.listUsed;
        const response2 = await axios.get(
          `http://localhost:5000/monthlyLists/${listId}`
        );
        setLeague(response1.data);
        setMembers(response1.data.members);
        setNetworks(response2.data.networks);
        // setCommissioner(response.data.commissioner);
      } catch (err) {}
    };
    fetchLeague();
  }, [lid, league]);

  // to get base url for use with ReactRouter
  let { url } = useRouteMatch();

  return (
    <>
      {members.length !== 0 && networks.length !== 0 && (
        <Switch>
          <Route exact path={`${url}/predictions`}>
            <MakePredictions members={members} networks={networks} lid={lid} />
          </Route>
          <Route exact path={`${url}/`}>
            <Standings5
              members={members}
              networks={networks}
              lgName={league.leagueName}
            />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default LeagueHome;
