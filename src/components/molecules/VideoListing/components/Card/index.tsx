import React from 'react';

export type TVideoListingCardProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

export const VideoListingCard: React.FC<TVideoListingCardProps> = ({ onClick, children }) => {
  return (
    <div className="w-48 h-auto flex-none cursor-pointer" onClick={() => onClick?.()}>
      <div className="w-full h-full scale-95 hover:scale-100 transition-all duration-300">{children}</div>
    </div>
  );
};
