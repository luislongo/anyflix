import React from "react";

export type TTitleProps = {
  children?: React.ReactNode;
};

export const Title: React.FC<TTitleProps> = ({ children }) => {
  return (
    <h1 className="w-full text-white text-5xl font-bold font-serif py-12">
      {children}
    </h1>
  );
};
