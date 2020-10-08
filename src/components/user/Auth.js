import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Antenna from '../../assets/Antenna';

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [loginClass, setLoginClass] = useState('has-background-dark');
  const [registerClass, setRegisterClass] = useState('has-background-grey');
  const [register, setRegister] = useState(false);

  const loginHandler = () => {
    setRegister(false);
    setLogin(true);
    setRegisterClass('has-background-grey');
    setLoginClass('has-background-dark');
  };

  const registerHandler = () => {
    setLogin(false);
    setRegister(true);
    setLoginClass('has-background-grey');
    setRegisterClass('has-background-dark');
  };

  return (
    <div className='container'>
      <div className='columns is-gapless is-lower is-mobile is-centered'>
        <div id='auth-width' className='column is-11-mobile is-6-tablet is-4-widescreen'>
          <div className='has-text-centered'>
            <Antenna size={28} />
          </div>
          <div className='card has-overflow-card has-radius'>
            <footer className='card-footer is-clickable has-text-white has-radius'>
              <p
                className={`card-footer-item ${loginClass} has-radius-top-left`}
                onClick={loginHandler}
              >
                <span>Sign In</span>
              </p>
              <p
                className={`card-footer-item ${registerClass} has-radius-top-right`}
                onClick={registerHandler}
              >
                <span>Register</span>
              </p>
            </footer>
            <div className='is-divider'></div>
            <div className='card-content'>
              {login && <Login />}
              {register && <Register />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
