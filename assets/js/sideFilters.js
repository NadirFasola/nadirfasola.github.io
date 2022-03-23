const openSideFilters = () => {
  document.querySelector(".sideFilters").style.width =
    "clamp(250px, 40%, 600px)";
  document.querySelector(".sideFilters").style.opacity = ".9";
  document.querySelector(".portfolio-filters-hamburger-wrapper").style.opacity =
    "0";
};

const closeSideFilters = () => {
  document.querySelector(".sideFilters").style.width = "0";
  document.querySelector(".sideFilters").style.opacity = "0";
  document.querySelector(".portfolio-filters-hamburger-wrapper").style.opacity =
    "1";
};

let filters = [];
const selectFilter = (e) => {
  let fil = e.target.parentElement.getAttribute("filter");
  if (filters.includes(fil)) {
    filters = [];
  } else {
    filters = [];
    filters.push(fil);
  }
  document.querySelectorAll(".portfolio-filters-item").forEach((li) => {
    if (li.children[0] !== e.target) {
      li.children[0].classList.remove("selected");
    }
  });
  filters = filters.filter((el) => el != null);
  e.target.classList.toggle("selected");
};

const filterImages = () => {
  if (filters.length === 0) {
    let favsTitle = document.createElement("h1");
    let text = document.createTextNode(
      "Some of my favourite shots (in no particular order)"
    );
    favsTitle.classList.add("favsTitle");
    favsTitle.appendChild(text);
    document
      .querySelector(".gallery-container")
      .insertBefore(favsTitle, document.querySelector(".gallery"));
    document.querySelectorAll(".gallery-item").forEach((item) => {
      let dataFilters = item.getAttribute("data-filter").split(" ");
      const isContained = (x) => dataFilters.includes(x);
      if (!isContained("favs")) {
        item.classList.add("filtered");
      } else {
        item.classList.remove("filtered");
      }
    });
  } else {
    let favsTitle = document.querySelector(".favsTitle");
    if (favsTitle) {
      document.querySelector(".gallery-container").removeChild(favsTitle);
    }
    document.querySelectorAll(".gallery-item").forEach((item) => {
      let dataFilters = item.getAttribute("data-filter").split(" ");
      const isContained = (x) => dataFilters.includes(x);
      if (!filters.every(isContained)) {
        item.classList.add("filtered");
      } else {
        item.classList.remove("filtered");
      }
    });
  }
};

const filter = (e) => {
  selectFilter(e);
  filterImages();
};

document.querySelectorAll(".portfolio-filters-item").forEach((item) => {
  item.addEventListener("click", filter);
});

window.onload = () => {
  filterImages();
};
