import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <a href="#about" className="nav-tab__link link">О проекте</a>
      <a href="#techs" className="nav-tab__link link">Технологии</a>
      <a href="#me" className="nav-tab__link link">Студент</a>
    </nav>
  );
}

export default NavTab;
