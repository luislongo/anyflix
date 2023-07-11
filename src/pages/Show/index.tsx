import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ShortRating } from '../../components/atoms/ShortRating';
import BaseLayout from '../../components/organisms/BaseLayout';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { ImageService } from '../../services/image/ImageService';
import { SeasonsService } from '../../services/seasons/SeasonsService';
import { TVShow, TVShowCredits, TVShowDetails, TVShowSeason } from '../../services/tv/ITVService';
import { TVService } from '../../services/tv/TVService';
import { SeasonDetails } from '../../services/seasons/ISeasonsService';
import { joinReactNodes } from '../../services/utils/joinReactElements';

export interface EpisodeCardProps {
  name: string;
  number: number;
  thumbnailSrc: string;
  onClick?: () => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ name, thumbnailSrc, number, onClick }) => {
  return (
    <div
      className="group flex flex-col gap-2 max-w-md shrink hover:scale-105 cursor-pointer transition-transform overflow-hidden"
      onClick={() => onClick?.()}>
      <img src={thumbnailSrc} className="h-auto w-auto" />
      <h3 className="text-md mb-2 font-medium text-white group-hover:text-primary-300">
        {number} | {name}
      </h3>
    </div>
  );
};

export const ShowPage = () => {
  const api = new MoviesAPI();
  const tvService = new TVService(api);
  const imageService = new ImageService();
  const seasonsService = new SeasonsService(api);

  const [details, setDetails] = useState<TVShowDetails>();
  const [similar, setSimilar] = useState<TVShow[]>();
  const [credits, setCredits] = useState<TVShowCredits>();

  const [seasonDetails, setSeasonDetails] = useState<SeasonDetails>();

  const { showId, seasonNumber } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    tvService.details(showId || '').then((res) => {
      setDetails(res);
    });
    tvService.similar(showId || '').then((res) => {
      setSimilar(res.results);
    });
    tvService.credits(showId || '').then((res) => {
      setCredits(res);
    });

    handleSeasonChange(Number(seasonNumber));
  }, [showId]);

  useEffect(() => {
    handleSeasonChange(Number(seasonNumber));
  }, [seasonNumber]);

  const handleSeasonChange = (season: number) => {
    seasonsService.details(showId || '', season).then((res) => {
      setSeasonDetails(res);
    });
  };

  return (
    <BaseLayout>
      <img
        src={imageService.getImageSrc(details?.backdrop_path || '')}
        className="fixed left-0 right-0 top-0 bottom-0 h-full w-full object-cover -z-10 blur-2xl transform scale-[1.2]"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll mx-8 mt-16 scrollbar-hide">
        <div className="flex flex-row items-start mb-8">
          <img src={imageService.getImageSrc(details?.poster_path || '')} className="h-96 w-auto" />
          <div className="pl-12 flex flex-col gap-8 ">
            <div>
              <ShortRating rating={details?.vote_average || 0} voteCount={details?.vote_count || 0} />
              <h1 className="text-6xl mb-2">{details?.name}</h1>
              <h2 className="text-2xl mb-2">{details?.tagline}</h2>
            </div>
            <div>
              <h3 className="text-lg mb-2">Sinopse</h3>
              <p className="text-md mb-2">{details?.overview}</p>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <ul className="flex flex-row gap-2 mb-4 select-none ">
            {joinReactNodes(
              details?.seasons.map((season, id) => (
                <li
                  key={season.id}
                  className={`font-semibold hover:text-primary-400 cursor-pointer hover:scale-105 transition-all ${
                    season.season_number === Number(seasonNumber) ? 'text-primary-400' : 'text-white'
                  }`}
                  onClick={() => navigate(`/shows/${showId}/season/${season.season_number}`)}>
                  {season.name}
                </li>
              )) || [],
              <span className="text-white"> | </span>
            )}
          </ul>
          <ul className="grid grid-cols-4 gap-4 select-none">
            {seasonDetails?.episodes?.map((episode, id) => (
              <EpisodeCard
                name={episode.name}
                thumbnailSrc={imageService.getImageSrc(episode.still_path || '')}
                number={episode.episode_number}
                onClick={() => navigate(`episode/${episode.episode_number}`)}
              />
            ))}
          </ul>
        </div>
      </div>
    </BaseLayout>
  );
};
