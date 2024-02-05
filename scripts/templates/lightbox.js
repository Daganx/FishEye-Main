// Création de la class Lightbox qui crée une nouvelle instance sur l'index de nos médias
class Lightbox {
  static init() {
    const mediaTriggers = Array.from(
      document.querySelectorAll(".lightbox-trigger")
    );
    mediaTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        const mediaIndex = mediaTriggers.indexOf(event.currentTarget);
        new Lightbox(mediaTriggers, mediaIndex);
      });
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const mediaIndex = mediaTriggers.indexOf(event.currentTarget);
          new Lightbox(mediaTriggers, mediaIndex);
        }
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
  // Construction de nos éléments qui composent la lightbox
  buildLightbox() {
    this.lightboxContainer = document.createElement("section");
    this.lightboxContainer.classList.add("lightbox-container");
    this.lightboxContainer.setAttribute("aria-label", "image closeup view");
    this.lightboxContainer.setAttribute("role", "dialog");
    document.body.appendChild(this.lightboxContainer);

    this.lightboxContent = document.createElement("section");
    this.lightboxContent.classList.add("lightbox-content");
    this.lightboxContainer.appendChild(this.lightboxContent);

    this.btnClose = document.createElement("i");
    this.btnClose.classList.add("lightbox-close");
    this.btnClose.innerHTML = '<i class="fa-solid fa-times"></i>';
    this.btnClose.setAttribute("aria-label", "close dialog");
    this.btnClose.setAttribute("role", "button");
    this.lightboxContainer.appendChild(this.btnClose);

    this.btnNext = document.createElement("i");
    this.btnNext.classList.add("lightbox-next");
    this.btnNext.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    this.btnNext.setAttribute("aria-label", "Bouton suivant");
    this.btnNext.setAttribute("role", "link");
    this.lightboxContainer.appendChild(this.btnNext);

    this.btnPrev = document.createElement("i");
    this.btnPrev.classList.add("lightbox-prev");
    this.btnPrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    this.btnPrev.setAttribute("aria-label", "Bouton précédent");
    this.btnPrev.setAttribute("role", "link");
    this.lightboxContainer.appendChild(this.btnPrev);

    this.videoElement = document.createElement("video");
    this.videoElement.setAttribute("controls", "true");
    this.videoElement.setAttribute("autoplay", "true");
    this.lightboxContent.appendChild(this.videoElement);

    this.mediaNameContainer = document.createElement("p");
    this.mediaNameContainer.classList.add("media-name-container");
  }
  // Function pour l'affichage de nos médias en function de l'index et du type de contenu
  showMedia() {
    // Récupère l'index
    const currentTrigger = this.mediaTriggers[this.currentIndex];
    this.lightboxContent.innerHTML = "";
    // Crée une nouvelle vidéo ou une nouvelle image
    const mediaElement =
      currentTrigger.tagName === "VIDEO"
        ? document.createElement("video")
        : document.createElement("img");
    // Utilise directement le chemin d'accès existant si la balise vidéo existe
    const mediaPath =
      currentTrigger.tagName === "VIDEO"
        ? currentTrigger.dataset.src || currentTrigger.src
        : currentTrigger.src;
    // Ajout des dataset
    mediaElement.src = mediaPath;
    mediaElement.dataset.likes = currentTrigger.dataset.likes;
    mediaElement.dataset.date = currentTrigger.dataset.date;
    mediaElement.dataset.title = currentTrigger.dataset.title;
    mediaElement.classList.add("lightbox-trigger");
    mediaElement.setAttribute("aria-label", `${mediaElement.dataset.title}`);

    this.lightboxContent.appendChild(mediaElement);
    this.lightboxContent.appendChild(this.mediaNameContainer);
    // Condition si élément = vidéo
    if (mediaElement.tagName === "VIDEO") {
      mediaElement.controls = true;
      mediaElement.autoplay = true;
      this.videoElement = mediaElement;
    }
    const mediaName = currentTrigger.dataset.title || "";
    this.mediaNameContainer.textContent = mediaName;
  }
  // Mise en place de nos écoutes pour la navigation
  setupEventListeners() {
    this.btnClose.addEventListener("click", () => this.closeLightbox());
    this.btnNext.addEventListener("click", () => this.nextMedia());
    this.btnPrev.addEventListener("click", () => this.prevMedia());

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "Escape":
          this.closeLightbox();
          break;
        case "ArrowLeft":
          this.prevMedia();
          break;
        case "ArrowRight":
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
    this.currentIndex =
      (this.currentIndex - 1 + this.mediaTriggers.length) %
      this.mediaTriggers.length;
    this.showMedia();
  }
}

Lightbox.init();

export { Lightbox };
