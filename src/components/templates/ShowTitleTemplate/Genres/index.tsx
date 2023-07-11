import React from 'react';
import { Genre } from '../../../../services/movie/IMovieService';

export type GenresProps = {
  genres?: Genre[];
};

export const Genres: React.FC<GenresProps> = ({ genres }) => {
  return (
    <h3 className="flex flex-row text-white font-semibold">
      {genres
        ?.slice(0, 3)
        .map((genre) => genre.name)
        .join(', ')}
    </h3>
  );
};
