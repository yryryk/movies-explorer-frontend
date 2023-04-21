import './Switcher.css';

function Switcher(props) {
  return (
    <div className={props.className}>
      <label className="checkbox-label">
        <input type="checkbox" className="checkbox-input" />
        <div className="checkbox-switcher"></div>
        <div className="checkbox-inner"></div>
      </label>
      {props.children}
    </div>
  );
}

export default Switcher;
