import React, { useState } from 'react';
import './MoviesList.css';
import { useFetchMoviesQuery } from '../../redux/features/movieData';
import SearchBar from '../SearchBar/SearchBar';
import MovieCardsPagination from '../MovieCardsPagination/MovieCardsPagination';
import MovieDetails from '../MovieDetails/MovieDetails'; 

const MoviesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useFetchMoviesQuery(currentPage);
  const [searchData, setSearchData] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const totalPages = data.total_pages - 43340;

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="moviesContainer">
      <div>
        <SearchBar handleCardClick={handleCardClick} />
      </div>
      <div>
        {selectedMovie ? ( 
          <MovieDetails movieDetails={selectedMovie} onClose={handleCloseMovieDetails} />
        ) : (
          <>
            {(searchData) ? (
              <>
                <MovieCardsPagination data={searchData} totalPages={searchData.total_pages}
                  currentPage={currentPage} handlePageChange={handlePageChange} handleCardClick={handleCardClick} />
              </>
            ) : (
              <MovieCardsPagination
                data={data} totalPages={totalPages} currentPage={currentPage}
                handlePageChange={handlePageChange} handleCardClick={handleCardClick} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default MoviesList;