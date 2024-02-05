class MediaSorting {
  static sortMedia(mediaContainerId, sortBy) {
    const mediaContainer = document.getElementById(mediaContainerId);
    const mediaList = Array.from(mediaContainer.children);

    switch (sortBy) {
      case "date":
        mediaList.sort((a, b) => {
          const dateA = new Date(a.querySelector("img, video").dataset.date);
          const dateB = new Date(b.querySelector("img, video").dataset.date);
          return dateB - dateA;
        });
        break;
      case "likes":
        mediaList.sort((articleA, articleB) => {
          const likeA = parseInt(
            articleA.querySelector("img, video").dataset.likes
          );
          const likeB = parseInt(
            articleB.querySelector("img, video").dataset.likes
          );
          return likeB - likeA;
        });
        break;
      case "title":
        mediaList.sort((articleA, articleB) => {
          const titleA = articleA
            .querySelector("img, video")
            .dataset.title.toUpperCase();
          const titleB = articleB
            .querySelector("img, video")
            .dataset.title.toUpperCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        break;
    }

    mediaContainer.innerHTML = "";
    mediaList.forEach((figure) => {
      mediaContainer.appendChild(figure);
    });
  }
// Function du menu tri
  static initSortingButtons() {
    const sortingButtons = document.getElementById("sorting-buttons");
    const sortingOptions = document.getElementById("sorting-options");
    const showSortingOptionsButton = document.getElementById("show-sorting-options");

    let lastSelectedButton = null;

    sortingButtons.addEventListener("click", (event) => {
      const selectedButtonId = event.target.id;

      if (selectedButtonId === "show-sorting-options") {
        sortingOptions.style.display =
          sortingOptions.style.display === "block" ? "none" : "block";
      } else {
        sortingOptions.style.display = "none";

        if (selectedButtonId !== "sorting-buttons") {
          // Afficher à nouveau le dernier bouton sélectionné
          if (lastSelectedButton !== null) {
            lastSelectedButton.style.display = "block";
          }
          showSortingOptionsButton.innerHTML = `${event.target.textContent}`;
          // Mise à jour des boutons disponibles
          const availableButtons = Array.from(sortingOptions.children).filter(
            (button) => button.tagName === "BUTTON"
          );
          const selectedButton = document.getElementById(selectedButtonId);
          availableButtons.splice(availableButtons.indexOf(selectedButton), 1);
          // Cacher le bouton sélectionné
          selectedButton.style.display = "none";
          // Garder une trace du dernier bouton sélectionné
          lastSelectedButton = selectedButton;
          switch (selectedButtonId) {
            case "sort-by-date":
              MediaSorting.sortMedia("media-container", "date");
              break;
            case "sort-by-likes":
              MediaSorting.sortMedia("media-container", "likes");
              break;
            case "sort-by-title":
              MediaSorting.sortMedia("media-container", "title");
              break;
            default:
              break;
          }
        }
      }
    })
  }
}

export { MediaSorting };