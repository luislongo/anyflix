import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { SecureComponent } from './components/atoms/SecureComponent';
import { MoviePage } from './pages/Movie';
import { SearchPage } from './pages/Search';
import { ShowPage } from './pages/Show';
import { Episode } from './pages/Episode';
import { MovieListPage } from './pages/MovieList';
import { ShowListPage } from './pages/ShowList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/shows/" element={<ShowListPage />} />
        <Route path="/shows/:showId/season/:seasonNumber" element={<ShowPage />} />
        <Route path="/shows/:showId/season/:seasonNumber/episode/:episodeNumber" element={<Episode />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
