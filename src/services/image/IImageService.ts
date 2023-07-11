export interface ImageOpts {
    size?: 'w300' | 'w500' | 'w1280' | 'original';
}

export interface IImageService {
    getImageSrc: (path: string, opts : ImageOpts) => string;
}