import React from 'react';

export type ReleaseDateProps = {
  releaseDate?: string;
};

export const ReleaseYear: React.FC<ReleaseDateProps> = ({ releaseDate = '' }) => {
  return <h3 className="text-lg text-white font-semibold">{new Date(releaseDate).getFullYear()}</h3>;
};
