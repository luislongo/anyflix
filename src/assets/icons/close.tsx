import React from 'react';
import { IconProps } from './IconProps';

export const CloseIcon: React.FC<IconProps> = ({ className, style }) => {
  return (
    <svg viewBox="0 -960 960 960" className={className}>
      <path
        d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
        className={style}
      />
    </svg>
  );
};
