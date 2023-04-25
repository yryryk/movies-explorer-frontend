import './Login.css';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import { useForm } from '../../hooks/useForm';

function Login() {
  const {handleChange, setValues} = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
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
        <input id="email-input" type="email" name="email" className="auth-form__input" onChange={handleChange} minLength="2" maxLength="40" required />
        <span className="auth-form__error">Что-то пошло не так...</span>
        <label className="auth-form__label" htmlFor="password-input">Пароль</label>
        <input id="password-input" type="password" name="password" className="auth-form__input" onChange={handleChange} minLength="2" maxLength="200" required />
        <span className="auth-form__error auth-form__error_active">Что-то пошло не так...</span>
      </AuthorizationForm>
    </main>
  );
}

export default Login;
