export type AsideProps = {
  children?: React.ReactNode;
};

export const Aside: React.FC<AsideProps> = ({ children }) => {
  return <aside className="grid grid-cols-1 gap-4 overflow-y-scroll w-full h-full">{children}</aside>;
};
