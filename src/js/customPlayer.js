/**
 * Custom Video Player Module
 * Advanced video player with custom controls, subtitles, and settings
 */

// Store for custom uploaded subtitles
let customSubtitles = [];
let customVideoInstance = null;

// Icons for player controls
const icons = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
  volumeHigh: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
  volumeMute: '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',
  fullscreen: '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23-.41-.12-.61l1.92-3.32c.12-.22.37-.29.59-.22l2.39.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',
  upload: '<svg viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>',
  cloud: '<svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',
  skipBack: '<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>',
  skipForward: '<svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>',
  previous: '<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',
  next: '<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-5.71L11.29 12H2v-2h9.29l-3-2.29zM22 6h-2V2h-2v4h-2V2h-2v4h-2V2h-2v4h-2V2H8v4H6V2H4v16h2v-4h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2V6z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
};

/**
 * Create a custom video player element
 * @param {Object} options - Player options
 * @param {string} options.videoUrl - Video URL to play
 * @param {string} options.title - Video title
 * @param {Array} options.tracks - Subtitle tracks
 * @param {Object} options.intro - Intro timestamps {start, end}
 * @param {Object} options.outro - Outro timestamps {start, end}
 * @returns {HTMLElement} The player container element
 */
export function createCustomVideoPlayer(options) {
  const { videoUrl = '', title = 'Video', tracks = [], intro = { start: 0, end: 0 }, outro = { start: 0, end: 0 } } = options;
  
  const player = document.createElement('div');
  player.className = 'custom-video-player';
  player.id = 'customVideoPlayer';

  let tracksHtml = '';
  if (tracks.length > 0) {
    tracksHtml = tracks.map(track => {
      if (track.kind === 'captions' || track.kind === 'subtitles') {
        return `<track label="${track.label}" kind="${track.kind}" src="${track.file}" ${track.default ? 'default' : ''}>`;
      }
      return '';
    }).join('');
  }

  player.innerHTML = `
    <video id="customVideo" preload="metadata" crossorigin="anonymous">
      <source src="${videoUrl}" type="application/vnd.apple.mpegurl">
      ${tracksHtml}
    </video>
    <div class="player-loading hidden"><div class="spinner"></div><p>Loading...</p></div>
    <div class="player-error hidden"><div class="error-icon">⚠️</div><p>Unable to load video. Please check your connection and try again.</p><button class="retry-btn">Retry</button></div>
    <div class="player-controls">
      <div class="progress-container"><div class="buffered-bar" style="width: 0%"></div><div class="progress-bar" style="width: 0%"></div></div>
      <div class="controls-row">
        <div class="controls-left">
          <button class="control-btn play-btn-main" title="Play/Pause">${icons.play}</button>
          <div class="skip-buttons"><button class="skip-btn" data-seconds="-10" title="Rewind 10s">${icons.skipBack}<span>10</span></button></div>
          <div class="skip-buttons"><button class="skip-btn" data-seconds="10" title="Forward 10s"><span>10</span>${icons.skipForward}</button></div>
          <div class="volume-container">
            <button class="control-btn volume-btn" title="Mute/Unmute">${icons.volumeHigh}</button>
            <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="1">
          </div>
          <div class="time-display"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
        </div>
        <div class="controls-right">
          <div class="episode-nav">
            <button class="episode-nav-btn prev-episode" title="Previous Episode" disabled>${icons.previous}</button>
            <span class="current-episode">${title}</span>
            <button class="episode-nav-btn next-episode" title="Next Episode" disabled>${icons.next}</button>
          </div>
          <div class="settings-wrapper" style="position: relative;">
            <button class="control-btn settings-btn" title="Settings">${icons.settings}</button>
            <div class="settings-menu">
              <div class="settings-menu-item" data-setting="playbackSpeed"><span>Playback Speed</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitleTrack"><span>Subtitles</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitleSize"><span>Subtitle Size</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitlePosition"><span>Subtitle Position</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="uploadSubtitle"><span>Upload Subtitle</span><span>${icons.upload}</span></div>
              <div class="settings-menu-item" data-setting="cloudSubtitles"><span>Search Cloud</span><span>${icons.cloud}</span></div>
            </div>
            <div class="submenu playback-speed-menu">
              ${[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => `<div class="submenu-item" data-speed="${speed}"><span class="check-icon">${icons.check}</span><span>${speed}x</span></div>`).join('')}
            </div>
            <div class="submenu subtitle-track-menu">
              <div class="submenu-item active" data-track="off"><span class="check-icon">${icons.check}</span><span>Off</span></div>
              <div class="submenu-item" data-track="uploaded"><span class="check-icon">${icons.check}</span><span>Uploaded</span></div>
            </div>
            <div class="submenu subtitle-size-menu">
              ${['Small', 'Medium', 'Large', 'X-Large'].map(size => `<div class="submenu-item" data-size="${size.toLowerCase()}"><span class="check-icon">${icons.check}</span><span>${size}</span></div>`).join('')}
            </div>
            <div class="submenu subtitle-position-menu">
              <div class="submenu-item" data-position="top"><span class="check-icon">${icons.check}</span><span>Top</span></div>
              <div class="submenu-item active" data-position="bottom"><span class="check-icon">${icons.check}</span><span>Bottom</span></div>
              <div class="subtitle-offset-controls" style="padding: 10px; display: flex; align-items: center; justify-content: space-between; gap: 10px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 5px;">
                <span style="font-size: 0.85em; color: #aaa;">Offset:</span>
                <button class="offset-btn" data-offset="-20" style="padding: 5px 10px; background: rgba(255,255,255,0.1); border: none; color: white; border-radius: 4px; cursor: pointer;">−</button>
                <span class="offset-value" style="font-size: 0.85em; min-width: 30px; text-align: center;">0</span>
                <button class="offset-btn" data-offset="20" style="padding: 5px 10px; background: rgba(255,255,255,0.1); border: none; color: white; border-radius: 4px; cursor: pointer;">+</button>
              </div>
            </div>
            <div class="submenu cloud-subtitles-menu">
              <div class="cloud-subtitles-search">
                <input type="text" placeholder="Search subtitles..." class="cloud-search-input">
                <button class="cloud-search-btn">🔍</button>
              </div>
              <div class="cloud-subtitles-results"></div>
            </div>
            <div class="submenu upload-subtitle-menu">
              <div class="upload-zone">
                <input type="file" accept=".srt,.vtt" class="subtitle-input" multiple>
                <p>Drop subtitle files here</p>
                <p class="file-types">.srt, .vtt</p>
              </div>
              <div class="uploaded-subtitles-list"></div>
            </div>
          </div>
          <button class="control-btn fullscreen-btn" title="Fullscreen">${icons.fullscreen}</button>
        </div>
      </div>
    </div>
    <div class="subtitle-container subtitle-position-bottom"><div class="subtitle-text"></div></div>
    <div class="player-tooltip"></div>
    <input type="file" accept=".srt,.vtt" id="subtitleFileInput" style="display:none" multiple>
  `;

  return player;
}

/**
 * Initialize the custom video player with all controls and features
 * @param {HTMLElement} playerElement - The player container element
 * @param {Object} options - Initialization options
 * @param {string} options.videoUrl - Video URL to load
 * @param {Array} options.tracks - Subtitle tracks
 * @param {Object} options.intro - Intro timestamps
 * @param {Object} options.outro - Outro timestamps
 * @param {Function} options.showToast - Toast notification function
 * @param {Function} options.safeFetch - Safe fetch function for API calls
 * @returns {Object} Player API object
 */
export function initCustomVideoPlayer(playerElement, options = {}) {
  const video = playerElement.querySelector('#customVideo');
  const loadingOverlay = playerElement.querySelector('.player-loading');
  const errorOverlay = playerElement.querySelector('.player-error');
  const controls = playerElement.querySelector('.player-controls');
  const progressContainer = playerElement.querySelector('.progress-container');
  const progressBar = playerElement.querySelector('.progress-bar');
  const bufferedBar = playerElement.querySelector('.buffered-bar');
  const playBtn = playerElement.querySelector('.play-btn-main');
  const volumeBtn = playerElement.querySelector('.volume-btn');
  const volumeSlider = playerElement.querySelector('.volume-slider');
  const skipButtons = playerElement.querySelectorAll('.skip-btn');
  const fullscreenBtn = playerElement.querySelector('.fullscreen-btn');
  const settingsBtn = playerElement.querySelector('.settings-btn');
  const settingsMenu = playerElement.querySelector('.settings-menu');
  const timeDisplay = playerElement.querySelector('.time-display');
  const currentTimeEl = timeDisplay.querySelector('.current-time');
  const durationEl = timeDisplay.querySelector('.duration');
  const subtitleContainer = playerElement.querySelector('.subtitle-container');
  const subtitleText = subtitleContainer.querySelector('.subtitle-text');

  const { showToast, safeFetch } = options;

  let isPlaying = false;
  let isMuted = false;
  let controlsTimeout = null;
  let hlsInstance = null;
  let subtitleOffset = 0;

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function updateProgress() {
    if (video.duration) {
      progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
      currentTimeEl.textContent = formatTime(video.currentTime);
    }
  }

  function updateBuffered() {
    if (video.buffered.length > 0) {
      bufferedBar.style.width = `${(video.buffered.end(video.buffered.length - 1) / video.duration) * 100}%`;
    }
  }

  function showLoading() { loadingOverlay.classList.remove('hidden'); }
  function hideLoading() { loadingOverlay.classList.add('hidden'); }
  function showError() { errorOverlay.classList.remove('hidden'); controls.classList.add('hidden'); }
  function hideError() { errorOverlay.classList.add('hidden'); controls.classList.remove('hidden'); }

  function togglePlay() {
    if (video.paused) {
      video.play().catch(() => {});
      isPlaying = true;
      playBtn.innerHTML = icons.pause;
      playerElement.classList.add('playing');
    } else {
      video.pause();
      isPlaying = false;
      playBtn.innerHTML = icons.play;
      playerElement.classList.remove('playing');
    }
  }

  function toggleMute() {
    if (isMuted) {
      video.muted = false;
      isMuted = false;
      volumeBtn.innerHTML = icons.volumeHigh;
      volumeSlider.value = video.volume;
    } else {
      video.muted = true;
      isMuted = true;
      volumeBtn.innerHTML = icons.volumeMute;
      volumeSlider.value = 0;
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      playerElement.requestFullscreen?.() || playerElement.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
  }

  function skipVideo(seconds) {
    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, video.duration));
  }

  function showControls() {
    if (window.smoothPlayer && window.smoothPlayer.showControlsSmooth) {
      window.smoothPlayer.showControlsSmooth(playerElement);
    } else {
      playerElement.classList.add('show-controls');
      clearTimeout(controlsTimeout);
      if (isPlaying) {
        controlsTimeout = setTimeout(() => {
          playerElement.classList.remove('show-controls');
        }, 3000);
      }
    }
  }

  function initHls(videoUrl) {
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoUrl;
      return;
    }
    try {
      if (!window.Hls) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js';
        script.onload = () => initHlsInternal(videoUrl);
        script.onerror = showError;
        document.head.appendChild(script);
      } else {
        initHlsInternal(videoUrl);
      }
    } catch { showError(); }
  }

  function initHlsInternal(url) {
    if (!window.Hls) return;
    if (hlsInstance) hlsInstance.destroy();
    hlsInstance = new window.Hls({ enableWorker: true, lowLatencyMode: true });
    hlsInstance.loadSource(url);
    hlsInstance.attachMedia(video);
    hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => { hideLoading(); video.play().catch(() => {}); });
    hlsInstance.on(window.Hls.Events.ERROR, (e, data) => { if (data.fatal) showError(); });
  }

  // Event listeners
  video.addEventListener('loadedmetadata', () => { durationEl.textContent = formatTime(video.duration); hideLoading(); });
  video.addEventListener('play', () => { isPlaying = true; playBtn.innerHTML = icons.pause; showControls(); });
  video.addEventListener('pause', () => { isPlaying = false; playBtn.innerHTML = icons.play; });
  video.addEventListener('timeupdate', () => { updateProgress(); updateBuffered(); });
  video.addEventListener('waiting', showLoading);
  video.addEventListener('canplay', hideLoading);
  video.addEventListener('error', showError);

  playBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  volumeBtn.addEventListener('click', toggleMute);
  volumeSlider.addEventListener('input', (e) => { video.volume = e.target.value; volumeSlider.value = video.volume; if (video.volume > 0 && isMuted) toggleMute(); });

  skipButtons.forEach(btn => btn.addEventListener('click', () => skipVideo(parseInt(btn.dataset.seconds))));
  progressContainer.addEventListener('click', (e) => { const pos = (e.clientX - progressContainer.getBoundingClientRect().left) / progressContainer.getBoundingClientRect().width; video.currentTime = pos * video.duration; });
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  settingsBtn.addEventListener('click', () => { settingsMenu.classList.toggle('visible'); });
  playerElement.addEventListener('click', (e) => { if (!e.target.closest('.settings-wrapper')) settingsMenu.classList.remove('visible'); });

  // Playback speed
  const speedMenu = playerElement.querySelector('.playback-speed-menu');
  playerElement.querySelector('[data-setting="playbackSpeed"]')?.addEventListener('click', () => { speedMenu.classList.toggle('visible'); });
  speedMenu.querySelectorAll('.submenu-item').forEach(item => {
    item.addEventListener('click', () => {
      video.playbackRate = parseFloat(item.dataset.speed);
      speedMenu.classList.remove('visible');
      speedMenu.querySelectorAll('.submenu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Subtitle size
  const sizeMenu = playerElement.querySelector('.subtitle-size-menu');
  playerElement.querySelector('[data-setting="subtitleSize"]')?.addEventListener('click', () => { sizeMenu.classList.toggle('visible'); });
  sizeMenu.querySelectorAll('.submenu-item').forEach(item => {
    item.addEventListener('click', () => {
      subtitleContainer.className = `subtitle-container subtitle-size-${item.dataset.size}`;
      sizeMenu.classList.remove('visible');
      sizeMenu.querySelectorAll('.submenu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Subtitle position
  const positionMenu = playerElement.querySelector('.subtitle-position-menu');
  playerElement.querySelector('[data-setting="subtitlePosition"]')?.addEventListener('click', () => { positionMenu.classList.toggle('visible'); });
  positionMenu.querySelectorAll('.submenu-item[data-position]').forEach(item => {
    item.addEventListener('click', () => {
      subtitleContainer.classList.remove('subtitle-position-top', 'subtitle-position-middle', 'subtitle-position-bottom');
      subtitleContainer.classList.add(`subtitle-position-${item.dataset.position}`);
      positionMenu.querySelectorAll('.submenu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      if (showToast) showToast(`Subtitle position: ${item.dataset.position}`, 'info');
    });
  });

  // Subtitle offset controls
  const offsetValueEl = playerElement.querySelector('.offset-value');
  const offsetBtns = playerElement.querySelectorAll('.offset-btn');
  
  offsetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const change = parseInt(btn.dataset.offset);
      subtitleOffset = Math.max(-200, Math.min(200, subtitleOffset + change));
      offsetValueEl.textContent = subtitleOffset > 0 ? `+${subtitleOffset}` : subtitleOffset;
      subtitleContainer.style.bottom = `calc(100px + ${subtitleOffset}px)`;
      subtitleContainer.style.top = 'auto';
      subtitleContainer.style.transform = 'translateX(-50%)';
    });
  });

  // Subtitle track selection
  const subtitleTrackMenu = playerElement.querySelector('.subtitle-track-menu');
  playerElement.querySelector('[data-setting="subtitleTrack"]')?.addEventListener('click', () => { subtitleTrackMenu.classList.toggle('visible'); });
  
  // Upload subtitle handler
  const uploadSubtitleMenu = playerElement.querySelector('.upload-subtitle-menu');
  playerElement.querySelector('[data-setting="uploadSubtitle"]')?.addEventListener('click', () => { 
    uploadSubtitleMenu.classList.toggle('visible'); 
    subtitleTrackMenu.classList.remove('visible');
  });
  
  const uploadZone = playerElement.querySelector('.upload-zone');
  const subtitleInput = uploadZone?.querySelector('.subtitle-input');
  
  uploadZone?.addEventListener('click', () => {
    subtitleInput?.click();
  });
  
  subtitleInput?.addEventListener('change', async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name.endsWith('.srt') || file.name.endsWith('.vtt')) {
          try {
            await handleSubtitleUpload(file, video);
            updateUploadedSubtitlesList();
          } catch (error) {
            console.error('Subtitle upload error:', error);
          }
        }
      }
    }
    subtitleInput.value = '';
  });
  
  uploadZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });
  
  uploadZone?.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
  });
  
  uploadZone?.addEventListener('drop', async (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name.endsWith('.srt') || file.name.endsWith('.vtt')) {
          try {
            await handleSubtitleUpload(file, video);
            updateUploadedSubtitlesList();
          } catch (error) {
            console.error('Subtitle upload error:', error);
          }
        }
      }
    }
  });
  
  function updateUploadedSubtitlesList() {
    const list = playerElement.querySelector('.uploaded-subtitles-list');
    if (!list) return;
    
    if (customSubtitles.length === 0) {
      list.innerHTML = '<p style="color: var(--text-light); font-size: 0.85em; padding: 10px;">No subtitles uploaded</p>';
      return;
    }
    
    list.innerHTML = customSubtitles.map((sub, index) => `
      <div class="loaded-subtitle-item ${index === customSubtitles.length - 1 ? 'active' : ''}">
        <span class="name">${sub.label.substring(0, 25)}${sub.label.length > 25 ? '...' : ''}</span>
        <button class="remove-btn" onclick="removeSubtitle(${index})">✕</button>
      </div>
    `).join('');
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (!playerElement.isConnected) return;
    if (e.target.tagName === 'INPUT') return;
    switch (e.key) {
      case ' ': case 'k': e.preventDefault(); togglePlay(); break;
      case 'm': toggleMute(); break;
      case 'f': toggleFullscreen(); break;
      case 'ArrowLeft': e.preventDefault(); skipVideo(-5); break;
      case 'ArrowRight': e.preventDefault(); skipVideo(5); break;
      case 'j': skipVideo(-10); break;
      case 'l': skipVideo(10); break;
    }
  });

  playerElement.addEventListener('mousemove', showControls);
  playerElement.addEventListener('mouseleave', () => { 
    if (window.smoothPlayer && window.smoothPlayer.hideControlsSmooth && isPlaying) {
      window.smoothPlayer.hideControlsSmooth(playerElement);
    } else if (isPlaying) {
      playerElement.classList.remove('show-controls'); 
    }
  });

  video.addEventListener('timeupdate', () => {
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].mode === 'showing') {
        const cue = tracks[i].activeCues?.[0];
        subtitleText.textContent = cue ? cue.text : '';
        subtitleContainer.classList.toggle('visible', !!cue);
        break;
      }
    }
  });

  errorOverlay.querySelector('.retry-btn')?.addEventListener('click', () => { hideError(); showLoading(); initHls(playerElement.dataset.videoUrl); });

  playerElement.dataset.videoUrl = options.videoUrl || '';
  if (options.videoUrl) { showLoading(); initHls(options.videoUrl); }

  customVideoInstance = {
    element: playerElement,
    video,
    loadVideo: (url) => { playerElement.dataset.videoUrl = url; hideError(); showLoading(); initHls(url); },
    setEpisodeCallbacks: (onPrev, onNext) => {
      const prevBtn = playerElement.querySelector('.prev-episode');
      const nextBtn = playerElement.querySelector('.next-episode');
      prevBtn.disabled = !onPrev;
      nextBtn.disabled = !onNext;
      prevBtn.onclick = onPrev || (() => {});
      nextBtn.onclick = onNext || (() => {});
    }
  };

  return customVideoInstance;
}

// Subtitle helper functions (internal to module)
function parseSRT(content) {
  const cues = [];
  const pattern = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;
  let match;
  
  while ((match = pattern.exec(content)) !== null) {
    cues.push({
      startTime: parseTime(match[2]),
      endTime: parseTime(match[3]),
      text: match[4].trim()
    });
  }
  
  return cues;
}

function parseVTT(content) {
  const cues = [];
  const pattern = /(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;
  let match;
  
  content = content.replace(/^WEBVTT.*?\n\n/s, '');
  
  while ((match = pattern.exec(content)) !== null) {
    cues.push({
      startTime: parseTime(match[1]),
      endTime: parseTime(match[2]),
      text: match[3].trim()
    });
  }
  
  return cues;
}

function parseTime(timeStr) {
  const parts = timeStr.split(/[:,.]/);
  if (parts.length >= 4) {
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = parseInt(parts[2]);
    const milliseconds = parseInt(parts[3]);
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
  }
  return 0;
}

function formatTimeVTT(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

function detectLanguage(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('english') || lower.includes('eng')) return 'en';
  if (lower.includes('spanish') || lower.includes('espanol')) return 'es';
  if (lower.includes('french') || lower.includes('francais')) return 'fr';
  if (lower.includes('german') || lower.includes('deutsch')) return 'de';
  if (lower.includes('italian') || lower.includes('italiano')) return 'it';
  if (lower.includes('portuguese') || lower.includes('portugues')) return 'pt';
  if (lower.includes('russian') || lower.includes('russkiy')) return 'ru';
  if (lower.includes('japanese')) return 'ja';
  if (lower.includes('korean')) return 'ko';
  if (lower.includes('chinese') || lower.includes('zhongwen')) return 'zh';
  return 'en';
}

function addCustomSubtitleTrack(cues, label, language = 'en', video) {
  if (!video) return null;
  
  const track = document.createElement('track');
  track.label = label;
  track.kind = 'subtitles';
  track.srclang = language;
  track.mode = 'hidden';
  
  let vttContent = 'WEBVTT\n\n';
  cues.forEach((cue) => {
    vttContent += `${formatTimeVTT(cue.startTime)} --> ${formatTimeVTT(cue.endTime)}\n${cue.text}\n\n`;
  });
  
  const blob = new Blob([vttContent], { type: 'text/vtt' });
  const url = URL.createObjectURL(blob);
  track.src = url;
  
  video.appendChild(track);
  customSubtitles.push({ track, url, label, language, cues });
  
  for (let i = 0; i < video.textTracks.length; i++) {
    video.textTracks[i].mode = 'hidden';
  }
  if (video.textTracks.length > 0) {
    video.textTracks[video.textTracks.length - 1].mode = 'showing';
  }
  
  return track;
}

/**
 * Handle subtitle file upload
 * @param {File} file - The subtitle file to upload
 * @param {HTMLVideoElement} video - Video element to add track to
 * @returns {Promise<Object>} Result object with cues, label, language, track
 */
function handleSubtitleUpload(file, video) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target.result;
      let cues = [];
      
      // Detect format and parse
      if (file.name.endsWith('.srt')) {
        cues = parseSRT(content);
      } else if (file.name.endsWith('.vtt')) {
        cues = parseVTT(content);
      } else {
        // Try to detect format
        if (content.includes('WEBVTT')) {
          cues = parseVTT(content);
        } else {
          cues = parseSRT(content);
        }
      }
      
      if (cues.length > 0) {
        const language = detectLanguage(file.name);
        const track = addCustomSubtitleTrack(cues, file.name, language, video);
        resolve({ cues, label: file.name, language, track });
      } else {
        reject(new Error('Failed to parse subtitle'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Remove a subtitle by index
 * @param {number} index - Index of subtitle to remove
 * @returns {boolean} Success status
 */
export function removeSubtitle(index) {
  if (customSubtitles[index]) {
    const sub = customSubtitles[index];
    // Remove track from video
    if (sub.track && sub.track.parentNode) {
      sub.track.parentNode.removeChild(sub.track);
    }
    // Revoke blob URL
    if (sub.url) {
      URL.revokeObjectURL(sub.url);
    }
    // Remove from array
    customSubtitles.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Get all custom subtitles
 * @returns {Array} Array of subtitle objects
 */
export function getCustomSubtitles() {
  return customSubtitles;
}

/**
 * Clear all custom subtitles
 */
export function clearCustomSubtitles() {
  customSubtitles.forEach(sub => {
    if (sub.track && sub.track.parentNode) {
      sub.track.parentNode.removeChild(sub.track);
    }
    if (sub.url) {
      URL.revokeObjectURL(sub.url);
    }
  });
  customSubtitles = [];
}

// Expose removeSubtitle to global scope for onclick handlers
if (typeof window !== 'undefined') {
  window.removeSubtitle = removeSubtitle;
}
