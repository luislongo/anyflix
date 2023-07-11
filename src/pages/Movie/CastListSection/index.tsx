import { ReactNode } from 'react';
import { HorizontalScroll } from '../../../components/atoms/HorizontalScroll';

export const CastList = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <h2 className="text-white text-2xl mb-2">Cast</h2>
      <HorizontalScroll className="flex flex-row  gap-4 overflow-x-hidden">{children}</HorizontalScroll>;
    </div>
  );
};
