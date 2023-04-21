import './MoviesCard.css';

function MoviesCard(props) {
  const {movie, handleSelectMovies} = props;

  function handleSelectClick() {
    handleSelectMovies(movie._id);
  }

  return (
    <div className="movies-card">
      <img className="movies-card__image" src={movie.link} alt={movie.name} />
      <div className="movies-card__paraphernalia">
        <h2 className="movies-card__title">{movie.name}</h2>
        <button aria-label="выбрать" type="button" className={
          movie.isSelected ? "movies-card__button movies-card__button_active":"movies-card__button"
        } onClick={handleSelectClick}></button>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
