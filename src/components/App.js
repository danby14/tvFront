import React, { useState, useCallback, useEffect } from 'react';
import Home from './home/Home';
import Blog from './blog/Blog';
import MainNavbar2 from './navbar/MainNavbar2';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Auth from './user/Auth';
import Account from './user/Account';
import Leagues from './leagues/Leagues';
import CreateLeague from './leagues/CreateLeague';
import JoinLeague from './leagues/JoinLeague';
import DeleteLeague from './league/settings/DeleteLeague';
import RemoveUser from './league/settings/RemoveUser';
import LeagueHome from './league/LeagueHome';
import Research from './research/Research';
import axios from 'axios';

import { AuthContext } from './context/auth-context';
import './app.css';

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const [userName, setUserName] = useState();
  const [leagueName, setLeagueName] = useState();
  const [leagueNum, setLeagueNum] = useState();

  const login = useCallback((uid, username, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUserName(username);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    // localStorage.setItem(
    //   'userData',
    //   JSON.stringify({
    //     userId: uid,
    //     userName: username,
    //     token: token,
    //     expiration: tokenExpirationDate.toISOString(),
    //   })
    // );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUserName(null);
    setLeagueName(null);
    setLeagueNum(null);
    // localStorage.removeItem('userData');
    try {
      axios.get('http://localhost:5000/user/logout', { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(
        storedData.userId,
        storedData.userName,
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
  } else
    routes = (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/blog' component={Blog} />
        <Route path='/research' component={Research} />
        <Route path='/auth' component={Auth} />
        <Redirect to='/auth' />
      </Switch>
    );

  console.log('access-tok: ', token);

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
