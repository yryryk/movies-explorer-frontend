import './AuthorizedUserHeader.css';
import { NavLink } from 'react-router-dom';
import BurgerButton from '../BurgerButton/BurgerButton';
import { useState, useEffect } from 'react';

function AuthorizedUserHeader() {
  const [burgerButton, setBurgerButton] = useState(null);
  useEffect(() => {
    setBurgerButton(document.querySelector('.burger-button'))
  }, []);

  function handleLinkClick() {
    window.innerWidth<1023&&burgerButton.click()
  }

  return (
    <>
    <nav className="header-autorized">
      <div className="header-autorized__container" >
        <NavLink to="/" className= {({isActive}) => `${isActive ? "header-autorized__link header-autorized__link-in-burger header-autorized__link_active link" : "header-autorized__link link header-autorized__link-in-burger"}`} onClick={handleLinkClick} >Главная</NavLink>
        <NavLink to="/movies" className= {({isActive}) => `${isActive ? "header-autorized__link header-autorized__link_active link" : "header-autorized__link link"}`} onClick={handleLinkClick} >Фильмы</NavLink>
        <NavLink to="/saved-movies" className= {({isActive}) => `${isActive ? "header-autorized__link header-autorized__link_active link" : "header-autorized__link link"}`} onClick={handleLinkClick} >Сохранённые фильмы</NavLink>
      </div>
      <NavLink to="/profile" className= {({isActive}) => `${isActive ? "header-autorized__button-link header-autorized__link-profile_active link" : "header-autorized__button-link link"}`} onClick={handleLinkClick} >Аккаунт</NavLink>
    </nav>
    <div className="header-autorized__overlay"></div>
    <BurgerButton width={44} height={44} />
    </>
  );
}

export default AuthorizedUserHeader;
