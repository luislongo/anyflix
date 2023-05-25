import { Link as RouterLink } from "react-router-dom";

export type TLinkProps = {
  children?: React.ReactNode;
  to: string;
};

export const Link: React.FC<TLinkProps> = ({ children, to }) => {
  return (
    <RouterLink
      to={to}
      className="text-primary-400 underline hover:text-primary-600"
    >
      {children}
    </RouterLink>
  );
};
