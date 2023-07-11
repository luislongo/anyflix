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
import { SeasonNavbar } from './SeasonNavbar';
import { EpisodeCard } from './EpisodeCard';
import { episodeNumberFormatter } from '../../utils/episodeNumberFormatter';
import { EpisodeList } from './EpisodeList';

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
          <div className="overflow-hidden w-full">
            <SeasonNavbar
              seasons={details?.seasons}
              onClick={(season) => navigate(`/shows/${showId}/season/${season.season_number}`)}
              currentSeason={seasonDetails?.season_number}
            />

            <EpisodeList>
              {seasonDetails?.episodes?.map((episode, id) => (
                <EpisodeCard
                  name={episode.name}
                  thumbnailSrc={imageService.getImageSrc(episode.still_path || '')}
                  order={episodeNumberFormatter(episode.episode_number, seasonDetails.episodes.length)}
                  onClick={() => navigate(`episode/${episode.episode_number}`)}
                />
              ))}
            </EpisodeList>
          </div>
        ),
      }}
    />
  );
};
