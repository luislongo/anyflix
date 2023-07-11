import { joinReactNodes } from '../../../../services/utils/joinReactElements';

export type SubtitleProps = {
  children?: React.ReactNode;
};

export const Subtitle: React.FC<SubtitleProps> = ({ children }) => {
  const interleavedChildren = joinReactNodes(children, <p className="text-white">|</p>);

  return <div className="flex flex-row w-full items-center gap-4">{interleavedChildren}</div>;
};
