import React from 'react';
import { IconProps } from './IconProps';

export const StarHollowIcon: React.FC<IconProps> = ({ className, style }) => {
  return (
    <svg viewBox="0 -960 960 960" className={className}>
      <path
        d="m323-205 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-355Z"
        className={style}
      />
    </svg>
  );
};
