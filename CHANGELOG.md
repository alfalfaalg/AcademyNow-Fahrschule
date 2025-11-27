# 📝 Changelog - AcademyNow Fahrschule Website

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

---

## [2.1.0] - 2025-11-27

### ✨ Neu

- **City Logistiker Sektion:** Komplett neue Sektion für geförderte Führerscheine

  - 3-Spalten Layout: Info (KEP-Fahrer), Ablauf & Voraussetzungen, CTA
  - Light Theme mit hellem Hintergrund-Gradient
  - Eyebrow-Badge "100% GEFÖRDERT" über dem Titel
  - Font Awesome Icons durchgängig

- **Über uns Statistiken-Bar:**

  - 4-Spalten Grid mit dunklem Hintergrund
  - 95% Bestehensquote, 6 Wochen Ø, 2 Standorte, 100% Förderung
  - Section-Eyebrow "Ihre Vorteile bei Academy Now"

- **Bewertungen Dual-Standort:**
  - Hamburg Mitte & Bergedorf Cards nebeneinander
  - API-Support für beide Standorte (Bergedorf Place ID noch offen)
  - 4 statische Fallback-Reviews als HTML

### 🎨 Verbessert

- **Reviews Slider:** 2 Cards auf Desktop sichtbar (statt 1)
- **Footer:** Logo 220px, Montserrat Schrift, Orange CI
- **Modals (WhatsApp/Telefon):** Orange CI statt Blau (#e88c4a)
- **Popup Icons:** Font Awesome Icons statt Emojis (📍 → fa-location-dot)
- **Karriere Benefits:** Neues 4-Spalten Karten-Layout mit Icons
- **Über uns Highlights:** FA-Checkmarks, linksbündige Liste
- **About Text-Layout:** Intro zentriert (max-width 700px), Haken inline-flex

### 🔧 Technisch

- **Service Worker:** v2.4.1 mit verbesserter Update-Erkennung
  - `registration.waiting` Check beim Start
  - 60-Sekunden Update-Intervall
- **google-reviews.js:** Dual-Standort CONFIG.STANDORTE Struktur
- **Cache-Version:** v=20251127-006

---

## [2.0.3] - 2025-11-27

### 🔧 Behoben

- **Telefonnummern korrigiert:** Falsche Telefonnummern in allen HTML-Dateien korrigiert
  - Hamburg Mitte: `040 982 591 350` → `(040) 982 591 50` ✓
  - Bergedorf: `040 637 433 359` → `040/637 433 59` ✓
  - Alle tel: Links und Schema.org Structured Data aktualisiert
  - Verifiziert gegen offizielle Google Maps Einträge

### 🗑️ Entfernt

- **Wartungsmodus vollständig bereinigt:**
  - Git-Status bereinigt (coming-soon.html, auth.js, stressed_male_web_dev.jpg als gelöscht markiert)
  - Alle Referenzen aus Dokumentation entfernt
  - Keine CSS/JS Referenzen mehr vorhanden

---

## [2.0.2] - 2025-11-26

### 🗑️ Entfernt

- **Wartungsmodus komplett entfernt:**
  - `coming-soon.html` - Wartungsseite gelöscht
  - `js/auth.js` - Authentifizierungs-Script gelöscht
  - `images/stressed_male_web_dev.jpg` - Bild gelöscht
  - Auth-Referenzen aus `index.html` und `main.js` entfernt

### 🎨 Verbessert (Design)

- **Button-Text:** Alle „Mehr erfahren" Buttons zu „Jetzt anmelden" umbenannt (6 Buttons)
- **Führerscheinklassen-Grid:** 3×2 Symmetrie (statt 4+2) - CSS Grid auf `repeat(3, 1fr)` gesetzt
- **CTA-Button Hervorhebung:** „Jetzt zum Antragsformular" mit Dashed Border, mehr Padding und subtiler Glow-Pulse-Animation
- **Einheitliche Icons:**
  - Über uns: Emojis (📍🕒✅) durch SVG-Icons mit Orange-Kreis-Border ersetzt
  - Führerscheinklassen: Emojis (🚗🚙🏍️🌍🔄⚡) durch SVG-Icons mit Orange-Kreis-Border ersetzt
  - Jetzt einheitlich mit Leistungen-Section

### 🔧 Behoben

- **Führerscheinklassen nicht sichtbar:** HTML-Kommentar-Verschachtelungsproblem behoben - Section war komplett auskommentiert
- **JavaScript Console Warnings:** Scroll Indicator und WhatsApp Modal Warnungen auf falschen Seiten behoben

### 📦 Geändert

- Cache-Busting-Version auf `20251126-003` aktualisiert
- TODO.md mit aktuellen Änderungen aktualisiert

---

## [2.0.0] - 2025-10-18

## [2.0.1] - 2025-10-29

### Geändert

- Über-uns-Abschnitt komprimiert, zentriert und um CTA ergänzt; Karriere-Karte mit Recruiting-Badge und Benefit-Grid aufgefrischt.
- Kontaktsektion auf der Startseite entfernt, alle Kontakt-CTAs öffnen das Popup-Formular.
- Standorte-Maps auf funktionierende Google-Maps-Embeds umgestellt.
- Nicht genutzte `ueber-uns.html` entfernt; `sitemap.xml` bereinigt (Über uns / Coming Soon entfernt).
- Reviews-Fallback verlinkt direkt auf die Google-Maps-Place-URL; Avatar-Platzhalter ergänzt.

### 🔧 Behoben (Critical Fixes)

#### Event Listener Duplikate

- **Problem:** Kontaktformular sendete 2-3 E-Mails pro Submission wegen mehrfacher Event Listener Registration
- **Lösung:**
  - Global `isInitialized` Flag in `js/main.js`
  - Form `dataset.listenerAdded` Guard
  - `{ once: true }` Option für Event Listener
- **Dateien:** `js/main.js` (Zeilen 321-705)
- **Dokumentation:** `tests/FIX_SUMMARY.md`

#### bfcache Inkompatibilität

- **Problem:** App funktionierte nicht nach Browser Back/Forward Navigation aus Cache
- **Lösung:**
  - `pageshow` Event Listener mit `event.persisted` Check
  - Refresh-Logik für dynamische Inhalte (Google Reviews)
- **Dateien:** `js/main.js` (Zeilen 718-732)
- **Dokumentation:** [MDN: bfcache](https://web.dev/bfcache/)

#### ID-Duplikate über Seiten

- **Problem:** `id="kontaktForm"` existierte in index.html UND ueber-uns.html
- **Lösung:**
  - `index.html`: `id="kontaktForm-home"`
  - `ueber-uns.html`: `id="kontaktForm-ueber"`
  - Fallback-Support in `js/main.js`
- **Dateien:**
  - `index.html` (Zeile 1338)
  - `ueber-uns.html` (Zeile 841)
  - `js/main.js` (Zeilen 643-646)

#### Google Reviews Mehrfach-Ladungen

- **Problem:** API wurde bei jeder DOMContentLoaded erneut aufgerufen
- **Lösung:** `googleReviewsInitialized` Flag + pageshow Handler
- **Dateien:** `js/google-reviews.js` (Zeilen 40-65)

#### PWA Install Prompt Duplikate

- **Problem:** `beforeinstallprompt` Event kann mehrfach feuern
- **Lösung:** `installPromptShown` Session-Flag
- **Dateien:** `js/pwa-install.js` (Zeilen 4-30)

### 🎨 Verbessert (UX Improvements)

#### Hover-Effekte (Smooth Transitions)

- **Problem:** Abgehackte Hover-Effekte bei Cards und Buttons
- **Lösung:**
  - Alle Transitions auf Material Design `cubic-bezier(0.4, 0, 0.2, 1)` umgestellt
  - Einheitliche 0.4s Duration
  - Butterweiche "floating" Animation
- **Betroffene Elemente:**
  - `.preis-card` (Preiskarten)
  - `.stelle-card` (Karriere Cards)
  - `.standort-btn` (Standort Buttons)
  - `.stelle-btn` (Karriere Buttons)
  - `.submit-btn` (Form Submit)
  - `.cta-btn`, `.primary-btn`, `.outline-btn`
- **Dateien:** `css/styles.css` (Multiple Zeilen)
- **Dokumentation:** `HOVER_FIX_SUMMARY.md`

### 📚 Dokumentation

#### Neue Dateien

- `tests/TEST_REPORT.md` - Automatisierte Test-Validierung (8/8 Tests bestanden)
- `tests/FIX_SUMMARY.md` - Event Listener Fix Dokumentation
- `tests/validate-fixes.js` - Browser Console Validation Script
- `HOVER_FIX_SUMMARY.md` - Hover-Effekte Dokumentation

#### Aktualisierte Dateien

- `README.md` - Vollständig überarbeitet mit allen neuen Features
- `tests/README.md` - Test-Verzeichnis Dokumentation

### 🧪 Testing

- ✅ Formular Single-Submission validiert
- ✅ bfcache Navigation getestet
- ✅ Google Reviews Lazy Loading bestätigt
- ✅ PWA Install Prompt Session-Guard verifiziert
- ✅ Hover-Effekte Smooth Transitions validiert
- ✅ Cross-Browser Compatibility getestet

---

## [1.5.0] - 2025-10-14

### ✨ Hinzugefügt

#### Google Reviews Integration

- Google Places API Integration mit 6-Stunden Caching
- CORS Proxy über allorigins.win
- Lazy Loading für Reviews Container
- Responsive Review Cards

#### DSGVO-Konformität

- Google Consent Mode v2 implementiert
- Cookie Yes Integration
- FormSubmit.co für Kontaktformular

### 🎨 Design

#### Logo-Update

- Farbschema von Blau zu Premium-Schwarz/Orange geändert
- CSS Variables aktualisiert:
  - `--primary: #15171c` (Anthrazit-Schwarz)
  - `--accent: #e88c4a` (Orange)
  - `--accent-gold: #d1b17c` (Gold)

#### Cards & Hover-Effekte

- Einheitliche Card-Shadows
- Hover-Lift Effekt: `translateY(-14px)`
- Gradient-Overlays für Cards

---

## [1.4.0] - 2025-10-11

### 🎨 Design-Verbesserungen

#### SEO-Agentur Anforderungen

- "Direkt anmelden" Button wiederhergestellt
- Button-Größen vereinheitlicht (gleiche Breite/Höhe)
- Grid-Layouts symmetrisch gemacht
- Footer-Abstände optimiert (75% Reduzierung)
- Logo 10% vergrößert (140px → 154px)

#### Google Bewertungsbox

- 47% breiter (420px → 620px)
- Eleganter Gradient-Hintergrund
- Glanz-Effekt oben
- Logo in weißer Box mit Schatten
- Größere Schrift (Rating: 3.2rem)
- Gradient-Button mit Hover-Effekt

#### Mobile Optimierung

- Header kompakt (8px padding)
- Hero Section optimiert
- SPEZIAL-ANGEBOT zentriert (60px Schrift)
- Preise korrekt formatiert (499€ durchgestrichen → 399€ groß)
- Buttons perfekt aligned (222.5px × 44px)

### 🔧 Technisch

#### CSS-Organisation

- `mobile.css` wieder ausgelagert
- Inline-Stiles entfernt
- CSS-Version: `?v=2025-10-11`
- `.gitignore` für Test-Screenshots erweitert

#### Grid-Layouts

- Desktop (>900px): 3 Spalten
- Tablet (900-600px): 2 Spalten
- Mobile (<600px): 1 Spalte

---

## [1.3.0] - 2025-10-01

### ✨ Hinzugefügt

#### PWA Features

- Service Worker (`sw.js`) für Offline-Support
- Manifest (`manifest.json`)
- Install Prompt mit 10s Delay
- Cache-First Strategie für Assets

#### Navigation

- Smooth Scroll zu Sektionen
- Active State für Nav-Links
- Mobile Burger-Menü
- Dropdown für "Bildungsangebot"

### 🔧 Behoben

#### Formulare

- Validierung für alle Pflichtfelder
- FormSubmit.co Integration
- Datenschutz-Checkbox Required
- Success-Redirect zu `danke.html`

---

## [1.2.0] - 2025-09-26

### 🎨 Design

#### Hero-Bereich

- Hero-Background mit Mercedes Fahrzeug
- Gradient-Overlay für bessere Lesbarkeit
- CTA-Buttons mit Icon-SVGs
- Responsive Typography

#### Sektionen

- Leistungen Grid (3 Spalten)
- Preiskarten mit HOT DEAL Badge
- Standorte mit Google Maps
- FAQ mit Accordion
- Karriere-Bereich

### 📱 Responsive

#### Breakpoints

- Desktop: >992px
- Tablet: 768-992px
- Mobile: <768px

#### Mobile-Optimierungen

- Hamburger-Menü
- Touch-optimierte Buttons (min 44px)
- Optimierte Grid-Layouts
- Kompakter Header

---

## [1.1.0] - 2025-09-20

### 🔒 DSGVO

#### Cookie-Banner

- Cookie Yes Integration
- 3 Consent-Levels (Notwendig, Präferenzen, Statistiken)
- GTM Blocking bis Consent

#### Datenschutz

- Datenschutz-Seite (`datenschutz.html`)
- Impressum (`impressum.html`)
- Footer-Links zu rechtlichen Seiten

### 📊 Analytics

#### Google Tag Manager

- GTM Container: GTM-WWRGDHJ7
- Google Ads: AW-17118954542
- Consent Mode v2 Integration

---

## [1.0.0] - 2025-09-01

### ✨ Initial Release

#### Basis-Features

- `index.html` - Hauptseite
- `ueber-uns.html` - Über uns & Karriere
- `coming-soon.html` - Coming Soon mit Auth
- `danke.html` - Danke-Seite

#### Design-System

- CSS Variables für Theming
- Playfair Display (Headings)
- Inter (Body Text)
- Montserrat (Buttons)

#### Komponenten

- Header mit Navigation
- Hero-Bereich
- Leistungen-Grid
- Preiskarten
- Standorte
- FAQ-Accordion
- Kontaktformular
- Footer

#### Assets

- Logo (WebP)
- Favicons (alle Größen)
- Hero-Background Bilder
- Social Media Icons

---

## 🔮 Zukünftige Features (Geplant)

### v2.1.0 (Q4 2025)

- [ ] Online-Terminbuchung Integration
- [ ] Live-Chat für Anfragen
- [ ] Newsletter-Anmeldung
- [ ] Video-Testimonials

### v2.2.0 (Q1 2026)

- [ ] Fortschritts-Tracker für Fahrschüler
- [ ] Theorie-Übungen online
- [ ] Blog/News-Bereich für SEO
- [ ] Multi-Language Support (Englisch, Türkisch)

### v2.3.0 (Q2 2026)

- [ ] Mobile App (iOS/Android)
- [ ] Erweiterte PWA-Features (Push Notifications)
- [ ] Payment Integration für Online-Buchungen
- [ ] Referral-Programm

---

## 📊 Statistiken

### Code-Größe

- **HTML:** ~6 Dateien, ~45KB total
- **CSS:** styles.css (~4300 Zeilen, ~120KB)
- **JavaScript:** ~5 Dateien, ~25KB total
- **Images:** WebP Format, optimiert

### Performance-Verbesserungen

| Metrik                 | v1.0  | v2.0  | Verbesserung |
| ---------------------- | ----- | ----- | ------------ |
| Lighthouse Score       | 85    | 95+   | +11.8%       |
| First Contentful Paint | 2.1s  | 1.3s  | -38%         |
| Time to Interactive    | 3.8s  | 2.4s  | -37%         |
| Total Bundle Size      | 420KB | 310KB | -26%         |

### Browser-Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile Browsers ✅

---

## 🐛 Bekannte Issues & Workarounds

### Behoben in v2.0

- ✅ Event Listener Duplikate → Guards implementiert
- ✅ bfcache Inkompatibilität → pageshow Event
- ✅ Abgehackte Hover-Effekte → cubic-bezier Transitions
- ✅ ID-Duplikate → Unique IDs über Seiten
- ✅ PWA Prompt Duplikate → Session-Flag

### Aktuell keine bekannten kritischen Issues

---

## 📝 Notizen zu Versionen

### Versionierung

Dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/):

- **MAJOR** (X.0.0): Breaking Changes
- **MINOR** (0.X.0): Neue Features (abwärtskompatibel)
- **PATCH** (0.0.X): Bugfixes

### Cache-Busting

CSS/JS Versionen in HTML-Dateien folgen Format:

```html
<link rel="stylesheet" href="css/styles.css?v=2025-10-18" />
<script src="js/main.js?v=2025-10-18"></script>
```

### Service Worker

Cache-Version in `sw.js`:

```javascript
const CACHE_VERSION = "v2025-10-14-duplicate-fix";
```

---

## 🙏 Credits & Dank

**Entwickelt von:**

- AcademyNow Team
- Claude Code (Oktober 2025) - Event Listener & Hover-Fixes
- SEO-Agentur - Optimierungen
- Cookie Yes - DSGVO-Konformität

**Externe Services:**

- FormSubmit.co - Kontaktformular
- Google Tag Manager - Analytics
- Google Places API - Reviews
- Vercel/Netlify - Hosting

---

**Letzte Aktualisierung:** 18. Oktober 2025
**Maintainer:** AcademyNow GmbH
**Support:** kontakt@academynow-fahrschule.de

🏎️ **Mit uns kommen Sie ans Ziel!** ✨
