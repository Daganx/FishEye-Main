import { Api } from "../api/api.js";
import { TemplateUserCard } from "../templates/templateUserCard.js";
import { Photographer } from "../classes/photographer.js";

async function displayPhotographers() {
    try {
        const data = await Api.fetchData();
        const photographers = data.photographers.map(photographerData => new Photographer(photographerData));

        photographers.forEach(photographer => {
                TemplateUserCard.getUserCardDOM(photographer);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

displayPhotographers();