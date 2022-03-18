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

// let filters = [];
// const selectFilter = (e) => {
//   let fil = e.target.parentElement.getAttribute("filter");
//   if (filters.includes(fil)) {
//     filters = filters.filter((el) => el != fil);
//   } else {
//     filters.push(fil);
//   }
//   filters = filters.filter((el) => el != null);
//   e.target.classList.toggle("selected");
// };

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
  e.target.classList.toggle("selected");
};

const filterImages = () => {
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
