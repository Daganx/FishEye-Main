class TemplateUserCard {
    static getUserCardDOM(photographer) {
        const photographerSection = document.querySelector('.photographer_section');
        
        const li = document.createElement('li');
        li.setAttribute("role", 'listitem');

        const img = document.createElement('img');
        img.setAttribute("tabIndex", '0');
        img.setAttribute("aria-label", `Photo de ${photographer.name}`);
        img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
        img.setAttribute("alt",`${photographer.name}`);
        img.addEventListener('click', () => {
            window.location.href = `./photographer.html?id=${photographer.id}`;
        });

        img.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                window.location.href = `/photographer.html?id=${photographer.id}`;
            }
        });

        const h2 = document.createElement('h2');
        h2.textContent = photographer.name;
        h2.setAttribute("aria-label",`${photographer.name}`);
        h2.setAttribute("tabIndex", "0")
        h2.addEventListener('click', () => {
            window.location.href = `/photographer.html?id=${photographer.id}`;
        });

        h2.addEventListener('keydown', (event) =>{
            if (event.key === 'Enter') {
                window.location.href = `/photographer.html?id=${photographer.id}`;
            }
        })

        const cityElement = document.createElement('p');
        cityElement.textContent = `${photographer.city}, ${photographer.country}`;
        cityElement.setAttribute("aria-label", `Lieu : ${photographer.city}, ${photographer.country}`);
        cityElement.setAttribute("tabIndex", "0")

        const taglineElement = document.createElement('p');
        taglineElement.textContent = photographer.tagline;
        taglineElement.setAttribute("aria-label", `Tagline : ${photographer.tagline}`);
        taglineElement.setAttribute("tabIndex", "0");

        const priceElement = document.createElement('p');
        priceElement.textContent = `${photographer.price}€/jour`;
        priceElement.setAttribute("aria-label", `Prix : ${photographer.price}€/Jour`);
        priceElement.setAttribute("tabIndex", "0");

        li.appendChild(img);
        li.appendChild(h2);
        li.appendChild(cityElement);
        li.appendChild(taglineElement);
        li.appendChild(priceElement);

        photographerSection.appendChild(li);

        return photographerSection;
    }
}

export {TemplateUserCard};