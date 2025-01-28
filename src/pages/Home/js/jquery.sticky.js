// Sticky Plugin v1.0.3 converted to plain JavaScript
// Author: Anthony Garand
// Original improvements by German M. Bravo, Ruud Kamphuis, Leonardo C. Daronco

(function () {
  "use strict";

  const defaults = {
    topSpacing: 0,
    bottomSpacing: 0,
    className: "is-sticky",
    wrapperClassName: "sticky-wrapper",
    center: false,
    getWidthFrom: "",
    widthFromWrapper: true,
    responsiveWidth: false,
  };

  const sticked = [];
  let windowHeight = window.innerHeight;

  const scroller = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const dwh = documentHeight - windowHeight;
    const extra = scrollTop > dwh ? dwh - scrollTop : 0;

    sticked.forEach((s) => {
      const elementTop =
        s.stickyWrapper.getBoundingClientRect().top + scrollTop;
      const etse = elementTop - s.topSpacing - extra;

      // Update height in case of dynamic content
      s.stickyWrapper.style.height = `${s.stickyElement.offsetHeight}px`;

      if (scrollTop <= etse) {
        if (s.currentTop !== null) {
          Object.assign(s.stickyElement.style, {
            width: "",
            position: "",
            top: "",
          });
          s.stickyWrapper.classList.remove(s.className);
          s.currentTop = null;
        }
      } else {
        let newTop =
          documentHeight -
          s.stickyElement.offsetHeight -
          s.topSpacing -
          s.bottomSpacing -
          scrollTop -
          extra;
        if (newTop < 0) {
          newTop += s.topSpacing;
        } else {
          newTop = s.topSpacing;
        }
        if (s.currentTop !== newTop) {
          let newWidth = null;
          if (s.getWidthFrom) {
            newWidth =
              document.querySelector(s.getWidthFrom)?.offsetWidth || null;
          } else if (s.widthFromWrapper) {
            newWidth = s.stickyWrapper.offsetWidth;
          }
          if (newWidth === null) {
            newWidth = s.stickyElement.offsetWidth;
          }
          Object.assign(s.stickyElement.style, {
            width: `${newWidth}px`,
            position: "fixed",
            top: `${newTop}px`,
          });
          s.stickyWrapper.classList.add(s.className);
          s.currentTop = newTop;
        }
      }
    });
  };

  const resizer = () => {
    windowHeight = window.innerHeight;
    sticked.forEach((s) => {
      let newWidth = null;
      if (s.getWidthFrom && s.responsiveWidth) {
        newWidth = document.querySelector(s.getWidthFrom)?.offsetWidth || null;
      } else if (s.widthFromWrapper) {
        newWidth = s.stickyWrapper.offsetWidth;
      }
      if (newWidth !== null) {
        s.stickyElement.style.width = `${newWidth}px`;
      }
    });
  };

  const initSticky = (elements, options = {}) => {
    const settings = { ...defaults, ...options };
    elements.forEach((el) => {
      const stickyElement = el;
      const stickyId = stickyElement.id;
      const stickyHeight = stickyElement.offsetHeight;
      const wrapperId = stickyId
        ? `${stickyId}-${defaults.wrapperClassName}`
        : defaults.wrapperClassName;
      const wrapper = document.createElement("div");
      wrapper.id = wrapperId;
      wrapper.className = settings.wrapperClassName;

      stickyElement.parentNode.insertBefore(wrapper, stickyElement);
      wrapper.appendChild(stickyElement);

      if (settings.center) {
        Object.assign(wrapper.style, {
          width: `${stickyElement.offsetWidth}px`,
          marginLeft: "auto",
          marginRight: "auto",
        });
      }

      if (getComputedStyle(stickyElement).float === "right") {
        stickyElement.style.float = "none";
        wrapper.style.float = "right";
      }

      wrapper.style.height = `${stickyHeight}px`;

      sticked.push({
        stickyElement,
        stickyWrapper: wrapper,
        currentTop: null,
        ...settings,
      });
    });

    scroller();
  };

  window.addEventListener("scroll", scroller);
  window.addEventListener("resize", resizer);

  // Initialize sticky elements
  document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      initSticky([navbar], { topSpacing: 0 });
    }
  });
})();
