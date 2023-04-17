import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab() {
  return (
    <div className="nav-tab">
    <Link to="/signin" className="nav-tab__link">
      О проекте
    </Link>
    <Link to="/signin" className="nav-tab__link">
      Технологии
    </Link>
    <Link to="/signin" className="nav-tab__link">
      Студент
    </Link>
    </div>
  );
}

export default NavTab;
