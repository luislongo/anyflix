import React from 'react';
import { HorizontalList } from '../../atoms/HorizontalScroll';
import { Movie } from '../../../services/movie/IMovieService';
import { Image } from '../../atoms/Image';
import { ImageService } from '../../../services/image/ImageService';
import { TVShow } from '../../../services/tv/ITVService';

type Title = Movie | TVShow;

export type TitleListProps<T = Title> = {
  title: string;
  titles: T[];
  onClick?: (title: T) => void;
};

export const TitleList: React.FC<TitleListProps> = ({ title, titles, onClick }) => {
  const imageService = new ImageService();

  return (
    <section>
      <HorizontalList className="my-2" title={title}>
        {titles.map((t) => (
          <div
            className="shrink-0 w-40 scale-95 hover:scale-100 transition-all"
            key={t.id}
            onClick={() => onClick?.(t)}>
            <Image
              src={imageService.getImageSrc(t.poster_path, {
                size: 'w300',
              })}
              alt={(t as Movie).title || (t as TVShow).name || ''}
              className="w-42 h-auto object-cover"
            />
          </div>
        ))}
      </HorizontalList>
    </section>
  );
};
