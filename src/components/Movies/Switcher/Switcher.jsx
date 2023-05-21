import './Switcher.css';
import { useContext } from 'react';
import {CurrentUserContext} from '../../../contexts/CurrentUserContext';

function Switcher(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className={props.className}>
      <label className={`${props.className}-insides checkbox-label button`}>
        <input type="checkbox" onChange={props.handleSwitch} className={`${props.className}-inside checkbox-input`} checked={currentUser.switchersChecked[Number(props.saved)]} />
        <div className={`${props.className}-inside checkbox-switcher`}></div>
        <div className={`${props.className}-inside checkbox-inner`}></div>
      </label>
      {props.children}
    </div>
  );
}

export default Switcher;
