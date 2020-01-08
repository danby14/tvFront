import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
// import { Link } from 'react-router-dom';

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const loginHandler = () => {
    setRegister(false);
    setLogin(true);
  };
  const registerHandler = () => {
    setLogin(false);
    setRegister(true);
  };

  return (
    <div className='columns container'>
      <div className='column'></div>
      <div className='column'>
        {login && (
          <>
            <Login />
            <div
              className='has-text-primary has-text-right'
              onClick={registerHandler}
            >
              Register
            </div>
          </>
        )}
        {register && (
          <>
            <Register />
            <div
              className='has-text-primary has-text-right'
              onClick={loginHandler}
            >
              Sign-In
            </div>
          </>
        )}
      </div>
      <div className='column'></div>
    </div>
  );
};

export default Auth;
