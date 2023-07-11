import { HTMLAttributes } from 'react';
import { MovieDetails } from '../../../services/movie/IMovieService';
import { joinReactNodes } from '../../../services/utils/joinReactElements';

export type SubtitleProps = HTMLAttributes<HTMLDivElement> & {
  details?: MovieDetails;
};

export const Subtitle: React.FC<SubtitleProps> = ({ details, children, ...rest }) => {
  const interleavedChildren = joinReactNodes(children, <p className="text-white">●</p>);

  return <div className="flex flex-row w-full items-center gap-4">{interleavedChildren}</div>;
};
