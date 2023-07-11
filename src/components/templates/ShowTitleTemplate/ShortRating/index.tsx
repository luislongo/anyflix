import React from 'react';
import { StarFilledIcon } from '../../../../assets/icons/starFilled';
import { expFormatter } from '../../../../utils/expFormatter';

export type RatingProps = {
  rating: number;
  voteCount: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const ShortRating: React.FC<RatingProps> = ({ rating, voteCount: nrVotes, className, ...props }) => {
  const shortVoteCount = expFormatter(nrVotes, 1);

  return (
    <div className="flex flex-row items-center h-6  ">
      <StarFilledIcon className="w-6 h-6" style="fill-white" />
      <span className="text-white ml-2 font-semibold">{rating.toFixed(1)}</span>
      <span className="text-white ml-2 font-light">({shortVoteCount})</span>
    </div>
  );
};
