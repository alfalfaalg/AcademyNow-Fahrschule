// =================================================================================
// GOOGLE REVIEWS - PLACES API INTEGRATION (mit lokalem Cache)
// =================================================================================

/**
 * SETUP-ANLEITUNG:
 *
 * 1. Google Cloud Console öffnen: https://console.cloud.google.com/
 * 2. Places API aktivieren
 * 3. API-Key erstellen und auf Domain + Places API beschränken
 * 4. aktuelle PLACE_ID ermitteln (Find Place API oder Google Maps URL)
 */

const CONFIG = {
  API_KEY: "HIER_API_KEY_EINTRAGEN",
  PLACE_ID: "ChIJdz8GKc6PsUcRU3w9g2qJkwc",
  MAX_REVIEWS: 3,
  MIN_RATING: 4,
};

const CACHE = {
  SUMMARY_KEY: "academyNowGoogleReviewSummary",
  REVIEWS_KEY: "academyNowGoogleReviews",
  TTL: 1000 * 60 * 60 * 6, // 6 Stunden
};

function renderReviews(container, reviews) {
  if (!container) return;
  if (!reviews || reviews.length === 0) {
    container.innerHTML = '<p class="reviews-loading">Noch keine Bewertungen verfügbar.</p>';
    return;
  }

  container.innerHTML = reviews.map((review) => createReviewCard(review)).join("");
}

function storeCache(summary, reviews) {
  try {
    if (summary) {
      const summaryToStore = {
        rating: summary.rating ?? null,
        user_ratings_total: summary.user_ratings_total ?? null,
        fetchedAt: Date.now(),
      };
      localStorage.setItem(CACHE.SUMMARY_KEY, JSON.stringify(summaryToStore));
    }

    if (reviews) {
      const simplifiedReviews = reviews.map((review) => ({
        author_name: review.author_name,
        author_url: review.author_url,
        profile_photo_url: review.profile_photo_url,
        rating: review.rating,
        text: review.text,
        time: review.time,
        relative_time_description: review.relative_time_description,
        language: review.language,
        original_language: review.original_language,
        translated: review.translated,
      }));
      localStorage.setItem(CACHE.REVIEWS_KEY, JSON.stringify(simplifiedReviews));
    }
  } catch (error) {
    console.warn("⚠️ Konnte Google-Review-Cache nicht speichern:", error);
  }
}

function loadCache() {
  let summary = null;
  let reviews = null;
  let hasCache = false;
  let isFresh = false;

  try {
    const summaryRaw = localStorage.getItem(CACHE.SUMMARY_KEY);
    const reviewsRaw = localStorage.getItem(CACHE.REVIEWS_KEY);
    if (summaryRaw && reviewsRaw) {
      summary = JSON.parse(summaryRaw);
      reviews = JSON.parse(reviewsRaw);
      if (summary && reviews) {
        hasCache = true;
        isFresh = Date.now() - (summary.fetchedAt || 0) < CACHE.TTL;
      }
    }
  } catch (error) {
    console.warn("⚠️ Fehler beim Lesen des Google-Review-Caches:", error);
  }

  return { summary, reviews, hasCache, isFresh };
}

// Hauptfunktion zum Laden der Reviews
async function loadGoogleReviews() {
  const container = document.getElementById("google-reviews-container");
  if (!container) {
    console.warn("⚠️ Google Reviews Container nicht gefunden");
    return;
  }

  const cacheState = loadCache();
  if (cacheState.hasCache) {
    updateReviewsSummary(cacheState.summary || {});
    renderReviews(container, cacheState.reviews || []);
    if (cacheState.isFresh) {
      return; // Cache frisch genug – keine API-Anfrage nötig
    }
  }

  if (CONFIG.API_KEY === "HIER_API_KEY_EINTRAGEN") {
    console.warn("⚠️ Google Places API-Key noch nicht konfiguriert");
    return;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${CONFIG.PLACE_ID}&fields=name,rating,reviews,user_ratings_total&reviews_sort=newest&key=${CONFIG.API_KEY}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== "OK") {
      throw new Error(`Places API Error: ${data.status}`);
    }

    const place = {
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
      fetchedAt: Date.now(),
    };

    let reviews = data.result.reviews || [];
    reviews = reviews
      .filter((review) => review.rating >= CONFIG.MIN_RATING)
      .sort((a, b) => b.time - a.time)
      .slice(0, CONFIG.MAX_REVIEWS);

    updateReviewsSummary(place);
    renderReviews(container, reviews);
    storeCache(place, reviews);
  } catch (error) {
    console.error("❌ Fehler beim Laden der Google Reviews:", error);
    if (!cacheState.hasCache) {
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
}

// HTML für eine Review-Card erstellen
function createReviewCard(review) {
  const authorName = review.author_name || "Unbekannt";
  const authorPhoto =
    review.profile_photo_url || "images/icons/user-avatar-placeholder.svg";
  const rating = review.rating || 0;
  const text = review.text || "";
  const timeAgo = review.relative_time_description || getRelativeTime(review.time);

  const stars = Array.from({ length: 5 }, (_, i) => {
    const isFilled = i < rating;
    return `
      <svg class="review-star" viewBox="0 0 24 24" ${
        isFilled ? 'fill="#D1B17C"' : 'fill="#E0E0E0"'
      }>
        <path d="M12 .587l3.668 7.568L24 9.423l-6 5.849L19.335 24 12 19.771 4.665 24 6 15.272 0 9.423l8.332-1.268z"/>
      </svg>
    `;
  }).join("");

  const truncatedText =
    text.length > 200 ? `${text.substring(0, 200)}…` : text;

  return `
    <div class="review-card">
      <div class="review-header">
        <img src="${authorPhoto}" alt="${authorName}" class="review-avatar" loading="lazy">
        <div class="review-author-info">
          <div class="review-author-name">${authorName}</div>
          <div class="review-date">${timeAgo}</div>
        </div>
      </div>
      <div class="review-rating">${stars}</div>
      <p class="review-text">${truncatedText}</p>
      <a href="${
        review.author_url || "#"
      }" target="_blank" rel="noopener" class="review-google-link">
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

function getRelativeTime(timestamp) {
  if (!timestamp) return "";
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  const seconds = Math.floor(diff);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `vor ${years} Jahr${years > 1 ? "en" : ""}`;
  if (months > 0) return `vor ${months} Monat${months > 1 ? "en" : ""}`;
  if (weeks > 0) return `vor ${weeks} Woche${weeks > 1 ? "n" : ""}`;
  if (days > 0) return `vor ${days} Tag${days > 1 ? "en" : ""}`;
  if (hours > 0) return `vor ${hours} Stunde${hours > 1 ? "n" : ""}`;
  if (minutes > 0) return `vor ${minutes} Minute${minutes > 1 ? "n" : ""}`;
  return "gerade eben";
}

function updateReviewsSummary(place) {
  const rating = place?.rating ? Number(place.rating) : null;
  const ratingText = rating
    ? rating.toLocaleString("de-DE", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })
    : "--";

  const reviewCount =
    place?.user_ratings_total ??
    (Array.isArray(place?.reviews) ? place.reviews.length : null);

  const reviewCountText =
    reviewCount != null ? reviewCount.toLocaleString("de-DE") : "--";

  document
    .querySelectorAll(".google-rating-value")
    .forEach((el) => (el.textContent = ratingText));

  document
    .querySelectorAll(".google-review-count")
    .forEach((el) => (el.textContent = reviewCountText));

  document.querySelectorAll(".bewertung-sterne-container").forEach((el) => {
    if (rating) {
      el.setAttribute("aria-label", `Bewertung: ${ratingText} von 5 Sternen`);
    }
  });

  document.querySelectorAll(".google-stars").forEach((container) => {
    if (rating) {
      container.innerHTML = createStarMarkup(rating);
    }
  });

  const now = new Date();
  const formattedDate = now.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  document
    .querySelectorAll(".google-info")
    .forEach((el) => (el.textContent = `Stand: ${formattedDate}`));
}

let starGradientCounter = 0;

function createStarMarkup(rating) {
  const stars = [];

  for (let i = 0; i < 5; i += 1) {
    const value = Math.max(Math.min(rating - i, 1), 0);
    if (value >= 1) {
      stars.push(fullStarSvg());
    } else if (value <= 0) {
      stars.push(emptyStarSvg());
    } else {
      stars.push(partialStarSvg(value));
    }
  }

  return stars.join("");
}

function fullStarSvg() {
  return `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#D1B17C" aria-hidden="true">
      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.849L19.335 24 12 19.771 4.665 24 6 15.272 0 9.423l8.332-1.268z"/>
    </svg>
  `;
}

function emptyStarSvg() {
  return `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E0E0E0" aria-hidden="true">
      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.849L19.335 24 12 19.771 4.665 24 6 15.272 0 9.423l8.332-1.268z"/>
    </svg>
  `;
}

function partialStarSvg(value) {
  const percentage = Math.round(value * 100);
  const gradientId = `starGradientDynamic${(starGradientCounter += 1)}`;

  return `
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="${gradientId}">
          <stop offset="${percentage}%" stop-color="#D1B17C" />
          <stop offset="${percentage}%" stop-color="#E0E0E0" />
        </linearGradient>
      </defs>
      <path fill="url(#${gradientId})" d="M12 .587l3.668 7.568L24 9.423l-6 5.849L19.335 24 12 19.771 4.665 24 6 15.272 0 9.423l8.332-1.268z"/>
    </svg>
  `;
}

// =================================================================================
// INITIALIZATION - BFCACHE COMPATIBLE
// =================================================================================

// Flag to prevent multiple initializations
let googleReviewsInitialized = false;

function initGoogleReviews() {
  if (googleReviewsInitialized) {
    console.log('⏭️ Google Reviews already initialized');
    return;
  }

  googleReviewsInitialized = true;
  loadGoogleReviews();
}

// Initialize on DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGoogleReviews);
} else {
  initGoogleReviews();
}

// Refresh on bfcache restore
window.addEventListener("pageshow", function(event) {
  if (event.persisted && googleReviewsInitialized) {
    console.log('🔄 Google Reviews: Page restored from bfcache, refreshing...');
    // Force refresh reviews from cache or API
    loadGoogleReviews();
  }
});
