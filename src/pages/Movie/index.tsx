import { HTMLAttributes, ImgHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router';
import { ArrowController } from '../../components/atoms/ArrowController';
import { Button } from '../../components/atoms/Button';
import { HorizontalScroll } from '../../components/atoms/HorizontalScroll';
import { ShortRating } from '../../components/atoms/ShortRating';
import BaseLayout from '../../components/organisms/BaseLayout';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { CreditsService } from '../../services/credits/CreditsService';
import { Cast, Credits } from '../../services/credits/ICreditsService';
import { ImageService } from '../../services/image/ImageService';
import { Movie, MovieDetails } from '../../services/movie/IMovieService';
import { MovieService } from '../../services/movie/MovieService';
import { joinReactNodes } from '../../services/utils/joinReactElements';
import { runtimeFormatter } from '../../utils/runtimeFormatter';
import { Overlay } from '../../components/atoms/Overlay';
import { PlayCircleIcon } from '../../assets/icons/playCircle';

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  details?: MovieDetails;
};

export const Subtitle: React.FC<HeaderProps> = ({ details, children, ...rest }) => {
  const interleavedChildren = joinReactNodes(children, <p className="text-white">●</p>);

  return <div className="flex flex-row w-full items-center gap-4">{interleavedChildren}</div>;
};

export const MainContainer: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div className="absolute bottom-0 left-0 w-screen h-[65%] grid grid-cols-2" {...props} />;
};

export const Background: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src, ...rest }) => {
  return (
    <>
      <div className="absolute bg-gradient-to-b from-transparent to-black top-0 left-0 w-screen h-screen -z-10" />
      <img
        src={src}
        className="absolute left-0 right-0 top-0 bottom-0 h-full w-full object-cover -z-20  transform scale-[1.2] "
      />
    </>
  );
};

export type TitleProps = HTMLAttributes<HTMLDivElement> & {
  details?: MovieDetails;
};

export const Title: React.FC<TitleProps> = ({ details }) => {
  return <h1 className="text-6xl mb-2 text-white line-clamp-1">{details?.original_title}</h1>;
};

export const PosterList = ({
  images,
}: {
  images: {
    smallUrl: string;
    largeUrl: string;
  }[];
}) => {
  const [selected, setSelected] = useState<number>();

  const handleArrowClick = (side: 'left' | 'right') => {
    let newSelected = selected || 0;
    if (side === 'left') {
      newSelected = newSelected - 1;
      if (newSelected < 0) newSelected = images.length - 1;
    } else {
      newSelected = newSelected + 1;
      if (newSelected > images.length - 1) newSelected = 0;
    }

    setSelected(newSelected);
  };

  return (
    <div className="select-none">
      <h2 className="text-white text-2xl mb-2">Posters</h2>
      <HorizontalScroll title="Posters" className="flex flex-row flex-nowrap gap-2 h-40 overflow-x-auto">
        {images?.map((image, id) => {
          return (
            <img
              src={image.smallUrl}
              className="h-auto hover:scale-100 scale-95 cursor-pointer "
              onClick={() => setSelected(id)}
            />
          );
        })}
      </HorizontalScroll>
      {selected !== undefined &&
        createPortal(
          <div className="fixed top-0 left-0 w-screen h-screen  flex justify-center items-center">
            <Overlay onClick={() => setSelected(undefined)} />
            <ArrowController side="left" onClick={() => handleArrowClick('left')} />
            <ArrowController side="right" onClick={() => handleArrowClick('right')} />
            <div className=" absolute flex flex-col items-center gap-4 h-[80%] max-h-[80%]">
              <img src={images[selected].largeUrl} className="h-full select-none" />
              <p className="text-white font-sans font-bold text-lg">
                {selected} / {images.length}
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export const CastListItem = ({ person }: { person: Cast }) => {
  return (
    <div className="flex flex-col items-center shrink-0 max-w-[150px]">
      <img
        src={new ImageService().getImageSrc(person.profile_path || '')}
        className="h-24 w-24 object-cover rounded-full mb-2"
      />
      <h4 className="text-white font-bold whitespace-nowrap text-center overflow-hidden w-full text-ellipsis">
        {person.name}
      </h4>
      <h5 className="text-white text-sm whitespace-nowrap overflow-hidden w-full text-ellipsis">{person.character}</h5>
    </div>
  );
};

export const CastList = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <h2 className="text-white text-2xl mb-2">Cast</h2>
      <HorizontalScroll className="flex flex-row  gap-4 overflow-x-hidden">{children}</HorizontalScroll>;
    </div>
  );
};

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
      <MainContainer>
        <div className="px-8 flex flex-col gap-5 justify-between pb-8">
          <div>
            <Title details={details} />
            <Subtitle details={details}>
              <ShortRating
                className="w-30 h-10"
                rating={details?.vote_average || 0}
                voteCount={details?.vote_count || 0}
              />
              <h3 className="text-white font-light">{runtimeFormatter(details?.runtime || 0)}</h3>
              <h3 className="flex flex-row text-white font-light">
                {details?.genres
                  ?.slice(0, 3)
                  .map((genre) => genre.name)
                  .join(', ')}
              </h3>
              <h3 className="text-lg text-white font-light">{new Date(details?.release_date || 0).getFullYear()}</h3>
            </Subtitle>
            <p className="text-md py-4 text-white">{details?.overview}</p>
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
        </div>
        <div className="flex flex-col gap-4">
          <PosterList images={images || []} />

          <CastList>
            {credits?.cast?.slice(0, 15).map((person) => (
              <CastListItem person={person} />
            ))}
          </CastList>
        </div>
      </MainContainer>
    </BaseLayout>
  );
};
