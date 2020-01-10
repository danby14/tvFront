import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';
import Pagination from '../shared/Pagination';

const Blog = () => {
  const [leagues, setLeagues] = useState([]);
  const auth = useContext(AuthContext);
  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const response = await axios.get('http://localhost:5000/leagues');
        // console.log(response.data[0].leagueName);
        setLeagues(response.data);
      } catch (err) {}
    };
    fetchLeague();
  }, []);

  return (
    <>
      <Pagination />

      <div className='content has-text-centered'>
        <p className='title has-text-primary'>Blog</p>
        <p className='has-text-dark'>
          {leagues.map(lg => (
            <li key={lg._id}>{lg.leagueName}</li>
          ))}
        </p>
      </div>
    </>
  );
};

export default Blog;
