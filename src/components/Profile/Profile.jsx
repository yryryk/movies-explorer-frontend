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
  const [formValidatorObject, setFormValidatorObject] = useState(null);
  const [updateUser, setUpdateUser] = useState(true);
  const profileApiError = document.querySelector('.profile-api-error');

  const {values, handleChange, setValues} = useForm({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (edit) {
      const form = document.querySelector(validationSettings.formSelector);
      const formValidatorObject2 = new FormValidator(validationSettings, form);
      formValidatorObject2.enableValidation();
      setFormValidatorObject(formValidatorObject2);
    }
  }, [edit]);

  useEffect(() => {
    if (formValidatorObject) {
      formValidatorObject.isProfile = true;
      if(currentUser.name===values.name&&currentUser.email===values.email) {
        formValidatorObject.disableButton()
      }
    }
  }, [currentUser.email, currentUser.name, formValidatorObject, values.email, values.name])

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await onUpdateUser(values);
      if(result) {
        setUpdateUser(true);
        profileApiError.classList.add('error_active');
        setEdit(false);
      }
    } catch (err) {
      if(err) {
        setUpdateUser(false);
        profileApiError.classList.add('error_active');
      }
      console.log(err);
    }
  }

  function handleEdit() {
    setEdit(true);
    profileApiError.classList.remove('error_active');
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
        <span className="profile__error profile-api-error api-error">{updateUser?"Профиль успешно обновлён":"При обновлении профиля произошла ошибка"}</span>
        {edit&&<>
          <button aria-label="кнопка сохранить" type="submit" className="profile__submit-button submit-button button">Сохранить</button>
        </>}
      </form>
     {!edit&&<>
        <button aria-label="кнопка сохранить" type="button" className="profile__edit-button button" onClick={handleEdit}>Редактировать</button>
        <Link to="/" className="profile__link-quit link" onClick={onSignOut} >Выйти из аккаунта</Link>
      </>}
    </main>
  );
}

export default Profile;
