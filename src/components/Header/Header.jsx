import './Header.css';
import {Outlet} from 'react-router-dom';
import Logo from './Logo/Logo';

function Header() {
  return (
  <header className="header">
    <Logo />
    <Outlet />
  </header>
  );
}

export default Header;
