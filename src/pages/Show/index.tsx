import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ShortRating } from '../../components/templates/ShowTitleTemplate/ShortRating';
import BaseLayout from '../../components/organisms/BaseLayout';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { ImageService } from '../../services/image/ImageService';
import { SeasonsService } from '../../services/seasons/SeasonsService';
import { TVShow, TVShowCredits, TVShowDetails, TVShowSeason } from '../../services/tv/ITVService';
import { TVService } from '../../services/tv/TVService';
import { SeasonDetails } from '../../services/seasons/ISeasonsService';
import { joinReactNodes } from '../../services/utils/joinReactElements';
import { ShowTitleTemplate } from '../../components/templates/ShowTitleTemplate';

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
    <ShowTitleTemplate
      title={details?.name}
      voteAverage={details?.vote_average}
      genres={details?.genres}
      overview={details?.overview}
      releaseDate={details?.first_air_date}
      runtime={details?.episode_run_time?.[0]}
      voteCount={details?.vote_count}
      backgroundSrc={imageService.getImageSrc(details?.backdrop_path || '', {
        size: 'w1280',
      })}
      asideProps={{
        children: (
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
        ),
      }}
    />
  );
};
