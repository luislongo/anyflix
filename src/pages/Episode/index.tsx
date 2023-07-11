import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BaseLayout from '../../components/organisms/BaseLayout';
import { EpisodesService } from '../../services/episodes/EpisodesService';
import { EpisodeDetails } from '../../services/episodes/IEpisodesService';
import { MoviesAPI } from '../../services/api/MoviesAPI';
import { ImageService } from '../../services/image/ImageService';
import { ShortRating } from '../../components/templates/ShowTitleTemplate/ShortRating';

export const Episode = () => {
  const { showId, seasonNumber, episodeNumber } = useParams();
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails>();
  const imageService = new ImageService();

  const api = new MoviesAPI();
  const episodeService = new EpisodesService(api);

  useEffect(() => {
    episodeService.details(showId || '', Number(seasonNumber), Number(episodeNumber)).then((episodeDetails) => {
      console.log(episodeDetails);
      setEpisodeDetails(episodeDetails);
    });
  }, [showId, seasonNumber, episodeNumber]);

  return (
    <BaseLayout>
      <img
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={imageService.getImageSrc(episodeDetails?.still_path || '')}
      />

      <div className="flex flex-col items-start justify-start h-full w-1/2 relative">
        <div className="flex flex-col items-start justify-start gap-4 pl-10 pt-10">
          <h3 className="text-2xl text-white ">{`S${seasonNumber} | E${episodeNumber}`}</h3>
          <h1 className="text-6xl text-white font-semibold">{episodeDetails?.name}</h1>
          <div className="flex flex-row w-full justify-between items-center">
            <h3 className="text-lg text-white font-light">
              {new Date(episodeDetails?.air_date || '').toLocaleDateString()}
            </h3>
            <h3 className="text-lg text-white font-light">{episodeDetails?.runtime}min</h3>
            <ShortRating className="w-30 h-10" rating={(episodeDetails?.vote_average || 0) / 2 || 0} />
          </div>
          <h2 className="text-lg text-white font-light">{episodeDetails?.overview}</h2>
        </div>
      </div>
    </BaseLayout>
  );
};
