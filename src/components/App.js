import React, { useState, useCallback, useEffect } from 'react';
import Home from './home/Home';
import Blog from './blog/Blog';
import MainNavbar from './navbar/MainNavbar';
import LeagueNavbar from './navbar/LeagueNavbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Auth from './user/Auth';
import Account from './user/Account';
import Leagues from './leagues/Leagues';
import Commissioner from './league/commissioner/Commissioner';
import CreateLeague from './leagues/CreateLeague';
import JoinLeague from './leagues/JoinLeague';
import LeagueHome from './league/LeagueHome';
// import MakePredictions from './league/predictions/MakePredictions';
// import Standings5 from './league/standings/Standings5';

import { AuthContext } from './context/auth-context';
import './app.css';

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const [leagueName, setLeagueName] = useState();
  const [leagueNum, setLeagueNum] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setLeagueName(null);
    setLeagueNum(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/createLeague' component={CreateLeague} />
        <Route path='/joinLeague' component={JoinLeague} />
        <Route path='/leagues'>
          <Leagues />
        </Route>
        <Route path='/leagueHome/:lid'>
          <LeagueHome />
        </Route>
        <Route path='/commissioner' component={Commissioner} />
        <Route path='/blog'>
          <Blog />
        </Route>
        <Route path='/account' component={Account} />
        <Redirect to='/leagues' />
      </Switch>
    );
  } else
    routes = (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/blog' component={Blog} />
        <Route path='/auth' component={Auth} />
        <Redirect to='/auth' />
      </Switch>
    );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
        leagueName: [leagueName, setLeagueName],
        leagueNum: [leagueNum, setLeagueNum]
      }}
    >
      <Router>
        <section className='hero is-link is-fullheight'>
          <div className='hero-head'>
            <MainNavbar />
            <div className='league-navbar'>
              {token && leagueName && <LeagueNavbar />}
            </div>
          </div>
          <div className='hero-body has-background-grey-lighter'>
            <div className='container'>{routes}</div>
          </div>
          <div className='hero-foot has-text-centered'>Footer Placeholder</div>
        </section>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
