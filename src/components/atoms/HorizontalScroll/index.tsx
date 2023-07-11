import React, { HTMLAttributes, useRef } from 'react';
import { useHorizontalScroll } from '../../../hooks/useHorizontalScroll';
import { ArrowController } from '../ArrowController';
import { Listing } from './Listing';

export type HorizontalScrollProps = HTMLAttributes<HTMLDivElement>;

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ className, title, children, ...props }) => {
  const { ref, scroll, scrollTo } = useHorizontalScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLeftArrowClick = () => {
    scrollTo(scroll - containerRef.current?.clientWidth! * 0.8);
  };

  const handleRightArrowClick = () => {
    scrollTo(scroll + containerRef.current?.clientWidth! * 0.8);
  };

  return (
    <div className={`flex flex-row relative ${className}`} {...props} ref={containerRef}>
      <ArrowController side="left" onClick={() => handleLeftArrowClick()} disabled={scroll === 0} />
      <Listing innerRef={ref}>{children}</Listing>
      <ArrowController side="right" onClick={() => handleRightArrowClick()} />
    </div>
  );
};
