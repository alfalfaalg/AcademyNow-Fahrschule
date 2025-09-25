// Einfache Authentifizierungsprüfung (aus Head ausgelagert)
(function() {
  // Debug-Ausgabe
  console.log("Auth Status:", sessionStorage.getItem('authed'), "Local Storage:", localStorage.getItem('authed'));
  
  // Beide Speicherorte prüfen (wie in main.js)
  const isAuthenticated = sessionStorage.getItem('authed') === '1' || 
                         localStorage.getItem('authed') === '1';
  
  // Wenn nicht authentifiziert, zur Coming-Soon-Seite umleiten (derzeit deaktiviert)
  if (!isAuthenticated) {
    console.log('Nicht authentifiziert - Umleitung zu Coming Soon...');
    // window.location.replace('coming-soon.html'); // Weiterleitung auskommentiert
  } else {
    console.log('Erfolgreich authentifiziert!');
    // Beide Speicherorte setzen (für Konsistenz)
    sessionStorage.setItem('authed', '1');
  }
})();
