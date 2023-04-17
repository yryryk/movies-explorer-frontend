import {Route, Routes} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import AuthorizedUserHeader from '../Header/AuthorizedUserHeader/AuthorizedUserHeader';
import UnauthorizedUserHeader from '../Header/UnauthorizedUserHeader/UnauthorizedUserHeader';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>

          <Route index element={<UnauthorizedUserHeader />} />

          {["movies", "saved-movies", "profile"].map((somePath, i) => (<Route path={somePath} key={i} element={<AuthorizedUserHeader />} />))}

        </Route>

      </Routes>

      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/saved-movies" element={<SavedMovies />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signin" element={<Login />}/>
        <Route path="/signup" element={<Register />}/>

      </Routes>
    </>
  );
}

export default App;
