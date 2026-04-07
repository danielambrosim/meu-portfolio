// ========== SISTEMA DE TEMAS ==========

// Definição dos temas (APENAS 4: Claro, Escuro, Roxo, Laranja)
const themes = {
    light: {
        name: 'Claro',
        icon: 'fa-sun',
        previewColor: '#0071e3',
        colors: {
            '--bg-primary': '#ffffff',
            '--bg-secondary': '#f5f5f7',
            '--bg-card': '#ffffff',
            '--text-primary': '#1d1d1f',
            '--text-secondary': '#6e6e73',
            '--border-color': '#e9e9ef',
            '--border-hover': '#d2d2d6',
            '--accent': '#0071e3',
            '--accent-hover': '#0077ed',
            '--accent-rgb': '0, 113, 227',
            '--navbar-bg': 'rgba(255, 255, 255, 0.92)',
            '--badge-bg': '#e8e8ed',
            '--card-shadow': '0 4px 12px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.03)',
            '--card-shadow-hover': '0 20px 35px -12px rgba(0, 0, 0, 0.1)'
        }
    },
    dark: {
        name: 'Escuro',
        icon: 'fa-moon',
        previewColor: '#0a84ff',
        colors: {
            '--bg-primary': '#000000',
            '--bg-secondary': '#1c1c1e',
            '--bg-card': '#1c1c1e',
            '--text-primary': '#ffffff',
            '--text-secondary': '#a1a1a6',
            '--border-color': '#2c2c2e',
            '--border-hover': '#3a3a3c',
            '--accent': '#0a84ff',
            '--accent-hover': '#409cff',
            '--accent-rgb': '10, 132, 255',
            '--navbar-bg': 'rgba(0, 0, 0, 0.85)',
            '--badge-bg': '#2c2c2e',
            '--card-shadow': '0 4px 12px rgba(0, 0, 0, 0.3)',
            '--card-shadow-hover': '0 20px 35px -12px rgba(0, 0, 0, 0.5)'
        }
    },
    purple: {
        name: 'Roxo',
        icon: 'fa-gem',
        previewColor: '#a855f7',
        colors: {
            '--bg-primary': '#0a0a14',
            '--bg-secondary': '#1a1a2e',
            '--bg-card': '#16162a',
            '--text-primary': '#f0f0ff',
            '--text-secondary': '#a0a0c0',
            '--border-color': '#2a2a4a',
            '--border-hover': '#3a3a5a',
            '--accent': '#a855f7',
            '--accent-hover': '#c084fc',
            '--accent-rgb': '168, 85, 247',
            '--navbar-bg': 'rgba(10, 10, 20, 0.85)',
            '--badge-bg': '#2a2a4a',
            '--card-shadow': '0 4px 12px rgba(0, 0, 0, 0.3)',
            '--card-shadow-hover': '0 20px 35px -12px rgba(168, 85, 247, 0.15)'
        }
    },
    orange: {
        name: 'Laranja',
        icon: 'fa-fire',
        previewColor: '#f97316',
        colors: {
            '--bg-primary': '#1a0e06',
            '--bg-secondary': '#2e1c10',
            '--bg-card': '#2a180e',
            '--text-primary': '#fff0e0',
            '--text-secondary': '#c0a090',
            '--border-color': '#4a2e1a',
            '--border-hover': '#5a3e2a',
            '--accent': '#f97316',
            '--accent-hover': '#fb923c',
            '--accent-rgb': '249, 115, 22',
            '--navbar-bg': 'rgba(26, 14, 6, 0.85)',
            '--badge-bg': '#4a2e1a',
            '--card-shadow': '0 4px 12px rgba(0, 0, 0, 0.3)',
            '--card-shadow-hover': '0 20px 35px -12px rgba(249, 115, 22, 0.15)'
        }
    }
};

// Função que aplica o tema escolhido
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    const root = document.documentElement; // pega a tag <html>
    
    // Percorre todas as cores do tema e aplica como variável CSS
    for (const [property, value] of Object.entries(theme.colors)) {
        root.style.setProperty(property, value);
    }
    
    // Salva qual tema está ativo no HTML e no localStorage
    root.setAttribute('data-theme', themeName);
    localStorage.setItem('selectedTheme', themeName);
    
    // Atualiza o ícone e texto do botão principal
    const mainToggleIcon = document.querySelector('#themeToggleMain i');
    if (mainToggleIcon) {
        mainToggleIcon.className = `fas ${theme.icon}`;
    }
    
    const mainToggleText = document.querySelector('#themeToggleMain span');
    if (mainToggleText) {
        mainToggleText.textContent = theme.name;
    }
}

// Função que CRIA o seletor de temas (botão + aba)
function createThemeSelector() {
    // Remove seletor antigo se existir (evita duplicação)
    const existingWrapper = document.querySelector('.theme-selector-wrapper');
    if (existingWrapper) existingWrapper.remove();
    
    // Cria o container principal
    const wrapper = document.createElement('div');
    wrapper.className = 'theme-selector-wrapper';
    
    // Descobre qual tema está ativo para mostrar no botão
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const currentThemeData = themes[currentTheme];
    
    // Cria o BOTÃO PRINCIPAL
    const mainBtn = document.createElement('button');
    mainBtn.id = 'themeToggleMain';
    mainBtn.className = 'theme-toggle-main';
    mainBtn.innerHTML = `
        <i class="fas ${currentThemeData.icon}"></i>
        <span>${currentThemeData.name}</span>
        <i class="fas fa-chevron-down" style="font-size: 0.7rem; margin-left: 0.3rem;"></i>
    `;
    
    // Cria a ABA (dropdown) que fica escondida inicialmente
    const dropdown = document.createElement('div');
    dropdown.className = 'theme-dropdown';
    
    // Lista dos temas disponíveis (apenas 4)
    const themeList = ['light', 'dark', 'purple', 'orange'];
    
    // Para cada tema, cria uma opção dentro da aba
    themeList.forEach(themeName => {
        const theme = themes[themeName];
        const option = document.createElement('button');
        option.className = 'theme-option';
        option.innerHTML = `
            <i class="fas ${theme.icon}"></i>
            <span>${theme.name}</span>
            <div class="theme-color-preview preview-${themeName}"></div>
        `;
        
        // Quando clicar na opção, aplica o tema e fecha a aba
        option.addEventListener('click', () => {
            applyTheme(themeName);
            dropdown.classList.remove('active'); // fecha a aba
            
            // Atualiza o botão principal com o novo tema
            mainBtn.innerHTML = `
                <i class="fas ${theme.icon}"></i>
                <span>${theme.name}</span>
                <i class="fas fa-chevron-down" style="font-size: 0.7rem; margin-left: 0.3rem;"></i>
            `;
        });
        
        dropdown.appendChild(option);
    });
    
    // Quando clicar no botão principal, ABRE ou FECHA a aba
    mainBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // impede que o clique "vaze" para fora
        dropdown.classList.toggle('active'); // alterna entre aberto/fechado
    });
    
    // Quando clicar em qualquer lugar FORA do seletor, fecha a aba
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Monta o seletor na página
    wrapper.appendChild(mainBtn);
    wrapper.appendChild(dropdown);
    document.body.appendChild(wrapper);
}

// ========== CARREGAR TEMA SALVO ==========
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme && themes[savedTheme]) {
    applyTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

// Remove o botão antigo (se existir) e cria o novo seletor
const oldThemeToggle = document.getElementById('themeToggle');
if (oldThemeToggle) oldThemeToggle.remove();

createThemeSelector();

// ========== O RESTO DO CÓDIGO PERMANECE IGUAL ==========
// (contadores, gráfico e player de música - não mudam)

// Contador animado
function animateNumber(element, final, duration = 1500) {
    let start = 0;
    let stepTime = 16;
    let steps = duration / stepTime;
    let increment = final / steps;
    let current = 0;
    
    let interval = setInterval(() => {
        current += increment;
        if (current >= final) {
            element.textContent = final;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

setTimeout(() => {
    const stat1 = document.getElementById('stat1');
    const stat2 = document.getElementById('stat2');
    const stat3 = document.getElementById('stat3');
    if (stat1) animateNumber(stat1, 166);
    if (stat2) animateNumber(stat2, 4);
    if (stat3) animateNumber(stat3, 3);
}, 300);

// Gráfico de contribuições
const chart = document.getElementById('contribChart');
if (chart) {
    const levels = [1,2,3,4,2,1,3,4,2,1,3,4,2,3,1,4,2,3,4,1,2,3,4,2,1,3,2,4];
    levels.forEach(lvl => {
        const day = document.createElement('div');
        day.className = `chart-day level-${lvl}`;
        chart.appendChild(day);
    });
}

// Player de música
const playlist = [
    { name: 'BAD FOR ME', file: 'songs/BAD FOR ME.mp3' },
    { name: 'Bruma em Chicago', file: 'songs/Bruma em Chicago.mp3' },
    { name: 'Fone de Ouvido e Café', file: 'songs/Fone de Ouvido e Café.mp3' },
    { name: 'Lay Your Cards', file: 'songs/Lay Your Cards.mp3' }
];

let currentTrackIndex = 0;
let audioElement = null;
let isPlaying = false;

function initAudio() {
    if (!audioElement) {
        audioElement = new Audio();
        audioElement.volume = 0.3;
        
        audioElement.addEventListener('ended', () => {
            nextTrack();
        });
        
        audioElement.addEventListener('loadedmetadata', () => {
            const span = document.getElementById('trackName');
            if (span) span.textContent = playlist[currentTrackIndex].name;
        });
        
        audioElement.addEventListener('error', () => {
            document.getElementById('trackName').textContent = '⚠️ Erro';
        });
    }
    
    audioElement.src = playlist[currentTrackIndex].file;
    audioElement.load();
    document.getElementById('trackName').textContent = playlist[currentTrackIndex].name;
}

function startMusic() {
    initAudio();
    audioElement.play().then(() => {
        isPlaying = true;
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(() => {
        document.getElementById('trackName').textContent = '🔊 Clique para ativar';
    });
}

function stopMusic() {
    if (audioElement) {
        audioElement.pause();
        isPlaying = false;
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Função para mostrar notificação da música (só no celular)
function showMusicToast(trackName) {
    // Verifica se é celular (tela pequena)
    if (window.innerWidth <= 768) {
        let toast = document.querySelector('.music-toast');
        
        // Se não existir, cria
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'music-toast';
            document.body.appendChild(toast);
        }
        
        // Atualiza o conteúdo e mostra
        toast.innerHTML = `<i class="fas fa-music"></i> ${trackName}`;
        toast.classList.add('show');
        
        // Remove após 2 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    if (audioElement) {
        const wasPlaying = isPlaying;
        audioElement.src = playlist[currentTrackIndex].file;
        audioElement.load();
        const trackName = playlist[currentTrackIndex].name;
        document.getElementById('trackName').textContent = trackName;
        
        // Mostra notificação (no celular)
        showMusicToast(trackName);
        
        if (wasPlaying) {
            audioElement.play().catch(e => console.log(e));
        }
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    if (audioElement) {
        const wasPlaying = isPlaying;
        audioElement.src = playlist[currentTrackIndex].file;
        audioElement.load();
        const trackName = playlist[currentTrackIndex].name;
        document.getElementById('trackName').textContent = trackName;
        
        // Mostra notificação (no celular)
        showMusicToast(trackName);
        
        if (wasPlaying) {
            audioElement.play().catch(e => console.log(e));
        }
    }
}

function startMusic() {
    initAudio();
    audioElement.play().then(() => {
        isPlaying = true;
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
        
        // Mostra notificação da música atual (no celular)
        showMusicToast(playlist[currentTrackIndex].name);
    }).catch(() => {
        document.getElementById('trackName').textContent = '🔊 Clique para ativar';
    });
}

const playBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevTrackBtn');
const nextBtn = document.getElementById('nextTrackBtn');

if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (!audioElement) {
            startMusic();
        } else if (isPlaying) {
            stopMusic();
        } else {
            startMusic();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTrack);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextTrack);
}

window.addEventListener('load', initAudio);
