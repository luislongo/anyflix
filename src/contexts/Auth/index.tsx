import { ReactNode, useEffect, useState } from "react";
import { createContext, useContext } from "react";

export type User = {
  username: string;
  email: string;
};

export type TAuthState = {
  isAuth?: boolean;
  user?: User;
  remember: boolean;
  token?: string;
};

export type TLoginOptions = {
  username: string;
  password: string;
};

export type TAuthContextProps = {
  isAuth?: boolean;
  user?: User;
  token?: string;
  login: () => void;
  logout: () => void;
};
export type TAuthProviderProps = {
  children: ReactNode | ReactNode[];
};

export const AuthContext = createContext({} as TAuthContextProps);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: TAuthProviderProps) => {
  const [state, setState] = useState<TAuthState>({
    remember: false,
  });

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    const user = localStorage.getItem("user");
    const remember = localStorage.getItem("remember");
    const token = localStorage.getItem("token");

    if (isAuth && user) {
      setState((prev) => ({
        ...prev,
        isAuth: JSON.parse(isAuth),
        user: JSON.parse(user),
        remember: JSON.parse(remember || "false"),
        token: JSON.parse(token || "false"),
      }));

      return;
    }

    setState((prev) => ({
      ...prev,
      isAuth: false,
      user: undefined,
      remember: false,
      token: undefined,
    }));
  }, []);

  const login = () => {
    setState((prev) => ({
      ...prev,
      isAuth: true,
      user: { username: "Luís Longo", email: "luis.longof@gmail.com" },
      remember: false,
      token: "1234567890",
    }));

    localStorage.setItem("isAuth", JSON.stringify(true));
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "Luís Longo", email: "luis.longof@gmail.com" })
    );
    localStorage.setItem("remember", JSON.stringify(false));
    localStorage.setItem("token", JSON.stringify("1234567890"));
  };

  const logout = () => {
    setState((prev) => ({
      ...prev,
      isAuth: false,
      user: undefined,
    }));

    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    localStorage.removeItem("remember");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: state.isAuth,
        user: state.user,
        token: state.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
