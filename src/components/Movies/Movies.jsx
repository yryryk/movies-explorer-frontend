import './Movies.css';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreMoviesButton from './MoreMoviesButton/MoreMoviesButton';
import { useState } from 'react';

function Movies(props) {
  const {moviesCardList, saved} = props;
  const [multiplier, setMultiplier] = useState(4*Math.floor(window.innerWidth/320))
  const [isSwitcherChecked, setIsSwitcherChecked] = useState(false);
  const [searchValue, setSearchValue] = useState(false);

  window.addEventListener('resize', () => {
    setMultiplier(4*Math.floor(window.innerWidth/320));
  });

  function handleSwitch(evt) {
    setTimeout(() => {
      setIsSwitcherChecked(evt.target.checked)
    }, 150);
  }

  function onSearch(searchQuery) {
    setSearchValue(searchQuery)
  }

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
    <main className="movies">
    <SearchForm handleSwitch={handleSwitch} onSearch={onSearch} saved={props.saved} />
      {moviesCardList.length
        ?filteredMoviesCardList.length
          ?<MoviesCardList {...props} filteredMoviesCardList={filteredMoviesCardList} />
          :<p className="movies__message">По вашему запросу ничего не найдено</p>
        :!saved
          ?<Preloader />
          :<p className="movies__message">Здесь ещё ничего нет</p>
      }
      <MoreMoviesButton exist={filteredMoviesCardList.length&&moviesCardList.length>multiplier-1} />
    </main>
  );
}

export default Movies;
