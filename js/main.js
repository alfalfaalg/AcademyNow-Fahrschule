// =================================================================================
// COOKIE BANNER FUNKTIONALITÄT
// (ausgelagert nach js/cookie-banner.js)
// =================================================================================

// Cookie-Banner wird nun über js/cookie-banner.js initialisiert

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
    link.href = "https://api.web3forms.com/";
    document.head.appendChild(link);
  }
}

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function configureWeb3FormsRouting(form, standortSelect) {
  if (!form) {
    return;
  }

  form.action = WEB3FORMS_ENDPOINT;

  const keyInput = form.querySelector('input[name="access_key"]');
  if (!keyInput) {
    console.warn("⚠️ Kein access_key Feld im Formular gefunden.", form.id);
    return;
  }

  const hamburgKey =
    form.dataset.web3HamburgKey || form.dataset.web3DefaultKey || "";
  const bergedorfKey =
    form.dataset.web3BergedorfKey || form.dataset.web3DefaultKey || hamburgKey;

  const applyKey = (standort) => {
    if (standort === "Bergedorf" && bergedorfKey) {
      keyInput.value = bergedorfKey;
    } else {
      keyInput.value = hamburgKey;
    }
  };

  applyKey(standortSelect?.value || "Hamburg Mitte");

  if (standortSelect) {
    standortSelect.addEventListener("change", function () {
      applyKey(this.value);
    });
  }
}

function initSelectValidationStates() {
  const requiredSelects = document.querySelectorAll("select[required]");
  requiredSelects.forEach((select) => {
    if (select.dataset.validationInitialized === "true") {
      return;
    }
    select.dataset.validationInitialized = "true";
    setSelectPristine(select);

    const handleInteraction = () => {
      if (select.dataset.pristine === "true") {
        delete select.dataset.pristine;
      }
    };

    select.addEventListener("change", handleInteraction);
    select.addEventListener("blur", handleInteraction);

    if (select.form) {
      select.form.addEventListener("reset", () => {
        setSelectPristine(select);
      });
    }
  });
}

function setSelectPristine(select) {
  select.dataset.pristine = "true";
}

// =================================================================================
// GLOBAL SCROLL SAFETY (verhindert steckenbleibende Scroll-Sperren auf Mobile)
// =================================================================================

function ensureBodyScrollUnlocked() {
  const navActive = document
    .getElementById("main-navigation")
    ?.classList.contains("active");

  const modalSelectors = [
    "#whatsapp-modal",
    "#telefon-modal",
    "#popup-form-overlay",
    "#karriere-modal",
  ];

  const modalOpen = modalSelectors.some((selector) => {
    const el = document.querySelector(selector);
    return el && getComputedStyle(el).display !== "none";
  });

  if (!navActive && !modalOpen) {
    document.body.style.overflow = "";
  }
}

function isScrollDebugEnabled() {
  try {
    const params = new URLSearchParams(window.location.search);
    return (
      params.has("debugScroll") ||
      window.localStorage.getItem("debugScroll") === "1"
    );
  } catch {
    return false;
  }
}

function initScrollDebug() {
  if (!isScrollDebugEnabled()) {
    return;
  }
  if (window.__scrollDebugInitialized) {
    return;
  }
  window.__scrollDebugInitialized = true;

  const debugEl = document.createElement("div");
  debugEl.id = "scroll-debug";
  debugEl.style.cssText =
    "position:fixed;left:8px;bottom:8px;z-index:2147483647;" +
    "background:rgba(0,0,0,.78);color:#fff;" +
    "font:12px/1.35 -apple-system,BlinkMacSystemFont,'Inter',Arial,sans-serif;" +
    "padding:8px 10px;border-radius:10px;" +
    "max-width:calc(100vw - 16px);" +
    "box-shadow:0 8px 24px rgba(0,0,0,.35);" +
    "pointer-events:none;white-space:pre-wrap;";
  debugEl.textContent = "ScrollDebug: ON (disable by removing ?debugScroll)";
  document.body.appendChild(debugEl);

  const safeClassList = (el) => {
    try {
      return el && el.classList && el.classList.length
        ? "." + Array.from(el.classList).slice(0, 4).join(".")
        : "";
    } catch {
      return "";
    }
  };

  const describeEl = (el) => {
    if (!el) return "<null>";
    const id = el.id ? `#${el.id}` : "";
    const cls = safeClassList(el);
    const tag = (el.tagName || "").toLowerCase() || "?";
    return `${tag}${id}${cls}`;
  };

  const buildStack = (el) => {
    const parts = [];
    let cur = el;
    for (let i = 0; i < 6 && cur; i++) {
      const style = window.getComputedStyle(cur);
      parts.push(
        `${describeEl(cur)} { pe:${style.pointerEvents}, vis:${style.visibility}, op:${style.opacity}, pos:${style.position} }`
      );
      cur = cur.parentElement;
    }
    return parts.join("\n");
  };

  const update = (label, x, y) => {
    const el = document.elementFromPoint(x, y);
    const bodyOverflow = window.getComputedStyle(document.body).overflow;
    const navActive = document
      .getElementById("main-navigation")
      ?.classList.contains("active");
    debugEl.textContent =
      `${label} @ ${Math.round(x)},${Math.round(y)}\n` +
      `elementFromPoint: ${describeEl(el)}\n` +
      `body.overflow: ${bodyOverflow} | navActive: ${navActive ? "yes" : "no"}\n` +
      buildStack(el);
  };

  const onTouch = (e) => {
    const t = e.touches && e.touches[0];
    if (!t) return;
    update(e.type, t.clientX, t.clientY);
  };

  document.addEventListener("touchstart", onTouch, { passive: true });
  document.addEventListener("touchmove", onTouch, { passive: true });
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
        // FID tracking (silent in production)
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
    //   "📊 Page Load Time:",
    //   Math.round(perfData.loadEventEnd - perfData.fetchStart),
    //   "ms"
    // );
    // console.log(
    //   "📊 DOM Interactive:",
    //   Math.round(perfData.domInteractive - perfData.fetchStart),
    //   "ms"
    // );
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
  const mapIframes = document.querySelectorAll("iframe.maps-iframe");
  if (mapIframes.length === 0) return;

  const loadMap = (iframe) => {
    if (iframe.dataset.loaded === "true") return;

    const source = iframe.dataset.src || iframe.src;
    if (!source) return;

    if (!iframe.src || iframe.src === "about:blank") {
      iframe.src = source;
    }

    iframe.dataset.loaded = "true";
    iframe.removeAttribute("data-src");
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

// =================================================================================
// INITIALIZATION SYSTEM - BFCACHE COMPATIBLE
// =================================================================================

// Global flag to prevent multiple initializations
let isInitialized = false;

// Initialization function that can be called on DOMContentLoaded AND pageshow
function initializeApp() {
  // Prevent double initialization
  if (isInitialized) {
    return;
  }

  // Performance monitoring
  initPerformanceMonitoring();

  // Progressive Image Loading for Hero Background
  initProgressiveImageLoading();

  // Initialize Intersection Observer
  initIntersectionObserver();

  // Service Worker Registration (only once)
  registerServiceWorker();

  // 1. Fullscreen Mobile Navigation
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navOverlay = document.querySelector("#main-navigation");
  const navLinks = document.querySelectorAll(
    'nav[aria-label="Hauptnavigation"] ul li a.nav-link'
  );

  // console.log("🔍 Mobile Menu Debug:", {
  //   menuBtn: !!menuBtn,
  //   navOverlay: !!navOverlay,
  //   navLinks: navLinks.length,
  // });

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

    // Falls nach Orientation-Change/Resize noch aktiv: sauber schließen
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && navOverlay.classList.contains("active")) {
        navOverlay.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", false);
        menuBtn.setAttribute("aria-label", "Menü öffnen");
      }
      ensureBodyScrollUnlocked();
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
  //   element: !!scrollIndicator,
  //   opacity: scrollIndicator?.style.opacity,
  //   pointerEvents: scrollIndicator?.style.pointerEvents
  // });

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
        console.error("❌ Preise section not found");
      }
    });
  } else if (
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("index.html")
  ) {
    // Nur auf der Hauptseite warnen, da scrollIndicator nur dort existiert
    console.warn("⚠️ Scroll Indicator element not found on index page");
  }

  // Lazy Loading für Maps
  lazyLoadMaps();

  // Required Select Felder erst nach Nutzerinteraktion validieren
  initSelectValidationStates();

  // Kontaktformular Validierung - SICHER (nur 1x submission)
  // Unterstützt alle Form-IDs für Rückwärtskompatibilität
  const kontaktForm =
    document.getElementById("kontaktForm-home") ||
    document.getElementById("kontaktForm-ueber") ||
    document.getElementById("kontaktForm");
  if (kontaktForm && !kontaktForm.dataset.listenerAdded) {
    // Flag setzen, um mehrfache Listener zu verhindern
    kontaktForm.dataset.listenerAdded = "true";

    // Standortauswahl: Dynamische E-Mail-Weiterleitung
    const standortSelect = kontaktForm.querySelector("#standort-auswahl");
    configureWeb3FormsRouting(kontaktForm, standortSelect);

    let formSubmitting = false; // Verhindert Doppel-Submission

    kontaktForm.addEventListener(
      "submit",
      (e) => {
        // Doppel-Submission verhindern
        if (formSubmitting) {
          console.warn("⚠️ Form already submitting, preventing duplicate");
          e.preventDefault();
          return;
        }

        // Validierung
        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const datenschutz = document.getElementById("datenschutz")?.checked;
        const standort = standortSelect?.value;

        if (!name || !email || !datenschutz || !standort) {
          e.preventDefault();
          alert(
            "Bitte füllen Sie alle Pflichtfelder aus und akzeptieren Sie die Datenschutzerklärung."
          );
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

        // Button disabled zur Sicherheit
        const submitBtn = kontaktForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Wird gesendet...";
        }

        // FormSubmit.co übernimmt ab hier (native submission)
        // Redirect zu danke.html erfolgt automatisch
      },
      { once: true }
    ); // WICHTIG: Event Listener wird nach 1x automatisch entfernt!
  }

  // Initialize WhatsApp Modal
  initWhatsAppModal();

  // Initialize Popup Form
  initPopupFormEvents();
  initPopupFormHandling();

  // Initialize Karriere Modal
  initKarriereModalEvents();

  // Mobile: defensiv stuck scroll-locks lösen (z.B. iOS/BFCACHE/unterbrochene close-events)
  if ("ontouchstart" in window && !window.__scrollUnlockTouchHook) {
    window.__scrollUnlockTouchHook = true;
    document.addEventListener("touchstart", ensureBodyScrollUnlocked, {
      passive: true,
    });
  }

  // Optional: Scroll/Tap Debug (nur wenn explizit aktiviert)
  initScrollDebug();

  // Mark app as initialized
  isInitialized = true;

  // =================================================================================
  // INITALISIERUNG ABGESCHLOSSEN
  // =================================================================================

  // Falls Scroll-Sperren aus vorherigen Views bestehen (bfcache/Modal): lösen
  ensureBodyScrollUnlocked();
}

// Call initialization on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initializeApp);

// =================================================================================
// BFCACHE COMPATIBILITY - Handle page restore from cache
// =================================================================================
window.addEventListener("pageshow", function (event) {
  ensureBodyScrollUnlocked();

  if (event.persisted) {
    // Page was restored from bfcache - refresh dynamic content if needed
    const reviewsContainer = document.getElementById(
      "google-reviews-container"
    );
    if (reviewsContainer && typeof loadGoogleReviews === "function") {
      loadGoogleReviews();
    }
  }
});

// =================================================================================
// SERVICE WORKER REGISTRATION
// =================================================================================

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");

      // Prüfen ob gerade ein Update angewendet wurde (nach Reload)
      const updateJustApplied = localStorage.getItem("swUpdateApplied");
      if (updateJustApplied) {
        localStorage.removeItem("swUpdateApplied");
        // console.log('✅ Service Worker Update wurde erfolgreich angewendet');
        return; // Keine weitere Update-Prüfung nötig
      }

      // Check for waiting worker (update already downloaded)
      if (registration.waiting) {
        showUpdateNotification(registration);
      }

      // Handle updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // New update available
            showUpdateNotification(registration);
          }
        });
      });

      // Periodisch nach Updates suchen (alle 60 Sekunden)
      setInterval(() => {
        registration.update();
      }, 60000);
    } catch (error) {
      // console.log("❌ Service Worker registration failed:", error);
    }
  }
}

function showUpdateNotification(registration) {
  // Prüfen ob User das Update bereits gesehen hat (für diese Session)
  if (sessionStorage.getItem("updateNotificationShown") === "true") {
    // console.log('⏭️ Update notification already shown this session');
    return;
  }

  // Markieren dass Notification angezeigt wurde
  sessionStorage.setItem("updateNotificationShown", "true");

  // Speichere die Registration für updateApp()
  window._swRegistration = registration;

  // console.log('🔔 Showing update notification (permanent until clicked)');

  // Create elegant update notification - BLEIBT DAUERHAFT
  const notification = document.createElement("div");
  notification.id = "update-notification";
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

// Beim Page Load prüfen ob Update verfügbar ist - NICHT MEHR NÖTIG mit neuer Logik
// function checkForPendingUpdate() { ... }

function updateApp() {
  // console.log('🔄 User clicked update button - activating new Service Worker');

  // Markiere dass Update angewendet wird (überlebt den Reload!)
  localStorage.setItem("swUpdateApplied", "true");

  // SessionStorage leeren
  sessionStorage.removeItem("updateNotificationShown");

  // Notification entfernen für bessere UX
  const notification = document.getElementById("update-notification");
  if (notification) {
    notification.remove();
  }

  // Hole die gespeicherte Registration
  const registration = window._swRegistration;

  if (registration && registration.waiting) {
    // Warte auf Controller-Wechsel bevor Reload
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });

    // Aktiviere den wartenden Service Worker
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
  } else if (navigator.serviceWorker.controller) {
    // Fallback: Sende an aktuellen Controller
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
    navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });

    // Fallback Timeout falls controllerchange nicht feuert
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    // Kein Service Worker - einfach reloaden
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
// WHATSAPP STANDORTAUSWAHL MODAL
// =================================================================================

/**
 * WhatsApp Modal Funktionen für Standortauswahl
 * Zeigt Modal bei Klick auf WhatsApp-Button
 * Nutzer kann zwischen Hamburg Mitte und Bergedorf wählen
 */

// WhatsApp Modal öffnen
function showWhatsAppModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById("whatsapp-modal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
  return false; // Prevent default link behavior
}

// WhatsApp Modal schließen
function closeWhatsAppModal() {
  const modal = document.getElementById("whatsapp-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Re-enable scrolling (empty = browser default)
  }
  return false;
}

// =================================================================================
// TELEFON MODAL FUNKTIONEN (Standortauswahl)
// =================================================================================

// Telefon Modal öffnen
function showTelefonModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById("telefon-modal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
  return false; // Prevent default link behavior
}

// Telefon Modal schließen
function closeTelefonModal() {
  const modal = document.getElementById("telefon-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Re-enable scrolling (empty = browser default)
  }
  return false;
}

// WhatsApp Chat mit gewähltem Standort öffnen
function openWhatsApp(standort) {
  let phoneNumber;

  if (standort === "mitte") {
    phoneNumber = "4917631065840"; // Hamburg Mitte
  } else if (standort === "bergedorf") {
    phoneNumber = "4915561355146"; // Bergedorf
  }

  if (!phoneNumber) {
    return false;
  }

  // Modal schließen ZUERST
  closeWhatsAppModal();

  // WhatsApp öffnen in neuem Tab (nach kleiner Verzögerung)
  setTimeout(function () {
    window.open(
      `https://wa.me/${phoneNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, 100);

  return false;
}

// Initialize WhatsApp Modal Event Listeners after DOM is ready
function initWhatsAppModal() {
  const modal = document.getElementById("whatsapp-modal");

  if (modal) {
    // Modal schließen bei Klick außerhalb
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeWhatsAppModal();
      }
    });

    // ESC-Taste zum Schließen
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const modalStyle = window.getComputedStyle(modal);
        if (modalStyle.display !== "none") {
          closeWhatsAppModal();
        }
      }
    });
  }
}

// =================================================================================
// MULTI-STEP POPUP FORMULAR
// =================================================================================

let currentPopupStep = 1;
const totalPopupSteps = 5;

// Popup öffnen
function openPopupForm() {
  const overlay = document.getElementById("popup-form-overlay");
  if (overlay) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    currentPopupStep = 1;
    showPopupStep(1);
    updatePopupProgress(1);
  }
  return false;
}

// Popup schließen
function closePopupForm() {
  const overlay = document.getElementById("popup-form-overlay");
  if (overlay) {
    overlay.style.display = "none";
    document.body.style.overflow = ""; // Re-enable scrolling
    resetPopupForm();
  }
  return false;
}

// ========================================
// KARRIERE MODAL FUNCTIONS
// ========================================

// Karriere Modal öffnen
function openKarriereModal() {
  const modal = document.getElementById("karriere-modal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
  return false;
}

// Karriere Modal schließen
function closeKarriereModal() {
  const modal = document.getElementById("karriere-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Re-enable scrolling
    resetKarriereForm();
  }
  return false;
}

// Karriere Formular zurücksetzen
function resetKarriereForm() {
  const form = document.getElementById("karriere-form");
  if (form) {
    form.reset();
  }
}

// ========================================
// END KARRIERE MODAL FUNCTIONS
// ========================================

// Formular zurücksetzen
function resetPopupForm() {
  const form = document.getElementById("popup-form");
  if (form) {
    form.reset();
  }
  currentPopupStep = 1;
  showPopupStep(1);
  updatePopupProgress(1);

  // Alle Fehlermeldungen entfernen
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => (msg.textContent = ""));
}

// Step anzeigen
function showPopupStep(stepNumber) {
  const steps = document.querySelectorAll(".form-step");
  steps.forEach((step) => {
    if (parseInt(step.getAttribute("data-step")) === stepNumber) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

// Progress Bar aktualisieren
function updatePopupProgress(stepNumber) {
  const progressFill = document.getElementById("progress-fill");
  const progressSteps = document.querySelectorAll(".progress-steps .step");

  // Progress Fill Width
  const percentage = (stepNumber / totalPopupSteps) * 100;
  if (progressFill) {
    progressFill.style.width = percentage + "%";
  }

  // Step Indicators
  progressSteps.forEach((step) => {
    const stepNum = parseInt(step.getAttribute("data-step"));
    if (stepNum < stepNumber) {
      step.classList.add("completed");
      step.classList.remove("active");
    } else if (stepNum === stepNumber) {
      step.classList.add("active");
      step.classList.remove("completed");
    } else {
      step.classList.remove("active", "completed");
    }
  });
}

// Nächster Step
function nextStep(fromStep) {
  if (validatePopupStep(fromStep)) {
    currentPopupStep = fromStep + 1;
    showPopupStep(currentPopupStep);
    updatePopupProgress(currentPopupStep);
  }
}

// Vorheriger Step
function prevStep(fromStep) {
  currentPopupStep = fromStep - 1;
  showPopupStep(currentPopupStep);
  updatePopupProgress(currentPopupStep);
}

// Validierung für jeden Step
function validatePopupStep(stepNumber) {
  let isValid = true;
  let errorMsg = "";

  // Clear previous errors
  const errorElement = document.getElementById(
    `error-${getFieldName(stepNumber)}`
  );
  if (errorElement) {
    errorElement.textContent = "";
  }

  switch (stepNumber) {
    case 1: // Name
      const name = document.getElementById("popup-name").value.trim();
      if (name === "") {
        errorMsg = "Bitte geben Sie Ihren Namen ein.";
        isValid = false;
      } else if (name.length < 2) {
        errorMsg = "Der Name ist zu kurz.";
        isValid = false;
      }
      if (!isValid && errorElement) {
        errorElement.textContent = errorMsg;
      }
      break;

    case 2: // Email
      const email = document.getElementById("popup-email").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "") {
        errorMsg = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
        isValid = false;
      } else if (!emailRegex.test(email)) {
        errorMsg = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
        isValid = false;
      }
      if (!isValid && errorElement) {
        errorElement.textContent = errorMsg;
      }
      break;

    case 3: // Phone (PFLICHTFELD basierend auf Google Ads Brief)
      const phone = document.getElementById("popup-phone").value.trim();
      if (phone === "") {
        errorMsg = "Bitte geben Sie Ihre Telefonnummer ein.";
        isValid = false;
      } else if (phone.length < 6) {
        errorMsg = "Die Telefonnummer ist zu kurz.";
        isValid = false;
      }
      if (!isValid && errorElement) {
        errorElement.textContent = errorMsg;
      }
      break;

    case 4: // Führerscheinklasse
      const klasse = document.getElementById("popup-klasse").value;
      if (klasse === "") {
        errorMsg = "Bitte wählen Sie eine Führerscheinklasse.";
        isValid = false;
      }
      if (!isValid && errorElement) {
        errorElement.textContent = errorMsg;
      }
      break;

    case 5: // Standort
      const standort = document.getElementById("popup-standort").value;
      if (standort === "") {
        errorMsg = "Bitte wählen Sie einen Standort.";
        isValid = false;
      }
      if (!isValid && errorElement) {
        errorElement.textContent = errorMsg;
      }
      break;
  }

  return isValid;
}

// Helper: Feldname für Error-Element
function getFieldName(stepNumber) {
  const fieldNames = {
    1: "name",
    2: "email",
    3: "phone",
    4: "klasse",
    5: "standort",
  };
  return fieldNames[stepNumber] || "";
}

// Form Submit Handler mit Email-Routing basierend auf Standort
function initPopupFormHandling() {
  const form = document.getElementById("popup-form");
  const standortSelect = document.getElementById("popup-standort");

  if (form) {
    configureWeb3FormsRouting(form, standortSelect);
  }
}

// Event Listeners für Popup
function initPopupFormEvents() {
  const overlay = document.getElementById("popup-form-overlay");

  if (overlay) {
    // Click außerhalb schließt Popup
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closePopupForm();
      }
    });

    // ESC-Taste zum Schließen
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const overlayStyle = window.getComputedStyle(overlay);
        if (overlayStyle.display !== "none") {
          closePopupForm();
        }
      }
    });
  }
}

// Event Listeners für Karriere Modal
function initKarriereModalEvents() {
  const modal = document.getElementById("karriere-modal");
  const form = document.getElementById("karriere-form");
  const standortSelect = form?.querySelector("#karriere-standort");

  if (modal) {
    // Click außerhalb schließt Modal
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeKarriereModal();
      }
    });

    // ESC-Taste zum Schließen
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const modalStyle = window.getComputedStyle(modal);
        if (modalStyle.display !== "none") {
          closeKarriereModal();
        }
      }
    });

    // Web3Forms Routing nach Standort
    if (form) {
      configureWeb3FormsRouting(form, standortSelect);
    }
  }
}

// =================================================================================
// INITALISIERUNG ABGESCHLOSSEN
// =================================================================================

// FormSubmit.co funktioniert am besten mit nativen Form-Submissions
// document.addEventListener("DOMContentLoaded", initAdvancedFormHandling);
