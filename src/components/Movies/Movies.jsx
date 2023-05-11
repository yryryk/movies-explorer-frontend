import './Movies.css';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreMoviesButton from './MoreMoviesButton/MoreMoviesButton';
import { useState } from 'react';

function Movies(props) {
  const {moviesCardList} = props;
  const [multiplier, setMultiplier] = useState(4*Math.floor(window.innerWidth/320))
  const [isSwitcherChecked, setIsSwitcherChecked] = useState(false);

  window.addEventListener('resize', () => {
    setMultiplier(4*Math.floor(window.innerWidth/320));
  });

  function handleSwitch(evt) {
    setIsSwitcherChecked(evt.target.checked)
  }

  return (
    <main className="movies">
      <SearchForm handleSwitch={handleSwitch} />
      {moviesCardList.length?<MoviesCardList {...props} multiplier={multiplier} isSwitcherChecked={isSwitcherChecked} />:<Preloader />}
      <MoreMoviesButton exist={moviesCardList.length>multiplier-1} />
    </main>
  );
}

export default Movies;
