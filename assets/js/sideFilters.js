const openSideFilters = () => {
  document.querySelector(".sideFilters").style.width =
    "clamp(250px, 40%, 600px)";
  document.querySelector(".sideFilters").style.opacity = ".9";
  // document.querySelector(".header-portfolio").style.width =
  // "calc(100% - clamp(250px,30%,400px))";
  document.querySelector(".portfolio-filters-hamburger-wrapper").style.opacity =
    "0";
  // document.querySelector(".wrapper-portfolio").style.width =
  //   "calc(100% - clamp(250px,30%,400px))";
  // isotope.layout();
};

const closeSideFilters = () => {
  document.querySelector(".sideFilters").style.width = "0";
  document.querySelector(".sideFilters").style.opacity = "0";
  // document.querySelector(".header-portfolio").style.width = "100%";
  document.querySelector(".portfolio-filters-hamburger-wrapper").style.opacity =
    "1";
  // document.querySelector(".wrapper-portfolio").style.width = "100%";
  // isotope.layout();
};

let filters = [];
const selectFilter = (e) => {
  let fil = e.target.parentElement.getAttribute("filter");
  if (filters.includes(fil)) {
    filters = filters.filter((el) => el != fil);
  } else {
    filters.push(fil);
  }
  filters = filters.filter((el) => el != null);
  e.target.classList.toggle("selected");
};

const filterImages = () => {
  console.log(filters);
  if (!filters) {
    document.querySelectorAll(".gallery-item").classList.remove("filtered");
    return;
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
};

const filter = (e) => {
  selectFilter(e);
  filterImages();
};

document.querySelectorAll(".portfolio-filters-item").forEach((item) => {
  item.addEventListener("click", filter);
});
