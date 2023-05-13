import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesCardList, handleSelectMovies, saved, multiplier, isSwitcherChecked, searchValue }) {

    function allowMovie(movie) {
      let allow = 1;
      if(isSwitcherChecked) {
        movie.duration<41?allow *= 1:allow *= 0;
      }
      if(searchValue) {
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())?allow *= 1:allow *= 0;
      } else {
        saved?allow *= 1:allow *= 0;
      }
      return Boolean(allow)
    }
    const filteredMoviesCardList = moviesCardList.filter((movie) => allowMovie(movie)).filter((movie, i) => i<multiplier);

  return (
    <section className="movies-card-list">
      {filteredMoviesCardList.map((movie) => <MoviesCard saved={saved} key={movie.movieId} movie={movie} handleSelectMovies={handleSelectMovies} />)}
      <div></div><div></div><div></div>
    </section>
  );
}

export default MoviesCardList;
