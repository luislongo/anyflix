import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Rating } from '../../components/atoms/Rating';
import { VideoListing } from '../../components/molecules/VideoListing';
import { VideoListingCard } from '../../components/molecules/VideoListing/components/Card';
import BaseLayout from '../../components/organisms/BaseLayout';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { ImageService } from '../../services/image/ImageService';
import { Movie, MovieDetails } from '../../services/movie/IMovieService';
import { MovieService } from '../../services/movie/MovieService';
import { Credits } from '../../services/credits/ICreditsService';
import { CreditsService } from '../../services/credits/CreditsService';
import { ExpandableImage } from '../../components/atoms/ExpandableImage';

export const MoviePage = () => {
  const api = new MoviesAPI();
  const moviesService = new MovieService(api);
  const imageService = new ImageService();
  const creditsService = new CreditsService(api);

  const [details, setDetails] = useState<MovieDetails>();
  const [similar, setSimilar] = useState<Movie[]>();
  const [credits, setCredits] = useState<Credits>();
  const [images, setImages] = useState<string[]>();
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
      setImages(res.backdrops.map((image) => imageService.getImageSrc(image.file_path)));
    });
  }, [id]);

  return (
    <BaseLayout>
      <div className="absolute mt-10 top-0 left-0 right-0 bottom-0 overflow-y-scroll overflow-x-hidden scrollbar-hide">
        <img
          src={imageService.getImageSrc(details?.backdrop_path || '')}
          className="fixed left-0 right-0 top-0 bottom-0 h-full w-full object-cover -z-10 blur-2xl transform scale-[1.2]"
        />
        <div className="flex flex-row bg-black mx-6 p-6 mt-10 bg-opacity-30 h-[32rem] overflow-hidden items-stretch">
          <img src={imageService.getImageSrc(details?.poster_path || '')} className="h-full w-auto" />
          <div className="pl-12 flex flex-col gap-2 w-1/2 mr-8 ">
            <div className="flex flex-row w-1/2 justify-between items-center">
              <h3 className="text-lg text-white font-light">
                {new Date(details?.release_date || '').toLocaleDateString()}
              </h3>
              <h3 className="text-lg text-white font-light">{details?.runtime}min</h3>
              <Rating className="w-30 h-10" rating={(details?.vote_average || 0) / 2 || 0} />
            </div>
            <div>
              <h1 className="text-6xl mb-2 text-white">{details?.original_title}</h1>
              <h2 className="text-2xl mb-2">{details?.tagline}</h2>
            </div>
            <div>
              <h3 className="text-lg mb-2">Sinopse</h3>
              <p className="text-md mb-2">{details?.overview}</p>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2 w-96 overflow-y-scroll scrollbar-hide ">
            {images?.map((image) => (
              <ExpandableImage src={image} className="h-auto flex-1 hover:scale-100 scale-95 cursor-pointer" />
            ))}
          </div>
        </div>
        <VideoListing title={'Similar'}>
          {similar?.map((movie) => (
            <VideoListingCard
              key={movie.id}
              onClick={() => {
                navigate(`/movies/${movie.id}`);
              }}>
              <img src={imageService.getImageSrc(movie.poster_path || '')} className="h-fulçl w-auto" />
            </VideoListingCard>
          ))}
        </VideoListing>
        <VideoListing title="Cast">
          {credits?.cast.map((member, id) => (
            <div key={id} className="flex flex-row min-w-fit gap-2 items-center  ">
              <img src={imageService.getImageSrc(member.profile_path || '')} className="w-20" />
              <div>
                <h3 className="font-bold">{member.name}</h3>
                <p>{member.character}</p>
              </div>
            </div>
          ))}
        </VideoListing>
        <VideoListing title="Crew">
          {credits?.crew.map((member, id) => (
            <div key={id} className="flex flex-row min-w-fit gap-2 items-center  ">
              <img src={imageService.getImageSrc(member.profile_path || '')} className="w-20" />
              <div>
                <h3 className="font-bold">{member.name}</h3>
                <p>{member.job}</p>
              </div>
            </div>
          ))}
        </VideoListing>
      </div>
    </BaseLayout>
  );
};
