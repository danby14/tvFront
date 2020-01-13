import React from 'react';

const Pagination = ({ networks, networksPerPage, totalNetworks, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalNetworks / networksPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className='pagination is-rounded is-centered'>
      <ul className='pagination-list'>
        {pageNumbers.map((number, i) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              // href='#'
              className='pagination-link'
            >
              {networks[i].network}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
