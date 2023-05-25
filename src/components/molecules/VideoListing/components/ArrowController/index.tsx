import React, { HTMLAttributes } from "react";

export type TArrayControllerProps = {
  side: "left" | "right";
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const ArrowController: React.FC<TArrayControllerProps> = ({
  side,
  ...rest
}) => {
  return (
    <div className="" {...rest}>
      {side === "left" ? "<" : ">"}
    </div>
  );
};
