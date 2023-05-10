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
  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthAndMovies() {
      try {
        const jwt = localStorage.getItem("JWT");
        if (jwt) {
          const user = await auth.checkToken(jwt);
          if (user) {
            mainApi.setToken(jwt);
            let movies = await moviesApi();
            const userMovies = await mainApi.getMovies();
            let editedUserMovies = {};
            userMovies.forEach((movie) => {
              editedUserMovies[movie.movieId] = movie._id;
            });

            movies = movies.map((movie) => {
              const {
                country,
                director,
                duration,
                year,
                description,
                trailerLink,
                nameRU,
                nameEN,
              } = movie;
              const editedMovie = {
                country,
                director,
                duration,
                year,
                description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink,
                nameRU,
                nameEN,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                isSelected: false,
                owner: user._id,
              }
              if(editedUserMovies[editedMovie.movieId]) {
                editedMovie._id = editedUserMovies[editedMovie.movieId];
                editedMovie.isSelected = true;
              }
              return editedMovie
            });
            setMoviesCardList(movies);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAuthAndMovies();
  },[]);

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

  async function handleSelectMovies(movieId) {
    let movie;
    moviesCardList.forEach((movieCard) => {
      if(movieCard.movieId === movieId) {
        movie = movieCard
      }
    })

    try {
      let res;
      if(movie.isSelected) {
        res = await mainApi.deleteMovie(movie._id)
        res.isSelected = !res.isSelected;
        delete res._id;
        delete res.__v;
      } else {
        movie.isSelected = !movie.isSelected;
        res = await mainApi.createMovie(movie);
      }
      setMoviesCardList((state) => state.map((movieCard) => {
        if(movieCard.movieId === movieId) {
          movieCard = res;
          movieCard.isSelected = !movieCard.isSelected;
        }
        return movieCard
      }));

    } catch (err) {
      console.log(err);
    }
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
