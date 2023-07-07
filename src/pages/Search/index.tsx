import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/organisms/BaseLayout';
import { useNavigate, useParams } from 'react-router';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { MovieService } from '../../services/movie/MovieService';
import { Movie } from '../../services/movie/IMovieService';
import { VideoListing } from '../../components/molecules/VideoListing';
import { VideoListingCard } from '../../components/molecules/VideoListing/components/Card';
import { ImageService } from '../../services/image/ImageService';
import { TVService } from '../../services/tv/TVService';
import { TVShow } from '../../services/tv/ITVService';

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
      <VideoListing title={'Movies'}>
        {movies.map((movie) => (
          <VideoListingCard
            key={movie.id}
            onClick={() => {
              navigate(`/movies/${movie.id}`);
            }}>
            <img src={imageService.getImageSrc(movie.poster_path)} alt={movie.title} />
          </VideoListingCard>
        ))}
      </VideoListing>
      <VideoListing title={'TV Shows'}>
        {shows.map((show) => (
          <VideoListingCard
            key={show.id}
            onClick={() => {
              navigate(`/shows/${show.id}/season/1`);
            }}>
            <img src={imageService.getImageSrc(show.poster_path)} alt={show.name} />
          </VideoListingCard>
        ))}
      </VideoListing>
    </BaseLayout>
  );
};
