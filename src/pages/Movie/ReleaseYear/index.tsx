import React from 'react';

export type ReleaseDateProps = {
  releaseDate?: string;
};

export const ReleaseYear: React.FC<ReleaseDateProps> = ({ releaseDate = '' }) => {
  return <h3 className="text-lg text-white font-light">{new Date(releaseDate).getFullYear()}</h3>;
};
