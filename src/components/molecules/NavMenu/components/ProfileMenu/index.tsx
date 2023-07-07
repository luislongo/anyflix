import React from 'react';
import { Content as RadixMenuContent } from '@radix-ui/react-navigation-menu';
import { useAuth } from '../../../../../contexts/Auth';
import { Button } from '../../../../atoms/Button';
import { UserIcon } from '../../../../atoms/UserIcon';
export type TProfileMenuProps = {};

export const ProfileMenu: React.FC<TProfileMenuProps> = ({}) => {
  const { user, logout } = useAuth();

  return (
    <RadixMenuContent className="absolute mr-2 mt-2 right-0 border border-slate-300 bg-slate-600 flex flex-col place-items-center gap-2 p-6 pt-12">
      <UserIcon className="w-24 h-24" src={user?.picture} />
      <p>{user?.username}</p>
      <p>{user?.email}</p>
      <Button onClick={logout}>Logout</Button>
    </RadixMenuContent>
  );
};
