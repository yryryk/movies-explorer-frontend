import './Movies.css';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreMoviesButton from './MoreMoviesButton/MoreMoviesButton';
import { useState, useContext, useEffect } from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Movies(props) {
  const currentUser = useContext(CurrentUserContext);
  const {moviesCardList, saved} = props;
  const [multiplier, setMultiplier] = useState(4*Math.floor(window.innerWidth/320))
  const [isSwitcherChecked, setIsSwitcherChecked] = useState(currentUser.switchersChecked);
  const [searchValue, setSearchValue] = useState(!saved?currentUser.searchQuery:false);

  window.addEventListener('resize', () => {
    setMultiplier(4*Math.floor(window.innerWidth/320));
  });

  useEffect(() => {
    setIsSwitcherChecked(currentUser.switchersChecked);
  }, [currentUser.switchersChecked]);

  useEffect(() => {
    !saved&&setSearchValue(currentUser.searchQuery)
  }, [currentUser.searchQuery, saved]);

  function handleSwitch(evt) {
    setTimeout(() => {
      const switchers = [...isSwitcherChecked];
      switchers[Number(saved)] = !evt.target.checked;
      setIsSwitcherChecked(switchers);
      currentUser.switchersChecked = switchers;
      localStorage.setItem('Switchers', JSON.stringify(switchers));
    }, 150);
  }

  function onSearch(searchQuery) {
    setSearchValue(searchQuery)
    !saved&&(currentUser.searchQuery = searchQuery);
    !saved&&(localStorage.setItem('SearchQuery', JSON.stringify(searchQuery)));
  }

  function allowMovie(movie) {
    let allow = 1;
    if(isSwitcherChecked[Number(saved)]) {
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
    <SearchForm handleSwitch={handleSwitch} onSearch={onSearch} saved={props.saved} searchValue={searchValue} isSwitcherChecked={isSwitcherChecked} />
      {moviesCardList.length
        ?filteredMoviesCardList.length
          ?<MoviesCardList {...props} filteredMoviesCardList={filteredMoviesCardList} />
          :<p className="movies__message">По вашему запросу ничего не найдено</p>
        :!saved
          ?<Preloader />
          :<p className="movies__message">Здесь ещё ничего нет</p>
      }
      <MoreMoviesButton exist={filteredMoviesCardList.length>multiplier-1} />
    </main>
  );
}

export default Movies;
