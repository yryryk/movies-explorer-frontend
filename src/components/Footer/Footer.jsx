import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <span className="footer__copyright">&copy; {(new Date()).getFullYear()}</span>
        <nav>
          <ul className="footer__menu">
            <li><a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a></li>
            <li><a href="https://github.com/" target="_blank" rel="noreferrer" className="footer__link">Github</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
