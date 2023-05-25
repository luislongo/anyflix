import React from "react";

export type TModalProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
} & React.HTMLAttributes<HTMLDivElement>;

export const Modal: React.FC<TModalProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={`z-[99] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-stretch bg-slate-800 bg-opacity-60 rounded-md ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
