import React, { useMemo } from 'react';
import { StarHollowIcon } from '../../../assets/icons/starHollow';
import { StarFilledIcon } from '../../../assets/icons/starFilled';

export type RatingProps = {
  rating: number;
  outOf?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export interface HalfStarProps {
  percentage: number;
}

export const HalfStar: React.FC<HalfStarProps> = ({ percentage }) => {
  const p = useMemo(() => {
    return Math.floor(percentage);
  }, [percentage]);

  return <StarHollowIcon className="w-full h-full absolute " style="stroke-red fill-white " />;
};

export const Rating: React.FC<RatingProps> = ({ rating, outOf = 5, className, ...props }) => {
  const restRatingAsPercentage = useMemo(() => {
    return (rating - Math.floor(rating)) * 100;
  }, [rating]);

  return (
    <div className={`relative select-none ${className || ''} w-32`}>
      <div className="grid grid-cols-5 absolute left-0 top-0 w-full h-full gap-1">
        {[...Array(outOf)].map((_, i) => {
          return (
            <div key={i} className="flex-1 relative">
              <StarHollowIcon className="w-full h-full absolute " style=" fill-white" />
              {rating > i && <StarFilledIcon className="w-full h-full absolute" style="stroke-white fill-white" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
