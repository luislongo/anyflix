import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/organisms/BaseLayout';
import { useNavigate, useParams } from 'react-router';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { MovieService } from '../../services/movie/MovieService';
import { Movie } from '../../services/movie/IMovieService';
import { ImageService } from '../../services/image/ImageService';
import { TVService } from '../../services/tv/TVService';
import { TVShow } from '../../services/tv/ITVService';
import { HorizontalList } from '../../components/atoms/HorizontalScroll';
import { Image } from '../../components/atoms/Image';
import { TitleList } from '../../components/molecules/TitleList';

export const SearchPage = () => {
  const { query } = useParams();
  const api = new MoviesAPI();
  const movieService = new MovieService(api);
  const tvService = new TVService(api);
  const imageService = new ImageService();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<TVShow[]>([]);
  const navigate = useNavigate();

  const handleSearchChange = (value: string) => {
    navigate(`/search/${value}`);
  };

  useEffect(() => {
    movieService.search(query || '').then(({ results }) => setMovies(results));
    tvService.search(query || '').then(({ results }) => setShows(results));

    if (query === '') {
      navigate('/home');
    }
  }, [query]);

  return (
    <BaseLayout defaultSearchValue={query} onSearchChange={handleSearchChange}>
      <TitleList title={'Movies'} titles={movies} onClick={(movie) => navigate(`/movies/${movie.id}`)} />
      <TitleList title={'TV Shows'} titles={shows} onClick={(show) => navigate(`/shows/${show.id}`)} />
    </BaseLayout>
  );
};
