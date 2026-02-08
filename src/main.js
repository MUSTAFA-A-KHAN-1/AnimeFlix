import './style.css';
import './js/smooth-player.js';
import { fetchAnimeInfo, fetchAnimeEpisodes, buildUrl, safeFetch } from './js/animeService.js';
import { createDefaultVideoPlayer, initDefaultVideoPlayer } from './js/defaultPlayer.js';
import { createCustomVideoPlayer, initCustomVideoPlayer, removeSubtitle } from './js/customPlayer.js';

// Proxy for streaming (NekoProxy) - used for bypassing CORS and geo-restrictions
const PROXY_BASE = 'https://renewed-georgeanne-nekonode-1aa70c0c.koyeb.app';

// DOM Elements
const app = document.getElementById('app');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const providerSelect = document.getElementById('providerSelect');
const resultsContainer = document.getElementById('results');
const detailsContainer = document.getElementById('details');
const episodesContainer = document.getElementById('episodes');
const serversContainer = document.getElementById('servers');

let currentAnimeId = null;
let currentEpisodes = [];
let hianimeScrapAnimeCache = {};
let currentPlayerData = null;
let customVideoPlayer = null;
let customVideoInstance = null;
let customSubtitles = []; // Store custom uploaded subtitles

// ============================================
// VIDEO PLAYER TOGGLE STATE
// ============================================

// Get saved preference or default to custom player
function getUseCustomPlayer() {
  const saved = localStorage.getItem('useCustomPlayer');
  return saved === null ? true : saved === 'true';
}

// Save player preference
function setUseCustomPlayer(value) {
  localStorage.setItem('useCustomPlayer', String(value));
  updateToggleUI();
}

// Global function to handle player toggle
window.handlePlayerToggle = function() {
  const checkbox = document.getElementById('playerToggle');
  if (checkbox) {
    // Toggle the checkbox state
    checkbox.checked = !checkbox.checked;
    const isCustom = checkbox.checked;
    setUseCustomPlayer(isCustom);
    console.log('Toggle changed to:', isCustom ? 'Custom' : 'Default');
    
    // Reload video if currently playing
    setTimeout(() => {
      reloadCurrentVideo();
    }, 50);
  }
};

// Function to reload current video with the selected player type
function reloadCurrentVideo() {
  // Try to reload for hianime-scrap
  if (window.hianimeScrapServerData) {
    const activeTab = document.querySelector('.server-tab.active');
    if (activeTab) {
      const typeText = activeTab.textContent.toLowerCase();
      const type = typeText.includes('sub') ? 'sub' : typeText.includes('dub') ? 'dub' : 'raw';
      const serverId = window.hianimeScrapServerData[type]?.[0]?.id;
      if (serverId) {
        playHianimeScrapStream(serverId, type, activeTab.textContent);
        return;
      }
    }
  }
  
  // Try to reload for animekai/animepahe
  const activeServerBtn = document.querySelector('.server-option .play-btn');
  if (activeServerBtn) {
    const onclickAttr = activeServerBtn.getAttribute('onclick');
    if (onclickAttr) {
      const match = onclickAttr.match(/playStream\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/);
      if (match) {
        const proxiedUrl = match[1];
        const serverName = match[2];
        playStream(proxiedUrl, serverName);
        return;
      }
    }
  }
}

// Update toggle UI to reflect current state
function updateToggleUI() {
  const toggle = document.getElementById('playerToggle');
  if (toggle) {
    const isCustom = getUseCustomPlayer();
    toggle.checked = isCustom;
    
    // Update labels
    const customLabel = toggle.parentElement.querySelector('.toggle-custom');
    const defaultLabel = toggle.parentElement.querySelector('.toggle-default');
    if (customLabel && defaultLabel) {
      customLabel.style.opacity = isCustom ? '1' : '0.5';
      defaultLabel.style.opacity = isCustom ? '0.5' : '1';
    }
  }
}

// ============================================
// DEFAULT VIDEO PLAYER (Browser Native)
// ============================================
// Functions imported from './js/defaultPlayer.js'
// ============================================
let subtitleSearchResults = []; // Store cloud search results

// ============================================
// SUBTITLE UTILITY FUNCTIONS
// ============================================
// Functions imported from './js/subtitleUtils.js' and './js/customPlayer.js'
// ============================================

// ============================================
// CUSTOM VIDEO PLAYER IMPLEMENTATION
// ============================================
// Functions imported from './js/customPlayer.js'
// ============================================

// Home page state
let homePageData = null;
let currentSpotlightIndex = 0;
let spotlightInterval = null;
let isHomePageVisible = true;

// ============================================
// HOME PAGE FUNCTIONS
// ============================================

// Fetch home page data from API
async function fetchHomePageData() {
  const provider = providerSelect.value;
  const homeUrl = buildUrl(provider, 'home');
  
  console.log('Fetching home page data from:', homeUrl);
  
  try {
    const data = await safeFetch(homeUrl);
    return normalizeHomeData(data);
  } catch (error) {
    console.error('Error fetching home page data:', error);
    throw error;
  }
}

// Normalize home page data
function normalizeHomeData(data) {
  if (!data) return null;
  
  // Handle wrapped response {status, data: {...}}
  if (data.data) {
    data = data.data;
  }
  
  return {
    status: data.status || true,
    spotlight: normalizeSpotlight(data.spotlight || []),
    trending: normalizeAnimeList(data.trending || []),
    topAiring: normalizeAnimeList(data.topAiring || []),
    mostPopular: normalizeAnimeList(data.mostPopular || []),
    mostFavorite: normalizeAnimeList(data.mostFavorite || []),
    latestCompleted: normalizeAnimeList(data.latestCompleted || []),
    latestEpisode: normalizeAnimeList(data.latestEpisode || []),
    newAdded: normalizeAnimeList(data.newAdded || []),
    topUpcoming: normalizeAnimeList(data.topUpcoming || []),
    topTen: normalizeTopTen(data.topTen || { today: [], week: [], month: [] }),
    genres: data.genres || []
  };
}

// Normalize spotlight data
function normalizeSpotlight(spotlightList) {
  return spotlightList.map(item => ({
    title: item.title || 'Unknown Title',
    alternativeTitle: item.alternativeTitle || '',
    id: item.id || '',
    poster: item.poster || 'https://via.placeholder.com/400x600',
    episodes: {
      sub: item.episodes?.sub || 0,
      dub: item.episodes?.dub || 0,
      eps: item.episodes?.eps || 0
    },
    rank: item.rank || 0,
    type: item.type || 'TV',
    quality: item.quality || 'HD',
    duration: item.duration || 'Unknown',
    aired: item.aired || 'Unknown',
    synopsis: item.synopsis || 'No synopsis available.'
  }));
}

// Normalize anime list data
function normalizeAnimeList(animeList) {
  return animeList.map(item => ({
    title: item.title || 'Unknown Title',
    alternativeTitle: item.alternativeTitle || '',
    id: item.id || '',
    poster: item.poster || 'https://via.placeholder.com/200x300',
    episodes: {
      sub: item.episodes?.sub || 0,
      dub: item.episodes?.dub || 0,
      eps: item.episodes?.eps || 0
    },
    type: item.type || 'TV'
  }));
}

// Normalize top 10 data
function normalizeTopTen(topTen) {
  return {
    today: normalizeAnimeList(topTen.today || []).slice(0, 10),
    week: normalizeAnimeList(topTen.week || []).slice(0, 10),
    month: normalizeAnimeList(topTen.month || []).slice(0, 10)
  };
}

// Show home page
function showHomePage() {
  const homePage = document.getElementById('homePage');
  const searchContainer = document.querySelector('.search-container');
  const resultsContainer = document.getElementById('results');
  const detailsContainer = document.getElementById('details');
  const episodesContainer = document.getElementById('episodes');
  const serversContainer = document.getElementById('servers');
  const homeBtn = document.getElementById('homeBtn');
  const searchNavBtn = document.getElementById('searchNavBtn');
  
  // Update navigation
  homeBtn.classList.add('active');
  searchNavBtn.classList.remove('active');
  
  // Show home page, hide search
  homePage.classList.add('visible');
  homePage.classList.remove('hidden');
  searchContainer.classList.remove('visible');
  resultsContainer.innerHTML = '';
  detailsContainer.innerHTML = '';
  episodesContainer.innerHTML = '';
  serversContainer.innerHTML = '';
  
  isHomePageVisible = true;
  
  // Load home page data if not loaded
  if (!homePageData) {
    loadHomePage();
  }
}

// Show search page
function showSearchPage() {
  const homePage = document.getElementById('homePage');
  const searchContainer = document.querySelector('.search-container');
  const homeBtn = document.getElementById('homeBtn');
  const searchNavBtn = document.getElementById('searchNavBtn');
  
  // Update navigation
  homeBtn.classList.remove('active');
  searchNavBtn.classList.add('active');
  
  // Hide home page, show search
  homePage.classList.remove('visible');
  homePage.classList.add('hidden');
  searchContainer.classList.add('visible');
  
  isHomePageVisible = false;
  
  // Stop spotlight slider
  stopSpotlightSlider();
}

// Load home page data and render
async function loadHomePage() {
  const homeContent = document.getElementById('homeContent');
  
  // Show loading state
  homeContent.innerHTML = renderHomeLoading();
  
  try {
    homePageData = await fetchHomePageData();
    
    if (!homePageData || !homePageData.status) {
      throw new Error('Failed to load home page data');
    }
    
    // Render home page
    homeContent.innerHTML = renderHomePage(homePageData);
    
    // Initialize spotlight slider
    initSpotlightSlider();
    
    showToast('Home page loaded successfully', 'success');
  } catch (error) {
    console.error('Error loading home page:', error);
    homeContent.innerHTML = renderHomeError(error.message);
  }
}

// Render loading state
function renderHomeLoading() {
  return `
    <div class="home-section">
      <div class="section-header">
        <h2>🔥 Featured</h2>
      </div>
      <div class="spotlight-container">
        <div class="home-skeleton" style="height: 400px; border-radius: 16px;">
          <div class="skeleton" style="height: 100%; width: 100%;"></div>
        </div>
      </div>
    </div>
    <div class="home-section">
      <div class="section-header">
        <h2>📊 Top 10</h2>
      </div>
      <div class="home-skeleton">
        ${Array(6).fill('<div class="skeleton-card"><div class="skeleton skeleton-img"></div></div>').join('')}
      </div>
    </div>
    <div class="home-section">
      <div class="section-header">
        <h2>🔥 Trending</h2>
      </div>
      <div class="home-skeleton">
        ${Array(6).fill('<div class="skeleton-card"><div class="skeleton skeleton-img"></div></div>').join('')}
      </div>
    </div>
  `;
}

// Render error state
function renderHomeError(message) {
  return `
    <div class="home-error">
      <div class="error-icon">😕</div>
      <h2>Oops! Something went wrong</h2>
      <p>${message || 'Unable to load home page data. Please try again.'}</p>
      <button class="retry-btn" onclick="loadHomePage()">🔄 Retry</button>
    </div>
  `;
}

// Render complete home page
function renderHomePage(data) {
  let html = '';
  
  // Spotlight section
  if (data.spotlight && data.spotlight.length > 0) {
    html += renderSpotlightSection(data.spotlight);
  }
  
  // Genres section
  if (data.genres && data.genres.length > 0) {
    html += renderGenresSection(data.genres);
  }
  
  // Top 10 section
  if (data.topTen && (data.topTen.today?.length > 0 || data.topTen.week?.length > 0 || data.topTen.month?.length > 0)) {
    html += renderTopTenSection(data.topTen);
  }
  
  // Trending section
  if (data.trending && data.trending.length > 0) {
    html += renderAnimeSection('📈 Trending Now', 'trending', data.trending);
  }
  
  // Top Airing section
  if (data.topAiring && data.topAiring.length > 0) {
    html += renderAnimeSection('▶️ Top Airing', 'topAiring', data.topAiring);
  }
  
  // Most Popular section
  if (data.mostPopular && data.mostPopular.length > 0) {
    html += renderAnimeSection('⭐ Most Popular', 'mostPopular', data.mostPopular);
  }
  
  // Most Favorite section
  if (data.mostFavorite && data.mostFavorite.length > 0) {
    html += renderAnimeSection('❤️ Most Favorite', 'mostFavorite', data.mostFavorite);
  }
  
  // Latest Completed section
  if (data.latestCompleted && data.latestCompleted.length > 0) {
    html += renderAnimeSection('✅ Latest Completed', 'latestCompleted', data.latestCompleted);
  }
  
  // Latest Episode section
  if (data.latestEpisode && data.latestEpisode.length > 0) {
    html += renderAnimeSection('🎬 Latest Episodes', 'latestEpisode', data.latestEpisode);
  }
  
  // New Added section
  if (data.newAdded && data.newAdded.length > 0) {
    html += renderAnimeSection('🆕 Newly Added', 'newAdded', data.newAdded);
  }
  
  // Top Upcoming section
  if (data.topUpcoming && data.topUpcoming.length > 0) {
    html += renderAnimeSection('🚀 Top Upcoming', 'topUpcoming', data.topUpcoming);
  }
  
  return html;
}

// Render spotlight section
function renderSpotlightSection(spotlightList) {
  const slides = spotlightList.map((item, index) => `
    <div class="spotlight-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
      <img src="${item.poster}" alt="${item.title}" loading="lazy">
      <div class="spotlight-overlay">
        <div class="spotlight-rank">#${item.rank || index + 1}</div>
        <h2 class="spotlight-title">${item.title}</h2>
        <div class="spotlight-meta">
          <span>${item.type || 'TV'}</span>
          ${item.quality ? `<span class="quality">${item.quality}</span>` : ''}
          <span>${item.duration || 'Unknown duration'}</span>
          ${item.episodes?.sub > 0 ? `<span>📺 ${item.episodes.sub} eps</span>` : ''}
        </div>
        <p class="spotlight-synopsis">${item.synopsis?.substring(0, 200)}${item.synopsis?.length > 200 ? '...' : ''}</p>
        <div class="spotlight-actions">
          <button class="spotlight-btn primary" onclick="selectAnime('${item.id}', '${item.title.replace(/'/g, "\\'")}')">
            ▶️ Watch Now
          </button>
          <button class="spotlight-btn secondary" onclick="selectAnime('${item.id}', '${item.title.replace(/'/g, "\\'")}')">
            ℹ️ More Info
          </button>
        </div>
      </div>
    </div>
  `).join('');
  
  const dots = spotlightList.map((_, index) => `
    <button class="spotlight-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
  `).join('');
  
  return `
    <div class="home-section">
      <div class="spotlight-container">
        <div class="spotlight-slider">
          ${slides}
          <button class="spotlight-nav prev" onclick="prevSpotlight()">❮</button>
          <button class="spotlight-nav next" onclick="nextSpotlight()">❯</button>
          <div class="spotlight-dots">${dots}</div>
        </div>
      </div>
    </div>
  `;
}

// Render genres section
function renderGenresSection(genres) {
  const genreButtons = genres.map(genre => `
    <button class="genre-tag-btn" onclick="searchByGenre('${genre.replace(/'/g, "\\'")}')">${genre}</button>
  `).join('');
  
  return `
    <div class="home-section">
      <div class="section-header">
        <h2>🏷️ Browse by Genre</h2>
      </div>
      <div class="genres-container">${genreButtons}</div>
    </div>
  `;
}

// Render top 10 section
function renderTopTenSection(topTen) {
  const renderTop10List = (list, period) => {
    if (!list || list.length === 0) return '<p style="color: var(--text-light); text-align: center;">No data available</p>';
    
    return list.slice(0, 5).map((item, index) => `
      <div class="top10-item" onclick="selectAnime('${item.id}', '${item.title.replace(/'/g, "\\'")}')">
        <div class="top10-rank">${index + 1}</div>
        <img src="${item.poster}" alt="${item.title}" loading="lazy">
        <div class="top10-item-info">
          <div class="title">${item.title}</div>
          <div class="episodes">${item.episodes?.sub > 0 ? `${item.episodes.sub} eps` : item.type || 'TV'}</div>
        </div>
      </div>
    `).join('');
  };
  
  return `
    <div class="home-section">
      <div class="section-header">
        <h2>📊 Top 10 Rankings</h2>
      </div>
      <div class="top10-section">
        <div class="top10-category">
          <h3>📅 Today</h3>
          ${renderTop10List(topTen.today, 'today')}
        </div>
        <div class="top10-category">
          <h3>📆 This Week</h3>
          ${renderTop10List(topTen.week, 'week')}
        </div>
        <div class="top10-category">
          <h3>🗓️ This Month</h3>
          ${renderTop10List(topTen.month, 'month')}
        </div>
      </div>
    </div>
  `;
}

// Render anime section
function renderAnimeSection(title, categoryKey, animeList) {
  const animeCards = animeList.slice(0, 12).map(anime => `
    <div class="home-anime-card" onclick="selectAnime('${anime.id}', '${anime.title.replace(/'/g, "\\'")}')">
      <img src="${anime.poster}" alt="${anime.title}" loading="lazy">
      <div class="home-anime-card-content">
        <h3>${anime.title}</h3>
        <p>${anime.episodes?.sub > 0 ? `${anime.episodes.sub} eps` : anime.type || 'TV'}</p>
      </div>
    </div>
  `).join('');
  
  return `
    <div class="home-section">
      <div class="section-header">
        <h2>${title}</h2>
        <button class="see-all-btn" onclick="viewAllCategory('${categoryKey}')">See All →</button>
      </div>
      <div class="home-anime-grid">${animeCards}</div>
    </div>
  `;
}

// Initialize spotlight slider
function initSpotlightSlider() {
  if (!homePageData?.spotlight?.length) return;
  
  currentSpotlightIndex = 0;
  
  // Auto-rotate every 5 seconds
  spotlightInterval = setInterval(() => {
    nextSpotlight();
  }, 5000);
}

// Stop spotlight slider
function stopSpotlightSlider() {
  if (spotlightInterval) {
    clearInterval(spotlightInterval);
    spotlightInterval = null;
  }
}

// Go to next spotlight slide
function nextSpotlight() {
  if (!homePageData?.spotlight?.length) return;
  
  currentSpotlightIndex = (currentSpotlightIndex + 1) % homePageData.spotlight.length;
  updateSpotlightSlide();
}

// Go to previous spotlight slide
function prevSpotlight() {
  if (!homePageData?.spotlight?.length) return;
  
  currentSpotlightIndex = (currentSpotlightIndex - 1 + homePageData.spotlight.length) % homePageData.spotlight.length;
  updateSpotlightSlide();
}

// Update spotlight slide display
function updateSpotlightSlide() {
  const slides = document.querySelectorAll('.spotlight-slide');
  const dots = document.querySelectorAll('.spotlight-dot');
  
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSpotlightIndex);
  });
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSpotlightIndex);
  });
}

// View all anime in a category
function viewAllCategory(categoryKey) {
  console.log('View all category:', categoryKey);
  showToast(`Showing all ${categoryKey} - Filter by provider if needed`, 'info');
  showSearchPage();
  searchInput.focus();
}

// Search by genre
function searchByGenre(genre) {
  showSearchPage();
  searchInput.value = genre;
  searchInput.focus();
  searchAnime();
}

// Expose home page functions to global scope
window.loadHomePage = loadHomePage;
window.showHomePage = showHomePage;
window.showSearchPage = showSearchPage;
window.nextSpotlight = nextSpotlight;
window.prevSpotlight = prevSpotlight;
window.viewAllCategory = viewAllCategory;
window.searchByGenre = searchByGenre;

// ============================================
// END HOME PAGE FUNCTIONS
// ============================================

function showToast(message, type = 'info') {
  const existingContainer = document.querySelector('.toast-container');
  if (existingContainer) {
    existingContainer.remove();
  }
  
  const container = document.createElement('div');
  container.className = 'toast-container';
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<span style="font-size:1.2em;">${icon}</span> ${message}`;
  
  container.appendChild(toast);
  document.body.appendChild(container);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => container.remove(), 300);
  }, 3000);
}

function showSkeletonLoading() {
  const skeletonCount = 12;
  let skeletonHTML = '';
  
  for (let i = 0; i < skeletonCount; i++) {
    skeletonHTML += `
      <div class="skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;
  }
  
  resultsContainer.innerHTML = skeletonHTML;
}

// Main function to search for anime
async function searchAnime() {
  const query = searchInput.value.trim();
  
  if (!query) {
    showToast('Please enter a search query', 'warning');
    return;
  }
  
  try {
    showSkeletonLoading();
    
    const provider = providerSelect.value;
    const searchUrl = buildUrl(provider, 'search', { query });
    console.log('Search URL:', searchUrl);
    
    const data = await safeFetch(searchUrl);
    
    let results = [];
    
    if (data && data.data && data.data.response && Array.isArray(data.data.response)) {
      results = data.data.response;
    } else if (Array.isArray(data)) {
      results = data;
    } else if (data && data.results && Array.isArray(data.results)) {
      results = data.results;
    } else if (data && data.anime && Array.isArray(data.anime)) {
      results = data.anime;
    } else if (data && data.data && Array.isArray(data.data)) {
      results = data.data;
    }
    
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p style="text-align:center;padding:40px;color:var(--text-light);">No results found. Try a different search term.</p>';
      return;
    }
    
    displayResults(results);
    showToast(`Found ${results.length} results`, 'success');
    
  } catch (error) {
    console.error('Search error:', error);
    resultsContainer.innerHTML = `<p class="error" style="text-align:center;padding:40px;color:var(--accent);">Search failed: ${error.message}. Check your connection and try again.</p>`;
  }
}

// Function to display search results
function displayResults(results) {
  // Clear the anime cache when new search results are displayed
  hianimeScrapAnimeCache = {};
  
  resultsContainer.innerHTML = results.map(anime => {
    const title = anime.title || anime.name || anime.englishName || 'Unknown Title';
    const id = anime.id || anime.animeId || anime.mal_id || '';
    const image = anime.image || anime.poster || anime.coverImage || 'https://via.placeholder.com/150x200';
    const releaseDate = anime.releaseDate || anime.year || anime.startDate || 'N/A';
    
    // Handle hianime-scrap episodes format: {sub: 1155, dub: 1143, eps: 1155}
    let episodeInfo = '';
    if (anime.episodes) {
      if (typeof anime.episodes === 'object') {
        const sub = anime.episodes.sub || 0;
        const dub = anime.episodes.dub || 0;
        const eps = anime.episodes.eps || 0;
        if (sub > 0 || dub > 0) {
          episodeInfo = `<p>${sub > 0 ? `Sub: ${sub}` : ''}${sub > 0 && dub > 0 ? ' | ' : ''}${dub > 0 ? `Dub: ${dub}` : ''}</p>`;
        } else if (eps > 0) {
          episodeInfo = `<p>Episodes: ${eps}</p>`;
        }
      } else {
        episodeInfo = `<p>Episodes: ${anime.episodes}</p>`;
      }
    }
    
    // Handle hianime-scrap type and duration
    const type = anime.type ? `<p>${anime.type}</p>` : '';
    const duration = anime.duration ? `<p>${anime.duration}</p>` : '';
    
    // For hianime-scrap, store anime data in cache and pass just the ID
    const provider = providerSelect.value;
    if (provider === 'hianime-scrap') {
      // Store anime data in global cache for selectAnime to retrieve
      hianimeScrapAnimeCache[id] = anime;
      
      return `
        <div class="anime-card" onclick="selectAnime('${id.replace(/'/g, "\\'")}')">
          <img src="${image}" alt="${title}" loading="lazy">
          <h3>${title}</h3>
          ${episodeInfo}
          ${type}
          ${duration}
          <p>${releaseDate}</p>
        </div>
      `;
    }
    
    return `
      <div class="anime-card" onclick="selectAnime('${id.replace(/'/g, "\\'")}', '${title.replace(/'/g, "\\'")}')">
        <img src="${image}" alt="${title}" loading="lazy">
        <h3>${title}</h3>
        ${episodeInfo}
        ${type}
        ${duration}
        <p>${releaseDate}</p>
      </div>
    `;
  }).join('');
}

// Function to select anime and fetch details
async function selectAnime(id, titleParam) {
  if (!id) {
    alert('Invalid anime ID');
    return;
  }
  
  const provider = providerSelect.value;
  const isHianimeScrap = provider === 'hianime-scrap';
  
  try {
    // Show loading state
    detailsContainer.innerHTML = '<p class="loading-details" style="padding: 40px; text-align: center;"><span class="loading-spinner"></span> Loading anime details...</p>';
    
    // For hianime-scrap: ALWAYS fetch from info API to get complete details
    // This ensures home page cards get full info (synopsis, genres, etc.)
    if (isHianimeScrap) {
      console.log('Fetching full anime info from info API for hianime-scrap');
      
      // Fetch full anime info from info API
      const animeInfo = await fetchAnimeInfo(id);
      
      if (!animeInfo) {
        throw new Error('Failed to fetch anime info');
      }
      
      // Fetch episodes list from episodes API
      const episodes = await fetchAnimeEpisodes(id);
      
      // Combine data
      const animeData = {
        ...animeInfo,
        episodes: episodes.length > 0 ? episodes : animeInfo.episodes,
        __provider: provider
      };
      
      // Display the complete anime details
      displayAnimeDetails(animeData, animeInfo.title);
      return;
    }
    
    // For other providers, use existing logic
    const title = typeof titleParam === 'string' ? titleParam : null;
    
    const infoUrl = buildUrl(provider, 'info', { id });
    console.log('Info URL:', infoUrl);
    
    const data = await safeFetch(infoUrl);
    
    // Normalize anime data structure
    let animeData = normalizeAnimeData(data, id, provider);
    
    // If episodes not in info response, fetch separately
    if (!animeData.episodes || animeData.episodes.length === 0) {
      try {
        const episodesUrl = buildUrl(provider, 'episodes', { id });
        console.log('Episodes URL:', episodesUrl);
        
        const episodesData = await safeFetch(episodesUrl);
        animeData.episodes = extractEpisodes(episodesData, provider);
      } catch (epError) {
        console.warn('Could not fetch episodes separately:', epError);
        animeData.episodes = [];
      }
    }
    
    animeData.__provider = provider;
    displayAnimeDetails(animeData, title || animeData.title);
    
  } catch (error) {
    console.error('Details error:', error);
    detailsContainer.innerHTML = `<p class="error">Error loading anime details: ${error.message}</p>`;
  }
}

// Function to select episode and fetch servers
async function selectEpisode(episodeId, episodeNumber) {
  if (!episodeId) {
    alert('Invalid episode ID');
    return;
  }
  
  const provider = providerSelect.value;
  
  try {
    // Show loading indicator but keep container structure
    serversContainer.innerHTML = `
      <h3>Servers for Episode ${episodeNumber || '?'}</h3>
      <p class="loading-servers" style="padding: 20px; text-align: center; color: var(--accent);">
        <span class="loading-spinner"></span> Loading servers...
      </p>
    `;
    
    // Handle hianime-scrap - uses servers endpoint with id param and stream endpoint
    if (provider === 'hianime-scrap') {
      // Check if this is a generated episode ID (from episode count)
      // Format: anime-id::ep=12345
      let actualEpisodeId = episodeId;
      let actualEpisodeNumber = episodeNumber;
      
      // Extract episode number from generated ID format
      const generatedMatch = episodeId.match(/::ep=(\d+)$/);
      if (generatedMatch) {
        actualEpisodeNumber = generatedMatch[1];
        console.log(`Episode ${actualEpisodeNumber} selected (ID: ${episodeId})`);
      }
      
      const serversUrl = buildUrl(provider, 'servers', { id: episodeId });
      console.log('Servers URL:', serversUrl);
      
      const data = await safeFetch(serversUrl);
      displayHianimeScrapServers(data, actualEpisodeNumber || episodeNumber || '1', episodeId);
      
      // Auto-scroll to servers section
      serversContainer.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // Handle animepahe differently - uses watch endpoint with episodeId param
    if (provider === 'animepahe') {
      const watchUrl = buildUrl(provider, 'watch', { episodeId });
      console.log('Watch URL:', watchUrl);
      
      const data = await safeFetch(watchUrl);
      displayServers(data, episodeNumber || '1');
      
      // Auto-scroll to servers section
      serversContainer.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // Handle animekai - uses watch endpoint with episodeId
    if (provider === 'animekai') {
      const watchUrl = buildUrl(provider, 'watch', { episodeId });
      console.log('Watch URL:', watchUrl);
      
      const data = await safeFetch(watchUrl);
      displayServers(data, episodeNumber || '1');
      
      // Auto-scroll to servers section
      serversContainer.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // Default server endpoint for other providers
    const serversUrl = buildUrl(provider, 'servers', { id: episodeId });
    console.log('Servers URL:', serversUrl);
    
    const data = await safeFetch(serversUrl);
    displayServers(data, episodeNumber || '1');
    
    // Auto-scroll to servers section
    serversContainer.scrollIntoView({ behavior: 'smooth' });
    
  } catch (error) {
    console.error('Servers error:', error);
    serversContainer.innerHTML = `<p class="error">Error loading servers: ${error.message}. Try a different episode.</p>`;
  }
}

// Expose functions to global scope for onclick handlers
window.selectAnime = selectAnime;
window.selectEpisode = selectEpisode;

// Function to display anime details
function displayAnimeDetails(anime, title) {
  console.log('Displaying anime details:', anime);
  
  // Set current anime ID for episode navigation
  currentAnimeId = anime.id || null;
  
  const animeTitle = anime.title || title || 'Unknown Title';
  
  // Store anime title globally for subtitle search
  window.currentAnimeTitle = title || animeTitle || '';
  
  const image = anime.image || anime.poster || anime.coverImage || 'https://via.placeholder.com/200x300';
  const japaneseTitle = anime.japaneseTitle || anime.jname || '';
  const type = anime.type || anime.format || 'Unknown';
  const status = anime.status || '';
  const genres = anime.genres || (anime.genre ? [anime.genre] : []);
  const totalEpisodes = anime.totalEpisodes || anime.episodeCount || anime.episodes?.length || 'Unknown';
  const description = anime.description || anime.synopsis || 'No description available';
  const url = anime.url || anime.animeUrl || '';
  
  detailsContainer.innerHTML = `
    <div class="anime-details">
      <div class="anime-header">
        <img src="${image}" alt="${animeTitle}" onerror="this.src='https://via.placeholder.com/200x300'">
        <div class="anime-info">
          <h2>${animeTitle}</h2>
          ${japaneseTitle ? `<p><strong>Japanese:</strong> ${japaneseTitle}</p>` : ''}
          <p><strong>Type:</strong> ${type}</p>
          ${status ? `<p><strong>Status:</strong> ${status}</p>` : ''}
          ${genres.length > 0 ? `<p><strong>Genres:</strong> ${genres.join(', ')}</p>` : ''}
          <p><strong>Episodes

:</strong> ${totalEpisodes}</p>
          <p><strong>Description:</strong> ${description}</p>
          ${url ? `<p><a href="${url}" target="_blank" rel="noopener noreferrer" class="watch-link">View on Provider →</a></p>` : ''}
        </div>
      </div>
    </div>
  `;
  
  // Scroll to details section
  detailsContainer.scrollIntoView({ behavior: 'smooth' });
  
  // Display episodes
  if (anime.episodes && anime.episodes.length > 0) {
    currentEpisodes = anime.episodes;
    displayEpisodes(anime.episodes);
  } else {
    episodesContainer.innerHTML = '<p>No episodes available</p>';
    currentEpisodes = [];
  }
  
  serversContainer.innerHTML = '';
}

// Function to display episodes list
function displayEpisodes(episodes) {
  episodesContainer.innerHTML = '<h3>Episodes</h3>';
  
  const episodeList = episodes.map((ep, index) => {
    const epNumber = ep.number || ep.episode || ep.ep || index + 1;
    const epTitle = ep.title || ep.name || '';
    const epId = ep.id || `${index + 1}`;
    const isFiller = ep.isFiller;
    
    // Show filler indicator for hianime-scrap
    const fillerBadge = isFiller ? '<span style="color:#ffcc00;font-size:0.7em;"> ★Filler</span>' : '';
    
    return `
      <button 
        class="episode-btn ${isFiller ? 'filler' : ''}" 
        onclick="selectEpisode('${String(epId).replace(/'/g, "\\'")}', '${epNumber}')"
        title="${epTitle}${isFiller ? ' (Filler)' : ''}"
      >
        ${epNumber}${fillerBadge}
        ${epTitle ? `<br><small style="font-size:0.7em">${epTitle.substring(0, 20)}${epTitle.length > 20 ? '...' : ''}</small>` : ''}
      </button>
    `;
  }).join('');
  
  episodesContainer.innerHTML += `<div class="episodes-grid">${episodeList}</div>`;
}

// Function to display hianime-scrap servers with sub/dub/raw tabs
function displayHianimeScrapServers(data, episodeNumber, episodeId) {
  const isCustom = getUseCustomPlayer();
  
  // Add toggle switch header
  serversContainer.innerHTML = `
    <div class="player-toggle-header">
      <h3>Servers for Episode ${episodeNumber}</h3>
      <div class="player-toggle">
        <span class="toggle-custom">🎬 Custom</span>
        <label class="toggle-switch" onclick="handlePlayerToggle()">
          <input type="checkbox" id="playerToggle" ${isCustom ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-default">🌐 Default</span>
      </div>
    </div>
  `;
  
  // Handle hianime-scrap format: {success, data: {episode, sub: [...], dub: [...], raw: [...]}}
  if (!data || !data.success || !data.data) {
    serversContainer.innerHTML += '<p>No servers available for this episode. Try a different episode.</p>';
    return;
  }
  
  const serverData = data.data;
  const subServers = serverData.sub || [];
  const dubServers = serverData.dub || [];
  const rawServers = serverData.raw || [];
  
  if (subServers.length === 0 && dubServers.length === 0 && rawServers.length === 0) {
    serversContainer.innerHTML += '<p>No servers available for this episode. Try a different episode.</p>';
    return;
  }
  
  // Store server data globally for playStream access
  window.hianimeScrapServerData = {
    episodeId,
    sub: subServers,
    dub: dubServers,
    raw: rawServers
  };
  
  let html = '<div class="servers-tabs">';
  
  // Sub tab
  html += `<div class="server-tab ${subServers.length > 0 ? 'active' : ''}" onclick="showHianimeScrapServers('sub')">Sub (${subServers.length})</div>`;
  // Dub tab
  html += `<div class="server-tab ${subServers.length === 0 && dubServers.length > 0 ? 'active' : ''}" onclick="showHianimeScrapServers('dub')">Dub (${dubServers.length})</div>`;
  // Raw tab
  html += `<div class="server-tab ${subServers.length === 0 && dubServers.length === 0 && rawServers.length > 0 ? 'active' : ''}" onclick="showHianimeScrapServers('raw')">Raw (${rawServers.length})</div>`;
  
  html += '</div>';
  html += '<div id="hianimeScrapServersList" class="servers-list"></div>';
  
  serversContainer.innerHTML += html;
  
  // Show default tab
  if (subServers.length > 0) {
    showHianimeScrapServers('sub');
  } else if (dubServers.length > 0) {
    showHianimeScrapServers('dub');
  } else {
    showHianimeScrapServers('raw');
  }
}

// Function to show hianime-scrap servers by type
window.showHianimeScrapServers = function(type) {
  const container = document.getElementById('hianimeScrapServersList');
  if (!container || !window.hianimeScrapServerData) return;
  
  // Update active tab
  document.querySelectorAll('.server-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.textContent.toLowerCase().includes(type)) {
      tab.classList.add('active');
    }
  });
  
  const servers = window.hianimeScrapServerData[type] || [];
  
  if (servers.length === 0) {
    container.innerHTML = `<p>No ${type} servers available.</p>`;
    return;
  }
  
  container.innerHTML = servers.map(server => {
    const name = server.name || `Server ${server.index || ''}`;
    const id = server.id;
    const serverType = type;
    
    return `
      <div class="server-option">
        <strong>${name}</strong>
        <p>Type: ${serverType.charAt(0).toUpperCase() + serverType.slice(1)}</p>
        <p><button class="play-btn" onclick="playHianimeScrapStream('${id}', '${serverType}', '${name.replace(/'/g, "\\'")}')">▶ Play</button></p>
      </div>
    `;
  }).join('');
};

// Function to play hianime-scrap stream
window.playHianimeScrapStream = async function(serverId, serverType, serverName) {
  if (!window.hianimeScrapServerData) {
    return alert('No server data available');
  }
  
  const episodeId = window.hianimeScrapServerData.episodeId;
  const streamUrl = buildUrl('hianime-scrap', 'stream', { 
    id: episodeId, 
    type: serverType, 
    server: serverName 
  });
  
  console.log('Stream URL:', streamUrl);
  
  try {
    // Show loading indicator but keep server list visible
    let loadingEl = serversContainer.querySelector('.stream-loading');
    if (!loadingEl) {
      loadingEl = document.createElement('p');
      loadingEl.className = 'stream-loading';
      loadingEl.innerHTML = '<span class="loading-spinner"></span> Loading stream...';
      loadingEl.style.cssText = 'padding: 20px; text-align: center; color: var(--accent);';
      serversContainer.prepend(loadingEl);
    }
    
    const data = await safeFetch(streamUrl);
    
    // Remove loading indicator
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
    
    if (data && data.success && data.data) {
      displayHianimeScrapStream(data.data, serverName);
    } else {
      // Show error but keep server list visible
      let errorEl = serversContainer.querySelector('.stream-error');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'stream-error error';
        errorEl.textContent = 'Failed to load stream. Try a different server.';
        serversContainer.prepend(errorEl);
      }
    }
  } catch (error) {
    console.error('Stream error:', error);
    // Remove loading indicator
    const loadingEl = serversContainer.querySelector('.stream-loading');
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
    // Show error but keep server list visible
    let errorEl = serversContainer.querySelector('.stream-error');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.className = 'stream-error error';
      errorEl.textContent = `Error loading stream: ${error.message}`;
      serversContainer.prepend(errorEl);
    }
  }
};

// Function to display hianime-scrap stream with subtitles using custom video player
function displayHianimeScrapStream(streamData, serverName) {
  const videoUrl = streamData.link?.file || streamData.link?.directUrl || '';
  const tracks = streamData.tracks || [];
  const intro = streamData.intro || { start: 0, end: 0 };
  const outro = streamData.outro || { start: 0, end: 0 };
  const useCustom = getUseCustomPlayer();
  
  if (!videoUrl) {
    // Show error but keep server list visible
    const existingError = serversContainer.querySelector('.stream-error');
    if (!existingError) {
      const errorDiv = document.createElement('p');
      errorDiv.className = 'stream-error error';
      errorDiv.textContent = 'No video URL available';
      serversContainer.prepend(errorDiv);
    }
    return;
  }
  
  // Remove existing players
  const existingCustomPlayer = document.getElementById('customVideoPlayer');
  if (existingCustomPlayer) {
    existingCustomPlayer.remove();
  }
  const existingDefaultPlayer = document.getElementById('defaultVideoPlayer');
  if (existingDefaultPlayer) {
    existingDefaultPlayer.remove();
  }
  
  // Create video player container - prepend to keep server list visible below
  let playerContainer = document.getElementById('videoPlayer');
  if (!playerContainer) {
    playerContainer = document.createElement('div');
    playerContainer.id = 'videoPlayer';
    playerContainer.className = 'video-player-section';
    playerContainer.style.marginBottom = '20px';
    serversContainer.prepend(playerContainer);
  } else {
    serversContainer.prepend(playerContainer);
  }
  
  // Show intro/outro info
  let metaInfo = '';
  if (intro.start !== 0 || intro.end !== 0) {
    metaInfo += `<p style="color:#ffcc00;">Skip intro: ${intro.start}s - ${intro.end}s</p>`;
  }
  if (outro.start !== 0 || outro.end !== 0) {
    metaInfo += `<p style="color:#ffcc00;">Skip outro: ${outro.start}s - ${outro.end}s</p>`;
  }
  
  // Store anime title for cloud subtitle search
  window.currentAnimeTitle = serverName || window.currentAnimeTitle;
  
  // Add header with server name and meta info
  playerContainer.innerHTML = `
    <h3>Now Playing: ${serverName}</h3>
    ${metaInfo}
  `;
  
  if (useCustom) {
    // Create and append custom video player
    const player = createCustomVideoPlayer({
      videoUrl,
      title: serverName,
      tracks,
      intro,
      outro
    });
    
    playerContainer.appendChild(player);
    
    // Initialize the custom video player
    customVideoInstance = initCustomVideoPlayer(player, {
      videoUrl,
      tracks,
      intro,
      outro
    });
  } else {
    // Create and append default video player
    const player = createDefaultVideoPlayer({
      videoUrl,
      title: serverName
    });
    
    playerContainer.appendChild(player);
    
    // Initialize the default video player
    customVideoInstance = initDefaultVideoPlayer(player, {
      videoUrl
    });
  }
  
  // Set up episode navigation callbacks for hianime-scrap
  const currentIndex = window.hianimeScrapServerData?.currentEpisodeIndex ?? -1;
  const totalEpisodes = window.hianimeScrapServerData?.totalEpisodes ?? 0;
  
  if (customVideoInstance && window.hianimeScrapServerData?.episodes) {
    customVideoInstance.setEpisodeCallbacks(
      // Previous episode callback
      currentIndex > 0 ? () => {
        const prevEp = window.hianimeScrapServerData.episodes[currentIndex - 1];
        if (prevEp) {
          const epId = prevEp.id || `${window.hianimeScrapServerData.animeId}::ep=${prevEp.number}`;
          window.hianimeScrapServerData.currentEpisodeIndex = currentIndex - 1;
          playHianimeScrapStream(prevEp.id, window.hianimeScrapServerData.currentServerType || 'sub', prevEp.name || `Episode ${prevEp.number}`);
        }
      } : null,
      // Next episode callback
      currentIndex < totalEpisodes - 1 ? () => {
        const nextEp = window.hianimeScrapServerData.episodes[currentIndex + 1];
        if (nextEp) {
          const epId = nextEp.id || `${window.hianimeScrapServerData.animeId}::ep=${nextEp.number}`;
          window.hianimeScrapServerData.currentEpisodeIndex = currentIndex + 1;
          playHianimeScrapStream(nextEp.id, window.hianimeScrapServerData.currentServerType || 'sub', nextEp.name || `Episode ${nextEp.number}`);
        }
      } : null
    );
  }
}

// Function to display servers/streaming options (for animekai and animepahe)
function displayServers(data, episodeNumber) {
  const isCustom = getUseCustomPlayer();
  
  // Add toggle switch header
  serversContainer.innerHTML = `
    <div class="player-toggle-header">
      <h3>Servers for Episode ${episodeNumber}</h3>
      <div class="player-toggle">
        <span class="toggle-custom">🎬 Custom</span>
        <label class="toggle-switch" onclick="handlePlayerToggle()">
          <input type="checkbox" id="playerToggle" ${isCustom ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-default">🌐 Default</span>
      </div>
    </div>
  `;
  
  // Normalize server data
  let servers = [];
  
  if (Array.isArray(data)) {
    servers = data;
  } else if (data && data.servers && Array.isArray(data.servers)) {
    servers = data.servers;
  } else if (data && data.sources && Array.isArray(data.sources)) {
    servers = data.sources;
  } else if (data && data.data && Array.isArray(data.data)) {
    servers = data.data;
  } else if (data && data.streamingServers && Array.isArray(data.streamingServers)) {
    servers = data.streamingServers;
  }
  
  if (servers.length === 0) {
    serversContainer.innerHTML += '<p>No servers available for this episode. Try a different episode.</p>';
    return;
  }
  
  let html = '<div class="servers-list">';
  
  servers.forEach((server, index) => {
    const name = server.name || server.serverName || server.quality || `Server ${index + 1}`;
    const url = server.url || server.file || server.src || server.streamUrl || '';
    
    html += `
      <div class="server-option">
        <strong>${name}</strong>
    `;
    
    if (url) {
      // Create proxy URL for CORS bypass
      const proxiedUrl = `${PROXY_BASE}/fetch?url=${encodeURIComponent(url)}`;
      
      html += `
        <p><a href="${url}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
        <p><a href="${proxiedUrl}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
        <p><button class="play-btn" onclick="playStream('${proxiedUrl.replace(/'/g, "\\'")}', '${name.replace(/'/g, "\\'")}')">▶ Play</button></p>
      `;
      
      // Handle nested sources (for some provider responses)
      if (server.sources && Array.isArray(server.sources)) {
        server.sources.forEach((source, sIndex) => {
          const sourceUrl = source.url || source.file || source.src || '';
          if (sourceUrl) {
            const sourceProxied = `${PROXY_BASE}/fetch?url=${encodeURIComponent(sourceUrl)}`;
            const sourceQuality = source.quality || `Source ${sIndex + 1}`;
            html += `
              <hr style="margin: 10px 0; border-color: rgba(233,69,96,0.3);">
              <p><strong>${sourceQuality}</strong></p>
              <p><a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
              <p><a href="${sourceProxied}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
              <p><button class="play-btn" onclick="playStream('${sourceProxied}')">▶ Play</button></p>
            `;
          }
        });
      }
    } else {
      html += '<p>No direct URL available</p>';
    }
    
    // Show intro/outro markers if available
    if (server.intro || server.outro) {
      html += '<p class="meta">';
      if (server.intro) html += `Intro: ${server.intro.start}-${server.intro.end}s `;
      if (server.outro) html += `Outro: ${server.outro.start}-${server.outro.end}s`;
      html += '</p>';
    }
    
    html += '</div>';
  });
  
  html += '</div>';
  serversContainer.innerHTML += html;
}

// Function to play video stream with HLS.js support using custom video player
window.playStream = async function(proxiedUrl, title) {
  if (!proxiedUrl) {
    return alert('No stream URL available');
  }
  
  console.log('Playing stream:', proxiedUrl);
  
  const useCustom = getUseCustomPlayer();
  
  // Remove existing players
  const existingCustomPlayer = document.getElementById('customVideoPlayer');
  if (existingCustomPlayer) {
    existingCustomPlayer.remove();
  }
  const existingDefaultPlayer = document.getElementById('defaultVideoPlayer');
  if (existingDefaultPlayer) {
    existingDefaultPlayer.remove();
  }
  
  // Create video player container - prepend to keep server list visible
  let playerContainer = document.getElementById('videoPlayer');
  if (!playerContainer) {
    playerContainer = document.createElement('div');
    playerContainer.id = 'videoPlayer';
    playerContainer.className = 'video-player-section';
    playerContainer.style.marginBottom = '20px';
    serversContainer.prepend(playerContainer);
  } else {
    serversContainer.prepend(playerContainer);
  }
  
  // Store anime title for cloud subtitle search
  window.currentAnimeTitle = title || window.currentAnimeTitle;
  
  // Add header with title
  playerContainer.innerHTML = `<h3>Now Playing: ${title}</h3>`;
  
  if (useCustom) {
    // Create and append custom video player
    const player = createCustomVideoPlayer({
      videoUrl: proxiedUrl,
      title: title,
      tracks: [],
      intro: { start: 0, end: 0 },
      outro: { start: 0, end: 0 }
    });
    
    playerContainer.appendChild(player);
    
    // Initialize the custom video player
    customVideoInstance = initCustomVideoPlayer(player, {
      videoUrl: proxiedUrl,
      tracks: [],
      intro: { start: 0, end: 0 },
      outro: { start: 0, end: 0 }
    });
  } else {
    // Create and append default video player
    const player = createDefaultVideoPlayer({
      videoUrl: proxiedUrl,
      title: title
    });
    
    playerContainer.appendChild(player);
    
    // Initialize the default video player
    customVideoInstance = initDefaultVideoPlayer(player, {
      videoUrl: proxiedUrl
    });
  }
  
  // Set up episode navigation callbacks for animekai/animepahe
  const currentIndex = currentEpisodes.findIndex(ep => {
    const epNum = ep.number || ep.episode || ep.ep || 0;
    const currentEpNum = parseInt(document.querySelector('.episode-btn.active')?.textContent?.trim() || '0');
    return epNum === currentEpNum;
  });
  
  if (customVideoInstance && currentEpisodes.length > 0) {
    customVideoInstance.setEpisodeCallbacks(
      // Previous episode callback
      currentIndex > 0 ? () => {
        const prevEp = currentEpisodes[currentIndex - 1];
        if (prevEp) {
          const epId = prevEp.id || `${currentAnimeId}-episode-${prevEp.number || currentIndex}`;
          const epNum = prevEp.number || prevEp.episode || prevEp.ep || currentIndex;
          selectEpisode(epId, String(epNum));
        }
      } : null,
      // Next episode callback
      currentIndex < currentEpisodes.length - 1 ? () => {
        const nextEp = currentEpisodes[currentIndex + 1];
        if (nextEp) {
          const epId = nextEp.id || `${currentAnimeId}-episode-${nextEp.number || currentIndex + 2}`;
          const epNum = nextEp.number || nextEp.episode || nextEp.ep || currentIndex + 2;
          selectEpisode(epId, String(epNum));
        }
      } : null
    );
  }
}

// Event Listeners
searchBtn.addEventListener('click', searchAnime);

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchAnime();
  }
});

// Provider change handler - clear previous results
providerSelect.addEventListener('change', () => {
  resultsContainer.innerHTML = '';
  detailsContainer.innerHTML = '';
  episodesContainer.innerHTML = '';
  serversContainer.innerHTML = '';
  currentAnimeId = null;
  currentEpisodes = [];
  // Clear home page data to force reload with new provider
  homePageData = null;
});

// Home and Search navigation buttons
document.getElementById('homeBtn').addEventListener('click', showHomePage);
document.getElementById('searchNavBtn').addEventListener('click', showSearchPage);

// Initialize - show home page
document.addEventListener('DOMContentLoaded', () => {
  showHomePage();
});
