import './AuthorizedUserHeader.css';
import { NavLink } from 'react-router-dom';

function AuthorizedUserHeader() {
  return (
    <nav className="header-autorized">
      <div>
        <NavLink to="/movies" className= {({isActive}) => `${isActive ? "header-autorized__link header-autorized__link_active link" : "header-autorized__link link"}`}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className= {({isActive}) => `${isActive ? "header-autorized__link header-autorized__link_active link" : "header-autorized__link link"}`}>Сохранённые фильмы</NavLink>
      </div>
      <NavLink to="/profile" className= {({isActive}) => `${isActive ? "header-autorized__button-link header-autorized__link_active link" : "header-autorized__button-link link"}`}>Аккаунт</NavLink>
    </nav>
  );
}

export default AuthorizedUserHeader;
