import './Techs.css';
import Headline from '../../Headline/Headline';

function Techs() {
  return (
    <section className="techs">
      <Headline title="Технологии"/>
      <h3 className="techs__about-title">7 технологий</h3>
      <p className="techs__about-paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        {["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"].map((tech, i) => (<li key={i} className="techs__tech">{tech}</li>))}
      </ul>
    </section>
  );
}

export default Techs;
