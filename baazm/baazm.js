(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: scrolled state + mobile menu ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("primary-nav");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) setMenu(false);
  });

  /* ---------- Reveal on scroll (content is visible without JS) ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function showAll() {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
    // Safety net: never leave content hidden if observation misfires.
    window.setTimeout(showAll, 4000);
  }

  /* ---------- Cursor spotlight on cards ---------- */
  if (!reduceMotion) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- Live stats ---------- */
  var yearsEl = document.getElementById("years");
  if (yearsEl) {
    var start = new Date(2019, 7, 16);
    var now = new Date();
    var years = now.getFullYear() - start.getFullYear();
    if (now.getMonth() < start.getMonth() ||
        (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())) {
      years -= 1;
    }
    yearsEl.textContent = years + "+";
  }
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Contact form (Web3Forms, no backend) ---------- */
  var form = document.getElementById("baazm-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var submitBtn = form.querySelector("button[type=submit]");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.classList.toggle("is-ok", kind === "ok");
    statusEl.classList.toggle("is-err", kind === "err");
  }

  function validate() {
    var ok = true;
    ["f-name", "f-email", "f-message"].forEach(function (id) {
      var el = document.getElementById(id);
      var value = el.value.trim();
      var valid = id === "f-email" ? EMAIL_RE.test(value) : value.length > 0;
      el.classList.toggle("is-invalid", !valid);
      el.setAttribute("aria-invalid", String(!valid));
      if (!valid && ok) { el.focus(); }
      ok = ok && valid;
    });
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setStatus("", "");
    if (!validate()) {
      setStatus("Please fill in your name, a valid email and a short message.", "err");
      return;
    }

    var name = document.getElementById("f-name").value.trim();
    var original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    var data = new FormData(form);
    data.append("subject", "New Baazm inquiry from " + name);

    var controller = "AbortController" in window ? new AbortController() : null;
    var timer = controller ? window.setTimeout(function () { controller.abort(); }, 15000) : null;

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (!json.success) throw new Error(json.message || "Submission failed");
        form.reset();
        setStatus("Message sent — thank you. We'll be in touch soon.", "ok");
      })
      .catch(function () {
        setStatus("Couldn't send that just now. Please email hussainazmat.rnd@gmail.com directly.", "err");
      })
      .then(function () {
        if (timer) window.clearTimeout(timer);
        submitBtn.disabled = false;
        submitBtn.innerHTML = original;
      });
  });

  form.addEventListener("input", function (e) {
    if (e.target.classList.contains("is-invalid")) {
      e.target.classList.remove("is-invalid");
      e.target.removeAttribute("aria-invalid");
    }
  });
})();
