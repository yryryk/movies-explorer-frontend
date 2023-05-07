import './Switcher.css';

function Switcher(props) {
  return (
    <div className={props.className}>
      <label className={`${props.className}-insides checkbox-label button`}>
        <input type="checkbox" className={`${props.className}-inside checkbox-input`} />
        <div className={`${props.className}-inside checkbox-switcher`}></div>
        <div className={`${props.className}-inside checkbox-inner`}></div>
      </label>
      {props.children}
    </div>
  );
}

export default Switcher;
