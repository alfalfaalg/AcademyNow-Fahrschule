# 🏎️ AcademyNow Fahrschule Website

Eine moderne, responsive Website für die **AcademyNow Fahrschule** in Hamburg mit vollständiger DSGVO-Konformität, PWA-Support und optimierten Hover-Effekten.

**Stand:** 27. November 2025
**Version:** 2.1.0 (City Logistiker, Dual-Standort Bewertungen, UI-Verbesserungen)

---

## ✨ Features

### Kern-Features

- 🎨 **Modernes Design** mit Premium-Schwarz/Orange Farbschema
- 📱 **Vollständig responsive** für alle Geräte (Mobile-First)
- 🔐 **DSGVO-konform** mit Google Consent Mode v2 + Cookie Yes
- ⚡ **PWA-ready** mit Service Worker & Offline-Support
- 🎯 **SEO-optimiert** mit strukturierten Daten (Schema.org)
- 🔄 **bfcache-kompatibel** für blitzschnelle Back/Forward Navigation

### Technische Highlights

- ✅ **Event Listener Guards** - Keine doppelten Form-Submissions
- ✅ **Smooth Hover-Effekte** - Material Design cubic-bezier Transitions
- ✅ **Google Reviews Integration** mit 6h Caching (Places API, gültiger Key nötig)
- ✅ **Dual-Standort Bewertungen** - Hamburg Mitte & Bergedorf separat
- ✅ **Web3Forms** Integration für Kontakt-/Bewerbungs-Popups
- ✅ **Google Tag Manager** + Consent Mode v2
- ✅ **Einheitliche SVG-Icons** - Font Awesome 6.4.0 durchgängig
- ✅ **City Logistiker Sektion** - 100% geförderte Führerscheine
- ✅ **3x2 Grid-Layout** für Führerscheinklassen (symmetrisch)

---

## 🚀 Schnellstart

### Lokale Entwicklung

```bash
# Repository öffnen
cd /Users/idris/_Coding_01/AcademyNowProject-Fahrschule

# Lokalen Server starten
python3 -m http.server 8080

# Browser öffnen
open http://localhost:8080
```

### VS Code Live Server

1. Installiere "Live Server" Extension
2. Rechtsklick auf `index.html` → "Open with Live Server"
3. Öffnet automatisch im Browser

---

## 🏗️ Projektstruktur

```
📁 AcademyNow-Fahrschule/
├── 📄 index.html                 # Hauptseite (Startseite)
├── 📄 danke.html                 # Danke-Seite (nach Formular)
├── 📄 impressum.html             # Impressum
├── 📄 datenschutz.html           # Datenschutzerklärung
├── 📄 manifest.json              # PWA Manifest
├── 📄 sw.js                      # Service Worker
│
├── 📁 css/
│   ├── styles.css                # Haupt-Stylesheet
│   └── mobile.css                # Mobile-spezifische Styles
│
├── 📁 js/
│   ├── main.js                   # Haupt-JavaScript (Event Listener Guards)
│   ├── google-reviews.js         # Google Reviews API Integration
│   ├── cookie-banner.js          # Cookie Consent Handler
│   └── pwa-install.js            # PWA Install Prompt Handler
│
├── 📁 images/
│   ├── logo_neu.webp             # Hauptlogo
│   ├── logo_favicon.png/webp    # Favicons
│   ├── logo_social.png           # Social Media Sharing
│   └── 📁 heroBackground/        # Hero Background Bilder
│
├── 📁 tests/                     # Test-Dateien (optional)
│   ├── README.md                 # Test-Dokumentation
│   ├── TEST_REPORT.md            # Automatisierte Test-Validierung
│   ├── FIX_SUMMARY.md            # Event Listener Fix Dokumentation
│   └── validate-fixes.js         # Browser Console Validation
│
├── 📄 README.md                  # Diese Datei
└── 📄 CHANGELOG.md               # Vollständige Änderungs-Historie
```

---

## 🎨 Design-System

### Farben

```css
/* Premium-Schwarz (NEU - Logo-Update) */
--primary: #15171c; /* Elegantes Anthrazit-Schwarz */
--primary-light: #1f2128; /* Hover-Variante */

/* Orange-Akzente */
--accent: #e88c4a; /* Wärme & Aktivierung */
--accent-dark: #c4742e; /* CTA-Hover */
--accent-gold: #d1b17c; /* Seriöser Goldton */

/* Schatten */
--card-shadow-base: 0 6px 20px rgba(0, 0, 0, 0.12);
--card-shadow-hover: 0 18px 36px rgba(0, 0, 0, 0.22);
```

### Typografie

- **Headings:** Playfair Display (serif) - Elegant & Professionell
- **Body:** Inter (sans-serif) - Modern & Lesbar
- **Buttons:** Montserrat (sans-serif) - Stark & Klar

### Smooth Hover-Transitions

Alle interaktiven Elemente verwenden **Material Design** cubic-bezier:

```css
transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s
    cubic-bezier(0.4, 0, 0.2, 1);
```

**Effekt:** Butterweiche "floating" Animation bei Hover

---

## 🔧 Technische Details

### Event Listener Guards (🆕)

**Problem behoben:** Kontaktformular sendete 2-3 E-Mails pro Submission

**Lösung:**

```javascript
// Global Flag
let isInitialized = false;

function initializeApp() {
  if (isInitialized) return; // Guard

  const form = document.getElementById("kontaktForm-home");
  if (form && !form.dataset.listenerAdded) {
    form.dataset.listenerAdded = "true"; // Guard
    form.addEventListener("submit", handleSubmit);
  }

  isInitialized = true;
}
```

**Dateien:**

- `/js/main.js` - Haupt-Initialisierung
- `/js/google-reviews.js` - Reviews Guard
- `/js/pwa-install.js` - PWA Prompt Guard

### bfcache Kompatibilität (🆕)

**Problem behoben:** App funktionierte nicht nach Browser Back/Forward

**Lösung:**

```javascript
// DOMContentLoaded feuert NICHT bei bfcache restore
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    // Page aus bfcache wiederhergestellt
    console.log("🔄 Page restored from bfcache");
    // Refresh dynamic content
    loadGoogleReviews();
  }
});
```

### Form ID-Struktur (🆕)

**Unique IDs über alle Seiten:**

- `index.html` → `id="kontaktForm-home"`
- `ueber-uns.html` → `id="kontaktForm-ueber"`

**Fallback-Support:**

```javascript
const form =
  document.getElementById("kontaktForm-home") ||
  document.getElementById("kontaktForm-ueber") ||
  document.getElementById("kontaktForm"); // Legacy
```

---

## 🔒 DSGVO & Datenschutz

### Google Consent Mode v2 (✅ Aktiv)

```javascript
// Consent Mode v2 - DSGVO konform
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  security_storage: "granted",
  wait_for_update: 500,
});
```

### Cookie Yes Integration

- Cookie-Banner mit 3 Consent-Levels
- Automatisches GTM/Analytics Blocking
- EU-DSGVO konform

### FormSubmit.co

- **DSGVO-konform** - EU-Server
- Kein Backend nötig
- E-Mail Weiterleitung an: `kontakt@academynow-fahrschule.de`
- CC an: `kontakt2@academynow-fahrschule.de`

---

## 📱 PWA Features

### Manifest (`manifest.json`)

```json
{
  "name": "AcademyNow Fahrschule Hamburg",
  "short_name": "AcademyNow",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#15171c",
  "background_color": "#ffffff"
}
```

### Service Worker (`sw.js`)

- **Offline-Support** für alle Hauptseiten
- **Cache-First** Strategie für Assets
- **Network-First** für HTML/API Calls
- Cache-Version: `v2025-10-14-duplicate-fix`

### Install Prompt

```javascript
// PWA Install Banner (nur 1x pro Session)
let installPromptShown = false;

window.addEventListener("beforeinstallprompt", (e) => {
  if (installPromptShown) return; // Guard

  setTimeout(() => {
    showInstallPrompt(e);
    installPromptShown = true;
  }, 10000);
});
```

---

## 🧪 Testing

### Automatisierte Tests

**Browser Test-Suite:**

```bash
# Interaktive Tests im Browser öffnen
open .tests/TEST_FIXES.html
```

**Console Validation:**

```bash
# 1. Öffne http://localhost:8080
# 2. DevTools Console öffnen (Cmd+Option+I)
# 3. Kopiere Inhalt von .tests/validate-fixes.js in Console
# 4. Führe aus
```

**Erwartete Ausgabe:**

```
🧪 AcademyNow Fix Validation Script
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ main.js geladen
✅ kontaktForm-home existiert
✅ Kein kontaktForm Duplikat
✅ Formular auflösbar
✅ dataset.listenerAdded Flag gesetzt
✅ Script Version aktuell
✅ dataLayer initialisiert
✅ gtag() Funktion existiert

📊 Test Summary: ✅ Passed: 8/8
```

### Manuelle Test-Szenarien

#### Test 1: Formular Single-Submission

1. Öffne `http://localhost:8080/index.html#kontakt`
2. Fülle Formular aus (Name, E-Mail, Nachricht)
3. Aktiviere Datenschutz-Checkbox
4. Submit
5. **Erwartung:**
   - ✅ Nur 1 E-Mail empfangen
   - ✅ Button wird disabled
   - ✅ Redirect zu danke.html

#### Test 2: bfcache Navigation

1. Öffne `http://localhost:8080/index.html`
2. DevTools Console öffnen
3. Sollte zeigen: `✅ Initializing AcademyNow App...`
4. Navigiere zu `/ueber-uns.html`
5. Browser-Zurück-Button klicken
6. **Erwartung:**
   - ✅ Console: `⏭️ App already initialized, skipping...`
   - ✅ Console: `🔄 Page restored from bfcache`
   - ✅ Keine doppelte Initialisierung

#### Test 3: Google Reviews

1. Öffne `http://localhost:8080/index.html`
2. Network Tab öffnen
3. Scrolle zu Google Reviews Bereich
4. **Erwartung:**
   - ✅ Nur 1 API-Request zu allorigins.win
5. Navigiere weg und zurück (bfcache)
6. **Erwartung:**
   - ✅ Console: `🔄 Google Reviews: Page restored from bfcache, refreshing...`
   - ✅ Reviews werden aktualisiert

#### Test 4: PWA Install Prompt

1. Öffne im Incognito/Private Mode
2. Warte 10 Sekunden
3. **Erwartung:** Install-Banner erscheint (wenn PWA-fähig)
4. Banner schließen ("Nicht jetzt")
5. Seite neu laden (F5)
6. **Erwartung:**
   - ✅ Banner erscheint **NICHT** erneut
   - ✅ Console: `⏭️ PWA: Install prompt already shown this session`

#### Test 5: Hover-Effekte (Smooth)

1. Teste folgende Bereiche:
   - **Startseite → Standorte:** Hover über Standort-Cards
   - **Über uns → Highlights:** Hover über 3 Blöcke
   - **Preise:** Hover über Preiskarten
   - **Karriere:** Hover über Stellenkarten
   - **Alle Buttons:** Header, Hero, Formulare
2. **Erwartung:**
   - ✅ Butterweiche "floating" Animation
   - ✅ Kein abgehacktes "Springen"
   - ✅ Einheitliches Timing überall

### Test-Status

**Letzte Validierung:** 27. November 2025
**Ergebnis:** ✅ 8/8 Tests bestanden
**Status:** Production-ready

---

## 📊 Performance

### Lighthouse Scores (Target)

- **Performance:** > 90
- **Accessibility:** > 90
- **Best Practices:** > 90
- **SEO:** > 100
- **PWA:** ✅ Alle Checks

### Optimierungen

- ✅ Lazy Loading für Bilder
- ✅ WebP Bildformat
- ✅ CSS/JS Minifikation
- ✅ Browser Caching
- ✅ Preload für kritische Assets
- ✅ DNS Prefetch für externe Domains

---

## 🔗 Wichtige Links

### Website

- **Live:** https://www.academynow-fahrschule.de
- **Lokal:** http://localhost:8080

### Externe Services

- **Web3Forms:** https://web3forms.com
- **Google Tag Manager:** GTM-WWRGDHJ7
- **Google Ads:** AW-17118954542
- **Google Places API:** (Reviews Integration)
- **Cookie Yes:** (Cookie-Banner Integration)

### Social Media

- **Facebook:** [@academynow.fahrschule](https://www.facebook.com/academynow.fahrschule)
- **Instagram:** [@academynow.fahrschule](https://www.instagram.com/academynow.fahrschule)
- **TikTok:** [@academynow.fahrschule](https://www.tiktok.com/@academynow.fahrschule)
- **YouTube:** [@FahrschuleAcademyNow](https://www.youtube.com/@FahrschuleAcademyNow)

---

## 📞 Kontakt

**AcademyNow Fahrschule**

- 📍 **Adresse:** Adenauerallee 10, 20097 Hamburg
- ☎️ **Telefon:** (040) 982 591 50
- 💬 **WhatsApp:** +49 176 31065840
- ✉️ **E-Mail:** kontakt@academynow-fahrschule.de
- 🌐 **Website:** www.academynow-fahrschule.de

**Öffnungszeiten:**

- Mo–Fr: 09:00 – 18:00
- Sa: 10:00 – 14:00

---

## 🛠️ Entwicklung & Wartung

### Aktuelle Version

**v2.0 - Event Listener & Hover Fix** (18. Oktober 2025)

Siehe [CHANGELOG.md](CHANGELOG.md) für vollständige Historie.

### Git Workflow

```bash
# Status prüfen
git status

# Änderungen committen
git add .
git commit -m "fix: beschreibung der änderung"
git push origin main

# Branches
git checkout -b feature/neue-funktion
```

### Deployment

```bash
# 1. Service Worker Version erhöhen
# In sw.js: CACHE_VERSION = 'v2025-XX-XX'

# 2. CSS Version erhöhen
# In HTML: styles.css?v=2025-XX-XX

# 3. Testen
open http://localhost:8080

# 4. Deployment
# (Je nach Hosting-Provider)
```

---

## 🐛 Bekannte Issues

### Keine kritischen Issues

✅ Alle kritischen Bugs behoben (Stand: 18.10.2025)

**Letzte Fixes:**

- ✅ Event Listener Duplikate
- ✅ bfcache Inkompatibilität
- ✅ ID-Duplikate über Seiten
- ✅ Abgehackte Hover-Effekte
- ✅ PWA Install Prompt Duplikate
- ✅ Google Reviews Mehrfach-Ladungen

### Optionale Verbesserungen

Siehe [CHANGELOG.md](CHANGELOG.md) Sektion "Zukünftige Features"

---

## 📚 Dokumentation

### Projekt-Dokumentation

- **[README.md](README.md)** - Diese Datei (Vollständige Projekt-Übersicht)
- **[CHANGELOG.md](CHANGELOG.md)** - Vollständige Änderungs-Historie & Versionen

### Code-Dokumentation

Alle JavaScript-Funktionen sind inline dokumentiert:

- `js/main.js` - Haupt-Logik mit Guards
- `js/google-reviews.js` - API Integration
- `js/pwa-install.js` - PWA Handling
- `css/styles.css` - Design-System & Komponenten

### Test-Dateien

Interaktive Tests im `/tests/` Verzeichnis:

- `TEST_FIXES.html` - Browser Test-Suite
- `validate-fixes.js` - Console Validation Script
- `CACHE_CLEAR.html` - Cache-Clear Utility

---

## 🌐 Browser-Unterstützung

### Desktop

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile

- ✅ iOS Safari 14+
- ✅ Chrome Android 90+
- ✅ Samsung Internet

### Features

Alle verwendeten Features sind kompatibel:

- `cubic-bezier()` Transitions
- `pageshow` Event (bfcache)
- `beforeinstallprompt` (PWA)
- Service Worker API
- Consent Mode v2

---

## 📄 Lizenz

© 2025 AcademyNow GmbH. Alle Rechte vorbehalten.

---

## 🙏 Credits

**Entwickelt für die moderne Fahrausbildung in Hamburg**

- **Design & Development:** AcademyNow Team
- **Event Listener Fixes:** Claude Code (Oktober 2025)
- **Hover-Effekte Optimierung:** Claude Code (Oktober 2025)
- **SEO-Optimierung:** Externe SEO-Agentur
- **Cookie-Banner:** Cookie Yes Integration

---

**Letzte Aktualisierung:** 28. November 2025
**Nächster Review:** Nach Live-Deployment

🏎️ **Mit uns kommen Sie ans Ziel!** ✨
