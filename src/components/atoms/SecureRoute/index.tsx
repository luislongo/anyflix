import React from "react";
import { useAuth } from "../../../contexts/Auth";

export type TSecureComponentProps = {
  unAuthComponent: React.ReactNode;
  children: React.ReactNode;
};

export const SecureComponent: React.FC<TSecureComponentProps> = ({
  unAuthComponent,
  children,
}) => {
  const { isAuth } = useAuth();

  return (
    <>
      {isAuth === true && children}
      {isAuth === false && unAuthComponent}
    </>
  );
};
