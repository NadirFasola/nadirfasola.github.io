let modalContainer = document.querySelector(".modal-container");
let pictureCaptionWrapper = document.querySelector(".picture-caption-wrapper");
let modalImage = document.querySelector(".modal");
let modalCaption = document.querySelector(".caption-modal");
let modalClose = document.getElementById("modal-close-btn");

let galleryItems = document.querySelectorAll(".gallery-item");

const openModal = (e) => {
  let file = e.target.src.split("/");
  let filename = file.pop().split(".")[0];
  let baseFolder = file.pop();
  console.log(file, filename, baseFolder);
  modalImage.innerHTML = `<source class="modal-webp" srcset="../assets/img/gallery/webp/fullSize/${baseFolder}/${filename}.webp" /><source class="modal-jpg" srcset="../assets/img/gallery/jpg/fullSize/${baseFolder}/${filename}.jpg" /><img src="../assets/img/gallery/jpg/fullSize/${baseFolder}/${filename}.jpg" alt=${e.target.alt} />`;
  modalCaption.innerHTML = `<p>${e.target.alt}</p>`;
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
