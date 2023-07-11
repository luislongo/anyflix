import React from 'react';

export type EpisodeListProps = {
  children?: React.ReactNode;
};

export const EpisodeList: React.FC<EpisodeListProps> = ({ children }) => {
  return (
    <ul className="flex flex-wrap flex-row w-full h-full gap-2 select-none  overflow-y-auto items-stretch justify-start pb-60">
      {children}
    </ul>
  );
};
