(function () {
  "use strict";

  // MENU
  document.querySelectorAll(".navbar-collapse a").forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse) {
        navbarCollapse.classList.remove("show");
      }
    });
  });

  // CUSTOM LINK
  document.querySelectorAll(".smoothscroll").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const el = link.getAttribute("href");
      const elWrapped = document.querySelector(el);
      const headerHeight = document.querySelector(".navbar")?.offsetHeight || 0;

      if (elWrapped) {
        scrollToDiv(elWrapped, headerHeight);
      }
    });
  });

  function scrollToDiv(element, navHeight) {
    const offsetTop = element.offsetTop;
    const totalScroll = offsetTop - navHeight;

    window.scrollTo({
      top: totalScroll,
      behavior: "smooth",
    });
  }
})();
