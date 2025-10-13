// =================================================================================
// GOOGLE REVIEWS - PLACES API INTEGRATION
// =================================================================================

/**
 * SETUP-ANLEITUNG:
 * 
 * 1. Google Cloud Console öffnen: https://console.cloud.google.com/
 * 2. Neues Projekt erstellen: "AcademyNow Fahrschule"
 * 3. Places API aktivieren:
 *    - APIs & Services → Library
 *    - "Places API" suchen und aktivieren
 * 
 * 4. API-Key erstellen:
 *    - APIs & Services → Credentials
 *    - "Create Credentials" → "API Key"
 *    - Key beschränken:
 *      - Application restrictions: HTTP referrers
 *      - Website restrictions: academynow-fahrschule.de/*
 *      - API restrictions: Places API
 * 
 * 5. Place ID finden:
 *    - Google Maps öffnen: https://www.google.com/maps
 *    - Fahrschule suchen: "Fahrschule Academy Now Hamburg"
 *    - URL kopieren - Place ID ist in der URL enthalten
 *    - Oder Tool nutzen: https://developers.google.com/maps/documentation/places/web-service/place-id
 * 
 * 6. Werte unten eintragen:
 *    - API_KEY
 *    - PLACE_ID
 */

// ===== KONFIGURATION (HIER EINTRAGEN!) =====
const CONFIG = {
  API_KEY: 'HIER_API_KEY_EINTRAGEN', // Von Google Cloud Console
  PLACE_ID: 'ChIJd-9sKc4fUUcRUFMWN6iYOXk', // Aus Google Maps URL
  MAX_REVIEWS: 6, // Anzahl der angezeigten Reviews
  MIN_RATING: 4, // Nur Reviews mit mind. 4 Sternen
};

// Funktion zum Laden der Reviews
async function loadGoogleReviews() {
  const container = document.getElementById('google-reviews-container');
  if (!container) {
    console.warn('⚠️ Google Reviews Container nicht gefunden');
    return;
  }

  // Prüfen ob API-Key konfiguriert ist
  if (CONFIG.API_KEY === 'HIER_API_KEY_EINTRAGEN') {
    console.warn('⚠️ Google Places API-Key noch nicht konfiguriert');
    container.innerHTML = `
      <div class="reviews-error">
        <p><strong>Google Reviews Setup erforderlich</strong></p>
        <p>Bitte API-Key in <code>js/google-reviews.js</code> eintragen.</p>
        <p>Anleitung siehe Kommentare in der Datei.</p>
      </div>
    `;
    return;
  }

  try {
    console.log('🔄 Lade Google Reviews...');
    
    // Google Places API URL
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${CONFIG.PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${CONFIG.API_KEY}`;

    // CORS-Proxy verwenden (für Client-Side Requests)
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Places API Error: ${data.status}`);
    }

    const place = data.result;
    console.log('✅ Google Reviews geladen:', place);

    // Reviews filtern und sortieren
    let reviews = place.reviews || [];
    reviews = reviews
      .filter(review => review.rating >= CONFIG.MIN_RATING)
      .sort((a, b) => b.time - a.time) // Neueste zuerst
      .slice(0, CONFIG.MAX_REVIEWS);

    // HTML generieren
    if (reviews.length === 0) {
      container.innerHTML = '<p class="reviews-loading">Noch keine Bewertungen verfügbar.</p>';
      return;
    }

    container.innerHTML = reviews.map(review => createReviewCard(review)).join('');

  } catch (error) {
    console.error('❌ Fehler beim Laden der Google Reviews:', error);
    container.innerHTML = `
      <div class="reviews-error">
        <p><strong>Bewertungen konnten nicht geladen werden</strong></p>
        <p>Bitte versuchen Sie es später erneut.</p>
        <a href="https://www.google.com/maps/place/Fahrschule+Academy+Now/@53.5528986,10.0130689,21z/data=!4m6!3m5!1s0x47b18fce29063f77:0x793896a833d7c53!8m2!3d53.552809!4d10.0129408!16s%2Fg%2F11xdq0v924" 
           target="_blank" 
           rel="noopener"
           class="google-bewertung-cta"
           style="display: inline-flex; margin-top: 16px;">
          Bewertungen auf Google ansehen
        </a>
      </div>
    `;
  }
}

// HTML für eine Review-Card erstellen
function createReviewCard(review) {
  const authorName = review.author_name || 'Unbekannt';
  const authorPhoto = review.profile_photo_url || 'images/icons/user-avatar-placeholder.svg';
  const rating = review.rating || 0;
  const text = review.text || '';
  const timeAgo = getRelativeTime(review.time);

  // Sterne generieren
  const stars = Array.from({ length: 5 }, (_, i) => {
    const isFilled = i < rating;
    return `
      <svg class="review-star" viewBox="0 0 24 24" ${isFilled ? 'fill="#D1B17C"' : 'fill="#E0E0E0"'}>
        <path d="M12 .587l3.668 7.568L24 9.423l-6 5.849L19.335 24 12 19.771 4.665 24 6 15.272 0 9.423l8.332-1.268z"/>
      </svg>
    `;
  }).join('');

  // Text kürzen wenn zu lang
  const truncatedText = text.length > 200 
    ? text.substring(0, 200) + '...' 
    : text;

  return `
    <div class="review-card">
      <div class="review-header">
        <img src="${authorPhoto}" alt="${authorName}" class="review-avatar" loading="lazy">
        <div class="review-author-info">
          <div class="review-author-name">${authorName}</div>
          <div class="review-date">${timeAgo}</div>
        </div>
      </div>
      <div class="review-rating">
        ${stars}
      </div>
      <p class="review-text">${truncatedText}</p>
      <a href="${review.author_url || '#'}" target="_blank" rel="noopener" class="review-google-link">
        <svg class="review-google-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Auf Google lesen
      </a>
    </div>
  `;
}

// Relative Zeit berechnen (z.B. "vor 2 Wochen")
function getRelativeTime(timestamp) {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `vor ${years} Jahr${years > 1 ? 'en' : ''}`;
  if (months > 0) return `vor ${months} Monat${months > 1 ? 'en' : ''}`;
  if (weeks > 0) return `vor ${weeks} Woche${weeks > 1 ? 'n' : ''}`;
  if (days > 0) return `vor ${days} Tag${days > 1 ? 'en' : ''}`;
  if (hours > 0) return `vor ${hours} Stunde${hours > 1 ? 'n' : ''}`;
  if (minutes > 0) return `vor ${minutes} Minute${minutes > 1 ? 'n' : ''}`;
  return 'gerade eben';
}

// Reviews beim Laden der Seite laden
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGoogleReviews);
} else {
  loadGoogleReviews();
}
