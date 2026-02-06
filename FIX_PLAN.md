# AnimeFlix Provider Fix Plan

## Issues Identified:
1. **Provider Value Mismatch**: HTML shows "HIANIME"/"ANIMEPAHE" but code expects "animekai"/"animepahe"
2. **API Configuration**: Using external API but local development server available at localhost:3000
3. **Endpoint Templates**: Templates may not match actual API structures
4. **Episode ID Handling**: AnimePahe uses complex IDs with slashes requiring special handling
5. **Error Handling**: Insufficient error handling for different API response structures

## Provider-Specific Issues:

### Hianime/AnimeKai:
- Search endpoint template mismatch
- Episode ID format compatibility
- Server endpoint structure

### AnimePahe:
- Complex episode ID format (contains slashes)
- Different API response structure
- Watch endpoint parameter handling

## Implementation Plan:

### Step 1: Fix Provider Values in HTML
- Map "HIANIME" to "animekai" 
- Map "ANIMEPAHE" to "animepahe"

### Step 2: Update API Configuration
- Set default API_ROOT to localhost:3000 for development
- Add fallback to external API if local not available

### Step 3: Fix Provider Templates
- Update search endpoints for both providers
- Fix info and episodes endpoints
- Correct watch/servers endpoints

### Step 4: Improve Episode ID Handling
- Special encoding for animepahe episode IDs with slashes
- Proper parameter passing for different endpoint types

### Step 5: Enhanced Error Handling
- Better response parsing for different structures
- Fallback mechanisms for missing data
- User-friendly error messages

### Step 6: Testing Flow
- Search → Details → Episodes → Servers → Playback
- Validate each step for both providers

## Files to Modify:
1. `index.html` - Fix provider values
2. `src/main.js` - Complete provider implementation fixes

## Success Criteria:
- Both providers work correctly
- Search returns results
- Episodes display properly
- Servers/streaming links load
- Video playback functions

