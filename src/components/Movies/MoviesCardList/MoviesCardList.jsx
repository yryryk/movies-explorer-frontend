import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ handleSelectMovies, saved, filteredMoviesCardList }) {
  return (
    <section className="movies-card-list">
      {filteredMoviesCardList.map((movie) => <MoviesCard saved={saved} key={movie.movieId} movie={movie} handleSelectMovies={handleSelectMovies} />)}
      <div></div><div></div><div></div>
    </section>
  );
}

export default MoviesCardList;
