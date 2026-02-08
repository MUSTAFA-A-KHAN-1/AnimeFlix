/**
 * Subtitle Utilities Module
 * Handles parsing, uploading, and managing subtitle tracks
 */

// Store for custom uploaded subtitles (shared with custom player)
let customSubtitles = [];

/**
 * Parse SRT subtitle format
 * @param {string} content - Raw SRT content
 * @returns {Array} Array of cue objects with startTime, endTime, text
 */
export function parseSRT(content) {
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

/**
 * Parse VTT subtitle format
 * @param {string} content - Raw VTT content
 * @returns {Array} Array of cue objects with startTime, endTime, text
 */
export function parseVTT(content) {
  const cues = [];
  const pattern = /(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;
  let match;
  
  // Remove WEBVTT header if present
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

/**
 * Parse time string to seconds
 * @param {string} timeStr - Time string (HH:MM:SS,mmm or HH:MM:SS.mmm)
 * @returns {number} Time in seconds
 */
export function parseTime(timeStr) {
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

/**
 * Format time for VTT
 * @param {number} seconds - Time in seconds
 * @returns {string} VTT formatted time string
 */
export function formatTimeVTT(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

/**
 * Add custom subtitle track to video
 * @param {Array} cues - Array of cue objects
 * @param {string} label - Track label
 * @param {string} language - Language code (default: 'en')
 * @param {HTMLVideoElement} video - Video element to add track to
 * @returns {HTMLTrackElement} The created track element
 */
export function addCustomSubtitleTrack(cues, label, language = 'en', video) {
  if (!video) {
    console.warn('Video element required for addCustomSubtitleTrack');
    return null;
  }
  
  // Create a new track element
  const track = document.createElement('track');
  track.label = label;
  track.kind = 'subtitles';
  track.srclang = language;
  track.mode = 'hidden';
  
  // Convert cues to VTT format
  let vttContent = 'WEBVTT\n\n';
  cues.forEach((cue, index) => {
    vttContent += `${formatTimeVTT(cue.startTime)} --> ${formatTimeVTT(cue.endTime)}\n${cue.text}\n\n`;
  });
  
  // Create blob from VTT content
  const blob = new Blob([vttContent], { type: 'text/vtt' });
  const url = URL.createObjectURL(blob);
  track.src = url;
  
  // Add to video
  video.appendChild(track);
  
  // Store reference for cleanup later
  customSubtitles.push({ track, url, label, language, cues });
  
  // Show first custom subtitle by default
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
export function handleSubtitleUpload(file, video) {
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
 * Detect language from filename
 * @param {string} filename - The filename to analyze
 * @returns {string} Language code
 */
export function detectLanguage(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('english') || lower.includes('eng')) return 'en';
  if (lower.includes('spanish') || lower.includes('español')) return 'es';
  if (lower.includes('french') || lower.includes('français')) return 'fr';
  if (lower.includes('german') || lower.includes('deutsch')) return 'de';
  if (lower.includes('italian') || lower.includes('italiano')) return 'it';
  if (lower.includes('portuguese') || lower.includes('português')) return 'pt';
  if (lower.includes('russian') || lower.includes('русский')) return 'ru';
  if (lower.includes('japanese')) return 'ja';
  if (lower.includes('korean')) return 'ko';
  if (lower.includes('chinese') || lower.includes('中文')) return 'zh';
  return 'en'; // Default to English
}

/**
 * Get mock subtitle results for demo
 * @param {string} query - Search query
 * @returns {Array} Mock subtitle results
 */
export function getMockSubtitleResults(query) {
  return [
    { id: '1', file_name: `${query} English.srt`, language: 'en', downloads: 1000, rating: 8.5 },
    { id: '2', file_name: `${query} English [SDH].srt`, language: 'en', downloads: 800, rating: 8.2 },
    { id: '3', file_name: `${query} Spanish.srt`, language: 'es', downloads: 500, rating: 7.9 },
    { id: '4', file_name: `${query} French.srt`, language: 'fr', downloads: 400, rating: 7.8 },
    { id: '5', file_name: `${query} Portuguese.srt`, language: 'pt', downloads: 300, rating: 7.5 }
  ];
}

/**
 * Search cloud subtitles (Open Subtitles API)
 * @param {string} query - Search query
 * @param {Function} safeFetch - Fetch function for making API calls
 * @returns {Promise<Array>} Search results
 */
export async function searchCloudSubtitles(query, safeFetch) {
  try {
    // Using Open Subtitles API (free tier) - with proper User-Agent header
    const response = await safeFetch(`http://localhost:3000/anime/animesama/watch?episodeId={episodeId}=${encodeURIComponent(query)}`, 
    {});
    
    if (response && response.data && Array.isArray(response.data)) {
      return response.data.slice(0, 10); // Limit to 10 results
    }
    return [];
  } catch (error) {
    console.error('Cloud subtitle search error:', error);
    // Return mock results for demo if API fails
    return getMockSubtitleResults(query);
  }
}

/**
 * Download and load cloud subtitle
 * @param {string} subtitleId - Subtitle ID to download
 * @param {string} fileName - Filename for language detection
 * @param {Function} safeFetch - Fetch function for making API calls
 * @param {HTMLVideoElement} video - Video element to add track to
 * @returns {Promise<boolean>} Success status
 */
export async function downloadAndLoadCloudSubtitle(subtitleId, fileName, safeFetch, video) {
  try {
    // Fetch the actual subtitle file from Open Subtitles API
    const response = await safeFetch(`https://api.opensubtitles.com/api/v1/download/${subtitleId}`, {
      headers: {
        'Api-Key': 'Y2xvdWQtMTYzODU2MkAxNzMxNjM2NjI3OmRhMWQxNDM0YWFkZjM0ZGU4NzgwMjhhZTk0OWE0YzU0',
        'User-Agent': 'AnimeFlix v1.0.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // Use POST for download endpoint
      method: 'POST',
      body: JSON.stringify({ file_name: fileName })
    });
    
    if (response && response.link) {
      // Fetch the actual subtitle file content
      const subtitleContent = await safeFetch(response.link);
      
      // Parse and add the subtitle
      let cues = [];
      if (typeof subtitleContent === 'string') {
        // Content is already text, parse it
        if (subtitleContent.includes('WEBVTT')) {
          cues = parseVTT(subtitleContent);
        } else {
          cues = parseSRT(subtitleContent);
        }
      } else if (typeof subtitleContent === 'object') {
        // Already parsed JSON
        cues = subtitleContent;
      }
      
      if (cues.length > 0) {
        const language = detectLanguage(fileName);
        addCustomSubtitleTrack(cues, fileName, language, video);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Download error:', error);
    return false;
  }
}

/**
 * Get all uploaded subtitles
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

/**
 * Remove a specific subtitle by index
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
 * Update the uploaded subtitles list in the UI
 * @param {HTMLElement} listElement - The list container element
 */
export function updateUploadedSubtitlesList(listElement) {
  if (!listElement) return;
  
  if (customSubtitles.length === 0) {
    listElement.innerHTML = '<p style="color: var(--text-light); font-size: 0.85em; padding: 10px;">No subtitles uploaded</p>';
    return;
  }
  
  listElement.innerHTML = customSubtitles.map((sub, index) => `
    <div class="loaded-subtitle-item ${index === customSubtitles.length - 1 ? 'active' : ''}">
      <span class="name">${sub.label.substring(0, 25)}${sub.label.length > 25 ? '...' : ''}</span>
      <button class="remove-btn" onclick="removeSubtitle(${index})">✕</button>
    </div>
  `).join('');
}

