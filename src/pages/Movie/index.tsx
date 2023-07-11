import { HTMLAttributes, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PlayCircleIcon } from '../../assets/icons/playCircle';
import { Button } from '../../components/atoms/Button';
import { ShortRating } from '../../components/atoms/ShortRating';
import BaseLayout from '../../components/organisms/BaseLayout';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { CreditsService } from '../../services/credits/CreditsService';
import { Credits } from '../../services/credits/ICreditsService';
import { ImageService } from '../../services/image/ImageService';
import { Movie, MovieDetails } from '../../services/movie/IMovieService';
import { MovieService } from '../../services/movie/MovieService';
import { runtimeFormatter } from '../../utils/runtimeFormatter';
import { Background } from './Background';
import { CastList } from './CastListSection';
import { CastListItem } from './CastListItem';
import { Container } from './Container';
import { PosterListSection } from './PosterListSection';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import { Genres } from './Genres';
import { Runtime } from './Runtime';
import { ReleaseYear } from './ReleaseYear';
import { Overview } from './Overview';
import { Main, MainProps } from './Main';
import { Aside } from './Aside';

export const MoviePage = () => {
  const api = new MoviesAPI();
  const moviesService = new MovieService(api);
  const imageService = new ImageService();
  const creditsService = new CreditsService(api);

  const [details, setDetails] = useState<MovieDetails>();
  const [similar, setSimilar] = useState<Movie[]>();
  const [credits, setCredits] = useState<Credits>();
  const [images, setImages] = useState<
    {
      smallUrl: string;
      largeUrl: string;
    }[]
  >();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    moviesService.details(id || '').then((res) => {
      setDetails(res);
    });
    moviesService.similar(id || '').then((res) => {
      setSimilar(res.results);
    });
    creditsService.credits(id || '').then((res) => {
      setCredits(res);
    });
    moviesService.images(id || '').then((res) => {
      setImages(
        res.backdrops.map((image) => ({
          smallUrl: imageService.getImageSrc(image.file_path, {
            size: 'w500',
          }),
          largeUrl: imageService.getImageSrc(image.file_path, {
            size: 'w1280',
          }),
        }))
      );
    });
  }, [id]);

  return (
    <BaseLayout>
      <Background
        src={imageService.getImageSrc(details?.backdrop_path || '', {
          size: 'w1280',
        })}
      />
      <Container>
        <Main>
          <div>
            <Title details={details} />
            <Subtitle details={details}>
              <ShortRating
                className="w-30 h-10"
                rating={details?.vote_average || 0}
                voteCount={details?.vote_count || 0}
              />
              <Runtime runtime={details?.runtime} />
              <Genres details={details} />
              <ReleaseYear releaseDate={details?.release_date} />
            </Subtitle>
            <Overview overview={details?.overview} />
          </div>

          <div className="flex flex-row gap-4 self-end">
            <Button onClick={() => navigate(`/watch/${id}`)} className="flex flex-row items-center group pr-12  gap-2">
              <PlayCircleIcon className="w-6 h-6" style="fill-white" />
              <p>PLAY NOW</p>
            </Button>
            <Button onClick={() => navigate(`/watch/${id}`)} className="flex flex-row px-6">
              TRAILER
            </Button>
          </div>
        </Main>
        <Aside>
          <PosterListSection images={images || []} />
          <CastList>
            {credits?.cast?.slice(0, 15).map((person) => (
              <CastListItem person={person} />
            ))}
          </CastList>
        </Aside>
      </Container>
    </BaseLayout>
  );
};
