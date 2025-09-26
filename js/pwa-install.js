// Zusätzliche PWA-Features: Installations-Banner
(function(){
  if ('beforeinstallprompt' in window) {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show install banner after user interaction
      setTimeout(() => {
        if (deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
          showInstallPrompt(deferredPrompt);
        }
      }, 10000);
    });
  }
  
  window.showInstallPrompt = function(prompt) {
    const banner = document.createElement('div');
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
    
    window.installApp = function() {
      prompt.prompt();
      prompt.userChoice.then((result) => {
        if (result.outcome === 'accepted') {
          console.log('✅ PWA installation accepted');
        } else {
          console.log('❌ PWA installation declined');
        }
        banner.remove();
      });
    };
  }
})();
