import React, { useEffect } from "react";
import { ArrowController } from "./components/ArrowController";
import { Listing } from "./components/Listing";
import { useHorizontalScroll } from "../../../hooks/useHorizontalScroll";

export type TVideoListingProps = {
  title: string;
  children: React.ReactNode;
};

export const VideoListing: React.FC<TVideoListingProps> = ({
  children,
  title,
}) => {
  const { ref, scroll, scrollTo, width } = useHorizontalScroll();

  useEffect(() => {
    scrollTo(0.33333 * width);
  }, [width]);

  useEffect(() => {
    if (scroll === 0) {
      scrollTo(0.33333 * width);
    }
    if (scroll > 0.66666 * width) {
      scrollTo(0.33333 * width);
    }
  }, [scroll]);

  return (
    <div className="overflow-x-hidden w-full ">
      <p className="z-10 pb-2 pl-16 text-white text-bold ">{title}</p>
      <div className="grid grid-cols-[4rem_1fr_4rem] ">
        <ArrowController side="left" />
        <ul
          ref={ref}
          className="relative flex flex-row flex-nowrap gap-2 overflow-x-scroll scrollbar-hide"
        >
          {children}
          {children}
          {children}
        </ul>
        <ArrowController side="right" />
      </div>
    </div>
  );
};
