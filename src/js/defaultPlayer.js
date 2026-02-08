/**
 * Default Video Player Module
 * Browser native video player with HLS.js support
 */

/**
 * Create a default browser video player
 * @param {Object} options - Player options
 * @param {string} options.videoUrl - Video URL to play
 * @param {string} options.title - Video title
 * @returns {HTMLElement} The player container element
 */
export function createDefaultVideoPlayer(options) {
  const { videoUrl = '', title = 'Video' } = options;
  
  const player = document.createElement('div');
  player.className = 'default-video-player';
  player.id = 'defaultVideoPlayer';
  
  player.innerHTML = `
    <video id="defaultVideo" preload="metadata" controls playsinline>
      <source src="${videoUrl}" type="application/vnd.apple.mpegurl">
    </video>
    <div class="default-player-info">
      <p>Using default browser player</p>
      <p class="video-title">${title}</p>
    </div>
  `;
  
  return player;
}

/**
 * Initialize the default video player with HLS.js support
 * @param {HTMLElement} playerElement - The player container element
 * @param {Object} options - Initialization options
 * @param {string} options.videoUrl - Video URL to load
 * @returns {Object} Player API object
 */
export function initDefaultVideoPlayer(playerElement, options = {}) {
  const video = playerElement.querySelector('#defaultVideo');
  const videoUrl = options.videoUrl || '';
  
  let hlsInstance = null;
  
  function initHlsForDefaultPlayer(video, videoUrl) {
    try {
      if (!window.Hls) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js';
        script.onload = () => initHlsInternalDefault(video, videoUrl);
        script.onerror = () => {
          console.error('Failed to load HLS.js');
        };
        document.head.appendChild(script);
      } else {
        initHlsInternalDefault(video, videoUrl);
      }
    } catch (error) {
      console.warn('HLS playback failed:', error);
    }
  }
  
  function initHlsInternalDefault(video, videoUrl) {
    if (!window.Hls || !video) return;
    
    hlsInstance = new window.Hls({
      enableWorker: true,
      lowLatencyMode: true
    });
    
    hlsInstance.loadSource(videoUrl);
    hlsInstance.attachMedia(video);
    
    hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
      console.log('HLS manifest parsed for default player');
    });
    
    hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
      console.error('HLS error in default player:', data);
    });
  }
  
  function loadVideo(url) {
    if (!video) return;
    
    // Destroy existing HLS instance
    if (hlsInstance) {
      hlsInstance.destroy();
      hlsInstance = null;
    }
    
    // Check if browser supports HLS natively
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else {
      // Use HLS.js for browsers that don't support HLS natively
      initHlsForDefaultPlayer(video, url);
    }
  }
  
  // Initialize with video URL if provided
  if (videoUrl) {
    // Check if browser supports HLS natively
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoUrl;
    } else {
      // Use HLS.js for browsers that don't support HLS natively
      initHlsForDefaultPlayer(video, videoUrl);
    }
  }
  
  return {
    element: playerElement,
    video,
    loadVideo,
    destroy: () => {
      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
      }
    }
  };
}

/**
 * Helper function to load HLS stream for default player
 * @param {HTMLVideoElement} video - Video element
 * @param {string} videoUrl - HLS stream URL
 */
export function loadHlsStream(video, videoUrl) {
  try {
    // Load HLS.js if not already loaded
    if (!window.Hls) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js';
      script.onload = () => initHlsForPlayer(video, videoUrl);
      script.onerror = () => {
        console.error('Failed to load HLS.js');
        window.open(videoUrl, '_blank');
      };
      document.head.appendChild(script);
    } else {
      initHlsForPlayer(video, videoUrl);
    }
  } catch (hlsError) {
    console.warn('HLS playback failed:', hlsError);
    window.open(videoUrl, '_blank');
  }
}

/**
 * Initialize HLS.js for a video element
 * @param {HTMLVideoElement} video - Video element
 * @param {string} videoUrl - HLS stream URL
 * @returns {Object} HLS instance or null
 */
function initHlsForPlayer(video, videoUrl) {
  if (!window.Hls || !video) return null;
  
  const hls = new window.Hls({
    enableWorker: true,
    lowLatencyMode: true
  });
  
  hls.loadSource(videoUrl);
  hls.attachMedia(video);
  
  hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
    video.play().catch(playError => {
      console.warn('Auto-play prevented:', playError);
    });
  });
  
  hls.on(window.Hls.Events.ERROR, (event, data) => {
    console.error('HLS error:', data);
    
    if (data.fatal) {
      switch (data.type) {
        case window.Hls.ErrorTypes.NETWORK_ERROR:
          hls.startLoad();
          break;
        case window.Hls.ErrorTypes.MEDIA_ERROR:
          hls.recoverMediaError();
          break;
        default:
          // Fatal error - open in new tab
          window.open(videoUrl, '_blank');
          return;
      }
    }
  });
  
  return hls;
}

