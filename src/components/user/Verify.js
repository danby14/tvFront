import React, { useState, useEffect } from 'react';
import Box from '../shared/Box';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const Verify = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { token } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (token.length > 100) {
      const verifyUser = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/email/verify`, { token: token });
          setMessage(response.data.msg);
        } catch (err) {
          setMessage(err.response.data);
        }
      };
      verifyUser();
    }
  }, [token, BASE_URL]);

  return (
    <div className='columns has-text-dark'>
      <div className='column'></div>
      <div className='column is-half has-text-centered '>
        <Box>{message ? message : 'Loading...'}</Box>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default Verify;
