import React from 'react';

export type OverlayProps = {
  onClick?: () => void;
};

export const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-0 cursor-pointer hover:bg-opacity-40 transition-all"
      onClick={() => onClick?.()}></div>
  );
};
