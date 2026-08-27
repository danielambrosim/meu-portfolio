// ========== CONFIGURAÇÃO DO EMAILJS ==========
// 1. Crie/acesse sua conta em https://www.emailjs.com/
// 2. EMAILJS_PUBLIC_KEY: painel EmailJS > Account > General > "Public Key"
// 3. EMAILJS_TEMPLATE_ID: painel EmailJS > Email Templates > abra (ou crie) o template usado
//    para este e-mail > o ID aparece no topo da página do template (ex: "template_xxxxxxx")
//    O template deve usar as variáveis: {{to_name}}, {{to_email}}, {{resume_url}}
// EMAILJS_SERVICE_ID já está configurado (Gmail conectado via painel EmailJS)
const EMAILJS_PUBLIC_KEY = 'COLE_AQUI_SUA_PUBLIC_KEY';
const EMAILJS_TEMPLATE_ID = 'COLE_AQUI_SEU_TEMPLATE_ID';
const EMAILJS_SERVICE_ID = 'service_o3v8d0h';
const RESUME_PDF_URL = 'https://danielambrosim.github.io/meu-portfolio/curriculo-daniel-ambrosim-colodete.pdf';

if (window.emailjs && !EMAILJS_PUBLIC_KEY.startsWith('COLE_AQUI')) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

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

// ========== FORMULÁRIO DE CAPTAÇÃO DE CURRÍCULO ==========
const resumeForm = document.getElementById('resumeForm');
if (resumeForm) {
    const resumeSubmitBtn = document.getElementById('resumeSubmitBtn');
    const resumeSubmitText = document.getElementById('resumeSubmitText');
    const resumeFeedback = document.getElementById('resumeFeedback');

    function setResumeFeedback(message, type) {
        resumeFeedback.textContent = message;
        resumeFeedback.className = type ? `form-feedback ${type}` : 'form-feedback';
    }

    resumeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        setResumeFeedback('', null);

        const nameField = document.getElementById('resumeName');
        const emailField = document.getElementById('resumeEmail');
        const consentField = document.getElementById('resumeConsent');
        const honeypotField = document.getElementById('resumeWebsite');

        // Honeypot preenchido indica bot: ignora o envio silenciosamente
        if (honeypotField.value) return;

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 2) {
            setResumeFeedback('Digite um nome válido (mínimo 2 caracteres).', 'error');
            return;
        }

        if (!emailRegex.test(email)) {
            setResumeFeedback('Digite um e-mail válido.', 'error');
            return;
        }

        if (!consentField.checked) {
            setResumeFeedback('É necessário concordar em receber este e-mail para continuar.', 'error');
            return;
        }

        if (!window.emailjs || EMAILJS_PUBLIC_KEY.startsWith('COLE_AQUI') || EMAILJS_TEMPLATE_ID.startsWith('COLE_AQUI')) {
            setResumeFeedback('Envio indisponível no momento. Tente novamente mais tarde.', 'error');
            return;
        }

        resumeSubmitBtn.disabled = true;
        resumeSubmitText.textContent = 'Enviando...';

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_name: name,
            to_email: email,
            resume_url: RESUME_PDF_URL
        }).then(() => {
            setResumeFeedback('Currículo enviado! Verifique sua caixa de entrada.', 'success');
            resumeForm.reset();
        }).catch(() => {
            setResumeFeedback('Erro ao enviar. Tente novamente em instantes.', 'error');
        }).finally(() => {
            resumeSubmitBtn.disabled = false;
            resumeSubmitText.textContent = 'Receber currículo';
        });
    });
}

// ========== MICROINTERAÇÕES DE SCROLL (REVEAL) ==========
const revealTargets = document.querySelectorAll(
    'main section, .project-card, .video-card, .stat-card, .resume-card, .contact-card'
);
const _prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealTargets.length) {
    if (_prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach(el => el.classList.add('reveal-visible'));
    } else {
        revealTargets.forEach(el => el.classList.add('reveal'));

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        revealTargets.forEach(el => revealObserver.observe(el));
    }
}

// ========== HERO STARFIELD (canvas) ==========
(function initStarfield(){
    const canvas = document.getElementById('starfield');
    if(!canvas) return;
    if(_prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    let w, h, stars=[], rafId=null;
    let mouseX=0, mouseY=0;
    const STAR_COUNT_DESKTOP=180, STAR_COUNT_MOBILE=80;
    function resize(){
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio||1, 2);
        w = rect.width; h = rect.height;
        canvas.width = w*dpr; canvas.height = h*dpr;
        canvas.style.width = w+'px'; canvas.style.height = h+'px';
        ctx.setTransform(dpr,0,0,dpr,0,0);
        const count = window.innerWidth < 768 ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;
        stars = Array.from({length: count}, () => ({
            x: Math.random()*w,
            y: Math.random()*h,
            r: Math.random()*1.4+0.2,
            o: Math.random()*0.6+0.2,
            tw: Math.random()*0.03+0.005,
            vx: (Math.random()-0.5)*0.2,
            depth: Math.random()*0.8+0.2
        }));
    }
    function tick(){
        ctx.clearRect(0,0,w,h);
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#0071e3';
        stars.forEach(s=>{
            s.x += s.vx + mouseX*s.depth*0.02;
            s.o += s.tw * (Math.random()>0.5?1:-1);
            s.o = Math.max(0.15, Math.min(0.9, s.o));
            if(s.x < 0) s.x = w;
            if(s.x > w) s.x = 0;
            // subtle color variation
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
            ctx.fillStyle = s.r > 1 ? accent : `rgba(255,255,255,${s.o})`;
            // for larger stars use accent with alpha
            if(s.r > 1){
                ctx.globalAlpha = s.o*0.9;
            } else {
                ctx.globalAlpha = s.o;
            }
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        // shooting star occasionally
        if(Math.random() < 0.008){
            const sx = Math.random()*w*0.6;
            const sy = Math.random()*h*0.4;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx+60, sy+12);
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        rafId = requestAnimationFrame(tick);
    }
    window.addEventListener('mousemove', e=>{
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left)/w -0.5)*2;
        mouseY = ((e.clientY - rect.top)/h -0.5)*2;
    }, {passive:true});
    window.addEventListener('resize', resize);
    resize();
    tick();
    document.addEventListener('visibilitychange', ()=>{
        if(document.hidden) cancelAnimationFrame(rafId);
        else tick();
    });
})();

// ========== HERO TYPING (highlight) ==========
(function heroTyping(){
    if(_prefersReducedMotion) return;
    const el = document.getElementById('heroTyping');
    if(!el) return;
    const words = ['Lógica da Programação','TypeScript','APIs Escaláveis','Produto & Código'];
    let wi=0, ci=words[0].length, deleting=false;
    const typeSpeed=90, deleteSpeed=45, holdTime=1800, pauseBetween=300;
    function tick(){
        const word = words[wi];
        if(!deleting){
            ci++;
            el.textContent = word.slice(0, ci);
            if(ci===word.length){
                deleting=true;
                setTimeout(tick, holdTime);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            ci--;
            el.textContent = word.slice(0, ci);
            if(ci===0){
                deleting=false;
                wi=(wi+1)%words.length;
                setTimeout(tick, pauseBetween);
                return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }
    setTimeout(tick, 3200);
})();

// ========== FLEET FILTER + MODAL ==========
(function fleet(){
    const grid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card[data-project]');
    const modal = document.getElementById('projectModal');
    if(!grid || !modal) return;
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalIcon = document.getElementById('modalIcon');
    const modalStack = document.getElementById('modalStack');
    const modalLink = document.getElementById('modalLink');
    const modalCopy = document.getElementById('modalCopy');
    const data = {
        deck: { title:'Deck-Finder-Bot', desc:'Bot inteligente para Telegram que auxilia jogadores a encontrar decks, estratégias e meta analysis com integração à API do jogo. Feito com TypeScript + Telegraf.', icon:'<i class="fab fa-telegram"></i>', stack:['TypeScript','Node.js','Telegram API','Telegraf'], link:'https://github.com/danielambrosim/Deck-Finder-Bot' },
        crypto: { title:'Crypto Wallet API', desc:'API REST resiliente para carteiras de criptomoedas com autenticação JWT, controle de saldo e histórico. Express + JWT + validação robusta.', icon:'<i class="fas fa-coins"></i>', stack:['JavaScript','Node.js','Express','JWT'], link:'https://github.com/danielambrosim/crypto-wallet-api' },
        cotacao: { title:'App_Cotacao', desc:'Aplicação web responsiva que consome APIs financeiras em tempo real, com cache e UI otimizada para mobile.', icon:'<i class="fas fa-chart-line"></i>', stack:['HTML5','CSS3','JavaScript','Fetch API'], link:'https://github.com/danielambrosim/App_Cotacao' }
    };
    filterBtns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            filterBtns.forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            cards.forEach(c=>{
                const tech = (c.dataset.tech||'').toLowerCase();
                const show = f==='all' || tech.includes(f);
                c.classList.toggle('filtered-out', !show);
                if(show){ c.classList.remove('reveal-visible'); void c.offsetWidth; c.classList.add('reveal-visible'); }
            });
        });
    });
    function open(key, cardEl){
        const d = data[key];
        if(!d) return;
        modalTitle.textContent = d.title;
        modalDesc.textContent = d.desc;
        modalIcon.innerHTML = d.icon;
        modalStack.innerHTML = d.stack.map(s=>`<span>${s}</span>`).join('');
        modalLink.href = d.link;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
        document.body.style.overflow='hidden';
        modalClose.focus();
    }
    function close(){
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden','true');
        document.body.style.overflow='';
    }
    cards.forEach(c=>{
        c.addEventListener('click', ()=> open(c.dataset.project, c));
        c.addEventListener('keydown', e=>{
            if(e.key==='Enter' || e.key===' '){ e.preventDefault(); open(c.dataset.project, c); }
        });
        // tilt effect desktop
        if(window.innerWidth>768 && !_prefersReducedMotion){
            c.addEventListener('mousemove', e=>{
                const r=c.getBoundingClientRect();
                const x=(e.clientX - r.left)/r.width -0.5;
                const y=(e.clientY - r.top)/r.height -0.5;
                c.style.transform=`translateY(-6px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`;
            });
            c.addEventListener('mouseleave', ()=>{ c.style.transform=''; });
        }
    });
    modalClose.addEventListener('click', close);
    modalBackdrop.addEventListener('click', close);
    document.addEventListener('keydown', e=>{ if(e.key==='Escape' && modal.classList.contains('open')) close(); });
    modalCopy.addEventListener('click', async ()=>{
        try{ await navigator.clipboard.writeText(modalLink.href); modalCopy.innerHTML='<i class="fas fa-check"></i> Copiado!'; setTimeout(()=> modalCopy.innerHTML='<i class="fas fa-link"></i> Copiar link',1500);}catch{}
    });
})();

// ========== NAVBAR ORBITAL (hamburger + scroll spy + progress + hide on scroll) ==========
(function navbarOrbital(){
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const toggle = document.getElementById('navToggle');
    const overlay = document.getElementById('navOverlay');
    const progress = document.getElementById('navProgress');
    const linkEls = document.querySelectorAll('.nav-links a[data-section]');
    if(!navbar || !navLinks || !toggle) return;
    function openMenu(){ navLinks.classList.add('open'); toggle.classList.add('open'); toggle.setAttribute('aria-expanded','true'); overlay.classList.add('show'); document.body.style.overflow='hidden'; }
    function closeMenu(){ navLinks.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); overlay.classList.remove('show'); document.body.style.overflow=''; }
    toggle.addEventListener('click', ()=> navLinks.classList.contains('open') ? closeMenu() : openMenu());
    if(overlay) overlay.addEventListener('click', closeMenu);
    linkEls.forEach(a=> a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeMenu(); });
    // scroll progress + hide on scroll
    let lastY = window.scrollY;
    function onScroll(){
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const p = docH>0 ? y/docH : 0;
        if(progress) progress.style.transform = `scaleX(${p})`;
        if(y>80) navbar.classList.add('nav-scrolled'); else navbar.classList.remove('nav-scrolled');
        // hide when scrolling down, show when up
        if(y > lastY && y>200 && !navLinks.classList.contains('open')) navbar.classList.add('nav-hidden');
        else navbar.classList.remove('nav-hidden');
        lastY = y;
        // scroll spy
        let current='';
        document.querySelectorAll('main section[id]').forEach(sec=>{
            const top = sec.offsetTop - 140;
            if(y >= top) current = sec.id;
        });
        linkEls.forEach(a=> a.classList.toggle('active', a.dataset.section===current));
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
    // close menu on resize to desktop
    window.addEventListener('resize', ()=>{ if(window.innerWidth>768) closeMenu(); });
})();
