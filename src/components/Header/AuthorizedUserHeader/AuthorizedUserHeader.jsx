import './AuthorizedUserHeader.css';
import { NavLink } from 'react-router-dom';

function AuthorizedUserHeader() {
  return (
    <div className="header-autorized">
      <div>
        <NavLink to="/movies" className= {({isActive}) => `${isActive ? "header-autorized__link header-autorized__link_active" : "header-autorized__link"}`}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className= {({isActive}) => `${isActive ? "header-autorized__link header-autorized__link_active" : "header-autorized__link"}`}>Сохранённые фильмы</NavLink>
      </div>
      <NavLink to="/profile" className= {({isActive}) => `${isActive ? "header-autorized__button-link header-autorized__link_active" : "header-autorized__button-link"}`}>Аккаунт</NavLink>
    </div>
  );
}

export default AuthorizedUserHeader;
