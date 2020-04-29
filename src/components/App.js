import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import './app.css';
import Account from './user/Account';
import Auth from './user/Auth';
import { AuthContext } from './context/auth-context';
import Blog from './blog/Blog';
import CreateLeague from './leagues/CreateLeague';
import DeleteLeague from './league/settings/DeleteLeague';
import Home from './home/Home';
import JoinLeague from './leagues/JoinLeague';
import LeagueHome from './league/LeagueHome';
import Leagues from './leagues/Leagues';
import MainNavbar2 from './navbar/MainNavbar2';
import RemoveUser from './league/settings/RemoveUser';
import Research from './research/Research';
import Verify from './user/Verify';

let logoutTimer;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const [userName, setUserName] = useState();
  const [leagueName, setLeagueName] = useState();
  const [leagueNum, setLeagueNum] = useState();

  const login = useCallback((uid, username, token) => {
    setToken(token);
    setUserId(uid);
    setUserName(username);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    setLeagueName(null);
    setLeagueNum(null);
    try {
      axios.get('http://localhost:5000/user/logout', { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
    clearTimeout(logoutTimer);
  }, []);

  const refresh = useCallback(() => {
    fetch('http://localhost:5000/refresh_token', { method: 'POST', credentials: 'include' }).then(
      async x => {
        const { userId, username, accessToken, ok } = await x.json();
        if (ok) {
          setToken(accessToken);
          setUserId(userId);
          setUserName(username);
        } else {
          setToken(false);
          // try {
          //   axios.get('http://localhost:5000/user/logout', { withCredentials: true });
          // } catch (err) {
          //   console.log(err);
          // }
        }
        setIsLoading(false);
      }
    );
  }, []);

  // allow users to stay logged in on page refresh, but defaults to default route/page.
  useEffect(() => {
    refresh();
  }, [refresh]);

  // the countdown to be auto logged out
  useEffect(() => {
    if (token) {
      const remainingTime = 900000; // match token exp time (currently 15mins) on server (makeTokens for access token)
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(refresh, remainingTime);
    }
  }, [refresh, token]);

  let routes;
  if (!isLoading) {
    if (token) {
      routes = (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/createLeague' component={CreateLeague} />
          <Route path='/joinLeague' component={JoinLeague} />
          <Route path='/leagues'>
            <Leagues />
          </Route>
          <Route path='/leagueHome/:lid/settings/removeLeague'>
            <DeleteLeague />
          </Route>
          <Route path='/leagueHome/:lid/settings/removeUser'>
            <RemoveUser />
          </Route>
          <Route path='/leagueHome/:lid'>
            <LeagueHome />
          </Route>
          <Route path='/blog'>
            <Blog />
          </Route>
          <Route path='/research'>
            <Research />
          </Route>
          <Route path='/account' component={Account} />
          <Redirect to='/leagues' />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/blog' component={Blog} />
          <Route path='/research' component={Research} />
          <Route path='/auth' exact component={Auth} />
          <Route path='/auth/verify/:token' exact component={Verify} />
          <Redirect to='/auth' />
        </Switch>
      );
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
        userName: userName,
        leagueName: [leagueName, setLeagueName],
        leagueNum: [leagueNum, setLeagueNum],
      }}
    >
      <Router>
        <>
          <div className='navbar'>
            <MainNavbar2 leagueName={leagueName} token={token} />
          </div>
          <section className='hero is-dark is-bold is-fullheight-with-navbar'>
            <div className='hero-body has-background-white-ter is-mobile-table-overflow-fix'>
              <div className='container'>{routes}</div>
            </div>
            <div className='hero-foot has-text-centered'>contact help about feedback (c)2020</div>
          </section>
        </>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
