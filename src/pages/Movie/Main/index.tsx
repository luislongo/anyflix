import React from 'react';

export type MainProps = {
  children?: React.ReactNode;
};

export const Main: React.FC<MainProps> = ({ children }) => {
  return <main className="px-8 flex flex-col gap-5 justify-between pb-8">{children}</main>;
};
