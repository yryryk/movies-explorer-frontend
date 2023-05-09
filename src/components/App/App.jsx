import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import AuthorizedUserHeader from '../Header/AuthorizedUserHeader/AuthorizedUserHeader';
import UnauthorizedUserHeader from '../Header/UnauthorizedUserHeader/UnauthorizedUserHeader';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import { useState, useEffect } from 'react';
import moviesApi from '../../utils/Api/MoviesApi';
import mainApi from '../../utils/Api/MainApi';
import auth from '../../utils/Auth/Auth';

function App() {
  const [moviesCardList, setMoviesCardList] = useState([]);
  const [selectedMoviesCardList, setSelectedMoviesCardList] = useState([]);
  const [successAuth, setSuccessAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthAndMovies() {
      try {
        const jwt = localStorage.getItem("JWT");
        if (jwt) {
          const token = await auth.checkToken(jwt);
          if (token) {
            mainApi.setToken(jwt);
            let movies = await moviesApi();
            movies = movies.map((movie) => {
              return {...movie, isSelected: false}
            });
            // уменьшаем алгоритмическую сложность 2*(N + K) < N*K
            const editedMovies = {};
            movies.forEach((movie) => {
              editedMovies[movie.id] = movie;
            });

            // const userMovies = await mainApi.getMovies();
            const userMovies = [1, 3, 5];
            userMovies.forEach((id) => {
              editedMovies[id].isSelected = true;
            });
            movies = Object.values(editedMovies);
            setMoviesCardList(movies);
            navigate("/movies");
            setSuccessAuth(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (!successAuth) {
      getAuthAndMovies();
    }
  },[navigate, successAuth]);

  const handleLogin = (inputValues) => {
    auth.signInUser(inputValues)
    .then((result) => {
      localStorage.setItem('JWT', result.token);
      mainApi.setToken(result.token);
      navigate("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleRegister = (inputValues) => {
    auth.signUpUser(inputValues)
    .then((result) => {
      localStorage.setItem('JWT', result.token);
      mainApi.setToken(result.token);
      navigate("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function onSignOut() {
    localStorage.removeItem('JWT');
  }

  function handleUpdateUser(inputValuesUser) {
    mainApi.setUserInfo(inputValuesUser)
  }

  useEffect(() => {
    setSelectedMoviesCardList(moviesCardList.filter((movie)=>movie.isSelected))
  },[moviesCardList, setMoviesCardList]);

  function handleSelectMovies(movieId) {
    setMoviesCardList((state) => state.map((movie) => {
      if(movie.id === movieId) {
        movie={...movie, isSelected: !movie.isSelected};
      }
      return movie
    }));
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<UnauthorizedUserHeader />} />
          {["movies", "saved-movies", "profile"].map((somePath, i) => (<Route path={somePath} key={i} element={<AuthorizedUserHeader />} />))}
        </Route>
        <Route path="*" element={<header></header>}></Route>
      </Routes>

      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/movies" element={<Movies saved={false} moviesCardList={moviesCardList} handleSelectMovies={handleSelectMovies} />}/>
        <Route path="/saved-movies" element={<Movies saved={true} moviesCardList={selectedMoviesCardList} handleSelectMovies={handleSelectMovies} />}/>
        <Route path="/profile" element={<Profile onSignOut={onSignOut} onUpdateUser={handleUpdateUser} />}/>
        <Route path="/signin" element={<Login onLogin={handleLogin} />}/>
        <Route path="/signup" element={<Register onRegister={handleRegister} />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>

      <Routes>
        {["/", "movies", "saved-movies"].map((somePath, i) => (<Route path={somePath} key={i} element={<Footer />} />))}
        <Route path="*" element={<footer></footer>}></Route>
      </Routes>
    </div>
  );
}

export default App;
