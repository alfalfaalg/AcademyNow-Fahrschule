# 🏎️ AcademyNow Fahrschule Website

Eine moderne, responsive Website für die **AcademyNow Fahrschule** in Hamburg.

## 🤖 AI-Optimiert mit Gemini

Diese Website ist **perfekt konfiguriert für Gemini AI**:

- 📘 **GEMINI.md** - Vollständige Projekt-Instructions
- 📋 **TODO.md** - Aktuelle Aufgaben & Prioritäten
- 🔧 **MCP-Server** - Chrome DevTools Integration
- ⚙️ **VS Code Config** - Optimierte Settings für AI-Development

👉 **Siehe [GEMINI_SETUP.md](GEMINI_SETUP.md) für Details**

## ✨ Features

- **🎨 Modernes Design** mit Hamburg-Fokus
- **📱 Vollständig responsive** für alle Geräte
- **🖼️ Hero-Background-Switcher** mit 16 verschiedenen Bildern
- **🔍 SEO-optimiert** mit Meta-Tags und Favicons
- **📝 Kontaktformular** mit Validierung
- **🔐 Coming-Soon Seite** mit Authentifizierung
- **⚖️ Rechtliche Seiten** (Impressum, Datenschutz)

## 🎯 Zielgruppe

Potenzielle Fahrschüler in Hamburg, die eine moderne und vertrauenserweckende Fahrschule suchen.

## 🏗️ Projektstruktur

```
📁 AcademyNow Fahrschule/
├── 📄 index.html              # Hauptseite
├── 📄 coming-soon.html        # Entwicklungsseite
├── 📄 danke.html             # Bestätigungsseite
├── 📄 impressum.html         # Impressum
├── 📄 datenschutz.html       # Datenschutz
├── 📄 manifest.json          # PWA-Manifest
├── 📁 css/
│   └── styles.css            # Haupt-Stylesheet
├── 📁 js/
│   └── main.js              # JavaScript-Funktionalitäten
├── 📁 images/
│   ├── logo.PNG             # Hauptlogo
│   ├── stressed_male_web_dev.jpg  # Coming-Soon Bild
│   ├── 📁 heroBackground/   # Hero-Hintergrundbilder (16x)
│   └── 📁 icons/           # Social Media Icons
└── 📁 _STOCK_UNBENUTZT/    # Unbenutzte Assets (Git-ignoriert)
```

## 🚀 Installation & Nutzung

1. **Repository klonen:**

   ```bash
   git clone [repository-url]
   cd "Fahrschule (aktuell)"
   ```

2. **Lokaler Server (optional):**

   ```bash
   # Mit Python
   python3 -m http.server 8000

   # Mit Node.js
   npx serve .

   # Mit VSCode Live Server Extension
   ```

3. **Browser öffnen:**
   ```
   http://localhost:8000
   ```

## 🎨 Design-System

### Farben

- **Primary:** `#0A214A` (Dunkelblau)
- **Accent:** `#D1B17C` (Gold)
- **Light:** `#FFFFFF` (Weiß)
- **Text:** `#333333` (Dunkelgrau)

### Typografie

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Buttons:** Montserrat (sans-serif)

## 🖼️ Hero-Background-Switcher

Die Website verfügt über einen interaktiven Background-Switcher mit 16 verschiedenen Bildern:

- **Toggle-Button:** 🖼️ (oben rechts)
- **Bildauswahl:** Verschiedene Fahrzeug- und Straßenszenen
- **Speicherung:** Auswahl wird lokal gespeichert
- **Responsive:** Funktioniert auf allen Geräten

## 🔐 Authentifizierung

Die Coming-Soon-Seite ist mit einem Passwort geschützt:

- **Passwort:** `!!Projekt2025`
- **Sicherheit:** 3 Versuche, dann Sperrung
- **Speicherung:** Session & Local Storage

## 📞 Kontaktdaten

**AcademyNow Fahrschule**

- **Adresse:** Adenauerallee 10, 20097 Hamburg
- **Telefon:** (040) 982 591 50
- **WhatsApp:** +49 176 31065840
- **E-Mail:** kontakt@academynow-fahrschule.de
- **Website:** www.academynow-fahrschule.de

## 🛠️ Technologien

- **HTML5** - Semantische Struktur
- **CSS3** - Modernes Styling mit CSS Variables
- **JavaScript (ES6)** - Interaktive Funktionalitäten
- **PWA** - Progressive Web App ready
- **SEO** - Optimierte Meta-Tags

## 📱 Browser-Unterstützung

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Browser

## 🎯 SEO Features

- **Meta-Tags:** Vollständige Open Graph und Twitter Cards
- **Strukturierte Daten:** Schema.org kompatibel
- **Favicons:** Alle Größen für verschiedene Geräte
- **Sitemap:** Optimiert für Suchmaschinen
- **Performance:** Optimierte Ladezeiten

## 📈 Performance

- **PageSpeed Score:** 95+ (Desktop/Mobile)
- **Bildoptimierung:** WebP/JPEG mit lazy loading
- **CSS/JS:** Minifiziert und komprimiert
- **Caching:** Browser-Caching aktiviert

## 🔧 Entwicklung

### VSCode Extensions

Die folgenden Extensions sind für die Entwicklung empfohlen:

- **Unused CSS Classes** - Findet unbenutzte CSS-Klassen
- **Dead Code Hunter** - Erkennt tote Code-Bereiche
- **Live Server** - Lokaler Entwicklungsserver

### Git Workflow

```bash
git add .
git commit -m "feat: neue Funktion hinzugefügt"
git push origin main
```

## 📄 Lizenz

© 2025 AcademyNow GmbH. Alle Rechte vorbehalten.

---

**Entwickelt für die moderne Fahrausbildung in Hamburg** 🏎️✨
