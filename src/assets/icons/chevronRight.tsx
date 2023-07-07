import React from 'react';
import { IconProps } from './IconProps';

export const ChevronRightIcon: React.FC<IconProps> = ({ className, style }) => {
  return (
    <svg viewBox="0 -960 960 960" className={className}>
      <path d="m375-240-43-43 198-198-198-198 43-43 241 241-241 241Z" className={style} />
    </svg>
  );
};
