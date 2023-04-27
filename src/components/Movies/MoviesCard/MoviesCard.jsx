import './MoviesCard.css';

function MoviesCard(props) {
  const {movie, handleSelectMovies, saved} = props;

  function handleSelectClick() {
    handleSelectMovies(movie._id);
  }

  return (
    <div className="movies-card">
      <a href="https://youtu.be/pCpLWbHVNhk" target="_blank" rel="noreferrer" className="link">
        <img className="movies-card__image" src={movie.link} alt={movie.name} />
      </a>
      <div className="movies-card__paraphernalia">
        <h2 className="movies-card__title">{movie.name}</h2>
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
