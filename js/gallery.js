// Получаем исходные данные из файла "gallery-items.js"
import galleryItems from "./gallery-items.js";

// console.log("Исходные данные галлереи");
// console.log(galleryItems);

// Поиск списка галлереи в разметке
const galleryList = document.querySelector(".js-gallery");
// console.log(galleryList);

// Создаем элементы списка
const galleryListItems = createGalleryListItems(galleryItems);
// console.log(galleryListItems);

// Поиск модального окна в разметке
const modal = document.querySelector(".js-lightbox");
// console.log(modal);

// Поиск блока отображения оригиналоного изображения в модальном окне
const imageView = document.querySelector(".lightbox__image");

// Поиск кнопки закрытия модального окна в разметке
const closeBtn = document.querySelector(".lightbox__button");
// console.log(closeBtn);

// Влаживаем элементы списка в разметку
galleryList.insertAdjacentHTML("beforeend", galleryListItems);

// Открываем модальное окно
galleryList.addEventListener("click", galleryImageClick);

// Закрываем модальное окно
closeBtn.addEventListener("click", closeModal);

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

function galleryImageClick(evt) {
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  evt.preventDefault();

  openModal(evt);
}

function openModal(evt) {
  modal.classList.add("is-open");

  selectedImageView(evt);
}

function selectedImageView(evt) {
  const selectedImage = evt.target;
  // console.log(selectedImage);

  const hrefSelectedImage = selectedImage.dataset.source;
  // console.log(hrefSelectedImage);

  const altSelectedImage = selectedImage.alt;
  // console.log(altSelectedImage);

  imageView.src = hrefSelectedImage;
  imageView.alt = altSelectedImage;
}

function closeModal() {
  modal.classList.remove("is-open");

  clearingAtributesOfSelectedImage();
}

function clearingAtributesOfSelectedImage() {
  imageView.src = "";
  imageView.alt = "";
}
