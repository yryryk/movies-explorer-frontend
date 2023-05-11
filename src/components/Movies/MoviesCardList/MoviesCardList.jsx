import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesCardList, handleSelectMovies, saved, multiplier, isSwitcherChecked }) {

    function allowMovie(movie) {
      let allow = 1;
      if(isSwitcherChecked) {
        movie.duration<41?allow *= 1:allow *= 0;
      }
      return Boolean(allow)
    }
    const editedMoviesCardList = moviesCardList.filter((movie) => allowMovie(movie)).filter((movie, i) => i<multiplier);

  return (
    <section className="movies-card-list">
      {editedMoviesCardList.map((movie) => <MoviesCard saved={saved} key={movie.movieId} movie={movie} handleSelectMovies={handleSelectMovies} />)}
      <div></div><div></div><div></div>
    </section>
  );
}

export default MoviesCardList;
