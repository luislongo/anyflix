import React, { useMemo, ReactNode, useEffect } from 'react';
import { useHorizontalScroll } from '../../../../../hooks/useHorizontalScroll';

export type TListingProps = {
  children: ReactNode | Array<ReactNode>;
};

export const Listing: React.FC<TListingProps> = ({ children }) => {
  const { ref, scroll, scrollTo, width } = useHorizontalScroll();

  useEffect(() => {
    scrollTo(0.33333 * width);
  }, [width]);

  useEffect(() => {
    if (scroll === 0) {
      scrollTo(0.33333 * width);
    }
    if (scroll === 0.66666 * width) {
      scrollTo(0.33333 * width);
    }
  }, [scroll]);

  return (
    <ul ref={ref} className="flex flex-row flex-nowrap gap-2 overflow-x-scroll scrollbar-hide">
      {children}
    </ul>
  );
};
