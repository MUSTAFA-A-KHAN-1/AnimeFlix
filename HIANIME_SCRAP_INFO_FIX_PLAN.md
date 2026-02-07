# Fix hianime-scrap Info API Issue

## Problem Analysis

The hianime-scrap provider doesn't have a working info API endpoint (`/animes/{id}`). Instead, we should extract anime details from the search results data that already contains the necessary information.

## Information Gathered

### Current Implementation Issues:
1. `selectAnime()` always calls info API endpoint for all providers
2. For hianime-scrap, the `/animes/{id}` endpoint may be unavailable
3. Search results already contain: title, poster, episodes count, type, duration

### Available Data in Search Results (hianime-scrap):
- `title`: Anime title
- `id`: Anime ID  
- `image`/`poster`: Poster image URL
- `episodes`: {sub, dub, eps} - episode counts
- `type`: TV, Movie, etc.
- `duration`: Episode duration
- `releaseDate`: Release year

## Implementation Plan

### Phase 1: Modify selectAnime() Function
1. Add provider check for hianime-scrap
2. Skip info API call for hianime-scrap
3. Use data parameter to pass anime info from search results

### Phase 2: Update displayResults() Function
1. Store anime data from search results globally
2. Pass full anime object to selectAnime() instead of just id/title

### Phase 3: Update selectAnime() Implementation
1. For hianime-scrap: Use stored anime data directly
2. For other providers: Continue using info API call
3. Normalize the data structure consistently

### Phase 4: Update normalizeAnimeData()
1. Handle hianime-scrap data passed from search results
2. Ensure consistent data structure for displayAnimeDetails()

### Phase 5: Testing
1. Test hianime-scrap provider loads details without API call
2. Verify animekai/animepahe still use info API
3. Check all details display correctly

## Files to Modify

| File | Changes |
|------|---------|
| `src/main.js` | selectAnime(), displayResults(), normalizeAnimeData() |
| `index.html` | No changes needed |

## Implementation Details

### Current displayResults() click handler:
```javascript
onclick="selectAnime('${id}', '${title}')"
```

### Updated click handler (pass full anime object):
```javascript
onclick="selectAnime('${id}', ${JSON.stringify(anime).replace(/'/g, "\\'")})"
```

### Updated selectAnime() function:
```javascript
async function selectAnime(id, animeDataFromSearch = null) {
  const provider = providerSelect.value;
  
  // For hianime-scrap, use data from search results
  if (provider === 'hianime-scrap' && animeDataFromSearch) {
    const animeData = {
      ...animeDataFromSearch,
      id: animeDataFromSearch.id || id,
      __provider: provider
    };
    displayAnimeDetails(animeData, animeDataFromSearch.title);
    
    // Fetch episodes separately if needed
    try {
      const episodesUrl = buildUrl(provider, 'episodes', { id });
      const episodesData = await safeFetch(episodesUrl);
      animeData.episodes = extractEpisodes(episodesData, provider);
      displayAnimeDetails(animeData, animeDataFromSearch.title);
    } catch (epError) {
      console.warn('Could not fetch episodes:', epError);
      displayAnimeDetails(animeData, animeDataFromSearch.title);
    }
    return;
  }
  
  // For other providers, use info API
  // ... existing code ...
}
```

## Followup Steps

1. Test hianime-scrap provider
2. Verify animekai/animepahe still work
3. Check episode counts display correctly
4. Test all provider functionality

## Risk Assessment

- **Low Risk**: Only affects hianime-scrap provider
- **No Breaking Changes**: Other providers unchanged
- **Fallback**: Can add info API fallback if needed

