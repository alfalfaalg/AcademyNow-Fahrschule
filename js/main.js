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

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function(e) {
        e.preventDefault();
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherIcon = otherItem.querySelector('.faq-icon');
            if (otherIcon) otherIcon.textContent = '+';
          }
        });
        const isActive = item.classList.contains('active');
        const icon = item.querySelector('.faq-icon');
        if (isActive) {
          item.classList.remove('active');
          if (icon) icon.textContent = '+';
        } else {
          item.classList.add('active');
          if (icon) icon.textContent = '−';
        }
      });
    }
  });

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

  // Kontaktformular Validierung
  const kontaktForm = document.getElementById('kontaktForm');
  if (kontaktForm) {
    kontaktForm.addEventListener('submit', (e) => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('nachricht').value.trim();
      if (!name || !email || !message) {
        e.preventDefault();
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
      }
    });
  }

  // =================================================================================
  // INITALISIERUNG ABGESCHLOSSEN
  // =================================================================================
  
});