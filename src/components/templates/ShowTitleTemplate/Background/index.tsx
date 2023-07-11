import { ImgHTMLAttributes } from 'react';

export const Background: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src, ...rest }) => {
  return (
    <>
      <div className="absolute bg-gradient-to-b from-transparent to-black top-0 left-0 w-screen h-screen -z-10" />
      <img
        src={src}
        className="absolute left-0 right-0 top-0 bottom-0 h-full w-full object-cover -z-20  transform scale-[1.2] "
      />
    </>
  );
};
