import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PlayCircleIcon } from '../../assets/icons/playCircle';
import { Button } from '../../components/atoms/Button';
import { ShowTitleTemplate } from '../../components/templates/ShowTitleTemplate';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { CreditsService } from '../../services/credits/CreditsService';
import { Credits } from '../../services/credits/ICreditsService';
import { ImageService } from '../../services/image/ImageService';
import { Movie, MovieDetails } from '../../services/movie/IMovieService';
import { MovieService } from '../../services/movie/MovieService';
import { CastListItem } from './CastListItem';
import { CastList } from './CastListSection';
import { PosterListSection } from './PosterListSection';

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
    <ShowTitleTemplate
      backgroundSrc={imageService.getImageSrc(details?.backdrop_path || '', {
        size: 'w1280',
      })}
      asideProps={{
        children: (
          <>
            <PosterListSection images={images || []} />
            <CastList>
              {credits?.cast?.slice(0, 15).map((person) => (
                <CastListItem person={person} />
              ))}
            </CastList>
            )
          </>
        ),
      }}
      mainProps={{
        children: (
          <>
            <div className="flex flex-row gap-4 self-end">
              <Button
                onClick={() => navigate(`/watch/${id}`)}
                className="flex flex-row items-center group pr-12  gap-2">
                <PlayCircleIcon className="w-6 h-6" style="fill-white" />
                <p>PLAY NOW</p>
              </Button>
              <Button onClick={() => navigate(`/watch/${id}`)} className="flex flex-row px-6">
                TRAILER
              </Button>
            </div>
          </>
        ),
      }}
      title={details?.title}
      voteAverage={details?.vote_average}
      voteCount={details?.vote_count}
      genres={details?.genres}
      overview={details?.overview}
      releaseDate={details?.release_date}
      runtime={details?.runtime}
    />
  );
};
