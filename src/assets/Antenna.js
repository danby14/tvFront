import React from 'react';

function Antenna({ size, color }) {
  return (
    <svg
      width={`${size}%`}
      // width='198'
      // height='193'
      fill='none'
      viewBox='0 0 198 193'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Antenna'>
        <path id='Line 1' stroke={`${color}`} strokeWidth='9' d='M29 188.5h140'></path>
        <path
          id='Line 2'
          stroke={`${color}`}
          strokeWidth='7'
          d='M0-3.5h154.158'
          transform='matrix(.45307 -.89147 .94635 .32313 122.744 145.601)'
        ></path>
        <path
          id='Line 3'
          stroke={`${color}`}
          strokeWidth='7'
          d='M0-3.5h154.158'
          transform='matrix(-.45307 -.89147 -.94635 .32313 74.674 145.601)'
        ></path>
        <ellipse
          id='Ellipse 3'
          fill={`${color}`}
          rx='8.978'
          ry='7.739'
          transform='matrix(.99943 .03392 -.09685 .9953 187.695 8.007)'
        ></ellipse>
        <ellipse
          id='Ellipse 4'
          fill={`${color}`}
          rx='8.978'
          ry='7.739'
          transform='matrix(-.99943 .03392 .09685 .9953 9.723 8.007)'
        ></ellipse>
        <path
          id='Vector 1'
          stroke={`${color}`}
          strokeWidth='7'
          d='M43 177c16.201-27.166 61.283-65.199 112 0'
        ></path>
      </g>
    </svg>
  );
}

Antenna.defaultProps = {
  size: '20',
  color: '#000'
};

export default Antenna;
