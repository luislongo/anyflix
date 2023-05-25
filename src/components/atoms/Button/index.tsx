import React, { ButtonHTMLAttributes, ReactNode } from "react";

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const Button: React.FC<TButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`py-3 px-4 bg-primary-400 hover:bg-primary-600 group hover:text-white transition-all rounded-xl ${className}`}
    >
      {children}
    </button>
  );
};
