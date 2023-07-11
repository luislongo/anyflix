import React from 'react';
import { StarFilledIcon } from '../../../assets/icons/starFilled';
import { expFormatter } from '../../../utils/expFormatter';

export type RatingProps = {
  rating: number;
  voteCount: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const ShortRating: React.FC<RatingProps> = ({ rating, voteCount: nrVotes, className, ...props }) => {
  const shortVoteCount = expFormatter(nrVotes, 1);

  return (
    <div className="flex flex-row items-center ">
      <StarFilledIcon className="w-6 h-6" style="fill-white" />
      <p className="text-white ml-2">{rating.toFixed(1)}</p>
      <p className="text-white text-2xl ml-2">|</p>
      <p className="text-white ml-2">{shortVoteCount}</p>
    </div>
  );
};
