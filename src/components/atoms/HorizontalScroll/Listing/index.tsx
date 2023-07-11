import React from 'react';

export type ListingProps = {
  children: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
};

export const Listing: React.FC<ListingProps> = ({ children, innerRef }) => {
  return (
    <div className="relative flex flex-row flex-nowrap gap-2 overflow-x-scroll scrollbar-hide px-6" ref={innerRef}>
      {children}
    </div>
  );
};
