# Academy Now Fahrschule - TODO & Projektplan

**Stand:** 11. Oktober 2025  
**Projekt:** AcademyNow-Fahrschule Website Optimierung

---

## ✅ Abgeschlossene Aufgaben

### SEO-Optimierungen (Agentur-Anforderungen)

- [x] Logo verlinkt auf Startseite (alle Seiten)
- [x] "Direkt anmelden" Button wiederhergestellt (SEO-Agentur hatte ihn fälschlicherweise entfernt)
- [x] Button-Größen vereinheitlicht (gleiche Breite/Höhe auf derselben Zeile)
- [x] Grid-Layouts symmetrisch gemacht
- [x] Footer-Abstände optimiert (75% Reduzierung: 0.8rem → 0.2rem)
- [x] Logo 10% vergrößert (140px → 154px)

### Mobile Optimierung

- [x] Header kompakt (8px padding, 154px Logo)
- [x] Hero Section optimiert (20px top, 24px content spacing)
- [x] SPEZIAL-ANGEBOT: zentriert, 60px Schrift, mobile line break
- [x] Preise korrekt formatiert (499€ durchgestrichen 24px, 399€ groß 48px bold)
- [x] Buttons perfekt aligned (222.5px × 44px)

### Design-Verbesserungen

- [x] **Grid-Layouts symmetrisch:**
  - Desktop (>900px): 3 Spalten (3-3)
  - Tablet (900px-600px): 2 Spalten (2-2-2)
  - Mobile (<600px): 1 Spalte (1-1-1-1-1-1)
- [x] **Google Bewertungsbox verbessert:**
  - 47% breiter (420px → 620px)
  - Eleganter Gradient-Hintergrund (Weiß → Hellblau)
  - Glanz-Effekt oben
  - Logo in weißer Box mit Schatten
  - Größere Schrift (Rating: 3.2rem, Label: 1.3rem)
  - Stärkere Stern-Schatten
  - Gradient-Button mit besserem Hover-Effekt
  - Mobile: 95% Breite


- [x] Mobile Styles in `mobile.css` konsolidiert (Stylesheet wieder ausgelagert)
- [x] Inline-Stile (außer Infoseiten) entfernt und in CSS ausgelagert
- [x] Hover-Lift vereinheitlicht (Leistungen, Preise, Standorte, Karriere)
### Technische Updates

- [x] CSS-Version aktualisiert (?v=2025-10-11)
- [x] .gitignore für Test-Screenshots erweitert

---

## 🔄 In Bearbeitung

### Umfassende Projekt-Analyse

- [~] HTML-Dateien strukturell prüfen
  - Status: Teilweise geprüft
  - Gefunden: GTM lädt ohne Cookie-Consent (DSGVO-Verstoß!)
  - Gefunden: Inkonsistente CSS-Versionierung auf anderen Seiten
- [~] CSS-Analyse durchführen
  - Duplikate finden
  - Konflikte identifizieren
  - Ungenutzte Klassen entfernen
  - Media-Query-Konsistenz prüfen
- [ ] JavaScript-Funktionalität testen
  - Status: 16 console.log Statements gefunden (müssen entfernt werden)
  - Event-Listener-Konflikte prüfen
  - Error-Handling validieren

---

## 📋 Nächste Schritte

### Priorität HOCH 🔴

#### 1. Google Maps Reviews Integration

**Ziel:** Echte Google-Bewertungen dynamisch einbinden

**Optionen:**

- **Empfohlen:** Google Places API
  - Kosten: Erste 100k Calls/Monat KOSTENLOS
  - Vorteile: Echte Reviews, volle Design-Kontrolle
  - Benötigt: Google Cloud Account, API-Key, Place ID
- **Alternative:** Elfsight Widget (€6-12/Monat)
  - Einfacher, aber kostenpflichtig
- **Alternative:** Google Maps Embed
  - Kostenlos, aber zeigt komplette Karte

**Schritte:**

1. [ ] Google Cloud Account erstellen
2. [ ] Google Places API aktivieren
3. [ ] API-Key generieren (mit Domain-Restriction)
4. [ ] Place ID von Google My Business finden
5. [ ] JavaScript-Code in `js/main.js` einbauen
6. [ ] Reviews-Container im HTML erstellen
7. [ ] CSS-Styling für Review-Cards
8. [ ] Testing & Optimierung

**Code-Location:**

- JavaScript: `js/main.js` (neue Funktion `loadGoogleReviews()`)
- HTML: `index.html` (Sektion "Was sagen unsere Schüler")
- CSS: `css/styles.css` (neue Klassen für `.review-item`)

---

### Priorität MITTEL 🟡

#### 2. DSGVO-Konformität herstellen

**Problem:** Google Tag Manager (GTM) lädt ohne Cookie-Consent

**Lösung:**

```javascript
// GTM nur nach Cookie-Zustimmung laden
if (cookieConsent.analytics) {
  // GTM Code hier laden
}
```

**Betroffene Datei:** `index.html` (Zeilen 1-18)

#### 3. Production Cleanup

- [ ] 16 console.log Statements entfernen
  - `js/main.js`
  - `js/cookie-banner.js`
  - `js/auth.js`
  - `js/pwa-install.js`
- [ ] CSS-Versionierung auf allen Seiten vereinheitlichen
  - `ueber-uns.html`: ?v=2025-09-26 → ?v=2025-10-11
  - `impressum.html`: keine Version → ?v=2025-10-11
  - `datenschutz.html`: keine Version → ?v=2025-10-11
  - `coming-soon.html`: keine Version → ?v=2025-10-11
  - `danke.html`: keine Version → ?v=2025-10-11

#### 4. Cross-Page-Konsistenz prüfen

- [ ] Header auf allen Seiten identisch
- [ ] Footer auf allen Seiten identisch
- [ ] Navigation funktioniert überall
- [ ] Meta-Tags konsistent
- [ ] Schema.org auf relevanten Seiten

---

### Priorität NIEDRIG 🟢

#### 5. Performance-Optimierung

- [ ] Ladezeiten messen
- [ ] Bildoptimierung prüfen
- [ ] Lazy Loading für Bilder
- [ ] CSS/JS Minification
- [ ] Critical CSS extrahieren

#### 6. PWA & Service Worker

- [ ] `manifest.json` validieren
- [ ] `sw.js` auf Korrektheit prüfen
- [ ] Offline-Funktionalität testen
- [ ] Install-Prompt optimieren

#### 7. Accessibility (A11y)

- [ ] ARIA-Labels prüfen
- [ ] Keyboard-Navigation testen
- [ ] Contrast-Ratios validieren
- [ ] Screen-Reader-Kompatibilität

---

## 🎯 Langfristige Ziele

### Content-Erweiterungen

- [ ] Mehr Schüler-Testimonials hinzufügen
- [ ] FAQ-Sektion erweitern
- [ ] Blog/News-Bereich für SEO
- [ ] Video-Testimonials einbinden

### Feature-Ideen

- [ ] Online-Terminbuchung Integration
- [ ] Live-Chat für Anfragen
- [ ] Fortschritts-Tracker für Fahrschüler
- [ ] Theorie-Übungen online

### Marketing

- [ ] Social Media Integration verbessern
- [ ] Google Ads Conversion-Tracking optimieren
- [ ] Newsletter-Anmeldung
- [ ] Referral-Programm

---

## 📊 Bekannte Issues

### Kritisch 🔴

- **DSGVO:** GTM lädt ohne Consent (index.html Zeilen 1-18)

### Wichtig 🟡

- **CSS-Versioning:** Inkonsistent über alle Seiten
- **Console Logs:** 16 Statements in Production-Code

### Optional 🟢

- Keine optionalen Issues derzeit

---

## 📝 Notizen

### Grid-Layout Breakpoints

```css
/* Desktop */
.leistungen-container {
  grid-template-columns: repeat(3, 1fr);
}

/* Tablet - @media (max-width: 900px) */
.leistungen-container {
  grid-template-columns: repeat(2, 1fr);
}

/* Mobile - @media (max-width: 600px) */
.leistungen-container {
  grid-template-columns: 1fr;
}
```

### Footer-Spacing Optimierung

- Original: `margin: 0.8rem auto 0.8rem`
- Runde 1: `margin: 0.4rem auto 0.4rem` (-50%)
- Runde 2: `margin: 0.2rem auto 0.2rem` (-50%)
- **Total:** 75% Reduzierung

### CSS-File Locations

- Main: `css/styles.css` (4286+ Zeilen)
- Leistungen Grid: Zeile 1777
- Google Bewertungen: Zeile 4091+
- Footer Brand: Zeile 2777
- Mobile Breakpoints: Zeile 3290+, 4212+

---

## ✨ Fertigstellungskriterien

**Website ist produktionsreif wenn:**

- [x] Alle SEO-Anforderungen erfüllt
- [x] Mobile-First optimiert
- [x] Grid-Layouts symmetrisch
- [ ] Google Reviews live eingebunden
- [ ] DSGVO-konform (GTM mit Consent)
- [ ] Keine console.logs in Production
- [ ] CSS-Versioning überall konsistent
- [ ] Alle Links funktionieren
- [ ] Performance Score >90
- [ ] Accessibility Score >90

---

**Letzte Aktualisierung:** 11. Oktober 2025  
**Nächster Review:** Nach Google Reviews Integration
