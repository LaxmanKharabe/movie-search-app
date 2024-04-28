import React from 'react';
import Cards from '../Cards/Cards';
import { Pagination } from '@mui/material';

const MovieCardsPagination = ({ data, totalPages, currentPage, handlePageChange, handleCardClick }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', placeItems: 'center'}}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data &&
          data.results.map((movieDetails) => (
            <Cards key={movieDetails.id} movieDetails={movieDetails} onClick={handleCardClick} />
          ))}
      </div>
      <div className='pagin'>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="secondary" size="large" shape="rounded" />
      </div>
    </div>
  );
};

export default MovieCardsPagination;