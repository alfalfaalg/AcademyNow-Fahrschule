# TODO – AcademyNow Fahrschule (laufende Arbeiten)

## Offene Aufgaben

- Google Places API-Key produktiv freischalten (Billing + erlaubte Referrer), damit echte Profilbilder im Review-Slider laden.
- Asset-Optimierung: große JPG/PNG → WebP/AVIF; ungenutzte Bilder/Icons aufräumen.
- JS/CSS-Light-Cleanup: unbenutzte Funktionen/Styles identifizieren und gefahrlos entfernen (keine Behaviour-Änderungen).
- Form-Zustellung live prüfen (Kontakt-/Bewerbungs-Popup via Web3Forms).
- CSS-Aufräumplan:
  - Fokus-Ring auf kontrastreiches Blau (#0066cc) umstellen (statt Orange) für bessere Sichtbarkeit auf hellen Karten.
  - Globale Hover-`!important` auf Karten durch spezifischere Selektoren ersetzen (Preis-/Standort-/Stellen-Karten, Hot-Deal/Featured sollen eigene Effekte behalten).
  - Mobile-Styles mittelfristig in einen zentralen `@media (max-width: 768px)`-Block zusammenziehen (styles.css vs. mobile.css) und doppelte Regeln streichen.

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
