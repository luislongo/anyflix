export type AsideProps = {
  children?: React.ReactNode;
};

export const Aside: React.FC<AsideProps> = ({ children }) => {
  return <aside className="flex flex-col gap-4">{children}</aside>;
};
