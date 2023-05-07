import './UnauthorizedUserHeader.css';
import { Link } from 'react-router-dom';

function UnauthorizedUserHeader() {
  return (
  <nav className="header-unautorized">
    <Link to="/signup" className="header-unautorized__link link">
      Регистрация
    </Link>
    <Link to="/signin"  className="header-unautorized__link header-unautorized__link_black link">
      Войти
    </Link>
  </nav>
  );
}

export default UnauthorizedUserHeader;
