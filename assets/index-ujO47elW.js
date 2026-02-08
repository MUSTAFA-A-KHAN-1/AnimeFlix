(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();let j=null,G=null;function nt(e,s,t,n){He();const i=o=>{if(isNaN(o))return"0:00";const a=Math.floor(o/60),c=Math.floor(o%60);return`${a}:${c.toString().padStart(2,"0")}`},r=()=>{if(!e||!s)return;const o=e.duration;if(!o||!isFinite(o)){j=requestAnimationFrame(r);return}const a=e.currentTime,c=a/o*100;s.style.setProperty("--progress",`${c}%`),s.style.width=`${c}%`,t&&(t.textContent=i(a)),n&&(n.textContent=i(o)),j=requestAnimationFrame(r)};j=requestAnimationFrame(r)}function He(){j&&(cancelAnimationFrame(j),j=null)}function it(e,s){qe();const t=()=>{if(!(!e||!s)){if(e.buffered&&e.buffered.length>0){const n=e.buffered.end(e.buffered.length-1),i=e.duration;if(i&&isFinite(i)){const r=n/i*100;s.style.setProperty("--buffered",`${r}%`),s.style.width=`${r}%`}}G=requestAnimationFrame(t)}};G=requestAnimationFrame(t)}function qe(){G&&(cancelAnimationFrame(G),G=null)}let ie=null;function ot(e,s,t,n){if(!e)return;const i=e.currentTime,r=300,o=performance.now();t&&t.classList.add("seeking");function a(c){const l=c-o,u=Math.min(l/r,1),v=fe(u),y=i+(s-i)*v;e.currentTime=Math.max(0,Math.min(y,n||e.duration)),u<1?ie=requestAnimationFrame(a):(t&&t.classList.remove("seeking"),e.currentTime=s)}ie&&cancelAnimationFrame(ie),ie=requestAnimationFrame(a)}function fe(e){return 1-Math.pow(1-e,3)}let oe=null;function rt(e){if(!e)return;oe&&(clearTimeout(oe),oe=null),e.classList.add("show-controls"),e.classList.remove("hide-cursor");const s=e.classList.contains("playing")?4e3:5e3;oe=setTimeout(()=>{e.classList.contains("playing")&&(e.classList.remove("show-controls"),e.classList.add("hide-cursor"))},s)}function at(e){e&&(e.classList.remove("show-controls"),e.classList.add("hide-cursor"))}let re=null;function D(e,s,t,n,i=150){if(!e)return;const r=e.volume,o=performance.now();re&&cancelAnimationFrame(re);function a(c){const l=c-o,u=Math.min(l/i,1),v=fe(u),y=r+(s-r)*v;e.volume=Math.max(0,Math.min(y,1)),t&&(t.value=e.volume),e.volume>0&&e.muted&&(e.muted=!1,n&&Lt(n)),u<1&&(re=requestAnimationFrame(a))}re=requestAnimationFrame(a)}function Lt(e,s){if(!e)return;const t={volumeHigh:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'};e.innerHTML=t.volumeHigh}function kt(e,s){!e||!s||(e.classList.add("visible"),s.style.opacity="0",s.style.transform="translateY(10px)",s.offsetWidth,s.style.transition="opacity 0.15s ease-out, transform 0.15s ease-out",s.style.opacity="1",s.style.transform="translateY(0)")}function $t(e,s){!e||!s||(s.style.transition="opacity 0.1s ease-in, transform 0.1s ease-in",s.style.opacity="0",s.style.transform="translateY(5px)",setTimeout(()=>{e.classList.remove("visible")},100))}function le(e,s,t){e&&(e.paused?(e.play().catch(()=>{}),s.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',t.classList.add("playing"),s.style.transform="scale(1.1)",setTimeout(()=>{s.style.transform=""},150)):(e.pause(),s.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',t.classList.remove("playing"),s.style.transform="scale(0.95)",setTimeout(()=>{s.style.transform=""},100)))}function ct(e){var s,t,n,i,r,o;e&&(!document.fullscreenElement&&!document.webkitFullscreenElement&&!document.mozFullScreenElement?(e.style.transition="transform 0.3s ease-out",(s=e.requestFullscreen)!=null&&s.call(e)||(t=e.webkitRequestFullscreen)!=null&&t.call(e)||((n=e.mozRequestFullScreen)==null||n.call(e)),e.classList.add("is-fullscreen")):((i=document.exitFullscreen)!=null&&i.call(document)||(r=document.webkitExitFullscreen)!=null&&r.call(document)||((o=document.mozCancelFullScreen)==null||o.call(document)),e.classList.remove("is-fullscreen")))}let ae=null;function Tt(e,s,t=200){if(!e)return;const n=e.playbackRate,i=performance.now();ae&&cancelAnimationFrame(ae);function r(o){const a=o-i,c=Math.min(a/t,1),l=fe(c),u=n+(s-n)*l;e.playbackRate=u,c<1?ae=requestAnimationFrame(r):e.playbackRate=s}ae=requestAnimationFrame(r)}let ce=null;function Y(e,s,t=150){if(!e)return;const n=e.currentTime,i=Math.max(0,Math.min(n+s,e.duration||1/0)),r=performance.now();At(e.parentElement,s);function o(a){const c=a-r,l=Math.min(c/t,1),u=fe(l);e.currentTime=n+(i-n)*u,l<1?ce=requestAnimationFrame(o):e.currentTime=i}ce&&cancelAnimationFrame(ce),ce=requestAnimationFrame(o)}function At(e,s){if(!e)return;let t=e.querySelector(".skip-indicator");t||(t=document.createElement("div"),t.className="skip-indicator",t.innerHTML=`
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
    `,e.appendChild(t)),t.style.opacity="1",t.style.transform="translate(-50%, -50%) scale(1)",setTimeout(()=>{t.style.opacity="0",t.style.transform="translate(-50%, -50%) scale(0.5)",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},500)}function Ae(e){e&&(e.classList.remove("hidden"),e.style.opacity="0",e.style.transform="scale(0.95)",requestAnimationFrame(()=>{e.style.transition="opacity 0.3s ease-out, transform 0.3s ease-out",e.style.opacity="1",e.style.transform="scale(1)"}))}function de(e){e&&(e.style.transition="opacity 0.25s ease-in, transform 0.25s ease-in",e.style.opacity="0",e.style.transform="scale(0.95)",setTimeout(()=>{e.classList.add("hidden"),e.style.transform=""},250))}function Ge(e){e&&(e.classList.remove("hidden"),e.style.opacity="0",e.style.transform="scale(0.95)",requestAnimationFrame(()=>{e.style.transition="opacity 0.3s ease-out, transform 0.3s ease-out",e.style.opacity="1",e.style.transform="scale(1)"}))}function lt(e){e&&(e.classList.add("visible"),e.style.transform="translateY(10px) scale(0.98)",e.style.opacity="0",requestAnimationFrame(()=>{e.style.transition="transform 0.3s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.3s ease-out",e.style.transform="translateY(0) scale(1)",e.style.opacity="1"}))}function Me(e){e&&(e.style.transition="transform 0.2s ease-in, opacity 0.2s ease-in",e.style.transform="translateY(10px) scale(0.98)",e.style.opacity="0",setTimeout(()=>{e.classList.remove("visible"),e.style.transform="",e.style.opacity=""},200))}function Mt(e,s){let t;return function(...n){t||(e.apply(this,n),t=!0,setTimeout(()=>t=!1,s))}}function xt(e,s){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>e.apply(this,n),s)}}const ke=[];let $e=!1;function Ht(e){ke.push(e),$e||($e=!0,requestAnimationFrame(()=>{ke.forEach(s=>s()),ke.length=0,$e=!1}))}function qt(e,s={}){const t=e==null?void 0:e.querySelector("#customVideo"),n=e==null?void 0:e.querySelector(".player-loading"),i=e==null?void 0:e.querySelector(".player-error"),r=e==null?void 0:e.querySelector(".progress-bar"),o=e==null?void 0:e.querySelector(".buffered-bar"),a=e==null?void 0:e.querySelector(".play-btn-main"),c=e==null?void 0:e.querySelector(".volume-btn"),l=e==null?void 0:e.querySelector(".volume-slider"),u=e==null?void 0:e.querySelector(".time-display"),v=u==null?void 0:u.querySelector(".current-time"),y=u==null?void 0:u.querySelector(".duration"),$=e==null?void 0:e.querySelector(".progress-container"),H=e==null?void 0:e.querySelector(".subtitle-container");H==null||H.querySelector(".subtitle-text");const q=e==null?void 0:e.querySelector(".settings-menu"),C=e==null?void 0:e.querySelector(".settings-btn");return!t||!e?null:(t.addEventListener("loadedmetadata",()=>{if(y){const f=m=>{if(isNaN(m))return"0:00";const k=Math.floor(m/60),F=Math.floor(m%60);return`${k}:${F.toString().padStart(2,"0")}`};y.textContent=f(t.duration)}de(n)}),t.addEventListener("play",()=>{a.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',e.classList.add("playing"),nt(t,r,v,y),it(t,o)}),t.addEventListener("pause",()=>{a.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',e.classList.remove("playing"),He(),qe()}),t.addEventListener("waiting",()=>Ae(n)),t.addEventListener("canplay",()=>de(n)),t.addEventListener("error",()=>Ge(i)),e.addEventListener("mousemove",()=>rt(e)),e.addEventListener("mouseleave",()=>{e.classList.contains("playing")&&at(e)}),t.addEventListener("click",()=>le(t,a,e)),a.addEventListener("click",()=>le(t,a,e)),c.addEventListener("click",()=>{t.muted?(t.muted=!1,D(t,(l==null?void 0:l.value)||1,l,c)):(t.muted=!0,D(t,0,l,c))}),l==null||l.addEventListener("input",f=>{D(t,f.target.value,l,c,100)}),$==null||$.addEventListener("click",f=>{const m=$.getBoundingClientRect(),F=(f.clientX-m.left)/m.width*t.duration;ot(t,F,r,t.duration)}),C==null||C.addEventListener("click",f=>{f.stopPropagation(),q.classList.contains("visible")?Me(q):lt(q)}),e==null||e.addEventListener("click",f=>{f.target.closest(".settings-wrapper")||Me(q)}),document.addEventListener("keydown",f=>{if(e.isConnected&&f.target.tagName!=="INPUT")switch(f.key){case" ":case"k":f.preventDefault(),le(t,a,e);break;case"m":f.preventDefault(),t.muted?(t.muted=!1,D(t,(l==null?void 0:l.value)||1,l,c)):(t.muted=!0,D(t,0,l,c));break;case"f":f.preventDefault(),ct(e);break;case"ArrowLeft":f.preventDefault(),Y(t,-5);break;case"ArrowRight":f.preventDefault(),Y(t,5);break;case"j":Y(t,-10);break;case"l":Y(t,10);break}}),document.addEventListener("fullscreenchange",()=>{document.fullscreenElement||e.classList.remove("is-fullscreen")}),{element:e,video:t,loadVideo:f=>{if(Ae(n),hideErrorSmooth(i),t.canPlayType("application/vnd.apple.mpegurl"))t.src=f;else if(window.Hls){const m=new window.Hls({enableWorker:!0,lowLatencyMode:!0});m.loadSource(f),m.attachMedia(t),m.on(window.Hls.Events.MANIFEST_PARSED,()=>{de(n)}),m.on(window.Hls.Events.ERROR,(k,F)=>{F.fatal&&Ge(i)})}},setEpisodeCallbacks:s.setEpisodeCallbacks})}window.smoothPlayer={initSmoothPlayer:qt,startSmoothProgressUpdate:nt,stopSmoothProgressUpdate:He,startBufferedUpdate:it,stopBufferedUpdate:qe,smoothSeek:ot,setVolumeSmooth:D,showSubtitleSmooth:kt,hideSubtitleSmooth:$t,togglePlaySmooth:le,toggleFullscreenSmooth:ct,setPlaybackRateSmooth:Tt,skipVideoSmooth:Y,showLoadingSmooth:Ae,hideLoadingSmooth:de,showSettingsMenuSmooth:lt,hideSettingsMenuSmooth:Me,showControlsSmooth:rt,hideControlsSmooth:at,throttle:Mt,debounce:xt,queueBatchUpdate:Ht};const Ct="http://localhost:3000",T=Ct,Pt={"hianime-scrap":{base:"https://api.animo.qzz.io/api/v1",templates:{search:"https://hianimeapi-6uju.onrender.com/api/v1/search?keyword={query}&page=1",info:"https://hianimeapi-6uju.onrender.com/api/v1/anime/{id}",episodes:"https://hianimeapi-6uju.onrender.com/api/v1/episodes/{id}",servers:"https://hianimeapi-6uju.onrender.com/api/v1/servers/id={id}",stream:"https://api.animo.qzz.io/api/v1/stream?id={id}&type={type}&server={server}",home:"https://hianimeapi-6uju.onrender.com/api/v1/home"}},animekai:{base:T+"/anime/animekai",templates:{search:T+"/anime/animekai/{query}",info:T+"/anime/animekai/info?id={id}",episodes:T+"/anime/animekai/episodes/{id}",watch:T+"/anime/animekai/watch/{episodeId}",home:T+"/anime/animekai/new-releases"}},animepahe:{base:T+"/anime/animepahe",templates:{search:T+"/anime/animepahe/{query}",info:T+"/anime/animepahe/info/{id}",episodes:T+"/anime/animepahe/episodes/{id}",watch:T+"/anime/animepahe/watch?episodeId={episodeId}",home:T+"/anime/animekai/new-releases"}}};function M(e,s,t={}){const n=Pt[e];if(!n)return console.error(`Provider ${e} not found`),"";const i=n.templates[s];if(!i)return console.error(`Template ${s} not found for provider ${e}`),"";let r=i;return Object.keys(t).forEach(o=>{let a=t[o];o==="episodeId"?a=encodeURIComponent(a):a!=null?a=encodeURIComponent(String(a)):a="",r=r.replace(new RegExp(`\\{${o}\\}`,"g"),a)}),r}async function x(e,s={}){try{const t={Accept:"application/json",...s.headers||{}};s.body&&(t["Content-Type"]="application/json");const n=await fetch(e,{...s,headers:t});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return await n.json()}catch(t){throw console.error(`Fetch error for ${e}:`,t),t}}async function It(e,s="hianime-scrap"){var n,i,r;const t=M(s,"info",{id:e});console.log("Fetching anime info from:",t);try{const o=await x(t);return o&&o.data&&s==="hianime-scrap"?{...o.data,id:o.data.id||e,title:o.data.title,poster:o.data.poster,image:o.data.poster,synopsis:o.data.synopsis||o.data.description||"",alternativeTitle:o.data.alternativeTitle||"",rating:o.data.rating||"",type:o.data.type,is18Plus:o.data.is18Plus||!1,aired:o.data.aired||{},premiered:o.data.premiered||"",duration:o.data.duration||"",status:o.data.status,MAL_score:o.data.MAL_score||"",genres:o.data.genres||[],studios:o.data.studios||[],producers:o.data.producers||[],moreSeasons:o.data.moreSeasons||[],related:o.data.related||[],mostPopular:o.data.mostPopular||[],recommended:o.data.recommended||[],japanese:o.data.japanese||"",episodes:{sub:((n=o.data.episodes)==null?void 0:n.sub)||0,dub:((i=o.data.episodes)==null?void 0:i.dub)||0,eps:((r=o.data.episodes)==null?void 0:r.eps)||0}}:Ft(o,e,s)}catch(o){return console.error("Error fetching anime info:",o),null}}async function Bt(e,s="hianime-scrap"){const t=M(s,"episodes",{id:e});console.log("Fetching episodes from:",t);try{const n=await x(t);return Ut(n,s)}catch(n){return console.error("Error fetching episodes:",n),[]}}function Ft(e,s,t){var n,i,r;if(e&&e.data&&t==="hianime-scrap")return{...e.data,id:e.data.id||s,title:e.data.title,poster:e.data.poster,image:e.data.poster,type:e.data.type,status:e.data.status,genres:e.data.genres||[],description:e.data.description||e.data.synopsis||"",totalEpisodes:((n=e.data.episodes)==null?void 0:n.eps)||((i=e.data.episodes)==null?void 0:i.sub)||((r=e.data.episodes)==null?void 0:r.dub)||"Unknown"};if(Array.isArray(e)){const o=e.find(a=>a&&a.id===s)||e[0];return o?{...o,id:o.id||s}:{id:s,episodes:[]}}if(e&&e.results&&Array.isArray(e.results)){const o=e.results.find(a=>a&&a.id===s)||e.results[0];return o?{...o,id:o.id||s}:{...e,id:e.id||s}}return e&&e.data?{...e.data,id:e.data.id||s}:e&&(e.title||e.name||e.englishName)?{...e,id:e.id||s}:{id:s,...e||{}}}function Ut(e,s){return e?s==="hianime-scrap"&&e&&e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||`${n+1}`,number:t.episodeNumber||n+1,title:t.title||t.alternativeTitle||`Episode ${t.episodeNumber||n+1}`,isFiller:t.isFiller||!1})):Array.isArray(e)?e.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.episodes&&Array.isArray(e.episodes)?e.episodes.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):[]:[]}function dt(e){const{videoUrl:s="",title:t="Video"}=e,n=document.createElement("div");return n.className="default-video-player",n.id="defaultVideoPlayer",n.innerHTML=`
    <video id="defaultVideo" preload="metadata" controls playsinline>
      <source src="${s}" type="application/vnd.apple.mpegurl">
    </video>
    <div class="default-player-info">
      <p>Using default browser player</p>
      <p class="video-title">${t}</p>
    </div>
  `,n}function ut(e,s={}){const t=e.querySelector("#defaultVideo"),n=s.videoUrl||"";let i=null;function r(c,l){try{if(window.Hls)o(c,l);else{const u=document.createElement("script");u.src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js",u.onload=()=>o(c,l),u.onerror=()=>{console.error("Failed to load HLS.js")},document.head.appendChild(u)}}catch(u){console.warn("HLS playback failed:",u)}}function o(c,l){!window.Hls||!c||(i=new window.Hls({enableWorker:!0,lowLatencyMode:!0}),i.loadSource(l),i.attachMedia(c),i.on(window.Hls.Events.MANIFEST_PARSED,()=>{console.log("HLS manifest parsed for default player")}),i.on(window.Hls.Events.ERROR,(u,v)=>{console.error("HLS error in default player:",v)}))}function a(c){t&&(i&&(i.destroy(),i=null),t.canPlayType("application/vnd.apple.mpegurl")?t.src=c:r(t,c))}return n&&(t.canPlayType("application/vnd.apple.mpegurl")?t.src=n:r(t,n)),{element:e,video:t,loadVideo:a,destroy:()=>{i&&(i.destroy(),i=null)}}}let E=[],Xe=null;const b={play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',volumeHigh:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',volumeMute:'<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',fullscreen:'<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',settings:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23-.41-.12-.61l1.92-3.32c.12-.22.37-.29.59-.22l2.39.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',upload:'<svg viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>',cloud:'<svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',skipBack:'<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>',skipForward:'<svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>',previous:'<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',next:'<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-5.71L11.29 12H2v-2h9.29l-3-2.29zM22 6h-2V2h-2v4h-2V2h-2v4h-2V2h-2v4h-2V2H8v4H6V2H4v16h2v-4h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2V6z"/></svg>',check:'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'};function pt(e){const{videoUrl:s="",title:t="Video",tracks:n=[],intro:i={start:0,end:0},outro:r={start:0,end:0}}=e,o=document.createElement("div");o.className="custom-video-player",o.id="customVideoPlayer";let a="";return n.length>0&&(a=n.map(c=>c.kind==="captions"||c.kind==="subtitles"?`<track label="${c.label}" kind="${c.kind}" src="${c.file}" ${c.default?"default":""}>`:"").join("")),o.innerHTML=`
    <video id="customVideo" preload="metadata" crossorigin="anonymous">
      <source src="${s}" type="application/vnd.apple.mpegurl">
      ${a}
    </video>
    <div class="player-loading hidden"><div class="spinner"></div><p>Loading...</p></div>
    <div class="player-error hidden"><div class="error-icon">⚠️</div><p>Unable to load video. Please check your connection and try again.</p><button class="retry-btn">Retry</button></div>
    <div class="player-controls">
      <div class="progress-container"><div class="buffered-bar" style="width: 0%"></div><div class="progress-bar" style="width: 0%"></div></div>
      <div class="controls-row">
        <div class="controls-left">
          <button class="control-btn play-btn-main" title="Play/Pause">${b.play}</button>
          <div class="skip-buttons"><button class="skip-btn" data-seconds="-10" title="Rewind 10s">${b.skipBack}<span>10</span></button></div>
          <div class="skip-buttons"><button class="skip-btn" data-seconds="10" title="Forward 10s"><span>10</span>${b.skipForward}</button></div>
          <div class="volume-container">
            <button class="control-btn volume-btn" title="Mute/Unmute">${b.volumeHigh}</button>
            <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="1">
          </div>
          <div class="time-display"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
        </div>
        <div class="controls-right">
          <div class="episode-nav">
            <button class="episode-nav-btn prev-episode" title="Previous Episode" disabled>${b.previous}</button>
            <span class="current-episode">${t}</span>
            <button class="episode-nav-btn next-episode" title="Next Episode" disabled>${b.next}</button>
          </div>
          <div class="settings-wrapper" style="position: relative;">
            <button class="control-btn settings-btn" title="Settings">${b.settings}</button>
            <div class="settings-menu">
              <div class="settings-menu-item" data-setting="playbackSpeed"><span>Playback Speed</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitleTrack"><span>Subtitles</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitleSize"><span>Subtitle Size</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitlePosition"><span>Subtitle Position</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="uploadSubtitle"><span>Upload Subtitle</span><span>${b.upload}</span></div>
              <div class="settings-menu-item" data-setting="cloudSubtitles"><span>Search Cloud</span><span>${b.cloud}</span></div>
            </div>
            <div class="submenu playback-speed-menu">
              ${[.5,.75,1,1.25,1.5,2].map(c=>`<div class="submenu-item" data-speed="${c}"><span class="check-icon">${b.check}</span><span>${c}x</span></div>`).join("")}
            </div>
            <div class="submenu subtitle-track-menu">
              <div class="submenu-item active" data-track="off"><span class="check-icon">${b.check}</span><span>Off</span></div>
              <div class="submenu-item" data-track="uploaded"><span class="check-icon">${b.check}</span><span>Uploaded</span></div>
            </div>
            <div class="submenu subtitle-size-menu">
              ${["Small","Medium","Large","X-Large"].map(c=>`<div class="submenu-item" data-size="${c.toLowerCase()}"><span class="check-icon">${b.check}</span><span>${c}</span></div>`).join("")}
            </div>
            <div class="submenu subtitle-position-menu">
              <div class="submenu-item" data-position="top"><span class="check-icon">${b.check}</span><span>Top</span></div>
              <div class="submenu-item active" data-position="bottom"><span class="check-icon">${b.check}</span><span>Bottom</span></div>
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
          <button class="control-btn fullscreen-btn" title="Fullscreen">${b.fullscreen}</button>
        </div>
      </div>
    </div>
    <div class="subtitle-container subtitle-position-bottom"><div class="subtitle-text"></div></div>
    <div class="player-tooltip"></div>
    <input type="file" accept=".srt,.vtt" id="subtitleFileInput" style="display:none" multiple>
  `,o}function mt(e,s={}){var De,je,_e,Oe,We,Ye;const t=e.querySelector("#customVideo"),n=e.querySelector(".player-loading"),i=e.querySelector(".player-error"),r=e.querySelector(".player-controls"),o=e.querySelector(".progress-container"),a=e.querySelector(".progress-bar"),c=e.querySelector(".buffered-bar"),l=e.querySelector(".play-btn-main"),u=e.querySelector(".volume-btn"),v=e.querySelector(".volume-slider"),y=e.querySelectorAll(".skip-btn"),$=e.querySelector(".fullscreen-btn"),H=e.querySelector(".settings-btn"),q=e.querySelector(".settings-menu"),C=e.querySelector(".time-display"),f=C.querySelector(".current-time"),m=C.querySelector(".duration"),k=e.querySelector(".subtitle-container"),F=k.querySelector(".subtitle-text"),{showToast:Ie,safeFetch:us}=s;let U=!1,Z=!1,Be=null,z=null,R=0;function Fe(d){if(isNaN(d))return"0:00";const p=Math.floor(d/60),g=Math.floor(d%60);return`${p}:${g.toString().padStart(2,"0")}`}function gt(){t.duration&&(a.style.width=`${t.currentTime/t.duration*100}%`,f.textContent=Fe(t.currentTime))}function bt(){t.buffered.length>0&&(c.style.width=`${t.buffered.end(t.buffered.length-1)/t.duration*100}%`)}function ee(){n.classList.remove("hidden")}function be(){n.classList.add("hidden")}function te(){i.classList.remove("hidden"),r.classList.add("hidden")}function Ue(){i.classList.add("hidden"),r.classList.remove("hidden")}function ye(){t.paused?(t.play().catch(()=>{}),U=!0,l.innerHTML=b.pause,e.classList.add("playing")):(t.pause(),U=!1,l.innerHTML=b.play,e.classList.remove("playing"))}function we(){Z?(t.muted=!1,Z=!1,u.innerHTML=b.volumeHigh,v.value=t.volume):(t.muted=!0,Z=!0,u.innerHTML=b.volumeMute,v.value=0)}function ze(){var d,p,g,L;document.fullscreenElement?(g=document.exitFullscreen)!=null&&g.call(document)||((L=document.webkitExitFullscreen)==null||L.call(document)):(d=e.requestFullscreen)!=null&&d.call(e)||((p=e.webkitRequestFullscreen)==null||p.call(e))}function O(d){t.currentTime=Math.max(0,Math.min(t.currentTime+d,t.duration))}function Ve(){window.smoothPlayer&&window.smoothPlayer.showControlsSmooth?window.smoothPlayer.showControlsSmooth(e):(e.classList.add("show-controls"),clearTimeout(Be),U&&(Be=setTimeout(()=>{e.classList.remove("show-controls")},3e3)))}function Se(d){if(t.canPlayType("application/vnd.apple.mpegurl")){t.src=d;return}try{if(window.Hls)Ee(d);else{const p=document.createElement("script");p.src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js",p.onload=()=>Ee(d),p.onerror=te,document.head.appendChild(p)}}catch{te()}}function Ee(d){window.Hls&&(z&&z.destroy(),z=new window.Hls({enableWorker:!0,lowLatencyMode:!0}),z.loadSource(d),z.attachMedia(t),z.on(window.Hls.Events.MANIFEST_PARSED,()=>{be(),t.play().catch(()=>{})}),z.on(window.Hls.Events.ERROR,(p,g)=>{g.fatal&&te()}))}t.addEventListener("loadedmetadata",()=>{m.textContent=Fe(t.duration),be()}),t.addEventListener("play",()=>{U=!0,l.innerHTML=b.pause,Ve()}),t.addEventListener("pause",()=>{U=!1,l.innerHTML=b.play}),t.addEventListener("timeupdate",()=>{gt(),bt()}),t.addEventListener("waiting",ee),t.addEventListener("canplay",be),t.addEventListener("error",te),l.addEventListener("click",ye),t.addEventListener("click",ye),u.addEventListener("click",we),v.addEventListener("input",d=>{t.volume=d.target.value,v.value=t.volume,t.volume>0&&Z&&we()}),y.forEach(d=>d.addEventListener("click",()=>O(parseInt(d.dataset.seconds)))),o.addEventListener("click",d=>{const p=(d.clientX-o.getBoundingClientRect().left)/o.getBoundingClientRect().width;t.currentTime=p*t.duration}),$.addEventListener("click",ze),H.addEventListener("click",()=>{q.classList.toggle("visible")}),e.addEventListener("click",d=>{d.target.closest(".settings-wrapper")||q.classList.remove("visible")});const se=e.querySelector(".playback-speed-menu");(De=e.querySelector('[data-setting="playbackSpeed"]'))==null||De.addEventListener("click",()=>{se.classList.toggle("visible")}),se.querySelectorAll(".submenu-item").forEach(d=>{d.addEventListener("click",()=>{t.playbackRate=parseFloat(d.dataset.speed),se.classList.remove("visible"),se.querySelectorAll(".submenu-item").forEach(p=>p.classList.remove("active")),d.classList.add("active")})});const ne=e.querySelector(".subtitle-size-menu");(je=e.querySelector('[data-setting="subtitleSize"]'))==null||je.addEventListener("click",()=>{ne.classList.toggle("visible")}),ne.querySelectorAll(".submenu-item").forEach(d=>{d.addEventListener("click",()=>{k.className=`subtitle-container subtitle-size-${d.dataset.size}`,ne.classList.remove("visible"),ne.querySelectorAll(".submenu-item").forEach(p=>p.classList.remove("active")),d.classList.add("active")})});const Le=e.querySelector(".subtitle-position-menu");(_e=e.querySelector('[data-setting="subtitlePosition"]'))==null||_e.addEventListener("click",()=>{Le.classList.toggle("visible")}),Le.querySelectorAll(".submenu-item[data-position]").forEach(d=>{d.addEventListener("click",()=>{k.classList.remove("subtitle-position-top","subtitle-position-middle","subtitle-position-bottom"),k.classList.add(`subtitle-position-${d.dataset.position}`),Le.querySelectorAll(".submenu-item").forEach(p=>p.classList.remove("active")),d.classList.add("active"),Ie&&Ie(`Subtitle position: ${d.dataset.position}`,"info")})});const yt=e.querySelector(".offset-value");e.querySelectorAll(".offset-btn").forEach(d=>{d.addEventListener("click",()=>{const p=parseInt(d.dataset.offset);R=Math.max(-200,Math.min(200,R+p)),yt.textContent=R>0?`+${R}`:R,k.style.bottom=`calc(100px + ${R}px)`,k.style.top="auto",k.style.transform="translateX(-50%)"})});const Ne=e.querySelector(".subtitle-track-menu");(Oe=e.querySelector('[data-setting="subtitleTrack"]'))==null||Oe.addEventListener("click",()=>{Ne.classList.toggle("visible")});const wt=e.querySelector(".upload-subtitle-menu");(We=e.querySelector('[data-setting="uploadSubtitle"]'))==null||We.addEventListener("click",()=>{wt.classList.toggle("visible"),Ne.classList.remove("visible")});const w=e.querySelector(".upload-zone"),V=w==null?void 0:w.querySelector(".subtitle-input");w==null||w.addEventListener("click",()=>{V==null||V.click()}),V==null||V.addEventListener("change",async d=>{const p=d.target.files;if(p&&p.length>0)for(let g=0;g<p.length;g++){const L=p[g];if(L.name.endsWith(".srt")||L.name.endsWith(".vtt"))try{await Ze(L,t),Re()}catch(W){console.error("Subtitle upload error:",W)}}V.value=""}),w==null||w.addEventListener("dragover",d=>{d.preventDefault(),w.classList.add("dragover")}),w==null||w.addEventListener("dragleave",()=>{w.classList.remove("dragover")}),w==null||w.addEventListener("drop",async d=>{var g;d.preventDefault(),w.classList.remove("dragover");const p=(g=d.dataTransfer)==null?void 0:g.files;if(p&&p.length>0)for(let L=0;L<p.length;L++){const W=p[L];if(W.name.endsWith(".srt")||W.name.endsWith(".vtt"))try{await Ze(W,t),Re()}catch(St){console.error("Subtitle upload error:",St)}}});function Re(){const d=e.querySelector(".uploaded-subtitles-list");if(d){if(E.length===0){d.innerHTML='<p style="color: var(--text-light); font-size: 0.85em; padding: 10px;">No subtitles uploaded</p>';return}d.innerHTML=E.map((p,g)=>`
      <div class="loaded-subtitle-item ${g===E.length-1?"active":""}">
        <span class="name">${p.label.substring(0,25)}${p.label.length>25?"...":""}</span>
        <button class="remove-btn" onclick="removeSubtitle(${g})">✕</button>
      </div>
    `).join("")}}return document.addEventListener("keydown",d=>{if(e.isConnected&&d.target.tagName!=="INPUT")switch(d.key){case" ":case"k":d.preventDefault(),ye();break;case"m":we();break;case"f":ze();break;case"ArrowLeft":d.preventDefault(),O(-5);break;case"ArrowRight":d.preventDefault(),O(5);break;case"j":O(-10);break;case"l":O(10);break}}),e.addEventListener("mousemove",Ve),e.addEventListener("mouseleave",()=>{window.smoothPlayer&&window.smoothPlayer.hideControlsSmooth&&U?window.smoothPlayer.hideControlsSmooth(e):U&&e.classList.remove("show-controls")}),t.addEventListener("timeupdate",()=>{var p;const d=t.textTracks;for(let g=0;g<d.length;g++)if(d[g].mode==="showing"){const L=(p=d[g].activeCues)==null?void 0:p[0];F.textContent=L?L.text:"",k.classList.toggle("visible",!!L);break}}),(Ye=i.querySelector(".retry-btn"))==null||Ye.addEventListener("click",()=>{Ue(),ee(),Se(e.dataset.videoUrl)}),e.dataset.videoUrl=s.videoUrl||"",s.videoUrl&&(ee(),Se(s.videoUrl)),Xe={element:e,video:t,loadVideo:d=>{e.dataset.videoUrl=d,Ue(),ee(),Se(d)},setEpisodeCallbacks:(d,p)=>{const g=e.querySelector(".prev-episode"),L=e.querySelector(".next-episode");g.disabled=!d,L.disabled=!p,g.onclick=d||(()=>{}),L.onclick=p||(()=>{})}},Xe}function Qe(e){const s=[],t=/(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;let n;for(;(n=t.exec(e))!==null;)s.push({startTime:pe(n[2]),endTime:pe(n[3]),text:n[4].trim()});return s}function Je(e){const s=[],t=/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;let n;for(e=e.replace(/^WEBVTT.*?\n\n/s,"");(n=t.exec(e))!==null;)s.push({startTime:pe(n[1]),endTime:pe(n[2]),text:n[3].trim()});return s}function pe(e){const s=e.split(/[:,.]/);if(s.length>=4){const t=parseInt(s[0]),n=parseInt(s[1]),i=parseInt(s[2]),r=parseInt(s[3]);return t*3600+n*60+i+r/1e3}return 0}function Ke(e){const s=Math.floor(e/3600),t=Math.floor(e%3600/60),n=Math.floor(e%60),i=Math.floor(e%1*1e3);return`${s.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${i.toString().padStart(3,"0")}`}function zt(e){const s=e.toLowerCase();return s.includes("english")||s.includes("eng")?"en":s.includes("spanish")||s.includes("espanol")?"es":s.includes("french")||s.includes("francais")?"fr":s.includes("german")||s.includes("deutsch")?"de":s.includes("italian")||s.includes("italiano")?"it":s.includes("portuguese")||s.includes("portugues")?"pt":s.includes("russian")||s.includes("russkiy")?"ru":s.includes("japanese")?"ja":s.includes("korean")?"ko":s.includes("chinese")||s.includes("zhongwen")?"zh":"en"}function Vt(e,s,t="en",n){if(!n)return null;const i=document.createElement("track");i.label=s,i.kind="subtitles",i.srclang=t,i.mode="hidden";let r=`WEBVTT

`;e.forEach(c=>{r+=`${Ke(c.startTime)} --> ${Ke(c.endTime)}
${c.text}

`});const o=new Blob([r],{type:"text/vtt"}),a=URL.createObjectURL(o);i.src=a,n.appendChild(i),E.push({track:i,url:a,label:s,language:t,cues:e});for(let c=0;c<n.textTracks.length;c++)n.textTracks[c].mode="hidden";return n.textTracks.length>0&&(n.textTracks[n.textTracks.length-1].mode="showing"),i}function Ze(e,s){return new Promise((t,n)=>{const i=new FileReader;i.onload=r=>{const o=r.target.result;let a=[];if(e.name.endsWith(".srt")?a=Qe(o):e.name.endsWith(".vtt")||o.includes("WEBVTT")?a=Je(o):a=Qe(o),a.length>0){const c=zt(e.name),l=Vt(a,e.name,c,s);t({cues:a,label:e.name,language:c,track:l})}else n(new Error("Failed to parse subtitle"))},i.onerror=()=>{n(new Error("Error reading file"))},i.readAsText(e)})}function Et(e){if(E[e]){const s=E[e];return s.track&&s.track.parentNode&&s.track.parentNode.removeChild(s.track),s.url&&URL.revokeObjectURL(s.url),E.splice(e,1),!0}return!1}typeof window<"u"&&(window.removeSubtitle=Et);const et="https://renewed-georgeanne-nekonode-1aa70c0c.koyeb.app";document.getElementById("app");const X=document.getElementById("searchInput"),Nt=document.getElementById("searchBtn"),_=document.getElementById("providerSelect"),Q=document.getElementById("results"),J=document.getElementById("details"),me=document.getElementById("episodes"),h=document.getElementById("servers");let ve=null,I=[],tt={},B=null;function K(){const e=localStorage.getItem("useCustomPlayer");return e===null?!0:e==="true"}function Rt(e){localStorage.setItem("useCustomPlayer",String(e)),jt()}window.handlePlayerToggle=function(){const e=document.getElementById("playerToggle");if(e){e.checked=!e.checked;const s=e.checked;Rt(s),console.log("Toggle changed to:",s?"Custom":"Default"),setTimeout(()=>{Dt()},50)}};function Dt(){var s,t;if(window.hianimeScrapServerData){const n=document.querySelector(".server-tab.active");if(n){const i=n.textContent.toLowerCase(),r=i.includes("sub")?"sub":i.includes("dub")?"dub":"raw",o=(t=(s=window.hianimeScrapServerData[r])==null?void 0:s[0])==null?void 0:t.id;if(o){playHianimeScrapStream(o,r,n.textContent);return}}}const e=document.querySelector(".server-option .play-btn");if(e){const n=e.getAttribute("onclick");if(n){const i=n.match(/playStream\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/);if(i){const r=i[1],o=i[2];playStream(r,o);return}}}}function jt(){const e=document.getElementById("playerToggle");if(e){const s=K();e.checked=s;const t=e.parentElement.querySelector(".toggle-custom"),n=e.parentElement.querySelector(".toggle-default");t&&n&&(t.style.opacity=s?"1":"0.5",n.style.opacity=s?"0.5":"1")}}let S=null,N=0,ue=null;async function _t(){const e=_.value,s=M(e,"home");console.log("Fetching home page data from:",s);try{const t=await x(s);return Ot(t)}catch(t){throw console.error("Error fetching home page data:",t),t}}function Ot(e){return e?(e.data&&(e=e.data),{status:e.status||!0,spotlight:Wt(e.spotlight||[]),trending:A(e.trending||[]),topAiring:A(e.topAiring||[]),mostPopular:A(e.mostPopular||[]),mostFavorite:A(e.mostFavorite||[]),latestCompleted:A(e.latestCompleted||[]),latestEpisode:A(e.latestEpisode||[]),newAdded:A(e.newAdded||[]),topUpcoming:A(e.topUpcoming||[]),topTen:Yt(e.topTen||{today:[],week:[],month:[]}),genres:e.genres||[]}):null}function Wt(e){return e.map(s=>{var t,n,i;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/400x600",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((i=s.episodes)==null?void 0:i.eps)||0},rank:s.rank||0,type:s.type||"TV",quality:s.quality||"HD",duration:s.duration||"Unknown",aired:s.aired||"Unknown",synopsis:s.synopsis||"No synopsis available."}})}function A(e){return e.map(s=>{var t,n,i;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/200x300",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((i=s.episodes)==null?void 0:i.eps)||0},type:s.type||"TV"}})}function Yt(e){return{today:A(e.today||[]).slice(0,10),week:A(e.week||[]).slice(0,10),month:A(e.month||[]).slice(0,10)}}function Ce(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("results"),n=document.getElementById("details"),i=document.getElementById("episodes"),r=document.getElementById("servers"),o=document.getElementById("homeBtn"),a=document.getElementById("searchNavBtn");o.classList.add("active"),a.classList.remove("active"),e.classList.add("visible"),e.classList.remove("hidden"),s.classList.remove("visible"),t.innerHTML="",n.innerHTML="",i.innerHTML="",r.innerHTML="",S||vt()}function ge(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("homeBtn"),n=document.getElementById("searchNavBtn");t.classList.remove("active"),n.classList.add("active"),e.classList.remove("visible"),e.classList.add("hidden"),s.classList.add("visible"),ts()}async function vt(){const e=document.getElementById("homeContent");e.innerHTML=Gt();try{if(S=await _t(),!S||!S.status)throw new Error("Failed to load home page data");e.innerHTML=Qt(S),es(),he("Home page loaded successfully","success")}catch(s){console.error("Error loading home page:",s),e.innerHTML=Xt(s.message)}}function Gt(){return`
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
  `}function Xt(e){return`
    <div class="home-error">
      <div class="error-icon">😕</div>
      <h2>Oops! Something went wrong</h2>
      <p>${e||"Unable to load home page data. Please try again."}</p>
      <button class="retry-btn" onclick="loadHomePage()">🔄 Retry</button>
    </div>
  `}function Qt(e){var t,n,i;let s="";return e.spotlight&&e.spotlight.length>0&&(s+=Jt(e.spotlight)),e.genres&&e.genres.length>0&&(s+=Kt(e.genres)),e.topTen&&(((t=e.topTen.today)==null?void 0:t.length)>0||((n=e.topTen.week)==null?void 0:n.length)>0||((i=e.topTen.month)==null?void 0:i.length)>0)&&(s+=Zt(e.topTen)),e.trending&&e.trending.length>0&&(s+=P("📈 Trending Now","trending",e.trending)),e.topAiring&&e.topAiring.length>0&&(s+=P("▶️ Top Airing","topAiring",e.topAiring)),e.mostPopular&&e.mostPopular.length>0&&(s+=P("⭐ Most Popular","mostPopular",e.mostPopular)),e.mostFavorite&&e.mostFavorite.length>0&&(s+=P("❤️ Most Favorite","mostFavorite",e.mostFavorite)),e.latestCompleted&&e.latestCompleted.length>0&&(s+=P("✅ Latest Completed","latestCompleted",e.latestCompleted)),e.latestEpisode&&e.latestEpisode.length>0&&(s+=P("🎬 Latest Episodes","latestEpisode",e.latestEpisode)),e.newAdded&&e.newAdded.length>0&&(s+=P("🆕 Newly Added","newAdded",e.newAdded)),e.topUpcoming&&e.topUpcoming.length>0&&(s+=P("🚀 Top Upcoming","topUpcoming",e.topUpcoming)),s}function Jt(e){const s=e.map((n,i)=>{var r,o,a;return`
    <div class="spotlight-slide ${i===0?"active":""}" data-index="${i}">
      <img src="${n.poster}" alt="${n.title}" loading="lazy">
      <div class="spotlight-overlay">
        <div class="spotlight-rank">#${n.rank||i+1}</div>
        <h2 class="spotlight-title">${n.title}</h2>
        <div class="spotlight-meta">
          <span>${n.type||"TV"}</span>
          ${n.quality?`<span class="quality">${n.quality}</span>`:""}
          <span>${n.duration||"Unknown duration"}</span>
          ${((r=n.episodes)==null?void 0:r.sub)>0?`<span>📺 ${n.episodes.sub} eps</span>`:""}
        </div>
        <p class="spotlight-synopsis">${(o=n.synopsis)==null?void 0:o.substring(0,200)}${((a=n.synopsis)==null?void 0:a.length)>200?"...":""}</p>
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
  `}function Kt(e){return`
    <div class="home-section">
      <div class="section-header">
        <h2>🏷️ Browse by Genre</h2>
      </div>
      <div class="genres-container">${e.map(t=>`
    <button class="genre-tag-btn" onclick="searchByGenre('${t.replace(/'/g,"\\'")}')">${t}</button>
  `).join("")}</div>
    </div>
  `}function Zt(e){const s=(t,n)=>!t||t.length===0?'<p style="color: var(--text-light); text-align: center;">No data available</p>':t.slice(0,5).map((i,r)=>{var o;return`
      <div class="top10-item" onclick="selectAnime('${i.id}', '${i.title.replace(/'/g,"\\'")}')">
        <div class="top10-rank">${r+1}</div>
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
  `}function P(e,s,t){const n=t.slice(0,12).map(i=>{var r;return`
    <div class="home-anime-card" onclick="selectAnime('${i.id}', '${i.title.replace(/'/g,"\\'")}')">
      <img src="${i.poster}" alt="${i.title}" loading="lazy">
      <div class="home-anime-card-content">
        <h3>${i.title}</h3>
        <p>${((r=i.episodes)==null?void 0:r.sub)>0?`${i.episodes.sub} eps`:i.type||"TV"}</p>
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
  `}function es(){var e;(e=S==null?void 0:S.spotlight)!=null&&e.length&&(N=0,ue=setInterval(()=>{ht()},5e3))}function ts(){ue&&(clearInterval(ue),ue=null)}function ht(){var e;(e=S==null?void 0:S.spotlight)!=null&&e.length&&(N=(N+1)%S.spotlight.length,ft())}function ss(){var e;(e=S==null?void 0:S.spotlight)!=null&&e.length&&(N=(N-1+S.spotlight.length)%S.spotlight.length,ft())}function ft(){const e=document.querySelectorAll(".spotlight-slide"),s=document.querySelectorAll(".spotlight-dot");e.forEach((t,n)=>{t.classList.toggle("active",n===N)}),s.forEach((t,n)=>{t.classList.toggle("active",n===N)})}function ns(e){console.log("View all category:",e),he(`Showing all ${e} - Filter by provider if needed`,"info"),ge(),X.focus()}function is(e){ge(),X.value=e,X.focus(),Pe()}window.loadHomePage=vt;window.showHomePage=Ce;window.showSearchPage=ge;window.nextSpotlight=ht;window.prevSpotlight=ss;window.viewAllCategory=ns;window.searchByGenre=is;function he(e,s="info"){const t=document.querySelector(".toast-container");t&&t.remove();const n=document.createElement("div");n.className="toast-container";const i=document.createElement("div");i.className=`toast ${s}`;const r=s==="success"?"✓":s==="error"?"✕":"ℹ";i.innerHTML=`<span style="font-size:1.2em;">${r}</span> ${e}`,n.appendChild(i),document.body.appendChild(n),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateX(100px)",i.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},3e3)}function os(){let s="";for(let t=0;t<12;t++)s+=`
      <div class="skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;Q.innerHTML=s}async function Pe(){const e=X.value.trim();if(!e){he("Please enter a search query","warning");return}try{os();const s=_.value,t=M(s,"search",{query:e});console.log("Search URL:",t);const n=await x(t);let i=[];if(n&&n.data&&n.data.response&&Array.isArray(n.data.response)?i=n.data.response:Array.isArray(n)?i=n:n&&n.results&&Array.isArray(n.results)?i=n.results:n&&n.anime&&Array.isArray(n.anime)?i=n.anime:n&&n.data&&Array.isArray(n.data)&&(i=n.data),i.length===0){Q.innerHTML='<p style="text-align:center;padding:40px;color:var(--text-light);">No results found. Try a different search term.</p>';return}rs(i),he(`Found ${i.length} results`,"success")}catch(s){console.error("Search error:",s),Q.innerHTML=`<p class="error" style="text-align:center;padding:40px;color:var(--accent);">Search failed: ${s.message}. Check your connection and try again.</p>`}}function rs(e){tt={},Q.innerHTML=e.map(s=>{const t=s.title||s.name||s.englishName||"Unknown Title",n=s.id||s.animeId||s.mal_id||"",i=s.image||s.poster||s.coverImage||"https://via.placeholder.com/150x200",r=s.releaseDate||s.year||s.startDate||"N/A";let o="";if(s.episodes)if(typeof s.episodes=="object"){const u=s.episodes.sub||0,v=s.episodes.dub||0,y=s.episodes.eps||0;u>0||v>0?o=`<p>${u>0?`Sub: ${u}`:""}${u>0&&v>0?" | ":""}${v>0?`Dub: ${v}`:""}</p>`:y>0&&(o=`<p>Episodes: ${y}</p>`)}else o=`<p>Episodes: ${s.episodes}</p>`;const a=s.type?`<p>${s.type}</p>`:"",c=s.duration?`<p>${s.duration}</p>`:"";return _.value==="hianime-scrap"?(tt[n]=s,`
        <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}')">
          <img src="${i}" alt="${t}" loading="lazy">
          <h3>${t}</h3>
          ${o}
          ${a}
          ${c}
          <p>${r}</p>
        </div>
      `):`
      <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}', '${t.replace(/'/g,"\\'")}')">
        <img src="${i}" alt="${t}" loading="lazy">
        <h3>${t}</h3>
        ${o}
        ${a}
        ${c}
        <p>${r}</p>
      </div>
    `}).join("")}async function as(e,s){if(!e){alert("Invalid anime ID");return}const t=_.value,n=t==="hianime-scrap";try{if(J.innerHTML='<p class="loading-details" style="padding: 40px; text-align: center;"><span class="loading-spinner"></span> Loading anime details...</p>',n){console.log("Fetching full anime info from info API for hianime-scrap");const c=await It(e);if(!c)throw new Error("Failed to fetch anime info");const l=await Bt(e),u={...c,episodes:l.length>0?l:c.episodes,__provider:t};st(u,c.title);return}const i=typeof s=="string"?s:null,r=M(t,"info",{id:e});console.log("Info URL:",r);const o=await x(r);let a=normalizeAnimeData(o,e,t);if(!a.episodes||a.episodes.length===0)try{const c=M(t,"episodes",{id:e});console.log("Episodes URL:",c);const l=await x(c);a.episodes=extractEpisodes(l,t)}catch(c){console.warn("Could not fetch episodes separately:",c),a.episodes=[]}a.__provider=t,st(a,i||a.title)}catch(i){console.error("Details error:",i),J.innerHTML=`<p class="error">Error loading anime details: ${i.message}</p>`}}async function xe(e,s){if(!e){alert("Invalid episode ID");return}const t=_.value;try{if(h.innerHTML=`
      <h3>Servers for Episode ${s||"?"}</h3>
      <p class="loading-servers" style="padding: 20px; text-align: center; color: var(--accent);">
        <span class="loading-spinner"></span> Loading servers...
      </p>
    `,t==="hianime-scrap"){let r=e,o=s;const a=e.match(/::ep=(\d+)$/);a&&(o=a[1],console.log(`Episode ${o} selected (ID: ${e})`));const c=M(t,"servers",{id:e});console.log("Servers URL:",c);const l=await x(c);ls(l,o||s||"1",e),h.scrollIntoView({behavior:"smooth"});return}if(t==="animepahe"){const r=M(t,"watch",{episodeId:e});console.log("Watch URL:",r);const o=await x(r);Te(o,s||"1"),h.scrollIntoView({behavior:"smooth"});return}if(t==="animekai"){const r=M(t,"watch",{episodeId:e});console.log("Watch URL:",r);const o=await x(r);Te(o,s||"1"),h.scrollIntoView({behavior:"smooth"});return}const n=M(t,"servers",{id:e});console.log("Servers URL:",n);const i=await x(n);Te(i,s||"1"),h.scrollIntoView({behavior:"smooth"})}catch(n){console.error("Servers error:",n),h.innerHTML=`<p class="error">Error loading servers: ${n.message}. Try a different episode.</p>`}}window.selectAnime=as;window.selectEpisode=xe;function st(e,s){var v;console.log("Displaying anime details:",e),ve=e.id||null;const t=e.title||s||"Unknown Title";window.currentAnimeTitle=s||t;const n=e.image||e.poster||e.coverImage||"https://via.placeholder.com/200x300",i=e.japaneseTitle||e.jname||"",r=e.type||e.format||"Unknown",o=e.status||"",a=e.genres||(e.genre?[e.genre]:[]),c=e.totalEpisodes||e.episodeCount||((v=e.episodes)==null?void 0:v.length)||"Unknown",l=e.description||e.synopsis||"No description available",u=e.url||e.animeUrl||"";J.innerHTML=`
    <div class="anime-details">
      <div class="anime-header">
        <img src="${n}" alt="${t}" onerror="this.src='https://via.placeholder.com/200x300'">
        <div class="anime-info">
          <h2>${t}</h2>
          ${i?`<p><strong>Japanese:</strong> ${i}</p>`:""}
          <p><strong>Type:</strong> ${r}</p>
          ${o?`<p><strong>Status:</strong> ${o}</p>`:""}
          ${a.length>0?`<p><strong>Genres:</strong> ${a.join(", ")}</p>`:""}
          <p><strong>Episodes

:</strong> ${c}</p>
          <p><strong>Description:</strong> ${l}</p>
          ${u?`<p><a href="${u}" target="_blank" rel="noopener noreferrer" class="watch-link">View on Provider →</a></p>`:""}
        </div>
      </div>
    </div>
  `,J.scrollIntoView({behavior:"smooth"}),e.episodes&&e.episodes.length>0?(I=e.episodes,cs(e.episodes)):(me.innerHTML="<p>No episodes available</p>",I=[]),h.innerHTML=""}function cs(e){me.innerHTML="<h3>Episodes</h3>";const s=e.map((t,n)=>{const i=t.number||t.episode||t.ep||n+1,r=t.title||t.name||"",o=t.id||`${n+1}`,a=t.isFiller,c=a?'<span style="color:#ffcc00;font-size:0.7em;"> ★Filler</span>':"";return`
      <button 
        class="episode-btn ${a?"filler":""}" 
        onclick="selectEpisode('${String(o).replace(/'/g,"\\'")}', '${i}')"
        title="${r}${a?" (Filler)":""}"
      >
        ${i}${c}
        ${r?`<br><small style="font-size:0.7em">${r.substring(0,20)}${r.length>20?"...":""}</small>`:""}
      </button>
    `}).join("");me.innerHTML+=`<div class="episodes-grid">${s}</div>`}function ls(e,s,t){const n=K();if(h.innerHTML=`
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
  `,!e||!e.success||!e.data){h.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}const i=e.data,r=i.sub||[],o=i.dub||[],a=i.raw||[];if(r.length===0&&o.length===0&&a.length===0){h.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}window.hianimeScrapServerData={episodeId:t,sub:r,dub:o,raw:a};let c='<div class="servers-tabs">';c+=`<div class="server-tab ${r.length>0?"active":""}" onclick="showHianimeScrapServers('sub')">Sub (${r.length})</div>`,c+=`<div class="server-tab ${r.length===0&&o.length>0?"active":""}" onclick="showHianimeScrapServers('dub')">Dub (${o.length})</div>`,c+=`<div class="server-tab ${r.length===0&&o.length===0&&a.length>0?"active":""}" onclick="showHianimeScrapServers('raw')">Raw (${a.length})</div>`,c+="</div>",c+='<div id="hianimeScrapServersList" class="servers-list"></div>',h.innerHTML+=c,r.length>0?showHianimeScrapServers("sub"):o.length>0?showHianimeScrapServers("dub"):showHianimeScrapServers("raw")}window.showHianimeScrapServers=function(e){const s=document.getElementById("hianimeScrapServersList");if(!s||!window.hianimeScrapServerData)return;document.querySelectorAll(".server-tab").forEach(n=>{n.classList.remove("active"),n.textContent.toLowerCase().includes(e)&&n.classList.add("active")});const t=window.hianimeScrapServerData[e]||[];if(t.length===0){s.innerHTML=`<p>No ${e} servers available.</p>`;return}s.innerHTML=t.map(n=>{const i=n.name||`Server ${n.index||""}`,r=n.id,o=e;return`
      <div class="server-option">
        <strong>${i}</strong>
        <p>Type: ${o.charAt(0).toUpperCase()+o.slice(1)}</p>
        <p><button class="play-btn" onclick="playHianimeScrapStream('${r}', '${o}', '${i.replace(/'/g,"\\'")}')">▶ Play</button></p>
      </div>
    `}).join("")};window.playHianimeScrapStream=async function(e,s,t){if(!window.hianimeScrapServerData)return alert("No server data available");const n=window.hianimeScrapServerData.episodeId,i=M("hianime-scrap","stream",{id:n,type:s,server:t});console.log("Stream URL:",i);try{let r=h.querySelector(".stream-loading");r||(r=document.createElement("p"),r.className="stream-loading",r.innerHTML='<span class="loading-spinner"></span> Loading stream...',r.style.cssText="padding: 20px; text-align: center; color: var(--accent);",h.prepend(r));const o=await x(i);if(r&&r.parentNode&&r.parentNode.removeChild(r),o&&o.success&&o.data)ds(o.data,t);else{let a=h.querySelector(".stream-error");a||(a=document.createElement("p"),a.className="stream-error error",a.textContent="Failed to load stream. Try a different server.",h.prepend(a))}}catch(r){console.error("Stream error:",r);const o=h.querySelector(".stream-loading");o&&o.parentNode&&o.parentNode.removeChild(o);let a=h.querySelector(".stream-error");a||(a=document.createElement("p"),a.className="stream-error error",a.textContent=`Error loading stream: ${r.message}`,h.prepend(a))}};function ds(e,s){var $,H,q,C,f;const t=(($=e.link)==null?void 0:$.file)||((H=e.link)==null?void 0:H.directUrl)||"",n=e.tracks||[],i=e.intro||{start:0,end:0},r=e.outro||{start:0,end:0},o=K();if(!t){if(!h.querySelector(".stream-error")){const k=document.createElement("p");k.className="stream-error error",k.textContent="No video URL available",h.prepend(k)}return}const a=document.getElementById("customVideoPlayer");a&&a.remove();const c=document.getElementById("defaultVideoPlayer");c&&c.remove();let l=document.getElementById("videoPlayer");l||(l=document.createElement("div"),l.id="videoPlayer",l.className="video-player-section",l.style.marginBottom="20px"),h.prepend(l);let u="";if((i.start!==0||i.end!==0)&&(u+=`<p style="color:#ffcc00;">Skip intro: ${i.start}s - ${i.end}s</p>`),(r.start!==0||r.end!==0)&&(u+=`<p style="color:#ffcc00;">Skip outro: ${r.start}s - ${r.end}s</p>`),window.currentAnimeTitle=s||window.currentAnimeTitle,l.innerHTML=`
    <h3>Now Playing: ${s}</h3>
    ${u}
  `,o){const m=pt({videoUrl:t,title:s,tracks:n,intro:i,outro:r});l.appendChild(m),B=mt(m,{videoUrl:t})}else{const m=dt({videoUrl:t,title:s});l.appendChild(m),B=ut(m,{videoUrl:t})}const v=((q=window.hianimeScrapServerData)==null?void 0:q.currentEpisodeIndex)??-1,y=((C=window.hianimeScrapServerData)==null?void 0:C.totalEpisodes)??0;B&&((f=window.hianimeScrapServerData)!=null&&f.episodes)&&B.setEpisodeCallbacks(v>0?()=>{const m=window.hianimeScrapServerData.episodes[v-1];m&&(m.id||`${window.hianimeScrapServerData.animeId}${m.number}`,window.hianimeScrapServerData.currentEpisodeIndex=v-1,playHianimeScrapStream(m.id,window.hianimeScrapServerData.currentServerType||"sub",m.name||`Episode ${m.number}`))}:null,v<y-1?()=>{const m=window.hianimeScrapServerData.episodes[v+1];m&&(m.id||`${window.hianimeScrapServerData.animeId}${m.number}`,window.hianimeScrapServerData.currentEpisodeIndex=v+1,playHianimeScrapStream(m.id,window.hianimeScrapServerData.currentServerType||"sub",m.name||`Episode ${m.number}`))}:null)}function Te(e,s){const t=K();h.innerHTML=`
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
  `;let n=[];if(Array.isArray(e)?n=e:e&&e.servers&&Array.isArray(e.servers)?n=e.servers:e&&e.sources&&Array.isArray(e.sources)?n=e.sources:e&&e.data&&Array.isArray(e.data)?n=e.data:e&&e.streamingServers&&Array.isArray(e.streamingServers)&&(n=e.streamingServers),n.length===0){h.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}let i='<div class="servers-list">';n.forEach((r,o)=>{const a=r.name||r.serverName||r.quality||`Server ${o+1}`,c=r.url||r.file||r.src||r.streamUrl||"";if(i+=`
      <div class="server-option">
        <strong>${a}</strong>
    `,c){const l=`${et}/fetch?url=${encodeURIComponent(c)}`;i+=`
        <p><a href="${c}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
        <p><a href="${l}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
        <p><button class="play-btn" onclick="playStream('${l.replace(/'/g,"\\'")}', '${a.replace(/'/g,"\\'")}')">▶ Play</button></p>
      `,r.sources&&Array.isArray(r.sources)&&r.sources.forEach((u,v)=>{const y=u.url||u.file||u.src||"";if(y){const $=`${et}/fetch?url=${encodeURIComponent(y)}`,H=u.quality||`Source ${v+1}`;i+=`
              <hr style="margin: 10px 0; border-color: rgba(233,69,96,0.3);">
              <p><strong>${H}</strong></p>
              <p><a href="${y}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
              <p><a href="${$}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
              <p><button class="play-btn" onclick="playStream('${$}')">▶ Play</button></p>
            `}})}else i+="<p>No direct URL available</p>";(r.intro||r.outro)&&(i+='<p class="meta">',r.intro&&(i+=`Intro: ${r.intro.start}-${r.intro.end}s `),r.outro&&(i+=`Outro: ${r.outro.start}-${r.outro.end}s`),i+="</p>"),i+="</div>"}),i+="</div>",h.innerHTML+=i}window.playStream=async function(e,s){if(!e)return alert("No stream URL available");console.log("Playing stream:",e);const t=K(),n=document.getElementById("customVideoPlayer");n&&n.remove();const i=document.getElementById("defaultVideoPlayer");i&&i.remove();let r=document.getElementById("videoPlayer");if(r||(r=document.createElement("div"),r.id="videoPlayer",r.className="video-player-section",r.style.marginBottom="20px"),h.prepend(r),window.currentAnimeTitle=s||window.currentAnimeTitle,r.innerHTML=`<h3>Now Playing: ${s}</h3>`,t){const a=pt({videoUrl:e,title:s,tracks:[],intro:{},outro:{}});r.appendChild(a),B=mt(a,{videoUrl:e})}else{const a=dt({videoUrl:e,title:s});r.appendChild(a),B=ut(a,{videoUrl:e})}const o=I.findIndex(a=>{var u,v;const c=a.number||a.episode||a.ep||0,l=parseInt(((v=(u=document.querySelector(".episode-btn.active"))==null?void 0:u.textContent)==null?void 0:v.trim())||"0");return c===l});B&&I.length>0&&B.setEpisodeCallbacks(o>0?()=>{const a=I[o-1];if(a){const c=a.id||`${ve}-episode-${a.number||o}`,l=a.number||a.episode||a.ep||o;xe(c,String(l))}}:null,o<I.length-1?()=>{const a=I[o+1];if(a){const c=a.id||`${ve}-episode-${a.number||o+2}`,l=a.number||a.episode||a.ep||o+2;xe(c,String(l))}}:null)};Nt.addEventListener("click",Pe);X.addEventListener("keypress",e=>{e.key==="Enter"&&Pe()});_.addEventListener("change",()=>{Q.innerHTML="",J.innerHTML="",me.innerHTML="",h.innerHTML="",ve=null,I=[],S=null});document.getElementById("homeBtn").addEventListener("click",Ce);document.getElementById("searchNavBtn").addEventListener("click",ge);document.addEventListener("DOMContentLoaded",()=>{Ce()});
