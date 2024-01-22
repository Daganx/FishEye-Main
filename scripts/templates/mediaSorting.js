class MediaSorting {
    static sortMedia(mediaContainerId, sortBy) {
        const mediaContainer = document.getElementById(mediaContainerId);
        const mediaList = Array.from(mediaContainer.children);

        switch (sortBy) {
            case 'date':
                mediaList.sort((a, b) => {
                    const dateA = new Date(a.querySelector('img, video').dataset.date);
                    const dateB = new Date(b.querySelector('img, video').dataset.date);
                    return dateB - dateA;
                });
                break;
            case 'likes':
                mediaList.sort((articleA, articleB) => {
                    const likeA = parseInt(articleA.querySelector('img, video').dataset.likes);
                    const likeB = parseInt(articleB.querySelector('img, video').dataset.likes);
                    return likeB - likeA;
                });
                break;
            case 'title':
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
                break;
            default:
                break;
        }

        mediaContainer.innerHTML = '';
        mediaList.forEach(article => {
            mediaContainer.appendChild(article);
        });
    }
        static initSortingSelect() {
        const sortingSelect = document.getElementById('sorting-select');
        sortingSelect.addEventListener('change', () => {
            const selectedValue = sortingSelect.value;
            MediaSorting.sortMedia('media-container', selectedValue);
        });
    }
}

export { MediaSorting };