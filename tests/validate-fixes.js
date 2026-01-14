/**
 * 🧪 Validation Script - Event Listener & Initialization Fixes
 *
 * Führe dieses Skript in der Browser DevTools Console aus, um alle Fixes zu validieren.
 *
 * Usage:
 * 1. Öffne http://localhost:8080/index.html
 * 2. Öffne DevTools Console (Cmd+Option+I)
 * 3. Kopiere diesen gesamten Script-Inhalt in die Console
 * 4. Drücke Enter
 */

(function() {
  // Dieses Script ist primär für die Browser-DevTools-Console gedacht.
  // Wenn es versehentlich via Node ausgeführt wird, sauber beenden.
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.log('🧪 AcademyNow Fix Validation Script');
    console.log('Dieses Script ist für die Browser-DevTools Console gedacht (window/document fehlen hier).');
    if (typeof process !== 'undefined' && typeof process.exit === 'function') {
      process.exit(0);
    }
    return;
  }

  console.clear();
  console.log('%c🧪 AcademyNow Fix Validation Script', 'font-size: 20px; font-weight: bold; color: #0A214A');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #0A214A');

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
  };

  function logTest(name, passed, message, isWarning = false) {
    const emoji = passed ? '✅' : (isWarning ? '⚠️' : '❌');
    const color = passed ? '#4CAF50' : (isWarning ? '#FF9800' : '#f44336');

    console.log(`${emoji} ${name}`, message ? `\n   ${message}` : '');

    results.tests.push({ name, passed, message, isWarning });
    if (passed) results.passed++;
    else if (isWarning) results.warnings++;
    else results.failed++;
  }

  console.log('\n%c📋 Test 1: Initialization Guard', 'font-weight: bold; color: #2196F3');
  console.log('─────────────────────────────────────────────────────');

  // Check if isInitialized flag exists (sollte im closure sein, aber wir testen das Verhalten)
  const initScriptContent = document.querySelector('script[src*="main.js"]');
  if (initScriptContent) {
    logTest('main.js geladen', true, initScriptContent.src);
  } else {
    logTest('main.js geladen', false, 'main.js Script-Tag nicht gefunden');
  }

  console.log('\n%c📋 Test 2: Form ID Resolution', 'font-weight: bold; color: #2196F3');
  console.log('─────────────────────────────────────────────────────');

  const kontaktFormHome = document.getElementById('kontaktForm-home');
  const kontaktFormUeber = document.getElementById('kontaktForm-ueber');
  const kontaktFormOld = document.getElementById('kontaktForm');

  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    logTest('kontaktForm-home existiert', !!kontaktFormHome, kontaktFormHome ? kontaktFormHome.id : 'Nicht gefunden');
    logTest('Kein kontaktForm Duplikat', !kontaktFormOld, kontaktFormOld ? '⚠️ Altes ID gefunden!' : 'Gut - nur neue IDs');
  } else if (window.location.pathname.includes('ueber-uns.html')) {
    logTest('kontaktForm-ueber existiert', !!kontaktFormUeber, kontaktFormUeber ? kontaktFormUeber.id : 'Nicht gefunden');
    logTest('Kein kontaktForm Duplikat', !kontaktFormOld, kontaktFormOld ? '⚠️ Altes ID gefunden!' : 'Gut - nur neue IDs');
  }

  const anyForm = kontaktFormHome || kontaktFormUeber || kontaktFormOld;
  if (anyForm) {
    logTest('Formular auflösbar', true, `Gefunden: ${anyForm.id}`);

    // Check dataset flag
    if (anyForm.dataset.listenerAdded) {
      logTest('dataset.listenerAdded Flag gesetzt', true, 'Event Listener Guard aktiv');
    } else {
      logTest('dataset.listenerAdded Flag gesetzt', false, 'Flag nicht gefunden - Event Listener evtl. nicht initialisiert', true);
    }
  }

  console.log('\n%c📋 Test 3: Script Version Consistency', 'font-weight: bold; color: #2196F3');
  console.log('─────────────────────────────────────────────────────');

  const mainJsScript = document.querySelector('script[src*="main.js"]');
  if (mainJsScript) {
    const url = new URL(mainJsScript.src, window.location.href);
    const version = url.searchParams.get('v');
    if (version) {
      logTest('Script Version (v=...) gesetzt', true, `v=${version}`);
    } else {
      logTest('Script Version (v=...) gesetzt', false, 'Kein v= Parameter gefunden', true);
    }
  } else {
    logTest('Script Version (v=...) gesetzt', false, 'main.js nicht gefunden');
  }

  console.log('\n%c📋 Test 4: Google Tag Manager / gtag.js', 'font-weight: bold; color: #2196F3');
  console.log('─────────────────────────────────────────────────────');

  if (typeof window.dataLayer !== 'undefined') {
    logTest('dataLayer initialisiert', Array.isArray(window.dataLayer), `Typ: ${Array.isArray(window.dataLayer) ? 'Array' : typeof window.dataLayer}`);
    logTest('dataLayer hat Einträge', window.dataLayer.length > 0, `${window.dataLayer.length} Einträge`);
  } else {
    logTest('dataLayer initialisiert', false, 'window.dataLayer nicht gefunden');
  }

  if (typeof gtag === 'function') {
    logTest('gtag() Funktion existiert', true, 'gtag.js geladen');
  } else {
    logTest('gtag() Funktion existiert', false, 'gtag() nicht verfügbar', true);
  }

  console.log('\n%c📋 Test 5: Service Worker', 'font-weight: bold; color: #2196F3');
  console.log('─────────────────────────────────────────────────────');

  if ('serviceWorker' in navigator) {
    logTest('Service Worker unterstützt', true, 'Browser unterstützt SW');

    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        console.log('   ✅ Service Worker registriert:', registration.active?.scriptURL || 'aktivierend...');
      } else {
        console.log('   ⚠️ Service Worker nicht registriert (normal beim ersten Load)');
      }
    });
  } else {
    logTest('Service Worker unterstützt', false, 'Browser unterstützt kein SW');
  }

  console.log('\n%c📋 Test 6: PWA Install Prompt', 'font-weight: bold; color: #2196F3');
  console.log('─────────────────────────────────────────────────────');

  if ('beforeinstallprompt' in window) {
    logTest('beforeinstallprompt unterstützt', true, 'PWA Install möglich');
  } else {
    logTest('beforeinstallprompt unterstützt', false, 'Browser unterstützt kein PWA Install', true);
  }

  console.log('\n%c📋 Test 7: Google Reviews Container', 'font-weight: bold; color: #2196F3');
  console.log('─────────────────────────────────────────────────────');

  const reviewsContainer = document.getElementById('google-reviews-container');
  if (reviewsContainer) {
    logTest('Google Reviews Container existiert', true, 'Container gefunden');
  } else {
    logTest('Google Reviews Container existiert', false, 'Nicht auf dieser Seite (normal für ueber-uns.html)', true);
  }

  console.log('\n%c📋 Test 8: Navigation Elements', 'font-weight: bold; color: #2196F3');
  console.log('─────────────────────────────────────────────────────');

  const mainNav = document.getElementById('main-navigation');
  if (mainNav) {
    logTest('Hauptnavigation existiert', true, 'Navigation gefunden');

    const navLinks = mainNav.querySelectorAll('.nav-link');
    logTest('Navigation-Links vorhanden', navLinks.length > 0, `${navLinks.length} Links gefunden`);
  } else {
    logTest('Hauptnavigation existiert', false, 'Navigation nicht gefunden');
  }

  // Summary
  console.log('\n%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #0A214A');
  console.log('%c📊 Test Summary', 'font-size: 18px; font-weight: bold; color: #0A214A');
  console.log('─────────────────────────────────────────────────────');

  const totalTests = results.passed + results.failed + results.warnings;
  console.log(`%c✅ Passed: ${results.passed}/${totalTests}`, 'color: #4CAF50; font-weight: bold');
  console.log(`%c❌ Failed: ${results.failed}/${totalTests}`, 'color: #f44336; font-weight: bold');
  console.log(`%c⚠️  Warnings: ${results.warnings}/${totalTests}`, 'color: #FF9800; font-weight: bold');

  if (results.failed === 0) {
    console.log('\n%c🎉 ALLE TESTS BESTANDEN! 🎉', 'font-size: 16px; font-weight: bold; color: #4CAF50; background: #E8F5E9; padding: 10px;');
  } else {
    console.log('\n%c⚠️  EINIGE TESTS FEHLGESCHLAGEN', 'font-size: 16px; font-weight: bold; color: #f44336; background: #FFEBEE; padding: 10px;');
  }

  console.log('\n%c📝 Nächste Schritte:', 'font-weight: bold');
  console.log('1. Formular testen: Scrolle zu #kontakt und fülle das Formular aus');
  console.log('2. bfcache testen: Navigiere zu /ueber-uns.html und dann zurück mit Browser-Back');
  console.log('3. Console beobachten: Achte auf "⏭️ App already initialized" Meldungen');
  console.log('4. Netzwerk-Tab: Prüfe ob nur 1 API-Call zu Google Reviews erfolgt');

  console.log('\n%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #0A214A');

  // Return results for programmatic access
  return results;
})();
