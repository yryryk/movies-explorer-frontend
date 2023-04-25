import './Profile.css';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Profile() {
  const [edit, setEdit] = useState(false);

  const {handleChange, setValues} = useForm({
    name: '',
    email: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    setValues({
      name: '',
      email: '',
    });
  }

  function handleEdit() {
    setEdit(true);
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form" name="profile" onSubmit={handleSubmit}>
        <div className="profile__container">
          <label className="profile__label" htmlFor="profile-name-input">Имя</label>
          <input id="profile-name-input" type="text" name="name" className="profile__input" onChange={handleChange} minLength="2" maxLength="40" required />
        </div>
        <div className="profile__container">
          <label className="profile__label" htmlFor="profile-email-input">E-mail</label>
          <input id="profile-email-input" type="email" name="email" className="profile__input" onChange={handleChange} minLength="2" maxLength="40" required />
        </div>
        {edit&&<>
          <span className="profile__error profile__error_active">При обновлении профиля произошла ошибка.</span>
          <button aria-label="кнопка сохранить" type="submit" className="profile__submit-button profile__submit-button_not-active">Сохранить</button>
        </>}
      </form>
     {!edit&&<>
        <button aria-label="кнопка сохранить" type="button" className="profile__edit-button" onClick={handleEdit}>Редактировать</button>
        <Link to="/" className="profile__link-quit">Выйти из аккаунта</Link>
      </>}
    </main>
  );
}

export default Profile;
