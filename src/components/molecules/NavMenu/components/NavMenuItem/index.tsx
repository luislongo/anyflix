import React, { ReactNode } from "react";
import { Link as RadixLink } from "@radix-ui/react-navigation-menu";

export type TNavMenuItemProps = {
  children: ReactNode;
  to: string;
};

export const NavMenuItem: React.FC<TNavMenuItemProps> = ({ children, to }) => {
  return (
    <RadixLink
      href={to}
      className="text-white font-bold hover:text-primary-400 transition-all active:text-primary-400"
    >
      {children}
    </RadixLink>
  );
};
