import './Techs.css';
import Headline from '../../Headline/Headline';

function Techs() {
  return (
    <section className="techs">
      <Headline title="Технологии"/>
      <h3 className="techs__about-title">7 технологий</h3>
      <p className="techs__about-paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__tech">HTML</li>
        <li className="techs__tech">CSS</li>
        <li className="techs__tech">JS</li>
        <li className="techs__tech">React</li>
        <li className="techs__tech">Git</li>
        <li className="techs__tech">Express.js</li>
        <li className="techs__tech">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
