import { incrementTotalLikes, decrementTotalLikes } from "../templates/photographerStats.js";

function toggleLikes(media, mediaId, likesCountElement, likeIcon) {
    const mediaElement = document.querySelector(`[data-id="${mediaId}"]`);
    // eslint-disable-next-line no-unused-vars
    const likesElement = mediaElement
      .closest(".media-figure")
      .querySelector(".media-likes");
  
    if (media.isLiked) {
      decrementLikes(media, mediaId, likesCountElement, likeIcon);
      decrementTotalLikes();
    } else {
      incrementLikes(media, mediaId, likesCountElement, likeIcon);
      incrementTotalLikes();
    }
    // Inverse l'état du like
    media.isLiked = !media.isLiked;
  }
  
  function incrementLikes(media, mediaId, likesCountElement, likeIcon) {
    media.likes++;
    likesCountElement.textContent = media.likes;
    likeIcon.classList.replace("fa-regular", "fas");
  }
  
  function decrementLikes(media, mediaId, likesCountElement, likeIcon) {
    media.likes--;
    likesCountElement.textContent = media.likes;
    likeIcon.classList.replace("fas", "fa-regular");
  }
  
  export { toggleLikes, incrementLikes, decrementLikes };