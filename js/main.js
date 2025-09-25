// =================================================================================
// FUNKTIONEN FÜR DIE "COMING SOON"-SEITE
// =================================================================================

function updateClock() {
  const clockElement = document.getElementById('clock');
  const dateElement = document.getElementById('date');
  if (clockElement && dateElement) {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString('de-DE');
    dateElement.textContent = now.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
  const devLink = document.getElementById('dev-link');
  if (devLink) {
    let attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
    const maxAttempts = 3;
    devLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (attempts >= maxAttempts) {
        alert('Zu viele falsche Versuche. Zugriff dauerhaft verweigert.');
        localStorage.setItem('blocked', 'true');
        return;
      }
      if (localStorage.getItem('blocked') === 'true') {
        alert('Ihr Zugriff wurde gesperrt. Bitte kontaktieren Sie den Administrator.');
        return;
      }
      const pw = prompt('Bitte Passwort eingeben:');
      if (pw === '!!Projekt2025') {
        sessionStorage.setItem('authed', '1');
        localStorage.setItem('authed', '1');
        localStorage.removeItem('blocked');
        localStorage.removeItem('loginAttempts');
        setTimeout(function() {
          window.location.href = 'index.html';
        }, 100);
      } else {
        attempts++;
        localStorage.setItem('loginAttempts', attempts.toString());
        const remainingAttempts = maxAttempts - attempts;
        if (remainingAttempts > 0) {
          alert(`Falsches Passwort! Noch ${remainingAttempts} Versuch(e) übrig.`);
        } else {
          alert('Zu viele falsche Versuche. Zugriff verweigert.');
          localStorage.setItem('blocked', 'true');
        }
      }
    });
  }
}

// =================================================================================
// AUTHENTIFIZIERUNGSFUNKTION
// =================================================================================

function checkAuthentication() {
  if (window.location.pathname.includes('index.html') ||
      window.location.pathname.endsWith('/') ||
      window.location.pathname === '') {
    const isAuthenticated = sessionStorage.getItem('authed') === '1' ||
                           localStorage.getItem('authed') === '1';
    if (!isAuthenticated) {
      // window.location.replace('coming-soon.html');
      return false;
    } else {
      sessionStorage.setItem('authed', '1');
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
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animationObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observer für Lazy Loading von Bildern
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
        }
        imageObserver.unobserve(img);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '50px 0px'
  });

  // Observer für Critical Content Preloading
  const preloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        // Preload next section resources
        preloadNextSectionResources(section);
        preloadObserver.unobserve(section);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '200px 0px'
  });

  // Animierbare Elemente beobachten
  document.querySelectorAll('.section, .preis-card, .leistung-item, .stelle-card').forEach(el => {
    animationObserver.observe(el);
  });

  // Lazy Load Bilder beobachten
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  // Section Preloading beobachten
  document.querySelectorAll('.section').forEach(section => {
    preloadObserver.observe(section);
  });
}

function preloadNextSectionResources(currentSection) {
  const sectionId = currentSection.id;
  // Preload resources based on upcoming sections
  if (sectionId === 'preise') {
    // Preload contact form resources
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'https://formsubmit.co/';
    document.head.appendChild(link);
  }
}

function initProgressiveImageLoading() {
  const heroBackground = document.querySelector('.hero-background');
  if (!heroBackground) return;
  
  // Add loading class for shimmer effect
  heroBackground.classList.add('loading');
  
  // Create high-res image
  const highResImage = new Image();
  highResImage.onload = function() {
    // Remove loading class
    heroBackground.classList.remove('loading');
    
    // Add loaded class with smooth transition
    setTimeout(() => {
      heroBackground.classList.add('loaded');
    }, 100);
  };
  
  highResImage.onerror = function() {
    console.error('❌ Failed to load hero image');
    heroBackground.classList.remove('loading');
  };
  
  // Start loading the high-resolution image
  highResImage.src = 'images/heroBackground/mercedes-hero-optimized.jpg';
}

// =================================================================================
// FUNKTIONEN FÜR DIE HAUPTSEITE (UI-Interaktionen und Effekte)
// =================================================================================

function lazyLoadMaps() {
  const mapIframes = document.querySelectorAll('iframe.maps-iframe[data-src]');
  if (mapIframes.length === 0) return;
  const loadMap = (iframe) => {
    if (iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
      iframe.removeAttribute('data-src');
    }
  };
  if ('IntersectionObserver' in window) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMap(entry.target);
          mapObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });
    mapIframes.forEach(iframe => {
      mapObserver.observe(iframe);
    });
  } else {
    mapIframes.forEach(iframe => {
      loadMap(iframe);
    });
  }
}

// ========== INITIALISIERUNG ==========

document.addEventListener('DOMContentLoaded', function() {
  
  // Progressive Image Loading for Hero Background
  initProgressiveImageLoading();
  
  // Initialize Intersection Observer
  initIntersectionObserver();
  
  // Service Worker Registration
  registerServiceWorker();
  
  // 1. Mobile Navigation
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('nav[aria-label="Hauptnavigation"] ul');
  const navLinks = document.querySelectorAll('nav[aria-label="Hauptnavigation"] ul li a.nav-link');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
    });

    // Schließen des Menüs beim Klicken außerhalb
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') &&
          !navMenu.contains(e.target) &&
          e.target !== menuBtn) {
        navMenu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', false);
      }
    });
  }

  // === Dynamische Navigation: Aktiven Menüpunkt beim Scrollen und Klick setzen ===
  const navLinksArr = Array.from(navLinks);
  const sectionIds = navLinksArr
    .map(link => link.getAttribute('href'))
    .filter(href => href && href.startsWith('#'))
    .map(href => href.slice(1));
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActiveNavOnScroll() {
    const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;
    const scrollPos = window.scrollY + headerHeight + 40;
    let currentSectionIndex = 0;

    sections.forEach((section, idx) => {
      if (section.offsetTop <= scrollPos) {
        currentSectionIndex = idx;
      }
    });

    navLinksArr.forEach((link, idx) => {
      if (idx === currentSectionIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNavOnScroll, { passive: true });
  setActiveNavOnScroll();

  // Beim Klick auf einen Menüpunkt: active sofort setzen und smooth scroll
  navLinksArr.forEach((link, idx) => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;
          const offset = headerHeight + 20;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
      navLinksArr.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      // Menü auf Mobil schließen
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', false);
      }
    });

    // Touch-Feedback für mobile Geräte
    link.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    }, { passive: true });
    link.addEventListener('touchend', function() {
      setTimeout(() => {
        this.classList.remove('touch-active');
      }, 150);
    }, { passive: true });
  });

  // 2. FAQ Accordion mit verbesserter Accessibility
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      // Keyboard-Unterstützung für FAQ
      question.addEventListener('click', function(e) {
        e.preventDefault();
        toggleFaqItem(item, question, answer);
      });
      
      // Keyboard-Navigation (Enter und Space)
      question.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFaqItem(item, question, answer);
        }
      });
      
      // Ensure button is focusable
      if (question.tagName === 'BUTTON') {
        question.setAttribute('tabindex', '0');
      }
    }
  });
  
  function toggleFaqItem(item, question, answer) {
    // Andere FAQ-Items schließen
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        const otherQuestion = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon');
        
        otherItem.classList.remove('active');
        if (otherIcon) otherIcon.textContent = '+';
        if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.style.display = 'none';
      }
    });
    
    const isActive = item.classList.contains('active');
    const icon = item.querySelector('.faq-icon');
    
    if (isActive) {
      // FAQ schließen
      item.classList.remove('active');
      if (icon) icon.textContent = '+';
      if (question) question.setAttribute('aria-expanded', 'false');
      if (answer) answer.style.display = 'none';
    } else {
      // FAQ öffnen
      item.classList.add('active');
      if (icon) icon.textContent = '−';
      if (question) question.setAttribute('aria-expanded', 'true');
      if (answer) answer.style.display = 'block';
    }
  }

  // 3. Scroll Indicator
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function(e) {
      e.preventDefault();
      const preiseSection = document.getElementById('preise');
      if (preiseSection) {
        const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;
        const offset = headerHeight + 30;
        const targetPosition = preiseSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // Authentifizierung prüfen
  if (!document.body.classList.contains('coming-soon-page')) {
    if (!checkAuthentication()) {
      return;
    }
  }

  // Lazy Loading für Maps
  lazyLoadMaps();

  // "Coming Soon"-Funktionen
  if (document.body.classList.contains('coming-soon-page')) {
    setInterval(updateClock, 1000);
    updateClock();
    setupDeveloperLogin();
  }

  // Erweiterte Formularfunktionen initialisieren
  initAdvancedFormHandling();

  // =================================================================================
  // INITALISIERUNG ABGESCHLOSSEN
  // =================================================================================
  
});

// =================================================================================
// SERVICE WORKER REGISTRATION
// =================================================================================

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) {
          return;
        }
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New update available
            showUpdateNotification();
          }
        });
      });
      
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  }
}

function showUpdateNotification() {
  if (document.querySelector('.update-notification')) {
    return;
  }

  const notification = document.createElement('div');
  notification.className = 'update-notification';
  notification.setAttribute('role', 'status');
  notification.setAttribute('aria-live', 'polite');

  const container = document.createElement('div');
  container.className = 'update-notification__container';

  const title = document.createElement('div');
  title.className = 'update-notification__title';
  title.textContent = 'Update verfügbar';

  const message = document.createElement('div');
  message.className = 'update-notification__message';
  message.textContent = 'Eine neue Version der App ist verfügbar.';

  const actions = document.createElement('div');
  actions.className = 'update-notification__actions';

  const updateButton = document.createElement('button');
  updateButton.type = 'button';
  updateButton.className = 'update-notification__button update-notification__button--primary';
  updateButton.textContent = 'Aktualisieren';
  updateButton.addEventListener('click', () => {
    updateApp();
    notification.remove();
  });

  const laterButton = document.createElement('button');
  laterButton.type = 'button';
  laterButton.className = 'update-notification__button update-notification__button--secondary';
  laterButton.textContent = 'Später';
  laterButton.addEventListener('click', () => {
    notification.remove();
  });

  actions.append(updateButton, laterButton);
  container.append(title, message, actions);
  notification.append(container);
  document.body.append(notification);
}

function updateApp() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
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
      
      // Header hide/show logic
      const header = document.getElementById('main-header');
      if (header) {
        if (scrollingDown && currentScrollY > 100) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      }
      
      // Scroll indicator fade
      const scrollIndicator = document.getElementById('scrollIndicator');
      if (scrollIndicator) {
        const opacity = Math.max(0, 1 - (currentScrollY / (window.innerHeight * 0.3)));
        scrollIndicator.style.opacity = opacity;
        scrollIndicator.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
}

// Use passive listeners for better performance
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// =================================================================================
// IMPROVED FORM HANDLING WITH VALIDATION
// =================================================================================

function initAdvancedFormHandling() {
  const form = document.getElementById('kontaktForm');
  if (!form) return;
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('input', debounce(validateField, 300));
    input.addEventListener('blur', validateField);
  });
  
  // Enhanced form submission
  form.addEventListener('submit', handleFormSubmission);
}

function validateField(eventOrElement) {
  const field = eventOrElement && 'target' in eventOrElement
    ? eventOrElement.target
    : eventOrElement;
  if (!field) {
    return false;
  }
  const value = field.value.trim();
  
  // Remove existing validation classes
  field.classList.remove('valid', 'invalid');
  
  let isValid = true;
  
  // Validation rules
  switch (field.type) {
    case 'email':
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      break;
    case 'tel':
      isValid = value === '' || /^[\d\s\-\+\(\)]+$/.test(value);
      break;
    default:
      if (field.required) {
        isValid = value.length > 0;
      }
  }
  
  // Apply validation class
  field.classList.add(isValid ? 'valid' : 'invalid');
  
  // Show/hide error message
  const errorElement = field.parentElement.querySelector('.error-message');
  if (!isValid && field.required) {
    if (!errorElement) {
      const error = document.createElement('div');
      error.className = 'error-message';
      error.textContent = getErrorMessage(field);
      field.parentElement.appendChild(error);
    }
  } else if (errorElement) {
    errorElement.remove();
  }

  return isValid;
}

function getErrorMessage(field) {
  switch (field.type) {
    case 'email':
      return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    case 'tel':
      return 'Bitte geben Sie eine gültige Telefonnummer ein.';
    default:
      return 'Dieses Feld ist erforderlich.';
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');

  const fields = Array.from(form.querySelectorAll('input, textarea, select'));
  let hasInvalidField = false;

  fields.forEach(field => {
    const result = validateField(field);
    if (field.required && !result) {
      hasInvalidField = true;
    }
  });

  if (hasInvalidField) {
    showMessage('Bitte füllen Sie alle Pflichtfelder korrekt aus.', 'error');
    const firstInvalid = fields.find(field => field.classList.contains('invalid'));
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }
  
  // Show loading state
  submitButton.textContent = 'Wird gesendet...';
  submitButton.disabled = true;
  
  // Collect form data
  const formData = new FormData(form);
  
  // Submit form (with potential offline queueing)
  submitFormData(formData, form)
    .then(() => {
      showSuccessMessage();
      form.reset();
    })
    .catch(error => {
      console.error('Form submission failed:', error);
      showErrorMessage();
    })
    .finally(() => {
      submitButton.textContent = 'Nachricht senden';
      submitButton.disabled = false;
    });
}

async function submitFormData(formData, form) {
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response;
  } catch (error) {
    // Queue for later if offline
    if (!navigator.onLine) {
      queueFormSubmission(formData);
      throw new Error('Formular wurde für die spätere Übertragung gespeichert.');
    }
    throw error;
  }
}

function queueFormSubmission(formData) {
  const submissions = JSON.parse(localStorage.getItem('queuedSubmissions') || '[]');
  submissions.push({
    data: Object.fromEntries(formData),
    timestamp: Date.now()
  });
  localStorage.setItem('queuedSubmissions', JSON.stringify(submissions));
}

function showSuccessMessage() {
  showMessage('✅ Nachricht erfolgreich gesendet!', 'success');
}

function showErrorMessage() {
  showMessage('❌ Fehler beim Senden. Bitte versuchen Sie es erneut.', 'error');
}

function showMessage(text, type) {
  const message = document.createElement('div');
  message.className = `form-alert form-alert--${type}`;
  message.textContent = text;

  document.body.append(message);

  setTimeout(() => {
    message.classList.add('form-alert--exit');
    message.addEventListener('animationend', () => {
      message.remove();
    }, { once: true });
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
