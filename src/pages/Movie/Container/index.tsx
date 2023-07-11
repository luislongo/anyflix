import { HTMLAttributes } from 'react';

export const Container: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div className="absolute bottom-0 left-0 w-screen h-[65%] grid grid-cols-2 overflow-hidden" {...props} />;
};
