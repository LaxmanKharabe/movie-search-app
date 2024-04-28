import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cards.css';
import utils from '../../utils';

const Cards = ({ movieDetails }) => {
  const navigate = useNavigate();

  const imgPath = movieDetails.poster_path
    ? `${utils.BASE_IMG_PATH}/w500${movieDetails.poster_path}`
    : '/poster-holder.jpg';

  const handleClick = () => {
    navigate(`/movie/${movieDetails.id}`);
  };

  return (
    <div className='cards' onClick={handleClick}>
      <img src={imgPath} className='postImg' alt={movieDetails.title} />
    </div>
  );
};

export default Cards;