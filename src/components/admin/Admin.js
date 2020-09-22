import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';
import LoadingSpinner from '../shared/LoadingSpinner';

const Admin = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const auth = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      }
    };
    fetchMessages();
  }, [BASE_URL]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && messages) {
    return (
      <div className='columns'>
        <div className='column'></div>
        <div className='column has-text-dark'>
          <p>Total Messages: {messages.length}</p>
          <ul>
            <li>Reason: {messages[0].reason}</li>
            <li>Name: {messages[0].name}</li>
            <li>Email: {messages[0].email}</li>
            <li>Subject: {messages[0].subject}</li>
            <li>Message: {messages[0].name}</li>
          </ul>
        </div>
        <div className='column'></div>
      </div>
    );
  }

  return <div></div>;
};

export default Admin;
