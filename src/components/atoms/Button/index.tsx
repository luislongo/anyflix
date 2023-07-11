import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const Button: React.FC<TButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`py-3 px-4 bg-primary-400 hover:bg-primary-600 group text-white font-bold transition-all  ${className}`}>
      {children}
    </button>
  );
};
