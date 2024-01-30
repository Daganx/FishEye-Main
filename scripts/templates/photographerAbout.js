class PhotographerAbout {
    static displayPhotographerInfo(jsonData, targetPhotographerId) {
        const photographer = jsonData.photographers.find(photographer => photographer.id === parseInt(targetPhotographerId));

        if (photographer) {
            const photographHeader = document.querySelector('.photograph-header');
            
            const infoContainer = document.createElement('section');
            infoContainer.classList.add('photographer-info');

            const nameElement = document.createElement('h1');
            nameElement.textContent = photographer.name;
            nameElement.setAttribute("tabIndex", '0');
            nameElement.setAttribute("aria-label", `Nom du photographe : ${photographer.name}`);

            const placeElement = document.createElement('p');
            placeElement.textContent = `${photographer.city}, ${photographer.country}`;

            const taglineElement = document.createElement('p');
            taglineElement.textContent = photographer.tagline;

            const photoContainer = document.createElement('section');
            photoContainer.classList.add('photographer-photo');

            const portraitElement = document.createElement('img');
            portraitElement.src = `assets/photographers/${photographer.portrait}`;
            portraitElement.alt = `${photographer.name}'s portrait`;
            portraitElement.classList.add('photographer-portrait');

            infoContainer.appendChild(nameElement);
            infoContainer.appendChild(placeElement);
            infoContainer.appendChild(taglineElement);

            photoContainer.appendChild(portraitElement);

            const buttonContainer = document.createElement('section');
            buttonContainer.classList.add('button-container');

            const contactButton = document.createElement('button');
            contactButton.textContent = 'Contactez-moi';
            contactButton.id = 'open-modal';
            contactButton.classList.add('contact_button');
            contactButton.setAttribute("aria-label", "Contactez-moi");
            contactButton.setAttribute("tabindex", "0")
            contactButton.addEventListener('click', () => {
                const modal = document.getElementById("contact_modal");
                modal.style.display = "flex";
            });
            
            buttonContainer.appendChild(contactButton);
            photographHeader.appendChild(infoContainer);
            photographHeader.appendChild(buttonContainer);
            photographHeader.appendChild(photoContainer);
            
            const modalBtnClose = document.getElementById('close-modal');
            modalBtnClose.addEventListener("click", () => {
                const modal = document.getElementById('contact_modal');
                modal.style.display = "none";
            });
        }
    }
}

export { PhotographerAbout };