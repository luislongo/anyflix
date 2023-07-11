import { HTMLAttributes } from 'react';

export const Container: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2   w-screen h-[65%] grid grid-cols-2 overflow-hidden max-w-[1800px]"
      {...props}
    />
  );
};
