import './MoreMoviesButton.css';

function MoreMoviesButton(props) {
  const {handleMoreMovies, exist} = props;
  return (
    <section className="more-button">
      <button aria-label="Ещё" type="button" className={`more-button__button button${!exist?" more-button__button_not-active":""}`} onClick={handleMoreMovies}>Ещё</button>
    </section>
  );
}

export default MoreMoviesButton;
