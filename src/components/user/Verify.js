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
    <div className='container'>
      <div className='columns is-gapless is-lower is-mobile is-centered has-text-dark'>
        <div className='column is-10-mobile is-6-tablet is-4-widescreen'>
          <Box svgSize={35}>
            <div className='content is-shorty'>{message ? message : 'Loading...'}</div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Verify;
