// app.js - dados falsos, renderização DOM e player simples

const musicas = [
  { titulo: 'Romance Sertanejo', artista: 'Dupla A', genero: 'sertanejo', cover: 'genres/sertanejo/cover1.svg', spotifyUrl: 'https://open.spotify.com/search/romance%20sertanejo', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { titulo: 'Balada na Fazenda', artista: 'Dupla B', genero: 'sertanejo', cover: 'genres/sertanejo/cover2.svg', spotifyUrl: 'https://open.spotify.com/search/sertanejo', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { titulo: 'Coração na Estrada', artista: 'Dupla C', genero: 'sertanejo', cover: 'genres/sertanejo/cover3.svg', spotifyUrl: 'https://open.spotify.com/search/sertanejo', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },

  { titulo: 'Funk na Quebrada', artista: 'MC X', genero: 'funk', cover: 'genres/funk/cover1.svg', spotifyUrl: 'https://open.spotify.com/search/funk', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { titulo: 'Senta e Rebola', artista: 'MC Y', genero: 'funk', cover: 'genres/funk/cover2.svg', spotifyUrl: 'https://open.spotify.com/search/funk', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },

  { titulo: 'Flow Pesado', artista: 'Rapper A', genero: 'rap', cover: 'genres/rap/cover1.svg', spotifyUrl: 'https://open.spotify.com/search/rap', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { titulo: 'Rimas da Rua', artista: 'Rapper B', genero: 'rap', cover: 'genres/rap/cover2.svg', spotifyUrl: 'https://open.spotify.com/search/rap', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },

  { titulo: 'Trap Nights', artista: 'Producer T', genero: 'trap', cover: 'genres/trap/cover1.svg', spotifyUrl: 'https://open.spotify.com/search/trap', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { titulo: '808 Dreams', artista: 'Artist Z', genero: 'trap', cover: 'genres/trap/cover2.svg', spotifyUrl: 'https://open.spotify.com/search/trap', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
];

// Player state
let currentIndex = -1;
const audio = document.getElementById('audio');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const trackSelect = document.getElementById('track-select');

// Render player select options
function populateTrackSelect(){
  trackSelect.innerHTML = '';
  musicas.forEach((m, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${m.titulo} — ${m.artista}`;
    trackSelect.appendChild(opt);
  });
}

function loadTrack(idx, autoplay = false){
  if(idx < 0 || idx >= musicas.length) return;
  currentIndex = idx;
  const m = musicas[idx];
  audio.src = m.previewUrl || '';
  trackTitle.textContent = m.titulo;
  trackArtist.textContent = m.artista;
  trackSelect.value = idx;
  if(autoplay){
    audio.play().catch(()=>{});
    playBtn.textContent = '⏸';
  } else {
    playBtn.textContent = '▶️';
  }
}

function playPause(){
  if(!audio.src) return;
  if(audio.paused){
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
}

function prevTrack(){
  if(currentIndex <= 0) loadTrack(musicas.length - 1, true);
  else loadTrack(currentIndex - 1, true);
}

function nextTrack(){
  if(currentIndex >= musicas.length - 1) loadTrack(0, true);
  else loadTrack(currentIndex + 1, true);
}

audio.addEventListener('ended', ()=> nextTrack());
playBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
trackSelect.addEventListener('change', (e)=> loadTrack(parseInt(e.target.value,10), true));

// Subscription panel handlers
const subscriptionBtn = document.getElementById('subscription-btn');
const subscriptionPanel = document.getElementById('subscription-panel');
const closeSub = document.getElementById('close-sub');

function openSubscription(){
  subscriptionPanel.hidden = false;
  subscriptionPanel.scrollIntoView({behavior:'smooth'});
}
function closeSubscription(){
  subscriptionPanel.hidden = true;
}

subscriptionBtn && subscriptionBtn.addEventListener('click', openSubscription);
closeSub && closeSub.addEventListener('click', closeSubscription);

// handle subscribe buttons
document.addEventListener('click', (e)=>{
  const btn = e.target.closest && e.target.closest('.subscribe-btn');
  if(!btn) return;
  const plan = btn.getAttribute('data-plan');
  if(plan === 'basico'){
    alert('Obrigado! Você selecionou o plano Básico — R$30,99/mês (simulado).');
  } else if(plan === 'premium'){
    alert('Obrigado! Você selecionou o plano Premium — R$300,00/ano (simulado).');
  }
});

// Renderiza a lista no container #catalog
function renderMusicas(filterGenre = 'all', query = ''){
  const container = document.getElementById('catalog');
  container.innerHTML = '';

  const q = query.trim().toLowerCase();
  const lista = musicas.filter(m => (filterGenre === 'all' || m.genero === filterGenre) && (q === '' || (m.titulo + ' ' + m.artista).toLowerCase().includes(q)));

  if(lista.length === 0){
    container.innerHTML = '<div class="empty">Nenhuma música encontrada.</div>';
    return;
  }

  lista.forEach(m => {
    const globalIndex = musicas.indexOf(m);
    const a = document.createElement('a');
    a.className = 'musica-card';
    a.href = m.spotifyUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    a.innerHTML = `
      <div class="thumb"><img src="${m.cover}" alt="${m.titulo} capa" onerror="this.src='https://via.placeholder.com/72/222/fff?text=?'"></div>
      <div class="musica-info">
        <div class="titulo">${m.titulo}</div>
        <div class="artista">${m.artista}</div>
      </div>
      <div class="play-wrapper"><button class="play-btn-local">▶</button></div>
    `;

    const btnLocal = a.querySelector('.play-btn-local');
    btnLocal.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      loadTrack(globalIndex, true);
    });

    container.appendChild(a);
  });
}

// Inicialização e handlers
document.addEventListener('DOMContentLoaded', ()=>{
  const nav = document.querySelectorAll('.genre-nav button');
  const search = document.getElementById('search');

  function setActive(btn){
    nav.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  }

  nav.forEach(b=>{
    b.addEventListener('click', ()=>{
      const g = b.getAttribute('data-genre');
      setActive(b);
      renderMusicas(g, search.value);
    });
  });

  search.addEventListener('input', ()=>{
    const active = document.querySelector('.genre-nav button.active');
    const g = active ? active.getAttribute('data-genre') : 'all';
    renderMusicas(g, search.value);
  });

  // populate player select and initial load
  populateTrackSelect();
  loadTrack(0, false);

  // initial render
  renderMusicas('all', '');
});
