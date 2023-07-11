import React, { HTMLAttributes, useRef } from 'react';
import { useHorizontalScroll } from '../../../hooks/useHorizontalScroll';
import { ArrowController } from '../ArrowController';
import { Listing } from './Listing';

export type HorizontalList = HTMLAttributes<HTMLDivElement> & {
  title: string;
};

export const HorizontalList: React.FC<HorizontalList> = ({ className, children, title, ...props }) => {
  const { ref, scroll, scrollTo } = useHorizontalScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLeftArrowClick = () => {
    scrollTo(scroll - containerRef.current?.clientWidth! * 0.8);
  };

  const handleRightArrowClick = () => {
    scrollTo(scroll + containerRef.current?.clientWidth! * 0.8);
  };

  return (
    <div className={`flex flex-col relative  ${className}`} {...props} ref={containerRef}>
      <p className="text-white font-light text-lg">{title}</p>
      <div className="flex flex-row">
        <ArrowController side="left" onClick={() => handleLeftArrowClick()} disabled={scroll === 0} />
        <Listing innerRef={ref}>{children}</Listing>
        <ArrowController side="right" onClick={() => handleRightArrowClick()} />
      </div>
    </div>
  );
};
