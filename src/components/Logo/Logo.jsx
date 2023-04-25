import './Logo.css';
import { Link } from 'react-router-dom';

function Logo(props) {
  return (
    <Link to="/" className={`logo ${props.className||""}`}>
    </Link>
  );
}

export default Logo;
