import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, } from 'react';

function MoviesCardList(props) {
  const {moviesCardList, handleSelectMovies, saved} = props;
  const [multiplier, setMultiplier] = useState(4*Math.floor(window.innerWidth/320))

  window.addEventListener('resize', () => {
    setMultiplier(4*Math.floor(window.innerWidth/320));
  });

  return (
    <section className="movies-card-list">
      {moviesCardList.map((movie, i) => i<multiplier&&(<MoviesCard saved={saved} key={movie._id} movie={movie} handleSelectMovies={handleSelectMovies} />))}
      <div></div><div></div><div></div>
    </section>
  );
}

export default MoviesCardList;
