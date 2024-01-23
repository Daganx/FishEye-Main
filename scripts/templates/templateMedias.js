import { MediaFactory } from "../factory/mediaFactory.js";
import { VideoMedia } from "../classes/media.js";
import { incrementTotalLikes } from "../templates/photographerStats.js";

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

                const likeIcon = document.createElement('i');
                likeIcon.classList.add('fa-regular', 'fa-heart');

                // Ajoute un identifiant unique pour le média
                mediaElement.setAttribute('data-id', media.id);

                likesElement.innerHTML += ` ${media.likes}`;

                figcaptionElement.appendChild(likesElement);
                likesElement.appendChild(likeIcon);
                mediaFigure.appendChild(mediaElement);
                mediaFigure.appendChild(figcaptionElement);
                mediaContainer.appendChild(mediaFigure);

                // Ajoute un gestionnaire d'événements pour le clic sur l'icône cœur
                likeIcon.addEventListener('click', () => {
                    // Récupère l'identifiant unique du média
                    const mediaId = mediaElement.getAttribute('data-id');
                    // Appelle la fonction pour incrémenter les likes du média
                    incrementLikes(mediaId);
                    incrementTotalLikes();
                });

                function incrementLikes(mediaId) {
                    const mediaElement = document.querySelector(`[data-id="${mediaId}"]`);
                    const likesElement = mediaElement.closest('.media-figure').querySelector('.media-likes');
                    // Incrémente le nombre de likes
                    media.likes++;
                    // Met à jour l'affichage du nombre de likes
                    likesElement.innerHTML = `${media.likes}<i class="fas fa-heart"></i>`;
                }
            }
        }
    }
}

export { TemplateMedias };