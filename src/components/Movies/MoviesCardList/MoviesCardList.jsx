import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const {moviesCardList, handleSelectMovies} = props;
  return (
    <section className="movies-card-list">
      {moviesCardList.map((movie) => (<MoviesCard key={movie._id} movie={movie} handleSelectMovies={handleSelectMovies} />))}
      <div></div><div></div><div></div> {/* Фальш-элементы для того что-бы карточки
      не расширялись на весь экран когда их мало (n < 4) */}
    </section>
  );
}

export default MoviesCardList;
