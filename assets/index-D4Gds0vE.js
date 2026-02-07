(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const Je="https://ttt-mauve-rho.vercel.app",L=Je,Qe={animekai:{base:L+"/anime/animekai",templates:{search:L+"/anime/animekai/{query}",info:L+"/anime/animekai/info?id={id}",episodes:L+"/anime/animekai/episodes/{id}",watch:L+"/anime/animekai/watch/{episodeId}",home:L+"/anime/animekai/new-releases"}},animepahe:{base:L+"/anime/animepahe",templates:{search:L+"/anime/animepahe/{query}",info:L+"/anime/animepahe/info/{id}",episodes:L+"/anime/animepahe/episodes/{id}",watch:L+"/anime/animepahe/watch?episodeId={episodeId}",home:L+"/anime/animekai/new-releases"}},"hianime-scrap":{base:"https://api.animo.qzz.io/api/v1",templates:{search:"https://hianimeapi-6uju.onrender.com/api/v1/search?keyword={query}&page=1",info:"https://api.animo.qzz.io/api/v1/animes/{id}",episodes:"https://api.animo.qzz.io/api/v1/episodes/{id}",servers:"https://api.animo.qzz.io/api/v1/servers?id={id}",stream:"https://api.animo.qzz.io/api/v1/stream?id={id}&type={type}&server={server}",home:"https://hianimeapi-6uju.onrender.com/api/v1/home"}}},Ce="https://renewed-georgeanne-nekonode-1aa70c0c.koyeb.app";function x(e,s,t={}){const n=Qe[e];if(!n)return console.error(`Provider ${e} not found`),"";const i=n.templates[s];if(!i)return console.error(`Template ${s} not found for provider ${e}`),"";let o=i;return Object.keys(t).forEach(r=>{let a=t[r];r==="episodeId"?a=encodeURIComponent(a):a!=null?a=encodeURIComponent(String(a)):a="",o=o.replace(new RegExp(`\\{${r}\\}`,"g"),a)}),o}async function H(e,s={}){try{const t={Accept:"application/json",...s.headers||{}};s.body&&(t["Content-Type"]="application/json");const n=await fetch(e,{...s,headers:t});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return await n.json()}catch(t){throw console.error(`Fetch error for ${e}:`,t),t}}document.getElementById("app");const O=document.getElementById("searchInput"),Ke=document.getElementById("searchBtn"),V=document.getElementById("providerSelect"),_=document.getElementById("results"),W=document.getElementById("details"),Z=document.getElementById("episodes"),v=document.getElementById("servers");let ee=null,B=[],pe={},I=null,U=[],Be=[];function Ie(e){const s=[],t=/(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;let n;for(;(n=t.exec(e))!==null;)s.push({startTime:te(n[2]),endTime:te(n[3]),text:n[4].trim()});return s}function qe(e){const s=[],t=/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;let n;for(e=e.replace(/^WEBVTT.*?\n\n/s,"");(n=t.exec(e))!==null;)s.push({startTime:te(n[1]),endTime:te(n[2]),text:n[3].trim()});return s}function te(e){const s=e.split(/[:,.]/);if(s.length>=4){const t=parseInt(s[0]),n=parseInt(s[1]),i=parseInt(s[2]),o=parseInt(s[3]);return t*3600+n*60+i+o/1e3}return 0}function Ne(e,s,t="en"){if(!I)return;const n=I.video,i=document.createElement("track");i.label=s,i.kind="subtitles",i.srclang=t,i.mode="hidden";let o=`WEBVTT

`;e.forEach((d,u)=>{o+=`${ze(d.startTime)} --> ${ze(d.endTime)}
${d.text}

`});const r=new Blob([o],{type:"text/vtt"}),a=URL.createObjectURL(r);i.src=a,n.appendChild(i),U.push({track:i,url:a,label:s,language:t,cues:e});for(let d=0;d<n.textTracks.length;d++)n.textTracks[d].mode="hidden";return n.textTracks.length>0&&(n.textTracks[n.textTracks.length-1].mode="showing"),i}function ze(e){const s=Math.floor(e/3600),t=Math.floor(e%3600/60),n=Math.floor(e%60),i=Math.floor(e%1*1e3);return`${s.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${i.toString().padStart(3,"0")}`}function Ue(e){return new Promise((s,t)=>{const n=new FileReader;n.onload=i=>{const o=i.target.result;let r=[];if(e.name.endsWith(".srt")?r=Ie(o):e.name.endsWith(".vtt")||o.includes("WEBVTT")?r=qe(o):r=Ie(o),r.length>0){const a=Re(e.name),d=Ne(r,e.name,a);k(`Subtitle "${e.name}" loaded successfully`,"success"),s({cues:r,label:e.name,language:a,track:d})}else k("Failed to parse subtitle file","error"),t(new Error("Failed to parse subtitle"))},n.onerror=()=>{k("Error reading subtitle file","error"),t(new Error("Error reading file"))},n.readAsText(e)})}function Re(e){const s=e.toLowerCase();return s.includes("english")||s.includes("eng")?"en":s.includes("spanish")||s.includes("español")?"es":s.includes("french")||s.includes("français")?"fr":s.includes("german")||s.includes("deutsch")?"de":s.includes("italian")||s.includes("italiano")?"it":s.includes("portuguese")||s.includes("português")?"pt":s.includes("russian")||s.includes("русский")?"ru":s.includes("japanese")?"ja":s.includes("korean")?"ko":s.includes("chinese")||s.includes("中文")?"zh":"en"}async function Ze(e){try{const s=await H(`https://api.opensubtitles.com/api/v1/subtitles?query=${encodeURIComponent(e)}&languages=en`,{headers:{"Api-Key":"YOUR_API_KEY_HERE"}});return s&&s.data?(Be=s.data.slice(0,10),Be):[]}catch(s){return console.error("Cloud subtitle search error:",s),et(e)}}function et(e){return[{id:"1",file_name:`${e} English.srt`,language:"en",downloads:1e3,rating:8.5},{id:"2",file_name:`${e} English [SDH].srt`,language:"en",downloads:800,rating:8.2},{id:"3",file_name:`${e} Spanish.srt`,language:"es",downloads:500,rating:7.9},{id:"4",file_name:`${e} French.srt`,language:"fr",downloads:400,rating:7.8},{id:"5",file_name:`${e} Portuguese.srt`,language:"pt",downloads:300,rating:7.5}]}async function tt(e,s){try{k(`Downloading ${s}...`,"info");const t=[{startTime:0,endTime:2,text:"This is a sample subtitle"},{startTime:2,endTime:4,text:"Downloaded from cloud"},{startTime:4,endTime:6,text:`${s}`}],n=Re(s);return Ne(t,s,n),k(`Loaded ${s}`,"success"),!0}catch(t){return console.error("Download error:",t),k("Failed to download subtitle","error"),!1}}function Ve(e){const{videoUrl:s="",title:t="Video",tracks:n=[],intro:i={start:0,end:0},outro:o={start:0,end:0}}=e,r=document.createElement("div");r.className="custom-video-player",r.id="customVideoPlayer";const a={play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',volumeHigh:'<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',fullscreen:'<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',settings:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',upload:'<svg viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>',cloud:'<svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',skipBack:'<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>',skipForward:'<svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>',previous:'<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',next:'<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-5.71L11.29 12H2v-2h9.29l-3-2.29zM22 6h-2V2h-2v4h-2V2h-2v4h-2V2h-2v4h-2V2H8v4H6V2H4v16h2v-4h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2V6z"/></svg>',check:'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'};let d="";return n.length>0&&(d=n.map(u=>u.kind==="captions"||u.kind==="subtitles"?`<track label="${u.label}" kind="${u.kind}" src="${u.file}" ${u.default?"default":""}>`:"").join("")),r.innerHTML=`
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
              <div class="settings-menu-item" data-setting="subtitleTrack"><span>Subtitles</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="subtitleSize"><span>Subtitle Size</span><span class="submenu-indicator">▶</span></div>
              <div class="settings-menu-item" data-setting="uploadSubtitle"><span>Upload Subtitle</span><span>${a.upload}</span></div>
              <div class="settings-menu-item" data-setting="cloudSubtitles"><span>Search Cloud</span><span>${a.cloud}</span></div>
            </div>
            <div class="submenu playback-speed-menu">
              ${[.5,.75,1,1.25,1.5,2].map(u=>`<div class="submenu-item" data-speed="${u}"><span class="check-icon">${a.check}</span><span>${u}x</span></div>`).join("")}
            </div>
            <div class="submenu subtitle-track-menu">
              <div class="submenu-item active" data-track="off"><span class="check-icon">${a.check}</span><span>Off</span></div>
              <div class="submenu-item" data-track="uploaded"><span class="check-icon">${a.check}</span><span>Uploaded</span></div>
            </div>
            <div class="submenu subtitle-size-menu">
              ${["Small","Medium","Large","X-Large"].map(u=>`<div class="submenu-item" data-size="${u.toLowerCase()}"><span class="check-icon">${a.check}</span><span>${u}</span></div>`).join("")}
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
    <div class="subtitle-container"><div class="subtitle-text"></div></div>
    <div class="player-tooltip"></div>
    <input type="file" accept=".srt,.vtt" id="subtitleFileInput" style="display:none" multiple>
  `,r}function De(e,s={}){var Te,Ee,Me,He,xe,Ae;const t=e.querySelector("#customVideo"),n=e.querySelector(".player-loading"),i=e.querySelector(".player-error"),o=e.querySelector(".player-controls"),r=e.querySelector(".progress-container"),a=e.querySelector(".progress-bar"),d=e.querySelector(".buffered-bar"),u=e.querySelector(".play-btn-main"),h=e.querySelector(".volume-btn"),g=e.querySelector(".volume-slider"),w=e.querySelectorAll(".skip-btn"),A=e.querySelector(".fullscreen-btn"),S=e.querySelector(".settings-btn"),m=e.querySelector(".settings-menu"),T=e.querySelector(".time-display"),f=T.querySelector(".current-time"),E=T.querySelector(".duration"),ne=e.querySelector(".subtitle-container"),_e=ne.querySelector(".subtitle-text");let N=!1,G=!1,me=null,q=null;function fe(l){if(isNaN(l))return"0:00";const c=Math.floor(l/60),p=Math.floor(l%60);return`${c}:${p.toString().padStart(2,"0")}`}function We(){t.duration&&(a.style.width=`${t.currentTime/t.duration*100}%`,f.textContent=fe(t.currentTime))}function Ge(){t.buffered.length>0&&(d.style.width=`${t.buffered.end(t.buffered.length-1)/t.duration*100}%`)}function X(){n.classList.remove("hidden")}function ie(){n.classList.add("hidden")}function Y(){i.classList.remove("hidden"),o.classList.add("hidden")}function be(){i.classList.add("hidden"),o.classList.remove("hidden")}function re(){t.paused?(t.play().catch(()=>{}),N=!0,u.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',e.classList.add("playing")):(t.pause(),N=!1,u.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',e.classList.remove("playing"))}function oe(){G?(t.muted=!1,G=!1,h.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',g.value=t.volume):(t.muted=!0,G=!0,h.innerHTML='<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',g.value=0)}function ye(){var l,c,p,b;document.fullscreenElement?(p=document.exitFullscreen)!=null&&p.call(document)||((b=document.webkitExitFullscreen)==null||b.call(document)):(l=e.requestFullscreen)!=null&&l.call(e)||((c=e.webkitRequestFullscreen)==null||c.call(e))}function D(l){t.currentTime=Math.max(0,Math.min(t.currentTime+l,t.duration))}function $e(){e.classList.add("show-controls"),clearTimeout(me),N&&(me=setTimeout(()=>{e.classList.remove("show-controls")},3e3))}function ae(l){if(t.canPlayType("application/vnd.apple.mpegurl")){t.src=l;return}try{if(window.Hls)we(l);else{const c=document.createElement("script");c.src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js",c.onload=()=>we(l),c.onerror=Y,document.head.appendChild(c)}}catch{Y()}}function we(l){window.Hls&&(q&&q.destroy(),q=new window.Hls({enableWorker:!0,lowLatencyMode:!0}),q.loadSource(l),q.attachMedia(t),q.on(window.Hls.Events.MANIFEST_PARSED,()=>{ie(),t.play().catch(()=>{})}),q.on(window.Hls.Events.ERROR,(c,p)=>{p.fatal&&Y()}))}t.addEventListener("loadedmetadata",()=>{E.textContent=fe(t.duration),ie()}),t.addEventListener("play",()=>{N=!0,u.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',$e()}),t.addEventListener("pause",()=>{N=!1,u.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'}),t.addEventListener("timeupdate",()=>{We(),Ge()}),t.addEventListener("waiting",X),t.addEventListener("canplay",ie),t.addEventListener("error",Y),u.addEventListener("click",re),t.addEventListener("click",re),h.addEventListener("click",oe),g.addEventListener("input",l=>{t.volume=l.target.value,g.value=t.volume,t.volume>0&&G&&oe()}),w.forEach(l=>l.addEventListener("click",()=>D(parseInt(l.dataset.seconds)))),r.addEventListener("click",l=>{const c=(l.clientX-r.getBoundingClientRect().left)/r.getBoundingClientRect().width;t.currentTime=c*t.duration}),A.addEventListener("click",ye),S.addEventListener("click",()=>{m.classList.toggle("visible")}),e.addEventListener("click",l=>{l.target.closest(".settings-wrapper")||m.classList.remove("visible")});const J=e.querySelector(".playback-speed-menu");(Te=e.querySelector('[data-setting="playbackSpeed"]'))==null||Te.addEventListener("click",()=>{J.classList.toggle("visible")}),J.querySelectorAll(".submenu-item").forEach(l=>{l.addEventListener("click",()=>{t.playbackRate=parseFloat(l.dataset.speed),J.classList.remove("visible"),J.querySelectorAll(".submenu-item").forEach(c=>c.classList.remove("active")),l.classList.add("active")})});const Q=e.querySelector(".subtitle-size-menu");(Ee=e.querySelector('[data-setting="subtitleSize"]'))==null||Ee.addEventListener("click",()=>{Q.classList.toggle("visible")}),Q.querySelectorAll(".submenu-item").forEach(l=>{l.addEventListener("click",()=>{ne.className=`subtitle-container subtitle-size-${l.dataset.size}`,Q.classList.remove("visible"),Q.querySelectorAll(".submenu-item").forEach(c=>c.classList.remove("active")),l.classList.add("active")})});const le=e.querySelector(".subtitle-track-menu");(Me=e.querySelector('[data-setting="subtitleTrack"]'))==null||Me.addEventListener("click",()=>{le.classList.toggle("visible")});const Se=e.querySelector(".upload-subtitle-menu");(He=e.querySelector('[data-setting="uploadSubtitle"]'))==null||He.addEventListener("click",()=>{Se.classList.toggle("visible"),le.classList.remove("visible"),Le.classList.remove("visible")});const y=e.querySelector(".upload-zone"),z=y==null?void 0:y.querySelector(".subtitle-input");y==null||y.addEventListener("click",()=>{z==null||z.click()}),z==null||z.addEventListener("change",async l=>{const c=l.target.files;if(c&&c.length>0)for(let p=0;p<c.length;p++){const b=c[p];if(b.name.endsWith(".srt")||b.name.endsWith(".vtt"))try{await Ue(b),F()}catch(j){console.error("Subtitle upload error:",j)}}z.value=""}),y==null||y.addEventListener("dragover",l=>{l.preventDefault(),y.classList.add("dragover")}),y==null||y.addEventListener("dragleave",()=>{y.classList.remove("dragover")}),y==null||y.addEventListener("drop",async l=>{var p;l.preventDefault(),y.classList.remove("dragover");const c=(p=l.dataTransfer)==null?void 0:p.files;if(c&&c.length>0)for(let b=0;b<c.length;b++){const j=c[b];if(j.name.endsWith(".srt")||j.name.endsWith(".vtt"))try{await Ue(j),F()}catch(Ye){console.error("Subtitle upload error:",Ye)}}});function F(){const l=e.querySelector(".uploaded-subtitles-list");if(l){if(U.length===0){l.innerHTML='<p style="color: var(--text-light); font-size: 0.85em; padding: 10px;">No subtitles uploaded</p>';return}l.innerHTML=U.map((c,p)=>`
      <div class="loaded-subtitle-item ${p===U.length-1?"active":""}">
        <span class="name">${c.label.substring(0,25)}${c.label.length>25?"...":""}</span>
        <button class="remove-btn" onclick="removeSubtitle(${p})">✕</button>
      </div>
    `).join("")}}window.removeSubtitle=function(l){if(U[l]){const c=U[l];c.track&&c.track.parentNode&&c.track.parentNode.removeChild(c.track),c.url&&URL.revokeObjectURL(c.url),U.splice(l,1),F(),k("Subtitle removed","info")}};const Le=e.querySelector(".cloud-subtitles-menu");(xe=e.querySelector('[data-setting="cloudSubtitles"]'))==null||xe.addEventListener("click",()=>{Le.classList.toggle("visible"),Se.classList.remove("visible"),le.classList.remove("visible")});const R=e.querySelector(".cloud-search-input"),ce=e.querySelector(".cloud-search-btn");async function ke(){const l=R==null?void 0:R.value.trim();if(!l){k("Please enter a search term","warning");return}const c=e.querySelector(".cloud-subtitles-results");c.innerHTML='<p style="color: var(--text-light); text-align: center; padding: 20px;"><span class="loading-spinner"></span> Searching...</p>';try{const p=await Ze(l);Xe(p)}catch(p){console.error("Cloud search error:",p),c.innerHTML='<p style="color: var(--accent); text-align: center; padding: 20px;">Search failed. Try again.</p>'}}function Xe(l){const c=e.querySelector(".cloud-subtitles-results");if(c){if(l.length===0){c.innerHTML='<p style="color: var(--text-light); text-align: center; padding: 20px;">No results found</p>';return}c.innerHTML=l.map(p=>{var b;return`
      <div class="subtitle-result" onclick="loadCloudSubtitle('${p.id}', '${p.file_name.replace(/'/g,"\\'")}')">
        <div class="subtitle-result-info">
          <div class="name">${p.file_name.substring(0,30)}${p.file_name.length>30?"...":""}</div>
          <div class="details">${((b=p.language)==null?void 0:b.toUpperCase())||"Unknown"} • ⭐ ${p.rating||"N/A"} • ${p.downloads||0} downloads</div>
        </div>
        <button class="download-btn">⬇</button>
      </div>
    `}).join("")}}return window.loadCloudSubtitle=async function(l,c){await tt(l,c)&&F()},ce==null||ce.addEventListener("click",ke),R==null||R.addEventListener("keypress",l=>{l.key==="Enter"&&ke()}),F(),document.addEventListener("keydown",l=>{if(e.isConnected&&l.target.tagName!=="INPUT")switch(l.key){case" ":case"k":l.preventDefault(),re();break;case"m":oe();break;case"f":ye();break;case"ArrowLeft":l.preventDefault(),D(-5);break;case"ArrowRight":l.preventDefault(),D(5);break;case"j":D(-10);break;case"l":D(10);break}}),e.addEventListener("mousemove",$e),e.addEventListener("mouseleave",()=>{N&&e.classList.remove("show-controls")}),t.addEventListener("timeupdate",()=>{var c;const l=t.textTracks;for(let p=0;p<l.length;p++)if(l[p].mode==="showing"){const b=(c=l[p].activeCues)==null?void 0:c[0];_e.textContent=b?b.text:"",ne.classList.toggle("visible",!!b);break}}),(Ae=i.querySelector(".retry-btn"))==null||Ae.addEventListener("click",()=>{be(),X(),ae(e.dataset.videoUrl)}),e.dataset.videoUrl=s.videoUrl||"",s.videoUrl&&(X(),ae(s.videoUrl)),{element:e,video:t,loadVideo:l=>{e.dataset.videoUrl=l,be(),X(),ae(l)},setEpisodeCallbacks:(l,c)=>{const p=e.querySelector(".prev-episode"),b=e.querySelector(".next-episode");p.disabled=!l,b.disabled=!c,p.onclick=l||(()=>{}),b.onclick=c||(()=>{})}}}let $=null,P=0,K=null;async function st(){const e=V.value,s=x(e,"home");console.log("Fetching home page data from:",s);try{const t=await H(s);return nt(t)}catch(t){throw console.error("Error fetching home page data:",t),t}}function nt(e){return e?(e.data&&(e=e.data),{status:e.status||!0,spotlight:it(e.spotlight||[]),trending:M(e.trending||[]),topAiring:M(e.topAiring||[]),mostPopular:M(e.mostPopular||[]),mostFavorite:M(e.mostFavorite||[]),latestCompleted:M(e.latestCompleted||[]),latestEpisode:M(e.latestEpisode||[]),newAdded:M(e.newAdded||[]),topUpcoming:M(e.topUpcoming||[]),topTen:rt(e.topTen||{today:[],week:[],month:[]}),genres:e.genres||[]}):null}function it(e){return e.map(s=>{var t,n,i;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/400x600",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((i=s.episodes)==null?void 0:i.eps)||0},rank:s.rank||0,type:s.type||"TV",quality:s.quality||"HD",duration:s.duration||"Unknown",aired:s.aired||"Unknown",synopsis:s.synopsis||"No synopsis available."}})}function M(e){return e.map(s=>{var t,n,i;return{title:s.title||"Unknown Title",alternativeTitle:s.alternativeTitle||"",id:s.id||"",poster:s.poster||"https://via.placeholder.com/200x300",episodes:{sub:((t=s.episodes)==null?void 0:t.sub)||0,dub:((n=s.episodes)==null?void 0:n.dub)||0,eps:((i=s.episodes)==null?void 0:i.eps)||0},type:s.type||"TV"}})}function rt(e){return{today:M(e.today||[]).slice(0,10),week:M(e.week||[]).slice(0,10),month:M(e.month||[]).slice(0,10)}}function he(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("results"),n=document.getElementById("details"),i=document.getElementById("episodes"),o=document.getElementById("servers"),r=document.getElementById("homeBtn"),a=document.getElementById("searchNavBtn");r.classList.add("active"),a.classList.remove("active"),e.classList.add("visible"),e.classList.remove("hidden"),s.classList.remove("visible"),t.innerHTML="",n.innerHTML="",i.innerHTML="",o.innerHTML="",$||Fe()}function se(){const e=document.getElementById("homePage"),s=document.querySelector(".search-container"),t=document.getElementById("homeBtn"),n=document.getElementById("searchNavBtn");t.classList.remove("active"),n.classList.add("active"),e.classList.remove("visible"),e.classList.add("hidden"),s.classList.add("visible"),vt()}async function Fe(){const e=document.getElementById("homeContent");e.innerHTML=ot();try{if($=await st(),!$||!$.status)throw new Error("Failed to load home page data");e.innerHTML=lt($),pt(),k("Home page loaded successfully","success")}catch(s){console.error("Error loading home page:",s),e.innerHTML=at(s.message)}}function ot(){return`
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
  `}function at(e){return`
    <div class="home-error">
      <div class="error-icon">😕</div>
      <h2>Oops! Something went wrong</h2>
      <p>${e||"Unable to load home page data. Please try again."}</p>
      <button class="retry-btn" onclick="loadHomePage()">🔄 Retry</button>
    </div>
  `}function lt(e){var t,n,i;let s="";return e.spotlight&&e.spotlight.length>0&&(s+=ct(e.spotlight)),e.genres&&e.genres.length>0&&(s+=dt(e.genres)),e.topTen&&(((t=e.topTen.today)==null?void 0:t.length)>0||((n=e.topTen.week)==null?void 0:n.length)>0||((i=e.topTen.month)==null?void 0:i.length)>0)&&(s+=ut(e.topTen)),e.trending&&e.trending.length>0&&(s+=C("📈 Trending Now","trending",e.trending)),e.topAiring&&e.topAiring.length>0&&(s+=C("▶️ Top Airing","topAiring",e.topAiring)),e.mostPopular&&e.mostPopular.length>0&&(s+=C("⭐ Most Popular","mostPopular",e.mostPopular)),e.mostFavorite&&e.mostFavorite.length>0&&(s+=C("❤️ Most Favorite","mostFavorite",e.mostFavorite)),e.latestCompleted&&e.latestCompleted.length>0&&(s+=C("✅ Latest Completed","latestCompleted",e.latestCompleted)),e.latestEpisode&&e.latestEpisode.length>0&&(s+=C("🎬 Latest Episodes","latestEpisode",e.latestEpisode)),e.newAdded&&e.newAdded.length>0&&(s+=C("🆕 Newly Added","newAdded",e.newAdded)),e.topUpcoming&&e.topUpcoming.length>0&&(s+=C("🚀 Top Upcoming","topUpcoming",e.topUpcoming)),s}function ct(e){const s=e.map((n,i)=>{var o,r,a;return`
    <div class="spotlight-slide ${i===0?"active":""}" data-index="${i}">
      <img src="${n.poster}" alt="${n.title}" loading="lazy">
      <div class="spotlight-overlay">
        <div class="spotlight-rank">#${n.rank||i+1}</div>
        <h2 class="spotlight-title">${n.title}</h2>
        <div class="spotlight-meta">
          <span>${n.type||"TV"}</span>
          ${n.quality?`<span class="quality">${n.quality}</span>`:""}
          <span>${n.duration||"Unknown duration"}</span>
          ${((o=n.episodes)==null?void 0:o.sub)>0?`<span>📺 ${n.episodes.sub} eps</span>`:""}
        </div>
        <p class="spotlight-synopsis">${(r=n.synopsis)==null?void 0:r.substring(0,200)}${((a=n.synopsis)==null?void 0:a.length)>200?"...":""}</p>
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
  `}function dt(e){return`
    <div class="home-section">
      <div class="section-header">
        <h2>🏷️ Browse by Genre</h2>
      </div>
      <div class="genres-container">${e.map(t=>`
    <button class="genre-tag-btn" onclick="searchByGenre('${t.replace(/'/g,"\\'")}')">${t}</button>
  `).join("")}</div>
    </div>
  `}function ut(e){const s=(t,n)=>!t||t.length===0?'<p style="color: var(--text-light); text-align: center;">No data available</p>':t.slice(0,5).map((i,o)=>{var r;return`
      <div class="top10-item" onclick="selectAnime('${i.id}', '${i.title.replace(/'/g,"\\'")}')">
        <div class="top10-rank">${o+1}</div>
        <img src="${i.poster}" alt="${i.title}" loading="lazy">
        <div class="top10-item-info">
          <div class="title">${i.title}</div>
          <div class="episodes">${((r=i.episodes)==null?void 0:r.sub)>0?`${i.episodes.sub} eps`:i.type||"TV"}</div>
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
  `}function C(e,s,t){const n=t.slice(0,12).map(i=>{var o;return`
    <div class="home-anime-card" onclick="selectAnime('${i.id}', '${i.title.replace(/'/g,"\\'")}')">
      <img src="${i.poster}" alt="${i.title}" loading="lazy">
      <div class="home-anime-card-content">
        <h3>${i.title}</h3>
        <p>${((o=i.episodes)==null?void 0:o.sub)>0?`${i.episodes.sub} eps`:i.type||"TV"}</p>
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
  `}function pt(){var e;(e=$==null?void 0:$.spotlight)!=null&&e.length&&(P=0,K=setInterval(()=>{je()},5e3))}function vt(){K&&(clearInterval(K),K=null)}function je(){var e;(e=$==null?void 0:$.spotlight)!=null&&e.length&&(P=(P+1)%$.spotlight.length,Oe())}function ht(){var e;(e=$==null?void 0:$.spotlight)!=null&&e.length&&(P=(P-1+$.spotlight.length)%$.spotlight.length,Oe())}function Oe(){const e=document.querySelectorAll(".spotlight-slide"),s=document.querySelectorAll(".spotlight-dot");e.forEach((t,n)=>{t.classList.toggle("active",n===P)}),s.forEach((t,n)=>{t.classList.toggle("active",n===P)})}function gt(e){console.log("View all category:",e),k(`Showing all ${e} - Filter by provider if needed`,"info"),se(),O.focus()}function mt(e){se(),O.value=e,O.focus(),ge()}window.loadHomePage=Fe;window.showHomePage=he;window.showSearchPage=se;window.nextSpotlight=je;window.prevSpotlight=ht;window.viewAllCategory=gt;window.searchByGenre=mt;function k(e,s="info"){const t=document.querySelector(".toast-container");t&&t.remove();const n=document.createElement("div");n.className="toast-container";const i=document.createElement("div");i.className=`toast ${s}`;const o=s==="success"?"✓":s==="error"?"✕":"ℹ";i.innerHTML=`<span style="font-size:1.2em;">${o}</span> ${e}`,n.appendChild(i),document.body.appendChild(n),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateX(100px)",i.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},3e3)}function ft(){let s="";for(let t=0;t<12;t++)s+=`
      <div class="skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;_.innerHTML=s}async function ge(){const e=O.value.trim();if(!e){k("Please enter a search query","warning");return}try{ft();const s=V.value,t=x(s,"search",{query:e});console.log("Search URL:",t);const n=await H(t);let i=[];if(n&&n.data&&n.data.response&&Array.isArray(n.data.response)?i=n.data.response:Array.isArray(n)?i=n:n&&n.results&&Array.isArray(n.results)?i=n.results:n&&n.anime&&Array.isArray(n.anime)?i=n.anime:n&&n.data&&Array.isArray(n.data)&&(i=n.data),i.length===0){_.innerHTML='<p style="text-align:center;padding:40px;color:var(--text-light);">No results found. Try a different search term.</p>';return}bt(i),k(`Found ${i.length} results`,"success")}catch(s){console.error("Search error:",s),_.innerHTML=`<p class="error" style="text-align:center;padding:40px;color:var(--accent);">Search failed: ${s.message}. Check your connection and try again.</p>`}}function bt(e){pe={},_.innerHTML=e.map(s=>{const t=s.title||s.name||s.englishName||"Unknown Title",n=s.id||s.animeId||s.mal_id||"",i=s.image||s.poster||s.coverImage||"https://via.placeholder.com/150x200",o=s.releaseDate||s.year||s.startDate||"N/A";let r="";if(s.episodes)if(typeof s.episodes=="object"){const h=s.episodes.sub||0,g=s.episodes.dub||0,w=s.episodes.eps||0;h>0||g>0?r=`<p>${h>0?`Sub: ${h}`:""}${h>0&&g>0?" | ":""}${g>0?`Dub: ${g}`:""}</p>`:w>0&&(r=`<p>Episodes: ${w}</p>`)}else r=`<p>Episodes: ${s.episodes}</p>`;const a=s.type?`<p>${s.type}</p>`:"",d=s.duration?`<p>${s.duration}</p>`:"";return V.value==="hianime-scrap"?(pe[n]=s,`
        <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}')">
          <img src="${i}" alt="${t}" loading="lazy">
          <h3>${t}</h3>
          ${r}
          ${a}
          ${d}
          <p>${o}</p>
        </div>
      `):`
      <div class="anime-card" onclick="selectAnime('${n.replace(/'/g,"\\'")}', '${t.replace(/'/g,"\\'")}')">
        <img src="${i}" alt="${t}" loading="lazy">
        <h3>${t}</h3>
        ${r}
        ${a}
        ${d}
        <p>${o}</p>
      </div>
    `}).join("")}async function yt(e,s){var o,r,a,d,u,h;if(!e){alert("Invalid anime ID");return}const t=V.value,n=t==="hianime-scrap",i=n?pe[e]:null;try{if(W.innerHTML="<p>Loading details...</p>",n&&i){const m={...i,id:i.id||e,__provider:t};try{const f=x(t,"episodes",{id:e});console.log("Episodes URL:",f);const E=await H(f);if(m.episodes=Pe(E,t),m.episodes.length>0){de(m,i.title);return}}catch(f){console.warn("Could not fetch episodes for hianime-scrap:",f)}const T=((o=m.episodes)==null?void 0:o.eps)||((r=m.episodes)==null?void 0:r.sub)||((a=m.episodes)==null?void 0:a.dub)||((d=m.episodes)==null?void 0:d.total)||((u=m.episodes)==null?void 0:u.episodeCount)||((h=m.episodes)==null?void 0:h.totalEpisodes)||0;T>0?(m.episodes=Array.from({length:Math.min(T,500)},(f,E)=>({id:`${e}::ep=${E+1}`,number:E+1,title:`Episode ${E+1}`,isFiller:!1})),console.log(`Generated ${T} episode buttons from count`)):m.episodes=[],de(m,i.title);return}const g=typeof s=="string"?s:null,w=x(t,"info",{id:e});console.log("Info URL:",w);const A=await H(w);let S=$t(A,e,t);if(!S.episodes||S.episodes.length===0)try{const m=x(t,"episodes",{id:e});console.log("Episodes URL:",m);const T=await H(m);S.episodes=Pe(T,t)}catch(m){console.warn("Could not fetch episodes separately:",m),S.episodes=[]}S.__provider=t,de(S,g||S.title)}catch(g){console.error("Details error:",g),W.innerHTML=`<p class="error">Error loading anime details: ${g.message}</p>`}}function $t(e,s,t){var n,i,o;if(e&&e.data&&t==="hianime-scrap")return{...e.data,id:e.data.id||s,title:e.data.title,poster:e.data.poster,image:e.data.poster,type:e.data.type,status:e.data.status,genres:e.data.genres||[],description:e.data.description||e.data.synopsis||"",totalEpisodes:((n=e.data.episodes)==null?void 0:n.eps)||((i=e.data.episodes)==null?void 0:i.sub)||((o=e.data.episodes)==null?void 0:o.dub)||"Unknown"};if(Array.isArray(e)){const r=e.find(a=>a&&a.id===s)||e[0];return r?{...r,id:r.id||s}:{id:s,episodes:[]}}if(e&&e.results&&Array.isArray(e.results)){const r=e.results.find(a=>a&&a.id===s)||e.results[0];return r?{...r,id:r.id||s}:{...e,id:e.id||s}}return e&&e.data?{...e.data,id:e.data.id||s}:e&&(e.title||e.name||e.englishName)?{...e,id:e.id||s}:{id:s,...e||{}}}function Pe(e,s){return e?s==="hianime-scrap"&&e&&e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||`${n+1}`,number:t.episodeNumber||n+1,title:t.title||t.alternativeTitle||`Episode ${t.episodeNumber||n+1}`,isFiller:t.isFiller||!1})):Array.isArray(e)?e.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.episodes&&Array.isArray(e.episodes)?e.episodes.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):e.data&&Array.isArray(e.data)?e.data.map((t,n)=>({id:t.id||t.episodeId||`${n+1}`,number:t.number||t.episode||t.ep||n+1,title:t.title||t.name||`Episode ${n+1}`})):[]:[]}async function ve(e,s){if(!e){alert("Invalid episode ID");return}const t=V.value;try{if(v.innerHTML=`
      <h3>Servers for Episode ${s||"?"}</h3>
      <p class="loading-servers" style="padding: 20px; text-align: center; color: var(--accent);">
        <span class="loading-spinner"></span> Loading servers...
      </p>
    `,t==="hianime-scrap"){let o=e,r=s;const a=e.match(/::ep=(\d+)$/);a&&(r=a[1],console.log(`Episode ${r} selected (ID: ${e})`));const d=x(t,"servers",{id:e});console.log("Servers URL:",d);const u=await H(d);St(u,r||s||"1",e),v.scrollIntoView({behavior:"smooth"});return}if(t==="animepahe"){const o=x(t,"watch",{episodeId:e});console.log("Watch URL:",o);const r=await H(o);ue(r,s||"1"),v.scrollIntoView({behavior:"smooth"});return}if(t==="animekai"){const o=x(t,"watch",{episodeId:e});console.log("Watch URL:",o);const r=await H(o);ue(r,s||"1"),v.scrollIntoView({behavior:"smooth"});return}const n=x(t,"servers",{id:e});console.log("Servers URL:",n);const i=await H(n);ue(i,s||"1"),v.scrollIntoView({behavior:"smooth"})}catch(n){console.error("Servers error:",n),v.innerHTML=`<p class="error">Error loading servers: ${n.message}. Try a different episode.</p>`}}window.selectAnime=yt;window.selectEpisode=ve;function de(e,s){var g;console.log("Displaying anime details:",e),ee=e.id||null;const t=e.title||s||"Unknown Title",n=e.image||e.poster||e.coverImage||"https://via.placeholder.com/200x300",i=e.japaneseTitle||e.jname||"",o=e.type||e.format||"Unknown",r=e.status||"",a=e.genres||(e.genre?[e.genre]:[]),d=e.totalEpisodes||e.episodeCount||((g=e.episodes)==null?void 0:g.length)||"Unknown",u=e.description||e.synopsis||"No description available",h=e.url||e.animeUrl||"";W.innerHTML=`
    <div class="anime-details">
      <div class="anime-header">
        <img src="${n}" alt="${t}" onerror="this.src='https://via.placeholder.com/200x300'">
        <div class="anime-info">
          <h2>${t}</h2>
          ${i?`<p><strong>Japanese:</strong> ${i}</p>`:""}
          <p><strong>Type:</strong> ${o}</p>
          ${r?`<p><strong>Status:</strong> ${r}</p>`:""}
          ${a.length>0?`<p><strong>Genres:</strong> ${a.join(", ")}</p>`:""}
          <p><strong>Episodes:</strong> ${d}</p>
          <p><strong>Description:</strong> ${u}</p>
          ${h?`<p><a href="${h}" target="_blank" rel="noopener noreferrer" class="watch-link">View on Provider →</a></p>`:""}
        </div>
      </div>
    </div>
  `,W.scrollIntoView({behavior:"smooth"}),e.episodes&&e.episodes.length>0?(B=e.episodes,wt(e.episodes)):(Z.innerHTML="<p>No episodes available</p>",B=[]),v.innerHTML=""}function wt(e){Z.innerHTML="<h3>Episodes</h3>";const s=e.map((t,n)=>{const i=t.number||t.episode||t.ep||n+1,o=t.title||t.name||"",r=t.id||`${n+1}`,a=t.isFiller,d=a?'<span style="color:#ffcc00;font-size:0.7em;"> ★Filler</span>':"";return`
      <button 
        class="episode-btn ${a?"filler":""}" 
        onclick="selectEpisode('${String(r).replace(/'/g,"\\'")}', '${i}')"
        title="${o}${a?" (Filler)":""}"
      >
        ${i}${d}
        ${o?`<br><small style="font-size:0.7em">${o.substring(0,20)}${o.length>20?"...":""}</small>`:""}
      </button>
    `}).join("");Z.innerHTML+=`<div class="episodes-grid">${s}</div>`}function St(e,s,t){if(v.innerHTML=`<h3>Servers for Episode ${s}</h3>`,!e||!e.success||!e.data){v.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}const n=e.data,i=n.sub||[],o=n.dub||[],r=n.raw||[];if(i.length===0&&o.length===0&&r.length===0){v.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}window.hianimeScrapServerData={episodeId:t,sub:i,dub:o,raw:r};let a='<div class="servers-tabs">';a+=`<div class="server-tab ${i.length>0?"active":""}" onclick="showHianimeScrapServers('sub')">Sub (${i.length})</div>`,a+=`<div class="server-tab ${i.length===0&&o.length>0?"active":""}" onclick="showHianimeScrapServers('dub')">Dub (${o.length})</div>`,a+=`<div class="server-tab ${i.length===0&&o.length===0&&r.length>0?"active":""}" onclick="showHianimeScrapServers('raw')">Raw (${r.length})</div>`,a+="</div>",a+='<div id="hianimeScrapServersList" class="servers-list"></div>',v.innerHTML+=a,i.length>0?showHianimeScrapServers("sub"):o.length>0?showHianimeScrapServers("dub"):showHianimeScrapServers("raw")}window.showHianimeScrapServers=function(e){const s=document.getElementById("hianimeScrapServersList");if(!s||!window.hianimeScrapServerData)return;document.querySelectorAll(".server-tab").forEach(n=>{n.classList.remove("active"),n.textContent.toLowerCase().includes(e)&&n.classList.add("active")});const t=window.hianimeScrapServerData[e]||[];if(t.length===0){s.innerHTML=`<p>No ${e} servers available.</p>`;return}s.innerHTML=t.map(n=>{const i=n.name||`Server ${n.index||""}`,o=n.id,r=e;return`
      <div class="server-option">
        <strong>${i}</strong>
        <p>Type: ${r.charAt(0).toUpperCase()+r.slice(1)}</p>
        <p><button class="play-btn" onclick="playHianimeScrapStream('${o}', '${r}', '${i.replace(/'/g,"\\'")}')">▶ Play</button></p>
      </div>
    `}).join("")};window.playHianimeScrapStream=async function(e,s,t){if(!window.hianimeScrapServerData)return alert("No server data available");const n=window.hianimeScrapServerData.episodeId,i=x("hianime-scrap","stream",{id:n,type:s,server:t});console.log("Stream URL:",i);try{let o=v.querySelector(".stream-loading");o||(o=document.createElement("p"),o.className="stream-loading",o.innerHTML='<span class="loading-spinner"></span> Loading stream...',o.style.cssText="padding: 20px; text-align: center; color: var(--accent);",v.prepend(o));const r=await H(i);if(o&&o.parentNode&&o.parentNode.removeChild(o),r&&r.success&&r.data)Lt(r.data,t);else{let a=v.querySelector(".stream-error");a||(a=document.createElement("p"),a.className="stream-error error",a.textContent="Failed to load stream. Try a different server.",v.prepend(a))}}catch(o){console.error("Stream error:",o);const r=v.querySelector(".stream-loading");r&&r.parentNode&&r.parentNode.removeChild(r);let a=v.querySelector(".stream-error");a||(a=document.createElement("p"),a.className="stream-error error",a.textContent=`Error loading stream: ${o.message}`,v.prepend(a))}};function Lt(e,s){var w,A,S,m,T;const t=((w=e.link)==null?void 0:w.file)||((A=e.link)==null?void 0:A.directUrl)||"",n=e.tracks||[],i=e.intro||{start:0,end:0},o=e.outro||{start:0,end:0};if(!t){if(!v.querySelector(".stream-error")){const E=document.createElement("p");E.className="stream-error error",E.textContent="No video URL available",v.prepend(E)}return}const r=document.getElementById("customVideoPlayer");r&&r.remove();let a=document.getElementById("videoPlayer");a||(a=document.createElement("div"),a.id="videoPlayer",a.className="video-player-section",a.style.marginBottom="20px"),v.prepend(a);let d="";(i.start!==0||i.end!==0)&&(d+=`<p style="color:#ffcc00;">Skip intro: ${i.start}s - ${i.end}s</p>`),(o.start!==0||o.end!==0)&&(d+=`<p style="color:#ffcc00;">Skip outro: ${o.start}s - ${o.end}s</p>`),a.innerHTML=`
    <h3>Now Playing: ${s}</h3>
    ${d}
  `;const u=Ve({videoUrl:t,title:s,tracks:n,intro:i,outro:o});a.appendChild(u),I=De(u,{videoUrl:t});const h=((S=window.hianimeScrapServerData)==null?void 0:S.currentEpisodeIndex)??-1,g=((m=window.hianimeScrapServerData)==null?void 0:m.totalEpisodes)??0;I&&((T=window.hianimeScrapServerData)!=null&&T.episodes)&&I.setEpisodeCallbacks(h>0?()=>{const f=window.hianimeScrapServerData.episodes[h-1];f&&(f.id||`${window.hianimeScrapServerData.animeId}${f.number}`,window.hianimeScrapServerData.currentEpisodeIndex=h-1,playHianimeScrapStream(f.id,window.hianimeScrapServerData.currentServerType||"sub",f.name||`Episode ${f.number}`))}:null,h<g-1?()=>{const f=window.hianimeScrapServerData.episodes[h+1];f&&(f.id||`${window.hianimeScrapServerData.animeId}${f.number}`,window.hianimeScrapServerData.currentEpisodeIndex=h+1,playHianimeScrapStream(f.id,window.hianimeScrapServerData.currentServerType||"sub",f.name||`Episode ${f.number}`))}:null)}function ue(e,s){v.innerHTML=`<h3>Servers for Episode ${s}</h3>`;let t=[];if(Array.isArray(e)?t=e:e&&e.servers&&Array.isArray(e.servers)?t=e.servers:e&&e.sources&&Array.isArray(e.sources)?t=e.sources:e&&e.data&&Array.isArray(e.data)?t=e.data:e&&e.streamingServers&&Array.isArray(e.streamingServers)&&(t=e.streamingServers),t.length===0){v.innerHTML+="<p>No servers available for this episode. Try a different episode.</p>";return}let n='<div class="servers-list">';t.forEach((i,o)=>{const r=i.name||i.serverName||i.quality||`Server ${o+1}`,a=i.url||i.file||i.src||i.streamUrl||"";if(n+=`
      <div class="server-option">
        <strong>${r}</strong>
    `,a){const d=`${Ce}/fetch?url=${encodeURIComponent(a)}`;n+=`
        <p><a href="${a}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
        <p><a href="${d}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
        <p><button class="play-btn" onclick="playStream('${d.replace(/'/g,"\\'")}', '${r.replace(/'/g,"\\'")}')">▶ Play</button></p>
      `,i.sources&&Array.isArray(i.sources)&&i.sources.forEach((u,h)=>{const g=u.url||u.file||u.src||"";if(g){const w=`${Ce}/fetch?url=${encodeURIComponent(g)}`,A=u.quality||`Source ${h+1}`;n+=`
              <hr style="margin: 10px 0; border-color: rgba(233,69,96,0.3);">
              <p><strong>${A}</strong></p>
              <p><a href="${g}" target="_blank" rel="noopener noreferrer">Open Original</a></p>
              <p><a href="${w}" target="_blank" rel="noopener noreferrer">Open via Proxy</a></p>
              <p><button class="play-btn" onclick="playStream('${w.replace(/'/g,"\\'")}', '${A.replace(/'/g,"\\'")}')">▶ Play</button></p>
            `}})}else n+="<p>No direct URL available</p>";(i.intro||i.outro)&&(n+='<p class="meta">',i.intro&&(n+=`Intro: ${i.intro.start}-${i.intro.end}s `),i.outro&&(n+=`Outro: ${i.outro.start}-${i.outro.end}s`),n+="</p>"),n+="</div>"}),n+="</div>",v.innerHTML+=n}window.playStream=async function(e,s){if(!e)return alert("No stream URL available");console.log("Playing stream:",e);const t=document.getElementById("customVideoPlayer");t&&t.remove();let n=document.getElementById("videoPlayer");n||(n=document.createElement("div"),n.id="videoPlayer",n.className="video-player-section",n.style.marginBottom="20px"),v.prepend(n),n.innerHTML=`<h3>Now Playing: ${s}</h3>`;const i=Ve({videoUrl:e,title:s,tracks:[],intro:{},outro:{}});n.appendChild(i),I=De(i,{videoUrl:e});const o=B.findIndex(r=>{var u,h;const a=r.number||r.episode||r.ep||0,d=parseInt(((h=(u=document.querySelector(".episode-btn.active"))==null?void 0:u.textContent)==null?void 0:h.trim())||"0");return a===d});I&&B.length>0&&I.setEpisodeCallbacks(o>0?()=>{const r=B[o-1];if(r){const a=r.id||`${ee}-episode-${r.number||o}`,d=r.number||r.episode||r.ep||o;ve(a,String(d))}}:null,o<B.length-1?()=>{const r=B[o+1];if(r){const a=r.id||`${ee}-episode-${r.number||o+2}`,d=r.number||r.episode||r.ep||o+2;ve(a,String(d))}}:null)};Ke.addEventListener("click",ge);O.addEventListener("keypress",e=>{e.key==="Enter"&&ge()});V.addEventListener("change",()=>{_.innerHTML="",W.innerHTML="",Z.innerHTML="",v.innerHTML="",ee=null,B=[],$=null});document.getElementById("homeBtn").addEventListener("click",he);document.getElementById("searchNavBtn").addEventListener("click",se);document.addEventListener("DOMContentLoaded",()=>{he()});
