import axios from 'axios';
import React, { ImgHTMLAttributes, useEffect, useState } from 'react';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({ ...props }) => {
  return <img {...props} loading="lazy" />;
};
