import React, { useState, useContext, useEffect } from 'react';
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import Standings from './standings/Standings';
import MakePredictions from './predictions/MakePredictions';
import ClosedPredictions from './predictions/ClosedPredictions';
import Settings from './settings/Settings';

const LeagueHome = () => {
  const [league, setLeague] = useState([]);
  const [members, setMembers] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [changer, setChanger] = useState(0);
  // const [predictionsOpen, setPredictionsOpen] = useState(false);

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
        // can probably make this one call to db if I add ref to schema and populate networks on backend
        const response1 = await axios.get(`http://localhost:5000/leagues/${lid}`);

        // only get networks on first call because they don't change when predictions updates
        if (changer === 0) {
          const listId = response1.data.listUsed;
          const response2 = await axios.get(`http://localhost:5000/monthlyLists/${listId}`);
          setNetworks(response2.data.networks);
        }

        setLeague(response1.data);
        setMembers(response1.data.members);
        // setCommissioner(response.data.commissioner);
      } catch (err) {}
    };
    fetchLeague();
  }, [lid, changer]);

  function handleChanges() {
    setChanger(changer + 1);
  }

  // to get base url for use with ReactRouter
  let { url } = useRouteMatch();
  const makeEdits = Date.parse(league.startDate) < Date.now() ? false : true;
  return (
    <>
      {members.length !== 0 && networks.length !== 0 && (
        <Switch>
          <Route exact path={`${url}/`}>
            <Standings
              members={members}
              networks={networks}
              lgName={league.leagueName}
              startDate={league.startDate}
              predictionsAvailable={makeEdits}
            />
          </Route>
          <Route exact path={`${url}/predictions`}>
            {makeEdits ? (
              <MakePredictions
                lid={lid}
                members={members}
                networks={networks}
                toggles={league.predictionEdits}
                changes={handleChanges}
              />
            ) : (
              <ClosedPredictions />
            )}
          </Route>
          <Route exact path={`${url}/settings`}>
            <Settings
              league={league}
              members={members}
              lid={lid}
              networks={networks}
              toggles={league.predictionEdits}
            />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default LeagueHome;
