import React from 'react';
import Picker from '../shared/Picker';

function Research() {
  return (
    <div>
      <Picker time={true} />
      <br />
      <br />
      <br />
      <Picker time={false} />
    </div>
  );
}

export default Research;
