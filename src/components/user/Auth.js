import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
// import { Link } from 'react-router-dom';

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [loginClass, setLoginClass] = useState('has-background-link');
  const [registerClass, setRegisterClass] = useState('has-background-grey');
  const [register, setRegister] = useState(false);
  const loginHandler = () => {
    setRegister(false);
    setLogin(true);
    setRegisterClass('has-background-grey');
    setLoginClass('has-background-link');
  };
  const registerHandler = () => {
    setLogin(false);
    setRegister(true);
    setLoginClass('has-background-grey');
    setRegisterClass('has-background-link');
  };

  return (
    <div className='columns container'>
      <div className='column'></div>
      <div className='column'>
        <div className='card'>
          <footer className='card-footer is-clickable has-text-white'>
            <p className={`card-footer-item ${loginClass}`} onClick={loginHandler}>
              <span>Sign In</span>
            </p>
            <p className={`card-footer-item ${registerClass}`} onClick={registerHandler}>
              <span>Register</span>
            </p>
          </footer>
          <div className='card-content'>
            {login && <Login />}
            {register && <Register />}
          </div>
        </div>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default Auth;
