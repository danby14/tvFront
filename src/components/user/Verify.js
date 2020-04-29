import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const Verify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (token.length > 100) {
      const verifyUser = async () => {
        try {
          const response = await axios.post(`http://localhost:5000/email/verify`, { token: token });
          setMessage(response.data.msg);
        } catch (err) {
          setMessage(err.response.data);
        }
      };
      verifyUser();
    }
  }, [token]);

  if (message) {
    return <div className='has-text-info'>{message}</div>;
  }

  if (!message) {
    return <div className='has-text-info'>Loading</div>;
  }
};

export default Verify;
