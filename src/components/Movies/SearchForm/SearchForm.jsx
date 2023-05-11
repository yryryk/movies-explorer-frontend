import './SearchForm.css';
import Switcher from '../Switcher/Switcher';

function SearchForm(props) {
  const {handleSearch, handleSwitch} = props;
  return (
    <section className="search-form">
      <form className="search-form__label" onSubmit={handleSearch} >
        <input type="text" className="search-form__search-input" placeholder="Фильм" search="true" required />
        <button aria-label="Поиск" type="submit" className="search-form__search-button button"></button>
      </form>
      <Switcher className="search-form__switcher" handleSwitch={handleSwitch}><p className="search-form__switcher-name">Короткометражки</p></Switcher>
    </section>
  );
}

export default SearchForm;
