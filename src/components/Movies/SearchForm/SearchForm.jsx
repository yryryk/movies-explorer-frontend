import './SearchForm.css';
import Switcher from '../Switcher/Switcher';

function SearchForm(props) {
  const {handleSearch} = props;
  return (
    <section className="search-form">
      <label className="search-form__label">
        <input type="text" className="search-form__search-input" placeholder="Фильм" search="true" />
        <button aria-label="Поиск" type="button" className="search-form__search-button button" onClick={handleSearch}></button>
      </label>
      <Switcher className="search-form__switcher"><p className="search-form__switcher-name">Короткометражки</p></Switcher>
    </section>
  );
}

export default SearchForm;
