import './SearchForm.css';
import Switcher from '../Switcher/Switcher';
import { useForm } from '../../../hooks/useForm';
import { useEffect } from 'react';

function SearchForm(props) {
  const {onSearch, handleSwitch, saved, isSwitcherChecked, searchValue} = props;
  const {values, handleChange} = useForm({
    searchQuery: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(values.searchQuery);
  }

  useEffect(() => {
    const input = document.querySelector('#search');
    saved&&input.removeAttribute('required');
  },[saved]);

  return (
    <section className="search-form">
      <form className="search-form__label" onSubmit={handleSubmit} >
        <input type="text" id="search" name="searchQuery" className="search-form__search-input" placeholder="Фильм" defaultValue={!saved?searchValue:''} onChange={handleChange} search="true" required />
        <button aria-label="Поиск" type="submit" className="search-form__search-button button"></button>
      </form>
      <Switcher className="search-form__switcher" handleSwitch={handleSwitch} isSwitcherChecked={isSwitcherChecked} saved={saved} ><p className="search-form__switcher-name">Короткометражки</p></Switcher>
    </section>
  );
}

export default SearchForm;
