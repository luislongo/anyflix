import { HTMLAttributes } from 'react';
import { MovieDetails } from '../../../services/movie/IMovieService';

export type TitleProps = HTMLAttributes<HTMLDivElement> & {
  details?: MovieDetails;
};

export const Title: React.FC<TitleProps> = ({ details }) => {
  return <h1 className="text-6xl mb-2 text-white line-clamp-1">{details?.original_title}</h1>;
};
