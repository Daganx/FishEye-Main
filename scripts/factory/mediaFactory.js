import {VideoMedia, ImageMedia } from "../classes/media.js";

class MediaFactory {
    createMedia(data, photographer) {
        if (data.video) {
            return new VideoMedia(data, photographer);
        } else {
            return new ImageMedia(data, photographer);
        }
    }
}

export { MediaFactory };