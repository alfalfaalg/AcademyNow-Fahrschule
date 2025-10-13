// =================================================================================
// FUNKTIONEN FÜR DIE "COMING SOON"-SEITE
// =================================================================================

function updateClock() {
  const clockElement = document.getElementById("clock");
  const dateElement = document.getElementById("date");
  if (clockElement && dateElement) {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString("de-DE");
    dateElement.textContent = now.toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// =================================================================================
// COOKIE BANNER FUNKTIONALITÄT
// (ausgelagert nach js/cookie-banner.js)
// =================================================================================

// Cookie-Banner wird nun über js/cookie-banner.js initialisiert

// =================================================================================
// DEVELOPER LOGIN FUNKTIONEN
// =================================================================================

function setupDeveloperLogin() {
  const devLink = document.getElementById("dev-link");
  if (devLink) {
    let attempts = parseInt(localStorage.getItem("loginAttempts") || "0");
    const maxAttempts = 3;
    devLink.addEventListener("click", function (e) {
      e.preventDefault();
      if (attempts >= maxAttempts) {
        alert("Zu viele falsche Versuche. Zugriff dauerhaft verweigert.");
        localStorage.setItem("blocked", "true");
        return;
      }
      if (localStorage.getItem("blocked") === "true") {
        alert(
          "Ihr Zugriff wurde gesperrt. Bitte kontaktieren Sie den Administrator."
        );
        return;
      }
      const pw = prompt("Bitte Passwort eingeben:");
      if (pw === "!!Projekt2025") {
        sessionStorage.setItem("authed", "1");
        localStorage.setItem("authed", "1");
        localStorage.removeItem("blocked");
        localStorage.removeItem("loginAttempts");
        setTimeout(function () {
          window.location.href = "index.html";
        }, 100);
      } else {
        attempts++;
        localStorage.setItem("loginAttempts", attempts.toString());
        const remainingAttempts = maxAttempts - attempts;
        if (remainingAttempts > 0) {
          alert(
            `Falsches Passwort! Noch ${remainingAttempts} Versuch(e) übrig.`
          );
        } else {
          alert("Zu viele falsche Versuche. Zugriff verweigert.");
          localStorage.setItem("blocked", "true");
        }
      }
    });
  }
}

// =================================================================================
// AUTHENTIFIZIERUNGSFUNKTION
// =================================================================================

function checkAuthentication() {
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname.endsWith("/") ||
    window.location.pathname === ""
  ) {
    const isAuthenticated =
      sessionStorage.getItem("authed") === "1" ||
      localStorage.getItem("authed") === "1";
    if (!isAuthenticated) {
      // window.location.replace('coming-soon.html');
      return false;
    } else {
      sessionStorage.setItem("authed", "1");
      return true;
    }
  }
  return true;
}

// =================================================================================
// INTERSECTION OBSERVER FÜR OPTIMIZED LOADING
// =================================================================================

function initIntersectionObserver() {
  // Observer für Animationen
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          animationObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observer für Lazy Loading von Bildern
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            img.classList.add("loaded");
          }
          imageObserver.unobserve(img);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px 0px",
    }
  );

  // Observer für Critical Content Preloading
  const preloadObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          // Preload next section resources
          preloadNextSectionResources(section);
          preloadObserver.unobserve(section);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "200px 0px",
    }
  );

  // Animierbare Elemente beobachten
  document
    .querySelectorAll(".section, .preis-card, .leistung-item, .stelle-card")
    .forEach((el) => {
      animationObserver.observe(el);
    });

  // Lazy Load Bilder beobachten
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });

  // Section Preloading beobachten
  document.querySelectorAll(".section").forEach((section) => {
    preloadObserver.observe(section);
  });
}

function preloadNextSectionResources(currentSection) {
  const sectionId = currentSection.id;
  // Preload resources based on upcoming sections
  if (sectionId === "preise") {
    // Preload contact form resources
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "https://formsubmit.co/";
    document.head.appendChild(link);
  }
}

// =================================================================================
// PERFORMANCE MONITORING
// =================================================================================

function initPerformanceMonitoring() {
  // Web Vitals Tracking
  if ("PerformanceObserver" in window) {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      // console.log("📊 LCP:", Math.round(lastEntry.startTime), "ms");
    }).observe({ entryTypes: ["largest-contentful-paint"] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        console.log(
          "📊 FID:",
          Math.round(entry.processingStart - entry.startTime),
          "ms"
        );
      });
    }).observe({ entryTypes: ["first-input"] });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      // console.log("📊 CLS:", clsValue.toFixed(4));
    }).observe({ entryTypes: ["layout-shift"] });
  }

  // Page Load Performance
  window.addEventListener("load", () => {
    const perfData = performance.getEntriesByType("navigation")[0];
    // console.log(
      "📊 Page Load Time:",
      Math.round(perfData.loadEventEnd - perfData.fetchStart),
      "ms"
    );
    // console.log(
      "📊 DOM Interactive:",
      Math.round(perfData.domInteractive - perfData.fetchStart),
      "ms"
    );
  });
}

function initProgressiveImageLoading() {
  const heroBackground = document.querySelector(".hero-background");
  if (!heroBackground) return;

  // Add loading class for shimmer effect
  heroBackground.classList.add("loading");

  // Create high-res image
  const highResImage = new Image();
  highResImage.onload = function () {
    // Remove loading class
    heroBackground.classList.remove("loading");

    // Add loaded class with smooth transition
    setTimeout(() => {
      heroBackground.classList.add("loaded");
    }, 100);

    // console.log("✅ Hero image loaded successfully");
  };

  highResImage.onerror = function () {
    console.error("❌ Failed to load hero image");
    heroBackground.classList.remove("loading");
  };

  // Start loading the high-resolution image
  highResImage.src = "images/heroBackground/mercedes-hero-optimized.jpg";
}

// =================================================================================
// FUNKTIONEN FÜR DIE HAUPTSEITE (UI-Interaktionen und Effekte)
// =================================================================================

function lazyLoadMaps() {
  const mapIframes = document.querySelectorAll("iframe.maps-iframe[data-src]");
  if (mapIframes.length === 0) return;
  const loadMap = (iframe) => {
    if (iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
      iframe.removeAttribute("data-src");
    }
  };
  if ("IntersectionObserver" in window) {
    const mapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMap(entry.target);
            mapObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px" }
    );
    mapIframes.forEach((iframe) => {
      mapObserver.observe(iframe);
    });
  } else {
    mapIframes.forEach((iframe) => {
      loadMap(iframe);
    });
  }
}

// ========== INITIALISIERUNG ==========

document.addEventListener("DOMContentLoaded", function () {
  // Performance monitoring
  initPerformanceMonitoring();

  // Progressive Image Loading for Hero Background
  initProgressiveImageLoading();

  // Initialize Intersection Observer
  initIntersectionObserver();

  // Check for pending updates
  checkForPendingUpdate();

  // Service Worker Registration
  registerServiceWorker();

  // 1. Fullscreen Mobile Navigation
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navOverlay = document.querySelector("#main-navigation");
  const navLinks = document.querySelectorAll(
    'nav[aria-label="Hauptnavigation"] ul li a.nav-link'
  );

  // console.log("🔍 Mobile Menu Debug:", {
    menuBtn: !!menuBtn,
    navOverlay: !!navOverlay,
    navLinks: navLinks.length,
  });

  if (menuBtn && navOverlay) {
    // console.log("✅ Mobile menu elements found, attaching event listener");

    menuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // console.log("📱 Menu button clicked");

      // Toggle Menü und Button
      navOverlay.classList.toggle("active");
      this.classList.toggle("active");

      const isExpanded = navOverlay.classList.contains("active");
      // console.log("📱 Menu state:", isExpanded ? "OPEN" : "CLOSED");

      this.setAttribute("aria-expanded", isExpanded);
      this.setAttribute(
        "aria-label",
        isExpanded ? "Menü schließen" : "Menü öffnen"
      );

      // Body Scroll sperren/entsperren
      document.body.style.overflow = isExpanded ? "hidden" : "";
    });

    // NICHT automatisch schließen bei Klicks innerhalb des Overlays,
    // damit Dropdowns geöffnet werden können und das Menü sichtbar bleibt.
    // Wir schließen nur, wenn explizit ein Navigations-Link (zu einer Sektion) geklickt wird.

    // Menü schließen beim Klick auf einen Navigation-Link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navOverlay.classList.contains("active")) {
          navOverlay.classList.remove("active");
          menuBtn.classList.remove("active");
          menuBtn.setAttribute("aria-expanded", false);
          menuBtn.setAttribute("aria-label", "Menü öffnen");
          document.body.style.overflow = "";
        }
      });
    });

    // ESC-Taste schließt Menü
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navOverlay.classList.contains("active")) {
        navOverlay.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", false);
        menuBtn.setAttribute("aria-label", "Menü öffnen");
        document.body.style.overflow = "";
      }
    });
  }

  // Dropdown Menu Toggle (für Mobile und Desktop)
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    // Desktop: Hover ist bereits via CSS gehandelt
    // Mobile: Click-Handler für Toggle
    toggle.addEventListener("click", function (e) {
      // Nur auf Mobile (wenn mobile-menu-btn sichtbar ist)
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = this.closest(".dropdown");
        dropdown.classList.toggle("active");
      }
    });
  });

  // === Dynamische Navigation: Aktiven Menüpunkt beim Scrollen und Klick setzen ===
  const navLinksArr = Array.from(navLinks);
  const navSections = navLinksArr
    .map((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) {
        return null;
      }
      const section = document.getElementById(href.slice(1));
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  function setActiveNavOnScroll() {
    const headerHeight =
      document.getElementById("main-header")?.offsetHeight || 0;
    const scrollPos = window.scrollY + headerHeight + 40;

    if (!navSections.length) {
      navLinksArr.forEach((link) => link.classList.remove("active"));
      return;
    }

    let currentPair = navSections[0];

    navSections.forEach((pair) => {
      if (pair.section.offsetTop <= scrollPos) {
        currentPair = pair;
      }
    });

    navLinksArr.forEach((link) => link.classList.remove("active"));
    currentPair.link.classList.add("active");
  }

  window.addEventListener("scroll", setActiveNavOnScroll, { passive: true });
  setActiveNavOnScroll();

  // Beim Klick auf einen Menüpunkt: active sofort setzen und smooth scroll
  navLinksArr.forEach((link, idx) => {
    link.addEventListener("click", function (e) {
      // Wenn Dropdown-Toggle (Bildungsangebot) geklickt wird, hier nichts machen
      if (this.classList.contains("dropdown-toggle")) {
        return;
      }
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          const headerHeight =
            document.getElementById("main-header")?.offsetHeight || 0;
          const offset = headerHeight + 20;
          const targetPosition =
            target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
      navLinksArr.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      // Menü auf Mobil schließen
      if (navOverlay && navOverlay.classList.contains("active")) {
        navOverlay.classList.remove("active");
        if (menuBtn) {
          menuBtn.classList.remove("active");
          menuBtn.setAttribute("aria-expanded", false);
          menuBtn.setAttribute("aria-label", "Menü öffnen");
        }
        document.body.style.overflow = "";
      }
    });

    // Touch-Feedback für mobile Geräte
    link.addEventListener(
      "touchstart",
      function () {
        this.classList.add("touch-active");
      },
      { passive: true }
    );
    link.addEventListener(
      "touchend",
      function () {
        setTimeout(() => {
          this.classList.remove("touch-active");
        }, 150);
      },
      { passive: true }
    );
  });

  // 2. FAQ Accordion mit verbesserter Accessibility
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      // Keyboard-Unterstützung für FAQ
      question.addEventListener("click", function (e) {
        e.preventDefault();
        toggleFaqItem(item, question, answer);
      });

      // Keyboard-Navigation (Enter und Space)
      question.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFaqItem(item, question, answer);
        }
      });

      // Ensure button is focusable
      if (question.tagName === "BUTTON") {
        question.setAttribute("tabindex", "0");
      }
    }
  });

  function toggleFaqItem(item, question, answer) {
    // Andere FAQ-Items schließen
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        const otherQuestion = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        const otherIcon = otherItem.querySelector(".faq-icon");

        otherItem.classList.remove("active");
        if (otherIcon) otherIcon.textContent = "+";
        if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.style.display = "none";
      }
    });

    const isActive = item.classList.contains("active");
    const icon = item.querySelector(".faq-icon");

    if (isActive) {
      // FAQ schließen
      item.classList.remove("active");
      if (icon) icon.textContent = "+";
      if (question) question.setAttribute("aria-expanded", "false");
      if (answer) answer.style.display = "none";
    } else {
      // FAQ öffnen
      item.classList.add("active");
      if (icon) icon.textContent = "−";
      if (question) question.setAttribute("aria-expanded", "true");
      if (answer) answer.style.display = "block";
    }
  }

  // 3. Scroll Indicator - "Mehr entdecken"
  const scrollIndicator = document.getElementById("scrollIndicator");
  // console.log('🔍 Scroll Indicator Debug:', {
    element: !!scrollIndicator,
    opacity: scrollIndicator?.style.opacity,
    pointerEvents: scrollIndicator?.style.pointerEvents
  });

  if (scrollIndicator) {
    // Sicherstellen dass Element klickbar ist
    scrollIndicator.style.opacity = "1";
    scrollIndicator.style.pointerEvents = "auto";
    scrollIndicator.style.cursor = "pointer";

    scrollIndicator.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // console.log('📍 "Mehr entdecken" clicked - scrolling to Preise');

      const preiseSection = document.getElementById("preise");
      if (preiseSection) {
        const headerHeight =
          document.getElementById("main-header")?.offsetHeight || 0;
        const offset = headerHeight + 30;
        const targetPosition =
          preiseSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        console.error('❌ Preise section not found');
      }
    });
  } else {
    console.error('❌ Scroll Indicator element not found');
  }

  // Authentifizierung prüfen
  if (!document.body.classList.contains("coming-soon-page")) {
    if (!checkAuthentication()) {
      return;
    }
  }

  // Lazy Loading für Maps
  lazyLoadMaps();

  // "Coming Soon"-Funktionen
  if (document.body.classList.contains("coming-soon-page")) {
    setInterval(updateClock, 1000);
    updateClock();
    setupDeveloperLogin();
  }

  // Kontaktformular Validierung - SICHER (nur 1x submission)
  const kontaktForm = document.getElementById("kontaktForm");
  if (kontaktForm) {
    let formSubmitting = false; // Verhindert Doppel-Submission

    kontaktForm.addEventListener("submit", (e) => {
      // Doppel-Submission verhindern
      if (formSubmitting) {
        console.warn('⚠️ Form already submitting, preventing duplicate');
        e.preventDefault();
        return;
      }

      // Validierung
      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const nachricht = document.getElementById("nachricht")?.value.trim();
      const datenschutz = document.getElementById("datenschutz")?.checked;

      if (!name || !email || !nachricht || !datenschutz) {
        e.preventDefault();
        alert("Bitte füllen Sie alle Pflichtfelder aus und akzeptieren Sie die Datenschutzerklärung.");
        return;
      }

      // Email Format Validierung
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        return;
      }

      // Alles OK - Formular wird nativ submittet (nur 1x!)
      formSubmitting = true;
      // console.log('✅ Form validation passed - submitting to FormSubmit.co');

      // Button disabled zur Sicherheit
      const submitBtn = kontaktForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Wird gesendet...";
      }

      // FormSubmit.co übernimmt ab hier (native submission)
      // Redirect zu danke.html erfolgt automatisch
    });
  }

  // =================================================================================
  // INITALISIERUNG ABGESCHLOSSEN
  // =================================================================================
});

// =================================================================================
// SERVICE WORKER REGISTRATION
// =================================================================================

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      // console.log(
        "✅ Service Worker registered successfully:",
        registration.scope
      );

      // Handle updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // New update available
            showUpdateNotification();
          }
        });
      });
    } catch (error) {
      // console.log("❌ Service Worker registration failed:", error);
    }
  }
}

function showUpdateNotification() {
  // Prüfen ob User das Update bereits gesehen hat (für diese Session)
  if (sessionStorage.getItem('updateNotificationShown') === 'true') {
    // console.log('⏭️ Update notification already shown this session');
    return;
  }

  // Markieren dass Notification angezeigt wurde
  sessionStorage.setItem('updateNotificationShown', 'true');
  sessionStorage.setItem('updateAvailable', 'true');

  // console.log('🔔 Showing update notification (permanent until clicked)');

  // Create elegant update notification - BLEIBT DAUERHAFT
  const notification = document.createElement("div");
  notification.id = 'update-notification';
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      z-index: 10001;
      max-width: 320px;
      font-family: 'Inter', sans-serif;
      animation: slideInRight 0.3s ease;
    ">
      <div style="font-weight: 700; margin-bottom: 4px; font-size: 1.05em;">🎉 Update verfügbar!</div>
      <div style="font-size: 0.9em; margin-bottom: 14px; opacity: 0.95;">Eine neue Version ist bereit. Bitte aktualisieren Sie für die neuesten Features und Fixes.</div>
      <button onclick="updateApp()" style="
        background: var(--accent);
        color: var(--primary);
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        font-size: 0.95em;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
        Jetzt aktualisieren
      </button>
      <div style="font-size: 0.75em; margin-top: 8px; opacity: 0.7; text-align: center;">Dieses Update bleibt sichtbar</div>
    </div>
  `;
  document.body.appendChild(notification);
}

// Beim Page Load prüfen ob Update verfügbar ist
function checkForPendingUpdate() {
  if (sessionStorage.getItem('updateAvailable') === 'true' &&
      sessionStorage.getItem('updateNotificationShown') !== 'true') {
    // console.log('🔄 Pending update detected, showing notification again');
    showUpdateNotification();
  }
}

function updateApp() {
  // console.log('🔄 User clicked update button - activating new Service Worker');

  // SessionStorage leeren damit nach Reload keine Notification mehr erscheint
  sessionStorage.removeItem('updateNotificationShown');
  sessionStorage.removeItem('updateAvailable');

  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  } else {
    // Fallback wenn kein Service Worker
    window.location.reload();
  }
}

// =================================================================================
// ADVANCED SCROLL OPTIMIZATIONS
// =================================================================================

let ticking = false;
let lastScrollY = window.scrollY;

function optimizedScrollHandler() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      // Header hide/show logic - DEAKTIVIERT (verursachte komische Bewegungen)
      // const header = document.getElementById('main-header');
      // if (header) {
      //   if (scrollingDown && currentScrollY > 100) {
      //     header.style.transform = 'translateY(-100%)';
      //   } else {
      //     header.style.transform = 'translateY(0)';
      //   }
      // }

      // Scroll indicator fade
      const scrollIndicator = document.getElementById("scrollIndicator");
      if (scrollIndicator) {
        const opacity = Math.max(
          0,
          1 - currentScrollY / (window.innerHeight * 0.3)
        );
        scrollIndicator.style.opacity = opacity;
        scrollIndicator.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
      }

      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
}

// Use passive listeners for better performance
window.addEventListener("scroll", optimizedScrollHandler, { passive: true });

// =================================================================================
// IMPROVED FORM HANDLING WITH VALIDATION
// =================================================================================

function initAdvancedFormHandling() {
  const form = document.getElementById("kontaktForm");
  if (!form) return;

  // Real-time validation
  const inputs = form.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("input", debounce(validateField, 300));
    input.addEventListener("blur", validateField);
  });

  // Enhanced form submission
  form.addEventListener("submit", handleFormSubmission);
}

function validateField(event) {
  const field = event.target;
  const value = field.value.trim();

  // Remove existing validation classes
  field.classList.remove("valid", "invalid");

  let isValid = true;

  // Validation rules
  switch (field.type) {
    case "email":
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      break;
    case "tel":
      isValid = value === "" || /^[\d\s\-\+\(\)]+$/.test(value);
      break;
    default:
      if (field.required) {
        isValid = value.length > 0;
      }
  }

  // Apply validation class
  field.classList.add(isValid ? "valid" : "invalid");

  // Show/hide error message
  const errorElement = field.parentElement.querySelector(".error-message");
  if (!isValid && field.required) {
    if (!errorElement) {
      const error = document.createElement("div");
      error.className = "error-message";
      error.textContent = getErrorMessage(field);
      field.parentElement.appendChild(error);
    }
  } else if (errorElement) {
    errorElement.remove();
  }
}

function getErrorMessage(field) {
  switch (field.type) {
    case "email":
      return "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    case "tel":
      return "Bitte geben Sie eine gültige Telefonnummer ein.";
    default:
      return "Dieses Feld ist erforderlich.";
  }
}

function handleFormSubmission(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');

  // Show loading state
  submitButton.textContent = "Wird gesendet...";
  submitButton.disabled = true;

  // Collect form data
  const formData = new FormData(form);

  // Submit form (with potential offline queueing)
  submitFormData(formData, form)
    .then(() => {
      showSuccessMessage();
      form.reset();
    })
    .catch((error) => {
      console.error("Form submission failed:", error);
      showErrorMessage();
    })
    .finally(() => {
      submitButton.textContent = "Nachricht senden";
      submitButton.disabled = false;
    });
}

async function submitFormData(formData, form) {
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response;
  } catch (error) {
    // Queue for later if offline
    if (!navigator.onLine) {
      queueFormSubmission(formData);
      throw new Error(
        "Formular wurde für die spätere Übertragung gespeichert."
      );
    }
    throw error;
  }
}

function queueFormSubmission(formData) {
  const submissions = JSON.parse(
    localStorage.getItem("queuedSubmissions") || "[]"
  );
  submissions.push({
    data: Object.fromEntries(formData),
    timestamp: Date.now(),
  });
  localStorage.setItem("queuedSubmissions", JSON.stringify(submissions));
}

function showSuccessMessage() {
  showMessage("✅ Nachricht erfolgreich gesendet!", "success");
}

function showErrorMessage() {
  showMessage("❌ Fehler beim Senden. Bitte versuchen Sie es erneut.", "error");
}

function showMessage(text, type) {
  const message = document.createElement("div");
  message.className = `form-message ${type}`;
  message.textContent = text;
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 10002;
    animation: slideInRight 0.3s ease;
    background: ${type === "success" ? "#27ae60" : "#e74c3c"};
  `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => message.remove(), 300);
  }, 5000);
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize advanced form handling
// DEAKTIVIERT: Führte zu mehrfachen Form-Submissions!
// FormSubmit.co funktioniert am besten mit nativen Form-Submissions
// document.addEventListener("DOMContentLoaded", initAdvancedFormHandling);
function initProgressiveImageLoading() {
  const heroBackground = document.querySelector(".hero-background");
  if (!heroBackground) return;

  // Add loading class for shimmer effect
  heroBackground.classList.add("loading");

  // Create high-res image
  const highResImage = new Image();
  highResImage.onload = function () {
    // Remove loading class
    heroBackground.classList.remove("loading");

    // Add loaded class with smooth transition
    setTimeout(() => {
      heroBackground.classList.add("loaded");
    }, 100);

    // console.log("✅ Hero image loaded successfully");
  };

  highResImage.onerror = function () {
    console.error("❌ Failed to load hero image");
    heroBackground.classList.remove("loading");
  };

  // Start loading the high-resolution image
  highResImage.src = "images/heroBackground/mercedes-hero-optimized.jpg";
}

// Scroll Indicator functionality
function initScrollIndicator() {
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (!scrollIndicator) return;

  scrollIndicator.addEventListener("click", function () {
    // Scroll to the next section (about section)
    const aboutSection =
      document.getElementById("about") ||
      document.querySelector(".about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  });

  // Hide scroll indicator when user scrolls down
  let lastScrollTop = 0;
  window.addEventListener(
    "scroll",
    function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > window.innerHeight * 0.2) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.pointerEvents = "none";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.pointerEvents = "auto";
      }

      lastScrollTop = scrollTop;
    },
    { passive: true }
  );
}
