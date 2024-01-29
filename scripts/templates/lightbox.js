class Lightbox {
    static init() {
        const mediaTriggers = Array.from(document.querySelectorAll('.lightbox-trigger'));
        mediaTriggers.forEach(trigger => {
            trigger.addEventListener('click', event => {
                const mediaIndex = mediaTriggers.indexOf(event.currentTarget);
                new Lightbox(mediaTriggers, mediaIndex);
            });
        });
    }

    constructor(mediaTriggers, initialIndex) {
        this.mediaTriggers = mediaTriggers;
        this.currentIndex = initialIndex;
        this.buildLightbox();
        this.showMedia();
        this.setupEventListeners();
    }

    buildLightbox() {
        this.lightboxContainer = document.createElement('div');
        this.lightboxContainer.classList.add('lightbox-container');
        document.body.appendChild(this.lightboxContainer);

        this.lightboxContent = document.createElement('div');
        this.lightboxContent.classList.add('lightbox-content');
        this.lightboxContainer.appendChild(this.lightboxContent);

        this.btnClose = document.createElement('i');
        this.btnClose.classList.add('lightbox-close');
        this.btnClose.innerHTML = '<i class="fa-solid fa-times"></i>';
        this.lightboxContainer.appendChild(this.btnClose);

        this.btnNext = document.createElement('i');
        this.btnNext.classList.add('lightbox-next');
        this.btnNext.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        this.lightboxContainer.appendChild(this.btnNext);

        this.btnPrev = document.createElement('i');
        this.btnPrev.classList.add('lightbox-prev');
        this.btnPrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        this.lightboxContainer.appendChild(this.btnPrev);

        this.videoElement = document.createElement('video');
        this.videoElement.setAttribute('controls', 'true');
        this.videoElement.setAttribute('autoplay', 'true');
        this.lightboxContent.appendChild(this.videoElement);

        this.mediaNameContainer = document.createElement('p');
        this.mediaNameContainer.classList.add('media-name-container');
        // this.lightboxContent.appendChild(this.mediaNameContainer);
    }

    showMedia() {
        // Récupère l'index
        const currentTrigger = this.mediaTriggers[this.currentIndex];
        // Supprime tous les enfants de la lightboxContent
        this.lightboxContent.innerHTML = '';
        // Crée une nouvelle vidéo ou une nouvelle image
        const mediaElement = currentTrigger.tagName === 'VIDEO' ? document.createElement('video') : document.createElement('img');
        // Utilise directement le chemin d'accès existant si la balise vidéo existe
        const mediaPath = currentTrigger.tagName === 'VIDEO' ? (currentTrigger.dataset.src || currentTrigger.src) : currentTrigger.src;
        // Ajout des dataset
        mediaElement.src = mediaPath;
        mediaElement.dataset.likes = currentTrigger.dataset.likes;
        mediaElement.dataset.date = currentTrigger.dataset.date;
        mediaElement.dataset.title = currentTrigger.dataset.title;
        mediaElement.classList.add('lightbox-trigger');
        // Ajoute la vidéo ou l'image à la lightboxContent
        this.lightboxContent.appendChild(mediaElement);
        this.lightboxContent.appendChild(this.mediaNameContainer)

        if (mediaElement.tagName === 'VIDEO') {
            mediaElement.controls = true;
            mediaElement.autoplay = true;
            this.videoElement = mediaElement;
        }
        const mediaName = currentTrigger.dataset.title || '';
        this.mediaNameContainer.textContent = mediaName;
    }

    setupEventListeners() {
        this.btnClose.addEventListener('click', () => this.closeLightbox());
        this.btnNext.addEventListener('click', () => this.nextMedia());
        this.btnPrev.addEventListener('click', () => this.prevMedia());

        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevMedia();
                    break;
                case 'ArrowRight':
                    this.nextMedia();
                    break;
            }
        });
    }

    closeLightbox() {
        this.lightboxContainer.remove();
    }

    nextMedia() {
        this.currentIndex = (this.currentIndex + 1) % this.mediaTriggers.length;
        this.showMedia();
    }

    prevMedia() {
        this.currentIndex = (this.currentIndex - 1 + this.mediaTriggers.length) % this.mediaTriggers.length;
        this.showMedia();
    }
}

Lightbox.init();

export { Lightbox };