// Script principal para o site do Encontro de Varões
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site Encontro de Varões carregado com sucesso!');
    
    // Inicializa as funcionalidades
    initScrollAnimations();
    initImageLazyLoading();
    initWhatsAppTracking();
    initVideoInteractions();
    initDateCountdown();
});

// Animações ao fazer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observa elementos que devem animar
    const animatedElements = document.querySelectorAll('.card, .event-info, .contact-section, .final-cta');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Lazy loading para imagens
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Rastreamento de cliques no WhatsApp
function initWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Analytics tracking (se necessário)
            console.log('WhatsApp button clicked:', this.href);
            
            // Adiciona efeito visual de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Interações com vídeos
function initVideoInteractions() {
    const videoLinks = document.querySelectorAll('.video-link');
    const videoEmbeds = document.querySelectorAll('.video-embed');
    
    // Tracking de cliques nos links dos vídeos
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Video link clicked:', this.href);
            
            // Efeito visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    // Detecta quando vídeos começam a carregar
    videoEmbeds.forEach(embed => {
        embed.addEventListener('load', function() {
            console.log('Video embed loaded');
            this.style.opacity = '1';
        });
    });
}

// Contador regressivo para o evento
function initDateCountdown() {
    const eventDate = new Date('2025-03-15T08:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = eventDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            // Cria elemento de contagem regressiva se não existir
            let countdownEl = document.getElementById('countdown');
            if (!countdownEl) {
                countdownEl = document.createElement('div');
                countdownEl.id = 'countdown';
                countdownEl.className = 'countdown-timer';
                
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.appendChild(countdownEl);
                }
            }
            
            countdownEl.innerHTML = `
                <div class="countdown-title">⏰ FALTAM APENAS:</div>
                <div class="countdown-numbers">
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">DIAS</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">HORAS</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">MINUTOS</span>
                    </div>
                </div>
            `;
        }
    }
    
    // Atualiza a cada minuto
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Efeitos de hover para cartões
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Smooth scroll para links internos (se houver)
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Adiciona classes CSS dinâmicas para animações
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .countdown-timer {
            background: rgba(0, 0, 0, 0.7);
            border-radius: 15px;
            padding: 25px;
            margin-top: 30px;
            border: 2px solid #ff6b00;
        }
        
        .countdown-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: #ff6b00;
            margin-bottom: 20px;
            text-transform: uppercase;
        }
        
        .countdown-numbers {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
        }
        
        .countdown-item {
            text-align: center;
            background: rgba(255, 107, 0, 0.1);
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #ff6b00;
            min-width: 80px;
        }
        
        .countdown-number {
            display: block;
            font-size: 2.5rem;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }
        
        .countdown-label {
            display: block;
            font-size: 0.9rem;
            color: #ff6b00;
            font-weight: 700;
            text-transform: uppercase;
            margin-top: 5px;
        }
        
        .lazy {
            opacity: 0.5;
            transition: opacity 0.3s;
        }
        
        @media (max-width: 768px) {
            .countdown-numbers {
                gap: 15px;
            }
            
            .countdown-item {
                min-width: 70px;
                padding: 12px;
            }
            
            .countdown-number {
                font-size: 2rem;
            }
            
            .countdown-title {
                font-size: 1.3rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Inicializa estilos dinâmicos
addDynamicStyles();

// Performance: Remove event listeners quando necessário
window.addEventListener('beforeunload', function() {
    // Cleanup se necessário
    console.log('Limpando event listeners...');
});

// Detecta se o usuário está usando dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajusta comportamento para mobile
if (isMobile()) {
    document.body.classList.add('mobile-device');
    
    // Reduz animações para melhor performance em mobile
    const style = document.createElement('style');
    style.textContent = `
        .mobile-device * {
            animation-duration: 0.3s !important;
            transition-duration: 0.3s !important;
        }
    `;
    document.head.appendChild(style);
}

console.log('🔥 Site Encontro de Varões totalmente carregado! 🛡️');
