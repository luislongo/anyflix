import axios from 'axios';
import React, { ImgHTMLAttributes, useEffect, useState } from 'react';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({ src, ...props }) => {
  const [imgData, setImgData] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios
      .get(src || '', {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        setImgData(res.data);
      });
  }, [src]);

  return <img src={src} {...props} loading="lazy" />;
};
