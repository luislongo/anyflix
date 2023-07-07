import React, { useRef } from 'react';
import { ChevronRightIcon } from '../../../assets/icons/chevronRight';

export type TVideoListingProps = {
  title: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const VideoListing: React.FC<TVideoListingProps> = ({ children, title, className, ...props }) => {
  const ref = useRef<HTMLUListElement>(null);

  return (
    <div className={`relative overflow-x-auto w-screen ${className}`} {...props}>
      <p className="z-10 pb-4 text-white text-bold text-lg font-normal ml-8 ">{title}</p>
      <div className="relative h-fit">
        <div
          className="absolute top-0 bottom-0 left-0 p-2 text-white z-20 group hover:bg-black hover:bg-opacity-20 transition-all flex items-center"
          onClick={() => {
            if (ref.current) {
              ref.current.scroll({ left: ref.current.scrollLeft - window.innerWidth, behavior: 'smooth' });
            }
          }}>
          <ChevronRightIcon
            className="w-10 h-10 rotate-180 group-hover:scale-125 transition-all"
            style="fill-white  "
          />
        </div>
        <ul className="relative flex flex-row flex-nowrap gap-4 overflow-x-scroll scrollbar-hide px-6" ref={ref}>
          {children}
        </ul>
        <div
          className="absolute top-0 bottom-0 right-0 p-2 text-white z-20 group hover:bg-black hover:bg-opacity-20 transition-all flex items-center"
          onClick={() => {
            if (ref.current) {
              ref.current.scroll({ left: ref.current.scrollLeft + window.innerWidth, behavior: 'smooth' });
            }
          }}>
          <ChevronRightIcon className="w-10 h-10  group-hover:scale-125 transition-all" style="fill-white  " />
        </div>
      </div>
    </div>
  );
};
