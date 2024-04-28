import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import utils from '../../utils';
export const movieData = createApi({
    reducerPath: 'movieData',
    baseQuery: fetchBaseQuery({baseUrl: utils.BASE_PATH}),
    endpoints: (builder) => ({
        FetchMovies: builder.query({
            query: (currpage) => `/discover/movie?api_key=${utils.API_KEY}&page=${currpage}`
        }),
        SearchMovies: builder.query({
            query: (searchTerm) => `/search/movie?api_key=${utils.API_KEY}&query=${searchTerm}`
        }),
        FetchMovieDetails: builder.query({
            query: (id) => `/movie/${id}?api_key=${utils.API_KEY}`
        }),
    })
});
export const { useFetchMoviesQuery,  useSearchMoviesQuery, useFetchMovieDetailsQuery } = movieData;