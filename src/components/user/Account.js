import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth-context';

const Account = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [leagues, setLeagues] = useState();
  const [birthday, setBirthday] = useState();
  const uid = auth.userId;
  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${uid}`);
        setUser(response.data);
        setLeagues(
          response.data.leagues.map(lg => (
            <p key={lg._id} id={lg._id}>
              {lg.leagueName}
            </p>
          ))
        );
        setBirthday(response.data.birthdate.substring(0, 10));
      } catch (err) {}
    };
    fetchUser();
  }, [uid]);

  console.log('user', user);

  return (
    <div className='content has-text-dark'>
      <h2 className='has-text-primary'>Welcome, {user.username}</h2>
      <h2 className='has-text-primary'>Email</h2>
      <p>{user.email}</p>
      <h2 className='has-text-primary'>Birthday</h2>
      <p>{birthday}</p>
      <h2 className='has-text-primary'>Gender</h2>
      <p>{user.gender}</p>
      <h2 className='has-text-primary'>Leagues</h2>
      {leagues}
    </div>
  );
};

export default Account;
