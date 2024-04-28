import React, { useState } from 'react';
import { useSearchMoviesQuery } from '../../redux/features/movieData';
import Cards from '../Cards/Cards';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ sendDataToParent }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useSearchMoviesQuery(searchTerm);
  const [message, setMessage] = useState('')

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSearch = () => {
    setSearchTerm(searchText.trim());
    if (searchTerm !== '' && data.total_results < 1) {
      setMessage('Movie not found');
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    sendDataToParent(data);
  };

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className='searchBar'>
      <div className="wrap">
        <div className='inputBox'>
          <input type="text" value={searchText} onChange={handleChange} placeholder="Search for movies" />
          <button onClick={handleSearch} disabled={isLoading} style={{ cursor: 'pointer' }}>
            {isLoading ? 'Searching...' : <i className="bi bi-search"></i>}
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <p style={{color: "red"}}>{message}</p>
        {data && data.results.map((movieDetails) => (
          <Cards key={movieDetails.id} movieDetails={movieDetails} onClick={() => handleCardClick(movieDetails.id)} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

