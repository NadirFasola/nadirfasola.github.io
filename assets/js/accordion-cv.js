let arrowsDown = document.querySelectorAll(".cv-icon-openclose");

const handleClick = (e) => {
  e.target.parentElement.classList.toggle("rotated");
  let section = e.target.parentElement.nextElementSibling;
  if (section.style.maxHeight === "0px") {
    // section.style.maxHeight = null;
    section.style.maxHeight = section.scrollHeight + "px";
  } else {
    // section.style.maxHeight = section.scrollHeight + "px";
    section.style.maxHeight = "0";
  }
};

arrowsDown.forEach((item) => {
  item.addEventListener("click", handleClick);
  item.nextElementSibling.style.maxHeight =
    item.nextElementSibling.scrollHeight + "px";
});
