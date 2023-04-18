import './AboutProject.css';
import Headline from '../../Headline/Headline';

function AboutProject() {
  return (
    <section className="about-project">
      <Headline title="О проекте"/>
      <div className="about-project__data">
        <div>
          <h3 className="about-project__data-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__data-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div>
          <h3 className="about-project__data-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__data-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__visual-data">
        <div className="about-project__visual-data-first-section">
          <div className="about-project__visual-data-block about-project__visual-data-block_type_black">1 неделя</div>
          <div className="about-project__visual-data-text">Back-end</div>
        </div>
        <div className="about-project__visual-data-second-section">
          <div className="about-project__visual-data-block about-project__visual-data-block_type_gray">4 недели</div>
          <div className="about-project__visual-data-text">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
