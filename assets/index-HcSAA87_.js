(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();let Se=null,Pe=null;function wt(e,s,t,n){lt();const i=o=>{if(isNaN(o))return"0:00";const l=Math.floor(o/60),r=Math.floor(o%60);return`${l}:${r.toString().padStart(2,"0")}`},a=()=>{if(!e||!s)return;const o=e.duration;if(!o||!isFinite(o)){Se=requestAnimationFrame(a);return}const l=e.currentTime,r=l/o*100;s.style.setProperty("--progress",`${r}%`),s.style.width=`${r}%`,t&&(t.textContent=i(l)),n&&(n.textContent=i(o)),Se=requestAnimationFrame(a)};Se=requestAnimationFrame(a)}function lt(){Se&&(cancelAnimationFrame(Se),Se=null)}function $t(e,s){dt();const t=()=>{if(!(!e||!s)){if(e.buffered&&e.buffered.length>0){const n=e.buffered.end(e.buffered.length-1),i=e.duration;if(i&&isFinite(i)){const a=n/i*100;s.style.setProperty("--buffered",`${a}%`),s.style.width=`${a}%`}}Pe=requestAnimationFrame(t)}};Pe=requestAnimationFrame(t)}function dt(){Pe&&(cancelAnimationFrame(Pe),Pe=null)}let je=null;function Tt(e,s,t,n){if(!e)return;const i=e.currentTime,a=300,o=performance.now();t&&t.classList.add("seeking");function l(r){const p=r-o,u=Math.min(p/a,1),g=et(u),y=i+(s-i)*g;e.currentTime=Math.max(0,Math.min(y,n||e.duration)),u<1?je=requestAnimationFrame(l):(t&&t.classList.remove("seeking"),e.currentTime=s)}je&&cancelAnimationFrame(je),je=requestAnimationFrame(l)}function et(e){return 1-Math.pow(1-e,3)}let Oe=null;function Mt(e){if(!e)return;Oe&&(clearTimeout(Oe),Oe=null),e.classList.add("show-controls"),e.classList.remove("hide-cursor");const s=e.classList.contains("playing")?4e3:5e3;Oe=setTimeout(()=>{e.classList.contains("playing")&&(e.classList.remove("show-controls"),e.classList.add("hide-cursor"))},s)}function xt(e){e&&(e.classList.remove("show-controls"),e.classList.add("hide-cursor"))}let We=null;function ye(e,s,t,n,i=150){if(!e)return;const a=e.volume,o=performance.now();We&&cancelAnimationFrame(We);function l(r){const p=r-o,u=Math.min(p/i,1),g=et(u),y=a+(s-a)*g;e.volume=Math.max(0,Math.min(y,1)),t&&(t.value=e.volume),e.volume>0&&e.muted&&(e.muted=!1,n&&Ot(n)),u<1&&(We=requestAnimationFrame(l))}We=requestAnimationFrame(l)}function Ot(e,s){if(!e)return;const t={volumeHigh:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'};e.innerHTML=t.volumeHigh}function Wt(e,s){!e||!s||(e.classList.add("visible"),s.style.opacity="0",s.style.transform="translateY(10px)",s.offsetWidth,s.style.transition="opacity 0.15s ease-out, transform 0.15s ease-out",s.style.opacity="1",s.style.transform="translateY(0)")}function _t(e,s){!e||!s||(s.style.transition="opacity 0.1s ease-in, transform 0.1s ease-in",s.style.opacity="0",s.style.transform="translateY(5px)",setTimeout(()=>{e.classList.remove("visible")},100))}function Ye(e,s,t){e&&(e.paused?(e.play().catch(()=>{}),s.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',t.classList.add("playing"),s.style.transform="scale(1.1)",setTimeout(()=>{s.style.transform=""},150)):(e.pause(),s.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',t.classList.remove("playing"),s.style.transform="scale(0.95)",setTimeout(()=>{s.style.transform=""},100)))}function qt(e){var s,t,n,i,a,o;e&&(!document.fullscreenElement&&!document.webkitFullscreenElement&&!document.mozFullScreenElement?(e.style.transition="transform 0.3s ease-out",(s=e.requestFullscreen)!=null&&s.call(e)||(t=e.webkitRequestFullscreen)!=null&&t.call(e)||((n=e.mozRequestFullScreen)==null||n.call(e)),e.classList.add("is-fullscreen")):((i=document.exitFullscreen)!=null&&i.call(document)||(a=document.webkitExitFullscreen)!=null&&a.call(document)||((o=document.mozCancelFullScreen)==null||o.call(document)),e.classList.remove("is-fullscreen")))}let _e=null;function Xt(e,s,t=200){if(!e)return;const n=e.playbackRate,i=performance.now();_e&&cancelAnimationFrame(_e);function a(o){const l=o-i,r=Math.min(l/t,1),p=et(r),u=n+(s-n)*p;e.playbackRate=u,r<1?_e=requestAnimationFrame(a):e.playbackRate=s}_e=requestAnimationFrame(a)}let Xe=null;function Ae(e,s,t=150){if(!e)return;const n=e.currentTime,i=Math.max(0,Math.min(n+s,e.duration||1/0)),a=performance.now();Yt(e.parentElement,s);function o(l){const r=l-a,p=Math.min(r/t,1),u=et(p);e.currentTime=n+(i-n)*u,p<1?Xe=requestAnimationFrame(o):e.currentTime=i}Xe&&cancelAnimationFrame(Xe),Xe=requestAnimationFrame(o)}function Yt(e,s){if(!e)return;let t=e.querySelector(".skip-indicator");t||(t=document.createElement("div"),t.className="skip-indicator",t.innerHTML=`
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
    `,e.appendChild(t)),t.style.opacity="1",t.style.transform="translate(-50%, -50%) scale(1)",setTimeout(()=>{t.style.opacity="0",t.style.transform="translate(-50%, -50%) scale(0.5)",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},500)}function at(e){e&&(e.classList.remove("hidden"),e.style.opacity="0",e.style.transform="scale(0.95)",requestAnimationFrame(()=>{e.style.transition="opacity 0.3s ease-out, transform 0.3s ease-out",e.style.opacity="1",e.style.transform="scale(1)"}))}function Ge(e){e&&(e.style.transition="opacity 0.25s ease-in, transform 0.25s ease-in",e.style.opacity="0",e.style.transform="scale(0.95)",setTimeout(()=>{e.classList.add("hidden"),e.style.transform=""},250))}function vt(e){e&&(e.classList.remove("hidden"),e.style.opacity="0",e.style.transform="scale(0.95)",requestAnimationFrame(()=>{e.style.transition="opacity 0.3s ease-out, transform 0.3s ease-out",e.style.opacity="1",e.style.transform="scale(1)"}))}function Ht(e){e&&(e.classList.add("visible"),e.style.transform="translateY(10px) scale(0.98)",e.style.opacity="0",requestAnimationFrame(()=>{e.style.transition="transform 0.3s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.3s ease-out",e.style.transform="translateY(0) scale(1)",e.style.opacity="1"}))}function rt(e){e&&(e.style.transition="transform 0.2s ease-in, opacity 0.2s ease-in",e.style.transform="translateY(10px) scale(0.98)",e.style.opacity="0",setTimeout(()=>{e.classList.remove("visible"),e.style.transform="",e.style.opacity=""},200))}function Gt(e,s){let t;return function(...n){t||(e.apply(this,n),t=!0,setTimeout(()=>t=!1,s))}}function Qt(e,s){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>e.apply(this,n),s)}}const nt=[];let it=!1;function Jt(e){nt.push(e),it||(it=!0,requestAnimationFrame(()=>{nt.forEach(s=>s()),nt.length=0,it=!1}))}function Kt(e,s={}){const t=e==null?void 0:e.querySelector("#customVideo"),n=e==null?void 0:e.querySelector(".player-loading"),i=e==null?void 0:e.querySelector(".player-error"),a=e==null?void 0:e.querySelector(".progress-bar"),o=e==null?void 0:e.querySelector(".buffered-bar"),l=e==null?void 0:e.querySelector(".play-btn-main"),r=e==null?void 0:e.querySelector(".volume-btn"),p=e==null?void 0:e.querySelector(".volume-slider"),u=e==null?void 0:e.querySelector(".time-display"),g=u==null?void 0:u.querySelector(".current-time"),y=u==null?void 0:u.querySelector(".duration"),C=e==null?void 0:e.querySelector(".progress-container"),V=e==null?void 0:e.querySelector(".subtitle-container");V==null||V.querySelector(".subtitle-text");const E=e==null?void 0:e.querySelector(".settings-menu"),F=e==null?void 0:e.querySelector(".settings-btn");return!t||!e?null:(t.addEventListener("loadedmetadata",()=>{if(y){const S=H=>{if(isNaN(H))return"0:00";const h=Math.floor(H/60),B=Math.floor(H%60);return`${h}:${B.toString().padStart(2,"0")}`};y.textContent=S(t.duration)}Ge(n)}),t.addEventListener("play",()=>{l.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',e.classList.add("playing"),wt(t,a,g,y),$t(t,o)}),t.addEventListener("pause",()=>{l.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',e.classList.remove("playing"),lt(),dt()}),t.addEventListener("waiting",()=>at(n)),t.addEventListener("canplay",()=>Ge(n)),t.addEventListener("error",()=>vt(i)),e.addEventListener("mousemove",()=>Mt(e)),e.addEventListener("mouseleave",()=>{e.classList.contains("playing")&&xt(e)}),t.addEventListener("click",()=>Ye(t,l,e)),l.addEventListener("click",()=>Ye(t,l,e)),r.addEventListener("click",()=>{t.muted?(t.muted=!1,ye(t,(p==null?void 0:p.value)||1,p,r)):(t.muted=!0,ye(t,0,p,r))}),p==null||p.addEventListener("input",S=>{ye(t,S.target.value,p,r,100)}),C==null||C.addEventListener("click",S=>{const H=C.getBoundingClientRect(),B=(S.clientX-H.left)/H.width*t.duration;Tt(t,B,a,t.duration)}),F==null||F.addEventListener("click",S=>{S.stopPropagation(),E.classList.contains("visible")?rt(E):Ht(E)}),e==null||e.addEventListener("click",S=>{S.target.closest(".settings-wrapper")||rt(E)}),document.addEventListener("keydown",S=>{if(e.isConnected&&S.target.tagName!=="INPUT")switch(S.key){case" ":case"k":S.preventDefault(),Ye(t,l,e);break;case"m":S.preventDefault(),t.muted?(t.muted=!1,ye(t,(p==null?void 0:p.value)||1,p,r)):(t.muted=!0,ye(t,0,p,r));break;case"f":S.preventDefault(),qt(e);break;case"ArrowLeft":S.preventDefault(),Ae(t,-5);break;case"ArrowRight":S.preventDefault(),Ae(t,5);break;case"j":Ae(t,-10);break;case"l":Ae(t,10);break}}),document.addEventListener("fullscreenchange",()=>{document.fullscreenElement||e.classList.remove("is-fullscreen")}),{element:e,video:t,loadVideo:S=>{if(at(n),hideErrorSmooth(i),t.canPlayType("application/vnd.apple.mpegurl"))t.src=S;else if(window.Hls){const H=new window.Hls({enableWorker:!0,lowLatencyMode:!0});H.loadSource(S),H.attachMedia(t),H.on(window.Hls.Events.MANIFEST_PARSED,()=>{Ge(n)}),H.on(window.Hls.Events.ERROR,(h,B)=>{B.fatal&&vt(i)})}},setEpisodeCallbacks:s.setEpisodeCallbacks})}window.smoothPlayer={initSmoothPlayer:Kt,startSmoothProgressUpdate:wt,stopSmoothProgressUpdate:lt,startBufferedUpdate:$t,stopBufferedUpdate:dt,smoothSeek:Tt,setVolumeSmooth:ye,showSubtitleSmooth:Wt,hideSubtitleSmooth:_t,togglePlaySmooth:Ye,toggleFullscreenSmooth:qt,setPlaybackRateSmooth:Xt,skipVideoSmooth:Ae,showLoadingSmooth:at,hideLoadingSmooth:Ge,showSettingsMenuSmooth:Ht,hideSettingsMenuSmooth:rt,showControlsSmooth:Mt,hideControlsSmooth:xt,throttle:Gt,debounce:Qt,queueBatchUpdate:Jt};const Zt="http://localhost:3000",N=Zt,es={"hianime-scrap":{base:"https://api.animo.qzz.io/api/v1",templates:{search:"https://hianimeapi-6uju.onrender.com/api/v1/search?keyword={query}&page=1",info:"https://hianimeapi-6uju.onrender.com/api/v1/anime/{id}",episodes:"https://hianimeapi-6uju.onrender.com/api/v1/episodes/{id}",servers:"https://hianimeapi-6uju.onrender.com/api/v1/servers/id={id}",stream:"https://api.animo.qzz.io/api/v1/stream?id={id}&type={type}&server={server}",home:"https://hianimeapi-6uju.onrender.com/api/v1/home"}},animekai:{base:N+"/anime/animekai",templates:{search:N+"/anime/animekai/{query}",info:N+"/anime/animekai/info?id={id}",episodes:N+"/anime/animekai/episodes/{id}",watch:N+"/anime/animekai/watch/{episodeId}",home:N+"/anime/animekai/new-releases"}},animepahe:{base:N+"/anime/animepahe",templates:{search:N+"/anime/animepahe/{query}",info:N+"/anime/animepahe/info/{id}",episodes:N+"/anime/animepahe/episodes/{id}",watch:N+"/anime/animepahe/watch?episodeId={episodeId}",home:N+"/anime/animekai/new-releases"}}};function O(e,s,t={}){const n=es[e];if(!n)return console.error(`Provider ${e} not found`),"";const i=n.templates[s];if(!i)return console.error(`Template ${s} not found for provider ${e}`),"";let a=i;return Object.keys(t).forEach(o=>{let l=t[o];o==="episodeId"?l=encodeURIComponent(l):l!=null?l=encodeURIComponent(String(l)):l="",a=a.replace(new RegExp(`\\{${o}\\}`,"g"),l)}),a}async function W(e,s={}){try{const t={Accept:"application/json",...s.headers||{}};s.body&&(t["Content-Type"]="application/json");const n=await fetch(e,{...s,headers:t});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return await n.json()}catch(t){throw console.error(`Fetch error for ${e}:`,t),t}}async function ts(e,s="hianime-scrap"){var n,i,a;const t=O(s,"info",{id:e});console.log("Fetching anime info from:",t);try{const o=await W(t);return o&&o.data&&s==="hianime-scrap"?{...o.data,id:o.data.id||e,title:o.data.title,poster:o.data.poster,image:o.data.poster,synopsis:o.data.synopsis||o.data.description||"",alternativeTitle:o.data.alternativeTitle||"",rating:o.data.rating||"",type:o.data.type,is18Plus:o.data.is18Plus||!1,aired:o.data.aired||{},premiered:o.data.premiered||"",duration:o.data.duration||"",status:o.data.status,MAL_score:o.data.MAL_score||"",genres:o.data.genres||[],studios:o.data.studios||[],producers:o.data.producers||[],moreSeasons:o.data.moreSeasons||[],related:o.data.related||[],mostPopular:o.data.mostPopular||[],recommended:o.data.recommended||[],japanese:o.data.japanese||"",episodes:{sub:((n=o.data.episodes)==null?void 0:n.sub)||0,dub:((i=o.data.episodes)==null?void 0:i.dub)||0,eps:((a=o.data.episodes)==null?void 0:a.eps)||0}}:ns(o,e,s)}catch(o){return console.error("Error fetching anime info:",o),null}}async function ss(e,s="hianime-scrap"){const t=O(s,"episodes",{id:e});console.log("Fetching episodes from:",t);try{const n=await W(t);return is(n,s)}catch(n){return console.error("Error fetching episodes:",n),[]}}function ns(e,s,t){var n,i,a;if(e&&e.data&&t==="hianime-scrap")return{...e.data,id:e.data.id||s,title:e.data.title,poster:e.data.poster,image:e.data.poster,type:e.data.type,status:e.data.status,genres:e.data.genres||[],description:e.data.description||e.data.synopsis||"",totalEpisodes:((n=e.data.episodes)==null?void 0:n.eps)||((i=e.data.episodes)==null?void 0:i.sub)||((a=e.data.episodes)==null?void 0:a.dub)||"Unknown"};if(Array.isArray(e)){const o=e.find(l=>l&&l.id===s)||e[0];return o?{...o,id:o.id||s}:{id:s,episodes:[]}}if(e&&e.results&&Array.isArray(e.results)){const o=e.results.find(l=>l&&l.id===s)||e.results[0];return o?{...o,id:o.id||s}:{...e,id:e.id||s}}return e&&e.data?{...e.data,id:e.data.id||s}:e&&(e.title||e.name||e.englishName)?{...e,id:e.id||s}:{id:s,...e||{}}}function is(e,s){return e?s==="hianime-scrap"&&e&&e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||`${n+1}`,number:t.episodeNumber||n+1,title:t.title||t.alternativeTitle||`Episode ${t.episodeNumber||n+1}`,isFiller:t.isFiller||!1})):Array.isArray(e)?e.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.episodes&&Array.isArray(e.episodes)?e.episodes.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):[]:[]}function At(e){const{videoUrl:s="",title:t="Video"}=e,n=document.createElement("div");return n.className="default-video-player",n.id="defaultVideoPlayer",n.innerHTML=`
    <video id="defaultVideo" preload="metadata" controls playsinline>
      <source src="${s}" type="application/vnd.apple.mpegurl">
    </video>
    <div class="default-player-info">
      <p>Using default browser player</p>
      <p class="video-title">${t}</p>
    </div>
  `,n}function Pt(e,s={}){const t=e.querySelector("#defaultVideo"),n=s.videoUrl||"";let i=null;function a(r,p){try{if(window.Hls)o(r,p);else{const u=document.createElement("script");u.src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js",u.onload=()=>o(r,p),u.onerror=()=>{console.error("Failed to load HLS.js")},document.head.appendChild(u)}}catch(u){console.warn("HLS playback failed:",u)}}function o(r,p){!window.Hls||!r||(i=new window.Hls({enableWorker:!0,lowLatencyMode:!0}),i.loadSource(p),i.attachMedia(r),i.on(window.Hls.Events.MANIFEST_PARSED,()=>{console.log("HLS manifest parsed for default player")}),i.on(window.Hls.Events.ERROR,(u,g)=>{console.error("HLS error in default player:",g)}))}function l(r){t&&(i&&(i.destroy(),i=null),t.canPlayType("application/vnd.apple.mpegurl")?t.src=r:a(t,r))}return n&&(t.canPlayType("application/vnd.apple.mpegurl")?t.src=n:a(t,n)),{element:e,video:t,loadVideo:l,destroy:()=>{i&&(i.destroy(),i=null)}}}let pe=[],ht=null;const q={play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',volumeHigh:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',volumeMute:'<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',fullscreen:'<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',settings:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23-.41-.12-.61l1.92-3.32c.12-.22.37-.29.59-.22l2.39.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',upload:'<svg viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>',cloud:'<svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',skipBack:'<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>',skipForward:'<svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>',previous:'<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',next:'<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-5.71L11.29 12H2v-2h9.29l-3-2.29zM22 6h-2V2h-2v4h-2V2h-2v4h-2V2h-2v4h-2V2H8v4H6V2H4v16h2v-4h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2V6z"/></svg>',check:'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'};function Ct(e){const{videoUrl:s="",title:t="Video",tracks:n=[],intro:i={start:0,end:0},outro:a={start:0,end:0}}=e,o=document.createElement("div");o.className="custom-video-player",o.id="customVideoPlayer";let l="";return n.length>0&&(l=n.map(r=>r.kind==="captions"||r.kind==="subtitles"?`<track label="${r.label}" kind="${r.kind}" src="${r.file}" ${r.default?"default":""}>`:"").join("")),o.innerHTML=`
    <video id="customVideo" preload="metadata" crossorigin="anonymous">
      <source src="${s}" type="application/vnd.apple.mpegurl">
      ${l}
    </video>
    <div class="player-loading hidden"><div class="spinner"></div><p>Loading...</p></div>
    <div class="player-error hidden"><div class="error-icon">⚠️</div><p>Unable to load video. Please check your connection and try again.</p><button class="retry-btn">Retry</button></div>
    <div class="player-controls">
      <div class="progress-container"><div class="buffered-bar" style="width: 0%"></div><div class="progress-bar" style="width: 0%"></div></div>
      <div class="controls-row">
        <div class="controls-left">
          <button class="control-btn play-btn-main" title="Play/Pause">${q.play}</button>
          <div class="skip-buttons"><button class="skip-btn" data-seconds="-10" title="Rewind 10s">${q.skipBack}<span>10</span></button></div>
          <div class="skip-buttons"><button class="skip-btn" data-seconds="10" title="Forward 10s"><span>10</span>${q.skipForward}</button></div>
          <div class="volume-container">
            <button class="control-btn volume-btn" title="Mute/Unmute">${q.volumeHigh}</button>
            <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="1">
          </div>
          <div class="time-display"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
        </div>
        <div class="controls-right">
          <div class="episode-nav">
            <button class="episode-nav-btn prev-episode" title="Previous Episode" disabled>${q.previous}</button>
            <span class="current-episode">${t}</span>
            <button class="episode-nav-btn next-episode" title="Next Episode" disabled>${q.next}</button>
          </div>
          <div class="settings-wrapper" style="position: relative;">
            <button class="control-btn settings-btn" title="Settings">${q.settings}</button>
            <div class="settings-menu">
              <div class="settings-menu-item" data-setting="playbackSpeed"><span>Playback Speed</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitleTrack"><span>Subtitles</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitleSize"><span>Subtitle Size</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitlePosition"><span>Subtitle Position</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="uploadSubtitle"><span>Upload Subtitle</span><span>${q.upload}</span></div>
              <div class="settings-menu-item" data-setting="cloudSubtitles"><span>Search Cloud</span><span>${q.cloud}</span></div>
            </div>
            <div class="submenu playback-speed-menu">
              ${[.5,.75,1,1.25,1.5,2].map(r=>`<div class="submenu-item" data-speed="${r}"><span class="check-icon">${q.check}</span><span>${r}x</span></div>`).join("")}
            </div>
            <div class="submenu subtitle-track-menu">
              <div class="submenu-item active" data-track="off"><span class="check-icon">${q.check}</span><span>Off</span></div>
              <div class="submenu-item" data-track="uploaded"><span class="check-icon">${q.check}</span><span>Uploaded</span></div>
            </div>
            <div class="submenu subtitle-size-menu">
              ${["Small","Medium","Large","X-Large"].map(r=>`<div class="submenu-item" data-size="${r.toLowerCase()}"><span class="check-icon">${q.check}</span><span>${r}</span></div>`).join("")}
            </div>
            <div class="submenu subtitle-position-menu">
              <div class="submenu-item" data-position="top"><span class="check-icon">${q.check}</span><span>Top</span></div>
              <div class="submenu-item active" data-position="bottom"><span class="check-icon">${q.check}</span><span>Bottom</span></div>
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
          <button class="control-btn fullscreen-btn" title="Fullscreen">${q.fullscreen}</button>
        </div>
      </div>
    </div>
    <div class="subtitle-container subtitle-position-bottom"><div class="subtitle-text"></div></div>
    <div class="player-tooltip"></div>
    <input type="file" accept=".srt,.vtt" id="subtitleFileInput" style="display:none" multiple>
  `,o}function Bt(e,s={}){var Y,xe,qe,Ne,Ee,De;const t=e.querySelector("#customVideo"),n=e.querySelector(".player-loading"),i=e.querySelector(".player-error"),a=e.querySelector(".player-controls"),o=e.querySelector(".progress-container"),l=e.querySelector(".progress-bar"),r=e.querySelector(".buffered-bar"),p=e.querySelector(".play-btn-main"),u=e.querySelector(".volume-btn"),g=e.querySelector(".volume-slider"),y=e.querySelectorAll(".skip-btn"),C=e.querySelector(".fullscreen-btn"),V=e.querySelector(".settings-btn"),E=e.querySelector(".settings-menu"),F=e.querySelector(".time-display"),S=F.querySelector(".current-time"),H=F.querySelector(".duration"),h=e.querySelector(".subtitle-container"),B=h.querySelector(".subtitle-text"),{showToast:we,safeFetch:oe}=s;let R=!1,J=!1,ee=null,z=null,K=0;function w(d){if(isNaN(d))return"0:00";const f=Math.floor(d/60),L=Math.floor(d%60);return`${f}:${L.toString().padStart(2,"0")}`}function Fe(){t.duration&&(l.style.width=`${t.currentTime/t.duration*100}%`,S.textContent=w(t.currentTime))}function he(){t.buffered.length>0&&(r.style.width=`${t.buffered.end(t.buffered.length-1)/t.duration*100}%`)}function D(){n.classList.remove("hidden")}function _(){n.classList.add("hidden")}function fe(){i.classList.remove("hidden"),a.classList.add("hidden")}function Ue(){i.classList.add("hidden"),a.classList.remove("hidden")}function $e(){t.paused?(t.play().catch(()=>{}),R=!0,p.innerHTML=q.pause,e.classList.add("playing")):(t.pause(),R=!1,p.innerHTML=q.play,e.classList.remove("playing"))}function ae(){J?(t.muted=!1,J=!1,u.innerHTML=q.volumeHigh,g.value=t.volume):(t.muted=!0,J=!0,u.innerHTML=q.volumeMute,g.value=0)}function te(){var d,f,L,A;document.fullscreenElement?(L=document.exitFullscreen)!=null&&L.call(document)||((A=document.webkitExitFullscreen)==null||A.call(document)):(d=e.requestFullscreen)!=null&&d.call(e)||((f=e.webkitRequestFullscreen)==null||f.call(e))}function X(d){t.currentTime=Math.max(0,Math.min(t.currentTime+d,t.duration))}function Te(){window.smoothPlayer&&window.smoothPlayer.showControlsSmooth?window.smoothPlayer.showControlsSmooth(e):(e.classList.add("show-controls"),clearTimeout(ee),R&&(ee=setTimeout(()=>{e.classList.remove("show-controls")},3e3)))}function re(d){if(t.canPlayType("application/vnd.apple.mpegurl")){t.src=d;return}try{if(window.Hls)Me(d);else{const f=document.createElement("script");f.src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js",f.onload=()=>Me(d),f.onerror=fe,document.head.appendChild(f)}}catch{fe()}}function Me(d){window.Hls&&(z&&z.destroy(),z=new window.Hls({enableWorker:!0,lowLatencyMode:!0}),z.loadSource(d),z.attachMedia(t),z.on(window.Hls.Events.MANIFEST_PARSED,()=>{_(),t.play().catch(()=>{})}),z.on(window.Hls.Events.ERROR,(f,L)=>{L.fatal&&fe()}))}t.addEventListener("loadedmetadata",()=>{H.textContent=w(t.duration),_()}),t.addEventListener("play",()=>{R=!0,p.innerHTML=q.pause,Te()}),t.addEventListener("pause",()=>{R=!1,p.innerHTML=q.play}),t.addEventListener("timeupdate",()=>{Fe(),he()}),t.addEventListener("waiting",D),t.addEventListener("canplay",_),t.addEventListener("error",fe),p.addEventListener("click",$e),t.addEventListener("click",$e),u.addEventListener("click",ae),g.addEventListener("input",d=>{t.volume=d.target.value,g.value=t.volume,t.volume>0&&J&&ae()}),y.forEach(d=>d.addEventListener("click",()=>X(parseInt(d.dataset.seconds)))),o.addEventListener("click",d=>{const f=(d.clientX-o.getBoundingClientRect().left)/o.getBoundingClientRect().width;t.currentTime=f*t.duration}),C.addEventListener("click",te),V.addEventListener("click",()=>{E.classList.toggle("visible")}),e.addEventListener("click",d=>{d.target.closest(".settings-wrapper")||E.classList.remove("visible")});const ce=e.querySelector(".playback-speed-menu");(Y=e.querySelector('[data-setting="playbackSpeed"]'))==null||Y.addEventListener("click",()=>{ce.classList.toggle("visible")}),ce.querySelectorAll(".submenu-item").forEach(d=>{d.addEventListener("click",()=>{t.playbackRate=parseFloat(d.dataset.speed),ce.classList.remove("visible"),ce.querySelectorAll(".submenu-item").forEach(f=>f.classList.remove("active")),d.classList.add("active")})});const le=e.querySelector(".subtitle-size-menu");(xe=e.querySelector('[data-setting="subtitleSize"]'))==null||xe.addEventListener("click",()=>{le.classList.toggle("visible")}),le.querySelectorAll(".submenu-item").forEach(d=>{d.addEventListener("click",()=>{h.className=`subtitle-container subtitle-size-${d.dataset.size}`,le.classList.remove("visible"),le.querySelectorAll(".submenu-item").forEach(f=>f.classList.remove("active")),d.classList.add("active")})});const me=e.querySelector(".subtitle-position-menu");(qe=e.querySelector('[data-setting="subtitlePosition"]'))==null||qe.addEventListener("click",()=>{me.classList.toggle("visible")}),me.querySelectorAll(".submenu-item[data-position]").forEach(d=>{d.addEventListener("click",()=>{h.classList.remove("subtitle-position-top","subtitle-position-middle","subtitle-position-bottom"),h.classList.add(`subtitle-position-${d.dataset.position}`),me.querySelectorAll(".submenu-item").forEach(f=>f.classList.remove("active")),d.classList.add("active"),we&&we(`Subtitle position: ${d.dataset.position}`,"info")})});const de=e.querySelector(".offset-value");e.querySelectorAll(".offset-btn").forEach(d=>{d.addEventListener("click",()=>{const f=parseInt(d.dataset.offset);K=Math.max(-200,Math.min(200,K+f)),de.textContent=K>0?`+${K}`:K,h.style.bottom=`calc(100px + ${K}px)`,h.style.top="auto",h.style.transform="translateX(-50%)"})});const ue=e.querySelector(".subtitle-track-menu");(Ne=e.querySelector('[data-setting="subtitleTrack"]'))==null||Ne.addEventListener("click",()=>{ue.classList.toggle("visible")});const Re=e.querySelector(".upload-subtitle-menu");(Ee=e.querySelector('[data-setting="uploadSubtitle"]'))==null||Ee.addEventListener("click",()=>{Re.classList.toggle("visible"),ue.classList.remove("visible")});const M=e.querySelector(".upload-zone"),I=M==null?void 0:M.querySelector(".subtitle-input");M==null||M.addEventListener("click",()=>{I==null||I.click()}),I==null||I.addEventListener("change",async d=>{const f=d.target.files;if(f&&f.length>0)for(let L=0;L<f.length;L++){const A=f[L];if(A.name.endsWith(".srt")||A.name.endsWith(".vtt"))try{await bt(A,t),ge()}catch(se){console.error("Subtitle upload error:",se)}}I.value=""}),M==null||M.addEventListener("dragover",d=>{d.preventDefault(),M.classList.add("dragover")}),M==null||M.addEventListener("dragleave",()=>{M.classList.remove("dragover")}),M==null||M.addEventListener("drop",async d=>{var L;d.preventDefault(),M.classList.remove("dragover");const f=(L=d.dataTransfer)==null?void 0:L.files;if(f&&f.length>0)for(let A=0;A<f.length;A++){const se=f[A];if(se.name.endsWith(".srt")||se.name.endsWith(".vtt"))try{await bt(se,t),ge()}catch(He){console.error("Subtitle upload error:",He)}}});function ge(){const d=e.querySelector(".uploaded-subtitles-list");if(d){if(pe.length===0){d.innerHTML='<p style="color: var(--text-light); font-size: 0.85em; padding: 10px;">No subtitles uploaded</p>';return}d.innerHTML=pe.map((f,L)=>`
      <div class="loaded-subtitle-item ${L===pe.length-1?"active":""}">
        <span class="name">${f.label.substring(0,25)}${f.label.length>25?"...":""}</span>
        <button class="remove-btn" onclick="removeSubtitle(${L})">✕</button>
      </div>
    `).join("")}}return document.addEventListener("keydown",d=>{if(e.isConnected&&d.target.tagName!=="INPUT")switch(d.key){case" ":case"k":d.preventDefault(),$e();break;case"m":ae();break;case"f":te();break;case"ArrowLeft":d.preventDefault(),X(-5);break;case"ArrowRight":d.preventDefault(),X(5);break;case"j":X(-10);break;case"l":X(10);break}}),e.addEventListener("mousemove",Te),e.addEventListener("mouseleave",()=>{window.smoothPlayer&&window.smoothPlayer.hideControlsSmooth&&R?window.smoothPlayer.hideControlsSmooth(e):R&&e.classList.remove("show-controls")}),t.addEventListener("timeupdate",()=>{var f;const d=t.textTracks;for(let L=0;L<d.length;L++)if(d[L].mode==="showing"){const A=(f=d[L].activeCues)==null?void 0:f[0];B.textContent=A?A.text:"",h.classList.toggle("visible",!!A);break}}),(De=i.querySelector(".retry-btn"))==null||De.addEventListener("click",()=>{Ue(),D(),re(e.dataset.videoUrl)}),e.dataset.videoUrl=s.videoUrl||"",s.videoUrl&&(D(),re(s.videoUrl)),ht={element:e,video:t,loadVideo:d=>{e.dataset.videoUrl=d,Ue(),D(),re(d)},setEpisodeCallbacks:(d,f)=>{const L=e.querySelector(".prev-episode"),A=e.querySelector(".next-episode");L.disabled=!d,A.disabled=!f,L.onclick=d||(()=>{}),A.onclick=f||(()=>{})}},ht}function ft(e){const s=[],t=/(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;let n;for(;(n=t.exec(e))!==null;)s.push({startTime:Je(n[2]),endTime:Je(n[3]),text:n[4].trim()});return s}function mt(e){const s=[],t=/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;let n;for(e=e.replace(/^WEBVTT.*?\n\n/s,"");(n=t.exec(e))!==null;)s.push({startTime:Je(n[1]),endTime:Je(n[2]),text:n[3].trim()});return s}function Je(e){const s=e.split(/[:,.]/);if(s.length>=4){const t=parseInt(s[0]),n=parseInt(s[1]),i=parseInt(s[2]),a=parseInt(s[3]);return t*3600+n*60+i+a/1e3}return 0}function gt(e){const s=Math.floor(e/3600),t=Math.floor(e%3600/60),n=Math.floor(e%60),i=Math.floor(e%1*1e3);return`${s.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${i.toString().padStart(3,"0")}`}function os(e){const s=e.toLowerCase();return s.includes("english")||s.includes("eng")?"en":s.includes("spanish")||s.includes("espanol")?"es":s.includes("french")||s.includes("francais")?"fr":s.includes("german")||s.includes("deutsch")?"de":s.includes("italian")||s.includes("italiano")?"it":s.includes("portuguese")||s.includes("portugues")?"pt":s.includes("russian")||s.includes("russkiy")?"ru":s.includes("japanese")?"ja":s.includes("korean")?"ko":s.includes("chinese")||s.includes("zhongwen")?"zh":"en"}function as(e,s,t="en",n){if(!n)return null;const i=document.createElement("track");i.label=s,i.kind="subtitles",i.srclang=t,i.mode="hidden";let a=`WEBVTT

`;e.forEach(r=>{a+=`${gt(r.startTime)} --> ${gt(r.endTime)}
${r.text}

`});const o=new Blob([a],{type:"text/vtt"}),l=URL.createObjectURL(o);i.src=l,n.appendChild(i),pe.push({track:i,url:l,label:s,language:t,cues:e});for(let r=0;r<n.textTracks.length;r++)n.textTracks[r].mode="hidden";return n.textTracks.length>0&&(n.textTracks[n.textTracks.length-1].mode="showing"),i}function bt(e,s){return new Promise((t,n)=>{const i=new FileReader;i.onload=a=>{const o=a.target.result;let l=[];if(e.name.endsWith(".srt")?l=ft(o):e.name.endsWith(".vtt")||o.includes("WEBVTT")?l=mt(o):l=ft(o),l.length>0){const r=os(e.name),p=as(l,e.name,r,s);t({cues:l,label:e.name,language:r,track:p})}else n(new Error("Failed to parse subtitle"))},i.onerror=()=>{n(new Error("Error reading file"))},i.readAsText(e)})}function rs(e){if(pe[e]){const s=pe[e];return s.track&&s.track.parentNode&&s.track.parentNode.removeChild(s.track),s.url&&URL.revokeObjectURL(s.url),pe.splice(e,1),!0}return!1}typeof window<"u"&&(window.removeSubtitle=rs);let yt=null,x=[],Z=0,T={start:null,end:null,active:!1};const b={play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',volumeHigh:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',volumeMute:'<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',fullscreen:'<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',theater:'<svg viewBox="0 0 24 24"><path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"/><path d="M6 10h12v2H6z"/></svg>',pip:'<svg viewBox="0 0 24 24"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"/></svg>',settings:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23-.41-.12-.61l1.92-3.32c.12-.22.37-.29.59-.22l2.39.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',playlist:'<svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',skipBack:'<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>',skipForward:'<svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>',check:'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',loop:'<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>',shuffle:'<svg viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>',frameBack:'<svg viewBox="0 0 24 24"><path d="M4 11h5v2H4zm0-4h5v2H4zm0 8h5v2H4zm6-8h10v2H10zm0 4h10v2H10zm0 4h10v2H10z"/></svg>',abLoop:'<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>',stats:'<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',help:'<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>',close:'<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'};function cs(e){const s=e.split(`
`).map(i=>i.trim()).filter(i=>i),t=[];let n=null;for(let i=0;i<s.length;i++){const a=s[i];if(!a.startsWith("#EXTM3U"))if(a.startsWith("#EXTINF:")){const o=a.substring(8),l=o.match(/(-?\d+)/),r=l?parseInt(l[1]):-1,p=o.match(/,(.+)$/),u=p?p[1].trim():"",g={},y=o.matchAll(/([-\w]+)="([^"]*)"/g);for(const C of y)g[C[1]]=C[2];n={duration:r,title:u,attributes:g,url:null}}else a.startsWith("#EXT-X-")?(n||(n={}),n.hlsTags||(n.hlsTags=[]),n.hlsTags.push(a)):a&&!a.startsWith("#")&&(n||(n={duration:-1,title:"",attributes:{}}),n.url=a,t.push(n),n=null)}return t}function zt(e={}){const s=document.createElement("div");return s.className="m3u-video-player",s.id="m3uVideoPlayer",s.innerHTML=`
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
          <button class="close-stats">${b.close}</button>
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
          <button class="close-shortcuts">${b.close}</button>
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
            <button class="control-btn play-btn-main" title="Play/Pause">${b.play}</button>
            <div class="skip-buttons">
              <button class="skip-btn" data-seconds="-10" title="Rewind 10s">${b.skipBack}<span>10</span></button>
              <button class="skip-btn" data-seconds="10" title="Forward 10s"><span>10</span>${b.skipForward}</button>
            </div>
            <div class="frame-controls">
              <button class="control-btn frame-btn" data-frames="-1" title="Previous Frame">${b.frameBack}</button>
              <button class="control-btn frame-btn" data-frames="1" title="Next Frame">${b.frameBack}</button>
            </div>
            <div class="volume-container">
              <button class="control-btn volume-btn" title="Mute/Unmute">${b.volumeHigh}</button>
              <input type="range" class="volume-slider" min="0" max="1" step="0.05" value="1">
            </div>
            <div class="time-display">
              <span class="current-time">0:00</span> / <span class="duration">0:00</span>
            </div>
          </div>
          
          <div class="controls-center">
            <button class="control-btn playlist-toggle" title="Playlist">${b.playlist}</button>
            <button class="control-btn loop-btn" title="Repeat">${b.loop}</button>
            <button class="control-btn shuffle-btn" title="Shuffle">${b.shuffle}</button>
            <button class="control-btn ab-loop-btn" title="A-B Loop">${b.abLoop}</button>
          </div>
          
          <div class="controls-right">
            <button class="control-btn stats-btn" title="Statistics">${b.stats}</button>
            <button class="control-btn help-btn" title="Keyboard Shortcuts">${b.help}</button>
            <button class="control-btn pip-btn" title="Picture-in-Picture">${b.pip}</button>
            <button class="control-btn theater-btn" title="Theater Mode">${b.theater}</button>
            <div class="settings-wrapper">
              <button class="control-btn settings-btn" title="Settings">${b.settings}</button>
              <div class="settings-menu">
                <div class="settings-menu-item" data-setting="playbackSpeed"><span>Playback Speed</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="quality"><span>Quality</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="audioTrack"><span>Audio Track</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="subtitleTrack"><span>Subtitles</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="subtitleSync"><span>Subtitle Sync</span><span class="submenu-indicator">▶</span></div>
                <div class="settings-menu-item" data-setting="subtitleStyle"><span>Subtitle Style</span><span class="submenu-indicator">▶</span></div>
              </div>
              <div class="submenu playback-speed-menu">
                ${[.25,.5,.75,1,1.25,1.5,1.75,2].map(t=>`<div class="submenu-item ${t===1?"active":""}" data-speed="${t}"><span class="check-icon">${b.check}</span><span>${t}x</span></div>`).join("")}
              </div>
              <div class="submenu quality-menu">
                <div class="submenu-item active" data-quality="auto"><span class="check-icon">${b.check}</span><span>Auto</span></div>
              </div>
              <div class="submenu audio-track-menu">
                <div class="submenu-item active" data-track="default"><span class="check-icon">${b.check}</span><span>Default</span></div>
              </div>
              <div class="submenu subtitle-track-menu">
                <div class="submenu-item active" data-track="off"><span class="check-icon">${b.check}</span><span>Off</span></div>
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
            <button class="control-btn fullscreen-btn" title="Fullscreen">${b.fullscreen}</button>
          </div>
        </div>
      </div>
      
      <!-- Playlist Sidebar -->
      <div class="playlist-sidebar hidden">
        <div class="playlist-header">
          <h3>Playlist</h3>
          <button class="playlist-close">${b.close}</button>
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
  `,s}function It(e,s={}){const t=e.querySelector("#m3uVideo"),n=e.querySelector(".player-loading"),i=e.querySelector(".player-error"),a=e.querySelector(".player-controls"),o=e.querySelector(".progress-container"),l=e.querySelector(".progress-bar"),r=e.querySelector(".buffered-bar"),p=e.querySelector(".play-btn-main"),u=e.querySelector(".volume-btn"),g=e.querySelector(".volume-slider"),y=e.querySelector(".time-display"),C=y.querySelector(".current-time"),V=y.querySelector(".duration"),F=e.querySelector(".subtitle-container").querySelector(".subtitle-text"),S=e.querySelector(".playlist-sidebar"),H=e.querySelector(".playlist-items"),h=e.querySelector(".stats-overlay"),B=e.querySelector(".shortcuts-overlay"),we=e.querySelector(".ab-loop-indicator");let oe=!1,R=!1,J=!1,ee=!1,z=!1,K=null,w=null,Fe=0,he=[],D=-1;s.playlist&&(x=s.playlist,I());function _(c){if(isNaN(c))return"0:00";const v=Math.floor(c/3600),m=Math.floor(c%3600/60),$=Math.floor(c%60);return v>0?`${v}:${m.toString().padStart(2,"0")}:${$.toString().padStart(2,"0")}`:`${m}:${$.toString().padStart(2,"0")}`}function fe(){if(t.duration){const c=t.currentTime/t.duration*100;l.style.width=`${c}%`,C.textContent=_(t.currentTime),T.active&&T.end!==null&&t.currentTime>=T.end&&(t.currentTime=T.start)}}function Ue(){if(t.buffered.length>0&&t.duration){const v=t.buffered.end(t.buffered.length-1)/t.duration*100;r.style.width=`${v}%`}}function $e(){var c;if(!h.classList.contains("hidden")&&w){const v=w.stats||{};e.querySelector(".stat-bitrate").textContent=v.bitrate?`${(v.bitrate/1e3).toFixed(0)} kbps`:"-",e.querySelector(".stat-buffer").textContent=`${t.buffered.length>0?(t.buffered.end(t.buffered.length-1)-t.currentTime).toFixed(1):0}s`,e.querySelector(".stat-dropped").textContent=v.droppedFrames||"0",e.querySelector(".stat-resolution").textContent=t.videoWidth?`${t.videoWidth}x${t.videoHeight}`:"-",e.querySelector(".stat-level").textContent=D===-1?"Auto":`${((c=he[D])==null?void 0:c.height)||"?"}p`}}function ae(){n.classList.remove("hidden")}function te(){n.classList.add("hidden")}function X(){i.classList.remove("hidden"),a.classList.add("hidden")}function Te(){i.classList.add("hidden"),a.classList.remove("hidden")}function re(){t.paused?(t.play().catch(()=>{}),oe=!0,p.innerHTML=b.pause,e.classList.add("playing")):(t.pause(),oe=!1,p.innerHTML=b.play,e.classList.remove("playing"))}function Me(){R?(t.muted=!1,R=!1,u.innerHTML=b.volumeHigh,g.value=t.volume||1):(t.muted=!0,R=!0,u.innerHTML=b.volumeMute,g.value=0)}function ce(){var c,v,m,$;document.fullscreenElement?((m=document.exitFullscreen)!=null&&m.call(document)||(($=document.webkitExitFullscreen)==null||$.call(document)),e.classList.remove("is-fullscreen")):((c=e.requestFullscreen)!=null&&c.call(e)||((v=e.webkitRequestFullscreen)==null||v.call(e)),e.classList.add("is-fullscreen"))}function le(){J=!J,e.classList.toggle("theater-mode",J);const c=e.querySelector(".theater-btn");c&&(c.style.opacity=J?"1":"0.7")}async function me(){try{document.pictureInPictureElement?await document.exitPictureInPicture():await t.requestPictureInPicture()}catch(c){console.error("PiP error:",c)}}function de(c){t.currentTime=Math.max(0,Math.min(t.currentTime+c,t.duration||0))}function Ve(c){t.paused||t.pause();const v=1/30;t.currentTime=Math.max(0,Math.min(t.currentTime+c*v,t.duration||0))}function ue(c){c==="a"?(T.start=t.currentTime,T.end=null,T.active=!1,M(),G(`A-B Loop: Point A set at ${_(T.start)}`,"info")):c==="b"&&T.start!==null&&(T.end=t.currentTime,T.end>T.start?(T.active=!0,M(),we.classList.remove("hidden"),G(`A-B Loop: Active ${_(T.start)} - ${_(T.end)}`,"success")):G("Point B must be after Point A","error"))}function Re(){T={start:null,end:null,active:!1},M(),we.classList.add("hidden")}function M(){const c=e.querySelector(".ab-loop-markers");if(c.innerHTML="",T.start!==null&&t.duration){const v=T.start/t.duration*100,m=document.createElement("div");m.className="ab-marker ab-marker-a",m.style.left=`${v}%`,m.textContent="A",c.appendChild(m)}if(T.end!==null&&t.duration){const v=T.end/t.duration*100,m=document.createElement("div");m.className="ab-marker ab-marker-b",m.style.left=`${v}%`,m.textContent="B",c.appendChild(m)}}function I(){if(H){if(x.length===0){H.innerHTML='<p class="playlist-empty">No items in playlist</p>';return}H.innerHTML=x.map((c,v)=>`
      <div class="playlist-item ${v===Z?"active":""}" data-index="${v}">
        <span class="playlist-number">${v+1}</span>
        <div class="playlist-info">
          <div class="playlist-title">${c.title||`Item ${v+1}`}</div>
          <div class="playlist-duration">${c.duration>0?_(c.duration):""}</div>
        </div>
      </div>
    `).join(""),H.querySelectorAll(".playlist-item").forEach(c=>{c.addEventListener("click",()=>{const v=parseInt(c.dataset.index);ge(v)})})}}function ge(c){if(c<0||c>=x.length)return;Z=c;const v=x[c];v&&v.url&&(Y(v.url),I())}function Y(c){if(ae(),Te(),w&&(w.destroy(),w=null),t.canPlayType("application/vnd.apple.mpegurl")){t.src=c,t.load();return}if(window.Hls)xe(c);else{const v=document.createElement("script");v.src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js",v.onload=()=>xe(c),v.onerror=()=>{te(),X()},document.head.appendChild(v)}}function xe(c){if(!window.Hls){te(),X();return}w=new window.Hls({enableWorker:!0,lowLatencyMode:!0,autoStartLoad:!0}),w.loadSource(c),w.attachMedia(t),w.on(window.Hls.Events.MANIFEST_PARSED,(v,m)=>{te(),he=m.levels||[],qe(),t.play().catch(()=>{})}),w.on(window.Hls.Events.ERROR,(v,m)=>{m.fatal&&(console.error("HLS error:",m),X())}),w.on(window.Hls.Events.LEVEL_SWITCHED,(v,m)=>{D=m.level})}function qe(){const c=e.querySelector(".quality-menu");if(!c||he.length===0)return;let v=`<div class="submenu-item ${D===-1?"active":""}" data-quality="auto">
      <span class="check-icon">${b.check}</span><span>Auto</span>
    </div>`;he.forEach((m,$)=>{const U=m.height||"?";v+=`<div class="submenu-item" data-quality="${$}">
        <span class="check-icon">${b.check}</span><span>${U}p</span>
      </div>`}),c.innerHTML=v,c.querySelectorAll(".submenu-item").forEach(m=>{m.addEventListener("click",()=>{const $=m.dataset.quality;if($==="auto")w==null||w.currentLevel(-1),D=-1;else{const U=parseInt($);w==null||w.currentLevel(U),D=U}qe()})})}function Ne(){e.classList.add("show-controls"),clearTimeout(K),oe&&(K=setTimeout(()=>{e.classList.remove("show-controls")},3e3))}function Ee(c){const v=new FileReader;v.onload=m=>{const $=m.target.result,U=cs($);U.length>0?(x=U,Z=0,I(),U[0].url&&Y(U[0].url),G(`Loaded ${U.length} items`,"success")):G("No valid items found in M3U file","error")},v.readAsText(c)}function De(){if(x.length===0){G("Playlist is empty","warning");return}let c=`#EXTM3U
`;x.forEach(U=>{const Dt=U.duration||-1,jt=U.title||"";c+=`#EXTINF:${Dt},${jt}
${U.url}
`});const v=new Blob([c],{type:"application/vnd.apple.mpegurl"}),m=URL.createObjectURL(v),$=document.createElement("a");$.href=m,$.download="playlist.m3u",$.click(),URL.revokeObjectURL(m),G("Playlist saved","success")}function d(){if(x.length===0)return;let c;if(ee)c=Math.floor(Math.random()*x.length);else if(c=Z+1,c>=x.length)if(z)c=0;else return;ge(c)}function f(){if(x.length===0)return;let c=Z-1;if(c<0)if(z)c=x.length-1;else return;ge(c)}t.addEventListener("loadedmetadata",()=>{V.textContent=_(t.duration),te()}),t.addEventListener("play",()=>{oe=!0,p.innerHTML=b.pause,e.classList.add("playing")}),t.addEventListener("pause",()=>{oe=!1,p.innerHTML=b.play,e.classList.remove("playing")}),t.addEventListener("timeupdate",()=>{fe(),Ue(),$e()}),t.addEventListener("waiting",ae),t.addEventListener("canplay",te),t.addEventListener("error",X),t.addEventListener("ended",()=>{z&&x.length===1?(t.currentTime=0,t.play()):d()}),p.addEventListener("click",re),t.addEventListener("click",re),u.addEventListener("click",Me),g.addEventListener("input",c=>{t.volume=c.target.value,t.volume>0&&t.muted&&(t.muted=!1,R=!1,u.innerHTML=b.volumeHigh)}),e.querySelectorAll(".skip-btn").forEach(c=>{c.addEventListener("click",()=>{const v=parseInt(c.dataset.seconds);de(v)})}),e.querySelectorAll(".frame-btn").forEach(c=>{c.addEventListener("click",()=>{const v=parseInt(c.dataset.frames);Ve(v)})}),o.addEventListener("click",c=>{const v=o.getBoundingClientRect(),m=(c.clientX-v.left)/v.width;t.currentTime=m*t.duration}),e.querySelector(".fullscreen-btn").addEventListener("click",ce),e.querySelector(".theater-btn").addEventListener("click",le),e.querySelector(".pip-btn").addEventListener("click",me),e.querySelector(".stats-btn").addEventListener("click",()=>{h.classList.toggle("hidden")}),e.querySelector(".close-stats").addEventListener("click",()=>{h.classList.add("hidden")}),e.querySelector(".help-btn").addEventListener("click",()=>{B.classList.remove("hidden")}),e.querySelector(".close-shortcuts").addEventListener("click",()=>{B.classList.add("hidden")}),e.querySelector(".playlist-toggle").addEventListener("click",()=>{S.classList.toggle("hidden")}),e.querySelector(".playlist-close").addEventListener("click",()=>{S.classList.add("hidden")});const L=e.querySelector(".m3u-file-input");e.querySelector(".load-m3u").addEventListener("click",()=>{L.click()}),L.addEventListener("change",c=>{c.target.files.length>0&&Ee(c.target.files[0]),L.value=""}),e.querySelector(".save-m3u").addEventListener("click",De),e.querySelector(".clear-playlist").addEventListener("click",()=>{x=[],Z=0,I(),G("Playlist cleared","info")}),e.querySelector(".loop-btn").addEventListener("click",()=>{z=!z,e.querySelector(".loop-btn").classList.toggle("active",z),G(z?"Repeat enabled":"Repeat disabled","info")}),e.querySelector(".shuffle-btn").addEventListener("click",()=>{ee=!ee,e.querySelector(".shuffle-btn").classList.toggle("active",ee),G(ee?"Shuffle enabled":"Shuffle disabled","info")}),e.querySelector(".ab-loop-btn").addEventListener("click",()=>{T.start===null?ue("a"):T.end===null?ue("b"):Re()}),e.querySelector(".ab-loop-clear").addEventListener("click",Re);const A=e.querySelector(".settings-btn"),se=e.querySelector(".settings-menu");A.addEventListener("click",c=>{c.stopPropagation(),se.classList.toggle("visible")}),e.addEventListener("click",c=>{c.target.closest(".settings-wrapper")||se.classList.remove("visible")});const He=e.querySelector(".playback-speed-menu");e.querySelector('[data-setting="playbackSpeed"]').addEventListener("click",()=>{He.classList.toggle("visible")}),He.addEventListener("click",c=>{const v=c.target.closest(".submenu-item");if(v){const m=parseFloat(v.dataset.speed);t.playbackRate=m,He.querySelectorAll(".submenu-item").forEach($=>$.classList.remove("active")),v.classList.add("active")}});const st=e.querySelector(".subtitle-sync-menu");e.querySelector('[data-setting="subtitleSync"]').addEventListener("click",()=>{st.classList.toggle("visible")}),st.querySelectorAll(".sync-btn").forEach(c=>{c.addEventListener("click",()=>{const v=parseInt(c.dataset.offset);Fe+=v,st.querySelector(".sync-value").textContent=`${Fe}ms`})});const be=e.querySelector(".subtitle-style-menu");e.querySelector('[data-setting="subtitleStyle"]').addEventListener("click",()=>{be.classList.toggle("visible")});const Et=()=>{const c=be.querySelector(".style-size").value,v=be.querySelector(".style-color").value,m=be.querySelector(".style-bg").value,$=be.querySelector(".style-opacity").value;F.style.fontSize=c==="small"?"14px":c==="medium"?"18px":c==="large"?"24px":"32px",F.style.color=v,F.style.backgroundColor=m,F.style.opacity=$};return be.querySelectorAll("input, select").forEach(c=>{c.addEventListener("change",Et)}),e.addEventListener("mousemove",Ne),e.addEventListener("mouseleave",()=>{oe&&e.classList.remove("show-controls")}),document.addEventListener("keydown",c=>{if(e.isConnected&&c.target.tagName!=="INPUT")switch(c.key){case" ":case"k":c.preventDefault(),re();break;case"m":Me();break;case"f":ce();break;case"t":le();break;case"p":c.preventDefault(),me();break;case"ArrowLeft":c.preventDefault(),de(-5);break;case"ArrowRight":c.preventDefault(),de(5);break;case"ArrowUp":c.preventDefault(),t.volume=Math.min(1,t.volume+.1),g.value=t.volume;break;case"ArrowDown":c.preventDefault(),t.volume=Math.max(0,t.volume-.1),g.value=t.volume;break;case"j":de(-10);break;case"l":de(10);break;case"[":Ve(-1);break;case"]":Ve(1);break;case"a":ue("a");break;case"b":T.start!==null&&ue("b");break;case"s":h.classList.toggle("hidden");break;case"?":B.classList.remove("hidden");break;case"Escape":B.classList.add("hidden"),h.classList.add("hidden");break}}),e.querySelector(".retry-btn").addEventListener("click",()=>{Te(),ae();const c=x[Z];c&&c.url&&Y(c.url)}),s.videoUrl?Y(s.videoUrl):x.length>0&&x[0].url&&Y(x[0].url),yt={element:e,video:t,loadVideo:Y,loadPlaylist:c=>{x=c,Z=0,I(),c.length>0&&c[0].url&&Y(c[0].url)},addToPlaylist:c=>{x.push(c),I()},clearPlaylist:()=>{x=[],Z=0,I()},playNext:d,playPrevious:f,setEpisodeCallbacks:(c,v)=>{var m,$;c&&((m=e.querySelector(".prev-episode"))==null||m.addEventListener("click",c)),v&&(($=e.querySelector(".next-episode"))==null||$.addEventListener("click",v))},destroy:()=>{w&&(w.destroy(),w=null),t.pause(),t.src="",e.remove()}},yt}function G(e,s="info"){const t=document.querySelector(".m3u-toast");t&&t.remove();const n=document.createElement("div");n.className=`m3u-toast ${s}`,n.textContent=e,n.style.cssText=`
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
    background: ${s==="success"?"#4caf50":s==="error"?"#f44336":s==="warning"?"#ff9800":"#2196f3"};
  `,document.body.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>n.remove(),300)},3e3)}const St="https://renewed-georgeanne-nekonode-1aa70c0c.koyeb.app";document.getElementById("app");const Ce=document.getElementById("searchInput"),ls=document.getElementById("searchBtn"),Le=document.getElementById("providerSelect"),Be=document.getElementById("results"),ze=document.getElementById("details"),Ke=document.getElementById("episodes"),k=document.getElementById("servers");let Ze=null,ie=[],Lt={},Q=null;function ke(){return localStorage.getItem("playerType")||"custom"}function Ft(e){localStorage.setItem("playerType",e),us()}function ds(e){Ft(e?"custom":"default")}window.handlePlayerToggle=function(){const e=document.getElementById("playerToggle");if(e){e.checked=!e.checked;const s=e.checked;ds(s),console.log("Toggle changed to:",s?"Custom":"Default"),setTimeout(()=>{Ut()},50)}};window.cyclePlayerType=function(){const e=ke();let s;switch(e){case"custom":s="m3u";break;case"m3u":s="default";break;default:s="custom"}Ft(s),Ie(`Switched to ${s==="custom"?"Custom":s==="m3u"?"M3U":"Default"} Player`,"success"),setTimeout(()=>{Ut()},50)};function us(){const e=ke(),s=document.getElementById("playerToggle"),t=document.getElementById("playerTypeLabel");s&&(s.checked=e==="custom"||e==="m3u"),t&&(t.textContent=e==="custom"?"🎬 Custom":e==="m3u"?"📋 M3U":"🌐 Default")}function Ut(){var s,t;if(window.hianimeScrapServerData){const n=document.querySelector(".server-tab.active");if(n){const i=n.textContent.toLowerCase(),a=i.includes("sub")?"sub":i.includes("dub")?"dub":"raw",o=(t=(s=window.hianimeScrapServerData[a])==null?void 0:s[0])==null?void 0:t.id;if(o){playHianimeScrapStream(o,a,n.textContent);return}}}const e=document.querySelector(".server-option .play-btn");if(e){const n=e.getAttribute("onclick");if(n){const i=n.match(/playStream\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/);if(i){const a=i[1],o=i[2];playStream(a,o);return}}}}let P=null,ve=0,Qe=null;async function ps(){const e=Le.value,s=O(e,"home");console.log("Fetching home page data from:",s);try{const t=await W(s);return vs(t)}catch(t){throw console.error("Error fetching home page data:",t),t}}function vs(e){return e?(e.data&&(e=e.data),{status:e.status||!0,spotlight:hs(e.spotlight||[]),trending:j(e.trending||[]),topAiring:j(e.topAiring||[]),mostPopular:j(e.mostPopular||[]),mostFavorite:j(e.mostFavorite||[]),latestCompleted:j(e.latestCompleted||[]),latestEpisode:j(e.latestEpisode||[]),newAdded:j(e.newAdded||[]),topUpcoming:j(e.topUpcoming||[]),topTen:fs(e.topTen||{today:[],week:[],month:[]}),genres:e.genres||[]}):null}function hs(e){return e.map(s=>{var t,n,i;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/400x600",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((i=s.episodes)==null?void 0:i.eps)||0},rank:s.rank||0,type:s.type||"TV",quality:s.quality||"HD",duration:s.duration||"Unknown",aired:s.aired||"Unknown",synopsis:s.synopsis||"No synopsis available."}})}function j(e){return e.map(s=>{var t,n,i;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/200x300",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((i=s.episodes)==null?void 0:i.eps)||0},type:s.type||"TV"}})}function fs(e){return{today:j(e.today||[]).slice(0,10),week:j(e.week||[]).slice(0,10),month:j(e.month||[]).slice(0,10)}}function ut(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("results"),n=document.getElementById("details"),i=document.getElementById("episodes"),a=document.getElementById("servers"),o=document.getElementById("homeBtn"),l=document.getElementById("searchNavBtn");o.classList.add("active"),l.classList.remove("active"),e.classList.add("visible"),e.classList.remove("hidden"),s.classList.remove("visible"),t.innerHTML="",n.innerHTML="",i.innerHTML="",a.innerHTML="",P||Vt()}function tt(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("homeBtn"),n=document.getElementById("searchNavBtn");t.classList.remove("active"),n.classList.add("active"),e.classList.remove("visible"),e.classList.add("hidden"),s.classList.add("visible"),ws()}async function Vt(){const e=document.getElementById("homeContent");e.innerHTML=ms();try{if(P=await ps(),!P||!P.status)throw new Error("Failed to load home page data");e.innerHTML=bs(P),ks(),Ie("Home page loaded successfully","success")}catch(s){console.error("Error loading home page:",s),e.innerHTML=gs(s.message)}}function ms(){return`
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
  `}function gs(e){return`
    <div class="home-error">
      <div class="error-icon">😕</div>
      <h2>Oops! Something went wrong</h2>
      <p>${e||"Unable to load home page data. Please try again."}</p>
      <button class="retry-btn" onclick="loadHomePage()">🔄 Retry</button>
    </div>
  `}function bs(e){var t,n,i;let s="";return e.spotlight&&e.spotlight.length>0&&(s+=ys(e.spotlight)),e.genres&&e.genres.length>0&&(s+=Ss(e.genres)),e.topTen&&(((t=e.topTen.today)==null?void 0:t.length)>0||((n=e.topTen.week)==null?void 0:n.length)>0||((i=e.topTen.month)==null?void 0:i.length)>0)&&(s+=Ls(e.topTen)),e.trending&&e.trending.length>0&&(s+=ne("📈 Trending Now","trending",e.trending)),e.topAiring&&e.topAiring.length>0&&(s+=ne("▶️ Top Airing","topAiring",e.topAiring)),e.mostPopular&&e.mostPopular.length>0&&(s+=ne("⭐ Most Popular","mostPopular",e.mostPopular)),e.mostFavorite&&e.mostFavorite.length>0&&(s+=ne("❤️ Most Favorite","mostFavorite",e.mostFavorite)),e.latestCompleted&&e.latestCompleted.length>0&&(s+=ne("✅ Latest Completed","latestCompleted",e.latestCompleted)),e.latestEpisode&&e.latestEpisode.length>0&&(s+=ne("🎬 Latest Episodes","latestEpisode",e.latestEpisode)),e.newAdded&&e.newAdded.length>0&&(s+=ne("🆕 Newly Added","newAdded",e.newAdded)),e.topUpcoming&&e.topUpcoming.length>0&&(s+=ne("🚀 Top Upcoming","topUpcoming",e.topUpcoming)),s}function ys(e){const s=e.map((n,i)=>{var a,o,l;return`
    <div class="spotlight-slide ${i===0?"active":""}" data-index="${i}">
      <img src="${n.poster}" alt="${n.title}" loading="lazy">
      <div class="spotlight-overlay">
        <div class="spotlight-rank">#${n.rank||i+1}</div>
        <h2 class="spotlight-title">${n.title}</h2>
        <div class="spotlight-meta">
          <span>${n.type||"TV"}</span>
          ${n.quality?`<span class="quality">${n.quality}</span>`:""}
          <span>${n.duration||"Unknown duration"}</span>
          ${((a=n.episodes)==null?void 0:a.sub)>0?`<span>📺 ${n.episodes.sub} eps</span>`:""}
        </div>
        <p class="spotlight-synopsis">${(o=n.synopsis)==null?void 0:o.substring(0,200)}${((l=n.synopsis)==null?void 0:l.length)>200?"...":""}</p>
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
  `}).join(""),t=e.map((n,i)=>`
    <button class="spotlight-dot ${i===0?"active":""}" data-index="${i}"></button>
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
  `}function Ss(e){return`
    <div class="home-section">
      <div class="section-header">
        <h2>🏷️ Browse by Genre</h2>
      </div>
      <div class="genres-container">${e.map(t=>`
    <button class="genre-tag-btn" onclick="searchByGenre('${t.replace(/'/g,"\\'")}')">${t}</button>
  `).join("")}</div>
    </div>
  `}function Ls(e){const s=(t,n)=>!t||t.length===0?'<p style="color: var(--text-light); text-align: center;">No data available</p>':t.slice(0,5).map((i,a)=>{var o;return`
      <div class="top10-item" onclick="selectAnime('${i.id}', '${i.title.replace(/'/g,"\\'")}')">
        <div class="top10-rank">${a+1}</div>
        <img src="${i.poster}" alt="${i.title}" loading="lazy">
        <div class="top10-item-info">
          <div class="title">${i.title}</div>
          <div class="episodes">${((o=i.episodes)==null?void 0:o.sub)>0?`${i.episodes.sub} eps`:i.type||"TV"}</div>
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
  `}function ne(e,s,t){const n=t.slice(0,12).map(i=>{var a;return`
    <div class="home-anime-card" onclick="selectAnime('${i.id}', '${i.title.replace(/'/g,"\\'")}')">
      <img src="${i.poster}" alt="${i.title}" loading="lazy">
      <div class="home-anime-card-content">
        <h3>${i.title}</h3>
        <p>${((a=i.episodes)==null?void 0:a.sub)>0?`${i.episodes.sub} eps`:i.type||"TV"}</p>
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
  `}function ks(){var e;(e=P==null?void 0:P.spotlight)!=null&&e.length&&(ve=0,Qe=setInterval(()=>{Rt()},5e3))}function ws(){Qe&&(clearInterval(Qe),Qe=null)}function Rt(){var e;(e=P==null?void 0:P.spotlight)!=null&&e.length&&(ve=(ve+1)%P.spotlight.length,Nt())}function $s(){var e;(e=P==null?void 0:P.spotlight)!=null&&e.length&&(ve=(ve-1+P.spotlight.length)%P.spotlight.length,Nt())}function Nt(){const e=document.querySelectorAll(".spotlight-slide"),s=document.querySelectorAll(".spotlight-dot");e.forEach((t,n)=>{t.classList.toggle("active",n===ve)}),s.forEach((t,n)=>{t.classList.toggle("active",n===ve)})}function Ts(e){console.log("View all category:",e),Ie(`Showing all ${e} - Filter by provider if needed`,"info"),tt(),Ce.focus()}function Ms(e){tt(),Ce.value=e,Ce.focus(),pt()}window.loadHomePage=Vt;window.showHomePage=ut;window.showSearchPage=tt;window.nextSpotlight=Rt;window.prevSpotlight=$s;window.viewAllCategory=Ts;window.searchByGenre=Ms;function Ie(e,s="info"){const t=document.querySelector(".toast-container");t&&t.remove();const n=document.createElement("div");n.className="toast-container";const i=document.createElement("div");i.className=`toast ${s}`;const a=s==="success"?"✓":s==="error"?"✕":"ℹ";i.innerHTML=`<span style="font-size:1.2em;">${a}</span> ${e}`,n.appendChild(i),document.body.appendChild(n),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateX(100px)",i.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},3e3)}function xs(){let s="";for(let t=0;t<12;t++)s+=`
      <div class="skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;Be.innerHTML=s}async function pt(){const e=Ce.value.trim();if(!e){Ie("Please enter a search query","warning");return}try{xs();const s=Le.value,t=O(s,"search",{query:e});console.log("Search URL:",t);const n=await W(t);let i=[];if(n&&n.data&&n.data.response&&Array.isArray(n.data.response)?i=n.data.response:Array.isArray(n)?i=n:n&&n.results&&Array.isArray(n.results)?i=n.results:n&&n.anime&&Array.isArray(n.anime)?i=n.anime:n&&n.data&&Array.isArray(n.data)&&(i=n.data),i.length===0){Be.innerHTML='<p style="text-align:center;padding:40px;color:var(--text-light);">No results found. Try a different search term.</p>';return}qs(i),Ie(`Found ${i.length} results`,"success")}catch(s){console.error("Search error:",s),Be.innerHTML=`<p class="error" style="text-align:center;padding:40px;color:var(--accent);">Search failed: ${s.message}. Check your connection and try again.</p>`}}function qs(e){Lt={},Be.innerHTML=e.map(s=>{const t=s.title||s.name||s.englishName||"Unknown Title",n=s.id||s.animeId||s.mal_id||"",i=s.image||s.poster||s.coverImage||"https://via.placeholder.com/150x200",a=s.releaseDate||s.year||s.startDate||"N/A";let o="";if(s.episodes)if(typeof s.episodes=="object"){const u=s.episodes.sub||0,g=s.episodes.dub||0,y=s.episodes.eps||0;u>0||g>0?o=`<p>${u>0?`Sub: ${u}`:""}${u>0&&g>0?" | ":""}${g>0?`Dub: ${g}`:""}</p>`:y>0&&(o=`<p>Episodes: ${y}</p>`)}else o=`<p>Episodes: ${s.episodes}</p>`;const l=s.type?`<p>${s.type}</p>`:"",r=s.duration?`<p>${s.duration}</p>`:"";return Le.value==="hianime-scrap"?(Lt[n]=s,`
        <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}')">
          <img src="${i}" alt="${t}" loading="lazy">
          <h3>${t}</h3>
          ${o}
          ${l}
          ${r}
          <p>${a}</p>
        </div>
      `):`
      <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}', '${t.replace(/'/g,"\\'")}')">
        <img src="${i}" alt="${t}" loading="lazy">
        <h3>${t}</h3>
        ${o}
        ${l}
        ${r}
        <p>${a}</p>
      </div>
    `}).join("")}async function Hs(e,s){if(!e){alert("Invalid anime ID");return}const t=Le.value,n=t==="hianime-scrap";try{if(ze.innerHTML='<p class="loading-details" style="padding: 40px; text-align: center;"><span class="loading-spinner"></span> Loading anime details...</p>',n){console.log("Fetching full anime info from info API for hianime-scrap");const r=await ts(e);if(!r)throw new Error("Failed to fetch anime info");const p=await ss(e),u={...r,episodes:p.length>0?p:r.episodes,__provider:t};kt(u,r.title);return}const i=typeof s=="string"?s:null,a=O(t,"info",{id:e});console.log("Info URL:",a);const o=await W(a);let l=normalizeAnimeData(o,e,t);if(!l.episodes||l.episodes.length===0)try{const r=O(t,"episodes",{id:e});console.log("Episodes URL:",r);const p=await W(r);l.episodes=extractEpisodes(p,t)}catch(r){console.warn("Could not fetch episodes separately:",r),l.episodes=[]}l.__provider=t,kt(l,i||l.title)}catch(i){console.error("Details error:",i),ze.innerHTML=`<p class="error">Error loading anime details: ${i.message}</p>`}}async function ct(e,s){if(!e){alert("Invalid episode ID");return}const t=Le.value;try{if(k.innerHTML=`
      <h3>Servers for Episode ${s||"?"}</h3>
      <p class="loading-servers" style="padding: 20px; text-align: center; color: var(--accent);">
        <span class="loading-spinner"></span> Loading servers...
      </p>
    `,t==="hianime-scrap"){let a=e,o=s;const l=e.match(/::ep=(\d+)$/);l&&(o=l[1],console.log(`Episode ${o} selected (ID: ${e})`));const r=O(t,"servers",{id:e});console.log("Servers URL:",r);const p=await W(r);Ps(p,o||s||"1",e),k.scrollIntoView({behavior:"smooth"});return}if(t==="animepahe"){const a=O(t,"watch",{episodeId:e});console.log("Watch URL:",a);const o=await W(a);ot(o,s||"1"),k.scrollIntoView({behavior:"smooth"});return}if(t==="animekai"){const a=O(t,"watch",{episodeId:e});console.log("Watch URL:",a);const o=await W(a);ot(o,s||"1"),k.scrollIntoView({behavior:"smooth"});return}const n=O(t,"servers",{id:e});console.log("Servers URL:",n);const i=await W(n);ot(i,s||"1"),k.scrollIntoView({behavior:"smooth"})}catch(n){console.error("Servers error:",n),k.innerHTML=`<p class="error">Error loading servers: ${n.message}. Try a different episode.</p>`}}window.selectAnime=Hs;window.selectEpisode=ct;function kt(e,s){var g;console.log("Displaying anime details:",e),Ze=e.id||null;const t=e.title||s||"Unknown Title";window.currentAnimeTitle=s||t;const n=e.image||e.poster||e.coverImage||"https://via.placeholder.com/200x300",i=e.japaneseTitle||e.jname||"",a=e.type||e.format||"Unknown",o=e.status||"",l=e.genres||(e.genre?[e.genre]:[]),r=e.totalEpisodes||e.episodeCount||((g=e.episodes)==null?void 0:g.length)||"Unknown",p=e.description||e.synopsis||"No description available",u=e.url||e.animeUrl||"";ze.innerHTML=`
    <div class="anime-details">
      <div class="anime-header">
        <img src="${n}" alt="${t}" onerror="this.src='https://via.placeholder.com/200x300'">
        <div class="anime-info">
          <h2>${t}</h2>
          ${i?`<p><strong>Japanese:</strong> ${i}</p>`:""}
          <p><strong>Type:</strong> ${a}</p>
          ${o?`<p><strong>Status:</strong> ${o}</p>`:""}
          ${l.length>0?`<p><strong>Genres:</strong> ${l.join(", ")}</p>`:""}
          <p><strong>Episodes:</strong> ${r}</p>
          <p><strong>Description:</strong> ${p}</p>
          ${u?`<p><a href="${u}" target="_blank" rel="noopener noreferrer" class="watch-link">View on Provider →</a></p>`:""}
        </div>
      </div>
    </div>
  `,ze.scrollIntoView({behavior:"smooth"}),e.episodes&&e.episodes.length>0?(ie=e.episodes,As(e.episodes)):(Ke.innerHTML="<p>No episodes available</p>",ie=[]),k.innerHTML=""}function As(e){Ke.innerHTML="<h3>Episodes</h3>";const s=e.map((t,n)=>{const i=t.number||t.episode||t.ep||n+1,a=t.title||t.name||"",o=t.id||`${n+1}`,l=t.isFiller,r=l?'<span style="color:#ffcc00;font-size:0.7em;"> ★Filler</span>':"";return`
      <button 
        class="episode-btn ${l?"filler":""}" 
        onclick="selectEpisode('${String(o).replace(/'/g,"\\'")}', '${i}')"
        title="${a}${l?" (Filler)":""}"
      >
        ${i}${r}
        ${a?`<br><small style="font-size:0.7em">${a.substring(0,20)}${a.length>20?"...":""}</small>`:""}
      </button>
    `}).join("");Ke.innerHTML+=`<div class="episodes-grid">${s}</div>`}function Ps(e,s,t){const n=ke();if(k.innerHTML=`
    <div class="player-toggle-header">
      <h3>Servers for Episode ${s}</h3>
      <div class="player-toggle">
        <span id="playerTypeLabel" class="toggle-label">${n==="custom"?"🎬 Custom":n==="m3u"?"📋 M3U":"🌐 Default"}</span>
        <button class="player-cycle-btn" onclick="cyclePlayerType()" title="Click to cycle player types">🔄</button>
        <label class="toggle-switch" onclick="handlePlayerToggle()">
          <input type="checkbox" id="playerToggle" ${n==="custom"||n==="m3u"?"checked":""}>
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
  `,!e||!e.success||!e.data){k.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}const i=e.data,a=i.sub||[],o=i.dub||[],l=i.raw||[];if(a.length===0&&o.length===0&&l.length===0){k.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}window.hianimeScrapServerData={episodeId:t,sub:a,dub:o,raw:l};let r='<div class="servers-tabs">';r+=`<div class="server-tab ${a.length>0?"active":""}" onclick="showHianimeScrapServers('sub')">Sub (${a.length})</div>`,r+=`<div class="server-tab ${a.length===0&&o.length>0?"active":""}" onclick="showHianimeScrapServers('dub')">Dub (${o.length})</div>`,r+=`<div class="server-tab ${a.length===0&&o.length===0&&l.length>0?"active":""}" onclick="showHianimeScrapServers('raw')">Raw (${l.length})</div>`,r+="</div>",r+='<div id="hianimeScrapServersList" class="servers-list"></div>',k.innerHTML+=r,a.length>0?showHianimeScrapServers("sub"):o.length>0?showHianimeScrapServers("dub"):showHianimeScrapServers("raw")}window.showHianimeScrapServers=function(e){const s=document.getElementById("hianimeScrapServersList");if(!s||!window.hianimeScrapServerData)return;document.querySelectorAll(".server-tab").forEach(n=>{n.classList.remove("active"),n.textContent.toLowerCase().includes(e)&&n.classList.add("active")});const t=window.hianimeScrapServerData[e]||[];if(t.length===0){s.innerHTML=`<p>No ${e} servers available.</p>`;return}s.innerHTML=t.map(n=>{const i=n.name||`Server ${n.index||""}`,a=n.id,o=e;return`
      <div class="server-option">
        <strong>${i}</strong>
        <p>Type: ${o.charAt(0).toUpperCase()+o.slice(1)}</p>
        <p><button class="play-btn" onclick="playHianimeScrapStream('${a}', '${o}', '${i.replace(/'/g,"\\'")}')">▶ Play</button></p>
      </div>
    `}).join("")};window.playHianimeScrapStream=async function(e,s,t){if(!window.hianimeScrapServerData)return alert("No server data available");const n=window.hianimeScrapServerData.episodeId,i=O("hianime-scrap","stream",{id:n,type:s,server:t});console.log("Stream URL:",i);try{let a=k.querySelector(".stream-loading");a||(a=document.createElement("p"),a.className="stream-loading",a.innerHTML='<span class="loading-spinner"></span> Loading stream...',a.style.cssText="padding: 20px; text-align: center; color: var(--accent);",k.prepend(a));const o=await W(i);if(a&&a.parentNode&&a.parentNode.removeChild(a),o&&o.success&&o.data)Cs(o.data,t);else{let l=k.querySelector(".stream-error");l||(l=document.createElement("p"),l.className="stream-error error",l.textContent="Failed to load stream. Try a different server.",k.prepend(l))}}catch(a){console.error("Stream error:",a);const o=k.querySelector(".stream-loading");o&&o.parentNode&&o.parentNode.removeChild(o);let l=k.querySelector(".stream-error");l||(l=document.createElement("p"),l.className="stream-error error",l.textContent=`Error loading stream: ${a.message}`,k.prepend(l))}};function Cs(e,s){var V,E,F,S,H;const t=((V=e.link)==null?void 0:V.file)||((E=e.link)==null?void 0:E.directUrl)||"",n=e.tracks||[],i=e.intro||{start:0,end:0},a=e.outro||{start:0,end:0},o=ke();if(!t){if(!k.querySelector(".stream-error")){const B=document.createElement("p");B.className="stream-error error",B.textContent="No video URL available",k.prepend(B)}return}const l=document.getElementById("customVideoPlayer");l&&l.remove();const r=document.getElementById("defaultVideoPlayer");r&&r.remove();const p=document.getElementById("m3uVideoPlayer");p&&p.remove();let u=document.getElementById("videoPlayer");u||(u=document.createElement("div"),u.id="videoPlayer",u.className="video-player-section",u.style.marginBottom="20px"),k.prepend(u);let g="";if((i.start!==0||i.end!==0)&&(g+=`<p style="color:#ffcc00;">Skip intro: ${i.start}s - ${i.end}s</p>`),(a.start!==0||a.end!==0)&&(g+=`<p style="color:#ffcc00;">Skip outro: ${a.start}s - ${a.end}s</p>`),window.currentAnimeTitle=s||window.currentAnimeTitle,u.innerHTML=`
    <h3>Now Playing: ${s}</h3>
    ${g}
  `,o==="m3u"){const h=zt({});u.appendChild(h),Q=It(h,{videoUrl:t})}else if(o==="custom"){const h=Ct({videoUrl:t,title:s,tracks:n,intro:i,outro:a});u.appendChild(h),Q=Bt(h,{videoUrl:t})}else{const h=At({videoUrl:t,title:s});u.appendChild(h),Q=Pt(h,{videoUrl:t})}const y=((F=window.hianimeScrapServerData)==null?void 0:F.currentEpisodeIndex)??-1,C=((S=window.hianimeScrapServerData)==null?void 0:S.totalEpisodes)??0;Q&&((H=window.hianimeScrapServerData)!=null&&H.episodes)&&Q.setEpisodeCallbacks(y>0?()=>{const h=window.hianimeScrapServerData.episodes[y-1];h&&(h.id||`${window.hianimeScrapServerData.animeId}${h.number}`,window.hianimeScrapServerData.currentEpisodeIndex=y-1,playHianimeScrapStream(h.id,window.hianimeScrapServerData.currentServerType||"sub",h.name||`Episode ${h.number}`))}:null,y<C-1?()=>{const h=window.hianimeScrapServerData.episodes[y+1];h&&(h.id||`${window.hianimeScrapServerData.animeId}${h.number}`,window.hianimeScrapServerData.currentEpisodeIndex=y+1,playHianimeScrapStream(h.id,window.hianimeScrapServerData.currentServerType||"sub",h.name||`Episode ${h.number}`))}:null)}function ot(e,s){const t=ke();k.innerHTML=`
    <div class="player-toggle-header">
      <h3>Servers for Episode ${s}</h3>
      <div class="player-toggle">
        <span id="playerTypeLabel" class="toggle-label">${t==="custom"?"🎬 Custom":t==="m3u"?"📋 M3U":"🌐 Default"}</span>
        <button class="player-cycle-btn" onclick="cyclePlayerType()" title="Click to cycle player types">🔄</button>
        <label class="toggle-switch" onclick="handlePlayerToggle()">
          <input type="checkbox" id="playerToggle" ${t==="custom"||t==="m3u"?"checked":""}>
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
  `;let n=[];if(Array.isArray(e)?n=e:e&&e.servers&&Array.isArray(e.servers)?n=e.servers:e&&e.sources&&Array.isArray(e.sources)?n=e.sources:e&&e.data&&Array.isArray(e.data)?n=e.data:e&&e.streamingServers&&Array.isArray(e.streamingServers)&&(n=e.streamingServers),n.length===0){k.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}let i='<div class="servers-list">';n.forEach((a,o)=>{const l=a.name||a.serverName||a.quality||`Server ${o+1}`,r=a.url||a.file||a.src||a.streamUrl||"";if(i+=`
      <div class="server-option">
        <strong>${l}</strong>
    `,r){const p=`${St}/fetch?url=${encodeURIComponent(r)}`;i+=`
        <p><a href="${r}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
        <p><a href="${p}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
        <p><button class="play-btn" onclick="playStream('${p.replace(/'/g,"\\'")}', '${l.replace(/'/g,"\\'")}')">▶ Play</button></p>
      `,a.sources&&Array.isArray(a.sources)&&a.sources.forEach((u,g)=>{const y=u.url||u.file||u.src||"";if(y){const C=`${St}/fetch?url=${encodeURIComponent(y)}`,V=u.quality||`Source ${g+1}`;i+=`
              <hr style="margin: 10px 0; border-color: rgba(233,69,96,0.3);">
              <p><strong>${V}</strong></p>
              <p><a href="${y}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
              <p><a href="${C}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
              <p><button class="play-btn" onclick="playStream('${C}')">▶ Play</button></p>
            `}})}else i+="<p>No direct URL available</p>";(a.intro||a.outro)&&(i+='<p class="meta">',a.intro&&(i+=`Intro: ${a.intro.start}-${a.intro.end}s `),a.outro&&(i+=`Outro: ${a.outro.start}-${a.outro.end}s`),i+="</p>"),i+="</div>"}),i+="</div>",k.innerHTML+=i}window.playStream=async function(e,s){if(!e)return alert("No stream URL available");console.log("Playing stream:",e);const t=ke(),n=document.getElementById("customVideoPlayer");n&&n.remove();const i=document.getElementById("defaultVideoPlayer");i&&i.remove();const a=document.getElementById("m3uVideoPlayer");a&&a.remove();let o=document.getElementById("videoPlayer");if(o||(o=document.createElement("div"),o.id="videoPlayer",o.className="video-player-section",o.style.marginBottom="20px"),k.prepend(o),window.currentAnimeTitle=s||window.currentAnimeTitle,o.innerHTML=`<h3>Now Playing: ${s}</h3>`,t==="m3u"){const r=zt({});o.appendChild(r),Q=It(r,{videoUrl:e})}else if(t==="custom"){const r=Ct({videoUrl:e,title:s,tracks:[],intro:{},outro:{}});o.appendChild(r),Q=Bt(r,{videoUrl:e})}else{const r=At({videoUrl:e,title:s});o.appendChild(r),Q=Pt(r,{videoUrl:e})}const l=ie.findIndex(r=>{var g,y;const p=r.number||r.episode||r.ep||0,u=parseInt(((y=(g=document.querySelector(".episode-btn.active"))==null?void 0:g.textContent)==null?void 0:y.trim())||"0");return p===u});Q&&ie.length>0&&Q.setEpisodeCallbacks(l>0?()=>{const r=ie[l-1];if(r){const p=r.id||`${Ze}-episode-${r.number||l}`,u=r.number||r.episode||r.ep||l;ct(p,String(u))}}:null,l<ie.length-1?()=>{const r=ie[l+1];if(r){const p=r.id||`${Ze}-episode-${r.number||l+2}`,u=r.number||r.episode||r.ep||l+2;ct(p,String(u))}}:null)};ls.addEventListener("click",pt);Ce.addEventListener("keypress",e=>{e.key==="Enter"&&pt()});Le.addEventListener("change",()=>{Be.innerHTML="",ze.innerHTML="",Ke.innerHTML="",k.innerHTML="",Ze=null,ie=[],P=null});document.getElementById("homeBtn").addEventListener("click",ut);document.getElementById("searchNavBtn").addEventListener("click",tt);document.addEventListener("DOMContentLoaded",()=>{ut()});
