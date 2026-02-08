(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();let W=null,J=null;function pt(e,s,t,n){Ue();const o=i=>{if(isNaN(i))return"0:00";const a=Math.floor(i/60),c=Math.floor(i%60);return`${a}:${c.toString().padStart(2,"0")}`},r=()=>{if(!e||!s)return;const i=e.duration;if(!i||!isFinite(i)){W=requestAnimationFrame(r);return}const a=e.currentTime,c=a/i*100;s.style.setProperty("--progress",`${c}%`),s.style.width=`${c}%`,t&&(t.textContent=o(a)),n&&(n.textContent=o(i)),W=requestAnimationFrame(r)};W=requestAnimationFrame(r)}function Ue(){W&&(cancelAnimationFrame(W),W=null)}function mt(e,s){Ee();const t=()=>{if(!(!e||!s)){if(e.buffered&&e.buffered.length>0){const n=e.buffered.end(e.buffered.length-1),o=e.duration;if(o&&isFinite(o)){const r=n/o*100;s.style.setProperty("--buffered",`${r}%`),s.style.width=`${r}%`}}J=requestAnimationFrame(t)}};J=requestAnimationFrame(t)}function Ee(){J&&(cancelAnimationFrame(J),J=null)}let le=null;function ht(e,s,t,n){if(!e)return;const o=e.currentTime,r=300,i=performance.now();t&&t.classList.add("seeking");function a(c){const d=c-i,m=Math.min(d/r,1),f=ye(m),w=o+(s-o)*f;e.currentTime=Math.max(0,Math.min(w,n||e.duration)),m<1?le=requestAnimationFrame(a):(t&&t.classList.remove("seeking"),e.currentTime=s)}le&&cancelAnimationFrame(le),le=requestAnimationFrame(a)}function ye(e){return 1-Math.pow(1-e,3)}let ce=null;function vt(e){if(!e)return;ce&&(clearTimeout(ce),ce=null),e.classList.add("show-controls"),e.classList.remove("hide-cursor");const s=e.classList.contains("playing")?4e3:5e3;ce=setTimeout(()=>{e.classList.contains("playing")&&(e.classList.remove("show-controls"),e.classList.add("hide-cursor"))},s)}function ft(e){e&&(e.classList.remove("show-controls"),e.classList.add("hide-cursor"))}let de=null;function O(e,s,t,n,o=150){if(!e)return;const r=e.volume,i=performance.now();de&&cancelAnimationFrame(de);function a(c){const d=c-i,m=Math.min(d/o,1),f=ye(m),w=r+(s-r)*f;e.volume=Math.max(0,Math.min(w,1)),t&&(t.value=e.volume),e.volume>0&&e.muted&&(e.muted=!1,n&&Pt(n)),m<1&&(de=requestAnimationFrame(a))}de=requestAnimationFrame(a)}function Pt(e,s){if(!e)return;const t={volumeHigh:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'};e.innerHTML=t.volumeHigh}function Bt(e,s){!e||!s||(e.classList.add("visible"),s.style.opacity="0",s.style.transform="translateY(10px)",s.offsetWidth,s.style.transition="opacity 0.15s ease-out, transform 0.15s ease-out",s.style.opacity="1",s.style.transform="translateY(0)")}function zt(e,s){!e||!s||(s.style.transition="opacity 0.1s ease-in, transform 0.1s ease-in",s.style.opacity="0",s.style.transform="translateY(5px)",setTimeout(()=>{e.classList.remove("visible")},100))}function me(e,s,t){e&&(e.paused?(e.play().catch(()=>{}),s.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',t.classList.add("playing"),s.style.transform="scale(1.1)",setTimeout(()=>{s.style.transform=""},150)):(e.pause(),s.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',t.classList.remove("playing"),s.style.transform="scale(0.95)",setTimeout(()=>{s.style.transform=""},100)))}function gt(e){var s,t,n,o,r,i;e&&(!document.fullscreenElement&&!document.webkitFullscreenElement&&!document.mozFullScreenElement?(e.style.transition="transform 0.3s ease-out",(s=e.requestFullscreen)!=null&&s.call(e)||(t=e.webkitRequestFullscreen)!=null&&t.call(e)||((n=e.mozRequestFullScreen)==null||n.call(e)),e.classList.add("is-fullscreen")):((o=document.exitFullscreen)!=null&&o.call(document)||(r=document.webkitExitFullscreen)!=null&&r.call(document)||((i=document.mozCancelFullScreen)==null||i.call(document)),e.classList.remove("is-fullscreen")))}let ue=null;function Ft(e,s,t=200){if(!e)return;const n=e.playbackRate,o=performance.now();ue&&cancelAnimationFrame(ue);function r(i){const a=i-o,c=Math.min(a/t,1),d=ye(c),m=n+(s-n)*d;e.playbackRate=m,c<1?ue=requestAnimationFrame(r):e.playbackRate=s}ue=requestAnimationFrame(r)}let pe=null;function Q(e,s,t=150){if(!e)return;const n=e.currentTime,o=Math.max(0,Math.min(n+s,e.duration||1/0)),r=performance.now();Ut(e.parentElement,s);function i(a){const c=a-r,d=Math.min(c/t,1),m=ye(d);e.currentTime=n+(o-n)*m,d<1?pe=requestAnimationFrame(i):e.currentTime=o}pe&&cancelAnimationFrame(pe),pe=requestAnimationFrame(i)}function Ut(e,s){if(!e)return;let t=e.querySelector(".skip-indicator");t||(t=document.createElement("div"),t.className="skip-indicator",t.innerHTML=`
      <span class="skip-indicator-icon">${s>0?"⏩":"⏪"}</span>
      <span class="skip-indicator-text">${Math.abs(s)}s</span>
    `,t.style.cssText=`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: rgba(0, 0, 0, 0.8);
      padding: 20px 40px;
      border-radius: 10px;
      z-index: 30;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      opacity: 0;
      transition: all 0.3s ease-out;
    `,e.appendChild(t)),t.style.opacity="1",t.style.transform="translate(-50%, -50%) scale(1)",setTimeout(()=>{t.style.opacity="0",t.style.transform="translate(-50%, -50%) scale(0.5)",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},500)}function He(e){e&&(e.classList.remove("hidden"),e.style.opacity="0",e.style.transform="scale(0.95)",requestAnimationFrame(()=>{e.style.transition="opacity 0.3s ease-out, transform 0.3s ease-out",e.style.opacity="1",e.style.transform="scale(1)"}))}function he(e){e&&(e.style.transition="opacity 0.25s ease-in, transform 0.25s ease-in",e.style.opacity="0",e.style.transform="scale(0.95)",setTimeout(()=>{e.classList.add("hidden"),e.style.transform=""},250))}function nt(e){e&&(e.classList.remove("hidden"),e.style.opacity="0",e.style.transform="scale(0.95)",requestAnimationFrame(()=>{e.style.transition="opacity 0.3s ease-out, transform 0.3s ease-out",e.style.opacity="1",e.style.transform="scale(1)"}))}function bt(e){e&&(e.classList.add("visible"),e.style.transform="translateY(10px) scale(0.98)",e.style.opacity="0",requestAnimationFrame(()=>{e.style.transition="transform 0.3s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.3s ease-out",e.style.transform="translateY(0) scale(1)",e.style.opacity="1"}))}function qe(e){e&&(e.style.transition="transform 0.2s ease-in, opacity 0.2s ease-in",e.style.transform="translateY(10px) scale(0.98)",e.style.opacity="0",setTimeout(()=>{e.classList.remove("visible"),e.style.transform="",e.style.opacity=""},200))}function Et(e,s){let t;return function(...n){t||(e.apply(this,n),t=!0,setTimeout(()=>t=!1,s))}}function Vt(e,s){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>e.apply(this,n),s)}}const Me=[];let Ae=!1;function Dt(e){Me.push(e),Ae||(Ae=!0,requestAnimationFrame(()=>{Me.forEach(s=>s()),Me.length=0,Ae=!1}))}function Nt(e,s={}){const t=e==null?void 0:e.querySelector("#customVideo"),n=e==null?void 0:e.querySelector(".player-loading"),o=e==null?void 0:e.querySelector(".player-error"),r=e==null?void 0:e.querySelector(".progress-bar"),i=e==null?void 0:e.querySelector(".buffered-bar"),a=e==null?void 0:e.querySelector(".play-btn-main"),c=e==null?void 0:e.querySelector(".volume-btn"),d=e==null?void 0:e.querySelector(".volume-slider"),m=e==null?void 0:e.querySelector(".time-display"),f=m==null?void 0:m.querySelector(".current-time"),w=m==null?void 0:m.querySelector(".duration"),A=e==null?void 0:e.querySelector(".progress-container"),I=e==null?void 0:e.querySelector(".subtitle-container");I==null||I.querySelector(".subtitle-text");const M=e==null?void 0:e.querySelector(".settings-menu"),B=e==null?void 0:e.querySelector(".settings-btn");return!t||!e?null:(t.addEventListener("loadedmetadata",()=>{if(w){const b=v=>{if(isNaN(v))return"0:00";const $=Math.floor(v/60),E=Math.floor(v%60);return`${$}:${E.toString().padStart(2,"0")}`};w.textContent=b(t.duration)}he(n)}),t.addEventListener("play",()=>{a.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',e.classList.add("playing"),pt(t,r,f,w),mt(t,i)}),t.addEventListener("pause",()=>{a.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',e.classList.remove("playing"),Ue(),Ee()}),t.addEventListener("waiting",()=>He(n)),t.addEventListener("canplay",()=>he(n)),t.addEventListener("error",()=>nt(o)),e.addEventListener("mousemove",()=>vt(e)),e.addEventListener("mouseleave",()=>{e.classList.contains("playing")&&ft(e)}),t.addEventListener("click",()=>me(t,a,e)),a.addEventListener("click",()=>me(t,a,e)),c.addEventListener("click",()=>{t.muted?(t.muted=!1,O(t,(d==null?void 0:d.value)||1,d,c)):(t.muted=!0,O(t,0,d,c))}),d==null||d.addEventListener("input",b=>{O(t,b.target.value,d,c,100)}),A==null||A.addEventListener("click",b=>{const v=A.getBoundingClientRect(),E=(b.clientX-v.left)/v.width*t.duration;ht(t,E,r,t.duration)}),B==null||B.addEventListener("click",b=>{b.stopPropagation(),M.classList.contains("visible")?qe(M):bt(M)}),e==null||e.addEventListener("click",b=>{b.target.closest(".settings-wrapper")||qe(M)}),document.addEventListener("keydown",b=>{if(e.isConnected&&b.target.tagName!=="INPUT")switch(b.key){case" ":case"k":b.preventDefault(),me(t,a,e);break;case"m":b.preventDefault(),t.muted?(t.muted=!1,O(t,(d==null?void 0:d.value)||1,d,c)):(t.muted=!0,O(t,0,d,c));break;case"f":b.preventDefault(),gt(e);break;case"ArrowLeft":b.preventDefault(),Q(t,-5);break;case"ArrowRight":b.preventDefault(),Q(t,5);break;case"j":Q(t,-10);break;case"l":Q(t,10);break}}),document.addEventListener("fullscreenchange",()=>{document.fullscreenElement||e.classList.remove("is-fullscreen")}),{element:e,video:t,loadVideo:b=>{if(He(n),hideErrorSmooth(o),t.canPlayType("application/vnd.apple.mpegurl"))t.src=b;else if(window.Hls){const v=new window.Hls({enableWorker:!0,lowLatencyMode:!0});v.loadSource(b),v.attachMedia(t),v.on(window.Hls.Events.MANIFEST_PARSED,()=>{he(n)}),v.on(window.Hls.Events.ERROR,($,E)=>{E.fatal&&nt(o)})}},setEpisodeCallbacks:s.setEpisodeCallbacks})}window.smoothPlayer={initSmoothPlayer:Nt,startSmoothProgressUpdate:pt,stopSmoothProgressUpdate:Ue,startBufferedUpdate:mt,stopBufferedUpdate:Ee,smoothSeek:ht,setVolumeSmooth:O,showSubtitleSmooth:Bt,hideSubtitleSmooth:zt,togglePlaySmooth:me,toggleFullscreenSmooth:gt,setPlaybackRateSmooth:Ft,skipVideoSmooth:Q,showLoadingSmooth:He,hideLoadingSmooth:he,showSettingsMenuSmooth:bt,hideSettingsMenuSmooth:qe,showControlsSmooth:vt,hideControlsSmooth:ft,throttle:Et,debounce:Vt,queueBatchUpdate:Dt};const Rt="http://localhost:3000",C=Rt,jt={"hianime-scrap":{base:"https://api.animo.qzz.io/api/v1",templates:{search:"https://hianimeapi-6uju.onrender.com/api/v1/search?keyword={query}&page=1",info:"https://hianimeapi-6uju.onrender.com/api/v1/anime/{id}",episodes:"https://hianimeapi-6uju.onrender.com/api/v1/episodes/{id}",servers:"https://hianimeapi-6uju.onrender.com/api/v1/servers/id={id}",stream:"https://api.animo.qzz.io/api/v1/stream?id={id}&type={type}&server={server}",home:"https://hianimeapi-6uju.onrender.com/api/v1/home"}},animekai:{base:C+"/anime/animekai",templates:{search:C+"/anime/animekai/{query}",info:C+"/anime/animekai/info?id={id}",episodes:C+"/anime/animekai/episodes/{id}",watch:C+"/anime/animekai/watch/{episodeId}",home:C+"/anime/animekai/new-releases"}},animepahe:{base:C+"/anime/animepahe",templates:{search:C+"/anime/animepahe/{query}",info:C+"/anime/animepahe/info/{id}",episodes:C+"/anime/animepahe/episodes/{id}",watch:C+"/anime/animepahe/watch?episodeId={episodeId}",home:C+"/anime/animekai/new-releases"}}};function q(e,s,t={}){const n=jt[e];if(!n)return console.error(`Provider ${e} not found`),"";const o=n.templates[s];if(!o)return console.error(`Template ${s} not found for provider ${e}`),"";let r=o;return Object.keys(t).forEach(i=>{let a=t[i];i==="episodeId"?a=encodeURIComponent(a):a!=null?a=encodeURIComponent(String(a)):a="",r=r.replace(new RegExp(`\\{${i}\\}`,"g"),a)}),r}async function x(e,s={}){try{const t={Accept:"application/json",...s.headers||{}};s.body&&(t["Content-Type"]="application/json");const n=await fetch(e,{...s,headers:t});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return await n.json()}catch(t){throw console.error(`Fetch error for ${e}:`,t),t}}async function _t(e,s="hianime-scrap"){var n,o,r;const t=q(s,"info",{id:e});console.log("Fetching anime info from:",t);try{const i=await x(t);return i&&i.data&&s==="hianime-scrap"?{...i.data,id:i.data.id||e,title:i.data.title,poster:i.data.poster,image:i.data.poster,synopsis:i.data.synopsis||i.data.description||"",alternativeTitle:i.data.alternativeTitle||"",rating:i.data.rating||"",type:i.data.type,is18Plus:i.data.is18Plus||!1,aired:i.data.aired||{},premiered:i.data.premiered||"",duration:i.data.duration||"",status:i.data.status,MAL_score:i.data.MAL_score||"",genres:i.data.genres||[],studios:i.data.studios||[],producers:i.data.producers||[],moreSeasons:i.data.moreSeasons||[],related:i.data.related||[],mostPopular:i.data.mostPopular||[],recommended:i.data.recommended||[],japanese:i.data.japanese||"",episodes:{sub:((n=i.data.episodes)==null?void 0:n.sub)||0,dub:((o=i.data.episodes)==null?void 0:o.dub)||0,eps:((r=i.data.episodes)==null?void 0:r.eps)||0}}:Wt(i,e,s)}catch(i){return console.error("Error fetching anime info:",i),null}}async function Ot(e,s="hianime-scrap"){const t=q(s,"episodes",{id:e});console.log("Fetching episodes from:",t);try{const n=await x(t);return Yt(n,s)}catch(n){return console.error("Error fetching episodes:",n),[]}}function Wt(e,s,t){var n,o,r;if(e&&e.data&&t==="hianime-scrap")return{...e.data,id:e.data.id||s,title:e.data.title,poster:e.data.poster,image:e.data.poster,type:e.data.type,status:e.data.status,genres:e.data.genres||[],description:e.data.description||e.data.synopsis||"",totalEpisodes:((n=e.data.episodes)==null?void 0:n.eps)||((o=e.data.episodes)==null?void 0:o.sub)||((r=e.data.episodes)==null?void 0:r.dub)||"Unknown"};if(Array.isArray(e)){const i=e.find(a=>a&&a.id===s)||e[0];return i?{...i,id:i.id||s}:{id:s,episodes:[]}}if(e&&e.results&&Array.isArray(e.results)){const i=e.results.find(a=>a&&a.id===s)||e.results[0];return i?{...i,id:i.id||s}:{...e,id:e.id||s}}return e&&e.data?{...e.data,id:e.data.id||s}:e&&(e.title||e.name||e.englishName)?{...e,id:e.id||s}:{id:s,...e||{}}}function Yt(e,s){return e?s==="hianime-scrap"&&e&&e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||`${n+1}`,number:t.episodeNumber||n+1,title:t.title||t.alternativeTitle||`Episode ${t.episodeNumber||n+1}`,isFiller:t.isFiller||!1})):Array.isArray(e)?e.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.episodes&&Array.isArray(e.episodes)?e.episodes.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):[]:[]}const ot="https://renewed-georgeanne-nekonode-1aa70c0c.koyeb.app";document.getElementById("app");const K=document.getElementById("searchInput"),Gt=document.getElementById("searchBtn"),Y=document.getElementById("providerSelect"),Z=document.getElementById("results"),ee=document.getElementById("details"),fe=document.getElementById("episodes"),g=document.getElementById("servers");let ge=null,U=[],it={},P=null,R=[];function te(){const e=localStorage.getItem("useCustomPlayer");return e===null?!0:e==="true"}function Xt(e){localStorage.setItem("useCustomPlayer",String(e)),Jt()}window.handlePlayerToggle=function(){const e=document.getElementById("playerToggle");if(e){e.checked=!e.checked;const s=e.checked;Xt(s),console.log("Toggle changed to:",s?"Custom":"Default"),setTimeout(()=>{Qt()},50)}};function Qt(){var s,t;if(window.hianimeScrapServerData){const n=document.querySelector(".server-tab.active");if(n){const o=n.textContent.toLowerCase(),r=o.includes("sub")?"sub":o.includes("dub")?"dub":"raw",i=(t=(s=window.hianimeScrapServerData[r])==null?void 0:s[0])==null?void 0:t.id;if(i){playHianimeScrapStream(i,r,n.textContent);return}}}const e=document.querySelector(".server-option .play-btn");if(e){const n=e.getAttribute("onclick");if(n){const o=n.match(/playStream\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/);if(o){const r=o[1],i=o[2];playStream(r,i);return}}}}function Jt(){const e=document.getElementById("playerToggle");if(e){const s=te();e.checked=s;const t=e.parentElement.querySelector(".toggle-custom"),n=e.parentElement.querySelector(".toggle-default");t&&n&&(t.style.opacity=s?"1":"0.5",n.style.opacity=s?"0.5":"1")}}function yt(e){const{videoUrl:s="",title:t="Video"}=e,n=document.createElement("div");return n.className="default-video-player",n.id="defaultVideoPlayer",n.innerHTML=`
    <video id="defaultVideo" preload="metadata" controls playsinline>
      <source src="${s}" type="application/vnd.apple.mpegurl">
    </video>
    <div class="default-player-info">
      <p>Using default browser player</p>
      <p class="video-title">${t}</p>
    </div>
  `,n}function wt(e,s={}){const t=e.querySelector("#defaultVideo"),n=s.videoUrl||"";return n&&(t.canPlayType("application/vnd.apple.mpegurl")?t.src=n:rt(t,n)),{element:e,video:t,loadVideo:o=>{t.canPlayType("application/vnd.apple.mpegurl")?t.src=o:rt(t,o)}}}function rt(e,s){try{if(window.Hls)at(e,s);else{const t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js",t.onload=()=>at(e,s),t.onerror=()=>{console.error("Failed to load HLS.js")},document.head.appendChild(t)}}catch(t){console.warn("HLS playback failed:",t)}}function at(e,s){if(!window.Hls||!e)return;const t=new window.Hls({enableWorker:!0,lowLatencyMode:!0});t.loadSource(s),t.attachMedia(e),t.on(window.Hls.Events.MANIFEST_PARSED,()=>{console.log("HLS manifest parsed for default player")}),t.on(window.Hls.Events.ERROR,(n,o)=>{console.error("HLS error in default player:",o)})}let lt=[];function Ie(e){const s=[],t=/(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;let n;for(;(n=t.exec(e))!==null;)s.push({startTime:be(n[2]),endTime:be(n[3]),text:n[4].trim()});return s}function Pe(e){const s=[],t=/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;let n;for(e=e.replace(/^WEBVTT.*?\n\n/s,"");(n=t.exec(e))!==null;)s.push({startTime:be(n[1]),endTime:be(n[2]),text:n[3].trim()});return s}function be(e){const s=e.split(/[:,.]/);if(s.length>=4){const t=parseInt(s[0]),n=parseInt(s[1]),o=parseInt(s[2]),r=parseInt(s[3]);return t*3600+n*60+o+r/1e3}return 0}function Be(e,s,t="en"){if(!P)return;const n=P.video,o=document.createElement("track");o.label=s,o.kind="subtitles",o.srclang=t,o.mode="hidden";let r=`WEBVTT

`;e.forEach((c,d)=>{r+=`${ct(c.startTime)} --> ${ct(c.endTime)}
${c.text}

`});const i=new Blob([r],{type:"text/vtt"}),a=URL.createObjectURL(i);o.src=a,n.appendChild(o),R.push({track:o,url:a,label:s,language:t,cues:e});for(let c=0;c<n.textTracks.length;c++)n.textTracks[c].mode="hidden";return n.textTracks.length>0&&(n.textTracks[n.textTracks.length-1].mode="showing"),o}function ct(e){const s=Math.floor(e/3600),t=Math.floor(e%3600/60),n=Math.floor(e%60),o=Math.floor(e%1*1e3);return`${s.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${o.toString().padStart(3,"0")}`}function dt(e){return new Promise((s,t)=>{const n=new FileReader;n.onload=o=>{const r=o.target.result;let i=[];if(e.name.endsWith(".srt")?i=Ie(r):e.name.endsWith(".vtt")||r.includes("WEBVTT")?i=Pe(r):i=Ie(r),i.length>0){const a=ze(e.name),c=Be(i,e.name,a);T(`Subtitle "${e.name}" loaded successfully`,"success"),s({cues:i,label:e.name,language:a,track:c})}else T("Failed to parse subtitle file","error"),t(new Error("Failed to parse subtitle"))},n.onerror=()=>{T("Error reading subtitle file","error"),t(new Error("Error reading file"))},n.readAsText(e)})}function ze(e){const s=e.toLowerCase();return s.includes("english")||s.includes("eng")?"en":s.includes("spanish")||s.includes("español")?"es":s.includes("french")||s.includes("français")?"fr":s.includes("german")||s.includes("deutsch")?"de":s.includes("italian")||s.includes("italiano")?"it":s.includes("portuguese")||s.includes("português")?"pt":s.includes("russian")||s.includes("русский")?"ru":s.includes("japanese")?"ja":s.includes("korean")?"ko":s.includes("chinese")||s.includes("中文")?"zh":"en"}async function Kt(e){try{const s=await x(`http://localhost:3000/anime/animesama/watch?episodeId={episodeId}=${encodeURIComponent(e)}`,{});return s&&s.data&&Array.isArray(s.data)?(lt=s.data.slice(0,10),lt):[]}catch(s){return console.error("Cloud subtitle search error:",s),Zt(e)}}function Zt(e){return[{id:"1",file_name:`${e} English.srt`,language:"en",downloads:1e3,rating:8.5},{id:"2",file_name:`${e} English [SDH].srt`,language:"en",downloads:800,rating:8.2},{id:"3",file_name:`${e} Spanish.srt`,language:"es",downloads:500,rating:7.9},{id:"4",file_name:`${e} French.srt`,language:"fr",downloads:400,rating:7.8},{id:"5",file_name:`${e} Portuguese.srt`,language:"pt",downloads:300,rating:7.5}]}async function es(e,s){try{T(`Downloading ${s}...`,"info");const t=await x(`https://api.opensubtitles.com/api/v1/download/${e}`,{headers:{"Api-Key":"Y2xvdWQtMTYzODU2MkAxNzMxNjM2NjI3OmRhMWQxNDM0YWFkZjM0ZGU4NzgwMjhhZTk0OWE0YzU0","User-Agent":"AnimeFlix v1.0.0",Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({file_name:s})});if(t&&t.link){const r=await x(t.link);let i=[];if(typeof r=="string"?r.includes("WEBVTT")?i=Pe(r):i=Ie(r):typeof r=="object"&&(i=r),i.length>0){const a=ze(s);return Be(i,s,a),T(`Loaded ${s}`,"success"),!0}}const n=[{startTime:0,endTime:2,text:"This is a sample subtitle"},{startTime:2,endTime:4,text:"Downloaded from cloud"},{startTime:4,endTime:6,text:`${s}`}],o=ze(s);return Be(n,s,o),T(`Loaded ${s} (demo)`,"success"),!0}catch(t){return console.error("Download error:",t),T("Failed to download subtitle","error"),!1}}function St(e){const{videoUrl:s="",title:t="Video",tracks:n=[],intro:o={start:0,end:0},outro:r={start:0,end:0}}=e,i=document.createElement("div");i.className="custom-video-player",i.id="customVideoPlayer";const a={play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',volumeHigh:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',fullscreen:'<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',settings:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',upload:'<svg viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>',cloud:'<svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',skipBack:'<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>',skipForward:'<svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>',previous:'<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',next:'<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-5.71L11.29 12H2v-2h9.29l-3-2.29zM22 6h-2V2h-2v4h-2V2h-2v4h-2V2h-2v4h-2V2H8v4H6V2H4v16h2v-4h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2V6z"/></svg>',check:'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'};let c="";return n.length>0&&(c=n.map(d=>d.kind==="captions"||d.kind==="subtitles"?`<track label="${d.label}" kind="${d.kind}" src="${d.file}" ${d.default?"default":""}>`:"").join("")),i.innerHTML=`
    <video id="customVideo" preload="metadata" crossorigin="anonymous">
      <source src="${s}" type="application/vnd.apple.mpegurl">
      ${c}
    </video>
    <div class="player-loading hidden"><div class="spinner"></div><p>Loading...</p></div>
    <div class="player-error hidden"><div class="error-icon">⚠️</div><p>Unable to load video. Please check your connection and try again.</p><button class="retry-btn">Retry</button></div>
    <div class="player-controls">
      <div class="progress-container"><div class="buffered-bar" style="width: 0%"></div><div class="progress-bar" style="width: 0%"></div></div>
      <div class="controls-row">
        <div class="controls-left">
          <button class="control-btn play-btn-main" title="Play/Pause">${a.play}</button>
          <div class="skip-buttons"><button class="skip-btn" data-seconds="-10" title="Rewind 10s">${a.skipBack}<span>10</span></button></div>
          <div class="skip-buttons"><button class="skip-btn" data-seconds="10" title="Forward 10s"><span>10</span>${a.skipForward}</button></div>
          <div class="volume-container">
            <button class="control-btn volume-btn" title="Mute/Unmute">${a.volumeHigh}</button>
            <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="1">
          </div>
          <div class="time-display"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
        </div>
        <div class="controls-right">
          <div class="episode-nav">
            <button class="episode-nav-btn prev-episode" title="Previous Episode" disabled>${a.previous}</button>
            <span class="current-episode">${t}</span>
            <button class="episode-nav-btn next-episode" title="Next Episode" disabled>${a.next}</button>
          </div>
          <div class="settings-wrapper" style="position: relative;">
            <button class="control-btn settings-btn" title="Settings">${a.settings}</button>
            <div class="settings-menu">
              <div class="settings-menu-item" data-setting="playbackSpeed"><span>Playback Speed</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitleTrack"><span>Subtitles</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitleSize"><span>Subtitle Size</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitlePosition"><span>Subtitle Position</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="uploadSubtitle"><span>Upload Subtitle</span><span>${a.upload}</span></div>
              <div class="settings-menu-item" data-setting="cloudSubtitles"><span>Search Cloud</span><span>${a.cloud}</span></div>
            </div>
            <div class="submenu playback-speed-menu">
              ${[.5,.75,1,1.25,1.5,2].map(d=>`<div class="submenu-item" data-speed="${d}"><span class="check-icon">${a.check}</span><span>${d}x</span></div>`).join("")}
            </div>
            <div class="submenu subtitle-track-menu">
              <div class="submenu-item active" data-track="off"><span class="check-icon">${a.check}</span><span>Off</span></div>
              <div class="submenu-item" data-track="uploaded"><span class="check-icon">${a.check}</span><span>Uploaded</span></div>
            </div>
            <div class="submenu subtitle-size-menu">
              ${["Small","Medium","Large","X-Large"].map(d=>`<div class="submenu-item" data-size="${d.toLowerCase()}"><span class="check-icon">${a.check}</span><span>${d}</span></div>`).join("")}
            </div>
            <div class="submenu subtitle-position-menu">
              <div class="submenu-item" data-position="top"><span class="check-icon">${a.check}</span><span>Top</span></div>
              <div class="submenu-item active" data-position="bottom"><span class="check-icon">${a.check}</span><span>Bottom</span></div>
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
          <button class="control-btn fullscreen-btn" title="Fullscreen">${a.fullscreen}</button>
        </div>
      </div>
    </div>
    <div class="subtitle-container subtitle-position-bottom"><div class="subtitle-text"></div></div>
    <div class="player-tooltip"></div>
    <input type="file" accept=".srt,.vtt" id="subtitleFileInput" style="display:none" multiple>
  `,i}function kt(e,s={}){var Xe,Qe,Je,Ke,Ze,et,tt;const t=e.querySelector("#customVideo"),n=e.querySelector(".player-loading"),o=e.querySelector(".player-error"),r=e.querySelector(".player-controls"),i=e.querySelector(".progress-container"),a=e.querySelector(".progress-bar"),c=e.querySelector(".buffered-bar"),d=e.querySelector(".play-btn-main"),m=e.querySelector(".volume-btn"),f=e.querySelector(".volume-slider"),w=e.querySelectorAll(".skip-btn"),A=e.querySelector(".fullscreen-btn"),I=e.querySelector(".settings-btn"),M=e.querySelector(".settings-menu"),B=e.querySelector(".time-display"),b=B.querySelector(".current-time"),v=B.querySelector(".duration"),$=e.querySelector(".subtitle-container"),E=$.querySelector(".subtitle-text");let V=!1,se=!1,Ne=null,D=null;function Re(l){if(isNaN(l))return"0:00";const u=Math.floor(l/60),p=Math.floor(l%60);return`${u}:${p.toString().padStart(2,"0")}`}function xt(){t.duration&&(a.style.width=`${t.currentTime/t.duration*100}%`,b.textContent=Re(t.currentTime))}function Mt(){t.buffered.length>0&&(c.style.width=`${t.buffered.end(t.buffered.length-1)/t.duration*100}%`)}function ne(){n.classList.remove("hidden")}function Se(){n.classList.add("hidden")}function oe(){o.classList.remove("hidden"),r.classList.add("hidden")}function je(){o.classList.add("hidden"),r.classList.remove("hidden")}function ke(){t.paused?(t.play().catch(()=>{}),V=!0,d.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',e.classList.add("playing")):(t.pause(),V=!1,d.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',e.classList.remove("playing"))}function Le(){se?(t.muted=!1,se=!1,m.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',f.value=t.volume):(t.muted=!0,se=!0,m.innerHTML='<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',f.value=0)}function _e(){var l,u,p,h;document.fullscreenElement?(p=document.exitFullscreen)!=null&&p.call(document)||((h=document.webkitExitFullscreen)==null||h.call(document)):(l=e.requestFullscreen)!=null&&l.call(e)||((u=e.webkitRequestFullscreen)==null||u.call(e))}function G(l){t.currentTime=Math.max(0,Math.min(t.currentTime+l,t.duration))}function Oe(){window.smoothPlayer&&window.smoothPlayer.showControlsSmooth?window.smoothPlayer.showControlsSmooth(e):(e.classList.add("show-controls"),clearTimeout(Ne),V&&(Ne=setTimeout(()=>{e.classList.remove("show-controls")},3e3)))}function $e(l){if(t.canPlayType("application/vnd.apple.mpegurl")){t.src=l;return}try{if(window.Hls)We(l);else{const u=document.createElement("script");u.src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js",u.onload=()=>We(l),u.onerror=oe,document.head.appendChild(u)}}catch{oe()}}function We(l){window.Hls&&(D&&D.destroy(),D=new window.Hls({enableWorker:!0,lowLatencyMode:!0}),D.loadSource(l),D.attachMedia(t),D.on(window.Hls.Events.MANIFEST_PARSED,()=>{Se(),t.play().catch(()=>{})}),D.on(window.Hls.Events.ERROR,(u,p)=>{p.fatal&&oe()}))}t.addEventListener("loadedmetadata",()=>{v.textContent=Re(t.duration),Se()}),t.addEventListener("play",()=>{V=!0,d.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',Oe()}),t.addEventListener("pause",()=>{V=!1,d.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'}),t.addEventListener("timeupdate",()=>{xt(),Mt()}),t.addEventListener("waiting",ne),t.addEventListener("canplay",Se),t.addEventListener("error",oe),d.addEventListener("click",ke),t.addEventListener("click",ke),m.addEventListener("click",Le),f.addEventListener("input",l=>{t.volume=l.target.value,f.value=t.volume,t.volume>0&&se&&Le()}),w.forEach(l=>l.addEventListener("click",()=>G(parseInt(l.dataset.seconds)))),i.addEventListener("click",l=>{const u=(l.clientX-i.getBoundingClientRect().left)/i.getBoundingClientRect().width;t.currentTime=u*t.duration}),A.addEventListener("click",_e),I.addEventListener("click",()=>{M.classList.toggle("visible")}),e.addEventListener("click",l=>{l.target.closest(".settings-wrapper")||M.classList.remove("visible")});const ie=e.querySelector(".playback-speed-menu");(Xe=e.querySelector('[data-setting="playbackSpeed"]'))==null||Xe.addEventListener("click",()=>{ie.classList.toggle("visible")}),ie.querySelectorAll(".submenu-item").forEach(l=>{l.addEventListener("click",()=>{t.playbackRate=parseFloat(l.dataset.speed),ie.classList.remove("visible"),ie.querySelectorAll(".submenu-item").forEach(u=>u.classList.remove("active")),l.classList.add("active")})});const re=e.querySelector(".subtitle-size-menu");(Qe=e.querySelector('[data-setting="subtitleSize"]'))==null||Qe.addEventListener("click",()=>{re.classList.toggle("visible")}),re.querySelectorAll(".submenu-item").forEach(l=>{l.addEventListener("click",()=>{$.className=`subtitle-container subtitle-size-${l.dataset.size}`,re.classList.remove("visible"),re.querySelectorAll(".submenu-item").forEach(u=>u.classList.remove("active")),l.classList.add("active")})});const Te=e.querySelector(".subtitle-position-menu");(Je=e.querySelector('[data-setting="subtitlePosition"]'))==null||Je.addEventListener("click",()=>{Te.classList.toggle("visible")}),Te.querySelectorAll(".submenu-item[data-position]").forEach(l=>{l.addEventListener("click",()=>{$.classList.remove("subtitle-position-top","subtitle-position-middle","subtitle-position-bottom"),$.classList.add(`subtitle-position-${l.dataset.position}`),Te.querySelectorAll(".submenu-item").forEach(u=>u.classList.remove("active")),l.classList.add("active"),T(`Subtitle position: ${l.dataset.position}`,"info")})});let _=0;const At=e.querySelector(".offset-value");e.querySelectorAll(".offset-btn").forEach(l=>{l.addEventListener("click",()=>{const u=parseInt(l.dataset.offset);_=Math.max(-200,Math.min(200,_+u)),At.textContent=_>0?`+${_}`:_,$.style.bottom=`calc(100px + ${_}px)`,$.style.top="auto",$.style.transform="translateX(-50%)"})});const Ye=e.querySelector(".subtitle-track-menu");(Ke=e.querySelector('[data-setting="subtitleTrack"]'))==null||Ke.addEventListener("click",()=>{Ye.classList.toggle("visible")});const Ct=e.querySelector(".upload-subtitle-menu");(Ze=e.querySelector('[data-setting="uploadSubtitle"]'))==null||Ze.addEventListener("click",()=>{Ct.classList.toggle("visible"),Ye.classList.remove("visible"),cloudSubtitlesMenu.classList.remove("visible")});const S=e.querySelector(".upload-zone"),N=S==null?void 0:S.querySelector(".subtitle-input");S==null||S.addEventListener("click",()=>{N==null||N.click()}),N==null||N.addEventListener("change",async l=>{const u=l.target.files;if(u&&u.length>0)for(let p=0;p<u.length;p++){const h=u[p];if(h.name.endsWith(".srt")||h.name.endsWith(".vtt"))try{await dt(h),X()}catch(z){console.error("Subtitle upload error:",z)}}N.value=""}),S==null||S.addEventListener("dragover",l=>{l.preventDefault(),S.classList.add("dragover")}),S==null||S.addEventListener("dragleave",()=>{S.classList.remove("dragover")}),S==null||S.addEventListener("drop",async l=>{var p;l.preventDefault(),S.classList.remove("dragover");const u=(p=l.dataTransfer)==null?void 0:p.files;if(u&&u.length>0)for(let h=0;h<u.length;h++){const z=u[h];if(z.name.endsWith(".srt")||z.name.endsWith(".vtt"))try{await dt(z),X()}catch(L){console.error("Subtitle upload error:",L)}}});function X(){const l=e.querySelector(".uploaded-subtitles-list");if(l){if(R.length===0){l.innerHTML='<p style="color: var(--text-light); font-size: 0.85em; padding: 10px;">No subtitles uploaded</p>';return}l.innerHTML=R.map((u,p)=>`
      <div class="loaded-subtitle-item ${p===R.length-1?"active":""}">
        <span class="name">${u.label.substring(0,25)}${u.label.length>25?"...":""}</span>
        <button class="remove-btn" onclick="removeSubtitle(${p})">✕</button>
      </div>
    `).join("")}}window.removeSubtitle=function(l){if(R[l]){const u=R[l];u.track&&u.track.parentNode&&u.track.parentNode.removeChild(u.track),u.url&&URL.revokeObjectURL(u.url),R.splice(l,1),X(),T("Subtitle removed","info")}};let y=null;function Ht(){const l=document.getElementById("cloudSubtitlesModal");if(l&&l.remove(),y=document.createElement("div"),y.id="cloudSubtitlesModal",y.className="cloud-subtitles-modal",y.innerHTML=`
      <div class="cloud-subtitles-modal-content">
        <div class="cloud-subtitles-modal-header">
          <h3>☁️ Search Cloud Subtitles</h3>
          <button class="close-cloud-modal">&times;</button>
        </div>
        <div class="cloud-subtitles-modal-body">
          <div class="search-subtitle-form">
            <input type="text" class="cloud-search-input-modal" placeholder="Search subtitles (e.g., anime name, episode)...">
            <button class="cloud-search-btn-modal">🔍 Search</button>
          </div>
          <div class="cloud-results-modal"></div>
        </div>
      </div>
    `,document.body.appendChild(y),!document.getElementById("cloudSubtitlesModalStyles")){const L=document.createElement("style");L.id="cloudSubtitlesModalStyles",L.textContent=`
        .cloud-subtitles-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          padding: 20px;
        }
        .cloud-subtitles-modal.visible {
          opacity: 1;
          visibility: visible;
        }
        .cloud-subtitles-modal-content {
          background: var(--glass-bg, rgba(22, 33, 62, 0.95));
          backdrop-filter: blur(10px);
          border-radius: 16px;
          width: 100%;
          max-width: 500px;
          max-height: 80vh;
          border: 1px solid rgba(233, 69, 96, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalSlideIn 0.3s ease-out;
        }
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .cloud-subtitles-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .cloud-subtitles-modal-header h3 {
          color: var(--accent, #e94560);
          margin: 0;
          font-size: 1.2em;
        }
        .close-cloud-modal {
          background: none;
          border: none;
          color: white;
          font-size: 1.8em;
          cursor: pointer;
          padding: 5px 10px;
          line-height: 1;
          transition: all 0.2s ease;
        }
        .close-cloud-modal:hover {
          color: var(--accent, #e94560);
          transform: scale(1.1);
        }
        .cloud-subtitles-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
        .search-subtitle-form {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .cloud-search-input-modal {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid rgba(233, 69, 96, 0.3);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1em;
          transition: all 0.3s ease;
        }
        .cloud-search-input-modal:focus {
          outline: none;
          border-color: var(--accent, #e94560);
          box-shadow: 0 0 15px rgba(233, 69, 96, 0.3);
        }
        .cloud-search-input-modal::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .cloud-search-btn-modal {
          padding: 12px 24px;
          background: linear-gradient(135deg, var(--accent, #e94560), #ff6b6b);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          font-size: 1em;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .cloud-search-btn-modal:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(233, 69, 96, 0.4);
        }
        .cloud-search-btn-modal:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .cloud-results-modal {
          max-height: 400px;
          overflow-y: auto;
        }
        .cloud-results-modal .subtitle-result {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          margin-bottom: 10px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .cloud-results-modal .subtitle-result:hover {
          background: rgba(233, 69, 96, 0.15);
          border-color: rgba(233, 69, 96, 0.3);
          transform: translateX(5px);
        }
        .cloud-results-modal .subtitle-result-info {
          flex: 1;
          min-width: 0;
        }
        .cloud-results-modal .subtitle-result-info .name {
          color: white;
          font-weight: 500;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cloud-results-modal .subtitle-result-info .details {
          font-size: 0.85em;
          color: rgba(255, 255, 255, 0.6);
        }
        .cloud-results-modal .download-btn {
          padding: 10px 20px;
          background: var(--accent, #e94560);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9em;
          font-weight: bold;
          transition: all 0.2s ease;
          white-space: nowrap;
          margin-left: 10px;
        }
        .cloud-results-modal .download-btn:hover {
          background: #ff6b6b;
          transform: scale(1.05);
        }
        .cloud-results-modal .download-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .cloud-results-modal .loading-state {
          text-align: center;
          padding: 40px 20px;
          color: rgba(255, 255, 255, 0.7);
        }
        .cloud-results-modal .loading-state .loading-spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 15px;
        }
        .cloud-results-modal .no-results {
          text-align: center;
          padding: 40px 20px;
          color: rgba(255, 255, 255, 0.5);
        }
        .cloud-results-modal .no-results-icon {
          font-size: 3em;
          margin-bottom: 15px;
        }
        @media (max-width: 540px) {
          .cloud-subtitles-modal-content {
            max-height: 90vh;
          }
          .search-subtitle-form {
            flex-direction: column;
          }
          .cloud-search-btn-modal {
            width: 100%;
          }
        }
      `,document.head.appendChild(L)}y.querySelector(".close-cloud-modal").addEventListener("click",ae),y.addEventListener("click",L=>{L.target===y&&ae()}),document.addEventListener("keydown",Ge);const p=y.querySelector(".cloud-search-input-modal"),h=y.querySelector(".cloud-search-btn-modal");async function z(){const L=p.value.trim();if(!L){T("Please enter a search term","warning");return}const st=y.querySelector(".cloud-results-modal");st.innerHTML=`
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>Searching for "${L}"...</p>
        </div>
      `,h.disabled=!0;try{const xe=await Kt(L);qt(xe,L)}catch(xe){console.error("Cloud search error:",xe),st.innerHTML=`
          <div class="no-results">
            <div class="no-results-icon">😕</div>
            <p>Search failed. Please try again.</p>
          </div>
        `}finally{h.disabled=!1}}h.addEventListener("click",z),p.addEventListener("keypress",L=>{L.key==="Enter"&&z()}),setTimeout(()=>p.focus(),100)}function qt(l,u){const p=y.querySelector(".cloud-results-modal");if(l.length===0){p.innerHTML=`
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <p>No subtitles found for "${u}"</p>
          <p style="font-size: 0.9em; margin-top: 10px; color: rgba(255,255,255,0.5);">Try a different search term or upload your own subtitle</p>
        </div>
      `;return}p.innerHTML=l.map((h,z)=>{var L;return`
      <div class="subtitle-result" data-id="${h.id}" data-filename="${h.file_name.replace(/'/g,"\\'")}" onclick="handleSubtitleClick('${h.id}', '${h.file_name.replace(/'/g,"\\'")}', this)">
        <div class="subtitle-result-info">
          <div class="name">${h.file_name}</div>
          <div class="details">
            ${((L=h.language)==null?void 0:L.toUpperCase())||"Unknown"} 
            • ⭐ ${h.rating||"N/A"} 
            • ↓ ${h.downloads||0}
          </div>
        </div>
        <button class="download-btn" onclick="event.stopPropagation(); handleSubtitleDownload('${h.id}', '${h.file_name.replace(/'/g,"\\'")}', this)">⬇</button>
      </div>
    `}).join("")}window.handleSubtitleClick=async function(l,u,p){p.parentElement.querySelectorAll(".subtitle-result").forEach(h=>h.style.background=""),p.style.background="rgba(233, 69, 96, 0.25)",p.style.borderColor="var(--accent)",await handleSubtitleDownload(l,u,p.querySelector(".download-btn"))},window.handleSubtitleDownload=async function(l,u,p){p.disabled=!0,p.textContent="⏳",await es(l,u)?(p.textContent="✓",p.style.background="var(--success, #00d26a)",T(`Loaded: ${u}`,"success"),X(),setTimeout(()=>{ae()},1e3)):(p.disabled=!1,p.textContent="⬇")};function It(){y||Ht(),y.classList.add("visible");const l=y==null?void 0:y.querySelector(".cloud-search-input-modal");l&&window.currentAnimeTitle&&(l.value=window.currentAnimeTitle)}function ae(){y&&(y.classList.remove("visible"),document.removeEventListener("keydown",Ge))}function Ge(l){l.key==="Escape"&&ae()}return(et=e.querySelector('[data-setting="cloudSubtitles"]'))==null||et.addEventListener("click",()=>{It(),M==null||M.classList.remove("visible")}),X(),document.addEventListener("keydown",l=>{if(e.isConnected&&l.target.tagName!=="INPUT")switch(l.key){case" ":case"k":l.preventDefault(),ke();break;case"m":Le();break;case"f":_e();break;case"ArrowLeft":l.preventDefault(),G(-5);break;case"ArrowRight":l.preventDefault(),G(5);break;case"j":G(-10);break;case"l":G(10);break}}),e.addEventListener("mousemove",Oe),e.addEventListener("mouseleave",()=>{window.smoothPlayer&&window.smoothPlayer.hideControlsSmooth&&V?window.smoothPlayer.hideControlsSmooth(e):V&&e.classList.remove("show-controls")}),t.addEventListener("timeupdate",()=>{var u;const l=t.textTracks;for(let p=0;p<l.length;p++)if(l[p].mode==="showing"){const h=(u=l[p].activeCues)==null?void 0:u[0];E.textContent=h?h.text:"",$.classList.toggle("visible",!!h);break}}),(tt=o.querySelector(".retry-btn"))==null||tt.addEventListener("click",()=>{je(),ne(),$e(e.dataset.videoUrl)}),e.dataset.videoUrl=s.videoUrl||"",s.videoUrl&&(ne(),$e(s.videoUrl)),{element:e,video:t,loadVideo:l=>{e.dataset.videoUrl=l,je(),ne(),$e(l)},setEpisodeCallbacks:(l,u)=>{const p=e.querySelector(".prev-episode"),h=e.querySelector(".next-episode");p.disabled=!l,h.disabled=!u,p.onclick=l||(()=>{}),h.onclick=u||(()=>{})}}}let k=null,j=0,ve=null;async function ts(){const e=Y.value,s=q(e,"home");console.log("Fetching home page data from:",s);try{const t=await x(s);return ss(t)}catch(t){throw console.error("Error fetching home page data:",t),t}}function ss(e){return e?(e.data&&(e=e.data),{status:e.status||!0,spotlight:ns(e.spotlight||[]),trending:H(e.trending||[]),topAiring:H(e.topAiring||[]),mostPopular:H(e.mostPopular||[]),mostFavorite:H(e.mostFavorite||[]),latestCompleted:H(e.latestCompleted||[]),latestEpisode:H(e.latestEpisode||[]),newAdded:H(e.newAdded||[]),topUpcoming:H(e.topUpcoming||[]),topTen:os(e.topTen||{today:[],week:[],month:[]}),genres:e.genres||[]}):null}function ns(e){return e.map(s=>{var t,n,o;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/400x600",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((o=s.episodes)==null?void 0:o.eps)||0},rank:s.rank||0,type:s.type||"TV",quality:s.quality||"HD",duration:s.duration||"Unknown",aired:s.aired||"Unknown",synopsis:s.synopsis||"No synopsis available."}})}function H(e){return e.map(s=>{var t,n,o;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/200x300",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((o=s.episodes)==null?void 0:o.eps)||0},type:s.type||"TV"}})}function os(e){return{today:H(e.today||[]).slice(0,10),week:H(e.week||[]).slice(0,10),month:H(e.month||[]).slice(0,10)}}function Ve(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("results"),n=document.getElementById("details"),o=document.getElementById("episodes"),r=document.getElementById("servers"),i=document.getElementById("homeBtn"),a=document.getElementById("searchNavBtn");i.classList.add("active"),a.classList.remove("active"),e.classList.add("visible"),e.classList.remove("hidden"),s.classList.remove("visible"),t.innerHTML="",n.innerHTML="",o.innerHTML="",r.innerHTML="",k||Lt()}function we(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("homeBtn"),n=document.getElementById("searchNavBtn");t.classList.remove("active"),n.classList.add("active"),e.classList.remove("visible"),e.classList.add("hidden"),s.classList.add("visible"),ps()}async function Lt(){const e=document.getElementById("homeContent");e.innerHTML=is();try{if(k=await ts(),!k||!k.status)throw new Error("Failed to load home page data");e.innerHTML=as(k),us(),T("Home page loaded successfully","success")}catch(s){console.error("Error loading home page:",s),e.innerHTML=rs(s.message)}}function is(){return`
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
        ${Array(6).fill('<div class="skeleton-card"><div class="skeleton skeleton-img"></div></div>').join("")}
      </div>
    </div>
    <div class="home-section">
      <div class="section-header">
        <h2>🔥 Trending</h2>
      </div>
      <div class="home-skeleton">
        ${Array(6).fill('<div class="skeleton-card"><div class="skeleton skeleton-img"></div></div>').join("")}
      </div>
    </div>
  `}function rs(e){return`
    <div class="home-error">
      <div class="error-icon">😕</div>
      <h2>Oops! Something went wrong</h2>
      <p>${e||"Unable to load home page data. Please try again."}</p>
      <button class="retry-btn" onclick="loadHomePage()">🔄 Retry</button>
    </div>
  `}function as(e){var t,n,o;let s="";return e.spotlight&&e.spotlight.length>0&&(s+=ls(e.spotlight)),e.genres&&e.genres.length>0&&(s+=cs(e.genres)),e.topTen&&(((t=e.topTen.today)==null?void 0:t.length)>0||((n=e.topTen.week)==null?void 0:n.length)>0||((o=e.topTen.month)==null?void 0:o.length)>0)&&(s+=ds(e.topTen)),e.trending&&e.trending.length>0&&(s+=F("📈 Trending Now","trending",e.trending)),e.topAiring&&e.topAiring.length>0&&(s+=F("▶️ Top Airing","topAiring",e.topAiring)),e.mostPopular&&e.mostPopular.length>0&&(s+=F("⭐ Most Popular","mostPopular",e.mostPopular)),e.mostFavorite&&e.mostFavorite.length>0&&(s+=F("❤️ Most Favorite","mostFavorite",e.mostFavorite)),e.latestCompleted&&e.latestCompleted.length>0&&(s+=F("✅ Latest Completed","latestCompleted",e.latestCompleted)),e.latestEpisode&&e.latestEpisode.length>0&&(s+=F("🎬 Latest Episodes","latestEpisode",e.latestEpisode)),e.newAdded&&e.newAdded.length>0&&(s+=F("🆕 Newly Added","newAdded",e.newAdded)),e.topUpcoming&&e.topUpcoming.length>0&&(s+=F("🚀 Top Upcoming","topUpcoming",e.topUpcoming)),s}function ls(e){const s=e.map((n,o)=>{var r,i,a;return`
    <div class="spotlight-slide ${o===0?"active":""}" data-index="${o}">
      <img src="${n.poster}" alt="${n.title}" loading="lazy">
      <div class="spotlight-overlay">
        <div class="spotlight-rank">#${n.rank||o+1}</div>
        <h2 class="spotlight-title">${n.title}</h2>
        <div class="spotlight-meta">
          <span>${n.type||"TV"}</span>
          ${n.quality?`<span class="quality">${n.quality}</span>`:""}
          <span>${n.duration||"Unknown duration"}</span>
          ${((r=n.episodes)==null?void 0:r.sub)>0?`<span>📺 ${n.episodes.sub} eps</span>`:""}
        </div>
        <p class="spotlight-synopsis">${(i=n.synopsis)==null?void 0:i.substring(0,200)}${((a=n.synopsis)==null?void 0:a.length)>200?"...":""}</p>
        <div class="spotlight-actions">
          <button class="spotlight-btn primary" onclick="selectAnime('${n.id}', '${n.title.replace(/'/g,"\\'")}')">
            ▶️ Watch Now
          </button>
          <button class="spotlight-btn secondary" onclick="selectAnime('${n.id}', '${n.title.replace(/'/g,"\\'")}')">
            ℹ️ More Info
          </button>
        </div>
      </div>
    </div>
  `}).join(""),t=e.map((n,o)=>`
    <button class="spotlight-dot ${o===0?"active":""}" data-index="${o}"></button>
  `).join("");return`
    <div class="home-section">
      <div class="spotlight-container">
        <div class="spotlight-slider">
          ${s}
          <button class="spotlight-nav prev" onclick="prevSpotlight()">❮</button>
          <button class="spotlight-nav next" onclick="nextSpotlight()">❯</button>
          <div class="spotlight-dots">${t}</div>
        </div>
      </div>
    </div>
  `}function cs(e){return`
    <div class="home-section">
      <div class="section-header">
        <h2>🏷️ Browse by Genre</h2>
      </div>
      <div class="genres-container">${e.map(t=>`
    <button class="genre-tag-btn" onclick="searchByGenre('${t.replace(/'/g,"\\'")}')">${t}</button>
  `).join("")}</div>
    </div>
  `}function ds(e){const s=(t,n)=>!t||t.length===0?'<p style="color: var(--text-light); text-align: center;">No data available</p>':t.slice(0,5).map((o,r)=>{var i;return`
      <div class="top10-item" onclick="selectAnime('${o.id}', '${o.title.replace(/'/g,"\\'")}')">
        <div class="top10-rank">${r+1}</div>
        <img src="${o.poster}" alt="${o.title}" loading="lazy">
        <div class="top10-item-info">
          <div class="title">${o.title}</div>
          <div class="episodes">${((i=o.episodes)==null?void 0:i.sub)>0?`${o.episodes.sub} eps`:o.type||"TV"}</div>
        </div>
      </div>
    `}).join("");return`
    <div class="home-section">
      <div class="section-header">
        <h2>📊 Top 10 Rankings</h2>
      </div>
      <div class="top10-section">
        <div class="top10-category">
          <h3>📅 Today</h3>
          ${s(e.today)}
        </div>
        <div class="top10-category">
          <h3>📆 This Week</h3>
          ${s(e.week)}
        </div>
        <div class="top10-category">
          <h3>🗓️ This Month</h3>
          ${s(e.month)}
        </div>
      </div>
    </div>
  `}function F(e,s,t){const n=t.slice(0,12).map(o=>{var r;return`
    <div class="home-anime-card" onclick="selectAnime('${o.id}', '${o.title.replace(/'/g,"\\'")}')">
      <img src="${o.poster}" alt="${o.title}" loading="lazy">
      <div class="home-anime-card-content">
        <h3>${o.title}</h3>
        <p>${((r=o.episodes)==null?void 0:r.sub)>0?`${o.episodes.sub} eps`:o.type||"TV"}</p>
      </div>
    </div>
  `}).join("");return`
    <div class="home-section">
      <div class="section-header">
        <h2>${e}</h2>
        <button class="see-all-btn" onclick="viewAllCategory('${s}')">See All →</button>
      </div>
      <div class="home-anime-grid">${n}</div>
    </div>
  `}function us(){var e;(e=k==null?void 0:k.spotlight)!=null&&e.length&&(j=0,ve=setInterval(()=>{$t()},5e3))}function ps(){ve&&(clearInterval(ve),ve=null)}function $t(){var e;(e=k==null?void 0:k.spotlight)!=null&&e.length&&(j=(j+1)%k.spotlight.length,Tt())}function ms(){var e;(e=k==null?void 0:k.spotlight)!=null&&e.length&&(j=(j-1+k.spotlight.length)%k.spotlight.length,Tt())}function Tt(){const e=document.querySelectorAll(".spotlight-slide"),s=document.querySelectorAll(".spotlight-dot");e.forEach((t,n)=>{t.classList.toggle("active",n===j)}),s.forEach((t,n)=>{t.classList.toggle("active",n===j)})}function hs(e){console.log("View all category:",e),T(`Showing all ${e} - Filter by provider if needed`,"info"),we(),K.focus()}function vs(e){we(),K.value=e,K.focus(),De()}window.loadHomePage=Lt;window.showHomePage=Ve;window.showSearchPage=we;window.nextSpotlight=$t;window.prevSpotlight=ms;window.viewAllCategory=hs;window.searchByGenre=vs;function T(e,s="info"){const t=document.querySelector(".toast-container");t&&t.remove();const n=document.createElement("div");n.className="toast-container";const o=document.createElement("div");o.className=`toast ${s}`;const r=s==="success"?"✓":s==="error"?"✕":"ℹ";o.innerHTML=`<span style="font-size:1.2em;">${r}</span> ${e}`,n.appendChild(o),document.body.appendChild(n),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(100px)",o.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},3e3)}function fs(){let s="";for(let t=0;t<12;t++)s+=`
      <div class="skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;Z.innerHTML=s}async function De(){const e=K.value.trim();if(!e){T("Please enter a search query","warning");return}try{fs();const s=Y.value,t=q(s,"search",{query:e});console.log("Search URL:",t);const n=await x(t);let o=[];if(n&&n.data&&n.data.response&&Array.isArray(n.data.response)?o=n.data.response:Array.isArray(n)?o=n:n&&n.results&&Array.isArray(n.results)?o=n.results:n&&n.anime&&Array.isArray(n.anime)?o=n.anime:n&&n.data&&Array.isArray(n.data)&&(o=n.data),o.length===0){Z.innerHTML='<p style="text-align:center;padding:40px;color:var(--text-light);">No results found. Try a different search term.</p>';return}gs(o),T(`Found ${o.length} results`,"success")}catch(s){console.error("Search error:",s),Z.innerHTML=`<p class="error" style="text-align:center;padding:40px;color:var(--accent);">Search failed: ${s.message}. Check your connection and try again.</p>`}}function gs(e){it={},Z.innerHTML=e.map(s=>{const t=s.title||s.name||s.englishName||"Unknown Title",n=s.id||s.animeId||s.mal_id||"",o=s.image||s.poster||s.coverImage||"https://via.placeholder.com/150x200",r=s.releaseDate||s.year||s.startDate||"N/A";let i="";if(s.episodes)if(typeof s.episodes=="object"){const m=s.episodes.sub||0,f=s.episodes.dub||0,w=s.episodes.eps||0;m>0||f>0?i=`<p>${m>0?`Sub: ${m}`:""}${m>0&&f>0?" | ":""}${f>0?`Dub: ${f}`:""}</p>`:w>0&&(i=`<p>Episodes: ${w}</p>`)}else i=`<p>Episodes: ${s.episodes}</p>`;const a=s.type?`<p>${s.type}</p>`:"",c=s.duration?`<p>${s.duration}</p>`:"";return Y.value==="hianime-scrap"?(it[n]=s,`
        <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}')">
          <img src="${o}" alt="${t}" loading="lazy">
          <h3>${t}</h3>
          ${i}
          ${a}
          ${c}
          <p>${r}</p>
        </div>
      `):`
      <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}', '${t.replace(/'/g,"\\'")}')">
        <img src="${o}" alt="${t}" loading="lazy">
        <h3>${t}</h3>
        ${i}
        ${a}
        ${c}
        <p>${r}</p>
      </div>
    `}).join("")}async function bs(e,s){if(!e){alert("Invalid anime ID");return}const t=Y.value,n=t==="hianime-scrap";try{if(ee.innerHTML='<p class="loading-details" style="padding: 40px; text-align: center;"><span class="loading-spinner"></span> Loading anime details...</p>',n){console.log("Fetching full anime info from info API for hianime-scrap");const c=await _t(e);if(!c)throw new Error("Failed to fetch anime info");const d=await Ot(e),m={...c,episodes:d.length>0?d:c.episodes,__provider:t};ut(m,c.title);return}const o=typeof s=="string"?s:null,r=q(t,"info",{id:e});console.log("Info URL:",r);const i=await x(r);let a=normalizeAnimeData(i,e,t);if(!a.episodes||a.episodes.length===0)try{const c=q(t,"episodes",{id:e});console.log("Episodes URL:",c);const d=await x(c);a.episodes=extractEpisodes(d,t)}catch(c){console.warn("Could not fetch episodes separately:",c),a.episodes=[]}a.__provider=t,ut(a,o||a.title)}catch(o){console.error("Details error:",o),ee.innerHTML=`<p class="error">Error loading anime details: ${o.message}</p>`}}async function Fe(e,s){if(!e){alert("Invalid episode ID");return}const t=Y.value;try{if(g.innerHTML=`
      <h3>Servers for Episode ${s||"?"}</h3>
      <p class="loading-servers" style="padding: 20px; text-align: center; color: var(--accent);">
        <span class="loading-spinner"></span> Loading servers...
      </p>
    `,t==="hianime-scrap"){let r=e,i=s;const a=e.match(/::ep=(\d+)$/);a&&(i=a[1],console.log(`Episode ${i} selected (ID: ${e})`));const c=q(t,"servers",{id:e});console.log("Servers URL:",c);const d=await x(c);ws(d,i||s||"1",e),g.scrollIntoView({behavior:"smooth"});return}if(t==="animepahe"){const r=q(t,"watch",{episodeId:e});console.log("Watch URL:",r);const i=await x(r);Ce(i,s||"1"),g.scrollIntoView({behavior:"smooth"});return}if(t==="animekai"){const r=q(t,"watch",{episodeId:e});console.log("Watch URL:",r);const i=await x(r);Ce(i,s||"1"),g.scrollIntoView({behavior:"smooth"});return}const n=q(t,"servers",{id:e});console.log("Servers URL:",n);const o=await x(n);Ce(o,s||"1"),g.scrollIntoView({behavior:"smooth"})}catch(n){console.error("Servers error:",n),g.innerHTML=`<p class="error">Error loading servers: ${n.message}. Try a different episode.</p>`}}window.selectAnime=bs;window.selectEpisode=Fe;function ut(e,s){var f;console.log("Displaying anime details:",e),ge=e.id||null;const t=e.title||s||"Unknown Title";window.currentAnimeTitle=s||t;const n=e.image||e.poster||e.coverImage||"https://via.placeholder.com/200x300",o=e.japaneseTitle||e.jname||"",r=e.type||e.format||"Unknown",i=e.status||"",a=e.genres||(e.genre?[e.genre]:[]),c=e.totalEpisodes||e.episodeCount||((f=e.episodes)==null?void 0:f.length)||"Unknown",d=e.description||e.synopsis||"No description available",m=e.url||e.animeUrl||"";ee.innerHTML=`
    <div class="anime-details">
      <div class="anime-header">
        <img src="${n}" alt="${t}" onerror="this.src='https://via.placeholder.com/200x300'">
        <div class="anime-info">
          <h2>${t}</h2>
          ${o?`<p><strong>Japanese:</strong> ${o}</p>`:""}
          <p><strong>Type:</strong> ${r}</p>
          ${i?`<p><strong>Status:</strong> ${i}</p>`:""}
          ${a.length>0?`<p><strong>Genres:</strong> ${a.join(", ")}</p>`:""}
          <p><strong>Episodes:</strong> ${c}</p>
          <p><strong>Description:</strong> ${d}</p>
          ${m?`<p><a href="${m}" target="_blank" rel="noopener noreferrer" class="watch-link">View on Provider →</a></p>`:""}
        </div>
      </div>
    </div>
  `,ee.scrollIntoView({behavior:"smooth"}),e.episodes&&e.episodes.length>0?(U=e.episodes,ys(e.episodes)):(fe.innerHTML="<p>No episodes available</p>",U=[]),g.innerHTML=""}function ys(e){fe.innerHTML="<h3>Episodes</h3>";const s=e.map((t,n)=>{const o=t.number||t.episode||t.ep||n+1,r=t.title||t.name||"",i=t.id||`${n+1}`,a=t.isFiller,c=a?'<span style="color:#ffcc00;font-size:0.7em;"> ★Filler</span>':"";return`
      <button 
        class="episode-btn ${a?"filler":""}" 
        onclick="selectEpisode('${String(i).replace(/'/g,"\\'")}', '${o}')"
        title="${r}${a?" (Filler)":""}"
      >
        ${o}${c}
        ${r?`<br><small style="font-size:0.7em">${r.substring(0,20)}${r.length>20?"...":""}</small>`:""}
      </button>
    `}).join("");fe.innerHTML+=`<div class="episodes-grid">${s}</div>`}function ws(e,s,t){const n=te();if(g.innerHTML=`
    <div class="player-toggle-header">
      <h3>Servers for Episode ${s}</h3>
      <div class="player-toggle">
        <span class="toggle-custom">🎬 Custom</span>
        <label class="toggle-switch" onclick="handlePlayerToggle()">
          <input type="checkbox" id="playerToggle" ${n?"checked":""}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-default">🌐 Default</span>
      </div>
    </div>
  `,!e||!e.success||!e.data){g.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}const o=e.data,r=o.sub||[],i=o.dub||[],a=o.raw||[];if(r.length===0&&i.length===0&&a.length===0){g.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}window.hianimeScrapServerData={episodeId:t,sub:r,dub:i,raw:a};let c='<div class="servers-tabs">';c+=`<div class="server-tab ${r.length>0?"active":""}" onclick="showHianimeScrapServers('sub')">Sub (${r.length})</div>`,c+=`<div class="server-tab ${r.length===0&&i.length>0?"active":""}" onclick="showHianimeScrapServers('dub')">Dub (${i.length})</div>`,c+=`<div class="server-tab ${r.length===0&&i.length===0&&a.length>0?"active":""}" onclick="showHianimeScrapServers('raw')">Raw (${a.length})</div>`,c+="</div>",c+='<div id="hianimeScrapServersList" class="servers-list"></div>',g.innerHTML+=c,r.length>0?showHianimeScrapServers("sub"):i.length>0?showHianimeScrapServers("dub"):showHianimeScrapServers("raw")}window.showHianimeScrapServers=function(e){const s=document.getElementById("hianimeScrapServersList");if(!s||!window.hianimeScrapServerData)return;document.querySelectorAll(".server-tab").forEach(n=>{n.classList.remove("active"),n.textContent.toLowerCase().includes(e)&&n.classList.add("active")});const t=window.hianimeScrapServerData[e]||[];if(t.length===0){s.innerHTML=`<p>No ${e} servers available.</p>`;return}s.innerHTML=t.map(n=>{const o=n.name||`Server ${n.index||""}`,r=n.id,i=e;return`
      <div class="server-option">
        <strong>${o}</strong>
        <p>Type: ${i.charAt(0).toUpperCase()+i.slice(1)}</p>
        <p><button class="play-btn" onclick="playHianimeScrapStream('${r}', '${i}', '${o.replace(/'/g,"\\'")}')">▶ Play</button></p>
      </div>
    `}).join("")};window.playHianimeScrapStream=async function(e,s,t){if(!window.hianimeScrapServerData)return alert("No server data available");const n=window.hianimeScrapServerData.episodeId,o=q("hianime-scrap","stream",{id:n,type:s,server:t});console.log("Stream URL:",o);try{let r=g.querySelector(".stream-loading");r||(r=document.createElement("p"),r.className="stream-loading",r.innerHTML='<span class="loading-spinner"></span> Loading stream...',r.style.cssText="padding: 20px; text-align: center; color: var(--accent);",g.prepend(r));const i=await x(o);if(r&&r.parentNode&&r.parentNode.removeChild(r),i&&i.success&&i.data)Ss(i.data,t);else{let a=g.querySelector(".stream-error");a||(a=document.createElement("p"),a.className="stream-error error",a.textContent="Failed to load stream. Try a different server.",g.prepend(a))}}catch(r){console.error("Stream error:",r);const i=g.querySelector(".stream-loading");i&&i.parentNode&&i.parentNode.removeChild(i);let a=g.querySelector(".stream-error");a||(a=document.createElement("p"),a.className="stream-error error",a.textContent=`Error loading stream: ${r.message}`,g.prepend(a))}};function Ss(e,s){var A,I,M,B,b;const t=((A=e.link)==null?void 0:A.file)||((I=e.link)==null?void 0:I.directUrl)||"",n=e.tracks||[],o=e.intro||{start:0,end:0},r=e.outro||{start:0,end:0},i=te();if(!t){if(!g.querySelector(".stream-error")){const $=document.createElement("p");$.className="stream-error error",$.textContent="No video URL available",g.prepend($)}return}const a=document.getElementById("customVideoPlayer");a&&a.remove();const c=document.getElementById("defaultVideoPlayer");c&&c.remove();let d=document.getElementById("videoPlayer");d||(d=document.createElement("div"),d.id="videoPlayer",d.className="video-player-section",d.style.marginBottom="20px"),g.prepend(d);let m="";if((o.start!==0||o.end!==0)&&(m+=`<p style="color:#ffcc00;">Skip intro: ${o.start}s - ${o.end}s</p>`),(r.start!==0||r.end!==0)&&(m+=`<p style="color:#ffcc00;">Skip outro: ${r.start}s - ${r.end}s</p>`),window.currentAnimeTitle=s||window.currentAnimeTitle,d.innerHTML=`
    <h3>Now Playing: ${s}</h3>
    ${m}
  `,i){const v=St({videoUrl:t,title:s,tracks:n,intro:o,outro:r});d.appendChild(v),P=kt(v,{videoUrl:t})}else{const v=yt({videoUrl:t,title:s});d.appendChild(v),P=wt(v,{videoUrl:t})}const f=((M=window.hianimeScrapServerData)==null?void 0:M.currentEpisodeIndex)??-1,w=((B=window.hianimeScrapServerData)==null?void 0:B.totalEpisodes)??0;P&&((b=window.hianimeScrapServerData)!=null&&b.episodes)&&P.setEpisodeCallbacks(f>0?()=>{const v=window.hianimeScrapServerData.episodes[f-1];v&&(v.id||`${window.hianimeScrapServerData.animeId}${v.number}`,window.hianimeScrapServerData.currentEpisodeIndex=f-1,playHianimeScrapStream(v.id,window.hianimeScrapServerData.currentServerType||"sub",v.name||`Episode ${v.number}`))}:null,f<w-1?()=>{const v=window.hianimeScrapServerData.episodes[f+1];v&&(v.id||`${window.hianimeScrapServerData.animeId}${v.number}`,window.hianimeScrapServerData.currentEpisodeIndex=f+1,playHianimeScrapStream(v.id,window.hianimeScrapServerData.currentServerType||"sub",v.name||`Episode ${v.number}`))}:null)}function Ce(e,s){const t=te();g.innerHTML=`
    <div class="player-toggle-header">
      <h3>Servers for Episode ${s}</h3>
      <div class="player-toggle">
        <span class="toggle-custom">🎬 Custom</span>
        <label class="toggle-switch" onclick="handlePlayerToggle()">
          <input type="checkbox" id="playerToggle" ${t?"checked":""}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-default">🌐 Default</span>
      </div>
    </div>
  `;let n=[];if(Array.isArray(e)?n=e:e&&e.servers&&Array.isArray(e.servers)?n=e.servers:e&&e.sources&&Array.isArray(e.sources)?n=e.sources:e&&e.data&&Array.isArray(e.data)?n=e.data:e&&e.streamingServers&&Array.isArray(e.streamingServers)&&(n=e.streamingServers),n.length===0){g.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}let o='<div class="servers-list">';n.forEach((r,i)=>{const a=r.name||r.serverName||r.quality||`Server ${i+1}`,c=r.url||r.file||r.src||r.streamUrl||"";if(o+=`
      <div class="server-option">
        <strong>${a}</strong>
    `,c){const d=`${ot}/fetch?url=${encodeURIComponent(c)}`;o+=`
        <p><a href="${c}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
        <p><a href="${d}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
        <p><button class="play-btn" onclick="playStream('${d.replace(/'/g,"\\'")}', '${a.replace(/'/g,"\\'")}')">▶ Play</button></p>
      `,r.sources&&Array.isArray(r.sources)&&r.sources.forEach((m,f)=>{const w=m.url||m.file||m.src||"";if(w){const A=`${ot}/fetch?url=${encodeURIComponent(w)}`,I=m.quality||`Source ${f+1}`;o+=`
              <hr style="margin: 10px 0; border-color: rgba(233,69,96,0.3);">
              <p><strong>${I}</strong></p>
              <p><a href="${w}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
              <p><a href="${A}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
              <p><button class="play-btn" onclick="playStream('${A}')">▶ Play</button></p>
            `}})}else o+="<p>No direct URL available</p>";(r.intro||r.outro)&&(o+='<p class="meta">',r.intro&&(o+=`Intro: ${r.intro.start}-${r.intro.end}s `),r.outro&&(o+=`Outro: ${r.outro.start}-${r.outro.end}s`),o+="</p>"),o+="</div>"}),o+="</div>",g.innerHTML+=o}window.playStream=async function(e,s){if(!e)return alert("No stream URL available");console.log("Playing stream:",e);const t=te(),n=document.getElementById("customVideoPlayer");n&&n.remove();const o=document.getElementById("defaultVideoPlayer");o&&o.remove();let r=document.getElementById("videoPlayer");if(r||(r=document.createElement("div"),r.id="videoPlayer",r.className="video-player-section",r.style.marginBottom="20px"),g.prepend(r),window.currentAnimeTitle=s||window.currentAnimeTitle,r.innerHTML=`<h3>Now Playing: ${s}</h3>`,t){const a=St({videoUrl:e,title:s,tracks:[],intro:{},outro:{}});r.appendChild(a),P=kt(a,{videoUrl:e})}else{const a=yt({videoUrl:e,title:s});r.appendChild(a),P=wt(a,{videoUrl:e})}const i=U.findIndex(a=>{var m,f;const c=a.number||a.episode||a.ep||0,d=parseInt(((f=(m=document.querySelector(".episode-btn.active"))==null?void 0:m.textContent)==null?void 0:f.trim())||"0");return c===d});P&&U.length>0&&P.setEpisodeCallbacks(i>0?()=>{const a=U[i-1];if(a){const c=a.id||`${ge}-episode-${a.number||i}`,d=a.number||a.episode||a.ep||i;Fe(c,String(d))}}:null,i<U.length-1?()=>{const a=U[i+1];if(a){const c=a.id||`${ge}-episode-${a.number||i+2}`,d=a.number||a.episode||a.ep||i+2;Fe(c,String(d))}}:null)};Gt.addEventListener("click",De);K.addEventListener("keypress",e=>{e.key==="Enter"&&De()});Y.addEventListener("change",()=>{Z.innerHTML="",ee.innerHTML="",fe.innerHTML="",g.innerHTML="",ge=null,U=[],k=null});document.getElementById("homeBtn").addEventListener("click",Ve);document.getElementById("searchNavBtn").addEventListener("click",we);document.addEventListener("DOMContentLoaded",()=>{Ve()});
