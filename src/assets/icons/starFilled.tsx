import React from 'react';
import { IconProps } from './IconProps';

export const StarFilledIcon: React.FC<IconProps> = ({ className, style }) => {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path
        d="M11.7,44l3.3-14.1L4,20.5l14.4-1.3L24,6l5.6,13.3L44,20.5l-10.9,9.4L36.4,44L24,36.5L11.7,44z"
        className={style}
      />
    </svg>
  );
};
