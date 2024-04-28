import React, { useEffect, useState } from 'react';
import { useSearchMoviesQuery } from '../../redux/features/movieData';
import Cards from '../Cards/Cards';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { data, isLoading, error } = useSearchMoviesQuery(searchTerm);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSearch = async () => {
    setSearchTerm(searchText.trim());
    setHasSearched(true);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  useEffect(() => {
    if (hasSearched && !isLoading && data) {
      if (data.total_results === 0) {
        setMessage('No search results found.');
      } else {
        setMessage('');
      }
    }
  }, [hasSearched, isLoading, data]);

  return (
    <div className='searchBar'>
      <div className="wrap">
        <div className='inputBox'>
          <input type="text" value={searchText} onChange={handleChange} placeholder="Search for movies" />
          <button onClick={handleSearch} disabled={isLoading} style={{ cursor: 'pointer' }}>
            {isLoading ? 'Searching...' : <i className="bi bi-search"></i>}
          </button>
        </div>
        <p style={{ color: 'red' }}>{message}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data && data.total_results > 0 ? (
          data.results.map((movieDetails) => (
            <Cards key={movieDetails.id} movieDetails={movieDetails} onClick={() => handleCardClick(movieDetails.id)} />
          ))
        ) : null}
      </div>
    </div>
  );
};
export default SearchBar;