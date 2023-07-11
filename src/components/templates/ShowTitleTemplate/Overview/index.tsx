import React from 'react';

export type OverviewProps = {
  overview?: string;
};

export const Overview: React.FC<OverviewProps> = ({ overview = '' }) => {
  return <p className="text-xl font-light py-4 text-white max-w-[600px] tracking-wider">{overview}</p>;
};
