# TODO – AcademyNow Fahrschule (laufende Arbeiten)

## Offene Aufgaben

- **Sektions-Breiten vereinheitlichen:** ✅ ERLEDIGT - Alle Sektionen jetzt auf max-width: 1100px
- Google Places API-Key produktiv freischalten (Billing + erlaubte Referrer), damit echte Profilbilder im Review-Slider laden.
- **Bergedorf Place ID:** Manuell über Google Place ID Finder ermitteln und in google-reviews.js eintragen.
- Asset-Optimierung: große JPG/PNG → WebP/AVIF; ungenutzte Bilder/Icons aufräumen.
- JS/CSS-Light-Cleanup: unbenutzte Funktionen/Styles identifizieren und gefahrlos entfernen (keine Behaviour-Änderungen).
- Form-Zustellung live prüfen (Kontakt-/Bewerbungs-Popup via Web3Forms).
- **Button Padding vereinheitlichen:** Aktuell 13 verschiedene Werte → auf 3 Standard-Größen reduzieren (klein/mittel/groß).
- CSS-Aufräumplan:
  - ~~Fokus-Ring auf kontrastreiches Blau (#0066cc) umstellen~~ ✅ ERLEDIGT
  - ~~Globale Hover-`!important` auf Karten durch spezifischere Selektoren ersetzen~~ ✅ ERLEDIGT
  - Mobile-Styles mittelfristig in einen zentralen `@media (max-width: 768px)`-Block zusammenziehen (styles.css vs. mobile.css) und doppelte Regeln streichen.

## Erledigt (27.11.2025 - Code-Qualität Session)

- **Focus Outline:** Orange → Blau (#0066cc) für besseren Kontrast auf hellen Karten
- **Card Hover !important:** Entfernt, jetzt mit :not(.hot-deal):not(.featured) Selektoren
- **Preise Container:** max-width 1200px → 1100px (einheitlich)
- **Z-Index Hierarchie:** 22 Werte → 14 CSS-Variablen konsolidiert
- **Header Buttons:** Touch-Target auf 44px erhöht (WCAG 2.1)

## Erledigt (27.11.2025 - UI-Verbesserungen Session)

- **City Logistiker Sektion:** Komplett neue Sektion mit 100% gefördert Badge
  - 3-Spalten Layout (Info, Ablauf, CTA)
  - Light Theme passend zum Rest der Seite
  - Eyebrow "100% GEFÖRDERT" über dem Titel
- **Über uns verbessert:**
  - Statistiken-Bar (95% Bestehensquote, 6 Wochen, 2 Standorte, 100% Förderung)
  - Section-Eyebrow hinzugefügt
  - FA-Checkmarks statt Bullet Points
  - Textanordnung: Intro zentriert, Haken-Liste linksbündig
- **Bewertungen Dual-Standort:**
  - Hamburg Mitte & Bergedorf nebeneinander
  - Statische Fallback-Reviews (4 echte Bewertungen)
  - Reviews Slider: 2 Cards auf Desktop sichtbar
- **UI/UX Verbesserungen:**
  - Footer: 220px Logo, Montserrat Schrift, Orange CI
  - WhatsApp/Telefon Modals: Orange CI (statt Blau)
  - Popup Icons: Font Awesome statt Emojis
  - Karriere Benefits: Neues 4-Spalten Karten-Layout
- **Technisch:**
  - SW-Update-Prüfung: registration.waiting + 60s Intervall
  - Cache v=20251127-006 | SW v2.4.1

## Erledigt (27.11.2025 - Cleanup Session 2)

- **Telefonnummern korrigiert:** Alle falschen Telefonnummern gegen Google Maps Einträge verifiziert und korrigiert
  - Hamburg Mitte: 040 982 591 350 → (040) 982 591 50
  - Bergedorf: 040 637 433 359 → 040/637 433 59
  - Alle tel: Links, Schema.org Daten und Display-Texte aktualisiert
- **Wartungsmodus vollständig entfernt:** Git-Status bereinigt, alle Referenzen aus Dokumentation entfernt
- **Dokumentation aktualisiert:** README.md und CHANGELOG.md auf Version 2.0.3 aktualisiert

## Erledigt (26.11.2025 - Abend-Session)

- Wartungsmodus komplett entfernt (coming-soon.html, auth.js, stressed_male_web_dev.jpg gelöscht)
- Alle „Mehr erfahren" Buttons zu „Jetzt anmelden" umbenannt
- Führerscheinklassen-Grid auf 3×2 Symmetrie umgestellt (statt 4+2)
- CTA-Button „Jetzt zum Antragsformular" prominenter gestaltet (Dashed Border, Glow-Animation)
- Icons vereinheitlicht: Emojis durch SVG-Icons mit Orange-Kreis-Border ersetzt (Über uns + Führerscheinklassen)
- Cache-Busting-Version auf 20251126-003 aktualisiert

## Erledigt (vorherige Session)

- „Über uns" kompakt zentriert; CTA ergänzt, Karten vereinheitlicht.
- Karriere-Karte modernisiert (Recruiting-Badge, Benefits).
- Kontaktsektion entfernt, alle Kontakt-CTAs triggern Popup.
- Standorte-Maps auf funktionierende Google-Maps-Embeds gestellt.
- `ueber-uns.html` entfernt, `sitemap.xml` bereinigt.

## Erledigt (27.11.2025 - Cleanup)

- Z-Index-Hierarchie via `--z-mobile-nav-overlay`/`--z-mobile-nav-trigger` eingeführt und im Mobile-Menü (Button + Overlay) genutzt.
- Mobile-Menü-Button konsolidiert (eine Definition, 44px Touch-Target, transparenter Hintergrund, einheitlicher Z-Index); doppelte Regel in `css/mobile.css` entfernt.
