import { NavigationMenuItem, NavigationMenuProps, Root, Trigger, Content } from '@radix-ui/react-navigation-menu';
import React from 'react';
import { Logo } from '../Logo';
import { ProfileMenu } from './components/ProfileMenu';
import { UserIcon } from '../../atoms/UserIcon';

export type TNavMenuProps = NavigationMenuProps;

export const NavMenu: React.FC<TNavMenuProps> = (props) => {
  return (
    <Root {...props} className={`justify-between flex flex-row ${props.className}`}>
      <div className="flex flex-row">
        <Logo className="pr-10" />
        <div className="flex flex-row gap-6">{props.children}</div>
      </div>
      <NavigationMenuItem>
        <Trigger>
          <UserIcon className="w-10 h-10 " />
          <ProfileMenu />
        </Trigger>
      </NavigationMenuItem>
    </Root>
  );
};
