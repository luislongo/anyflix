import React from 'react';
import { MovieDetails } from '../../../services/movie/IMovieService';

export type GenresProps = {
  details?: MovieDetails;
};

export const Genres: React.FC<GenresProps> = ({ details }) => {
  return (
    <h3 className="flex flex-row text-white font-light">
      {details?.genres
        ?.slice(0, 3)
        .map((genre) => genre.name)
        .join(', ')}
    </h3>
  );
};
