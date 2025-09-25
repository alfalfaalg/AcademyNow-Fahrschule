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
    if (document.querySelector('.pwa-install-banner')) {
      return;
    }

    const banner = document.createElement('div');
    banner.className = 'pwa-install-banner';

    const container = document.createElement('div');
    container.className = 'pwa-install-banner__container';

    const title = document.createElement('div');
    title.className = 'pwa-install-banner__title';
    title.textContent = 'App installieren';

    const message = document.createElement('div');
    message.className = 'pwa-install-banner__message';
    message.textContent = 'AcademyNow als App auf Ihrem Gerät installieren?';

    const actions = document.createElement('div');
    actions.className = 'pwa-install-banner__actions';

    const installButton = document.createElement('button');
    installButton.type = 'button';
    installButton.className = 'pwa-install-banner__button pwa-install-banner__button--primary';
    installButton.textContent = 'Installieren';
    installButton.addEventListener('click', () => {
      prompt.prompt();
      prompt.userChoice.then((result) => {
        if (result.outcome === 'accepted') {
          console.log('✅ PWA installation accepted');
        } else {
          console.log('❌ PWA installation declined');
        }
      }).finally(() => {
        banner.remove();
        deferredPrompt = null;
      });
    });

    const dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.className = 'pwa-install-banner__button pwa-install-banner__button--secondary';
    dismissButton.textContent = 'Nicht jetzt';
    dismissButton.addEventListener('click', () => {
      banner.remove();
      deferredPrompt = null;
    });

    actions.append(installButton, dismissButton);
    container.append(title, message, actions);
    banner.append(container);
    document.body.append(banner);
  }
})();
