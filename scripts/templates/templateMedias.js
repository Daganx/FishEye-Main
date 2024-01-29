import { MediaFactory } from "../factory/mediaFactory.js";
import { VideoMedia } from "../classes/media.js";
import { incrementTotalLikes, decrementTotalLikes } from "../templates/photographerStats.js";

class TemplateMedias {
  static displayMedias(jsonData, targetPhotographerId) {
    const mediaFactory = new MediaFactory();
    const photographerMap = new Map();

    for (const photographerData of jsonData.photographers) {
      photographerMap.set(photographerData.id, photographerData);
    }

    const mediaDataArray = jsonData.media.filter(
      (mediaData) => mediaData.photographerId === parseInt(targetPhotographerId)
    );
    const mediaContainer = document.getElementById("media-container");

    for (const mediaData of mediaDataArray) {
      const photographer = photographerMap.get(mediaData.photographerId);

      if (photographer) {
        const media = mediaFactory.createMedia(mediaData, photographer);

        const mediaFigure = document.createElement("figure");
        mediaFigure.classList.add("media-figure");

        const mediaElement = document.createElement(
          media instanceof VideoMedia ? "video" : "img"
        );
        mediaElement.src = `assets/images/${photographer.name}/${
          media instanceof VideoMedia ? media.video : media.image
        }`;
        mediaElement.dataset.likes = media.likes;
        mediaElement.dataset.date = media.date;
        mediaElement.dataset.title = media.title;
        mediaElement.alt = ""
        mediaElement.classList.add("lightbox-trigger");
        mediaElement.setAttribute("data-id", media.id);

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.classList.add("media-figcaption");

        const nameElement = document.createElement("h2");
        nameElement.classList.add("media-name");
        nameElement.textContent = `${media.title}`;
        figcaptionElement.appendChild(nameElement);

        const likesContainer = document.createElement("h3");
        likesContainer.classList.add("media-likes");

        const likesCountElement = document.createElement("span");
        likesCountElement.textContent = media.likes;

        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa-regular", "fa-heart");

        likesContainer.appendChild(likesCountElement);
        likesContainer.appendChild(likeIcon);
        figcaptionElement.appendChild(likesContainer);
        mediaFigure.appendChild(mediaElement);
        mediaFigure.appendChild(figcaptionElement);
        mediaContainer.appendChild(mediaFigure);

        // Ajoute un gestionnaire d'événements pour le clic sur l'icône cœur
        likeIcon.addEventListener("click", () => {
          // Récupère l'identifiant unique du média
          const mediaId = mediaElement.getAttribute("data-id");
          // Appelle la fonction pour incrémenter les likes du média
          toggleLikes(mediaId);
        });

        function toggleLikes(mediaId) {
          const mediaElement = document.querySelector(`[data-id="${mediaId}"]`);
          const likesElement = mediaElement
            .closest(".media-figure")
            .querySelector(".media-likes");

          if (media.isLiked) {
            // Si déjà liké, appelle la fonction pour décrémenter les likes du média
            decrementLikes(mediaId);
            decrementTotalLikes();
          } else {
            // Si non liké, appelle la fonction pour incrémenter les likes du média
            incrementLikes(mediaId);
            incrementTotalLikes();
          }

          // Inverse l'état du like
          media.isLiked = !media.isLiked;
        }

        function incrementLikes(mediaId) {
          // Incrémente le nombre de likes
          media.likes++;

          // Met à jour le contenu de l'élément likesCountElement sans réaffecter les gestionnaires d'événements
          likesCountElement.textContent = media.likes;

          // Change l'icône pour indiquer que le média est liké
          likeIcon.classList.replace("fa-regular", "fas");
        }

        function decrementLikes(mediaId) {
          // Décrémente le nombre de likes
          media.likes--;

          // Met à jour le contenu de l'élément likesCountElement sans réaffecter les gestionnaires d'événements
          likesCountElement.textContent = media.likes;

          // Change l'icône pour indiquer que le média n'est pas liké
          likeIcon.classList.replace("fas", "fa-regular");
        }
      }
    }
  }
}

export { TemplateMedias };