import { Cast } from '../../../services/credits/ICreditsService';
import { ImageService } from '../../../services/image/ImageService';

export const CastListItem = ({ person }: { person: Cast }) => {
  return (
    <div className="flex flex-col items-center shrink-0 max-w-[150px]">
      <img
        src={new ImageService().getImageSrc(person.profile_path || '')}
        className="h-24 w-24 object-cover rounded-full mb-2"
      />
      <h4 className="text-white font-bold whitespace-nowrap text-center overflow-hidden w-full text-ellipsis">
        {person.name}
      </h4>
      <h5 className="text-white text-sm whitespace-nowrap overflow-hidden w-full text-ellipsis">{person.character}</h5>
    </div>
  );
};
