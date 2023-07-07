import { useAuth0 } from '@auth0/auth0-react';
import { ReactNode, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

export type TLoginOptions = {
  username: string;
  password: string;
};

export type TAuthContextProps = {
  isAuth?: boolean;
  user?: any;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  token: Promise<string>;
};
export type TAuthProviderProps = {
  children: ReactNode | ReactNode[];
};

export const AuthContext = createContext({} as TAuthContextProps);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: TAuthProviderProps) => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
    };
    getToken();
  }, []);

  const token = getAccessTokenSilently().catch((err) => {
    console.log(err);
    return '';
  });

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthenticated,
        user: user,
        login: loginWithRedirect,
        logout,
        isLoading,
        token,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
