import React, { HTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";

export type TLogoProps = HTMLAttributes<HTMLDivElement>;

export const Logo: React.FC<TLogoProps> = (props) => {
  return (
    <div {...props} className="pr-10">
      <Link to={"/"} className="text-red-400 font-bold">
        LOGO
      </Link>
    </div>
  );
};
