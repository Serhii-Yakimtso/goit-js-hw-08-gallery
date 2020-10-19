import galleryItems from "./gallery-items.js";

console.log("Исходные данные галлереи");
console.log(galleryItems);

const galleryList = document.querySelector(".js-gallery");
console.log(galleryList);

console.log("Создаем элементы списка");
const galleryListItems = createGalleryListItems(galleryItems);
console.log(galleryListItems);

console.log("Влаживаем элементы списка в разметку");
galleryList.insertAdjacentHTML("beforeend", galleryListItems);

function createGalleryListItems(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
          alt ="${description}"
    />
  </a>
</li>
`;
    })
    .join("");
}
