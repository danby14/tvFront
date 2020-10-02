import React from 'react';
import Logo from '../../assets/Logo';

const Research = () => {
  return (
    <div className='container is-padded'>
      <div className='content'>
        <h1 className='title has-text-info'>Research</h1>
        <p className='has-text-dark'>
          This would be really helpful. Hmm... Maybe it will show up one day.
        </p>
        <p>
          <Logo size='178' unit='px' color='#C9B037' />
        </p>
        <p>
          <Logo size='178' unit='px' color='silver' />
        </p>
        <p>
          <Logo size='178' unit='px' color='#AD8A56' />
        </p>
      </div>
    </div>
  );
};

export default Research;
