import './UnauthorizedUserHeader.css';
import { Link } from 'react-router-dom';

function UnauthorizedUserHeader() {
  return (
  <div className="header-unautorized">
    <Link to="/signup" className="header-unautorized__link_transparent">
      Регистрация
    </Link>
    <Link to="/signin" className="header-unautorized__link_black">
      Войти
    </Link>
  </div>
  );
}

export default UnauthorizedUserHeader;
