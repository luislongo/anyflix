import React, { ImgHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../../../assets/icons/close';

export type ExpandableImageProps = { expandedSrc?: string } & ImgHTMLAttributes<HTMLImageElement>;

export const ExpandableImage: React.FC<ExpandableImageProps> = ({ onClick, ...props }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setIsExpanded(!isExpanded);
    onClick?.(e);
  };

  return (
    <>
      <img {...props} onClick={(e) => handleClick(e)} />
      {isExpanded &&
        createPortal(
          <div
            className="fixed  top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 z-50"
            onClick={handleClick}>
            0
            <div className="relative w-full h-full max-h-[90%] max-w-[95%]">
              <img src={props.src} className="absolute w-full h-full object-contain" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
