import './App.css';
import {Route, Routes} from 'react-router-dom';
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
import Picture from '../../images/movie.png';
import { useState, useEffect } from 'react';

function App() {
  const [moviesCardList, setMoviesCardList] = useState([]);
  const [selectedMoviesCardList, setSelectedMoviesCardList] = useState([]);
  useEffect(() => {
    const arr =[];
    for(let i = 0; i < 3; i++) {
      arr.push({name: "33 слова о дизайне", duration: "1ч42м", link: `${Picture}`, isSelected: true, _id: i})
    }
    for(let i = 3; i < 16; i++) {
      arr.push({name: "33 слова о дизайне", duration: "1ч42м", link: `${Picture}`, isSelected: false, _id: i})
    }
    setTimeout(()=> {
      setMoviesCardList(arr);
    },1000);
  },[]);

  useEffect(() => {
    setSelectedMoviesCardList(moviesCardList.filter((movie)=>movie.isSelected))
  },[moviesCardList]);

  function handleSelectMovies(movieId) {
    setMoviesCardList((state) => state.map((movie) => {
      if(movie._id === movieId) {
        movie={...movie, isSelected: !movie.isSelected}
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
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signin" element={<Login />}/>
        <Route path="/signup" element={<Register />}/>
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
