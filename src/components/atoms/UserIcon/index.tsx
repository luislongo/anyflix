import React, { HTMLAttributes } from 'react';

export type TUserIconProps = HTMLAttributes<HTMLImageElement> & {
  src: string;
};

export const UserIcon: React.FC<TUserIconProps> = ({ className, ...rest }) => {
  return <img className={`rounded-full ${className}`} {...rest} />;
};
