import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userName: null,
  leagueName: null,
  leagueNum: null,
  token: null,
  login: () => {},
  logout: () => {}
});
