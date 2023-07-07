import React, { HTMLAttributes, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';

export type CarrouselProps = {
  children: ReactNode[] | ReactNode;
  current?: number;
  onCurrentChange?: (current: number) => void;
} & HTMLAttributes<HTMLDivElement>;

export const CarrouselController = ({ children }: { children: ReactNode }) => {
  return <div className="absolute right-16 bottom-20 flex flex-row mt-6 left-1/2 ">{children}</div>;
};

export const CarrouselButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="hover:scale-125  w-10 h-1.5 shrink-0 bg-white bg-opacity-50 hover:bg-primary-200 transition-colors cursor-pointer ml-2"
      onClick={onClick}
    />
  );
};

export const CarrouselMarker = ({ current }: { current: number }) => {
  return (
    <div
      className={`w-10 shrink-0 h-1.5 bg-primary-500 cursor-pointer absolute ml-2`}
      style={{
        transform: `translateX(${current * 3}rem)`,
        transition: 'transform 0.5s ease-in-out',
      }}
    />
  );
};

export const Carrousel: React.FC<CarrouselProps> = ({ children, current = 0, onCurrentChange, ...props }) => {
  const childArray = Array.isArray(children) ? children : [children];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      onCurrentChange?.((current + 1) % childArray.length);
    }, 8000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (ref.current) ref.current.scroll({ left: current * window.innerWidth, behavior: 'smooth' });
  }, [current]);

  return (
    <div {...props} className="relative h-[36rem] w-full" ref={ref}>
      <div className="absolute w-screen h-full top-0 left-0 flex flex-row overflow-hidden ">
        {childArray.map((child, id) => {
          return (
            <div
              key={id}
              className="w-screen h-full absolute"
              style={{
                transform: `translateX(${(current - id) * 100}%)`,
                transition: 'transform 0.5s ease-in-out',
              }}>
              {child}
            </div>
          );
        })}
      </div>
      <CarrouselController>
        {Array.from({ length: childArray.length }).map((_, i) => {
          return (
            <CarrouselButton
              key={i}
              onClick={() => {
                onCurrentChange?.(i);
              }}
            />
          );
        })}
        <CarrouselMarker current={current} />
      </CarrouselController>
    </div>
  );
};
