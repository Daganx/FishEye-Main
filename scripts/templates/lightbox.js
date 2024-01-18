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
    
        this.btnClose = document.createElement('button');
        this.btnClose.classList.add('lightbox-close');
        this.btnClose.textContent = 'Fermer';
        this.lightboxContainer.appendChild(this.btnClose);
    
        this.btnNext = document.createElement('button');
        this.btnNext.classList.add('lightbox-next');
        this.btnNext.textContent = 'Suivant';
        this.lightboxContainer.appendChild(this.btnNext);
    
        this.btnPrev = document.createElement('button');
        this.btnPrev.classList.add('lightbox-prev');
        this.btnPrev.textContent = 'Précédent';
        this.lightboxContainer.appendChild(this.btnPrev);

        this.videoElement = document.querySelector('video');
        this.videoElement.setAttribute('controls', 'true');
        this.videoElement.setAttribute('autoplay', 'true'); // Ajoutez cette ligne pour activer les contrôles de la vidéo
        this.lightboxContent.appendChild(this.videoElement);
    
    }
    showMedia() {
        const currentTrigger = this.mediaTriggers[this.currentIndex];
        const mediaContainer = currentTrigger.cloneNode(true);
    
        const mediaElements = mediaContainer.querySelectorAll('img, video');
        mediaElements.forEach(media => {
            console.log('TagName:', media.tagName);
            if (media.tagName === 'IMG') {
                const photographerName = mediaContainer.dataset.photographer;
                console.log('Photographer Name:', photographerName);
                media.src = `assets/images/${photographerName}/${media.src}`;
            } else if (media.tagName === 'VIDEO') {
                console.log('Inside VIDEO condition');
                const photographerName = mediaContainer.dataset.photographer;
                console.log('Photographer Name:', photographerName);
                media.src = `assets/images/${photographerName}/${media.src}`;
                media.controls = true; // Ajoutez cette ligne pour activer les contrôles de la vidéo
                this.videoElement = media; // Stockez la référence à la balise vidéo
                console.log('Balise vidéo stockée :', this.videoElement);
            }
        });
    
        this.lightboxContent.innerHTML = '';
        this.lightboxContent.appendChild(mediaContainer);
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