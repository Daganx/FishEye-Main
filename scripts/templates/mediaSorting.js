function sortByDate(mediaContainerId) {
    const mediaContainer = document.getElementById(mediaContainerId);
    const mediaFigures = Array.from(mediaContainer.querySelectorAll('.media-figure'));

    // Triez les médias en fonction de la date
    mediaFigures.sort((a, b) => {
        const dateA = new Date(a.querySelector('img, video').dataset.date);
        const dateB = new Date(b.querySelector('img, video').dataset.date);
        return dateB - dateA;
    });

    // Réorganisez les médias dans le conteneur
    mediaContainer.innerHTML = '';
    mediaFigures.forEach((mediaFigure) => {
        mediaContainer.appendChild(mediaFigure);
    });
}
function sortMediaPopularity() {
    const mediaContainer = document.getElementById('media-container');
    const mediaList = Array.from(mediaContainer.children);
    // Trier les éléments en fonction du nmbr de likes
    mediaList.sort((articleA, articleB) => {
        const likeA = parseInt(articleA.querySelector('img, video').dataset.likes);
        const likeB = parseInt(articleB.querySelector('img, video').dataset.likes);
        return likeB - likeA;
    });
    mediaContainer.innerHTML = '';
    mediaList.forEach(media => {
        mediaContainer.appendChild(media);
    });
}
function sortMediaAlphabetically() {
    const mediaContainer = document.getElementById('media-container');
    // Récupérez tous les médias (articles) dans le conteneur
    const mediaList = Array.from(mediaContainer.children);
    // Trier les médias par Ordre Alphabétique A=>Z
    mediaList.sort((articleA, articleB) => {
        const titleA = articleA.querySelector('img, video').dataset.title.toUpperCase();
        const titleB = articleB.querySelector('img, video').dataset.title.toUpperCase();
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
    // Vider le contenu
    mediaContainer.innerHTML = '';
    mediaList.forEach(article => {
        mediaContainer.appendChild(article);
    });
}

const sortByDateButton = document.getElementById('sort-by-date');
sortByDateButton.addEventListener('click', () => sortByDate('media-container'));
const sortByLikesButton = document.getElementById('sort-by-likes');
sortByLikesButton.addEventListener('click', () => sortMediaPopularity('media-container'));
const sortButtonAtoZ = document.getElementById('sort-by-title');
sortButtonAtoZ.addEventListener('click', () =>  sortMediaAlphabetically('media-container'));