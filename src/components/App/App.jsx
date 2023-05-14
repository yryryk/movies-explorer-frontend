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
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: '',
    _id: '',
    searchQuery: '',
    switchersChecked: [false, false],
  });
  const [moviesCardList, setMoviesCardList] = useState([]);
  const [selectedMoviesCardList, setSelectedMoviesCardList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [waitingLoad, setWaitingLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const switchers = JSON.parse(localStorage.getItem('Switchers'));
    if(switchers) {
      setCurrentUser((state) => ({ ...state, switchersChecked: switchers }));
    }

    const searchQuery = JSON.parse(localStorage.getItem('SearchQuery'));
    if(searchQuery) {
      setCurrentUser((state) => ({ ...state, searchQuery: searchQuery }));
    }
  }, [])

  useEffect(() => {
    async function getAuth() {
      try {
        const jwt = localStorage.getItem("JWT");
        if (jwt) {
          const user = await auth.checkToken(jwt);
          if (user) {
            setIsLoggedIn(true);
            mainApi.setToken(jwt);
            setCurrentUser((state) => ({ ...state, email: user.email, name: user.name, _id: user._id }));
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setWaitingLoad(false);
      }
    }
    getAuth();
  },[]);

  useEffect(() => {
    const prevMovies = JSON.parse(localStorage.getItem('Movies'));
    const prevSavedMovies = JSON.parse(localStorage.getItem('SavedMovies'));

    async function getMovies() {
      try {
        if (isLoggedIn) {
          let movies;
          if(prevMovies&&prevMovies.length) {
            movies = prevMovies;
          }else{
            movies = await moviesApi();
            localStorage.setItem('Movies', JSON.stringify(movies));
          }

          let userMovies;
          if(prevSavedMovies&&prevSavedMovies.length) {
            userMovies = prevSavedMovies;
          }else{
            userMovies = await mainApi.getMovies();
          }
          // Избавляемся от цикла в цикле
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
              owner: currentUser._id,
            }
            if(editedUserMovies[editedMovie.movieId]) {
              editedMovie._id = editedUserMovies[editedMovie.movieId];
              editedMovie.isSelected = true;
            }
            return editedMovie
          });
          setMoviesCardList(movies);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getMovies();
  },[currentUser._id, isLoggedIn]);

  async function executeAuth(method) {
    try {
      const result = await method();
      localStorage.setItem('JWT', result.token);
      mainApi.setToken(result.token);
      navigate("/movies");
      setIsLoggedIn(true);
      setCurrentUser((state) => ({ ...state, email: result.email, name: result.name }));

    } catch (err) {
      console.log(err);
    }
  }

  function handleLogin(inputValues) {
    executeAuth(() => auth.signInUser(inputValues))
  }

  function handleRegister(inputValues) {
    executeAuth(() => auth.signUpUser(inputValues))
  }

  async function handleUpdateUser(inputValuesUser) {
    try {
      const result = await mainApi.setUserInfo(inputValuesUser)
      setCurrentUser((state) => ({ ...state, email: result.email, name: result.name }));

    } catch (err) {
      console.log(err);
    }
  }

  function onSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('JWT');
    localStorage.removeItem('SavedMovies');
    localStorage.removeItem('Movies');
    localStorage.removeItem('Switchers');
    localStorage.removeItem('SearchQuery');
    setCurrentUser({
      email: '',
      name: '',
      _id: '',
      searchQuery: '',
      switchersChecked: [false, false],
    });
    setSelectedMoviesCardList([]);
  }

  useEffect(() => {
    const selectedMovies = moviesCardList.filter((movie)=>movie.isSelected);
    setSelectedMoviesCardList(selectedMovies);
    localStorage.setItem('SavedMovies', JSON.stringify(selectedMovies));
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
        }
        return movieCard
      }));

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={isLoggedIn?<AuthorizedUserHeader />:<UnauthorizedUserHeader />} />
            {["movies", "saved-movies", "profile"].map((somePath, i) => (<Route path={somePath} key={i} element={<AuthorizedUserHeader />} />))}
          </Route>
          <Route path="*" element={<header></header>}></Route>
        </Routes>

        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/movies" element={!waitingLoad&&<ProtectedRoute component={Movies} loggedIn={isLoggedIn} key={0} saved={false} moviesCardList={moviesCardList} handleSelectMovies={handleSelectMovies} />}/>
          <Route path="/saved-movies" element={!waitingLoad&&<ProtectedRoute component={Movies} loggedIn={isLoggedIn} key={1} saved={true} moviesCardList={selectedMoviesCardList} handleSelectMovies={handleSelectMovies} />}/>
          <Route path="/profile" element={!waitingLoad&&<ProtectedRoute component={Profile} loggedIn={isLoggedIn} onSignOut={onSignOut} onUpdateUser={handleUpdateUser} />}/>
          <Route path="/signin" element={<Login onLogin={handleLogin} />}/>
          <Route path="/signup" element={<Register onRegister={handleRegister} />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>

        <Routes>
          {["/", "movies", "saved-movies"].map((somePath, i) => (<Route path={somePath} key={i} element={<Footer />} />))}
          <Route path="*" element={<footer></footer>}></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
