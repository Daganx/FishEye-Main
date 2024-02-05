// Fichier qui éxecute nos functions pour la page Photoprapher.html
import { displayName } from "../utils/contactForm.js";
import { MediaSorting } from "../templates/sortingFunctions.js";
import { TemplateMedias, } from "../templates/templateMedias.js";
import { PhotographerAbout } from "../templates/photographerAbout.js";
import { PhotographerStats } from "../templates/photographerStats.js";
import { Lightbox } from "../templates/lightbox.js";
import { Api } from "../api/api.js";
// Function qui affiche l'ensemble des informations de notre photographe ainsi que ses médias
async function displayPhotographerPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const targetPhotographerId = urlParams.get("id");
  try {
    const jsonData = await Api.fetchData();
    // Affichage dans le "Header"
    PhotographerAbout.displayPhotographerInfo(jsonData, targetPhotographerId);
    // Affichage sur la partie Média
    TemplateMedias.displayMedias(jsonData, targetPhotographerId);
    // Appel de la lightbox
    Lightbox.init();
    // Sections likes total & prix
    PhotographerStats.displayPhotographerStats(jsonData, targetPhotographerId);
    // Affichage nom du photographe Modal Contact
    displayName(jsonData, targetPhotographerId);
    // Function du TRI des médias
    MediaSorting.initSortingButtons();
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier JSON:", error);
  }
}
// Appel de notre fonction
displayPhotographerPage();
