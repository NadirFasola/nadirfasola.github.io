let modalContainer = document.querySelector(".modal-container");
let pictureCaptionWrapper = document.querySelector(".picture-caption-wrapper");
let modalImage = document.querySelector(".modal");
let modalCaption = document.querySelector(".caption-modal");
let modalClose = document.getElementById("modal-close-btn");

let galleryItems = document.querySelectorAll(".gallery-item");

const openModal = (e) => {
  console.log(e.target.parentElement.getAttribute("data-fullSizeJpg"));
  modalImage.innerHTML = `<source class="modal-webp" srcset=${e.target.parentElement.getAttribute(
    "data-fullSizeWebp"
  )} /><source class="modal-jpg" srcset=${e.target.parentElement.getAttribute(
    "data-fullSizeJpg"
  )} /><img src=${e.target.parentElement.getAttribute(
    "data-fullSizeJpg"
  )} alt=${e.target.alt} />`;
  modalCaption.innerHTML = `<p>${e.target.parentElement.getAttribute(
    "data-caption"
  )}</p>`;
  modalContainer.style.display = "block";
  modalImage.getElementsByTagName("img")[0].onload = () => {
    pictureCaptionWrapper.style.transform = `translateY(${
      (window.innerHeight - pictureCaptionWrapper.offsetHeight) / 2
    }px)`;
  };
};

galleryItems.forEach((item) => {
  item.addEventListener("click", openModal);
});

modalClose.onclick = () => {
  modalImage.innerHTML = "";
  modalCaption.innerHTML = "";
  modalContainer.style.display = "none";
};

window.onresize = () => {
  pictureCaptionWrapper.style.transform = `translateY(${
    (window.innerHeight - pictureCaptionWrapper.offsetHeight) / 2
  }px)`;
};
