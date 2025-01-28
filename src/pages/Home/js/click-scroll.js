// click-scroll
// by Syamsul 'Isul' Arifin

const sectionArray = [1, 2, 3, 4, 5];
const navbarLinks = document.querySelectorAll(
  ".navbar-nav .nav-item .nav-link"
);
const clickScrolls = document.querySelectorAll(".click-scroll");

document.addEventListener("DOMContentLoaded", () => {
  navbarLinks.forEach((link) => link.classList.add("inactive"));
  if (navbarLinks[0]) {
    navbarLinks[0].classList.add("active");
    navbarLinks[0].classList.remove("inactive");
  }

  sectionArray.forEach((value, index) => {
    const section = document.getElementById(`section_${value}`);

    if (section) {
      // Scroll event
      document.addEventListener("scroll", () => {
        const offsetSection = section.offsetTop - 88;
        const docScroll = window.scrollY;
        const docScroll1 = docScroll + 1;

        if (docScroll1 >= offsetSection) {
          navbarLinks.forEach((link) => {
            link.classList.remove("active");
            link.classList.add("inactive");
          });
          if (navbarLinks[index]) {
            navbarLinks[index].classList.add("active");
            navbarLinks[index].classList.remove("inactive");
          }
        }
      });

      // Click event
      if (clickScrolls[index]) {
        clickScrolls[index].addEventListener("click", (e) => {
          e.preventDefault();
          const offsetClick = section.offsetTop - 88;
          window.scrollTo({
            top: offsetClick,
            behavior: "smooth",
          });
        });
      }
    }
  });
});
