import { IImageService, ImageOpts } from "./IImageService";

export class ImageService implements IImageService {
    getImageSrc(path: string, opts?: ImageOpts) {
        return `https://image.tmdb.org/t/p/${opts?.size || 'w500'}/${path}`;
    }
    getPeopleImageSrc(path: string) {
        return `https://image.tmdb.org/t/p/w185/${path}`;
    }
}