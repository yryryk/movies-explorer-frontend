import './MoreMoviesButton.css';

function MoreMoviesButton(props) {
  const {handleMore} = props;
  return (
    <section className="more-button">
      <button aria-label="Ещё" type="button" className="more-button__button" onClick={handleMore}>Ещё</button>
    </section>
  );
}

export default MoreMoviesButton;
