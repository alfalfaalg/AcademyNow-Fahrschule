# Änderungen an der AcademyNow Fahrschule Website

**Datum:** 1. Oktober 2025

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
