import { NavigationMenuItem, NavigationMenuProps, Root, Trigger, Content } from '@radix-ui/react-navigation-menu';
import React from 'react';
import { Logo } from '../Logo';
import { ProfileMenu } from './components/ProfileMenu';
import { UserIcon } from '../../atoms/UserIcon';
import { useAuth } from '../../../contexts/Auth';
import { MoviesAPI } from '../../../services/api/MoviesAPI';
import { MovieService } from '../../../services/movie/MovieService';
import { Search } from '../../atoms/Search';

export type TNavMenuProps = NavigationMenuProps & {
  onSearchChange?: (query: string) => void;
  defaultSearchValue?: string;
};

export const NavMenu: React.FC<TNavMenuProps> = ({
  onSearchChange,
  children,
  className,
  defaultSearchValue,
  ...props
}) => {
  const { user } = useAuth();
  const api = new MoviesAPI();

  return (
    <Root {...props} className={`justify-between flex flex-row ${className} `}>
      <div className="flex flex-row">
        <Logo className="pr-10" />
        <div className="flex flex-row gap-6">{children}</div>
      </div>
      <Search onSearchChange={onSearchChange} defaultValue={defaultSearchValue} />
      <NavigationMenuItem>
        <Trigger>
          <UserIcon className="w-10 h-10 " src={user?.picture} />
          <ProfileMenu />
        </Trigger>
      </NavigationMenuItem>
    </Root>
  );
};
