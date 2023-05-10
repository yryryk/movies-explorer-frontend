import './MoviesCard.css';

function MoviesCard({movie, handleSelectMovies, saved}) {

  function handleSelectClick() {
    handleSelectMovies(movie.movieId);
  }
  const durationMinute = movie.duration%60;
  const duration = `${Math.floor(movie.duration/60)}ч ${durationMinute>9?durationMinute:"0"+ durationMinute}м`;

  return (
    <div className="movies-card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer" className="link">
        <img className="movies-card__image" src={movie.image} alt={movie.nameRU} />
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
        <p className="movies-card__duration">{duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
