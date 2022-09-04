import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import './app.css';
import Account from './user/Account';
import Auth from './user/Auth';
import { AuthContext } from './context/auth-context';
import Blog from './blog/Blog';
import ChangePassword from './user/ChangePassword';
import CreateLeague from './leagues/CreateLeague';
import DeleteLeague from './league/settings/DeleteLeague';
import Help from './help/Help';
import Home from './home/Home';
import JoinLeague from './leagues/JoinLeague';
import LeagueHome from './league/LeagueHome';
import Leagues from './leagues/Leagues';
import MainNavbar from './navbar/MainNavbar';
import RemoveUser from './league/settings/RemoveUser';
import Research from './research/Research';
import Verify from './user/Verify';
import Contact from './contact/Contact';
import Footer from './footer/Footer';
import Admin from './admin/Admin';
import LoadingSpinner from './shared/LoadingSpinner';

let logoutTimer;

const App = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
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
      axios.post(`${BASE_URL}/user/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
    clearTimeout(logoutTimer);
  }, [BASE_URL]);

  const refresh = useCallback(() => {
    fetch(`${BASE_URL}/refresh_token`, { method: 'POST', credentials: 'include' }).then(async x => {
      const { userId, username, accessToken, ok } = await x.json();
      if (ok) {
        setToken(accessToken);
        setUserId(userId);
        setUserName(username);
      } else {
        setToken(false);
        // try {
        //   axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });
        // } catch (err) {
        //   console.log(err);
        // }
      }
      setIsLoading(false);
    });
    // gets site to render when server is not available
    // setIsLoading(false);
  }, [BASE_URL]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // the countdown to silently refresh access token
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
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createLeague' element={<CreateLeague />} />
          <Route path='/joinLeague' element={<JoinLeague />} />
          <Route path='/leagues' element={<Leagues />} />
          <Route path='/leagueHome/:lid/settings/removeLeague' element={<DeleteLeague />} />
          <Route path='/leagueHome/:lid/settings/removeUser' element={<RemoveUser />} />
          <Route path='/leagueHome/:lid/*' element={<LeagueHome />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/research' element={<Research />} />
          <Route path='/help' element={<Help />} />
          <Route path='/account' element={<Account />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='*' element={<Navigate to='/leagues' replace />} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/research' element={<Research />} />
          <Route path='/help' element={<Help />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/auth/verify/:token' element={<Verify />} />
          <Route path='/auth/change/:token' element={<ChangePassword />} />
          <Route path='*' element={<Navigate to='/auth' replace />} />
        </Routes>
      );
    }
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<LoadingSpinner />} />
      </Routes>
    );
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
          <div className='navbar is-light'>
            <MainNavbar leagueName={leagueName} token={token} />
          </div>
          <section className='hero is-dark  is-fullheight-with-navbar'>
            <div className='hero-body-adjusted has-background-white-ter is-mobile-table-overflow-fix'>
              {routes}
            </div>
            <div className='hero-foot has-background-grey-dark'>
              <Footer />
            </div>
          </section>
        </>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
