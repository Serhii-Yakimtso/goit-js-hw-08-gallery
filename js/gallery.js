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
// const isActiveModal = modal.classList.contains("is-open");

// Поиск блока отображения оригиналоного изображения в модальном окне
const imageView = document.querySelector(".lightbox__image");

// Поиск кнопки закрытия модального окна в разметке
const closeBtn = document.querySelector(".lightbox__button");
// console.log(closeBtn);

// Поиск оверлэя модального окна в разметке
const isOverlay = document.querySelector(".lightbox__overlay");

// Влаживаем элементы списка в разметку
galleryList.insertAdjacentHTML("beforeend", galleryListItems);

// Открываем модальное окно
galleryList.addEventListener("click", galleryImageClick);

// Закрываем модальное окно кликом на кнопку закрытия
closeBtn.addEventListener("click", closeModal);

// Закрываем модальное окно кликом на оверлэй
isOverlay.addEventListener("click", closeModalOverlay);

// Реагирование модального окна на управление с клавиатуры
document.addEventListener("keydown", pressKeyboard);

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
  const isActiveModal = modal.classList.contains("is-open");

  if (!isActiveModal) {
    return;
  }

  modal.classList.remove("is-open");

  clearingAtributesOfSelectedImage();
}

function clearingAtributesOfSelectedImage() {
  imageView.src = "";
  imageView.alt = "";
}

function closeModalOverlay() {
  if (!isOverlay) {
    return;
  }
  closeModal();
}

function pressKeyboard(evt) {
  const isActiveModal = modal.classList.contains("is-open");

  if (!isActiveModal) {
    return;
  }

  if (evt.code === "Escape") {
    closeModal();
  }
}
