import { ChevronRightIcon } from '../../../assets/icons/chevronRight';

export type ArrowControllerProps = {
  onClick?: () => void;
  side: 'left' | 'right';
  disabled?: boolean;
};
export const ArrowController: React.FC<ArrowControllerProps> = ({ onClick, side, disabled }) => {
  const wrapperStyle = side === 'left' ? 'left-0' : 'right-0';
  const iconStyle = side === 'left' ? 'rotate-180' : '';
  const disabledStyle = disabled ? 'opacity-0 pointer-events-none' : '';

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <div
      className={`absolute top-0 bottom-0 p-2 text-white z-20 group hover:bg-black hover:bg-opacity-20 transition-all flex items-center cursor-pointer ${wrapperStyle}`}
      onClick={handleClick}>
      <ChevronRightIcon
        className={`w-10 h-10 group-hover:scale-125 transition-all ${iconStyle} ${disabledStyle}`}
        style="fill-white  "
      />
    </div>
  );
};
