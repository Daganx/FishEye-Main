import { TemplateMedias } from "../templates/templateMedias.js";
import { PhotographerAbout } from "../templates/photographerAbout.js";
import { PhotographerStats } from "../templates/photographerStats.js";
import { Lightbox } from "../templates/lightbox.js";
import { Api } from "../api/api.js";

async function displayPhotographerPage() {
    // Récupération de l'ID
    const urlParams = new URLSearchParams(window.location.search);
    const targetPhotographerId = urlParams.get('id');
    try {
        // Utilisez la classe Api pour récupérer les données JSON
        const jsonData = await Api.fetchData();
        // Affichage des informations du photographe
        PhotographerAbout.displayPhotographerInfo(jsonData, targetPhotographerId);
        // Affichage des médias
        TemplateMedias.displayMedias(jsonData, targetPhotographerId);
        // Initialisation LightBox
        Lightbox.init();
        // Affichage des statistiques du photographe
        PhotographerStats.displayPhotographerStats(jsonData, targetPhotographerId);
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier JSON:', error);
    }
}
// Appel de la fonction pour afficher la page du photographe
displayPhotographerPage();