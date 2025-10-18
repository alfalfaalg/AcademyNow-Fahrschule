// =================================================================================
// PWA INSTALLATION PROMPT - BEST PRACTICES
// =================================================================================

// Zusätzliche PWA-Features: Installations-Banner
(function () {
  if ("beforeinstallprompt" in window) {
    let deferredPrompt = null;
    let installPromptShown = false; // Track if prompt was already shown

    // Handle beforeinstallprompt event (can fire multiple times!)
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log('📱 PWA: beforeinstallprompt event fired');

      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Stash the event so it can be triggered later
      deferredPrompt = e;

      // Don't show prompt if already shown in this session
      if (installPromptShown) {
        console.log('⏭️ PWA: Install prompt already shown this session');
        return;
      }

      // Show install banner after user interaction (10 seconds)
      setTimeout(() => {
        // Check if app is already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
          console.log('✅ PWA: App already installed');
          return;
        }

        // Check if we still have the deferred prompt
        if (deferredPrompt) {
          showInstallPrompt(deferredPrompt);
          installPromptShown = true;
        }
      }, 10000);
    });
  }

  window.showInstallPrompt = function (prompt) {
    const banner = document.createElement("div");
    banner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        margin: 0 auto;
        text-align: center;
        animation: slideInUp 0.3s ease;
      ">
        <div style="font-weight: 600; margin-bottom: 8px;">App installieren</div>
        <div style="font-size: 0.9em; margin-bottom: 12px;">AcademyNow als App auf Ihrem Gerät installieren?</div>
        <button onclick="installApp()" style="
          background: var(--accent);
          color: var(--primary);
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 8px;
        ">Installieren</button>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        ">Nicht jetzt</button>
      </div>
    `;
    document.body.appendChild(banner);

    window.installApp = function () {
      prompt.prompt();
      prompt.userChoice.then((result) => {
        // PWA installation choice recorded
        banner.remove();
      });
    };
  };
})();
