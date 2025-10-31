// app.js - dados falsos, renderização DOM e player simples

// Gerenciamento de favoritos e playlist
let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
let playlist = JSON.parse(localStorage.getItem('playlist') || '[]');

function toggleFavorito(musicaIndex) {
  const index = favoritos.indexOf(musicaIndex);
  if (index === -1) {
    favoritos.push(musicaIndex);
  } else {
    favoritos.splice(index, 1);
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  renderMusicas(currentFilter, currentSearch);
}

function togglePlaylist(musicaIndex) {
  const index = playlist.indexOf(musicaIndex);
  if (index === -1) {
    playlist.push(musicaIndex);
  } else {
    playlist.splice(index, 1);
  }
  localStorage.setItem('playlist', JSON.stringify(playlist));
  renderMusicas(currentFilter, currentSearch);
}

const musicas = [
  { 
    titulo: 'Evidências', 
    artista: 'Chitãozinho & Xororó', 
    genero: 'sertanejo', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273f9a9cbee6858e231f7c1daf7',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/1X95pCQG939KCbJL6yVQgw', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
  },
  { 
    titulo: 'Boate Azul', 
    artista: 'Bruno & Marrone', 
    genero: 'sertanejo', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273c6b6bed8f619af34c858c254',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/4Z20Nlp53CuArdsy0VbeTb'
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' 
  },
  { 
    titulo: 'Esqueça-me se For Capaz', 
    artista: 'Jorge & Mateus', 
    genero: 'sertanejo', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273ffd5a4d45ac36515b2a06f9d',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/4qsOrxBv09HhNSpsgMRXdC', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' 
  },
  { 
    titulo: 'Todo Mundo Vai Sofrer', 
    artista: 'Marília Mendonça', 
    genero: 'sertanejo', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273374058b1c48517c8f5b8e0a5',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/4E6RdcCWMiHTu7zy1VTNDo', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' 
  },

  { 
    titulo: 'Vai Malandra', 
    artista: 'Anitta, Mc Zaac', 
    genero: 'funk', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273854ba82366475ddee4d54c5f',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/6u0EAxf1OJTLS7CvInuNd7',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' 
  },
  { 
    titulo: 'Amor de Que', 
    artista: 'Pabllo Vittar', 
    genero: 'funk', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273a9798c6a7cbae7545109cf3c',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/7yYsyXQa2JgbyL9fkEiUNt', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' 
  },
  { 
    titulo: 'Envolvimento', 
    artista: 'MC Loma', 
    genero: 'funk', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273a8defad965ba838224f730f7',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/3xhgrkZuPHxJBHwyBl5sOs', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' 
  },
  { 
    titulo: 'Baile de Favela', 
    artista: 'MC João', 
    genero: 'funk', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273e11a8b5efc8852e0e683ae99',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/5nwkZfrwFGehnwYA1Z664w', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' 
  },

  { 
    titulo: 'Malvadão 3', 
    artista: 'Xamã', 
    genero: 'rap', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273ebbf39cc4a2c82af76e41d39',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/0NBgyml7T0IvUNbXIkcSpH', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' 
  },
  { 
    titulo: 'Volta por Cima', 
    artista: 'L7NNON', 
    genero: 'rap', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273e6a245e5e41f431f2c47cc5f',
    spotifyUrl: 'https://open.spotify.com/track/6MDPO5VM7XvnZnXAzzK0hX', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' 
  },

  { 
    titulo: 'Vampiro', 
    artista: 'Matuê', 
    genero: 'trap', 
    cover: 'https://i.scdn.co/image/ab67616d0000b273a1d98442d9c3482e769ee8d7',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/6bTdZ7xfKp3NqqADJ8HLyj', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' 
  },
  { 
    titulo: 'M4', 
    artista: 'Teto', 
    genero: 'trap', 
    cover: 'https://i.scdn.co/image/ab67616d0000b2735948e887f9558d1ea8bb0766',
    spotifyUrl: 'https://open.spotify.com/intl-pt/track/07AQkmp456NpEnT8HR7WLy', 
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' 
  },
];

// Estados do player e da interface
let currentIndex = -1;
let currentFilter = 'all';
let currentSearch = '';
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
  document.getElementById('current-track-image').src = m.cover;
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

// Função para renderizar lista de músicas
function renderMusicList(lista, container) {
  if(lista.length === 0){
    container.innerHTML = '<div class="empty">Nenhuma música encontrada.</div>';
    return;
  }

  lista.forEach(m => {
    const globalIndex = musicas.indexOf(m);
    const div = document.createElement('div');
    div.className = 'musica-card';

    const isFavorito = favoritos.includes(globalIndex);
    const isInPlaylist = playlist.includes(globalIndex);

    div.innerHTML = `
      <div class="musica-img" onclick="loadTrack(${globalIndex}, true)">
        <img src="${m.cover}" alt="${m.titulo} capa" onerror="this.src='https://via.placeholder.com/300/222/fff?text=?'">
        <div class="hover-overlay">
          <button class="play-overlay-btn">▶</button>
        </div>
      </div>
      <div class="musica-info">
        <a href="${m.spotifyUrl}" target="_blank" rel="noopener noreferrer" class="titulo">${m.titulo}</a>
        <div class="artista">${m.artista}</div>
      </div>
      <div class="card-actions">
        <button class="action-btn favorite-btn ${isFavorito ? 'active' : ''}" title="${isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
          ${isFavorito ? '♥' : '♡'}
        </button>
        <button class="action-btn playlist-btn ${isInPlaylist ? 'active' : ''}" title="${isInPlaylist ? 'Remover da playlist' : 'Adicionar à playlist'}">
          ${isInPlaylist ? '✓' : '+'}
        </button>
      </div>
    `;

    const favBtn = div.querySelector('.favorite-btn');
    favBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorito(globalIndex);
    });

    const playlistBtn = div.querySelector('.playlist-btn');
    playlistBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePlaylist(globalIndex);
    });

    container.appendChild(div);
  });
}

// Renderiza a lista no container #catalog
function renderMusicas(filterGenre = 'all', query = ''){
  const container = document.getElementById('catalog');
  container.innerHTML = '';
  currentFilter = filterGenre;
  currentSearch = query;

  let lista = musicas;
  const generos = ['sertanejo', 'funk', 'rap', 'trap'];
  
  // Se tiver busca, mostra resultados direto
  const q = query.trim().toLowerCase();
  if (q !== '') {
    lista = musicas.filter(m => (m.titulo + ' ' + m.artista).toLowerCase().includes(q));
    renderMusicList(lista, container);
    return;
  }

  // Filtra por seção especial (favoritos/playlist)
  if (filterGenre === 'favorites') {
    lista = musicas.filter((_, index) => favoritos.includes(index));
    renderMusicList(lista, container);
    return;
  } else if (filterGenre === 'playlist') {
    lista = musicas.filter((_, index) => playlist.includes(index));
    renderMusicList(lista, container);
    return;
  }

  // Renderiza pasta específica ou todas as pastas
  if (filterGenre !== 'all') {
    lista = musicas.filter(m => m.genero === filterGenre);
    renderMusicList(lista, container);
  } else {
    // Renderiza todas as pastas
    generos.forEach(genero => {
      const musicasGenero = musicas.filter(m => m.genero === genero);
      if (musicasGenero.length > 0) {
        const folder = document.createElement('div');
        folder.className = 'folder-card';
        
        const generoFormatado = genero.charAt(0).toUpperCase() + genero.slice(1);
        
        folder.innerHTML = `
          <div class="folder-header" data-genre="${genero}">
            <div class="folder-icon">📁</div>
            <div class="folder-info">
              <h2>${generoFormatado}</h2>
              <span>${musicasGenero.length} músicas</span>
            </div>
            <div class="folder-preview">
              ${musicasGenero.slice(0, 4).map(m => `
                <div class="preview-thumb">
                  <img src="${m.cover}" alt="${m.titulo}">
                </div>
              `).join('')}
            </div>
          </div>
        `;

        folder.addEventListener('click', (e) => {
          const genreBtn = document.querySelector(`.top-nav button[data-genre="${genero}"]`);
          if (genreBtn) {
            genreBtn.click();
          }
        });

        container.appendChild(folder);
      }
    });
  }
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
      const section = b.getAttribute('data-section');
      const genre = b.getAttribute('data-genre');
      setActive(b);
      renderMusicas(section || genre, search.value);
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
