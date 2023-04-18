import './Headline.css';

function Headline(props) {
  return (
    <>
      <h2 className="title">{props.title}</h2>
      <div className="line"></div>
    </>
  );
}

export default Headline;
