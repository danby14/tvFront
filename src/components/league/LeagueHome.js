import React, { useState, useContext, useEffect } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import Standings from './standings/Standings';
import MakePredictions from './predictions/MakePredictions/MakePredictions';
import ClosedPredictions from './predictions/ClosedPredictions';
import Settings from './settings/Settings';
import LoadingSpinner from '../shared/LoadingSpinner';

const LeagueHome = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [league, setLeague] = useState([]);
  const [members, setMembers] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [changer, setChanger] = useState(0);

  const auth = useContext(AuthContext);
  const [, setLeagueName] = auth.leagueName;
  const [, setLeagueNum] = auth.leagueNum;

  // get league id# from url
  const { lid } = useParams();

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  useEffect(() => {
    const fetchLeague = async () => {
      setIsLoading(true);
      try {
        // can probably make this one call to db if I add ref to schema and populate networks on backend
        const response1 = await axios.get(`${BASE_URL}/leagues/${lid}`);

        // only get networks on first call because they don't change when predictions updates
        if (changer === 0) {
          const listId = response1.data.listUsed;
          const response2 = await axios.get(`${BASE_URL}/monthlyLists/${listId}`);
          setNetworks(response2.data.networks);
        }
        setLeague(response1.data);
        setMembers(response1.data.members);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchLeague();
  }, [lid, changer, BASE_URL]);

  // used to update context for league name in navbar
  useEffect(() => {
    if (league.leagueName) {
      setLeagueNum(lid);
      setLeagueName(league.leagueName);
    }
  }, [lid, league.leagueName, setLeagueName, setLeagueNum]);

  function handleChanges() {
    setChanger(changer + 1);
  }

  const makeEdits = Date.parse(league.startDate) < Date.now() ? false : true;

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            !isLoading && members.length !== 0 && networks.length !== 0 ? (
              <Standings
                members={members}
                networks={networks}
                lgName={league.leagueName}
                startDate={league.startDate}
                predictionsAvailable={makeEdits}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path='predictions'
          element={
            members.length !== 0 &&
            networks.length !== 0 &&
            (makeEdits ? (
              <MakePredictions
                lid={lid}
                members={members}
                networks={networks}
                toggles={league.predictionEdits}
                changes={handleChanges}
              />
            ) : (
              <ClosedPredictions />
            ))
          }
        />
        <Route
          path='settings'
          element={
            members.length !== 0 && networks.length !== 0 ? (
              <Settings
                league={league}
                members={members}
                lid={lid}
                networks={networks}
                toggles={league.predictionEdits}
                changes={handleChanges}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
      </Routes>
    </>
  );
};

export default LeagueHome;
