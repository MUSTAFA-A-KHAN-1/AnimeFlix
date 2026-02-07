# HiAnime Scrap Provider Implementation Plan

## Overview
Create a new provider "hianime-scrap" that integrates with the new HiAnime API at `https://api.animo.qzz.io/api/v1`

## Information Gathered

### Current Codebase Analysis

**src/main.js:**
- Current providers: `animekai` and `animepahe`
- Uses `PROVIDERS` object with `templates` for API endpoints
- `buildUrl()` function replaces placeholders with encoded values
- `safeFetch()` handles JSON responses with error handling
- Key functions: `searchAnime()`, `selectAnime()`, `selectEpisode()`, `displayServers()`, `playStream()`
- `displayServers()` handles server selection and creates proxy URLs
- `playStream()` supports HLS.js and native HLS playback

**index.html:**
- Provider dropdown with options for animekai and animepahe
- Main containers: `#results`, `#details`, `#episodes`, `#servers`

**API Response Structures (from task):**
- Search: `{success, data: {pageInfo, response: [...]}}`
- Episodes: `{success, data: [...]}`
- Servers: `{success, data: {episode, sub: [...], dub: [...], raw: [...]}}`
- Stream: `{success, data: {id, type, link, tracks, intro, outro, server}}`

## Plan

### Phase 1: Provider Configuration (main.js)
1. Add `hianime-scrap` provider to `PROVIDERS` object with:
   - Base URL: `https://api.animo.qzz.io/api/v1`
   - Templates for: search, info (anime details), episodes, servers, stream

### Phase 2: Update buildUrl() (main.js)
1. Ensure `buildUrl()` handles the new endpoint patterns correctly
2. Add special handling for `type` and `server` params in stream URL

### Phase 3: Update searchAnime() (main.js)
1. Add hianime-scrap specific response parsing for:
   - `data.data.response` array
   - Extract: title, id, poster, episodes.{sub,dub,eps}, type, duration

### Phase 4: Update selectAnime() (main.js)
1. Add hianime-scrap specific parsing for anime details from `/animes/{id}`
2. Extract: title, poster, type, status, genres, description

### Phase 5: Update Episodes Handling (main.js)
1. Modify `extractEpisodes()` to handle hianime-scrap format:
   - `data.data` array with: id, title, alternativeTitle, isFiller, episodeNumber

### Phase 6: Update selectEpisode() (main.js)
1. Add hianime-scrap specific servers fetching from `/servers?id={episodeId}`
2. Parse sub/dub/raw server structure

### Phase 7: Update displayServers() (main.js)
1. Add hianime-scrap specific server display with tabs for sub/dub/raw
2. Show server name and index

### Phase 8: Update playStream() (main.js)
1. Add hianime-scrap stream URL generation with `type` and `server` params
2. Support subtitle tracks from `tracks` array
3. Handle intro/outro markers

### Phase 9: Update index.html
1. Add `<option value="hianime-scrap">HiAnime Scrap</option>` to providerSelect

## Files to Modify

| File | Changes |
|------|---------|
| `src/main.js` | Provider config, search, anime details, episodes, servers, stream |
| `index.html` | Add provider option |

## Implementation Order

1. Add provider configuration
2. Add search parsing for hianime-scrap
3. Add anime details parsing
4. Add episodes parsing
5. Add servers handling
6. Add stream playback with subtitles
7. Update HTML dropdown
8. Test all functionality

## Dependent Files to be Edited

- `src/main.js` - Main implementation file
- `index.html` - UI dropdown update

## Followup Steps

1. Test search functionality
2. Test anime details display
3. Test episodes list
4. Test servers selection
5. Test video playback with subtitles

