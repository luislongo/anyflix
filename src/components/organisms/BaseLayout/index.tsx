import React from 'react';
import { NavMenu } from '../../molecules/NavMenu';
import { NavMenuItem } from '../../molecules/NavMenu/components/NavMenuItem';

export interface BaseLayoutProps {
  children: React.ReactNode;
  onSearchChange?: (value: string) => void;
  defaultSearchValue?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, onSearchChange, defaultSearchValue }) => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen overflow-y-hidden pt-16 bg-black -z-30 select-none">
      <NavMenu
        className="z-10 flex items-center top-0 flex-row px-4 py-2 absolute w-full  h-16"
        defaultSearchValue={defaultSearchValue}
        onSearchChange={onSearchChange}>
        <NavMenuItem to={'/movies'}>Movies</NavMenuItem>
        <NavMenuItem to={'/shows'}>TV Shows</NavMenuItem>
        <NavMenuItem to={'/recently-added'}>Recently added</NavMenuItem>
        <NavMenuItem to={'/my-list'}>My list</NavMenuItem>
      </NavMenu>
      {children}
    </div>
  );
};

export default BaseLayout;
