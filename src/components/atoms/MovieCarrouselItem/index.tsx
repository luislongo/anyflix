import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../Button';

export interface MovieCarrouselItemProps {
  title: string;
  overview: string;
  backdropSrc: string;
  id: number;
}

export const MovieTitle = ({ title }: { title: string }) => {
  return <h1 className="text-4xl font-normal text-white mb-6 ">{title}</h1>;
};

export const MovieOverview = ({ overview }: { overview: string }) => {
  return (
    <div className="text-white mb-8 h-18 shrink-0 min-h-0 line-clamp-3 overflow-hidden text-ellipsis">{overview}</div>
  );
};

export const MovieInfoOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute top-0 left-1/2 w-1/2 h-full flex flex-col justify-center items-left pr-8">{children}</div>
  );
};

export const MovieImage = ({ src, alt }: { src: string; alt: string }) => {
  return <img className="h-auto w-full max-h-full object-cover absolute" src={src} alt={alt} />;
};

export const MovieCarrouselItem: React.FC<MovieCarrouselItemProps> = ({ id, title, overview, backdropSrc }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute h-[36rem] w-screen">
      <MovieImage src={backdropSrc} alt={title} />
      <MovieInfoOverlay>
        <MovieTitle title={title} />
        <MovieOverview overview={overview} />
        <Button
          className="w-28"
          onClick={() => {
            navigate(`/movies/${id}`);
          }}>
          View more
        </Button>
      </MovieInfoOverlay>
    </div>
  );
};
