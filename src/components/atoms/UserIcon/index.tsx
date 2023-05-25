import React, { HTMLAttributes } from 'react';

export type TUserIconProps = Omit<HTMLAttributes<HTMLImageElement>, 'src'>;

export const UserIcon: React.FC<TUserIconProps> = ({ className, ...rest }) => {
  return <img className={`rounded-full ${className}`} src={'/profile.jpg'} {...rest} />;
};
