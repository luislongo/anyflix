import React from 'react';
import { SeasonDetails } from '../../../services/seasons/ISeasonsService';
import { useParams } from 'react-router';
import { joinReactNodes } from '../../../services/utils/joinReactElements';
import { TVShowSeason } from '../../../services/tv/ITVService';
import { episodeNumberFormatter } from '../../../utils/episodeNumberFormatter';

export type SeasonNavbarProps = {
  seasons?: TVShowSeason[];
  onClick?: (season: TVShowSeason) => void;
  currentSeason?: number;
};

export const SeasonNavbar: React.FC<SeasonNavbarProps> = ({ seasons = [], onClick, currentSeason }) => {
  const handleClick = (seasonNumber: number) => {
    console.log(seasonNumber);
  };

  return (
    <ul className="flex flex-row mb-4 gap-2 select-none flex-wrap ">
      {seasons.map((season, id) => (
        <li
          key={season.id}
          className={`text-white font-lg transition-all whitespace-nowrap w-10 h-10 flex items-center justify-center rounded-md ${
            season.season_number === currentSeason
              ? 'font-semibold '
              : 'font-light hover:bg-black hover:bg-opacity-50 hover:text-primary-400 cursor-pointer '
          }`}
          onClick={() => onClick?.(season)}>
          {`S${episodeNumberFormatter(season.season_number, 2)}`}
        </li>
      ))}
    </ul>
  );
};
