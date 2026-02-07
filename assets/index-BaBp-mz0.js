(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Te="https://ttt-mauve-rho.vercel.app",w=Te,He={animekai:{base:w+"/anime/animekai",templates:{search:w+"/anime/animekai/{query}",info:w+"/anime/animekai/info?id={id}",episodes:w+"/anime/animekai/episodes/{id}",watch:w+"/anime/animekai/watch/{episodeId}",home:w+"/anime/animekai/new-releases"}},animepahe:{base:w+"/anime/animepahe",templates:{search:w+"/anime/animepahe/{query}",info:w+"/anime/animepahe/info/{id}",episodes:w+"/anime/animepahe/episodes/{id}",watch:w+"/anime/animepahe/watch?episodeId={episodeId}",home:w+"/anime/animekai/new-releases"}},"hianime-scrap":{base:"https://api.animo.qzz.io/api/v1",templates:{search:"https://api.animo.qzz.io/api/v1/search?keyword={query}&page=1",info:"https://api.animo.qzz.io/api/v1/animes/{id}",episodes:"https://api.animo.qzz.io/api/v1/episodes/{id}",servers:"https://api.animo.qzz.io/api/v1/servers?id={id}",stream:"https://api.animo.qzz.io/api/v1/stream?id={id}&type={type}&server={server}",home:"https://api.animo.qzz.io/api/v1/home"}}},me="https://renewed-georgeanne-nekonode-1aa70c0c.koyeb.app";function E(e,s,t={}){const n=He[e];if(!n)return console.error(`Provider ${e} not found`),"";const i=n.templates[s];if(!i)return console.error(`Template ${s} not found for provider ${e}`),"";let r=i;return Object.keys(t).forEach(o=>{let a=t[o];o==="episodeId"?a=encodeURIComponent(a):a!=null?a=encodeURIComponent(String(a)):a="",r=r.replace(new RegExp(`\\{${o}\\}`,"g"),a)}),r}async function T(e,s={}){try{const t=await fetch(e,{...s,headers:{Accept:"application/json","Content-Type":"application/json",...s.headers}});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error(`Fetch error for ${e}:`,t),t}}document.getElementById("app");const P=document.getElementById("searchInput"),Ae=document.getElementById("searchBtn"),q=document.getElementById("providerSelect"),N=document.getElementById("results"),V=document.getElementById("details"),G=document.getElementById("episodes"),p=document.getElementById("servers");let W=null,I=[],ne={},z=null;function ye(e){const{videoUrl:s="",title:t="Video",tracks:n=[],intro:i={start:0,end:0},outro:r={start:0,end:0}}=e,o=document.createElement("div");o.className="custom-video-player",o.id="customVideoPlayer";const a={play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',volumeHigh:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',fullscreen:'<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',settings:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',skipBack:'<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>',skipForward:'<svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>',previous:'<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',next:'<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-5.71L11.29 12H2v-2h9.29l-3-2.29zM22 6h-2V2h-2v4h-2V2h-2v4h-2V2h-2v4h-2V2H8v4H6V2H4v16h2v-4h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2V6z"/></svg>',check:'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'};let d="";return n.length>0&&(d=n.map(c=>c.kind==="captions"||c.kind==="subtitles"?`<track label="${c.label}" kind="${c.kind}" src="${c.file}" ${c.default?"default":""}>`:"").join("")),o.innerHTML=`
    <video id="customVideo" preload="metadata" crossorigin="anonymous">
      <source src="${s}" type="application/vnd.apple.mpegurl">
      ${d}
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
              <div class="settings-menu-item" data-setting="subtitleSize"><span>Subtitle Size</span><span class="submenu-indicator">▶</span></div>
            </div>
            <div class="submenu playback-speed-menu">
              ${[.5,.75,1,1.25,1.5,2].map(c=>`<div class="submenu-item" data-speed="${c}"><span class="check-icon">${a.check}</span><span>${c}x</span></div>`).join("")}
            </div>
            <div class="submenu subtitle-size-menu">
              ${["Small","Medium","Large","X-Large"].map(c=>`<div class="submenu-item" data-size="${c.toLowerCase()}"><span class="check-icon">${a.check}</span><span>${c}</span></div>`).join("")}
            </div>
          </div>
          <button class="control-btn fullscreen-btn" title="Fullscreen">${a.fullscreen}</button>
        </div>
      </div>
    </div>
    <div class="subtitle-container"><div class="subtitle-text"></div></div>
    <div class="player-tooltip"></div>
  `,o}function be(e,s={}){var ve,he,ge;const t=e.querySelector("#customVideo"),n=e.querySelector(".player-loading"),i=e.querySelector(".player-error"),r=e.querySelector(".player-controls"),o=e.querySelector(".progress-container"),a=e.querySelector(".progress-bar"),d=e.querySelector(".buffered-bar"),c=e.querySelector(".play-btn-main"),u=e.querySelector(".volume-btn"),v=e.querySelector(".volume-slider"),b=e.querySelectorAll(".skip-btn"),H=e.querySelector(".fullscreen-btn"),$=e.querySelector(".settings-btn"),h=e.querySelector(".settings-menu"),S=e.querySelector(".time-display"),g=S.querySelector(".current-time"),L=S.querySelector(".duration"),Q=e.querySelector(".subtitle-container"),Le=Q.querySelector(".subtitle-text");let C=!1,D=!1,ae=null,B=null;function le(l){if(isNaN(l))return"0:00";const m=Math.floor(l/60),y=Math.floor(l%60);return`${m}:${y.toString().padStart(2,"0")}`}function ke(){t.duration&&(a.style.width=`${t.currentTime/t.duration*100}%`,g.textContent=le(t.currentTime))}function Ee(){t.buffered.length>0&&(d.style.width=`${t.buffered.end(t.buffered.length-1)/t.duration*100}%`)}function R(){n.classList.remove("hidden")}function Y(){n.classList.add("hidden")}function F(){i.classList.remove("hidden"),r.classList.add("hidden")}function ce(){i.classList.add("hidden"),r.classList.remove("hidden")}function Z(){t.paused?(t.play().catch(()=>{}),C=!0,c.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',e.classList.add("playing")):(t.pause(),C=!1,c.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',e.classList.remove("playing"))}function K(){D?(t.muted=!1,D=!1,u.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',v.value=t.volume):(t.muted=!0,D=!0,u.innerHTML='<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',v.value=0)}function de(){var l,m,y,A;document.fullscreenElement?(y=document.exitFullscreen)!=null&&y.call(document)||((A=document.webkitExitFullscreen)==null||A.call(document)):(l=e.requestFullscreen)!=null&&l.call(e)||((m=e.webkitRequestFullscreen)==null||m.call(e))}function U(l){t.currentTime=Math.max(0,Math.min(t.currentTime+l,t.duration))}function pe(){e.classList.add("show-controls"),clearTimeout(ae),C&&(ae=setTimeout(()=>{e.classList.remove("show-controls")},3e3))}function ee(l){if(t.canPlayType("application/vnd.apple.mpegurl")){t.src=l;return}try{if(window.Hls)ue(l);else{const m=document.createElement("script");m.src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js",m.onload=()=>ue(l),m.onerror=F,document.head.appendChild(m)}}catch{F()}}function ue(l){window.Hls&&(B&&B.destroy(),B=new window.Hls({enableWorker:!0,lowLatencyMode:!0}),B.loadSource(l),B.attachMedia(t),B.on(window.Hls.Events.MANIFEST_PARSED,()=>{Y(),t.play().catch(()=>{})}),B.on(window.Hls.Events.ERROR,(m,y)=>{y.fatal&&F()}))}t.addEventListener("loadedmetadata",()=>{L.textContent=le(t.duration),Y()}),t.addEventListener("play",()=>{C=!0,c.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',pe()}),t.addEventListener("pause",()=>{C=!1,c.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'}),t.addEventListener("timeupdate",()=>{ke(),Ee()}),t.addEventListener("waiting",R),t.addEventListener("canplay",Y),t.addEventListener("error",F),c.addEventListener("click",Z),t.addEventListener("click",Z),u.addEventListener("click",K),v.addEventListener("input",l=>{t.volume=l.target.value,v.value=t.volume,t.volume>0&&D&&K()}),b.forEach(l=>l.addEventListener("click",()=>U(parseInt(l.dataset.seconds)))),o.addEventListener("click",l=>{const m=(l.clientX-o.getBoundingClientRect().left)/o.getBoundingClientRect().width;t.currentTime=m*t.duration}),H.addEventListener("click",de),$.addEventListener("click",()=>{h.classList.toggle("visible")}),e.addEventListener("click",l=>{l.target.closest(".settings-wrapper")||h.classList.remove("visible")});const j=e.querySelector(".playback-speed-menu");(ve=e.querySelector('[data-setting="playbackSpeed"]'))==null||ve.addEventListener("click",()=>{j.classList.toggle("visible")}),j.querySelectorAll(".submenu-item").forEach(l=>{l.addEventListener("click",()=>{t.playbackRate=parseFloat(l.dataset.speed),j.classList.remove("visible"),j.querySelectorAll(".submenu-item").forEach(m=>m.classList.remove("active")),l.classList.add("active")})});const O=e.querySelector(".subtitle-size-menu");return(he=e.querySelector('[data-setting="subtitleSize"]'))==null||he.addEventListener("click",()=>{O.classList.toggle("visible")}),O.querySelectorAll(".submenu-item").forEach(l=>{l.addEventListener("click",()=>{Q.className=`subtitle-container subtitle-size-${l.dataset.size}`,O.classList.remove("visible"),O.querySelectorAll(".submenu-item").forEach(m=>m.classList.remove("active")),l.classList.add("active")})}),document.addEventListener("keydown",l=>{if(e.isConnected&&l.target.tagName!=="INPUT")switch(l.key){case" ":case"k":l.preventDefault(),Z();break;case"m":K();break;case"f":de();break;case"ArrowLeft":l.preventDefault(),U(-5);break;case"ArrowRight":l.preventDefault(),U(5);break;case"j":U(-10);break;case"l":U(10);break}}),e.addEventListener("mousemove",pe),e.addEventListener("mouseleave",()=>{C&&e.classList.remove("show-controls")}),t.addEventListener("timeupdate",()=>{var m;const l=t.textTracks;for(let y=0;y<l.length;y++)if(l[y].mode==="showing"){const A=(m=l[y].activeCues)==null?void 0:m[0];Le.textContent=A?A.text:"",Q.classList.toggle("visible",!!A);break}}),(ge=i.querySelector(".retry-btn"))==null||ge.addEventListener("click",()=>{ce(),R(),ee(e.dataset.videoUrl)}),e.dataset.videoUrl=s.videoUrl||"",s.videoUrl&&(R(),ee(s.videoUrl)),{element:e,video:t,loadVideo:l=>{e.dataset.videoUrl=l,ce(),R(),ee(l)},setEpisodeCallbacks:(l,m)=>{const y=e.querySelector(".prev-episode"),A=e.querySelector(".next-episode");y.disabled=!l,A.disabled=!m,y.onclick=l||(()=>{}),A.onclick=m||(()=>{})}}}let f=null,x=0,_=null;async function Me(){const e=q.value,s=E(e,"home");console.log("Fetching home page data from:",s);try{const t=await T(s);return Ie(t)}catch(t){throw console.error("Error fetching home page data:",t),t}}function Ie(e){return e?(e.data&&(e=e.data),{status:e.status||!0,spotlight:Be(e.spotlight||[]),trending:k(e.trending||[]),topAiring:k(e.topAiring||[]),mostPopular:k(e.mostPopular||[]),mostFavorite:k(e.mostFavorite||[]),latestCompleted:k(e.latestCompleted||[]),latestEpisode:k(e.latestEpisode||[]),newAdded:k(e.newAdded||[]),topUpcoming:k(e.topUpcoming||[]),topTen:xe(e.topTen||{today:[],week:[],month:[]}),genres:e.genres||[]}):null}function Be(e){return e.map(s=>{var t,n,i;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/400x600",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((i=s.episodes)==null?void 0:i.eps)||0},rank:s.rank||0,type:s.type||"TV",quality:s.quality||"HD",duration:s.duration||"Unknown",aired:s.aired||"Unknown",synopsis:s.synopsis||"No synopsis available."}})}function k(e){return e.map(s=>{var t,n,i;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/200x300",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((i=s.episodes)==null?void 0:i.eps)||0},type:s.type||"TV"}})}function xe(e){return{today:k(e.today||[]).slice(0,10),week:k(e.week||[]).slice(0,10),month:k(e.month||[]).slice(0,10)}}function oe(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("results"),n=document.getElementById("details"),i=document.getElementById("episodes"),r=document.getElementById("servers"),o=document.getElementById("homeBtn"),a=document.getElementById("searchNavBtn");o.classList.add("active"),a.classList.remove("active"),e.classList.add("visible"),e.classList.remove("hidden"),s.classList.remove("visible"),t.innerHTML="",n.innerHTML="",i.innerHTML="",r.innerHTML="",f||$e()}function J(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("homeBtn"),n=document.getElementById("searchNavBtn");t.classList.remove("active"),n.classList.add("active"),e.classList.remove("visible"),e.classList.add("hidden"),s.classList.add("visible"),De()}async function $e(){const e=document.getElementById("homeContent");e.innerHTML=Ce();try{if(f=await Me(),!f||!f.status)throw new Error("Failed to load home page data");e.innerHTML=qe(f),Ve(),X("Home page loaded successfully","success")}catch(s){console.error("Error loading home page:",s),e.innerHTML=ze(s.message)}}function Ce(){return`
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
  `}function ze(e){return`
    <div class="home-error">
      <div class="error-icon">😕</div>
      <h2>Oops! Something went wrong</h2>
      <p>${e||"Unable to load home page data. Please try again."}</p>
      <button class="retry-btn" onclick="loadHomePage()">🔄 Retry</button>
    </div>
  `}function qe(e){var t,n,i;let s="";return e.spotlight&&e.spotlight.length>0&&(s+=Ue(e.spotlight)),e.genres&&e.genres.length>0&&(s+=Pe(e.genres)),e.topTen&&(((t=e.topTen.today)==null?void 0:t.length)>0||((n=e.topTen.week)==null?void 0:n.length)>0||((i=e.topTen.month)==null?void 0:i.length)>0)&&(s+=Ne(e.topTen)),e.trending&&e.trending.length>0&&(s+=M("📈 Trending Now","trending",e.trending)),e.topAiring&&e.topAiring.length>0&&(s+=M("▶️ Top Airing","topAiring",e.topAiring)),e.mostPopular&&e.mostPopular.length>0&&(s+=M("⭐ Most Popular","mostPopular",e.mostPopular)),e.mostFavorite&&e.mostFavorite.length>0&&(s+=M("❤️ Most Favorite","mostFavorite",e.mostFavorite)),e.latestCompleted&&e.latestCompleted.length>0&&(s+=M("✅ Latest Completed","latestCompleted",e.latestCompleted)),e.latestEpisode&&e.latestEpisode.length>0&&(s+=M("🎬 Latest Episodes","latestEpisode",e.latestEpisode)),e.newAdded&&e.newAdded.length>0&&(s+=M("🆕 Newly Added","newAdded",e.newAdded)),e.topUpcoming&&e.topUpcoming.length>0&&(s+=M("🚀 Top Upcoming","topUpcoming",e.topUpcoming)),s}function Ue(e){const s=e.map((n,i)=>{var r,o,a;return`
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
  `}function Pe(e){return`
    <div class="home-section">
      <div class="section-header">
        <h2>🏷️ Browse by Genre</h2>
      </div>
      <div class="genres-container">${e.map(t=>`
    <button class="genre-tag-btn" onclick="searchByGenre('${t.replace(/'/g,"\\'")}')">${t}</button>
  `).join("")}</div>
    </div>
  `}function Ne(e){const s=(t,n)=>!t||t.length===0?'<p style="color: var(--text-light); text-align: center;">No data available</p>':t.slice(0,5).map((i,r)=>{var o;return`
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
  `}function M(e,s,t){const n=t.slice(0,12).map(i=>{var r;return`
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
  `}function Ve(){var e;(e=f==null?void 0:f.spotlight)!=null&&e.length&&(x=0,_=setInterval(()=>{we()},5e3))}function De(){_&&(clearInterval(_),_=null)}function we(){var e;(e=f==null?void 0:f.spotlight)!=null&&e.length&&(x=(x+1)%f.spotlight.length,Se())}function Re(){var e;(e=f==null?void 0:f.spotlight)!=null&&e.length&&(x=(x-1+f.spotlight.length)%f.spotlight.length,Se())}function Se(){const e=document.querySelectorAll(".spotlight-slide"),s=document.querySelectorAll(".spotlight-dot");e.forEach((t,n)=>{t.classList.toggle("active",n===x)}),s.forEach((t,n)=>{t.classList.toggle("active",n===x)})}function Fe(e){console.log("View all category:",e),X(`Showing all ${e} - Filter by provider if needed`,"info"),J(),P.focus()}function je(e){J(),P.value=e,P.focus(),re()}window.loadHomePage=$e;window.showHomePage=oe;window.showSearchPage=J;window.nextSpotlight=we;window.prevSpotlight=Re;window.viewAllCategory=Fe;window.searchByGenre=je;function X(e,s="info"){const t=document.querySelector(".toast-container");t&&t.remove();const n=document.createElement("div");n.className="toast-container";const i=document.createElement("div");i.className=`toast ${s}`;const r=s==="success"?"✓":s==="error"?"✕":"ℹ";i.innerHTML=`<span style="font-size:1.2em;">${r}</span> ${e}`,n.appendChild(i),document.body.appendChild(n),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateX(100px)",i.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},3e3)}function Oe(){let s="";for(let t=0;t<12;t++)s+=`
      <div class="skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;N.innerHTML=s}async function re(){const e=P.value.trim();if(!e){X("Please enter a search query","warning");return}try{Oe();const s=q.value,t=E(s,"search",{query:e});console.log("Search URL:",t);const n=await T(t);let i=[];if(n&&n.data&&n.data.response&&Array.isArray(n.data.response)?i=n.data.response:Array.isArray(n)?i=n:n&&n.results&&Array.isArray(n.results)?i=n.results:n&&n.anime&&Array.isArray(n.anime)?i=n.anime:n&&n.data&&Array.isArray(n.data)&&(i=n.data),i.length===0){N.innerHTML='<p style="text-align:center;padding:40px;color:var(--text-light);">No results found. Try a different search term.</p>';return}_e(i),X(`Found ${i.length} results`,"success")}catch(s){console.error("Search error:",s),N.innerHTML=`<p class="error" style="text-align:center;padding:40px;color:var(--accent);">Search failed: ${s.message}. Check your connection and try again.</p>`}}function _e(e){ne={},N.innerHTML=e.map(s=>{const t=s.title||s.name||s.englishName||"Unknown Title",n=s.id||s.animeId||s.mal_id||"",i=s.image||s.poster||s.coverImage||"https://via.placeholder.com/150x200",r=s.releaseDate||s.year||s.startDate||"N/A";let o="";if(s.episodes)if(typeof s.episodes=="object"){const u=s.episodes.sub||0,v=s.episodes.dub||0,b=s.episodes.eps||0;u>0||v>0?o=`<p>${u>0?`Sub: ${u}`:""}${u>0&&v>0?" | ":""}${v>0?`Dub: ${v}`:""}</p>`:b>0&&(o=`<p>Episodes: ${b}</p>`)}else o=`<p>Episodes: ${s.episodes}</p>`;const a=s.type?`<p>${s.type}</p>`:"",d=s.duration?`<p>${s.duration}</p>`:"";return q.value==="hianime-scrap"?(ne[n]=s,`
        <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}')">
          <img src="${i}" alt="${t}" loading="lazy">
          <h3>${t}</h3>
          ${o}
          ${a}
          ${d}
          <p>${r}</p>
        </div>
      `):`
      <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}', '${t.replace(/'/g,"\\'")}')">
        <img src="${i}" alt="${t}" loading="lazy">
        <h3>${t}</h3>
        ${o}
        ${a}
        ${d}
        <p>${r}</p>
      </div>
    `}).join("")}async function Ge(e,s){var r,o,a,d,c,u;if(!e){alert("Invalid anime ID");return}const t=q.value,n=t==="hianime-scrap",i=n?ne[e]:null;try{if(V.innerHTML="<p>Loading details...</p>",n&&i){const h={...i,id:i.id||e,__provider:t};try{const g=E(t,"episodes",{id:e});console.log("Episodes URL:",g);const L=await T(g);if(h.episodes=fe(L,t),h.episodes.length>0){te(h,i.title);return}}catch(g){console.warn("Could not fetch episodes for hianime-scrap:",g)}const S=((r=h.episodes)==null?void 0:r.eps)||((o=h.episodes)==null?void 0:o.sub)||((a=h.episodes)==null?void 0:a.dub)||((d=h.episodes)==null?void 0:d.total)||((c=h.episodes)==null?void 0:c.episodeCount)||((u=h.episodes)==null?void 0:u.totalEpisodes)||0;S>0?(h.episodes=Array.from({length:Math.min(S,500)},(g,L)=>({id:`${e}::ep=${L+1}`,number:L+1,title:`Episode ${L+1}`,isFiller:!1})),console.log(`Generated ${S} episode buttons from count`)):h.episodes=[],te(h,i.title);return}const v=typeof s=="string"?s:null,b=E(t,"info",{id:e});console.log("Info URL:",b);const H=await T(b);let $=We(H,e,t);if(!$.episodes||$.episodes.length===0)try{const h=E(t,"episodes",{id:e});console.log("Episodes URL:",h);const S=await T(h);$.episodes=fe(S,t)}catch(h){console.warn("Could not fetch episodes separately:",h),$.episodes=[]}$.__provider=t,te($,v||$.title)}catch(v){console.error("Details error:",v),V.innerHTML=`<p class="error">Error loading anime details: ${v.message}</p>`}}function We(e,s,t){var n,i,r;if(e&&e.data&&t==="hianime-scrap")return{...e.data,id:e.data.id||s,title:e.data.title,poster:e.data.poster,image:e.data.poster,type:e.data.type,status:e.data.status,genres:e.data.genres||[],description:e.data.description||e.data.synopsis||"",totalEpisodes:((n=e.data.episodes)==null?void 0:n.eps)||((i=e.data.episodes)==null?void 0:i.sub)||((r=e.data.episodes)==null?void 0:r.dub)||"Unknown"};if(Array.isArray(e)){const o=e.find(a=>a&&a.id===s)||e[0];return o?{...o,id:o.id||s}:{id:s,episodes:[]}}if(e&&e.results&&Array.isArray(e.results)){const o=e.results.find(a=>a&&a.id===s)||e.results[0];return o?{...o,id:o.id||s}:{...e,id:e.id||s}}return e&&e.data?{...e.data,id:e.data.id||s}:e&&(e.title||e.name||e.englishName)?{...e,id:e.id||s}:{id:s,...e||{}}}function fe(e,s){return e?s==="hianime-scrap"&&e&&e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||`${n+1}`,number:t.episodeNumber||n+1,title:t.title||t.alternativeTitle||`Episode ${t.episodeNumber||n+1}`,isFiller:t.isFiller||!1})):Array.isArray(e)?e.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.episodes&&Array.isArray(e.episodes)?e.episodes.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):[]:[]}async function ie(e,s){if(!e){alert("Invalid episode ID");return}const t=q.value;try{if(p.innerHTML=`
      <h3>Servers for Episode ${s||"?"}</h3>
      <p class="loading-servers" style="padding: 20px; text-align: center; color: var(--accent);">
        <span class="loading-spinner"></span> Loading servers...
      </p>
    `,t==="hianime-scrap"){let r=e,o=s;const a=e.match(/::ep=(\d+)$/);a&&(o=a[1],console.log(`Episode ${o} selected (ID: ${e})`));const d=E(t,"servers",{id:e});console.log("Servers URL:",d);const c=await T(d);Je(c,o||s||"1",e),p.scrollIntoView({behavior:"smooth"});return}if(t==="animepahe"){const r=E(t,"watch",{episodeId:e});console.log("Watch URL:",r);const o=await T(r);se(o,s||"1"),p.scrollIntoView({behavior:"smooth"});return}if(t==="animekai"){const r=E(t,"watch",{episodeId:e});console.log("Watch URL:",r);const o=await T(r);se(o,s||"1"),p.scrollIntoView({behavior:"smooth"});return}const n=E(t,"servers",{id:e});console.log("Servers URL:",n);const i=await T(n);se(i,s||"1"),p.scrollIntoView({behavior:"smooth"})}catch(n){console.error("Servers error:",n),p.innerHTML=`<p class="error">Error loading servers: ${n.message}. Try a different episode.</p>`}}window.selectAnime=Ge;window.selectEpisode=ie;function te(e,s){var v;console.log("Displaying anime details:",e),W=e.id||null;const t=e.title||s||"Unknown Title",n=e.image||e.poster||e.coverImage||"https://via.placeholder.com/200x300",i=e.japaneseTitle||e.jname||"",r=e.type||e.format||"Unknown",o=e.status||"",a=e.genres||(e.genre?[e.genre]:[]),d=e.totalEpisodes||e.episodeCount||((v=e.episodes)==null?void 0:v.length)||"Unknown",c=e.description||e.synopsis||"No description available",u=e.url||e.animeUrl||"";V.innerHTML=`
    <div class="anime-details">
      <div class="anime-header">
        <img src="${n}" alt="${t}" onerror="this.src='https://via.placeholder.com/200x300'">
        <div class="anime-info">
          <h2>${t}</h2>
          ${i?`<p><strong>Japanese:</strong> ${i}</p>`:""}
          <p><strong>Type:</strong> ${r}</p>
          ${o?`<p><strong>Status:</strong> ${o}</p>`:""}
          ${a.length>0?`<p><strong>Genres:</strong> ${a.join(", ")}</p>`:""}
          <p><strong>Episodes:</strong> ${d}</p>
          <p><strong>Description:</strong> ${c}</p>
          ${u?`<p><a href="${u}" target="_blank" rel="noopener noreferrer" class="watch-link">View on Provider →</a></p>`:""}
        </div>
      </div>
    </div>
  `,V.scrollIntoView({behavior:"smooth"}),e.episodes&&e.episodes.length>0?(I=e.episodes,Xe(e.episodes)):(G.innerHTML="<p>No episodes available</p>",I=[]),p.innerHTML=""}function Xe(e){G.innerHTML="<h3>Episodes</h3>";const s=e.map((t,n)=>{const i=t.number||t.episode||t.ep||n+1,r=t.title||t.name||"",o=t.id||`${n+1}`,a=t.isFiller,d=a?'<span style="color:#ffcc00;font-size:0.7em;"> ★Filler</span>':"";return`
      <button 
        class="episode-btn ${a?"filler":""}" 
        onclick="selectEpisode('${String(o).replace(/'/g,"\\'")}', '${i}')"
        title="${r}${a?" (Filler)":""}"
      >
        ${i}${d}
        ${r?`<br><small style="font-size:0.7em">${r.substring(0,20)}${r.length>20?"...":""}</small>`:""}
      </button>
    `}).join("");G.innerHTML+=`<div class="episodes-grid">${s}</div>`}function Je(e,s,t){if(p.innerHTML=`<h3>Servers for Episode ${s}</h3>`,!e||!e.success||!e.data){p.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}const n=e.data,i=n.sub||[],r=n.dub||[],o=n.raw||[];if(i.length===0&&r.length===0&&o.length===0){p.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}window.hianimeScrapServerData={episodeId:t,sub:i,dub:r,raw:o};let a='<div class="servers-tabs">';a+=`<div class="server-tab ${i.length>0?"active":""}" onclick="showHianimeScrapServers('sub')">Sub (${i.length})</div>`,a+=`<div class="server-tab ${i.length===0&&r.length>0?"active":""}" onclick="showHianimeScrapServers('dub')">Dub (${r.length})</div>`,a+=`<div class="server-tab ${i.length===0&&r.length===0&&o.length>0?"active":""}" onclick="showHianimeScrapServers('raw')">Raw (${o.length})</div>`,a+="</div>",a+='<div id="hianimeScrapServersList" class="servers-list"></div>',p.innerHTML+=a,i.length>0?showHianimeScrapServers("sub"):r.length>0?showHianimeScrapServers("dub"):showHianimeScrapServers("raw")}window.showHianimeScrapServers=function(e){const s=document.getElementById("hianimeScrapServersList");if(!s||!window.hianimeScrapServerData)return;document.querySelectorAll(".server-tab").forEach(n=>{n.classList.remove("active"),n.textContent.toLowerCase().includes(e)&&n.classList.add("active")});const t=window.hianimeScrapServerData[e]||[];if(t.length===0){s.innerHTML=`<p>No ${e} servers available.</p>`;return}s.innerHTML=t.map(n=>{const i=n.name||`Server ${n.index||""}`,r=n.id,o=e;return`
      <div class="server-option">
        <strong>${i}</strong>
        <p>Type: ${o.charAt(0).toUpperCase()+o.slice(1)}</p>
        <p><button class="play-btn" onclick="playHianimeScrapStream('${r}', '${o}', '${i.replace(/'/g,"\\'")}')">▶ Play</button></p>
      </div>
    `}).join("")};window.playHianimeScrapStream=async function(e,s,t){if(!window.hianimeScrapServerData)return alert("No server data available");const n=window.hianimeScrapServerData.episodeId,i=E("hianime-scrap","stream",{id:n,type:s,server:t});console.log("Stream URL:",i);try{let r=p.querySelector(".stream-loading");r||(r=document.createElement("p"),r.className="stream-loading",r.innerHTML='<span class="loading-spinner"></span> Loading stream...',r.style.cssText="padding: 20px; text-align: center; color: var(--accent);",p.prepend(r));const o=await T(i);if(r&&r.parentNode&&r.parentNode.removeChild(r),o&&o.success&&o.data)Qe(o.data,t);else{let a=p.querySelector(".stream-error");a||(a=document.createElement("p"),a.className="stream-error error",a.textContent="Failed to load stream. Try a different server.",p.prepend(a))}}catch(r){console.error("Stream error:",r);const o=p.querySelector(".stream-loading");o&&o.parentNode&&o.parentNode.removeChild(o);let a=p.querySelector(".stream-error");a||(a=document.createElement("p"),a.className="stream-error error",a.textContent=`Error loading stream: ${r.message}`,p.prepend(a))}};function Qe(e,s){var b,H,$,h,S;const t=((b=e.link)==null?void 0:b.file)||((H=e.link)==null?void 0:H.directUrl)||"",n=e.tracks||[],i=e.intro||{start:0,end:0},r=e.outro||{start:0,end:0};if(!t){if(!p.querySelector(".stream-error")){const L=document.createElement("p");L.className="stream-error error",L.textContent="No video URL available",p.prepend(L)}return}const o=document.getElementById("customVideoPlayer");o&&o.remove();let a=document.getElementById("videoPlayer");a||(a=document.createElement("div"),a.id="videoPlayer",a.className="video-player-section",a.style.marginBottom="20px"),p.prepend(a);let d="";(i.start!==0||i.end!==0)&&(d+=`<p style="color:#ffcc00;">Skip intro: ${i.start}s - ${i.end}s</p>`),(r.start!==0||r.end!==0)&&(d+=`<p style="color:#ffcc00;">Skip outro: ${r.start}s - ${r.end}s</p>`),a.innerHTML=`
    <h3>Now Playing: ${s}</h3>
    ${d}
  `;const c=ye({videoUrl:t,title:s,tracks:n,intro:i,outro:r});a.appendChild(c),z=be(c,{videoUrl:t});const u=(($=window.hianimeScrapServerData)==null?void 0:$.currentEpisodeIndex)??-1,v=((h=window.hianimeScrapServerData)==null?void 0:h.totalEpisodes)??0;z&&((S=window.hianimeScrapServerData)!=null&&S.episodes)&&z.setEpisodeCallbacks(u>0?()=>{const g=window.hianimeScrapServerData.episodes[u-1];g&&(g.id||`${window.hianimeScrapServerData.animeId}${g.number}`,window.hianimeScrapServerData.currentEpisodeIndex=u-1,playHianimeScrapStream(g.id,window.hianimeScrapServerData.currentServerType||"sub",g.name||`Episode ${g.number}`))}:null,u<v-1?()=>{const g=window.hianimeScrapServerData.episodes[u+1];g&&(g.id||`${window.hianimeScrapServerData.animeId}${g.number}`,window.hianimeScrapServerData.currentEpisodeIndex=u+1,playHianimeScrapStream(g.id,window.hianimeScrapServerData.currentServerType||"sub",g.name||`Episode ${g.number}`))}:null)}function se(e,s){p.innerHTML=`<h3>Servers for Episode ${s}</h3>`;let t=[];if(Array.isArray(e)?t=e:e&&e.servers&&Array.isArray(e.servers)?t=e.servers:e&&e.sources&&Array.isArray(e.sources)?t=e.sources:e&&e.data&&Array.isArray(e.data)?t=e.data:e&&e.streamingServers&&Array.isArray(e.streamingServers)&&(t=e.streamingServers),t.length===0){p.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}let n='<div class="servers-list">';t.forEach((i,r)=>{const o=i.name||i.serverName||i.quality||`Server ${r+1}`,a=i.url||i.file||i.src||i.streamUrl||"";if(n+=`
      <div class="server-option">
        <strong>${o}</strong>
    `,a){const d=`${me}/fetch?url=${encodeURIComponent(a)}`;n+=`
        <p><a href="${a}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
        <p><a href="${d}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
        <p><button class="play-btn" onclick="playStream('${d.replace(/'/g,"\\'")}', '${o.replace(/'/g,"\\'")}')">▶ Play</button></p>
      `,i.sources&&Array.isArray(i.sources)&&i.sources.forEach((c,u)=>{const v=c.url||c.file||c.src||"";if(v){const b=`${me}/fetch?url=${encodeURIComponent(v)}`,H=c.quality||`Source ${u+1}`;n+=`
              <hr style="margin: 10px 0; border-color: rgba(233,69,96,0.3);">
              <p><strong>${H}</strong></p>
              <p><a href="${v}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
              <p><a href="${b}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
              <p><button class="play-btn" onclick="playStream('${b.replace(/'/g,"\\'")}', '${H.replace(/'/g,"\\'")}')">▶ Play</button></p>
            `}})}else n+="<p>No direct URL available</p>";(i.intro||i.outro)&&(n+='<p class="meta">',i.intro&&(n+=`Intro: ${i.intro.start}-${i.intro.end}s `),i.outro&&(n+=`Outro: ${i.outro.start}-${i.outro.end}s`),n+="</p>"),n+="</div>"}),n+="</div>",p.innerHTML+=n}window.playStream=async function(e,s){if(!e)return alert("No stream URL available");console.log("Playing stream:",e);const t=document.getElementById("customVideoPlayer");t&&t.remove();let n=document.getElementById("videoPlayer");n||(n=document.createElement("div"),n.id="videoPlayer",n.className="video-player-section",n.style.marginBottom="20px"),p.prepend(n),n.innerHTML=`<h3>Now Playing: ${s}</h3>`;const i=ye({videoUrl:e,title:s,tracks:[],intro:{},outro:{}});n.appendChild(i),z=be(i,{videoUrl:e});const r=I.findIndex(o=>{var c,u;const a=o.number||o.episode||o.ep||0,d=parseInt(((u=(c=document.querySelector(".episode-btn.active"))==null?void 0:c.textContent)==null?void 0:u.trim())||"0");return a===d});z&&I.length>0&&z.setEpisodeCallbacks(r>0?()=>{const o=I[r-1];if(o){const a=o.id||`${W}-episode-${o.number||r}`,d=o.number||o.episode||o.ep||r;ie(a,String(d))}}:null,r<I.length-1?()=>{const o=I[r+1];if(o){const a=o.id||`${W}-episode-${o.number||r+2}`,d=o.number||o.episode||o.ep||r+2;ie(a,String(d))}}:null)};Ae.addEventListener("click",re);P.addEventListener("keypress",e=>{e.key==="Enter"&&re()});q.addEventListener("change",()=>{N.innerHTML="",V.innerHTML="",G.innerHTML="",p.innerHTML="",W=null,I=[],f=null});document.getElementById("homeBtn").addEventListener("click",oe);document.getElementById("searchNavBtn").addEventListener("click",J);document.addEventListener("DOMContentLoaded",()=>{oe()});
