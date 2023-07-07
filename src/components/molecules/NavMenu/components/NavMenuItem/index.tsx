import React, { ReactNode } from 'react';
import { Link as RadixLink } from '@radix-ui/react-navigation-menu';

export type TNavMenuItemProps = {
  children: ReactNode;
  to: string;
};

export const NavMenuItem: React.FC<TNavMenuItemProps> = ({ children, to }) => {
  const active = window.location.pathname.split('/')[1] === to.split('/')[1];

  console.log(active);
  console.log(to);
  console.log(window.location.pathname);
  console.log('split', window.location.pathname.split('/'));

  return (
    <a
      href={to}
      className={` font-bold hover:text-primary-400 transition-all ${active ? 'text-primary-400' : 'text-white'}`}>
      {children}
    </a>
  );
};
