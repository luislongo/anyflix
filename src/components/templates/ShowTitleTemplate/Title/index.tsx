import { HTMLAttributes } from 'react';

export type TitleProps = {
  children?: string;
};

export const Title: React.FC<TitleProps> = ({ children }) => {
  return <h1 className="text-7xl text-white font-thin ">{children}</h1>;
};
