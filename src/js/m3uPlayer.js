/**
 * M3U Player Module
 * Advanced video player with M3U playlist support, enhanced controls, and improved UX
 */

// Store for custom uploaded subtitles
let customSubtitles = [];
let m3uPlayerInstance = null;
let currentPlaylist = [];
let currentPlaylistIndex = 0;
let abLoop = { start: null, end: null, active: false };
let playbackStats = {
  bitrate: 0,
  bufferHealth: 0,
  droppedFrames: 0,
  totalFrames: 0
};

// Icons for player controls
const icons = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
  volumeHigh: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
  volumeMute: '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',
  fullscreen: '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
  theater: '<svg viewBox="0 0 24 24"><path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"/><path d="M6 10h12v2H6z"/></svg>',
  pip: '<svg viewBox="0 0 24 24"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23-.41-.12-.61l1.92-3.32c.12-.22.37-.29.59-.22l2.39.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',
  playlist: '<svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',
  skipBack: '<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>',
  skipForward: '<svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>',
  previous: '<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',
  next: '<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-5.71L11.29 12H2v-2h9.29l-3-2.29zM22 6h-2V2h-2v4h-2V2h-2v4h-2V2h-2v4h-2V2H8v4H6V2H4v16h2v-4h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2V6z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
  loop: '<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>',
  frameBack: '<svg viewBox="0 0 24 24"><path d="M4 11h5v2H4zm0-4h5v2H4zm0 8h5v2H4zm6-8h10v2H10zm0 4h10v2H10zm0 4h10v2H10z"/></svg>',
  abLoop: '<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>',
  stats: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',
  help: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
};

/**
 * Parse M3U/M3U8 playlist content
 * @param {string} content - M3U file content
 * @returns {Array} Array of playlist items with metadata
 */
export function parseM3U(content) {
  const lines = content.split('\n').map(line => line.trim()).filter(line => line);
  const playlist = [];
  let currentItem = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('#EXTM3U')) {
      continue; // Header line
    }
    
    if (line.startsWith('#EXTINF:')) {
      // Parse metadata line
      const metadata = line.substring(8);
      const durationMatch = metadata.match(/(-?\d+)/);
      const duration = durationMatch ? parseInt(durationMatch[1]) : -1;
      
      // Extract title (after comma)
      const titleMatch = metadata.match(/,(.+)$/);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      // Extract additional attributes
      const attributes = {};
      const attrMatches = metadata.matchAll(/([-\w]+)="([^"]*)"/g);
      for (const match of attrMatches) {
        attributes[match[1]] = match[2];
      }
      
      currentItem = {
        duration: duration,
        title: title,
        attributes: attributes,
        url: null
      };
    } else if (line.startsWith('#EXT-X-')) {
      // HLS specific tags - store for advanced handling
      if (!currentItem) currentItem = {};
      if (!currentItem.hlsTags) currentItem.hlsTags = [];
      currentItem.hlsTags.push(line);
    } else if (line && !line.startsWith('#')) {
      // URL line
      if (!currentItem) {
        currentItem = { duration: -1, title: '', attributes: {} };
      }
      currentItem.url = line;
      playlist.push(currentItem);
      currentItem = null;
    }
  }
  
  return playlist;
}

/**
 * Create M3U player element
 * @param {Object} options - Player options
 * @returns {HTMLElement} The player container element
 */
export function createM3UPlayer(options = {}) {
  const player = document.createElement('div');
  player.className = 'm3u-video-player';
  player.id = 'm3uVideoPlayer';

  player.innerHTML = `
    <div class="m3u-player-container">
      <video id="m3uVideo" preload="metadata" crossorigin="anonymous" playsinline>
      </video>
      
      <!-- Loading Overlay -->
      <div class="player-loading hidden">
        <div class="spinner"></div>
        <p>Loading...</p>
        <div class="loading-details"></div>
      </div>
      
      <!-- Error Overlay -->
      <div class="player-error hidden">
        <div class="error-icon">⚠️</div>
        <p>Unable to load video. Please check your connection and try again.</p>
        <button class="retry-btn">Retry</button>
      </div>
      
      <!-- Stats Overlay -->
      <div class="stats-overlay hidden">
        <div class="stats-header">
          <span>Playback Statistics</span>
          <button class="close-stats">${icons.close}</button>
        </div>
        <div class="stats-content">
          <div class="stat-item"><span>Bitrate:</span><span class="stat-bitrate">-</span></div>
          <div class="stat-item"><span>Buffer Health:</span><span class="stat-buffer">-</span></div>
          <div class="stat-item"><span>Dropped Frames:</span><span class="stat-dropped">-</span></div>
          <div class="stat-item"><span>Resolution:</span><span class="stat-resolution">-</span></div>
          <div class="stat-item"><span>Current Level:</span><span class="stat-level">-</span></div>
        </div>
      </div>
      
      <!-- Keyboard Shortcuts Overlay -->
      <div class="shortcuts-overlay hidden">
        <div class="shortcuts-header">
          <h3>Keyboard Shortcuts</h3>
          <button class="close-shortcuts">${icons.close}</button>
        </div>
        <div class="shortcuts-grid">
          <div class="shortcut"><kbd>Space</kbd><span>Play/Pause</span></div>
          <div class="shortcut"><kbd>←</kbd><span>Seek Back 5s</span></div>
          <div class="shortcut"><kbd>→</kbd><span>Seek Forward 5s</span></div>
          <div class="shortcut"><kbd>J</kbd><span>Seek Back 10s</span></div>
          <div class="shortcut"><kbd>L</kbd><span>Seek Forward 10s</span></div>
          <div class="shortcut"><kbd>↑</kbd><span>Volume Up</span></div>
          <div class="shortcut"><kbd>↓</kbd><span>Volume Down</span></div>
          <div class="shortcut"><kbd>M</kbd><span>Mute/Unmute</span></div>
          <div class="shortcut"><kbd>F</kbd><span>Fullscreen</span></div>
          <div class="shortcut"><kbd>T</kbd><span>Theater Mode</span></div>
          <div class="shortcut"><kbd>P</kbd><span>Picture-in-Picture</span></div>
          <div class="shortcut"><kbd>[</kbd><span>Frame Step Back</span></div>
          <div class="shortcut"><kbd>]</kbd><span>Frame Step Forward</span></div>
          <div class="shortcut"><kbd>A</kbd><span>Set A-B Loop Start</span></div>
          <div class="shortcut"><kbd>B</kbd><span>Set A-B Loop End</span></div>
          <div class="shortcut"><kbd>S</kbd><span>Toggle Stats</span></div>
          <div class="shortcut"><kbd>?</kbd><span>Show Shortcuts</span></div>
        </div>
      </div>
      
      <!-- A-B Loop Indicator -->
      <div class="ab-loop-indicator hidden">
        <span class="ab-loop-text">A-B Loop Active</span>
        <button class="ab-loop-clear">Clear</button>
      </div>
      
      <!-- Main Controls -->
      <div class="player-controls">
        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar-bg">
            <div class="buffered-bar" style="width: 0%"></div>
            <div class="progress-bar" style="width: 0%"></div>
            <div class="ab-loop-markers"></div>
          </div>
          <div class="time-tooltip"></div>
        </div>
        
        <!-- Controls Row -->
        <div class="controls-row">
          <div class="controls-left">
            <button class="control-btn play-btn-main" title="Play/Pause">${icons.play}</button>
            <div class="skip-buttons">
              <button class="skip-btn" data-seconds="-10" title="Rewind 10s">${icons.skipBack}<span>10</span></button>
              <button class="skip-btn" data-seconds="10" title="Forward 10s"><span>10</span>${icons.skipForward}</button>
            </div>
            <div class="frame-controls">
              <button class="control-btn frame-btn" data-frames="-1" title="Previous Frame">${icons.frameBack}</button>
              <button class="control-btn frame-btn" data-frames="1" title="Next Frame">${icons.frameBack}</button>
            </div>
            <div class="volume-container">
              <button class="control-btn volume-btn" title="Mute/Unmute">${icons.volumeHigh}</button>
              <input type="range" class="volume-slider" min="0" max="1" step="0.05" value="1">
            </div>
            <div class="time-display">
              <span class="current-time">0:00</span> / <span class="duration">0:00</span>
            </div>
          </div>
          
          <div class="controls-center">
            <button class="control-btn playlist-toggle" title="Playlist">${icons.playlist}</button>
            <button class="control-btn loop-btn" title="Repeat">${icons.loop}</button>
            <button class="control-btn shuffle-btn" title="Shuffle">${icons.shuffle}</button>
            <button class="control-btn ab-loop-btn" title="A-B Loop">${icons.abLoop}</button>
          </div>
          
          <div class="controls-right">
            <button class="control-btn stats-btn" title="Statistics">${icons.stats}</button>
            <button class="control-btn help-btn" title="Keyboard Shortcuts">${icons.help}</button>
            <button class="control-btn pip-btn" title="Picture-in-Picture">${icons.pip}</button>
            <button class="control-btn theater-btn" title="Theater Mode">${icons.theater}</button>
            <div class="settings-wrapper">
              <button class="control-btn settings-btn" title="Settings">${icons.settings}</button>
              <div class="settings-menu">
                <div class="settings-menu-item" data-setting="playbackSpeed"><span>Playback Speed</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="quality"><span>Quality</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="audioTrack"><span>Audio Track</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="subtitleTrack"><span>Subtitles</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="subtitleSync"><span>Subtitle Sync</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="subtitleStyle"><span>Subtitle Style</span><span class="submenu-indicator">▶</span></div>
              </div>
              <div class="submenu playback-speed-menu">
                ${[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(speed => 
                  `<div class="submenu-item ${speed === 1 ? 'active' : ''}" data-speed="${speed}"><span class="check-icon">${icons.check}</span><span>${speed}x</span></div>`
                ).join('')}
              </div>
              <div class="submenu quality-menu">
                <div class="submenu-item active" data-quality="auto"><span class="check-icon">${icons.check}</span><span>Auto</span></div>
              </div>
              <div class="submenu audio-track-menu">
                <div class="submenu-item active" data-track="default"><span class="check-icon">${icons.check}</span><span>Default</span></div>
              </div>
              <div class="submenu subtitle-track-menu">
                <div class="submenu-item active" data-track="off"><span class="check-icon">${icons.check}</span><span>Off</span></div>
              </div>
              <div class="submenu subtitle-sync-menu">
                <div class="sync-controls">
                  <span>Sync Offset:</span>
                  <button class="sync-btn" data-offset="-100">−0.1s</button>
                  <span class="sync-value">0ms</span>
                  <button class="sync-btn" data-offset="100">+0.1s</button>
                </div>
              </div>
              <div class="submenu subtitle-style-menu">
                <div class="style-option">
                  <label>Size:</label>
                  <select class="style-size">
                    <option value="small">Small</option>
                    <option value="medium" selected>Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">X-Large</option>
                  </select>
                </div>
                <div class="style-option">
                  <label>Color:</label>
                  <input type="color" class="style-color" value="#ffffff">
                </div>
                <div class="style-option">
                  <label>Background:</label>
                  <input type="color" class="style-bg" value="#000000">
                </div>
                <div class="style-option">
                  <label>Opacity:</label>
                  <input type="range" class="style-opacity" min="0" max="1" step="0.1" value="0.8">
                </div>
              </div>
            </div>
            <button class="control-btn fullscreen-btn" title="Fullscreen">${icons.fullscreen}</button>
          </div>
        </div>
      </div>
      
      <!-- Playlist Sidebar -->
      <div class="playlist-sidebar hidden">
        <div class="playlist-header">
          <h3>Playlist</h3>
          <button class="playlist-close">${icons.close}</button>
        </div>
        <div class="playlist-actions">
          <button class="playlist-btn load-m3u">Load M3U</button>
          <button class="playlist-btn save-m3u">Save M3U</button>
          <button class="playlist-btn clear-playlist">Clear</button>
        </div>
        <input type="file" accept=".m3u,.m3u8" class="m3u-file-input" style="display:none">
        <div class="playlist-items"></div>
      </div>
      
      <!-- Subtitle Container -->
      <div class="subtitle-container subtitle-position-bottom">
        <div class="subtitle-text"></div>
      </div>
      
      <!-- Gesture Overlay -->
      <div class="gesture-overlay"></div>
    </div>
  `;

  return player;
}

/**
 * Initialize M3U player with all features
 * @param {HTMLElement} playerElement - The player container
 * @param {Object} options - Initialization options
 * @returns {Object} Player API object
 */
export function initM3UPlayer(playerElement, options = {}) {
  const video = playerElement.querySelector('#m3uVideo');
  const loadingOverlay = playerElement.querySelector('.player-loading');
  const errorOverlay = playerElement.querySelector('.player-error');
  const controls = playerElement.querySelector('.player-controls');
  const progressContainer = playerElement.querySelector('.progress-container');
  const progressBar = playerElement.querySelector('.progress-bar');
  const bufferedBar = playerElement.querySelector('.buffered-bar');
  const playBtn = playerElement.querySelector('.play-btn-main');
  const volumeBtn = playerElement.querySelector('.volume-btn');
  const volumeSlider = playerElement.querySelector('.volume-slider');
  const timeDisplay = playerElement.querySelector('.time-display');
  const currentTimeEl = timeDisplay.querySelector('.current-time');
  const durationEl = timeDisplay.querySelector('.duration');
  const subtitleContainer = playerElement.querySelector('.subtitle-container');
  const subtitleText = subtitleContainer.querySelector('.subtitle-text');
  const playlistSidebar = playerElement.querySelector('.playlist-sidebar');
  const playlistItems = playerElement.querySelector('.playlist-items');
  const statsOverlay = playerElement.querySelector('.stats-overlay');
  const shortcutsOverlay = playerElement.querySelector('.shortcuts-overlay');
  const abLoopIndicator = playerElement.querySelector('.ab-loop-indicator');

  let isPlaying = false;
  let isMuted = false;
  let isTheaterMode = false;
  let isShuffle = false;
  let isRepeat = false;
  let controlsTimeout = null;
  let hlsInstance = null;
  let subtitleOffset = 0;
  let hlsLevels = [];
  let currentLevel = -1; // -1 = auto

  // Initialize playlist from options
  if (options.playlist) {
    currentPlaylist = options.playlist;
    renderPlaylist();
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function updateProgress() {
    if (video.duration) {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percent}%`;
      currentTimeEl.textContent = formatTime(video.currentTime);
      
      // Check A-B loop
      if (abLoop.active && abLoop.end !== null) {
        if (video.currentTime >= abLoop.end) {
          video.currentTime = abLoop.start;
        }
      }
    }
  }

  function updateBuffered() {
    if (video.buffered.length > 0 && video.duration) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const percent = (bufferedEnd / video.duration) * 100;
      bufferedBar.style.width = `${percent}%`;
    }
  }

  function updateStats() {
    if (!statsOverlay.classList.contains('hidden') && hlsInstance) {
      const stats = hlsInstance.stats || {};
      playerElement.querySelector('.stat-bitrate').textContent = stats.bitrate ? `${(stats.bitrate / 1000).toFixed(0)} kbps` : '-';
      playerElement.querySelector('.stat-buffer').textContent = `${(video.buffered.length > 0 ? 
        (video.buffered.end(video.buffered.length - 1) - video.currentTime).toFixed(1) : 0)}s`;
      playerElement.querySelector('.stat-dropped').textContent = stats.droppedFrames || '0';
      playerElement.querySelector('.stat-resolution').textContent = video.videoWidth ? `${video.videoWidth}x${video.videoHeight}` : '-';
      playerElement.querySelector('.stat-level').textContent = currentLevel === -1 ? 'Auto' : `${hlsLevels[currentLevel]?.height || '?'}p`;
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
      volumeSlider.value = video.volume || 1;
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
      playerElement.classList.add('is-fullscreen');
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
      playerElement.classList.remove('is-fullscreen');
    }
  }

  function toggleTheaterMode() {
    isTheaterMode = !isTheaterMode;
    playerElement.classList.toggle('theater-mode', isTheaterMode);
    const btn = playerElement.querySelector('.theater-btn');
    if (btn) {
      btn.style.opacity = isTheaterMode ? '1' : '0.7';
    }
  }

  async function togglePiP() {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      console.error('PiP error:', error);
    }
  }

  function skipVideo(seconds) {
    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, video.duration || 0));
  }

  function frameStep(frames) {
    if (!video.paused) video.pause();
    const frameTime = 1 / 30; // Assume 30fps
    video.currentTime = Math.max(0, Math.min(video.currentTime + (frames * frameTime), video.duration || 0));
  }

  function setABLoopPoint(point) {
    if (point === 'a') {
      abLoop.start = video.currentTime;
      abLoop.end = null;
      abLoop.active = false;
      updateABLoopMarkers();
      showToast(`A-B Loop: Point A set at ${formatTime(abLoop.start)}`, 'info');
    } else if (point === 'b' && abLoop.start !== null) {
      abLoop.end = video.currentTime;
      if (abLoop.end > abLoop.start) {
        abLoop.active = true;
        updateABLoopMarkers();
        abLoopIndicator.classList.remove('hidden');
        showToast(`A-B Loop: Active ${formatTime(abLoop.start)} - ${formatTime(abLoop.end)}`, 'success');
      } else {
        showToast('Point B must be after Point A', 'error');
      }
    }
  }

  function clearABLoop() {
    abLoop = { start: null, end: null, active: false };
    updateABLoopMarkers();
    abLoopIndicator.classList.add('hidden');
  }

  function updateABLoopMarkers() {
    const markers = playerElement.querySelector('.ab-loop-markers');
    markers.innerHTML = '';
    if (abLoop.start !== null && video.duration) {
      const startPercent = (abLoop.start / video.duration) * 100;
      const markerA = document.createElement('div');
      markerA.className = 'ab-marker ab-marker-a';
      markerA.style.left = `${startPercent}%`;
      markerA.textContent = 'A';
      markers.appendChild(markerA);
    }
    if (abLoop.end !== null && video.duration) {
      const endPercent = (abLoop.end / video.duration) * 100;
      const markerB = document.createElement('div');
      markerB.className = 'ab-marker ab-marker-b';
      markerB.style.left = `${endPercent}%`;
      markerB.textContent = 'B';
      markers.appendChild(markerB);
    }
  }

  function renderPlaylist() {
    if (!playlistItems) return;
    
    if (currentPlaylist.length === 0) {
      playlistItems.innerHTML = '<p class="playlist-empty">No items in playlist</p>';
      return;
    }
    
    playlistItems.innerHTML = currentPlaylist.map((item, index) => `
      <div class="playlist-item ${index === currentPlaylistIndex ? 'active' : ''}" data-index="${index}">
        <span class="playlist-number">${index + 1}</span>
        <div class="playlist-info">
          <div class="playlist-title">${item.title || `Item ${index + 1}`}</div>
          <div class="playlist-duration">${item.duration > 0 ? formatTime(item.duration) : ''}</div>
        </div>
      </div>
    `).join('');
    
    // Add click handlers
    playlistItems.querySelectorAll('.playlist-item').forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        loadPlaylistItem(index);
      });
    });
  }

  function loadPlaylistItem(index) {
    if (index < 0 || index >= currentPlaylist.length) return;
    
    currentPlaylistIndex = index;
    const item = currentPlaylist[index];
    
    if (item && item.url) {
      loadVideo(item.url);
      renderPlaylist();
    }
  }

  function loadVideo(url) {
    showLoading();
    hideError();
    
    // Clean up existing HLS instance
    if (hlsInstance) {
      hlsInstance.destroy();
      hlsInstance = null;
    }
    
    // Check if native HLS support
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.load();
      return;
    }
    
    // Load HLS.js if needed
    if (!window.Hls) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js';
      script.onload = () => initHls(url);
      script.onerror = () => {
        hideLoading();
        showError();
      };
      document.head.appendChild(script);
    } else {
      initHls(url);
    }
  }

  function initHls(url) {
    if (!window.Hls) {
      hideLoading();
      showError();
      return;
    }
    
    hlsInstance = new window.Hls({
      enableWorker: true,
      lowLatencyMode: true,
      autoStartLoad: true
    });
    
    hlsInstance.loadSource(url);
    hlsInstance.attachMedia(video);
    
    hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, (event, data) => {
      hideLoading();
      hlsLevels = data.levels || [];
      updateQualityMenu();
      video.play().catch(() => {});
    });
    
    hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        console.error('HLS error:', data);
        showError();
      }
    });
    
    hlsInstance.on(window.Hls.Events.LEVEL_SWITCHED, (event, data) => {
      currentLevel = data.level;
    });
  }

  function updateQualityMenu() {
    const qualityMenu = playerElement.querySelector('.quality-menu');
    if (!qualityMenu || hlsLevels.length === 0) return;
    
    let html = `<div class="submenu-item ${currentLevel === -1 ? 'active' : ''}" data-quality="auto">
      <span class="check-icon">${icons.check}</span><span>Auto</span>
    </div>`;
    
    hlsLevels.forEach((level, index) => {
      const height = level.height || '?';
      html += `<div class="submenu-item" data-quality="${index}">
        <span class="check-icon">${icons.check}</span><span>${height}p</span>
      </div>`;
    });
    
    qualityMenu.innerHTML = html;
    
    // Re-attach event listeners
    qualityMenu.querySelectorAll('.submenu-item').forEach(item => {
      item.addEventListener('click', () => {
        const quality = item.dataset.quality;
        if (quality === 'auto') {
          hlsInstance?.currentLevel(-1);
          currentLevel = -1;
        } else {
          const levelIndex = parseInt(quality);
          hlsInstance?.currentLevel(levelIndex);
          currentLevel = levelIndex;
        }
        updateQualityMenu();
      });
    });
  }

  function showControls() {
    playerElement.classList.add('show-controls');
    clearTimeout(controlsTimeout);
    if (isPlaying) {
      controlsTimeout = setTimeout(() => {
        playerElement.classList.remove('show-controls');
      }, 3000);
    }
  }

  function loadM3UFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const playlist = parseM3U(content);
      if (playlist.length > 0) {
        currentPlaylist = playlist;
        currentPlaylistIndex = 0;
        renderPlaylist();
        if (playlist[0].url) {
          loadVideo(playlist[0].url);
        }
        showToast(`Loaded ${playlist.length} items`, 'success');
      } else {
        showToast('No valid items found in M3U file', 'error');
      }
    };
    reader.readAsText(file);
  }

  function saveM3UFile() {
    if (currentPlaylist.length === 0) {
      showToast('Playlist is empty', 'warning');
      return;
    }
    
    let content = '#EXTM3U\n';
    currentPlaylist.forEach(item => {
      const duration = item.duration || -1;
      const title = item.title || '';
      content += `#EXTINF:${duration},${title}\n${item.url}\n`;
    });
    
    const blob = new Blob([content], { type: 'application/vnd.apple.mpegurl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playlist.m3u';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Playlist saved', 'success');
  }

  function playNext() {
    if (currentPlaylist.length === 0) return;
    
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * currentPlaylist.length);
    } else {
      nextIndex = currentPlaylistIndex + 1;
      if (nextIndex >= currentPlaylist.length) {
        if (isRepeat) {
          nextIndex = 0;
        } else {
          return;
        }
      }
    }
    
    loadPlaylistItem(nextIndex);
  }

  function playPrevious() {
    if (currentPlaylist.length === 0) return;
    
    let prevIndex = currentPlaylistIndex - 1;
    if (prevIndex < 0) {
      if (isRepeat) {
        prevIndex = currentPlaylist.length - 1;
      } else {
        return;
      }
    }
    
    loadPlaylistItem(prevIndex);
  }

  // Event listeners
  video.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(video.duration);
    hideLoading();
  });
  
  video.addEventListener('play', () => {
    isPlaying = true;
    playBtn.innerHTML = icons.pause;
    playerElement.classList.add('playing');
  });
  
  video.addEventListener('pause', () => {
    isPlaying = false;
    playBtn.innerHTML = icons.play;
    playerElement.classList.remove('playing');
  });
  
  video.addEventListener('timeupdate', () => {
    updateProgress();
    updateBuffered();
    updateStats();
  });
  
  video.addEventListener('waiting', showLoading);
  video.addEventListener('canplay', hideLoading);
  video.addEventListener('error', showError);
  video.addEventListener('ended', () => {
    if (isRepeat && currentPlaylist.length === 1) {
      video.currentTime = 0;
      video.play();
    } else {
      playNext();
    }
  });

  // Control buttons
  playBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  volumeBtn.addEventListener('click', toggleMute);
  
  volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;
    if (video.volume > 0 && video.muted) {
      video.muted = false;
      isMuted = false;
      volumeBtn.innerHTML = icons.volumeHigh;
    }
  });

  // Skip buttons
  playerElement.querySelectorAll('.skip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const seconds = parseInt(btn.dataset.seconds);
      skipVideo(seconds);
    });
  });

  // Frame controls
  playerElement.querySelectorAll('.frame-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const frames = parseInt(btn.dataset.frames);
      frameStep(frames);
    });
  });

  // Progress bar
  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  });

  // Fullscreen
  playerElement.querySelector('.fullscreen-btn').addEventListener('click', toggleFullscreen);
  
  // Theater mode
  playerElement.querySelector('.theater-btn').addEventListener('click', toggleTheaterMode);
  
  // PiP
  playerElement.querySelector('.pip-btn').addEventListener('click', togglePiP);
  
  // Stats
  playerElement.querySelector('.stats-btn').addEventListener('click', () => {
    statsOverlay.classList.toggle('hidden');
  });
  
  playerElement.querySelector('.close-stats').addEventListener('click', () => {
    statsOverlay.classList.add('hidden');
  });
  
  // Help/Shortcuts
  playerElement.querySelector('.help-btn').addEventListener('click', () => {
    shortcutsOverlay.classList.remove('hidden');
  });
  
  playerElement.querySelector('.close-shortcuts').addEventListener('click', () => {
    shortcutsOverlay.classList.add('hidden');
  });

  // Playlist
  playerElement.querySelector('.playlist-toggle').addEventListener('click', () => {
    playlistSidebar.classList.toggle('hidden');
  });
  
  playerElement.querySelector('.playlist-close').addEventListener('click', () => {
    playlistSidebar.classList.add('hidden');
  });
  
  // M3U file input
  const m3uInput = playerElement.querySelector('.m3u-file-input');
  playerElement.querySelector('.load-m3u').addEventListener('click', () => {
    m3uInput.click();
  });
  
  m3uInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      loadM3UFile(e.target.files[0]);
    }
    m3uInput.value = '';
  });
  
  playerElement.querySelector('.save-m3u').addEventListener('click', saveM3UFile);
  
  playerElement.querySelector('.clear-playlist').addEventListener('click', () => {
    currentPlaylist = [];
    currentPlaylistIndex = 0;
    renderPlaylist();
    showToast('Playlist cleared', 'info');
  });

  // Loop and shuffle
  playerElement.querySelector('.loop-btn').addEventListener('click', () => {
    isRepeat = !isRepeat;
    playerElement.querySelector('.loop-btn').classList.toggle('active', isRepeat);
    showToast(isRepeat ? 'Repeat enabled' : 'Repeat disabled', 'info');
  });
  
  playerElement.querySelector('.shuffle-btn').addEventListener('click', () => {
    isShuffle = !isShuffle;
    playerElement.querySelector('.shuffle-btn').classList.toggle('active', isShuffle);
    showToast(isShuffle ? 'Shuffle enabled' : 'Shuffle disabled', 'info');
  });

  // A-B Loop
  playerElement.querySelector('.ab-loop-btn').addEventListener('click', () => {
    if (abLoop.start === null) {
      setABLoopPoint('a');
    } else if (abLoop.end === null) {
      setABLoopPoint('b');
    } else {
      clearABLoop();
    }
  });
  
  playerElement.querySelector('.ab-loop-clear').addEventListener('click', clearABLoop);

  // Settings menu
  const settingsBtn = playerElement.querySelector('.settings-btn');
  const settingsMenu = playerElement.querySelector('.settings-menu');
  
  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsMenu.classList.toggle('visible');
  });
  
  playerElement.addEventListener('click', (e) => {
    if (!e.target.closest('.settings-wrapper')) {
      settingsMenu.classList.remove('visible');
    }
  });

  // Playback speed
  const speedMenu = playerElement.querySelector('.playback-speed-menu');
  playerElement.querySelector('[data-setting="playbackSpeed"]').addEventListener('click', () => {
    speedMenu.classList.toggle('visible');
  });
  
  speedMenu.addEventListener('click', (e) => {
    const item = e.target.closest('.submenu-item');
    if (item) {
      const speed = parseFloat(item.dataset.speed);
      video.playbackRate = speed;
      speedMenu.querySelectorAll('.submenu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });

  // Subtitle sync
  const syncMenu = playerElement.querySelector('.subtitle-sync-menu');
  playerElement.querySelector('[data-setting="subtitleSync"]').addEventListener('click', () => {
    syncMenu.classList.toggle('visible');
  });
  
  syncMenu.querySelectorAll('.sync-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const offset = parseInt(btn.dataset.offset);
      subtitleOffset += offset;
      syncMenu.querySelector('.sync-value').textContent = `${subtitleOffset}ms`;
    });
  });

  // Subtitle style
  const styleMenu = playerElement.querySelector('.subtitle-style-menu');
  playerElement.querySelector('[data-setting="subtitleStyle"]').addEventListener('click', () => {
    styleMenu.classList.toggle('visible');
  });
  
  const updateSubtitleStyle = () => {
    const size = styleMenu.querySelector('.style-size').value;
    const color = styleMenu.querySelector('.style-color').value;
    const bg = styleMenu.querySelector('.style-bg').value;
    const opacity = styleMenu.querySelector('.style-opacity').value;
    
    subtitleText.style.fontSize = size === 'small' ? '14px' : size === 'medium' ? '18px' : size === 'large' ? '24px' : '32px';
    subtitleText.style.color = color;
    subtitleText.style.backgroundColor = bg;
    subtitleText.style.opacity = opacity;
  };
  
  styleMenu.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('change', updateSubtitleStyle);
  });

  // Mouse controls
  playerElement.addEventListener('mousemove', showControls);
  playerElement.addEventListener('mouseleave', () => {
    if (isPlaying) {
      playerElement.classList.remove('show-controls');
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (!playerElement.isConnected) return;
    if (e.target.tagName === 'INPUT') return;
    
    switch (e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlay();
        break;
      case 'm':
        toggleMute();
        break;
      case 'f':
        toggleFullscreen();
        break;
      case 't':
        toggleTheaterMode();
        break;
      case 'p':
        e.preventDefault();
        togglePiP();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        skipVideo(-5);
        break;
      case 'ArrowRight':
        e.preventDefault();
        skipVideo(5);
        break;
      case 'ArrowUp':
        e.preventDefault();
        video.volume = Math.min(1, video.volume + 0.1);
        volumeSlider.value = video.volume;
        break;
      case 'ArrowDown':
        e.preventDefault();
        video.volume = Math.max(0, video.volume - 0.1);
        volumeSlider.value = video.volume;
        break;
      case 'j':
        skipVideo(-10);
        break;
      case 'l':
        skipVideo(10);
        break;
      case '[':
        frameStep(-1);
        break;
      case ']':
        frameStep(1);
        break;
      case 'a':
        setABLoopPoint('a');
        break;
      case 'b':
        if (abLoop.start !== null) setABLoopPoint('b');
        break;
      case 's':
        statsOverlay.classList.toggle('hidden');
        break;
      case '?':
        shortcutsOverlay.classList.remove('hidden');
        break;
      case 'Escape':
        shortcutsOverlay.classList.add('hidden');
        statsOverlay.classList.add('hidden');
        break;
    }
  });

  // Error retry
  playerElement.querySelector('.retry-btn').addEventListener('click', () => {
    hideError();
    showLoading();
    const currentItem = currentPlaylist[currentPlaylistIndex];
    if (currentItem && currentItem.url) {
      loadVideo(currentItem.url);
    }
  });

  // Initialize
  if (options.videoUrl) {
    loadVideo(options.videoUrl);
  } else if (currentPlaylist.length > 0 && currentPlaylist[0].url) {
    loadVideo(currentPlaylist[0].url);
  }

  // Create player API
  m3uPlayerInstance = {
    element: playerElement,
    video,
    loadVideo,
    loadPlaylist: (playlist) => {
      currentPlaylist = playlist;
      currentPlaylistIndex = 0;
      renderPlaylist();
      if (playlist.length > 0 && playlist[0].url) {
        loadVideo(playlist[0].url);
      }
    },
    addToPlaylist: (item) => {
      currentPlaylist.push(item);
      renderPlaylist();
    },
    clearPlaylist: () => {
      currentPlaylist = [];
      currentPlaylistIndex = 0;
      renderPlaylist();
    },
    playNext,
    playPrevious,
    setEpisodeCallbacks: (onPrev, onNext) => {
      // For compatibility with existing code
      if (onPrev) {
        playerElement.querySelector('.prev-episode')?.addEventListener('click', onPrev);
      }
      if (onNext) {
        playerElement.querySelector('.next-episode')?.addEventListener('click', onNext);
      }
    },
    destroy: () => {
      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
      }
      video.pause();
      video.src = '';
      playerElement.remove();
    }
  };

  return m3uPlayerInstance;
}

// Toast notification helper
function showToast(message, type = 'info') {
  const existing = document.querySelector('.m3u-toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = `m3u-toast ${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transition: all 0.3s ease;
    background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196f3'};
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Export functions
export { m3uPlayerInstance, currentPlaylist };
export default { createM3UPlayer, initM3UPlayer, parseM3U };
