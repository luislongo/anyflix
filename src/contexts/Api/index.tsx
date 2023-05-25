import axios from 'axios';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import { useAuth } from '../Auth';

export type TAPIContextProps = {
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string, body: any) => Promise<T>;
  put: <T>(url: string, body: any) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
};
export type TAPIProviderProps = {
  children: ReactNode | ReactNode[];
};

export const APIContext = createContext({} as TAPIContextProps);
export const useAPI = () => useContext(APIContext);

export const APIProvider = ({ children }: TAPIProviderProps) => {
  const { token } = useAuth();
  console.log(import.meta.env);
  const api = useMemo(
    () =>
      axios.create({
        baseURL: import.meta.env.VITE_PUBLIC_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    [token]
  );

  return (
    <APIContext.Provider
      value={{
        get: api.get,
        post: api.post,
        put: api.put,
        delete: api.delete,
      }}>
      {children}
    </APIContext.Provider>
  );
};
