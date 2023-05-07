import './SearchForm.css';
import Switcher from '../Switcher/Switcher';

function SearchForm(props) {
  const {handleSearch} = props;
  return (
    <section className="search-form">
      <form className="search-form__label">
        <input type="text" className="search-form__search-input" placeholder="Фильм" search="true" required />
        <button aria-label="Поиск" type="submit" className="search-form__search-button button" onClick={handleSearch}></button>
      </form>
      <Switcher className="search-form__switcher"><p className="search-form__switcher-name">Короткометражки</p></Switcher>
    </section>
  );
}

export default SearchForm;
