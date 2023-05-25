import React from "react";

export type TVideoListingCardProps = {
  src: string;
};

export const VideoListingCard: React.FC<TVideoListingCardProps> = ({ src }) => {
  return (
    <div className="w-52 h-40 bg-primary-400 mb-2 flex-none hover:scale-105 transition-all">
      <img src={src} className="bg-red-100" />
      {src}
    </div>
  );
};
