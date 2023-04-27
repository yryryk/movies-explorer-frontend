import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfoljo__title">Портфолио</h2>
      <ul className="portfoljo__list">
        {[
          {link: "https://github.com/yryryk/how-to-learn", name: "Статичный сайт"},
          {link: "https://github.com/yryryk/russian-travel", name: "Адаптивный сайт"},
          {link: "https://github.com/yryryk/react-mesto-api-full-gha", name: "Одностраничное приложение"}
        ].map((item, i) => (
          <li key={i} className="portfoljo__list-item">
            <a href={item.link} target="_blank" rel="noreferrer" className="portfoljo__list-link link">
              {item.name}
              <div className="portfoljo__list-arrow"></div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Portfolio;
