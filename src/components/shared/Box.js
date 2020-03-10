import React from 'react';
import Antenna from '../../assets/Antenna';

function Box(props) {
  return (
    <div className='has-text-centered'>
      <Antenna size={props.svgSize} />
      <div className='box'>{props.children}</div>
    </div>
  );
}

export default Box;
