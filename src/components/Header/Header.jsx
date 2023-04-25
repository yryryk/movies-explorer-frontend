import './Header.css';
import {Outlet} from 'react-router-dom';
import Logo from '../Logo/Logo';

function Header() {
  return (
  <header className="header">
    <Logo className={"header__logo"} />
    <Outlet />
  </header>
  );
}

export default Header;
