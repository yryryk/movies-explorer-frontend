import './SavedMovies.css';

function SavedMovies({ component: Component, ...props  }) {
  const {moviesCardList, handleSelectMovies} = props;
  const selectedMoviesCardList = moviesCardList.filter((movie)=>movie.isSelected)

  return (
    <Component handleSelectMovies={handleSelectMovies} moviesCardList={selectedMoviesCardList}  />
  );
}

export default SavedMovies;
