import React from 'react';
import BaseLayout from '../../organisms/BaseLayout';
import { Aside } from './Aside';
import { Background } from './Background';
import { Container } from './Container';
import { Main } from './Main';
import { ShortRating } from './ShortRating';
import { Genres } from './Genres';
import { Overview } from './Overview';
import { ReleaseYear } from './ReleaseYear';
import { Runtime } from './Runtime';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import { Genre } from '../../../services/movie/IMovieService';

export type ShowTitleTemplateProps = {
  backgroundSrc?: string;
  asideProps?: React.ComponentProps<typeof Aside>;
  mainProps?: React.ComponentProps<typeof Main>;
  title?: string;
  voteAverage?: number;
  voteCount?: number;
  runtime?: number;
  genres?: Genre[];
  releaseDate?: string;
  overview?: string;
};

export const ShowTitleTemplate: React.FC<ShowTitleTemplateProps> = ({
  backgroundSrc = '',
  asideProps = {},
  mainProps = {},
  title = '',
  voteAverage = 0,
  voteCount = 0,
  runtime = 0,
  genres = [],
  releaseDate = '',
  overview = '',
}) => {
  return (
    <BaseLayout>
      <Background src={backgroundSrc} />
      <Container>
        <Main>
          <Title>{title}</Title>
          <Subtitle>
            <ShortRating className="w-30 h-10" rating={voteAverage} voteCount={voteCount} />
            <Runtime runtime={runtime} />
            <Genres genres={genres} />
            <ReleaseYear releaseDate={releaseDate} />
          </Subtitle>
          <Overview overview={overview} />
          {mainProps?.children}
        </Main>
        <Aside {...asideProps} />
      </Container>
    </BaseLayout>
  );
};
