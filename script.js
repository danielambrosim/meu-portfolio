// ========== SISTEMA DE TEMAS (CLARO/ESCURO + CORES) ==========

// Definição de todos os temas disponíveis com suas cores
const themes = {
    light: {
        name: 'Claro',
        icon: 'fa-sun',
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
    green: {
        name: 'Verde',
        icon: 'fa-leaf',
        colors: {
            '--bg-primary': '#0a1a0a',
            '--bg-secondary': '#1a2e1a',
            '--bg-card': '#162a16',
            '--text-primary': '#e0ffe0',
            '--text-secondary': '#a0c0a0',
            '--border-color': '#2a4a2a',
            '--border-hover': '#3a5a3a',
            '--accent': '#10b981',
            '--accent-hover': '#34d399',
            '--accent-rgb': '16, 185, 129',
            '--navbar-bg': 'rgba(10, 26, 10, 0.85)',
            '--badge-bg': '#2a4a2a',
            '--card-shadow': '0 4px 12px rgba(0, 0, 0, 0.3)',
            '--card-shadow-hover': '0 20px 35px -12px rgba(16, 185, 129, 0.15)'
        }
    },
    orange: {
        name: 'Laranja',
        icon: 'fa-fire',
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
    },
    pink: {
        name: 'Rosa',
        icon: 'fa-heart',
        colors: {
            '--bg-primary': '#1a0a14',
            '--bg-secondary': '#2e1a26',
            '--bg-card': '#2a1622',
            '--text-primary': '#ffe0f0',
            '--text-secondary': '#c0a0b0',
            '--border-color': '#4a2a3a',
            '--border-hover': '#5a3a4a',
            '--accent': '#ec4899',
            '--accent-hover': '#f472b6',
            '--accent-rgb': '236, 72, 153',
            '--navbar-bg': 'rgba(26, 10, 20, 0.85)',
            '--badge-bg': '#4a2a3a',
            '--card-shadow': '0 4px 12px rgba(0, 0, 0, 0.3)',
            '--card-shadow-hover': '0 20px 35px -12px rgba(236, 72, 153, 0.15)'
        }
    }
};

// Função para aplicar um tema específico
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    // Pega o elemento raiz do HTML (tag <html>)
    const root = document.documentElement;
    
    // Aplica cada variável CSS definida no tema
    for (const [property, value] of Object.entries(theme.colors)) {
        root.style.setProperty(property, value);
    }
    
    // Salva o atributo data-theme no HTML e no localStorage
    root.setAttribute('data-theme', themeName);
    localStorage.setItem('selectedTheme', themeName);
    
    // Atualiza o ícone do botão de tema
    const themeToggleIcon = document.querySelector('#themeToggle i');
    if (themeToggleIcon) {
        themeToggleIcon.className = `fas ${theme.icon}`;
    }
}

// Cria o seletor de temas (as bolinhas coloridas)
function createThemeSelector() {
    // Remove seletor antigo para evitar duplicação
    const existingSelector = document.getElementById('themeSelector');
    if (existingSelector) existingSelector.remove();
    
    // Cria o container do seletor
    const selector = document.createElement('div');
    selector.id = 'themeSelector';
    selector.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 90px;
        z-index: 200;
        background: var(--bg-card);
        border-radius: 48px;
        padding: 0.4rem 0.8rem;
        display: flex;
        gap: 0.5rem;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        border: 0.5px solid var(--border-color);
        backdrop-filter: blur(10px);
    `;
    
    // Cria um botão para cada tema
    const themeList = ['light', 'dark', 'purple', 'green', 'orange', 'pink'];
    themeList.forEach(themeName => {
        const theme = themes[themeName];
        const btn = document.createElement('button');
        btn.innerHTML = `<i class="fas ${theme.icon}"></i>`;
        btn.style.cssText = `
            background: transparent;
            border: none;
            color: var(--text-primary);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            font-size: 0.9rem;
        `;
        btn.setAttribute('aria-label', `Tema ${theme.name}`);
        btn.addEventListener('click', () => applyTheme(themeName));
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(var(--accent-rgb), 0.2)';
            btn.style.transform = 'scale(1.1)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'transparent';
            btn.style.transform = 'scale(1)';
        });
        selector.appendChild(btn);
    });
    
    document.body.appendChild(selector);
}

// Carrega o tema salvo ou detecta preferência do sistema
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme && themes[savedTheme]) {
    applyTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

// Cria o seletor de temas
createThemeSelector();

// Botão principal de alternância (cicla entre os temas)
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const themesList = ['light', 'dark', 'purple', 'green', 'orange', 'pink'];
        let nextIndex = (themesList.indexOf(current) + 1) % themesList.length;
        applyTheme(themesList[nextIndex]);
    });
}

// ========== CONTADOR ANIMADO ==========
// Faz os números subirem de 0 até o valor final suavemente
function animateNumber(element, final, duration = 1500) {
    let start = 0;
    let stepTime = 16; // 60fps (1000ms / 60 ≈ 16ms)
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

// Inicia os contadores após um pequeno delay
setTimeout(() => {
    const stat1 = document.getElementById('stat1');
    const stat2 = document.getElementById('stat2');
    const stat3 = document.getElementById('stat3');
    if (stat1) animateNumber(stat1, 166);
    if (stat2) animateNumber(stat2, 4);
    if (stat3) animateNumber(stat3, 3);
}, 300);

// ========== GRÁFICO DE CONTRIBUIÇÕES ==========
// Cria os quadradinhos coloridos simulando atividade do GitHub
const chart = document.getElementById('contribChart');
if (chart) {
    // Níveis de atividade (1=baixa, 4=alta)
    const levels = [1,2,3,4,2,1,3,4,2,1,3,4,2,3,1,4,2,3,4,1,2,3,4,2,1,3,2,4];
    levels.forEach(lvl => {
        const day = document.createElement('div');
        day.className = `chart-day level-${lvl}`;
        chart.appendChild(day);
    });
}

// ========== PLAYER DE MÚSICA ==========
// Lista de músicas (você pode adicionar ou remover)
const playlist = [
    { name: 'BAD FOR ME', file: 'songs/BAD FOR ME.mp3' },
    { name: 'Bruma em Chicago', file: 'songs/Bruma em Chicago.mp3' },
    { name: 'Fone de Ouvido e Café', file: 'songs/Fone de Ouvido e Café.mp3' },
    { name: 'Lay Your Cards', file: 'songs/Lay Your Cards.mp3' }
];

let currentTrackIndex = 0;
let audioElement = null;
let isPlaying = false;

// Inicializa o player de áudio
function initAudio() {
    if (!audioElement) {
        audioElement = new Audio();
        audioElement.volume = 0.3; // Volume 30%
        
        // Quando a música acabar, toca a próxima
        audioElement.addEventListener('ended', () => {
            nextTrack();
        });
        
        // Quando carregar, mostra o nome da música
        audioElement.addEventListener('loadedmetadata', () => {
            const span = document.getElementById('trackName');
            if (span) span.textContent = playlist[currentTrackIndex].name;
        });
        
        // Em caso de erro (arquivo não encontrado)
        audioElement.addEventListener('error', () => {
            document.getElementById('trackName').textContent = '⚠️ Erro';
        });
    }
    
    audioElement.src = playlist[currentTrackIndex].file;
    audioElement.load();
    document.getElementById('trackName').textContent = playlist[currentTrackIndex].name;
}

// Toca a música atual
function startMusic() {
    initAudio();
    audioElement.play().then(() => {
        isPlaying = true;
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(() => {
        document.getElementById('trackName').textContent = '🔊 Clique para ativar';
    });
}

// Pausa a música
function stopMusic() {
    if (audioElement) {
        audioElement.pause();
        isPlaying = false;
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Próxima música
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    if (audioElement) {
        const wasPlaying = isPlaying;
        audioElement.src = playlist[currentTrackIndex].file;
        audioElement.load();
        document.getElementById('trackName').textContent = playlist[currentTrackIndex].name;
        if (wasPlaying) {
            audioElement.play().catch(e => console.log(e));
        }
    }
}

// Música anterior
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    if (audioElement) {
        const wasPlaying = isPlaying;
        audioElement.src = playlist[currentTrackIndex].file;
        audioElement.load();
        document.getElementById('trackName').textContent = playlist[currentTrackIndex].name;
        if (wasPlaying) {
            audioElement.play().catch(e => console.log(e));
        }
    }
}

// Conecta os botões do player
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

// Inicializa o player quando a página carregar
window.addEventListener('load', initAudio);
