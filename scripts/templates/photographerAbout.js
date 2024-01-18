class PhotographerAbout {
    static displayPhotographerInfo(jsonData, targetPhotographerId) {
        const photographer = jsonData.photographers.find(photographer => photographer.id === parseInt(targetPhotographerId));

        if (photographer) {
            const photographHeader = document.querySelector('.photograph-header');

            const nameElement = document.createElement('h2');
            nameElement.textContent = photographer.name;
            
            const taglineElement = document.createElement('p');
            taglineElement.textContent = photographer.tagline;
            
            const placeElement = document.createElement('p');
            placeElement.textContent = `${photographer.city} ${photographer.country}`;
            
            const portraitElement = document.createElement('img');
            portraitElement.src = `assets/photographers/${photographer.portrait}`;
            portraitElement.alt = `${photographer.name}'s portrait`;
            portraitElement.classList.add('photographer-portrait');
    
            photographHeader.appendChild(nameElement);
            photographHeader.appendChild(placeElement);
            photographHeader.appendChild(taglineElement);
            photographHeader.appendChild(portraitElement)
        }
    }
}

export { PhotographerAbout };