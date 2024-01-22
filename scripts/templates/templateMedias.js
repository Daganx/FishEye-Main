import { MediaFactory } from "../factory/mediaFactory.js";
import { VideoMedia } from "../classes/media.js";

class TemplateMedias {
    static displayMedias(jsonData, targetPhotographerId) {
        const mediaFactory = new MediaFactory();
        const photographerMap = new Map();

        for (const photographerData of jsonData.photographers) {
            photographerMap.set(photographerData.id, photographerData);
        }

        const mediaDataArray = jsonData.media.filter(mediaData => mediaData.photographerId === parseInt(targetPhotographerId));
        const mediaContainer = document.getElementById('media-container');

        for (const mediaData of mediaDataArray) {
            const photographer = photographerMap.get(mediaData.photographerId);

            if (photographer) {
                const media = mediaFactory.createMedia(mediaData, photographer);

                const mediaFigure = document.createElement('figure');
                mediaFigure.classList.add('media-figure');

                const mediaElement = document.createElement(media instanceof VideoMedia ? 'video' : 'img');
                mediaElement.src = `assets/images/${photographer.name}/${media instanceof VideoMedia ? media.video : media.image}`;
                mediaElement.dataset.likes = media.likes;
                mediaElement.dataset.date = media.date;
                mediaElement.dataset.title = media.title;
                mediaElement.classList.add('lightbox-trigger');

                const figcaptionElement = document.createElement('figcaption');
                figcaptionElement.classList.add('media-figcaption');
                
                const nameElement = document.createElement('p');
                nameElement.classList.add('media-name');
                nameElement.textContent = `${media.title}`;
                figcaptionElement.appendChild(nameElement);

                const likesElement = document.createElement('p');
                likesElement.classList.add('media-likes');
                likesElement.textContent = `${media.likes}`;
                figcaptionElement.appendChild(likesElement);

                mediaFigure.appendChild(mediaElement);
                mediaFigure.appendChild(figcaptionElement);
                mediaContainer.appendChild(mediaFigure);
            }
        }
    }
}

export { TemplateMedias };