import './MoreMoviesButton.css';

function MoreMoviesButton(props) {
  const {handleMore, exist} = props;
  return (
    <section className="more-button">
      <button aria-label="Ещё" type="button" className={`more-button__button button${!exist&&" more-button__button_not-active"}`} onClick={handleMore}>Ещё</button>
    </section>
  );
}

export default MoreMoviesButton;
