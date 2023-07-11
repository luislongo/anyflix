import { ReactNode } from 'react';
import { HorizontalList } from '../../../components/atoms/HorizontalScroll';

export const CastList = ({ children }: { children?: ReactNode }) => {
  return (
    <HorizontalList title="Cast" className="flex flex-col gap-4 overflow-hidden h-fit">
      {children}
    </HorizontalList>
  );
};
