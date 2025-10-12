# Änderungen an der AcademyNow Fahrschule Website

**Datum:** 1. Oktober 2025 (Ursprung) | **Update:** 7. Oktober 2025

---

## 🚀 NEUE TODO-LISTE (7. Oktober 2025)

### 🆕 Offene Punkte (aktuell)
- [x] Header nochmals um ca. 20 % verschlanken (Höhe/Padding und Button-Höhen anpassen) und Abstände an neue Höhe angleichen.
- [x] Hero-Bereich entdichten: mehr vertikale Abstände zwischen Badge, Titel, Angebot, Box und Buttons schaffen, sodass der Bereich luftiger wirkt.
- [x] CI-Orange harmonisieren: Farbwerte für `--accent` und `--accent-dark` sanfter abstimmen und zugehörige Glows/Verläufe anpassen.
- [x] Header und mobile Header um weitere ca. 10 % verschlanken (Desktop) bzw. 30 % (Mobile) und Seitenkonsistenz prüfen.
- [x] Hero-Anzeige feinjustieren: `SPEZIAL-ANGEBOT`, Text "Grundbetrag 399€ statt 499€" vergrößern sowie Farbgebung (weiß/gold/orange) harmonisieren.
- [x] Farbkonzept mit Orange + ehemaligem Goldton erarbeiten und anwenden (insb. „Führerschein ohne Umwege“), inkl. Recherche seriöser Farbkombination & Anpassung von Glows/Verläufen.
- [x] Header/Footer auf allen Seiten (inkl. mobile) auf identisches Styling prüfen und korrigieren; offene ToDos-Seitenprüfung durchführen.
- [x] Mobile Header neu strukturieren: Logo links, Burger rechts, darunter jeweils zugehörige CTA-Buttons (Direkt anmelden / Sofortkontakt) mit minimalem vertikalen Platzbedarf.
- [x] Mobile Hero optimieren: Padding reduzieren, "SPEZIAL-ANGEBOT" lesbar halten, CTA-Effekte prüfen und Hero samt Header im ersten Viewport sichtbar machen.
- [x] Mobile Typografie prüfen: Fließtexte (z. B. Über uns, Sektionseinleitungen) mittig ausrichten, Abstände angleichen.
- [x] Mobile Layouts anpassen: Grids (Preise, Leistungen, Standorte) für kleine Viewports optimieren, Kartenhöhe reduzieren, Menüdarstellung/Interaktion testen.
- [x] Einheitlichen Hover/Lift-Effekt aus Über-uns-Highlights auf Preise, Leistungen, Standorte und Karriere-Karten übertragen.
- [x] Footer anpassen: Logo vergrößern, Claim-Text näher platzieren und wording auf „Mit uns kommen Sie ans Ziel!“ aktualisieren.

### ✅ Abgeschlossen (07.10.2025):
- ✅ Google Tag Manager (GTM-WWRGDHJ7) auf allen HTML-Seiten
- ✅ Telefonnummer im Schema.org: +49-40-98259150
- ✅ Logo-Update (logo_neu.png/webp) - alle alten Icons entfernt
- ✅ Mobile Hero-Optimierung (Buttons, Spacing, Sommerangebot-Badge)
- ✅ Service Worker Cache-Busting (v2)
- ✅ Hamburger-Menü CSS-Konflikte bereinigt
- ✅ Footer modernisiert (4 Spalten, Schnellzugriff, Öffnungszeiten)
- ✅ **CI-Farbe von Gold (#D1B17C) auf Orange (#E8752D) umgestellt** - CSS-Variablen --accent und --accent-dark
- ✅ **Header um 1/3 schmaler** - Padding reduziert: Desktop 8px→5px, Mobile 2px→1px, Position: fixed
- ✅ **Header Scroll-Bug behoben** - Transform-basiertes Auto-Hide deaktiviert
- ✅ **Bildungsangebot Dropdown hinzugefügt** - "City-Logistiker / KEP-Fahrer" → academy-now.de
- ✅ **Karriere in Footer verschoben** - Fuhrpark-Link zur Navigation hinzugefügt
- ✅ **Hero-Hintergrund aufgehellt** - Overlay-Opacity von 0.82-0.92 auf 0.65-0.75 reduziert
- ✅ **EXTRAVAGANZ-Text hinzugefügt** - 3.5rem mit Orange-Gradient und Shimmer-Animation
- ✅ **Hero-Preis aktualisiert** - "399€ statt 499€" mit Durchstreichung
- ✅ **Basis-Paket Farbe und Preis** - Orange Gradient Badge + "399€ statt 499€"
- ✅ **Hover-Effekte auf Preiskarten** - translateY von -5px auf -8px erhöht
- ✅ **Standort Bergedorf hinzugefügt** - 2-Spalten Grid Layout (Hamburg Mitte | Bergedorf)
- ✅ **Über Uns Text gekürzt** - Highlight-Boxen kompakter, Button-Text zentriert

### 🔧 NEUE ANFORDERUNGEN (07.10.2025):

#### 1. Header-Optimierung ✅ KOMPLETT
- ✅ **Header um 1/3 schmaler machen** - Padding Desktop: 5px/3px (vorher 8px/4px), Mobile: 1px/3px (vorher 2px/4px)
- ✅ **Neuer Menüpunkt "Bildungsangebot"** mit Dropdown
  - Dropdown-Design wie academy-now.de mit Hover-Animation
  - Dropdown-Inhalt: "City-Logistiker / KEP-Fahrer"
  - Link zu: https://academy-now.de/mehr-erfahren-fahrschule/
  - Mobile: Click-Toggle mit JavaScript
- ✅ **Menüpunkt "Karriere" entfernt** (jetzt in Footer unter "Fahrschul-Angebote")
- ✅ **Neuer Menüpunkt "Fuhrpark"** hinzugefügt
- ✅ **Header fixiert** - Position: fixed, Scroll-Bug behoben (transform-Animation deaktiviert)

#### 2. Hero-Bereich Verbesserungen ✅ TEILWEISE
- ✅ **Hero-Background heller gemacht** - Overlay-Opacity reduziert für bessere Mercedes-Sichtbarkeit
- ⏸️ **Zweites Auto-Bild** (Classic SL) - Warten auf Bild-Asset
- ✅ **Sommerangebot-Text optimiert:**
  - "Grundbetrag 399€ statt 499€" mit Durchstreichung
  - "EXTRAVAGANZ" hinzugefügt: 3.5rem, Orange-Gradient, Shimmer-Animation
  - Bessere Text-Verteilung

#### 3. Preise-Sektion Anpassungen ✅ KOMPLETT
- ✅ **Basis-Paket farblich an Sommerangebot angepasst** - Orange Gradient Badge
- ✅ **"399€ statt 499€"** bei Basis-Paket mit Durchstreichung
- ✅ **Hover-Effekt für alle 3 Preis-Karten:**
  - translateY(-8px) mit smooth transition (0.3s ease)
  - Alle Karten: Basis-Paket, Fahrstunden, Motorrad

#### 4. Standorte-Sektion ✅ KOMPLETT
- ✅ **Neuer Standort "Bergedorf" hinzugefügt**
  - Adresse: Chrysanderstraße 19, 21029 Hamburg
  - Layout: 2-Spalten Grid (responsive: 1 Spalte auf Mobile)
  - Google Maps eingebunden
  - Kontaktdaten und Öffnungszeiten
  - Links: Hamburg Mitte | Rechts: Bergedorf
  - Gleicher Stil/Design wie bestehender Standort

#### 5. Über Uns-Sektion
- [ ] **Text in den 3 Highlight-Boxen kürzen**
  - "Zentrale Lage", "Flexible Zeiten", etc.
  - Weniger Text, kompakter
- [ ] **Button-Text zentrieren** in beiden Buttons

#### 6. CI-Farben (Corporate Identity)
- [ ] **Goldton durch Logo-Orange ersetzen** (auf gesamter Website)
  - Aktuell: Gold (#D1B17C / --accent)
  - Neu: Logo-Orange (aus logo_neu.png extrahieren)
  - Betroffen: Buttons, Badges, Akzente, Hover-Effekte

#### 7. Favicon/Icon für Google
- [ ] **Google-Icon aus `/images/icons/` Ordner verwenden**
  - Prüfen: Welches Icon ist gemeint?
  - Optional: favicon.ico im Root erstellen

---

## ⚠️ WICHTIG: Diese Änderungen müssen in die neue Version übernommen werden!

---

## 📊 ÄNDERUNG 1: GOOGLE TAG MANAGER IMPLEMENTIERUNG

Der Google Tag Manager wurde auf **ALLEN HTML-Seiten** der Website implementiert.

**Container-ID:** `GTM-WWRGDHJ7`

### Implementation:

#### 1. Im `<head>`-Bereich (direkt nach `<meta charset="UTF-8">`):

```html
<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-WWRGDHJ7");
</script>
<!-- End Google Tag Manager -->
```

#### 2. Im `<body>`-Bereich (direkt nach öffnendem `<body>`-Tag):

```html
<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-WWRGDHJ7"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe
></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### ✅ Betroffene Dateien:

- `index.html` ✓
- `coming-soon.html` ✓
- `danke.html` ✓
- `datenschutz.html` ✓
- `impressum.html` ✓
- **Alle weiteren HTML-Seiten** (neue Seiten müssen diesen Code ebenfalls enthalten!)

---

## 📞 ÄNDERUNG 2: TELEFONNUMMER IM SCHEMA.ORG

Die Platzhalter-Telefonnummer wurde durch die echte Telefonnummer ersetzt.

### Änderung in der `index.html`:

**Im LocalBusiness Schema.org JSON-LD:**

```json
"telephone": "+49-40-98259150"
```

**ALT:** `"telephone": "+49-40-123456789"`  
**NEU:** `"telephone": "+49-40-98259150"`

### 📍 Location im Code:

Suche nach dem `<script type="application/ld+json">` Block mit `"@type": "LocalBusiness"` und prüfe die `telephone` Property.

---

## 🎨 ÄNDERUNG 3: NEUES LOGO - ICON & FAVICON UPDATE

### Neue Logo-Dateien:

- `images/logo_neu.png` (schwarzer Hintergrund mit weißem/orangem Logo)
- `images/logo_neu.webp` (schwarzer Hintergrund mit weißem/orangem Logo)

### ❌ Gelöschte alte Icon-Dateien:

Die folgenden Dateien wurden gelöscht und durch das neue Logo ersetzt:

- `favicon-16.png`
- `favicon-32.png`
- `favicon-48.png`
- `icon-96.png`
- `icon-144.png`
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`

### ✅ Änderungen vorgenommen:

#### A) In allen HTML-Dateien:

**Alle Favicon-Referenzen wurden aktualisiert:**

```html
<!-- Standard Favicons -->
<link rel="icon" href="images/logo_neu.png" sizes="48x48" type="image/png" />
<link rel="icon" href="images/logo_neu.png" sizes="32x32" type="image/png" />
<link rel="icon" href="images/logo_neu.png" sizes="16x16" type="image/png" />
<link rel="icon" href="images/logo_neu.png" sizes="192x192" type="image/png" />
<link rel="icon" href="images/logo_neu.webp" sizes="any" type="image/webp" />
<link rel="shortcut icon" href="images/logo_neu.png" type="image/png" />

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" href="images/logo_neu.png" />
<link rel="apple-touch-icon" sizes="180x180" href="images/logo_neu.png" />

<!-- Windows Tiles -->
<meta name="msapplication-TileImage" content="images/logo_neu.png" />

<!-- Safari Pinned Tab -->
<link rel="mask-icon" href="images/logo_neu.webp" color="#0A214A" />
```

#### B) In der `manifest.json`:

**Alle Icon-Referenzen wurden aktualisiert:**

```json
"icons": [
  {
    "src": "images/logo_neu.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "any maskable"
  },
  {
    "src": "images/logo_neu.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any maskable"
  },
  {
    "src": "images/logo_neu.png",
    "sizes": "144x144",
    "type": "image/png",
    "purpose": "any"
  },
  {
    "src": "images/logo_neu.png",
    "sizes": "96x96",
    "type": "image/png",
    "purpose": "any"
  }
]
```

**Auch alle Shortcut-Icons wurden aktualisiert** (Anmelden, Kontakt, WhatsApp).

---

## 🔍 ZUSÄTZLICHE EMPFEHLUNG: FAVICON.ICO FÜR GOOGLE

### Problem:

Das Favicon in Google Suchergebnissen wird nicht sofort aktualisiert (2-7 Tage Wartezeit).

### Lösung:

**Eine `favicon.ico` Datei im Root-Verzeichnis erstellen!**

#### Schritte:

1. Gehe zu: https://www.favicon-generator.org/ oder https://realfavicongenerator.net/
2. Lade `images/logo_neu.png` hoch
3. Generiere die `favicon.ico` Datei
4. Lege sie in den Root-Ordner (neben `index.html`)

#### Zusätzliche HTML-Referenz im `<head>` einfügen:

```html
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
```

#### Google Search Console:

- URL-Prüfung durchführen
- Indexierung beantragen für die Hauptseite
- 3-7 Tage warten

---

## 📝 ZUSAMMENFASSUNG DER BETROFFENEN DATEIEN

### Geänderte Dateien:

1. ✅ `index.html` (GTM, Telefonnummer, Favicons)
2. ✅ `coming-soon.html` (GTM, Favicons)
3. ✅ `danke.html` (GTM, Favicons)
4. ✅ `datenschutz.html` (GTM, Favicons)
5. ✅ `impressum.html` (GTM, Favicons)
6. ✅ `manifest.json` (Alle Icon-Referenzen)

### Neue Dateien im `images/` Ordner:

- ✅ `logo_neu.png`
- ✅ `logo_neu.webp`

### Empfohlen zu erstellen:

- ⚠️ `favicon.ico` (im Root-Verzeichnis)

---

## ✅ CHECKLISTE FÜR DEN MERGE

Vor dem Merge der neuen Version prüfen:

- [ ] Google Tag Manager Code auf **allen** HTML-Seiten (auch neue Seiten!)

  - [ ] GTM-Script im `<head>` (direkt nach `<meta charset="UTF-8">`)
  - [ ] GTM-noscript im `<body>` (direkt nach `<body>`-Tag)
  - [ ] Container-ID: `GTM-WWRGDHJ7`

- [ ] Telefonnummer im Schema.org JSON-LD: `+49-40-98259150`

- [ ] Logo-Dateien vorhanden:

  - [ ] `images/logo_neu.png`
  - [ ] `images/logo_neu.webp`

- [ ] Keine alten Icon-Referenzen mehr vorhanden:

  - [ ] Suche nach `favicon-16`, `favicon-32`, `favicon-48`
  - [ ] Suche nach `icon-96`, `icon-144`, `icon-192`, `icon-512`
  - [ ] Suche nach `apple-touch-icon.png`
  - [ ] Alle Treffer durch `logo_neu.png` oder `logo_neu.webp` ersetzt

- [ ] `manifest.json` Icons aktualisiert (alle auf `logo_neu.png`)

- [ ] Optional: `favicon.ico` im Root erstellt und referenziert

---

## 🔧 SUCHEN & ERSETZEN BEFEHLE

Verwende diese Befehle, um sicherzustellen, dass alle Änderungen übernommen wurden:

### In allen HTML-Dateien nach alten Icons suchen:

```bash
grep -r "favicon-\|icon-[0-9]\|apple-touch-icon.png" *.html
```

**Ergebnis sollte leer sein!** (oder nur Kommentare zeigen)

### GTM-Container-ID suchen:

```bash
grep -r "GTM-WWRGDHJ7" *.html
```

**Ergebnis:** Sollte auf jeder HTML-Seite **2x** vorkommen (head + body)

### Telefonnummer prüfen:

```bash
grep -r "telephone" index.html
```

**Ergebnis:** Sollte `+49-40-98259150` zeigen

---

## 📞 KONTAKT & FRAGEN

Falls Unklarheiten bestehen oder Hilfe benötigt wird:

- Dokumentation liegt im Root-Verzeichnis: `AENDERUNGEN_01_10_2025.md`
- Alle Änderungen sind rückwärtskompatibel
- Bei Merge-Konflikten: Diese Version hat Priorität für GTM, Telefonnummer und Logo-Icons

---

**Erstellt am:** 1. Oktober 2025  
**Version:** 1.0  
**Status:** Produktionsbereit ✅
