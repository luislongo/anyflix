import React from "react";

export type TBackgroundProps = {
  src: string;
};

export const Background: React.FC<TBackgroundProps> = ({ src }) => {
  return (
    <img
      src={src}
      className="-z-20 absolute top-0 left-0 w-full h-full aspect-auto object-cover"
    />
  );
};
