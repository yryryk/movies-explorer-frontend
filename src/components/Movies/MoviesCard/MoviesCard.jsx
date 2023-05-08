import './MoviesCard.css';

function MoviesCard(props) {
  const {movie, handleSelectMovies, saved} = props;

  function handleSelectClick() {
    handleSelectMovies(movie.id);
  }

  return (
    <div className="movies-card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer" className="link">
        <img className="movies-card__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
      </a>
      <div className="movies-card__paraphernalia">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <button aria-label="выбрать" type="button" className={
          saved
            ?"movies-card__button-cross button"
            :movie.isSelected
              ?"movies-card__button movies-card__button_active button"
              :"movies-card__button button"
        } onClick={handleSelectClick}></button>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
