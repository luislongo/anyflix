import React from 'react';

export type OverviewProps = {
  overview?: string;
};

export const Overview: React.FC<OverviewProps> = ({ overview = '' }) => {
  return <p className="text-md py-4 text-white">{overview}</p>;
};
