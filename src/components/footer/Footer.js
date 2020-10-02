import React from 'react';
import { FiHelpCircle, FiMail, FiFacebook, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <nav className='tabs is-fullwidth'>
      <div className='container'>
        <ul>
          <li>
            <Link to='/Help'>
              <FiHelpCircle />
            </Link>
          </li>
          <li>
            <Link to='/Contact'>
              <FiMail />
            </Link>
          </li>

          <li>
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='has-text-white is-center-spaced'
            >
              <FiFacebook />
            </a>
          </li>
          <li>
            <a
              href='https://www.twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='has-text-white is-center-spaced'
            >
              <FiTwitter />
            </a>
          </li>

          <li className='has-text-centered'>
            <div className='is-aligned is-size-6'>©{new Date(Date.now()).getFullYear()}</div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Footer;
