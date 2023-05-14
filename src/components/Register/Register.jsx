import './Register.css';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import { useForm } from '../../hooks/useForm';

function Register({onRegister}) {
  const {values, handleChange, setValues} = useForm({
    name: '',
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
    setValues({
      name: '',
      email: '',
      password: '',
    });
  }

  return (
    <main className="register">
      <AuthorizationForm formProps={{
          onSubmit: handleSubmit,
          name: "register",
          title: "Добро пожаловать!",
          buttonText: "Зарегистрироваться",
          linkTitle: "Уже зарегистрированы?",
          linkPath: "/signin",
          linkName: "Войти"
        }}
      >
        <label className="auth-form__label" htmlFor="name-input">Имя</label>
        <input id="name-input" type="text" name="name" className="auth-form__input input" onChange={handleChange} minLength="2" maxLength="40" required />
        <span className="auth-form__error name-input-error error">Что-то пошло не так...</span>
        <label className="auth-form__label" htmlFor="email-input">E-mail</label>
        <input id="email-input" type="email" name="email" className="auth-form__input input" onChange={handleChange} minLength="2" maxLength="40" required />
        <span className="auth-form__error email-input-error error">Что-то пошло не так...</span>
        <label className="auth-form__label" htmlFor="password-input">Пароль</label>
        <input id="password-input" type="password" name="password" className="auth-form__input input" onChange={handleChange} minLength="2" maxLength="200" required />
        <span className="auth-form__error password-input-error error">Что-то пошло не так...</span>
      </AuthorizationForm>
    </main>
  );
}

export default Register;
