# SEO-Agentur Analyse: Cookie-Banner & CMP Setup

## Datum: 9. Oktober 2025

---

## 📋 EXECUTIVE SUMMARY

Die AcademyNow Fahrschule Website nutzt **KEIN externes CMP/CNP-Tool** (Consent Management Platform), sondern eine **selbst entwickelte Cookie-Banner-Lösung** in JavaScript.

---

## 🔍 AKTUELLE COOKIE-IMPLEMENTIERUNG

### ✅ Was ist implementiert:

#### 1. **Eigener Cookie-Banner (Custom Solution)**

- **Datei:** `js/cookie-banner.js` (247 Zeilen)
- **Speicherort:** LocalStorage (`academynow_cookie_consent`)
- **Funktionalität:**
  - Banner mit "OK, verstanden" und "Einstellungen" Buttons
  - Modal für detaillierte Cookie-Einstellungen
  - 3 Cookie-Kategorien:
    - ✅ **Notwendige Cookies** (immer aktiv, nicht deaktivierbar)
    - ⚠️ **Statistik/Analytics** (optional, standardmäßig AUS)
    - ⚠️ **Marketing** (optional, standardmäßig AUS)

#### 2. **Tracking-Tools bereits implementiert:**

- **Google Tag Manager (GTM):** ID `GTM-WWRGDHJ7`
  - Lädt im `<head>` (Zeile 5-18)
  - Noscript-Fallback im `<body>` (Zeile 445-454)
- **Google Ads (gtag.js):** ID `AW-17118954542`
  - Lädt im `<body>` (Zeile 430-443)

#### 3. **KRITISCHES PROBLEM:**

⚠️ **Google Tag Manager und Google Ads laden OHNE Consent-Check!**

- Beide Tracking-Skripte laden **sofort beim Seitenaufruf**
- Es gibt **KEINE Prüfung** der Cookie-Einwilligung vor dem Laden
- **DSGVO-VERSTOSSE:** Tracking läuft bevor User zugestimmt hat

---

## ❌ PROBLEME MIT DER AKTUELLEN LÖSUNG

### 1. **Fehlende Consent-Integration**

```javascript
// Aktuell im cookie-banner.js (Zeile 223):
console.log("Cookie-Einwilligung gespeichert (Auswahl):", consentData);
// Hier ggf. Aktivierung/Deaktivierung von Skripten je nach Zustimmung implementieren
```

➡️ **Problem:** Der Kommentar zeigt, dass die Skript-Aktivierung NIE implementiert wurde!

### 2. **GTM lädt immer (Zeile 5-18 in index.html)**

```html
<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    // ... lädt SOFORT ohne Consent-Check
  })(window, document, "script", "dataLayer", "GTM-WWRGDHJ7");
</script>
```

### 3. **Google Ads lädt immer (Zeile 430-443)**

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=AW-17118954542"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "AW-17118954542");
</script>
```

### 4. **Keine Dokumentation der gesetzten Cookies**

- Cookie-Banner Text sagt nur "notwendige Cookies"
- KEINE Liste welche Cookies GTM/Google Ads tatsächlich setzen
- KEINE Aufklärung über Datenübermittlung in die USA

---

## 🎯 ANTWORT FÜR DIE SEO-AGENTUR

### **Welches CMP/CNP-Tool nutzen wir?**

**KEINS.** Wir nutzen eine **selbst entwickelte Custom Cookie-Banner-Lösung** in JavaScript (`js/cookie-banner.js`).

**Aber:** Die Lösung ist **NICHT DSGVO-konform**, weil:

1. ❌ Google Tag Manager lädt ohne Einwilligung
2. ❌ Google Ads lädt ohne Einwilligung
3. ❌ Keine Consent-Prüfung vor Tracking-Aktivierung
4. ❌ Keine Cookie-Liste/Dokumentation
5. ❌ Keine Informationen über Drittland-Übermittlung (USA)

---

## ✅ EMPFEHLUNGEN

### **Option A: Professionelles CMP-Tool implementieren (EMPFOHLEN)**

Vorschläge für DSGVO-konforme CMP-Tools:

1. **Cookiebot** (Premium, sehr gut)

   - Automatische Cookie-Scans
   - GTM-Integration vorhanden
   - DSGVO + ePrivacy konform
   - Kosten: ca. 9-39€/Monat

2. **Borlabs Cookie** (WordPress-Plugin, aber auch standalone nutzbar)

   - Deutsche Lösung
   - Sehr DSGVO-freundlich
   - Kosten: ca. 39€/Jahr

3. **Usercentrics** (Enterprise)

   - Automatische Consent-Verwaltung
   - A/B-Testing für Consent-Raten
   - Kosten: auf Anfrage

4. **Consentmanager** (deutsch, mittelgroß)
   - Gutes Preis-Leistungs-Verhältnis
   - Kosten: ca. 5-49€/Monat

### **Option B: Custom-Lösung DSGVO-konform machen**

**Erforderliche Änderungen:**

1. ✅ **GTM mit Consent Mode v2 konfigurieren**

   ```javascript
   // Consent Mode BEFORE GTM loads
   window.dataLayer = window.dataLayer || [];
   function gtag() {
     dataLayer.push(arguments);
   }
   gtag("consent", "default", {
     ad_storage: "denied",
     analytics_storage: "denied",
     personalization_storage: "denied",
     functionality_storage: "granted",
     security_storage: "granted",
   });
   ```

2. ✅ **GTM erst nach Consent laden**

   - GTM-Script in `cookie-banner.js` einbauen
   - Nur laden wenn `analytics: true` oder `marketing: true`

3. ✅ **Cookie-Tabelle in Datenschutzerklärung**

   - Liste aller Cookies (Name, Zweck, Laufzeit, Anbieter)
   - Informationen über Drittland-Übermittlung

4. ✅ **Cookie-Scanner implementieren**
   - Automatische Erkennung neuer Cookies
   - Dokumentation für Datenschutzerklärung

---

## 📊 TECHNISCHE DETAILS FÜR SEO-AGENTUR

### **Aktueller Tech-Stack:**

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Cookie-Management:** Custom JS (`cookie-banner.js`)
- **Storage:** LocalStorage (`academynow_cookie_consent`)
- **Tracking:**
  - Google Tag Manager (GTM-WWRGDHJ7)
  - Google Ads (AW-17118954542)
- **Server:** Statische Website (kein Backend)

### **Cookie-Banner Features:**

- ✅ Modal mit Einstellungen
- ✅ LocalStorage-basiert
- ✅ 3 Kategorien (Notwendig, Analytics, Marketing)
- ✅ Versionierung (v1.0)
- ✅ Timestamp bei Einwilligung
- ❌ KEINE GTM-Integration
- ❌ KEINE Consent-Prüfung vor Tracking

### **Was die SEO-Agentur wissen sollte:**

1. **Kein CMP-Tool** = Manuelle Implementierung erforderlich
2. **GTM lädt unkontrolliert** = Muss vor SEO-Launch gefixt werden
3. **Google Consent Mode v2** = Sollte implementiert werden
4. **Cookie-Dokumentation fehlt** = Muss für DSGVO erstellt werden

---

## 🚨 HANDLUNGSBEDARF VOR SEO-LAUNCH

### **KRITISCH (Sofort):**

1. ❌ Google Tag Manager Consent Mode v2 implementieren
2. ❌ GTM erst nach Einwilligung laden
3. ❌ Google Ads erst nach Einwilligung laden

### **WICHTIG (Vor Launch):**

4. ⚠️ Cookie-Liste in Datenschutzerklärung erstellen
5. ⚠️ Informationen über Drittland-Übermittlung (USA) hinzufügen
6. ⚠️ Consent-Prüfung in cookie-banner.js implementieren

### **OPTIONAL (Nice to have):**

7. 💡 Professionelles CMP-Tool evaluieren (Cookiebot, Usercentrics, etc.)
8. 💡 Cookie-Scanner für automatische Dokumentation
9. 💡 A/B-Testing für Consent-Raten

---

## 📞 NÄCHSTE SCHRITTE

1. **SEO-Agentur informieren:**

   - Wir nutzen Custom Cookie-Banner (kein CMP)
   - GTM/Google Ads sind bereits implementiert
   - Consent-Integration fehlt noch (DSGVO-Problem)

2. **Entscheidung treffen:**

   - Option A: CMP-Tool kaufen (9-39€/Monat)
   - Option B: Custom-Lösung fixen (Entwicklungszeit: 4-8h)

3. **Vor SEO-Launch:**
   - DSGVO-Konformität sicherstellen
   - Consent Mode v2 implementieren
   - Cookie-Dokumentation erstellen

---

## 💰 KOSTEN-SCHÄTZUNG

### **Option A: CMP-Tool**

- **Cookiebot:** 9-39€/Monat (108-468€/Jahr)
- **Consentmanager:** 5-49€/Monat (60-588€/Jahr)
- **Implementierung:** 1-2h Entwickler (~100-200€)
- **Gesamt Jahr 1:** ca. 200-800€

### **Option B: Custom-Lösung fixen**

- **Entwicklung:** 4-8h (~400-800€)
- **Testing:** 1-2h (~100-200€)
- **Wartung:** 1-2h/Jahr (~100-200€)
- **Gesamt Jahr 1:** ca. 600-1200€

**Empfehlung:** Option A (CMP-Tool) ist günstiger und wartungsärmer!

---

## ✍️ ZUSAMMENFASSUNG FÜR SEO-AGENTUR

**Frage:** Welches CNP/CMP-Tool nutzt ihr?

**Antwort:**
"Wir nutzen aktuell eine selbst entwickelte Cookie-Banner-Lösung (Custom JavaScript). Google Tag Manager (GTM-WWRGDHJ7) und Google Ads (AW-17118954542) sind bereits implementiert, aber die Consent-Integration ist noch nicht DSGVO-konform. Vor dem SEO-Launch müssen wir entweder ein professionelles CMP-Tool wie Cookiebot implementieren oder unsere Custom-Lösung mit Google Consent Mode v2 nachrüsten."

**Status:** 🔴 Nicht DSGVO-konform, Handlungsbedarf vor Launch
**Geschätzte Zeit bis Launch-ready:** 1-2 Wochen (je nach gewählter Option)

---

_Erstellt am: 9. Oktober 2025_
_Letzte Aktualisierung: 9. Oktober 2025_
