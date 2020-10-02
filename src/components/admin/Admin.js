import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';
import LoadingSpinner from '../shared/LoadingSpinner';

const Admin = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  axios.defaults.headers.common = { Authorization: 'Bearer ' + auth.token };

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/admin/messages`);
        setMessages(response.data);
        setIsLoading(false);
      } catch (err) {
        setMessages(null);
        setIsLoading(false);
        setNotFound(true);
      }
    };
    fetchMessages();
  }, [BASE_URL]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (notFound) {
    return (
      <div className='columns has-text-dark pt-5'>
        <div className='column'></div>
        <div className='column has-text-centered'>Page not found</div>
        <div className='column'></div>
      </div>
    );
  }

  if (!isLoading && messages) {
    return (
      <div className='columns is-centered'>
        <div className='column has-text-dark is-6'>
          <p className='pb-5 has-text-weight-bold is-size-4'>Total Messages: {messages.length}</p>
          {messages.map((message, idx) => (
            <div className='box' key={idx}>
              <ul className=''>
                <li className='pb-3'>
                  <span className='has-text-weight-semibold'>Created:</span>{' '}
                  <p>{new Date(message.createdAt) + ''}</p>
                </li>
                <li className='pb-3'>
                  <span className='has-text-weight-semibold'>Status:</span> <p>{message.status}</p>
                </li>
                <li className='pb-3'>
                  <span className='has-text-weight-semibold'>Reason for contact:</span>{' '}
                  <p>{message.reason}</p>
                </li>
                <li className='pb-3'>
                  <span className='has-text-weight-semibold'>User name:</span> <p>{message.name}</p>
                </li>
                <li className='pb-3'>
                  <span className='has-text-weight-semibold'>User email:</span>{' '}
                  <p>{message.email}</p>
                </li>
                <li className='pb-3'>
                  <span className='has-text-weight-semibold'>Subject:</span>{' '}
                  <p>{message.subject}</p>
                </li>
                <li>
                  <span className='has-text-weight-semibold'>Message:</span>{' '}
                  <p>{message.message}</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default Admin;
