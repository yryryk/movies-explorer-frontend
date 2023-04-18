import './AboutMe.css';
import Headline from '../../Headline/Headline';
import Picture from '../../../images/pic__COLOR_pic.png';

function AboutMe() {
  return (
    <section className="about-me" id="me">
      <Headline title="Студент"/>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__info-title">Виталий</h3>
          <p className="about-me__info-subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__info-paragraph">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href="https://github.com/yryryk" target="_blank" rel="noreferrer" className="about-me__link">Github</a>
        </div>
        <img className="about-me__picture" src={Picture} alt="Фото студента"></img>
      </div>
    </section>
  );
}

export default AboutMe;
