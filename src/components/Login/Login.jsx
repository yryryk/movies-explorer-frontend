import './Login.css';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import { useForm } from '../../hooks/useForm';

function Login({onLogin}) {
  const {values, handleChange, setValues} = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
    setValues({
      email: '',
      password: '',
    });
  }

  return (
    <main className="login">
      <AuthorizationForm formProps={{
          onSubmit: handleSubmit,
          name: "login",
          title: "Рады видеть!",
          buttonText: "Войти",
          linkTitle: "Ещё не зарегистрированы?",
          linkPath: "/signup",
          linkName: "Регистрация"
        }}
      >
        <label className="auth-form__label" htmlFor="email-input">E-mail</label>
        <input id="login-email-input" type="email" name="email" className="auth-form__input input" onChange={handleChange} minLength="2" maxLength="40" required />
        <span className="auth-form__error login-email-input-error error">Что-то пошло не так...</span>
        <label className="auth-form__label" htmlFor="password-input">Пароль</label>
        <input id="login-password-input" type="password" name="password" className="auth-form__input input" onChange={handleChange} minLength="2" maxLength="32" required />
        <span className="auth-form__error login-password-input-error error">Что-то пошло не так...</span>
      </AuthorizationForm>
    </main>
  );
}

export default Login;
