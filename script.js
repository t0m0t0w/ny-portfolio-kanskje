// lenis smooth scroll
const lenis = new Lenis({
  autoRaf: true,
});

// logger scroll events
lenis.on("scroll", (e) => {
  console.log(e);
});

// video lydkontroll

document.addEventListener("DOMContentLoaded", () => {
  const headerVideo = document.getElementById("header-video");

  if (headerVideo && headerVideo.tagName === "VIDEO") {
    // musepeker
    headerVideo.style.cursor = "pointer";

    // toggle lyd ved klikk
    headerVideo.addEventListener("click", () => {
      headerVideo.muted = !headerVideo.muted;

      // litt visuell feedback
      if (!headerVideo.muted) {
        // lyd på
        headerVideo.style.opacity = "0.95";
        setTimeout(() => {
          headerVideo.style.opacity = "1";
        }, 200);
      }
    });
  }
});

// hamburgermeny

const hamburgerBtn = document.getElementById("meny-knapp");
const sideMenu = document.getElementById("side-menu");
const closeMenuBtn = document.getElementById("close-menu");
const menuOverlay = document.getElementById("menu-overlay");

// åpne meny
const openMenu = () => {
  sideMenu.classList.add("active");
  menuOverlay.classList.add("active");
  hamburgerBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden"; // stopp scrolling
  if (lenis) lenis.stop();
};

// lukk meny
const closeMenu = () => {
  sideMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
  hamburgerBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = ""; // skru på scrolling igjen
  if (lenis) lenis.start();
};

// lyttere
hamburgerBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

// lukk ved klikk på lenke
document.querySelectorAll(".menu-list a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// lukk med esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sideMenu.classList.contains("active")) {
    closeMenu();
  }
});

// bildeoptimasering og lightbox

// lazy loading med blur
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".zoomable-image");

  // loading-klasse til start
  images.forEach((img) => {
    if (!img.complete) {
      img.classList.add("loading");
    }

    // fjern loading når bildet er lastet
    img.addEventListener("load", () => {
      img.classList.remove("loading");
      img.classList.add("loaded");
    });
  });

  // intersection observer som backup
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // loading="lazy" fikser resten
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
});

// lightbox for full kvalitet
const createLightbox = () => {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <div class="lightbox-loading">Laster...</div>
    <img class="lightbox-content" alt="">
  `;
  document.body.appendChild(lightbox);
  return lightbox;
};

const lightbox = createLightbox();
const lightboxImg = lightbox.querySelector(".lightbox-content");
const lightboxLoading = lightbox.querySelector(".lightbox-loading");
const closeBtn = lightbox.querySelector(".lightbox-close");

// åpne lightbox ved klikk
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("zoomable-image")) {
    const fullSrc = e.target.dataset.full || e.target.src;

    lightbox.classList.add("active");
    lightboxLoading.style.display = "block";
    lightboxImg.style.display = "none";

    // last inn full kvalitet
    const fullImg = new Image();
    fullImg.onload = () => {
      lightboxImg.src = fullSrc;
      lightboxImg.alt = e.target.alt;
      lightboxImg.style.display = "block";
      lightboxLoading.style.display = "none";
    };
    fullImg.src = fullSrc;

    // pause scrolling når lightbox er åpen
    if (lenis) lenis.stop();
  }
});

// lukk lightbox
const closeLightbox = () => {
  lightbox.classList.remove("active");
  if (lenis) lenis.start();
};

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// lukk med esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

// kontaktknapper

const phoneButton = document.getElementById("phone-button");
const emailButton = document.getElementById("email-button");
const contactButtons = document.querySelector(".contact-buttons");

// sjekk om valg vises
let optionsShowing = false;

// telefonknapp
phoneButton.addEventListener("click", () => {
  if (optionsShowing) return; // unngå flere klikk

  optionsShowing = true;

  // lag telefonvalg
  const phoneOptions = document.createElement("div");
  phoneOptions.className = "contact-options";
  phoneOptions.innerHTML = `
    <div class="contact-button contact-option" id="webcall-option">
      <span>netttelefon</span>
    </div>
    <div class="contact-button contact-option" id="show-number-option">
      <span>vis telefonnummer</span>
    </div>
    <div class="contact-button contact-back" id="back-button">
      <span>← tilbake</span>
    </div>
  `;

  // fade ut originale knapper
  phoneButton.style.opacity = "0";
  emailButton.style.opacity = "0";

  setTimeout(() => {
    phoneButton.style.display = "none";
    emailButton.style.display = "none";
    contactButtons.appendChild(phoneOptions);

    // start animasjon
    requestAnimationFrame(() => {
      phoneOptions.style.opacity = "1";
      phoneOptions.style.transform = "translateY(0)";
    });
  }, 300);

  // lyttere på valg
  setTimeout(() => {
    document.getElementById("webcall-option").addEventListener("click", () => {
      // åpne netttelefon
      window.open("https://1468.3cx.cloud/callus/#LiveChat571611", "_blank");
    });

    document
      .getElementById("show-number-option")
      .addEventListener("click", () => {
        // vis telefonnummer
        const numberDisplay = document.createElement("div");
        numberDisplay.className = "contact-options phone-display";
        numberDisplay.innerHTML = `
        <div class="phone-number">
          <h3>ring meg på:</h3>
          <a href="tel:+18088004842" class="contact-button contact-phone-link">+1 808 800 4842</a>
        </div>
        <div class="contact-button contact-back" id="back-from-number">
          <span>← Tilbake</span>
        </div>
      `;

        phoneOptions.style.opacity = "0";
        setTimeout(() => {
          phoneOptions.remove();
          contactButtons.appendChild(numberDisplay);
          requestAnimationFrame(() => {
            numberDisplay.style.opacity = "1";
            numberDisplay.style.transform = "translateY(0)";
          });

          document
            .getElementById("back-from-number")
            .addEventListener("click", resetContactButtons);
        }, 300);
      });

    document
      .getElementById("back-button")
      .addEventListener("click", resetContactButtons);
  }, 400);
});

// e-postknapp
emailButton.addEventListener("click", () => {
  if (optionsShowing) return;

  optionsShowing = true;

  // lag e-postvalg
  const emailOptions = document.createElement("div");
  emailOptions.className = "contact-options";
  emailOptions.innerHTML = `
    <div class="contact-button contact-option" id="email-form-option">
      <span>kontaktskjema</span>
    </div>
    <div class="contact-button contact-option" id="show-email-option">
      <span>vis e-post</span>
    </div>
    <div class="contact-button contact-back" id="back-button-email">
      <span>← tilbake</span>
    </div>
  `;

  // fade ut originale knapper
  phoneButton.style.opacity = "0";
  emailButton.style.opacity = "0";

  setTimeout(() => {
    phoneButton.style.display = "none";
    emailButton.style.display = "none";
    contactButtons.appendChild(emailOptions);

    requestAnimationFrame(() => {
      emailOptions.style.opacity = "1";
      emailOptions.style.transform = "translateY(0)";
    });
  }, 300);

  // lyttere på valg
  setTimeout(() => {
    document
      .getElementById("email-form-option")
      .addEventListener("click", () => {
        // åpne kontaktskjema
        window.open(
          "https://us11.list-manage.com/contact-form?u=9ca1113adde39a59fb25d6c7e&form_id=fe4636ecc10c9e75bc613c07a1f3801e",
          "_blank"
        );
      });

    document
      .getElementById("show-email-option")
      .addEventListener("click", () => {
        // vis e-postadresse
        const emailDisplay = document.createElement("div");
        emailDisplay.className = "contact-options email-display";
        emailDisplay.innerHTML = `
        <div class="email-address">
          <h3>send meg en e-post:</h3>
          <a href="mailto:hei@0694200.xyz" class="contact-button contact-email-link">hei@0694200.xyz</a>
        </div>
        <div class="contact-button contact-back" id="back-from-email">
          <span>← tilbake</span>
        </div>
      `;

        emailOptions.style.opacity = "0";
        setTimeout(() => {
          emailOptions.remove();
          contactButtons.appendChild(emailDisplay);
          requestAnimationFrame(() => {
            emailDisplay.style.opacity = "1";
            emailDisplay.style.transform = "translateY(0)";
          });

          document
            .getElementById("back-from-email")
            .addEventListener("click", resetContactButtons);
        }, 300);
      });

    document
      .getElementById("back-button-email")
      .addEventListener("click", resetContactButtons);
  }, 400);
});

// tilbakestill til start
function resetContactButtons() {
  const options = document.querySelector(".contact-options");
  if (options) {
    options.style.opacity = "0";
    options.style.transform = "translateY(20px)";

    setTimeout(() => {
      options.remove();
      phoneButton.style.display = "";
      emailButton.style.display = "";

      requestAnimationFrame(() => {
        phoneButton.style.opacity = "1";
        emailButton.style.opacity = "1";
      });

      optionsShowing = false;
    }, 300);
  }
}
