import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieDetails.css';
import { useFetchMovieDetailsQuery } from '../../redux/features/movieData';
import utils from '../../utils';
import MoviesList from '../MoviesList/MoviesList';
const MovieDetails = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useFetchMovieDetailsQuery(id);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log(data);
    }, [id]);

    return (
        <div className="movieDetails">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <div className='selectedMovie'>
                    <div className='item1'>
                        <img src={`${utils.BASE_IMG_PATH}/w300${data.poster_path}`} alt={data.title} />
                    </div>
                    <div className='item2'>
                        <h2>{data.title}</h2>
                        <p>Genres: {data.genres.map(gen => <span key={gen.id}>{gen.name + ", "}</span>)}</p>
                        <p>Overview: {data.overview}</p>
                        <p>Rating: {data.vote_average.toFixed(1)}</p>
                        <p>Language:
                            <span>{data.spoken_languages.map(i => <span key={i.id}> {i.name}</span>)}</span></p>
                        <p>Release Date: {data.release_date}</p>
                        <p>Status: {data.status}</p>
                        <a className='btnBack' onClick={() => navigate('/')}>&lt; Go back previouse page</a>
                    </div>
                </div>
            )}
            <MoviesList />
        </div>
    );
};
export default MovieDetails;