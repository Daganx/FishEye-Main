let totalLikes = 0;
// Affichage de la section Stats (Like total + Prix)
class PhotographerStats {
  static displayPhotographerStats(jsonData, targetPhotographerId) {
    const photographer = jsonData.photographers.find(
      (photographer) => photographer.id === parseInt(targetPhotographerId)
    );
    const mediaDataArray = jsonData.media.filter(
      (mediaData) => mediaData.photographerId === parseInt(targetPhotographerId)
    );
    if (photographer && mediaDataArray.length > 0) {
      const statsSection = document.querySelector(".stats-section");
      totalLikes = mediaDataArray.reduce(
        (total, media) => total + media.likes,
        0
      );

      const likesContainer = document.createElement("section");
      likesContainer.classList.add("likes-container");

      const likesTextElement = document.createElement("h4");
      likesTextElement.textContent = `${totalLikes}`;

      const heartElement = document.createElement("i");
      heartElement.classList.add("fa-solid", "fa-heart");

      likesContainer.appendChild(likesTextElement);
      likesContainer.appendChild(heartElement);

      const priceElement = document.createElement("h5");
      priceElement.textContent = `${photographer.price}€/jour`;

      statsSection.appendChild(likesContainer);
      statsSection.appendChild(priceElement);
    }
  }
}

function incrementTotalLikes() {
  const totalLikesElement = document.querySelector(".likes-container h4");
  totalLikes++;
  totalLikesElement.textContent = `${totalLikes}`;
}
function decrementTotalLikes() {
  const totalLikesElement = document.querySelector(".likes-container h4");
  totalLikes--;
  totalLikesElement.textContent = `${totalLikes}`;
}

export { PhotographerStats, incrementTotalLikes, decrementTotalLikes };