import './AuthorizationForm.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

function AuthorizationForm(props) {
  const { name, title, onSubmit, buttonText, linkTitle, linkPath, linkName } = props.formProps;
  return (
    <div className="auth-form" id={`auth-form-${name}`}>
      <Logo />
      <h1 className="auth-form__title">{title}</h1>
      <form className="auth-form__form" name={name} onSubmit={onSubmit}>
        {props.children}
        <button aria-label="кнопка сохранить" type="submit" className="auth-form__submit-button button">{buttonText}</button>
      </form>
      <div className="auth-form__link-container">
        <p className="auth-form__link-title">{linkTitle}</p>
        <nav className="auth-form__nav">
          <Link to={linkPath} className="auth-form__link link">
            {linkName}
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default AuthorizationForm;
