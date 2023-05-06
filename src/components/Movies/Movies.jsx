import './Movies.css';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreMoviesButton from './MoreMoviesButton/MoreMoviesButton';
import { useState } from 'react';

function Movies(props) {
  const {moviesCardList} = props;
  const [multiplier, setMultiplier] = useState(4*Math.floor(window.innerWidth/320))

  window.addEventListener('resize', () => {
    setMultiplier(4*Math.floor(window.innerWidth/320));
  });
  return (
    <main className="movies">
      <SearchForm />
      {moviesCardList.length?<MoviesCardList {...props} multiplier={multiplier} />:<Preloader />}
      <MoreMoviesButton exist={moviesCardList.length>multiplier-1} />
    </main>
  );
}

export default Movies;
