import './NotFound.css';
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  function goBack() {
      navigate(-1);
  }

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="not-found__button" onClick={goBack}>Назад</button>
    </div>
  );
}

export default NotFound;
