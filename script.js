const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (!prefersReducedMotion.matches) {
  document.documentElement.classList.add("js");

  const revealTargets = document.querySelectorAll([
    ".hero-copy",
    ".hero-panel",
    ".section:not(.hero) .section-heading",
    ".section:not(.hero) .about-layout",
    ".section:not(.hero) .photo-grid",
    ".section:not(.hero) .service-grid",
    ".section:not(.hero) .ask-card",
    ".section:not(.hero) .price-layout",
    ".section:not(.hero) .steps-grid",
    ".section:not(.hero) .review-grid",
    ".section:not(.hero) .contact-panel",
  ].join(", "));

  revealTargets.forEach((element) => {
    element.classList.add("reveal-on-scroll");
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealTargets.forEach((element) => {
      const { top } = element.getBoundingClientRect();

      if (top < window.innerHeight * 0.92) {
        element.classList.add("is-visible");
        return;
      }

      revealObserver.observe(element);
    });
  }
}
