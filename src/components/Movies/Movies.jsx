import './Movies.css';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreMoviesButton from './MoreMoviesButton/MoreMoviesButton';

function Movies(props) {
  const {moviesCardList, handleSelectMovies} = props;
  return (
    <main className="movies">
      <SearchForm />
      {moviesCardList.length?<MoviesCardList moviesCardList={moviesCardList} handleSelectMovies={handleSelectMovies} />:<Preloader />}
      {moviesCardList.length>15&&<MoreMoviesButton />}
    </main>
  );
}

export default Movies;
