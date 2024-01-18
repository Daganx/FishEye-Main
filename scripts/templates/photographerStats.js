class PhotographerStats {
    static displayPhotographerStats(jsonData, targetPhotographerId) {
        const photographer = jsonData.photographers.find(photographer => photographer.id === parseInt(targetPhotographerId));
        const mediaDataArray = jsonData.media.filter(mediaData => mediaData.photographerId === parseInt(targetPhotographerId));

        if (photographer && mediaDataArray.length > 0) {
            const statsSection = document.querySelector('.stats-section')
            // Calcul des likes totaux
            const totalLikes = mediaDataArray.reduce((total, media) => total + media.likes, 0);
            // Création des éléments d'informations statistiques
            const likesElement = document.createElement('p');
            likesElement.textContent = `Likes : ${totalLikes}`;

            const priceElement = document.createElement('p');
            priceElement.textContent = `Prix : ${photographer.price}€/jour`;
            // Ajout des éléments à la section "stats"
            statsSection.appendChild(likesElement);
            statsSection.appendChild(priceElement);
        }
    }
}

export { PhotographerStats };