import React from 'react';
import Person from '../../assets/Person';

const Blog = () => {
  return (
    <div className='container is-padded'>
      <div className='content'>
        <p className='title has-text-info'>Blog</p>
        <p className='has-text-dark'>This might be here eventually.</p>
        <Person size={30} />
      </div>
    </div>
  );
};

export default Blog;
