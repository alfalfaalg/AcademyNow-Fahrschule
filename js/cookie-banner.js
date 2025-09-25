// Cookie Banner Modul
(function(){
  class CookieBanner {
    constructor() {
      this.cookieKey = 'academynow_cookie_consent';
      this.bannerElement = null;
      this.modalBackdrop = null;
      this.modalElement = null;
      this.analyticsCheckbox = null;
      this.marketingCheckbox = null;
      this.boundEscHandler = null;
      this.init();
    }
  
    init() {
      // Banner erstellen falls noch nicht vorhanden
      this.createBanner();
      
      // Nach kurzer Verzögerung prüfen ob Banner angezeigt werden soll
      setTimeout(() => {
        this.checkAndShowBanner();
      }, 1000);
    }
  
    createBanner() {
      // Prüfen ob Banner bereits existiert
      if (document.getElementById('cookie-banner')) {
        this.bannerElement = document.getElementById('cookie-banner');
        return;
      }
  
      // Banner HTML erstellen
      const bannerHTML = `
        <div id="cookie-banner" class="cookie-banner" role="banner" aria-label="Cookie-Einstellungen">
          <div class="cookie-content">
            <div class="cookie-text">
              <p>
                🍪 Diese Website verwendet notwendige Cookies für die Grundfunktionen. 
                Weitere Informationen finden Sie in unserer 
                <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> 
                und im <a href="impressum.html" target="_blank" rel="noopener">Impressum</a>.
              </p>
            </div>
            <div class="cookie-buttons">
              <button type="button" class="cookie-btn cookie-btn-settings" id="cookie-btn-open-settings">
                Einstellungen
              </button>
              <button type="button" class="cookie-btn cookie-btn-accept" id="cookie-btn-accept">
                OK, verstanden
              </button>
            </div>
          </div>
        </div>
      `;
  
      // Banner zum DOM hinzufügen
      document.body.insertAdjacentHTML('beforeend', bannerHTML);
      this.bannerElement = document.getElementById('cookie-banner');
  
      // Modal Grundstruktur anfügen (zunächst versteckt)
      const modalHTML = `
        <div class="cookie-modal-backdrop" id="cookie-modal-backdrop" aria-hidden="true"></div>
        <div class="cookie-modal" id="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
          <div class="cookie-modal-header">
            <div class="cookie-modal-title" id="cookie-modal-title">Cookie-Einstellungen</div>
            <button type="button" class="cookie-modal-close" id="cookie-modal-close" aria-label="Einstellungen schließen">Schließen</button>
          </div>
          <div class="cookie-modal-body">
            <div class="cookie-toggle">
              <input type="checkbox" id="cookie-necessary" checked disabled>
              <div class="cookie-toggle-text">
                <div class="cookie-toggle-title">Notwendige Cookies</div>
                <div class="cookie-toggle-desc">Erforderlich für Grundfunktionen der Website. Diese können nicht deaktiviert werden.</div>
              </div>
            </div>
            <div class="cookie-toggle">
              <input type="checkbox" id="cookie-analytics">
              <div class="cookie-toggle-text">
                <label class="cookie-toggle-title" for="cookie-analytics">Statistik / Analytics (optional)</label>
                <div class="cookie-toggle-desc">Hilft uns, die Website zu verbessern. Standardmäßig ausgeschaltet. Es werden aktuell keine externen Tracking-Skripte geladen.</div>
              </div>
            </div>
            <div class="cookie-toggle">
              <input type="checkbox" id="cookie-marketing">
              <div class="cookie-toggle-text">
                <label class="cookie-toggle-title" for="cookie-marketing">Marketing (optional)</label>
                <div class="cookie-toggle-desc">Für personalisierte Inhalte oder Werbung. Standardmäßig ausgeschaltet. Es werden aktuell keine Marketing-Skripte geladen.</div>
              </div>
            </div>
          </div>
          <div class="cookie-modal-footer">
            <button type="button" class="cookie-btn cookie-btn-secondary" id="cookie-btn-decline">Nur notwendige</button>
            <button type="button" class="cookie-btn cookie-btn-accept" id="cookie-btn-save">Auswahl speichern</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
  
      // Cache elements
      this.modalBackdrop = document.getElementById('cookie-modal-backdrop');
      this.modalElement = document.getElementById('cookie-modal');
      this.analyticsCheckbox = document.getElementById('cookie-analytics');
      this.marketingCheckbox = document.getElementById('cookie-marketing');
      const modalCloseBtn = document.getElementById('cookie-modal-close');
      const modalSaveBtn = document.getElementById('cookie-btn-save');
      const modalDeclineBtn = document.getElementById('cookie-btn-decline');
      const btnOpenSettings = document.getElementById('cookie-btn-open-settings');
      const btnAccept = document.getElementById('cookie-btn-accept');
  
      // Banner Buttons
      if (btnOpenSettings) btnOpenSettings.addEventListener('click', () => this.showSettings());
      if (btnAccept) btnAccept.addEventListener('click', () => this.acceptCookies());
  
      // Modal Buttons
      modalCloseBtn.addEventListener('click', () => this.closeSettings());
      this.modalBackdrop.addEventListener('click', () => this.closeSettings());
      modalDeclineBtn.addEventListener('click', () => {
        this.analyticsCheckbox.checked = false;
        this.marketingCheckbox.checked = false;
        this.saveConsent();
      });
      modalSaveBtn.addEventListener('click', () => this.saveConsent());
    }
  
    checkAndShowBanner() {
      const consent = localStorage.getItem(this.cookieKey);
      
      // Banner nur anzeigen wenn noch keine Einwilligung vorliegt
      if (!consent && this.bannerElement) {
        setTimeout(() => {
          this.showBanner();
        }, 500);
      }
    }
  
    showBanner() {
      if (this.bannerElement) {
        this.bannerElement.classList.add('show');
        
        // Fokus für Accessibility setzen
        const acceptButton = this.bannerElement.querySelector('.cookie-btn-accept');
        if (acceptButton) {
          acceptButton.focus();
        }
      }
    }
  
    hideBanner() {
      if (this.bannerElement) {
        this.bannerElement.classList.remove('show');
        this.bannerElement.classList.add('hide');
        
        // Banner nach Animation entfernen
        setTimeout(() => {
          if (this.bannerElement && this.bannerElement.parentNode) {
            this.bannerElement.parentNode.removeChild(this.bannerElement);
            this.bannerElement = null;
          }
        }, 400);
      }
    }
  
    acceptCookies() {
      const consentData = this.buildConsent({ analytics: false, marketing: false });
      localStorage.setItem(this.cookieKey, JSON.stringify(consentData));
      this.hideBanner();
      console.log('Cookie-Einwilligung gespeichert:', consentData);
    }
  
    showSettings() {
      // Modal mit aktuellen Werten öffnen
      const existing = this.getConsent();
      if (existing) {
        this.analyticsCheckbox.checked = !!existing.analytics;
        this.marketingCheckbox.checked = !!existing.marketing;
      } else {
        this.analyticsCheckbox.checked = false;
        this.marketingCheckbox.checked = false;
      }
      this.openSettings();
    }
  
    openSettings() {
      if (!this.modalElement || !this.modalBackdrop) return;
      this.modalBackdrop.classList.add('show');
      this.modalElement.classList.add('show');
  
      // ESC schließt nur das Modal, nicht akzeptieren
      this.boundEscHandler = (e) => {
        if (e.key === 'Escape') {
          this.closeSettings();
        }
      };
      document.addEventListener('keydown', this.boundEscHandler);
    }
  
    closeSettings() {
      if (!this.modalElement || !this.modalBackdrop) return;
      this.modalElement.classList.remove('show');
      this.modalBackdrop.classList.remove('show');
      if (this.boundEscHandler) {
        document.removeEventListener('keydown', this.boundEscHandler);
        this.boundEscHandler = null;
      }
    }
  
    saveConsent() {
      const consentData = this.buildConsent({
        analytics: !!(this.analyticsCheckbox && this.analyticsCheckbox.checked),
        marketing: !!(this.marketingCheckbox && this.marketingCheckbox.checked)
      });
      localStorage.setItem(this.cookieKey, JSON.stringify(consentData));
      this.closeSettings();
      this.hideBanner();
      console.log('Cookie-Einwilligung gespeichert (Auswahl):', consentData);
      // Hier ggf. Aktivierung/Deaktivierung von Skripten je nach Zustimmung implementieren
    }
  
    buildConsent(opts) {
      return {
        necessary: true,
        analytics: !!opts.analytics,
        marketing: !!opts.marketing,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
    }
  
    getConsent() {
      const raw = localStorage.getItem(this.cookieKey);
      if (!raw) return null;
      try { return JSON.parse(raw); } catch { return null; }
    }
  
    // Methode um Cookie-Einwilligung zurückzusetzen
    resetConsent() {
      localStorage.removeItem(this.cookieKey);
      location.reload();
    }
  }
  
  // In globalen Scope exportieren, damit datenschutz.html darauf zugreifen kann
  document.addEventListener('DOMContentLoaded', function(){
    window.cookieBanner = new CookieBanner();
  });
})();
