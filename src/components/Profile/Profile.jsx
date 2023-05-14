import './Profile.css';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import FormValidator from '../../utils/Validate/Validate';
import validationSettings from '../../utils/constants/validationSettings';

function Profile({onSignOut, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (edit) {
      const form = document.querySelector(validationSettings.formSelector);
      const formValidatorObject2 = new FormValidator(validationSettings, form);
      formValidatorObject2.enableValidation();
    }
  }, [edit])

  const {values, handleChange, setValues} = useForm({
    name: '',
    email: '',
  });

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  function handleEdit() {
    setEdit(true);
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form form" name="profile" onSubmit={handleSubmit}>
        <span className="profile__error profile-name-input-error error">Что-то пошло не так...</span>
        <div className="profile__container">
          <label className="profile__label" htmlFor="profile-name-input">Имя</label>
          <input id="profile-name-input" type="text" name="name" className="profile__input input" onChange={handleChange} minLength="2" maxLength="40" value={values.name||''} required={edit?true:false} readOnly={!edit?true:false} />
        </div>
        <div className="profile__container">
          <label className="profile__label" htmlFor="profile-email-input">E-mail</label>
          <input id="profile-email-input" type="email" name="email" className="profile__input input" onChange={handleChange} minLength="2" maxLength="40" value={values.email||''} required={edit?true:false} readOnly={!edit?true:false} />
        </div>
        <span className="profile__error profile-email-input-error error">Что-то пошло не так...</span>
        {edit&&<>
          <span className="profile__error api-error">При обновлении профиля произошла ошибка.</span>
          <button aria-label="кнопка сохранить" type="submit" className="profile__submit-button submit-button button">Сохранить</button>
        </>}
      </form>
     {!edit&&<>
        <button aria-label="кнопка сохранить" type="button" className="profile__edit-button button" onClick={handleEdit}>Редактировать</button>
        <Link to="/signin" className="profile__link-quit link" onClick={onSignOut} >Выйти из аккаунта</Link>
      </>}
    </main>
  );
}

export default Profile;
