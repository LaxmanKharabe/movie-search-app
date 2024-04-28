import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviesList from './Components/MoviesList/MoviesList';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import NavBar from './Components/NavBar/NavBar';


function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<MoviesList />} />
          <Route exact path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;