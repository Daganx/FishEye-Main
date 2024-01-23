let totalLikes = 0;

class PhotographerStats {
    static displayPhotographerStats(jsonData, targetPhotographerId) {
        const photographer = jsonData.photographers.find(photographer => photographer.id === parseInt(targetPhotographerId));
        const mediaDataArray = jsonData.media.filter(mediaData => mediaData.photographerId === parseInt(targetPhotographerId));
        if (photographer && mediaDataArray.length > 0) {
            const statsSection = document.querySelector('.stats-section');
            // Calcul des likes totaux
            totalLikes = mediaDataArray.reduce((total, media) => total + media.likes, 0);
            // Création de la div pour les éléments likesText et heart
            const likesContainer = document.createElement('div');
            likesContainer.classList.add('likes-container');
            // Création de l'élément likesText
            const likesTextElement = document.createElement('p');
            likesTextElement.textContent = `${totalLikes}`;
            // Création de l'élément heart
            const heartElement = document.createElement('i');
            heartElement.classList.add('fa-solid', 'fa-heart');
            // Ajout des éléments à la div
            likesContainer.appendChild(likesTextElement);
            likesContainer.appendChild(heartElement);
            // Création de l'élément price
            const priceElement = document.createElement('p');
            priceElement.textContent = `${photographer.price}€/jour`;
            // Ajout de la div (contenant likesText et heart) et price à la section des statistiques
            statsSection.appendChild(likesContainer);
            statsSection.appendChild(priceElement);
        }
    }
}

function incrementTotalLikes() {
    const totalLikesElement = document.querySelector('.likes-container p');
    // Incrémente le total des likes
    totalLikes++;
    // Met à jour l'affichage du total des likes
    totalLikesElement.textContent = `${totalLikes}`;
}

export { PhotographerStats, incrementTotalLikes };