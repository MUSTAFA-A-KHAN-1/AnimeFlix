# Player Refactoring TODO

## Task 1: Create customPlayer.js ✅ COMPLETE
- [x] Move `createCustomVideoPlayer` function from main.js
- [x] Move `initCustomVideoPlayer` function from main.js
- [x] Export both functions
- [x] Add subtitle helper functions (parseSRT, parseVTT, etc.)
- [x] Export `removeSubtitle`, `getCustomSubtitles`, `clearCustomSubtitles`

## Task 2: Update defaultPlayer.js ✅ COMPLETE
- [x] Verify `createDefaultVideoPlayer` export
- [x] Verify `initDefaultVideoPlayer` export
- [x] Verify `loadHlsStream` export

## Task 3: Update subtitleUtils.js ✅ COMPLETE
- [x] Verify all subtitle utility exports

## Task 4: Update main.js ✅ COMPLETE
- [x] Add imports from customPlayer.js
- [x] Add imports from defaultPlayer.js
- [x] Remove duplicate player logic functions
- [x] Keep only wiring/coordination code

## Task 5: Testing
- [ ] Module imports verification
- [ ] Custom player playback test
- [ ] Default player playback test
- [ ] Subtitle upload test
- [ ] Player toggle test

## Summary
The refactoring is complete. main.js now only contains wiring/coordination code and imports player functionality from dedicated modules:
- `src/js/customPlayer.js` - Custom video player with controls, settings, subtitles
- `src/js/defaultPlayer.js` - Default browser player with HLS.js support
- `src/js/subtitleUtils.js` - Subtitle parsing and management utilities
