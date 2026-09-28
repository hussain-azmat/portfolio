/* Drives two things on every project page, from the single project list
   in projects-data.js:
   1. The "All Projects" dropdown menu in the top nav.
   2. The Previous/Next links in the footer nav (wraps around at the ends).
   This keeps every page's navigation in sync automatically — no more
   per-page hand-edited hrefs going stale or duplicating. */
(function () {
  const list = window.PORTFOLIO_PROJECTS || [];
  if (!list.length) return;

  const currentSlug = location.pathname.split("/").pop().replace(/\.html$/, "");
  const idx = list.findIndex((p) => p.slug === currentSlug);

  /* ---- "All Projects" dropdown ---- */
  const panel = document.getElementById("projects-menu-panel");
  if (panel) {
    panel.innerHTML = list
      .map((p) => {
        const isCurrent = p.slug === currentSlug;
        return `<a href="${p.slug}.html"${isCurrent ? ' class="current" aria-current="page"' : ""}>${p.title}</a>`;
      })
      .join("");
  }

  const menu = document.getElementById("projects-menu");
  const trigger = document.getElementById("projects-menu-trigger");
  if (menu && trigger && panel) {
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "projects-menu-panel");

    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", String(open));
    };

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!menu.classList.contains("open"));
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        setOpen(false);
        trigger.focus();
      }
    });
  }

  /* ---- Previous / Next footer nav (wraps around) ---- */
  if (idx !== -1) {
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];

    const prevLink = document.getElementById("footer-prev");
    if (prevLink) {
      prevLink.href = `${prev.slug}.html`;
      const strong = prevLink.querySelector("strong");
      if (strong) strong.textContent = prev.title;
    }

    const nextLink = document.getElementById("footer-next");
    if (nextLink) {
      nextLink.href = `${next.slug}.html`;
      const strong = nextLink.querySelector("strong");
      if (strong) strong.textContent = next.title;
    }
  }
})();
