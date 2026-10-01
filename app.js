/**
 * Travel Diary Globe - Main Application
 * Features:
 * - 3D Spinning Earth with Globe.gl
 * - Precision Ground-Anchored City Pins (no floating)
 * - Country Map Polygons Layer with colored country blocks
 * - Hover to float up "Small Page" (Preview Card)
 * - Full travel diary reader modal & slide-out index
 * - Flight route arcs & Add Journey with localStorage
 */

// Application State
const state = {
  destinations: [],
  countriesGeoJson: null,
  activeFilter: 'all',
  searchQuery: '',
  isAutoRotating: true,
  rotationSpeed: 0.55,
  showRoutes: true,
  showCountryMap: true,
  countryColorMode: 'blocks', // 'blocks' | 'visited' | 'continents'
  hoveredCountry: null,
  currentModalIndex: 0,
  globeTexture: 'night',
  world: null,
  // Timeline Component State
  activeTimelineIndex: 0,
  isTouring: false,
  tourTimer: null,
  isTimelineCollapsed: false,
  isTimelineHidden: false
};

// Texture Presets
const TEXTURES = {
  night: {
    name: 'Night Lights',
    img: 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg',
    bump: 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
    atmosphere: '#38bdf8'
  },
  blue: {
    name: 'Blue Marble',
    img: 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg',
    bump: 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
    atmosphere: '#60a5fa'
  },
  dark: {
    name: 'Dark Minimal',
    img: 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg',
    bump: 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
    atmosphere: '#818cf8'
  }
};

// Curated 16-color categorical palette for country blocks
const COUNTRY_BLOCK_PALETTE = [
  'rgba(99, 102, 241, 0.45)',   // Indigo
  'rgba(236, 72, 153, 0.45)',  // Pink
  'rgba(16, 185, 129, 0.45)',  // Emerald
  'rgba(245, 158, 11, 0.45)',   // Amber
  'rgba(14, 165, 233, 0.45)',  // Sky
  'rgba(139, 92, 246, 0.45)',  // Violet
  'rgba(244, 63, 94, 0.45)',   // Rose
  'rgba(20, 184, 166, 0.45)',  // Teal
  'rgba(234, 88, 12, 0.45)',   // Orange
  'rgba(59, 130, 246, 0.45)',   // Blue
  'rgba(168, 85, 247, 0.45)',  // Purple
  'rgba(34, 197, 94, 0.45)',   // Green
  'rgba(217, 70, 239, 0.45)',  // Fuchsia
  'rgba(6, 182, 212, 0.45)',   // Cyan
  'rgba(251, 191, 36, 0.45)',  // Gold
  'rgba(79, 70, 229, 0.45)'    // Deep Indigo
];

// Continent Color Palette
const CONTINENT_COLORS = {
  'Asia': 'rgba(244, 63, 94, 0.5)',
  'Europe': 'rgba(59, 130, 246, 0.5)',
  'North America': 'rgba(16, 185, 129, 0.5)',
  'South America': 'rgba(245, 158, 11, 0.5)',
  'Africa': 'rgba(217, 119, 6, 0.5)',
  'Oceania': 'rgba(139, 92, 246, 0.5)',
  'default': 'rgba(100, 116, 139, 0.4)'
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initData();
  initGlobe();
  initCountryPolygons();
  initUIEvents();
  renderDestinationsList();
  renderTimeline();
  updateStatsHUD();
});

/**
 * Load initial destinations from localStorage or defaults
 */
function initData() {
  state.destinations = getSavedDestinations();
}

/**
 * Initialize 3D Spinning Globe
 */
function initGlobe() {
  const container = document.getElementById('globeViz');
  const currentTex = TEXTURES[state.globeTexture];

  state.world = new Globe(container)
    .globeImageUrl(currentTex.img)
    .bumpImageUrl(currentTex.bump)
    .backgroundImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
    .showAtmosphere(true)
    .atmosphereColor(currentTex.atmosphere)
    .atmosphereAltitude(0.2)
    // HTML Elements Layer (Precision Ground Anchored)
    .htmlElementsData(getFilteredDestinations())
    .htmlLat(d => d.lat)
    .htmlLng(d => d.lng)
    // Altitude 0.008 rests directly on the country polygons/surface with zero floating parallax!
    .htmlAltitude(0.008)
    .htmlElement(d => createMarkerElement(d))
    .htmlElementVisibilityModifier((el, isVisible) => {
      el.style.opacity = isVisible ? '1' : '0';
      el.style.pointerEvents = isVisible ? 'auto' : 'none';
    });

  // Enable Auto-Rotation (Spinning Earth)
  const controls = state.world.controls();
  controls.autoRotate = state.isAutoRotating;
  controls.autoRotateSpeed = state.rotationSpeed;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  // Set initial point of view directly centered over Taiwan
  state.world.pointOfView({ lat: 23.8, lng: 121.0, altitude: 1.8 }, 1500);

  // Setup travel route arcs if enabled
  updateRouteArcs();

  // Responsive resize
  window.addEventListener('resize', () => {
    state.world.width(window.innerWidth);
    state.world.height(window.innerHeight);
  });
}

/**
 * Initialize Country Map (Polygons Layer with Color Blocks)
 */
function initCountryPolygons() {
  if (window.COUNTRIES_GEOJSON) {
    setupCountryPolygons(window.COUNTRIES_GEOJSON);
  } else {
    // Fallback: fetch GeoJSON if not pre-embedded
    fetch('./ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(geojson => {
        state.countriesGeoJson = geojson;
        setupCountryPolygons(geojson);
      })
      .catch(err => console.warn('Could not load countries GeoJSON:', err));
  }
}

/**
 * Setup Globe Polygons Layer with Color Blocks & Interactivity
 */
function setupCountryPolygons(geojson) {
  state.countriesGeoJson = geojson;
  // Exclude Antarctica ('AQ') for clean aesthetic geometry
  const features = geojson.features.filter(d => d.properties.ISO_A2 !== 'AQ');

  state.world
    .polygonsData(state.showCountryMap ? features : [])
    .polygonAltitude(d => {
      if (d === state.hoveredCountry) return 0.024; // Elevates when hovered!
      const visited = getVisitedDestinationsForCountry(d.properties);
      return visited.length > 0 ? 0.008 : 0.004; // Visited countries subtly higher
    })
    .polygonCapColor(d => getCountryCapColor(d))
    .polygonSideColor(d => {
      const visited = getVisitedDestinationsForCountry(d.properties);
      return visited.length > 0 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(15, 23, 42, 0.4)';
    })
    .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.35)')
    .polygonCapCurvatureResolution(4)
    .polygonLabel(d => renderCountryTooltip(d))
    .onPolygonHover(hoverD => {
      state.hoveredCountry = hoverD;
      state.world
        .polygonAltitude(d => {
          if (d === hoverD) return 0.024;
          const visited = getVisitedDestinationsForCountry(d.properties);
          return visited.length > 0 ? 0.008 : 0.004;
        })
        .polygonCapColor(d => getCountryCapColor(d));
    })
    .polygonsTransitionDuration(250);
}

/**
 * Check if a country has been visited and return matching travel diary spots
 */
function getVisitedDestinationsForCountry(props) {
  const name = (props.NAME || '').toLowerCase();
  const admin = (props.ADMIN || '').toLowerCase();
  const iso2 = (props.ISO_A2 || '').toUpperCase();
  const iso3 = (props.ADM0_A3 || '').toUpperCase();

  return state.destinations.filter(d => {
    const c = (d.country || '').toLowerCase().trim();
    if (c === name || c === admin) return true;
    if (c.includes('united states') && (name.includes('united states') || iso3 === 'USA' || iso2 === 'US')) return true;
    if (c === 'usa' && (iso3 === 'USA' || iso2 === 'US')) return true;
    if (c === 'uk' && (name.includes('united kingdom') || iso3 === 'GBR')) return true;
    if (c === 'taiwan' && (name.includes('taiwan') || iso3 === 'TWN')) return true;
    if (c === 'france' && (name === 'france' || admin === 'france' || iso3 === 'FRA')) return true;
    return false;
  });
}

/**
 * Calculate Country Cap Color based on Active Mode
 */
function getCountryCapColor(d) {
  const props = d.properties;
  const isHovered = d === state.hoveredCountry;
  const visited = getVisitedDestinationsForCountry(props);
  const isVisited = visited.length > 0;

  // Mode 1: Visited Focus (足跡高亮)
  if (state.countryColorMode === 'visited') {
    if (isHovered) return 'rgba(250, 204, 21, 0.9)'; // Bright gold on hover
    if (isVisited) return 'rgba(16, 185, 129, 0.75)'; // Glowing Emerald for visited!
    return 'rgba(30, 41, 59, 0.45)'; // Subtle translucent slate for unvisited
  }

  // Mode 2: Continent Themes (大洲分區)
  if (state.countryColorMode === 'continents') {
    const continent = props.CONTINENT || 'default';
    const baseColor = CONTINENT_COLORS[continent] || CONTINENT_COLORS['default'];
    if (isHovered) return 'rgba(255, 255, 255, 0.85)';
    if (isVisited) return baseColor.replace('0.5', '0.85');
    return baseColor;
  }

  // Mode 3: Vibrant Blocks (多彩國家色塊 - Default)
  // Stable hash based on country name
  const hash = Math.abs(hashString(props.NAME || props.ADMIN || ''));
  const paletteColor = COUNTRY_BLOCK_PALETTE[hash % COUNTRY_BLOCK_PALETTE.length];

  if (isHovered) {
    return 'rgba(255, 255, 255, 0.85)';
  }
  if (isVisited) {
    // Elevate visited country with richer, vivid opacity
    return paletteColor.replace('0.45', '0.85');
  }
  return paletteColor;
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/**
 * Render Rich Tooltip on Country Hover
 */
function renderCountryTooltip(d) {
  const p = d.properties;
  const visited = getVisitedDestinationsForCountry(p);
  const isVisited = visited.length > 0;
  const flag = getCountryFlagEmoji(p.ISO_A2, p.NAME);

  return `
    <div class="country-tooltip">
      <div class="tooltip-header">
        <span class="tooltip-flag">${flag}</span>
        <strong>${p.NAME || p.ADMIN}</strong>
      </div>
      <div class="tooltip-body">
        <div class="tooltip-meta-row">
          <span>Region: ${p.CONTINENT || 'World'}</span>
          <span>Pop: ${(p.POP_EST ? (p.POP_EST / 1e6).toFixed(1) + 'M' : 'N/A')}</span>
        </div>
        ${isVisited ? `
          <div class="tooltip-visited-badge">
            <span>✈️ Visited! (${visited.length} ${visited.length > 1 ? 'Entries' : 'Entry'}: ${visited.map(v => v.name.split('&')[0].trim()).join(', ')})</span>
          </div>
        ` : `
          <div class="tooltip-unvisited-badge">
            <span>Click to log journey here</span>
          </div>
        `}
      </div>
    </div>
  `;
}

function getCountryFlagEmoji(iso2, name) {
  if (iso2 && iso2.length === 2 && iso2 !== '-99') {
    return iso2.toUpperCase().replace(/./g, char => 
      String.fromCodePoint(char.charCodeAt(0) + 127397)
    );
  }
  if (name && name.toLowerCase().includes('france')) return '🇫🇷';
  return '📍';
}

/**
 * Handle Country Click on 3D Globe
 */
function handleCountryClick(d) {
  const p = d.properties;
  const visited = getVisitedDestinationsForCountry(p);

  if (visited.length > 0) {
    // Focus first visited destination in this country
    focusDestination(visited[0], 1.6);
    openDiaryModal(visited[0].id);
    showToast(`Exploring ${visited[0].name} in ${p.NAME}!`);
  } else {
    // Open Add Journey modal with country prefilled
    openAddModal();
    document.getElementById('form-country').value = p.NAME || p.ADMIN;
    document.getElementById('form-continent').value = mapGeoContinent(p.CONTINENT);
    document.getElementById('form-flag').value = getCountryFlagEmoji(p.ISO_A2, p.NAME);
    showToast(`Ready to log a journey in ${p.NAME}!`);
  }
}

function mapGeoContinent(geoContinent) {
  if (!geoContinent) return 'Asia';
  if (geoContinent.includes('Europe')) return 'Europe';
  if (geoContinent.includes('Asia')) return 'Asia';
  if (geoContinent.includes('America')) return 'Americas';
  if (geoContinent.includes('Africa')) return 'Africa';
  if (geoContinent.includes('Oceania')) return 'Oceania';
  return 'Asia';
}

/**
 * Create Precision Ground-Anchored HTML Marker
 * Anchored directly to (0, 0) with a surface ground dot and pointer tip.
 */
function createMarkerElement(d) {
  const marker = document.createElement('div');
  marker.className = 'travel-marker';
  marker.dataset.id = d.id;
  
  const accentColor = d.accentColor || '#6366f1';
  marker.style.setProperty('--marker-color', accentColor);
  marker.style.setProperty('--marker-glow', `${accentColor}55`);

  const cityName = d.name.split('&')[0].trim();

  // Build the Pin and Floating Preview Card HTML
  marker.innerHTML = `
    <!-- Floating Small Page (Preview Card) -->
    <div class="diary-preview-card">
      <div class="card-thumb" style="background-image: url('${d.cover}')">
        <div class="card-thumb-overlay"></div>
        <div class="card-badge-country">
          <span>${d.flag || '📍'}</span>
          <span>${d.country}</span>
        </div>
        <div class="card-date">${d.date || 'Visited'}</div>
      </div>
      <div class="card-body">
        <div class="card-title-row">
          <h3 class="card-title">${d.name}</h3>
          <span class="card-rating">★ ${Number(d.rating || 5).toFixed(1)}</span>
        </div>
        <p class="card-summary">"${d.summary || d.tagline || ''}"</p>
        <div class="card-tags">
          <span class="card-tag">#${d.category || 'Travel'}</span>
          <span class="card-tag">${d.duration || 'Trip'}</span>
        </div>
        <div class="card-actions">
          <button class="btn-card-read" data-action="read">
            <span>Read Story</span> 📖
          </button>
          <button class="btn-card-focus" data-action="focus" title="Focus Camera">
            <span>🎯</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Precision Ground Anchor touching Earth's surface at (0, 0) -->
    <div class="pin-ground-anchor">
      <!-- Ground dot centered right on the coordinates -->
      <div class="pin-ground-ring"></div>
      <div class="pin-ground-dot"></div>

      <!-- Compact City Badge rooted directly into ground dot -->
      <div class="pin-badge-anchor">
        <div class="pin-pill-badge">
          <span class="badge-icon">${d.icon || '📍'}</span>
          <span class="badge-text">${cityName}</span>
          <span class="badge-flag">${d.flag || ''}</span>
        </div>
        <div class="pin-pointer-tip"></div>
      </div>
    </div>
  `;

  // Interaction: When hovered, float up small page & pause Earth rotation for easy reading
  marker.addEventListener('mouseenter', () => {
    marker.classList.add('is-hovered');
    if (state.isAutoRotating && state.world) {
      state.world.controls().autoRotate = false;
    }
  });

  marker.addEventListener('mouseleave', () => {
    marker.classList.remove('is-hovered');
    if (state.isAutoRotating && state.world) {
      state.world.controls().autoRotate = true;
    }
  });

  // Pin Click: Smoothly pan Earth & open Diary Modal
  const badgeAnchor = marker.querySelector('.pin-badge-anchor');
  const groundDot = marker.querySelector('.pin-ground-dot');

  const onPinClick = (e) => {
    e.stopPropagation();
    focusDestination(d, 1.6);
    syncTimelineToDest(d.id);
    openDiaryModal(d.id);
  };

  badgeAnchor.addEventListener('click', onPinClick);
  groundDot.addEventListener('click', onPinClick);

  // Action Button: Read Story
  const readBtn = marker.querySelector('[data-action="read"]');
  readBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    focusDestination(d, 1.6);
    syncTimelineToDest(d.id);
    openDiaryModal(d.id);
  });

  // Action Button: Focus Camera
  const focusBtn = marker.querySelector('[data-action="focus"]');
  focusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    focusDestination(d, 1.4);
    syncTimelineToDest(d.id);
    showToast(`Focused on ${d.name} ${d.flag || ''}`);
  });

  return marker;
}

/**
 * Smoothly animate the camera to focus on a destination
 */
function focusDestination(d, altitude = 1.6) {
  if (!state.world) return;
  state.world.pointOfView({
    lat: d.lat,
    lng: d.lng,
    altitude: altitude
  }, 1400);
}

/**
 * Filter destinations by active continent and search query
 */
function getFilteredDestinations() {
  return state.destinations.filter(item => {
    const matchesContinent = state.activeFilter === 'all' || 
      item.continent.toLowerCase() === state.activeFilter.toLowerCase();
    
    const query = state.searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) ||
      item.country.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query));

    return matchesContinent && matchesSearch;
  });
}

/**
 * Refresh HTML Markers on the Globe
 */
function refreshGlobeMarkers() {
  if (!state.world) return;
  const filtered = getFilteredDestinations();
  state.world.htmlElementsData(filtered);
  updateRouteArcs();
  if (state.countriesGeoJson) {
    setupCountryPolygons(state.countriesGeoJson);
  }
}

/**
 * Update Curved Travel Routes / Arcs
 */
function updateRouteArcs() {
  if (!state.world) return;

  if (!state.showRoutes || state.destinations.length < 2) {
    state.world.arcsData([]);
    return;
  }

  // Connect consecutive travel spots into a round-the-world journey
  const arcs = [];
  const list = state.destinations;
  for (let i = 0; i < list.length; i++) {
    const from = list[i];
    const to = list[(i + 1) % list.length]; // circular loop
    arcs.push({
      startLat: from.lat,
      startLng: from.lng,
      endLat: to.lat,
      endLng: to.lng,
      color: [from.accentColor || '#6366f1', to.accentColor || '#ec4899']
    });
  }

  state.world
    .arcsData(arcs)
    .arcColor('color')
    .arcDashLength(0.4)
    .arcDashGap(0.2)
    .arcDashInitialGap(() => Math.random())
    .arcDashAnimateTime(2400)
    .arcStroke(1.2)
    .arcAltitude(0.25);
}

/**
 * Update Header Counters & Stats HUD
 */
function updateStatsHUD() {
  const totalSpots = state.destinations.length;
  const uniqueCountries = new Set(state.destinations.map(d => d.country)).size;
  const uniqueContinents = new Set(state.destinations.map(d => d.continent)).size;

  const spotsEl = document.getElementById('stat-spots');
  const countriesEl = document.getElementById('stat-countries');
  const continentsEl = document.getElementById('stat-continents');

  if (spotsEl) spotsEl.textContent = `${totalSpots} Spots`;
  if (countriesEl) countriesEl.textContent = `${uniqueCountries} Countries`;
  if (continentsEl) continentsEl.textContent = `${uniqueContinents} Continents`;
}

/**
 * Render Sidebar / Drawer Destinations List
 */
function renderDestinationsList() {
  const container = document.getElementById('drawer-destinations-list');
  if (!container) return;

  const filtered = getFilteredDestinations();
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <p style="font-size: 24px; margin-bottom: 8px;">🌍</p>
        <p>No travel destinations found matching criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(d => `
    <div class="drawer-card" data-id="${d.id}">
      <div class="drawer-card-img" style="background-image: url('${d.cover}')"></div>
      <div class="drawer-card-info">
        <h4 class="drawer-card-title">${d.name}</h4>
        <div class="drawer-card-meta">
          <span>${d.flag || '📍'} ${d.country}</span>
          <span>•</span>
          <span class="drawer-card-date">${d.date || 'Visited'}</span>
        </div>
      </div>
      <span style="font-size: 16px; opacity: 0.6;">➔</span>
    </div>
  `).join('');

  // Attach click listeners to cards
  container.querySelectorAll('.drawer-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const dest = state.destinations.find(item => item.id === id);
      if (dest) {
        closeDrawer();
        focusDestination(dest, 1.5);
        syncTimelineToDest(dest.id);
        showToast(`Flying to ${dest.name} ${dest.flag || ''}...`);
      }
    });
  });
}

/**
 * Open Full Travel Diary Modal Reader
 */
function openDiaryModal(destinationId) {
  const index = state.destinations.findIndex(d => d.id === destinationId);
  if (index === -1) return;

  state.currentModalIndex = index;
  syncTimelineToDest(destinationId);
  renderModalContent(state.destinations[index]);

  const modal = document.getElementById('diary-modal-backdrop');
  if (modal) {
    modal.classList.add('open');
  }

  // Temporarily pause auto-rotate while reading
  if (state.world) {
    state.world.controls().autoRotate = false;
  }
}

/**
 * Close Full Travel Diary Modal
 */
function closeDiaryModal() {
  const modal = document.getElementById('diary-modal-backdrop');
  if (modal) {
    modal.classList.remove('open');
  }
  // Resume auto-rotation if user preference is on
  if (state.isAutoRotating && state.world) {
    state.world.controls().autoRotate = true;
  }
}

/**
 * Render Content inside Diary Modal
 */
function renderModalContent(d) {
  const modal = document.getElementById('diary-modal-content');
  if (!modal) return;

  modal.innerHTML = `
    <button class="modal-close-btn" id="btn-modal-close" title="Close Diary">&times;</button>
    
    <!-- Hero Banner -->
    <div class="modal-hero" style="background-image: url('${d.cover}')">
      <div class="modal-hero-overlay">
        <div class="modal-hero-badges">
          <span class="badge-country-large">${d.flag || '📍'} ${d.country}</span>
          <span class="badge-category">${d.category || 'Travel'}</span>
          <span class="badge-category" style="background: rgba(245, 158, 11, 0.2); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24;">
            ★ ${Number(d.rating || 5).toFixed(1)}
          </span>
        </div>
        <h2 class="modal-title">${d.name}</h2>
        <p class="modal-tagline">"${d.tagline || ''}"</p>
      </div>
    </div>

    <!-- Modal Body -->
    <div class="modal-body">
      <!-- Fast Facts Grid -->
      <div class="facts-grid">
        <div class="fact-card">
          <span class="fact-label">Date Visited</span>
          <span class="fact-val">📅 ${d.date || 'Unknown'}</span>
        </div>
        <div class="fact-card">
          <span class="fact-label">Duration</span>
          <span class="fact-val">⏱️ ${d.duration || 'N/A'}</span>
        </div>
        <div class="fact-card">
          <span class="fact-label">Weather</span>
          <span class="fact-val">${d.weather || '☀️ Fine'}</span>
        </div>
        <div class="fact-card">
          <span class="fact-label">Coordinates</span>
          <span class="fact-val">🌐 ${d.lat.toFixed(2)}°, ${d.lng.toFixed(2)}°</span>
        </div>
      </div>

      <!-- Journal Story -->
      <div>
        <h3 class="modal-section-title">📖 Travel Journal & Reflections</h3>
        <div class="journal-story-text">${d.story || d.summary || ''}</div>
      </div>

      <!-- Highlights -->
      ${d.highlights && d.highlights.length ? `
        <div>
          <h3 class="modal-section-title">✨ Unforgettable Highlights</h3>
          <div class="highlights-list">
            ${d.highlights.map(h => `<div class="highlight-item"><span>✦</span> <span>${h}</span></div>`).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Gallery Strip -->
      ${d.gallery && d.gallery.length ? `
        <div>
          <h3 class="modal-section-title">📸 Photo Snapshots</h3>
          <div class="gallery-strip">
            ${d.gallery.map(img => `
              <div class="gallery-item" style="background-image: url('${img}')" title="Click to view"></div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Tips Box -->
      ${d.tips ? `
        <div class="tips-box">
          <strong>💡 Traveler's Secret & Insider Tip:</strong><br>
          ${d.tips}
        </div>
      ` : ''}
    </div>

    <!-- Modal Footer Navigation -->
    <div class="modal-footer">
      <button class="btn-nav-dest" id="btn-modal-prev">
        <span>⬅️ Previous: ${getNeighborDestination(-1).name}</span>
      </button>
      <button class="btn-nav-dest" id="btn-modal-next">
        <span>Next: ${getNeighborDestination(1).name} ➡️</span>
      </button>
    </div>
  `;

  // Attach modal close & next/prev handlers
  document.getElementById('btn-modal-close').addEventListener('click', closeDiaryModal);
  
  document.getElementById('btn-modal-prev').addEventListener('click', () => {
    navigateModal(-1);
  });

  document.getElementById('btn-modal-next').addEventListener('click', () => {
    navigateModal(1);
  });
}

function getNeighborDestination(step) {
  const len = state.destinations.length;
  const nextIdx = (state.currentModalIndex + step + len) % len;
  return state.destinations[nextIdx];
}

function navigateModal(step) {
  const nextDest = getNeighborDestination(step);
  openDiaryModal(nextDest.id);
  focusDestination(nextDest, 1.6);
}

/**
 * Open / Close Drawer
 */
function openDrawer() {
  document.getElementById('destinations-drawer').classList.add('open');
  document.getElementById('drawer-backdrop').classList.add('open');
}

function closeDrawer() {
  document.getElementById('destinations-drawer').classList.remove('open');
  document.getElementById('drawer-backdrop').classList.remove('open');
}

/**
 * Show Toast Notification
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/**
 * Setup All UI Event Listeners
 */
function initUIEvents() {
  // Drawer Toggles
  document.getElementById('btn-open-drawer').addEventListener('click', openDrawer);
  document.getElementById('btn-close-drawer').addEventListener('click', closeDrawer);
  document.getElementById('drawer-backdrop').addEventListener('click', closeDrawer);

  // Search Input inside Drawer
  const searchInput = document.getElementById('drawer-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderDestinationsList();
      refreshGlobeMarkers();
    });
  }

  // Collapsible HUD Toggle
  const hudContainer = document.getElementById('hud-container');
  const btnToggleHud = document.getElementById('btn-toggle-hud');
  const hudIcon = document.getElementById('hud-toggle-icon');
  if (btnToggleHud && hudContainer) {
    btnToggleHud.addEventListener('click', () => {
      const isCollapsed = hudContainer.classList.toggle('collapsed');
      if (hudIcon) {
        hudIcon.textContent = isCollapsed ? '>' : '×';
      }
    });
  }

  // Modal Backdrop Close
  const modalBackdrop = document.getElementById('diary-modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeDiaryModal();
      }
    });
  }

  // Escape key closes modals/drawers
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDiaryModal();
      closeDrawer();
      closeAddModal();
    }
  });

  // Initialize Global Click-to-Pause / Click-to-Resume rotation
  initGlobalClickToRotate();

  // Country Map Polygons Toggle
  const btnCountries = document.getElementById('btn-toggle-countries');
  if (btnCountries) {
    btnCountries.addEventListener('click', () => {
      state.showCountryMap = !state.showCountryMap;
      btnCountries.classList.toggle('active', state.showCountryMap);
      if (state.countriesGeoJson) {
        setupCountryPolygons(state.countriesGeoJson);
      }
      showToast(state.showCountryMap ? '🗺️ 國家色塊地圖已開啟' : '🗺️ 國家色塊地圖已隱藏');
    });
  }

  // Country Map Style Selector
  const selectCountryStyle = document.getElementById('select-country-style');
  if (selectCountryStyle) {
    selectCountryStyle.addEventListener('change', (e) => {
      state.countryColorMode = e.target.value;
      if (state.countriesGeoJson) {
        setupCountryPolygons(state.countriesGeoJson);
      }
      showToast(`風格切換：${selectCountryStyle.options[selectCountryStyle.selectedIndex].text}`);
    });
  }

  // Routes Toggle
  const btnRoutes = document.getElementById('btn-toggle-routes');
  if (btnRoutes) {
    btnRoutes.addEventListener('click', () => {
      state.showRoutes = !state.showRoutes;
      btnRoutes.classList.toggle('active', state.showRoutes);
      updateRouteArcs();
      showToast(state.showRoutes ? '✈️ 飛行航線已顯示' : '✈️ 飛行航線已隱藏');
    });
  }

  // Reset Camera View (Positioned directly over Taiwan!)
  const btnReset = document.getElementById('btn-reset-view');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (state.world) {
        state.world.pointOfView({ lat: 23.8, lng: 121.0, altitude: 1.8 }, 1200);
      }
      showToast('🇹🇼 視角已重設至台灣');
    });
  }

  // Earth Texture Switcher
  const textureSelect = document.getElementById('select-texture');
  if (textureSelect) {
    textureSelect.addEventListener('change', (e) => {
      const choice = e.target.value;
      if (TEXTURES[choice] && state.world) {
        state.globeTexture = choice;
        state.world.globeImageUrl(TEXTURES[choice].img);
        state.world.bumpImageUrl(TEXTURES[choice].bump);
        state.world.atmosphereColor(TEXTURES[choice].atmosphere);
        showToast(`Earth styled: ${TEXTURES[choice].name}`);
      }
    });
  }

  // 'Add Journey' Modal Triggers
  document.getElementById('btn-add-journey').addEventListener('click', openAddModal);
  document.getElementById('btn-close-add-modal').addEventListener('click', closeAddModal);
  document.getElementById('btn-cancel-add').addEventListener('click', closeAddModal);

  // Add Journey Form Submit
  const addForm = document.getElementById('add-journey-form');
  if (addForm) {
    addForm.addEventListener('submit', handleAddJourney);
  }

  // City preset picker for Add Journey
  const cityPresetSelect = document.getElementById('city-presets');
  if (cityPresetSelect) {
    cityPresetSelect.addEventListener('change', (e) => {
      applyCityPreset(e.target.value);
    });
  }

  // Timeline Component Events
  const prevBtn = document.getElementById('timeline-prev-btn');
  if (prevBtn) prevBtn.addEventListener('click', prevTimelineLeg);

  const nextBtn = document.getElementById('timeline-next-btn');
  if (nextBtn) nextBtn.addEventListener('click', nextTimelineLeg);

  const tourBtn = document.getElementById('timeline-tour-btn');
  if (tourBtn) tourBtn.addEventListener('click', toggleAutoTour);

  const collapseBtn = document.getElementById('timeline-collapse-btn');
  if (collapseBtn) collapseBtn.addEventListener('click', toggleTimelineCollapse);

  const collapsedTab = document.getElementById('timeline-collapsed-tab');
  if (collapsedTab) collapsedTab.addEventListener('click', toggleTimelineCollapse);

  const hudTimelineBtn = document.getElementById('btn-toggle-timeline');
  if (hudTimelineBtn) hudTimelineBtn.addEventListener('click', toggleTimelineVisibility);
}

/**
 * ==========================================================================
 * Interactive World Tour Timeline Component
 * ==========================================================================
 */

function renderTimeline() {
  const container = document.getElementById('timeline-track-nodes');
  if (!container) return;

  const destinations = state.destinations;
  if (!destinations || destinations.length === 0) {
    container.innerHTML = '<div style="color: var(--text-muted); padding: 10px;">尚無旅程站點</div>';
    return;
  }

  container.innerHTML = destinations.map((d, index) => {
    const isActive = index === state.activeTimelineIndex;
    const accentColor = d.accentColor || '#6366f1';
    const cleanCity = (d.name || '').split('&')[0].trim();

    return `
      <div class="timeline-node ${isActive ? 'active' : ''}" data-id="${d.id}" data-index="${index}">
        <div class="node-milestone-marker">
          <div class="milestone-radar"></div>
          <div class="milestone-dot" style="--node-color: ${accentColor}">
            <span class="milestone-icon">${d.icon || '📍'}</span>
          </div>
        </div>
        <div class="node-content-card">
          <div class="node-meta-row">
            <span class="node-leg-tag">LEG ${String(index + 1).padStart(2, '0')}</span>
            <span class="node-date-tag">${d.date || 'Visited'}</span>
          </div>
          <div class="node-main-row">
            <span class="node-flag">${d.flag || '📍'}</span>
            <strong class="node-city-title" title="${d.name}">${cleanCity}</strong>
          </div>
          <div class="node-country-sub">${d.country} · ${d.category || 'Travel'}</div>
        </div>
      </div>
    `;
  }).join('');

  // Attach click events to each timeline node
  container.querySelectorAll('.timeline-node').forEach(nodeEl => {
    nodeEl.addEventListener('click', () => {
      const idx = parseInt(nodeEl.dataset.index, 10);
      if (state.isTouring) {
        stopAutoTour();
      }
      selectTimelineNode(idx, true);
    });
  });

  updateTimelineStatusUI();
}

function selectTimelineNode(index, shouldFly = true) {
  if (index < 0 || index >= state.destinations.length) return;
  state.activeTimelineIndex = index;
  const d = state.destinations[index];

  // Update UI node classes
  const nodes = document.querySelectorAll('.timeline-node');
  nodes.forEach((node, i) => {
    if (i === index) {
      node.classList.add('active');
      node.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else {
      node.classList.remove('active');
    }
  });

  updateTimelineStatusUI();

  if (shouldFly && state.world) {
    focusDestination(d, 1.5);
  }
}

function updateTimelineStatusUI() {
  const d = state.destinations[state.activeTimelineIndex];
  if (!d) return;

  const legEl = document.getElementById('timeline-badge-leg');
  if (legEl) {
    legEl.textContent = `LEG ${String(state.activeTimelineIndex + 1).padStart(2, '0')} / ${state.destinations.length}`;
  }

  const captionEl = document.getElementById('timeline-caption');
  if (captionEl) {
    captionEl.innerHTML = `正在巡航第 ${state.activeTimelineIndex + 1} 站：<strong>${d.flag || ''} ${d.name}</strong> (${d.country}) · ${d.date}`;
  }
}

function nextTimelineLeg() {
  const nextIdx = (state.activeTimelineIndex + 1) % state.destinations.length;
  selectTimelineNode(nextIdx, true);
}

function prevTimelineLeg() {
  const prevIdx = (state.activeTimelineIndex - 1 + state.destinations.length) % state.destinations.length;
  selectTimelineNode(prevIdx, true);
}

function toggleAutoTour() {
  if (state.isTouring) {
    stopAutoTour();
  } else {
    startAutoTour();
  }
}

function startAutoTour() {
  state.isTouring = true;
  const btn = document.getElementById('timeline-tour-btn');
  if (btn) {
    btn.classList.add('is-touring');
    const icon = document.getElementById('tour-btn-icon');
    const text = document.getElementById('tour-btn-text');
    if (icon) icon.textContent = '⏸';
    if (text) text.textContent = '暫停巡航 (Pause Tour)';
  }

  showToast(`🚀 已啟動自動環球巡禮！每 5 秒飛越下一個精彩站點。`);
  if (state.world) {
    state.world.controls().autoRotate = false;
  }

  // Fly to current node
  selectTimelineNode(state.activeTimelineIndex, true);

  // Setup loop
  function loopTour() {
    if (!state.isTouring) return;
    clearTimeout(state.tourTimer);
    state.tourTimer = setTimeout(() => {
      if (!state.isTouring) return;
      state.activeTimelineIndex = (state.activeTimelineIndex + 1) % state.destinations.length;
      selectTimelineNode(state.activeTimelineIndex, true);
      const cur = state.destinations[state.activeTimelineIndex];
      showToast(`🛫 環球巡航 第 ${state.activeTimelineIndex + 1} 站：${cur.name} ${cur.flag || ''}`);
      loopTour();
    }, 5500);
  }

  loopTour();
}

function stopAutoTour() {
  state.isTouring = false;
  clearTimeout(state.tourTimer);

  const btn = document.getElementById('timeline-tour-btn');
  if (btn) {
    btn.classList.remove('is-touring');
    const icon = document.getElementById('tour-btn-icon');
    const text = document.getElementById('tour-btn-text');
    if (icon) icon.textContent = '▶';
    if (text) text.textContent = '自動巡航 (Auto Tour)';
  }

  if (state.isAutoRotating && state.world) {
    state.world.controls().autoRotate = true;
  }
}

function toggleTimelineCollapse() {
  const dock = document.getElementById('timeline-dock');
  const icon = document.getElementById('timeline-collapse-icon');
  if (!dock) return;

  state.isTimelineCollapsed = !state.isTimelineCollapsed;
  dock.classList.toggle('is-collapsed', state.isTimelineCollapsed);
  if (icon) {
    icon.textContent = state.isTimelineCollapsed ? '▲' : '▼';
  }
}

function toggleTimelineVisibility() {
  const dock = document.getElementById('timeline-dock');
  const btn = document.getElementById('btn-toggle-timeline');
  if (!dock) return;

  state.isTimelineHidden = !state.isTimelineHidden;
  dock.classList.toggle('is-hidden', state.isTimelineHidden);
  if (btn) {
    btn.classList.toggle('active', !state.isTimelineHidden);
  }
  showToast(state.isTimelineHidden ? '⏱️ 時間軸已隱藏' : '⏱️ 時間軸已顯示');
}

function syncTimelineToDest(destId) {
  const idx = state.destinations.findIndex(d => d.id === destId);
  if (idx !== -1) {
    selectTimelineNode(idx, false);
  }
}

/**
 * Add Journey Modal Handlers
 */
function openAddModal() {
  document.getElementById('add-modal-backdrop').classList.add('open');
}

function closeAddModal() {
  document.getElementById('add-modal-backdrop').classList.remove('open');
  document.getElementById('add-journey-form').reset();
}

const CITY_PRESETS = {
  tokyo: { name: 'Tokyo', country: 'Japan', flag: '🇯🇵', lat: 35.6762, lng: 139.6503, continent: 'Asia', icon: '🗼' },
  london: { name: 'London', country: 'United Kingdom', flag: '🇬🇧', lat: 51.5074, lng: -0.1278, continent: 'Europe', icon: '🎡' },
  rome: { name: 'Rome', country: 'Italy', flag: '🇮🇹', lat: 41.9028, lng: 12.4964, continent: 'Europe', icon: '🏛️' },
  taipei: { name: 'Taipei', country: 'Taiwan', flag: '🇹🇼', lat: 25.0330, lng: 121.5654, continent: 'Asia', icon: '🏮' },
  seoul: { name: 'Seoul', country: 'South Korea', flag: '🇰🇷', lat: 37.5665, lng: 126.9780, continent: 'Asia', icon: '🏯' },
  singapore: { name: 'Singapore', country: 'Singapore', flag: '🇸🇬', lat: 1.3521, lng: 103.8198, continent: 'Asia', icon: '🏙️' },
  rio: { name: 'Rio de Janeiro', country: 'Brazil', flag: '🇧🇷', lat: -22.9068, lng: -43.1729, continent: 'Americas', icon: '🏖️' },
  cape_town: { name: 'Cape Town', country: 'South Africa', flag: '🇿🇦', lat: -33.9249, lng: 18.4241, continent: 'Africa', icon: '🐧' }
};

function applyCityPreset(key) {
  const p = CITY_PRESETS[key];
  if (!p) return;
  document.getElementById('form-name').value = p.name;
  document.getElementById('form-country').value = p.country;
  document.getElementById('form-flag').value = p.flag;
  document.getElementById('form-lat').value = p.lat;
  document.getElementById('form-lng').value = p.lng;
  document.getElementById('form-continent').value = p.continent;
  document.getElementById('form-icon').value = p.icon;
}

function handleAddJourney(e) {
  e.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const country = document.getElementById('form-country').value.trim();
  const flag = document.getElementById('form-flag').value.trim() || '📍';
  const lat = parseFloat(document.getElementById('form-lat').value);
  const lng = parseFloat(document.getElementById('form-lng').value);
  const continent = document.getElementById('form-continent').value;
  const date = document.getElementById('form-date').value.trim() || 'Recently';
  const duration = document.getElementById('form-duration').value.trim() || 'Trip';
  const rating = parseFloat(document.getElementById('form-rating').value) || 5.0;
  const category = document.getElementById('form-category').value;
  const icon = document.getElementById('form-icon').value.trim() || '📍';
  const cover = document.getElementById('form-cover').value.trim() || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';
  const summary = document.getElementById('form-summary').value.trim();
  const story = document.getElementById('form-story').value.trim() || summary;

  if (!name || isNaN(lat) || isNaN(lng)) {
    alert('Please enter a valid destination name, latitude, and longitude.');
    return;
  }

  const newEntry = {
    id: `custom-${Date.now()}`,
    name,
    country,
    flag,
    lat,
    lng,
    continent,
    date,
    duration,
    rating,
    category,
    icon,
    accentColor: '#6366f1',
    tagline: summary.slice(0, 60),
    summary,
    story,
    cover,
    gallery: [cover],
    highlights: ['First day arrival & exploring', 'Unforgettable memories with locals'],
    weather: '☀️ Pleasant travel days'
  };

  state.destinations.unshift(newEntry);
  saveDestinations(state.destinations);

  refreshGlobeMarkers();
  renderDestinationsList();
  renderTimeline();
  updateStatsHUD();
  closeAddModal();

  // Fly to the new destination!
  selectTimelineNode(0, true);
  showToast(`🎉 Added ${newEntry.name} to your travel diary!`);
}

/**
 * Setup Global Click-to-Pause / Click-to-Resume Rotation
 * Distinguishes between mouse drags (orbiting/zooming) and true clicks.
 * Also supports touch devices (tap vs drag).
 */
function initGlobalClickToRotate() {
  let startX = 0;
  let startY = 0;
  let startTime = 0;

  // Track mousedown
  window.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
  }, true);

  // Track mouseup
  window.addEventListener('mouseup', (e) => {
    const elapsed = Date.now() - startTime;
    const distance = Math.hypot(e.clientX - startX, e.clientY - startY);

    // If mouse moved more than 6px or was held down > 500ms, it's a drag/pan/orbit, NOT a click
    if (distance > 6 || elapsed > 500) {
      return;
    }

    // Ignore clicks inside UI controls (buttons, inputs, selects, modals, drawer, preview cards, HUD, pins)
    if (e.target.closest('button, input, select, textarea, a, .diary-modal, .destinations-drawer, .diary-preview-card, .btn-card-read, .btn-card-focus, .hud-container, .pin-pill-badge, .pin-ground-dot, .pin-badge-anchor')) {
      return;
    }

    // Toggle rotation!
    toggleAutoRotate();
  }, false);

  // Touch support for mobile/tablet
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      const elapsed = Date.now() - startTime;
      const distance = Math.hypot(touch.clientX - startX, touch.clientY - startY);

      if (distance > 8 || elapsed > 500) {
        return;
      }

      if (e.target.closest('button, input, select, textarea, a, .diary-modal, .destinations-drawer, .diary-preview-card, .btn-card-read, .btn-card-focus, .hud-container, .pin-pill-badge, .pin-ground-dot, .pin-badge-anchor')) {
        return;
      }

      toggleAutoRotate();
    }
  }, false);
}

function toggleAutoRotate() {
  state.isAutoRotating = !state.isAutoRotating;
  if (state.world) {
    state.world.controls().autoRotate = state.isAutoRotating;
  }

  showToast(state.isAutoRotating ? '🌏 地球已恢復旋轉（點擊任意處暫停）' : '⏸️ 地球已暫停旋轉（點擊任意處繼續）');
}

