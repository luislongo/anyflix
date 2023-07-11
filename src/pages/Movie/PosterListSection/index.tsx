import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowController } from '../../../components/atoms/ArrowController';
import { HorizontalScroll } from '../../../components/atoms/HorizontalScroll';
import { Overlay } from '../../../components/atoms/Overlay';

export const PosterListSection = ({
  images,
}: {
  images: {
    smallUrl: string;
    largeUrl: string;
  }[];
}) => {
  const [selected, setSelected] = useState<number>();

  const handleArrowClick = (side: 'left' | 'right') => {
    let newSelected = selected || 0;
    if (side === 'left') {
      newSelected = newSelected - 1;
      if (newSelected < 0) newSelected = images.length - 1;
    } else {
      newSelected = newSelected + 1;
      if (newSelected > images.length - 1) newSelected = 0;
    }

    setSelected(newSelected);
  };

  return (
    <section className="select-none">
      <h2 className="text-white text-2xl mb-2">Posters</h2>
      <HorizontalScroll title="Posters" className="flex flex-row flex-nowrap gap-2 h-40 overflow-x-auto">
        {images?.map((image, id) => {
          return (
            <img
              src={image.smallUrl}
              className="h-auto hover:scale-100 scale-95 cursor-pointer "
              onClick={() => setSelected(id)}
            />
          );
        })}
      </HorizontalScroll>
      {selected !== undefined &&
        createPortal(
          <div className="fixed top-0 left-0 w-screen h-screen  flex justify-center items-center">
            <Overlay onClick={() => setSelected(undefined)} />
            <ArrowController side="left" onClick={() => handleArrowClick('left')} />
            <ArrowController side="right" onClick={() => handleArrowClick('right')} />
            <div className=" absolute flex flex-col items-center gap-4 h-[80%] max-h-[80%]">
              <img src={images[selected].largeUrl} className="h-full select-none" />
              <p className="text-white font-sans font-bold text-lg">
                {selected} / {images.length}
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
