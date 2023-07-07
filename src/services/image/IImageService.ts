export interface ImageOpts {
    size?: 'w500' | 'original';
}

export interface IImageService {
    getImageSrc: (path: string, opts : ImageOpts) => string;
}