class TemplateUserCard {
    static getUserCardDOM(photographer) {
        const photographerSection = document.querySelector('.photographer_section');
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
        img.addEventListener('click', () => {
            window.location.href = `/photographer.html?id=${photographer.id}`;
        });

        const h2 = document.createElement('h2');
        h2.textContent = photographer.name;

        const cityElement = document.createElement('p');
        cityElement.textContent = `${photographer.city} ${photographer.country}`;

        const taglineElement = document.createElement('p');
        taglineElement.textContent = photographer.tagline;

        const priceElement = document.createElement('p');
        priceElement.textContent = `${photographer.price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(cityElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        photographerSection.appendChild(article);

        return photographerSection;
    }
}

export {TemplateUserCard};