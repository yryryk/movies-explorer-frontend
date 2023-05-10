import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesCardList, handleSelectMovies, saved, multiplier }) {

  return (
    <section className="movies-card-list">
      {moviesCardList.map((movie, i) => i<multiplier&&(<MoviesCard saved={saved} key={movie.movieId} movie={movie} handleSelectMovies={handleSelectMovies} />))}
      <div></div><div></div><div></div>
    </section>
  );
}

export default MoviesCardList;
