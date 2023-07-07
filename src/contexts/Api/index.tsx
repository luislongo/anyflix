import axios from 'axios';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import { useAuth } from '../Auth';

export type TAPIContextProps = {
  get: <T>(url: string) => Promise<T>;
  post?: <T>(url: string, body: any) => Promise<T>;
  put?: <T>(url: string, body: any) => Promise<T>;
  delete?: <T>(url: string) => Promise<T>;
};
export type TAPIProviderProps = {
  children: ReactNode | ReactNode[];
};

export const APIContext = createContext({} as TAPIContextProps);
export const useAPI = () => useContext(APIContext);

const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

export const APIProvider = ({ children }: TAPIProviderProps) => {
  const { token } = useAuth();

  const get = <T,>(url: string) => {
    return token.then((token) => {
      return axios
        .get<T>(`${BASE_URL}${url}`, {
          headers: {
            Authorization: `Bearer `,
          },
        })
        .then((res) => res.data);
    });
  };

  const post = <T,>(url: string, body: any) => {
    return token.then((token) => {
      return axios
        .post<T>(`${BASE_URL}${url}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    });
  };

  return (
    <APIContext.Provider
      value={{
        get,
      }}>
      {children}
    </APIContext.Provider>
  );
};
