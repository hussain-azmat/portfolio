/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".services__modal");
console.log("modalViews (all modals found):", modalViews); // CHECK 1

const modalBtns = document.querySelectorAll(".services__button");
console.log("modalBtns (all buttons found):", modalBtns); // CHECK 2

const modalClose = document.querySelectorAll(".services__modal-close");
console.log("modalClose (all close buttons found):", modalClose); // CHECK 3

let openModal = function (modalId) {
    console.log("Attempting to open modal with ID:", modalId); // CHECK 4
    const targetModal = document.querySelector(modalId);
    console.log("Target modal element found:", targetModal); // CHECK 5

    if (targetModal) {
        modalViews.forEach(mv => {
            mv.classList.remove("active-modal");
        });
        targetModal.classList.add("active-modal");
        document.body.classList.add('modal-open');
        console.log("Modal " + modalId + " opened and modal-open class added to body."); // CHECK 6
    } else {
        console.error("Error: Target modal not found for ID:", modalId + ". Check HTML ID and data-modal-target."); // ERROR CHECK
    }
};

let closeActiveModal = function () {
    console.log("Attempting to close active modal."); // CHECK 7
    const activeModal = document.querySelector('.services__modal.active-modal');
    if (activeModal) {
        activeModal.classList.remove('active-modal');
    }
    document.body.classList.remove('modal-open');
    console.log("Modal closed and modal-open class removed from body."); // CHECK 8
};

modalBtns.forEach((mb) => {
    mb.addEventListener("click", () => {
        const modalTargetId = mb.getAttribute('data-modal-target');
        console.log("Button clicked. data-modal-target found:", modalTargetId); // CHECK 9

        if (modalTargetId) {
            openModal(modalTargetId);
        } else {
            console.warn("Warning: Button clicked but has no 'data-modal-target' attribute.", mb); // WARNING CHECK
        }
    });
});

modalClose.forEach((mc) => {
    mc.addEventListener("click", () => {
        console.log("Close button clicked."); // CHECK 10
        closeActiveModal();
    });
});

/*=============== SERVICES MODAL ===============*/
// Get the modal
/*const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

  // When the user clicks on the button, open the modal
  let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});*/

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

const projectArticleMap = {
  "Indoor Asset Tracking": "projects/indoor-asset-tracking.html",
  "Driverless Car": "projects/driverless-car.html",
  "Jazari - The Robot": "projects/jazari-the-robot.html",
  "Weeding Robot": "projects/weeding-machine.html",
  "RVM": "projects/rvm.html",
  "Motion Display": "projects/kinetic-display.html",
  "Smart Energy Meter": "projects/energy-meter.html",
  "GPS-Denied Navigation": "projects/ms-thesis.html",
  "Leonardo General Purpose Board": "projects/leonardo-board.html",
  "LoRa SOS Alarm System": "projects/sos-emergency-alarm.html",
  "Pest Detection in Agricultural Field": "projects/pest-detection.html",
  "Audience Insight": "projects/audience-insight.html",
  "Smart Gardening System": "projects/gardening-system.html",
  "Maze Solver Robot Simulation": "projects/maze-solver-robot.html",
};

const projectPublicationMap = {
  "Weeding Robot": "https://www.mdpi.com/2075-1702/11/2/287",
  "RVM": "https://www.mdpi.com/2313-4321/7/5/70",
  "GPS-Denied Navigation": "projects/ms-thesis.html",
};

const workCards = document.querySelectorAll(".work__card");

workCards.forEach((card) => {
  const title = card.querySelector(".work__title")?.textContent?.trim();
  const link = card.querySelector(".work__button");

  if (title && projectArticleMap[title] && link) {
    link.href = projectArticleMap[title];
    link.setAttribute("aria-label", `Open case study for ${title}`);
  }

  const publicationUrl = title ? projectPublicationMap[title] : null;
  if (publicationUrl) {
    if (!card.querySelector(".work__publication")) {
      const actions = link?.closest(".work__actions") || document.createElement("div");
      actions.classList.add("work__actions");

      if (!link?.parentElement.classList.contains("work__actions")) {
        if (link) {
          const wrapper = document.createElement("div");
          wrapper.classList.add("work__actions");
          link.parentNode.insertBefore(wrapper, link.nextSibling);
          wrapper.appendChild(link);
        } else {
          card.appendChild(actions);
        }
      }

      const publicationLink = document.createElement("a");
      publicationLink.href = publicationUrl;
      publicationLink.className = "work__publication";
      publicationLink.target = "_blank";
      publicationLink.rel = "noreferrer";
      publicationLink.textContent = "Publication";

      const actionContainer = link?.closest(".work__actions") || card.querySelector(".work__actions");
      actionContainer.appendChild(publicationLink);
    }
  }
});

/*=============== SWIPER TESTIMONIAL ===============*/

/*let swiperTestimonial = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});*/

/*=============== SWIPER TESTIMONIAL ===============*/

const testimonialContainer = document.querySelector(".testimonial__container");
const testimonialTrack = document.querySelector(".testimonial__container .swiper-wrapper");
const testimonialCards = document.querySelectorAll(".testimonial__card");

if (testimonialContainer && testimonialTrack && testimonialCards.length) {
  const cards = Array.from(testimonialCards);

  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    testimonialTrack.appendChild(clone);
  });

  const pagination = document.querySelector(".swiper-pagination");
  if (pagination) {
    pagination.innerHTML = "";
    cards.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className = "swiper-pagination-bullet" + (index === 0 ? " swiper-pagination-bullet-active" : "");
      pagination.appendChild(dot);
    });
  }

  const style = getComputedStyle(testimonialTrack);
  const gap = parseFloat(style.gap || style.columnGap || "24");
  const firstCard = cards[0];
  const cardWidth = firstCard.getBoundingClientRect().width + gap;
  const repeatedCards = testimonialTrack.children.length;
  const totalWidth = repeatedCards * cardWidth;

  testimonialTrack.style.setProperty("--testimonial-total-width", `${totalWidth}px`);
  testimonialTrack.style.animation = "testimonial-scroll 26s linear infinite";
  testimonialTrack.style.animationPlayState = "paused";

  testimonialContainer.addEventListener("mouseenter", () => {
    testimonialTrack.style.animationPlayState = "running";
  });

  testimonialContainer.addEventListener("mouseleave", () => {
    testimonialTrack.style.animationPlayState = "paused";
  });
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
/*const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";*/

// Previously selected topic (if user selected)
//const selectedTheme = localStorage.getItem("selected-theme");
//const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
// const getCurrentTheme = () =>
//   document.body.classList.contains(lightTheme) ? "dark" : "light";
// const getCurrentIcon = () =>
//   themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
// if (selectedTheme) {
//   // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
//   document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
//     lightTheme
//   );
//   themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
//     iconTheme
//   );
// }

// Activate / deactivate the theme manually with the button
// themeButton.addEventListener("click", () => {
//   // Add or remove the light / icon theme
//   document.body.classList.toggle(lightTheme);
//   themeButton.classList.toggle(iconTheme);
//   // We save the theme and the current icon that the user chose
//   localStorage.setItem("selected-theme", getCurrentTheme());
//   localStorage.setItem("selected-icon", getCurrentIcon());
// });

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal(`.nav__menu`, {
  delay: 100,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, {
  delay: 100,
});

sr.reveal(`.home__social, .home__scroll`, {
  delay: 100,
  origin: "bottom",
});

sr.reveal(`.about__img`, {
  delay: 100,
  origin: "left",
  scale: 0.9,
  distance: "30px",
});

sr.reveal(`.about__data, .about__description, .about__button-contact`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.skills__content`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.services__title, services__button`, {
  delay: 100,
  scale: 0.9,
  origin: "top",
  distance: "30px",
});

sr.reveal(`.work__card`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.testimonial__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.contact__info, .contact__title-info`, {
  delay: 100,
  scale: 0.9,
  origin: "left",
  distance: "30px",
});

sr.reveal(`.contact__form, .contact__title-form`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.footer, footer__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

// At the bottom of main.js
document.addEventListener('DOMContentLoaded', () => {
  const hexImages = document.querySelectorAll('.hex-image');
  if (!hexImages.length) return; // Avoid running if no images found

  let index = 0;
  setInterval(() => {
    hexImages.forEach((img, i) => {
      img.classList.remove('active');
    });
    hexImages[index].classList.add('active');
    index = (index + 1) % hexImages.length;
  }, 3000);
});
