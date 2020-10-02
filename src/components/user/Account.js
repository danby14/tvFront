import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth-context';
import LoadingSpinner from '../shared/LoadingSpinner';

const Account = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [leagues, setLeagues] = useState();
  const [birthday, setBirthday] = useState();
  const uid = auth.userId;

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/user/${uid}`);
        setUser(response.data);
        setLeagues(
          response.data.leagues.map(lg => (
            <p key={lg._id} id={lg._id}>
              {lg.leagueName}
            </p>
          ))
        );
        setBirthday(new Date(response.data.birthdate).toUTCString().split(' '));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [uid, BASE_URL]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='container pt-5 pl-3'>
      <div className='content has-text-dark'>
        <h2 className='has-text-dark has-text-weight-bold'>{user.username}</h2>
        <h3 className='has-text-info'>Email</h3>
        <p>{user.email}</p>
        <h3 className='has-text-info'>Birthday</h3>
        {birthday && (
          <p>
            {birthday[2]} {birthday[1]}, {birthday[3]}
          </p>
        )}
        <h3 className='has-text-info'>Gender</h3>
        <p>{user.gender}</p>
        <h3 className='has-text-info'>Leagues</h3>
        {leagues}
      </div>
    </div>
  );
};

export default Account;
