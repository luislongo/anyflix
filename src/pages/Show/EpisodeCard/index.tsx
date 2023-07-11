import { Image } from '../../../components/atoms/Image';

export interface EpisodeCardProps {
  name: string;
  order: string;
  thumbnailSrc: string;
  onClick?: () => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ name, thumbnailSrc, order, onClick }) => {
  return (
    <div
      className="group flex-1 flex-shrink min-w-[12rem]   scale-95 hover:scale-100 cursor-pointer transition-transform overflow-hidden flex flex-col  "
      onClick={() => onClick?.()}>
      <Image src={thumbnailSrc} className="h-auto w-full object-contain shrink-0" />
      <h3 className="text-md gap-2 flex flex-row justify-items-start font-medium text-white group-hover:text-primary-300">
        <p>{order}</p>
        <p>|</p>
        <p className="font-light">{name}</p>
      </h3>
    </div>
  );
};
