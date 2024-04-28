import { configureStore } from '@reduxjs/toolkit'
import { movieData } from '../features/movieData'

export const store = configureStore({
    reducer: {
        [movieData.reducerPath]: movieData.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieData.middleware)
})
