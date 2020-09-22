import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';

import Modal from '../shared/Modal';

const Research = () => {
  const [enableTrailer, setEnableTrailer] = useState(false);
  const [url, setUrl] = useState(null);

  const activateTrailer = selectedUrl => {
    setEnableTrailer(true);
    setUrl(selectedUrl);
  };

  return (
    <div className='container'>
      <div className='content'>
        <h1 className='title has-text-info'>Research</h1>
        <p className='has-text-dark'>
          This would be really helpful. Hmm... Maybe it will show up one day.
        </p>
        <button className='button' onClick={() => activateTrailer('https://youtu.be/sj9J2ecsSpo')}>
          Play Trailer
        </button>
      </div>
      {enableTrailer && (
        <Modal title='Trailer' stateHandler={setEnableTrailer} success submitted={true} trailer>
          <ReactPlayer url={url} width='100%' height='100%' controls className='react-player' />
        </Modal>
      )}
    </div>
  );
};

export default Research;
