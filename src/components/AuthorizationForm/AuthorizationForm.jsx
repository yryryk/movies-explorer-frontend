import './AuthorizationForm.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import FormValidator from '../../utils/Validate/Validate';
import validationSettings from '../../utils/constants/validationSettings';

function AuthorizationForm(props) {
  const { name, title, onSubmit, buttonText, linkTitle, linkPath, linkName } = props.formProps;

  useEffect(() => {
    const form = document.querySelector(validationSettings.formSelector);
    const formValidatorObject = new FormValidator(validationSettings, form);
    formValidatorObject.enableValidation();
  }, [])

  return (
    <div className="auth-form" id={`auth-form-${name}`}>
      <Logo />
      <h1 className="auth-form__title">{title}</h1>
      <form className="auth-form__form form" name={name} onSubmit={onSubmit}>
        {props.children}
        <span className="auth-form__error api-error">Произошла ошибка.</span>
        <button aria-label="кнопка сохранить" type="submit" className="auth-form__submit-button submit-button button">{buttonText}</button>
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
