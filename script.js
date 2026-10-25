//  1. NAVBAR — Toggle + Active Section Scroll Spy

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

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!isOpen());
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest(".nav-link") && isOpen()) setOpen(false);
  });
  document.addEventListener("click", (e) => {
    if (isOpen() && !e.target.closest(".navbar")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });
  desktop.addEventListener("change", (e) => {
    if (e.matches && isOpen()) setOpen(false);
  });

  const linkMap = new Map([...navLinks].map((a) => [a.hash.slice(1), a]));
  const sections = document.querySelectorAll("main > section[id]");

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          linkMap.forEach((a, id) => {
            if (id === entry.target.id)
              a.setAttribute("aria-current", "location");
            else a.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => spy.observe(s));
  }
})();

/* ============================================================
   2. CONTACT FORM — Async Submit
   ============================================================ */
(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector(".form__status");

  function setStatus(msg, state = "") {
    status.textContent = msg;
    status.dataset.state = state;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submit.disabled = true;
    setStatus("Sending…");
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus(
        "Thanks, your message was sent. I'll get back to you soon.",
        "success",
      );
    } catch {
      setStatus(
        "Something went wrong. Please email me directly instead.",
        "error",
      );
    } finally {
      submit.disabled = false;
    }
  });
})();

// Animations

(() => {
  /* Bail immediately for reduced-motion users */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function onRevealEnd(el) {
    el.addEventListener(
      "animationend",
      () => {
        el.removeAttribute("data-anim");
        el.style.removeProperty("--stagger");
        /* Ensure visible in case animation was interrupted */
        el.style.opacity = "1";
      },
      { once: true },
    );
  }

  function onChipRevealEnd(chip) {
    chip.addEventListener(
      "animationend",
      () => {
        chip.removeAttribute("data-anim-chip");
        chip.style.removeProperty("--chip-delay");
        chip.style.opacity = "1";
      },
      { once: true },
    );
  }

  /* ── Tag helper ── */
  function tag(el, type = "fadeUp", delaySec = 0) {
    el.dataset.anim = type;
    if (delaySec > 0)
      el.style.setProperty("--stagger", `${delaySec.toFixed(2)}s`);
    onRevealEnd(el);
  }

  /* ── 1. Section headers ── */
  document
    .querySelectorAll(".section-title, .section-title--sm")
    .forEach((el) => tag(el, "fadeUp"));
  document
    .querySelectorAll(".section-lead, .section-lead--sm")
    .forEach((el) => tag(el, "fadeUp", 0.1));

  /* ── 2. Cards — staggered scaleUp (About, Skills, Education) ── */
  document.querySelectorAll(".card-grid > .card").forEach((card, i) => {
    tag(card, "scaleUp", i * 0.08);
  });

  /* ── 3. Cert grid */
  document.querySelectorAll(".cert-grid > .card").forEach((card, i) => {
    tag(card, "scaleUp", i * 0.04);
  });

  //  ── 4. Chips
  document.querySelectorAll(".card").forEach((card) => {
    card.querySelectorAll(".chip").forEach((chip, i) => {
      chip.dataset.animChip = "";
      chip.style.setProperty("--chip-delay", `${i * 0.05}s`);
      onChipRevealEnd(chip);
    });
  });

  /* ── 5. Work list items — slideRight ── */
  document.querySelectorAll(".work-item").forEach((item, i) => {
    tag(item, "slideRight", i * 0.06);
  });

  /* ── 6. Contact form fields — fadeUp stagger ── */
  document.querySelectorAll(".form__field").forEach((el, i) => {
    tag(el, "fadeUp", i * 0.07);
  });
  const formBtn = document.querySelector(".contact__form .btn[type='submit']");
  if (formBtn) tag(formBtn, "fadeUp", 0.35);

  /* ── 7. Contact info block ── */
  document
    .querySelectorAll(".contact__info .section-header")
    .forEach((el) => tag(el, "fadeUp", 0));
  document
    .querySelectorAll(".contact__line")
    .forEach((el, i) => tag(el, "fadeUp", 0.1 + i * 0.06));
  const contactSocial = document.querySelector(".contact__info .social");
  if (contactSocial) tag(contactSocial, "fadeUp", 0.28);
  const contactCvLink = document.querySelector(".contact .link");
  if (contactCvLink) tag(contactCvLink, "fadeUp", 0.34);

  /* ── 8. Footer ── */
  document.querySelectorAll(".footer__inner > *").forEach((el, i) => {
    tag(el, "fadeUp", i * 0.08);
  });

  /* ── 9. Additional Work header ── */
  document
    .querySelectorAll(".additional .section-header")
    .forEach((el) => tag(el, "fadeUp"));

  /* ── IntersectionObserver — fires .is-visible once per element ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.07 },
  );

  document
    .querySelectorAll("[data-anim]")
    .forEach((el) => observer.observe(el));
  document
    .querySelectorAll("[data-anim-chip]")
    .forEach((el) => observer.observe(el));
})();

// Smooth wheel scrolling with Lenis. Touch devices keep their native scrolling, and
// Lenis turns itself off automatically for visitors who prefer reduced motion.
(() => {
  if (typeof Lenis === "undefined") return;

  new Lenis({
    autoRaf: true,
    lerp: 0.06,
    anchors: { offset: -109 },
  });
})();
