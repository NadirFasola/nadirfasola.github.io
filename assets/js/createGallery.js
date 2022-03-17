let modalContainer = document.querySelector(".modal-container");
let pictureCaptionWrapper = document.querySelector(".picture-caption-wrapper");
let modalImage = document.querySelector(".modal");
let modalCaption = document.querySelector(".caption-modal");
let modalClose = document.getElementById("modal-close-btn");

let galleryItems = document.querySelectorAll(".gallery-item");

const openModal = (e) => {
  console.log(
    e.target.parentElement.parentElement.getAttribute("data-fullSizeJpg")
  );
  modalImage.innerHTML = `<source class="modal-webp" srcset=${e.target.parentElement.parentElement.getAttribute(
    "data-fullSizeWebp"
  )} type="image/webp" /><img src=${e.target.parentElement.parentElement.getAttribute(
    "data-fullSizeJpg"
  )} alt=${e.target.alt} />`;
  modalCaption.innerHTML = `<p>${e.target.parentElement.parentElement.getAttribute(
    "data-caption"
  )}</p>`;
  modalContainer.style.display = "block";
  modalImage.getElementsByTagName("img")[0].onload = () => {
    pictureCaptionWrapper.style.transform = `translateY(${
      (window.innerHeight - pictureCaptionWrapper.offsetHeight) / 2
    }px)`;
  };
};

const lazyLoad = (pic) => {
  const img = pic.querySelector("img");
  const source = pic.querySelector("source");

  source.srcset = source.getAttribute("data-srcset");
  source.removeAttribute("data-srcset");
  img.src = img.getAttribute("data-src");
  img.removeAttribute("data-src");

  img.classList.remove("placeholder");
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

const observerConfig = {
  root: null,
  rootMargin: "600px",
};

const imgObserver = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      lazyLoad(entry.target);
      self.unobserve(entry.target);
    }
  });
}, observerConfig);

document.querySelectorAll(".lazy-picture").forEach((pic) => {
  imgObserver.observe(pic);
});
