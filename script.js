(() => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("site-nav");
  const navLinks = menu.querySelectorAll(".nav-link");
  const desktop = window.matchMedia("(min-width: 992px)");

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  }

  // Toggle dropdown on hamburger click
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!isOpen());
  });

  // Close dropdown when a link is clicked
  menu.addEventListener("click", (e) => {
    if (e.target.closest(".nav-link") && isOpen()) {
      setOpen(false);
    }
  });

  // Close when clicking anywhere outside the navbar
  document.addEventListener("click", (e) => {
    if (isOpen() && !e.target.closest(".navbar")) {
      setOpen(false);
    }
  });

  // Close when pressing the Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Automatically close mobile menu if screen is resized to desktop
  desktop.addEventListener("change", (e) => {
    if (e.matches && isOpen()) {
      setOpen(false);
    }
  });

  // Highlight active section on scroll using IntersectionObserver
  const links = new Map([...navLinks].map((a) => [a.hash.slice(1), a]));
  const sections = document.querySelectorAll("main > section[id]");

  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a, id) => {
            if (id === entry.target.id) {
              a.setAttribute("aria-current", "location");
            } else {
              a.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
  }
})();
