/**
 * ENCONTRO DE VARÕES 2025 - JAVASCRIPT PRINCIPAL
 * Arquivo: js/script.js
 * 
 * Este arquivo contém toda a lógica JavaScript limpa e otimizada
 */

// =================================================
// INICIALIZAÇÃO PRINCIPAL
// =================================================

/**
 * Event listener principal que inicializa todas as funcionalidades
 * quando o DOM estiver completamente carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site carregado com sucesso!');
    
    // Inicializa todos os módulos da aplicação
    initScrollAnimations();
    initImageLazyLoading();
    initWhatsAppTracking();
    initVideoInteractions();
    initDateCountdown();
    initSideBanners();
    initGallerySection();
});

// =================================================
// MÓDULO: SIDE BANNERS
// =================================================

/**
 * Inicializa a funcionalidade dos banners laterais
 * Controla a opacidade baseada no scroll da página
 */
function initSideBanners() {
    const leftBanner = document.querySelector('.side-banner-left');
    const rightBanner = document.querySelector('.side-banner-right');
    
    // Verifica se os elementos existem antes de adicionar eventos
    if (!leftBanner || !rightBanner) {
        console.warn('Banners laterais não encontrados no DOM');
        return;
    }
    
    // Calcula a posição inicial dos banners
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    let bannerStartPosition = 0;
    
    if (navbar && hero) {
        bannerStartPosition = navbar.offsetHeight + hero.offsetHeight - 100;
    }
    
    /**
     * Handler do evento scroll para controlar visibilidade dos banners
     */
    function handleBannerScroll() {
        const scrollY = window.scrollY;
        const shouldShow = scrollY > bannerStartPosition;
        const viewportWidth = window.innerWidth;
        const containerMaxWidth = 900; // Valor do CSS --container-max-width
        
        // Só mostra banners se houver espaço suficiente
        if (viewportWidth <= 1200) {
            leftBanner.style.opacity = '0';
            rightBanner.style.opacity = '0';
            leftBanner.classList.remove('visible');
            rightBanner.classList.remove('visible');
            return;
        }
        
        // Calcula a posição do rodapé
        const footer = document.querySelector('.footer');
        const footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollBottom = scrollY + viewportHeight;
        
        // Define a distância mínima do rodapé
        const footerBuffer = 50;
        let bottomOffset = 20;
        
        // Se o rodapé estiver próximo da viewport, ajusta o bottom dos banners
        if (scrollBottom > footerTop - footerBuffer) {
            const overlapAmount = scrollBottom - (footerTop - footerBuffer);
            bottomOffset = Math.max(20, overlapAmount + footerBuffer);
        }
        
        if (shouldShow) {
            leftBanner.style.opacity = '1';
            rightBanner.style.opacity = '1';
            leftBanner.classList.add('visible');
            rightBanner.classList.add('visible');
            
            // Define a posição top dinamicamente
            const topOffset = Math.max(20, bannerStartPosition - scrollY + 20);
            document.documentElement.style.setProperty('--banner-top-offset', `${topOffset}px`);
            document.documentElement.style.setProperty('--banner-bottom-offset', `${bottomOffset}px`);
        } else {
            leftBanner.style.opacity = '0';
            rightBanner.style.opacity = '0';
            leftBanner.classList.remove('visible');
            rightBanner.classList.remove('visible');
        }
    }
    
    // Adiciona o event listener otimizado para scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleBannerScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Executa uma vez no carregamento
    handleBannerScroll();
    
    // Recalcula posições no resize
    window.addEventListener('resize', function() {
        if (navbar && hero) {
            bannerStartPosition = navbar.offsetHeight + hero.offsetHeight - 100;
            handleBannerScroll();
        }
    });
    
    // Adiciona hover effects para os banners laterais
    addBannerHoverEffects();
}

/**
 * Adiciona efeitos hover aos banners laterais
 */
function addBannerHoverEffects() {
    const bannerImages = document.querySelectorAll('.banner-image');
    
    bannerImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1) contrast(1)';
        });
    });
}

/**
 * Handler para cliques nos banners laterais
 * @param {string} side - Lado do banner ('left' ou 'right')
 */
function openBannerLink(side) {
    console.log(`Banner ${side} clicado`);
    
    // URLs dos banners - substitua pelos links reais
    const bannerLinks = {
        left: '#contato', // Link para seção de contato
        right: '#inscricoes' // Link para inscrições
    };
    
    if (bannerLinks[side] && bannerLinks[side] !== '#') {
        // Se for um link interno, faz scroll suave
        if (bannerLinks[side].startsWith('#')) {
            const targetElement = document.querySelector(bannerLinks[side]);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        } else {
            window.open(bannerLinks[side], '_blank');
        }
    }
}

// Torna a função global para uso no HTML (onclick)
window.openBannerLink = openBannerLink;

// =================================================
// MÓDULO: GALERIA
// =================================================

/**
 * Inicializa a seção de galeria
 */
function initGallerySection() {
    createGallerySection();
    setupGalleryNavigation();
}

/**
 * Cria a estrutura da galeria de acordo com o CSS
 */
function createGallerySection() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Verifica se a galeria já existe
    if (document.querySelector('.gallery-section')) return;
    
    // Cria a seção da galeria seguindo o padrão do CSS
    const gallerySection = document.createElement('div');
    gallerySection.className = 'card gallery-section';
    gallerySection.id = 'gallery-section';
    
    gallerySection.innerHTML = `
        <h2>🖼️ GALERIA DO EVENTO</h2>
        <div class="gallery-container">
            <button class="gallery-nav gallery-prev" aria-label="Imagem anterior">‹</button>
            <div class="gallery-wrapper">
                <div class="gallery-track" id="galleryTrack">
                    <div class="gallery-item">
                        <img src="images/gallery/evento1.jpg" alt="Encontro de Varões 2024 - Momento de oração coletiva" class="gallery-image" loading="lazy">
                        <div class="gallery-caption">Oração Coletiva</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/gallery/evento2.jpg" alt="Encontro de Varões 2024 - Louvor e adoração" class="gallery-image" loading="lazy">
                        <div class="gallery-caption">Louvor & Adoração</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/gallery/evento3.jpg" alt="Encontro de Varões 2024 - Pregação da Palavra" class="gallery-image" loading="lazy">
                        <div class="gallery-caption">Pregação da Palavra</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/gallery/evento4.jpg" alt="Encontro de Varões 2024 - Confraternização entre irmãos" class="gallery-image" loading="lazy">
                        <div class="gallery-caption">Confraternização</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/gallery/evento5.jpg" alt="Encontro de Varões 2024 - Momento de testemunho" class="gallery-image" loading="lazy">
                        <div class="gallery-caption">Testemunhos</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/gallery/evento6.jpg" alt="Encontro de Varões 2024 - Foto oficial do grupo" class="gallery-image" loading="lazy">
                        <div class="gallery-caption">Foto Oficial</div>
                    </div>
                </div>
            </div>
            <button class="gallery-nav gallery-next" aria-label="Próxima imagem">›</button>
        </div>
        <div class="gallery-dots" id="galleryDots"></div>
    `;
    
    // Insere a galeria antes da seção de contatos
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        mainContent.insertBefore(gallerySection, contactSection);
    } else {
        mainContent.appendChild(gallerySection);
    }
}

/**
 * Configura a navegação da galeria
 */
function setupGalleryNavigation() {
    setTimeout(() => {
        const track = document.getElementById('galleryTrack');
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        const dotsContainer = document.getElementById('galleryDots');
        
        if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
        
        const items = document.querySelectorAll('.gallery-item');
        let currentIndex = 0;
        let isAnimating = false;
        
        // Cria os dots
        items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Função para ir para slide específico
        function goToSlide(index) {
            if (isAnimating) return;
            
            isAnimating = true;
            currentIndex = index;
            
            // Move o track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Atualiza dots
            const dots = document.querySelectorAll('.gallery-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
            
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }
        
        // Navegação com botões
        prevBtn.addEventListener('click', () => {
            const newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            goToSlide(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            goToSlide(newIndex);
        });
        
        // Auto-play
        setupGalleryAutoPlay(goToSlide, items.length);
        
        // Touch support
        addGalleryTouchSupport(track, goToSlide, items.length);
        
    }, 100);
}

/**
 * Configura o auto-play da galeria
 */
function setupGalleryAutoPlay(goToSlideCallback, totalSlides) {
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 segundos
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            goToSlideCallback(currentIndex);
        }, autoPlayDelay);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', stopAutoPlay);
        galleryContainer.addEventListener('mouseleave', startAutoPlay);
        startAutoPlay();
        
        // Para quando a aba não está visível
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
    }
}

/**
 * Adiciona suporte a touch/swipe para a galeria
 */
function addGalleryTouchSupport(track, goToSlideCallback, totalSlides) {
    let startX = 0;
    let currentIndex = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        // Previne scroll se movimento horizontal for maior
        if (Math.abs(diffX) > 30) {
            e.preventDefault();
        }
    }, { passive: false });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - próximo
                currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            } else {
                // Swipe right - anterior
                currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            }
            goToSlideCallback(currentIndex);
        }
        
        isDragging = false;
    }, { passive: true });
}

// =================================================
// MÓDULO: ANIMAÇÕES DE SCROLL
// =================================================

/**
 * Inicializa as animações baseadas em scroll usando Intersection Observer
 */
function initScrollAnimations() {
    const observerConfig = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerConfig);
    
    // Observa todos os elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll(
        '.card, .event-info, .contact-section, .final-cta, .gallery-section'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// =================================================
// MÓDULO: LAZY LOADING DE IMAGENS
// =================================================

/**
 * Implementa lazy loading para imagens
 */
function initImageLazyLoading() {
    const imageCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Para imagens com data-src
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
                
                // Para imagens da galeria
                if (img.classList.contains('gallery-image')) {
                    img.style.opacity = '1';
                    imageObserver.unobserve(img);
                }
            }
        });
    };
    
    const imageObserver = new IntersectionObserver(imageCallback);
    
    // Observa todas as imagens lazy
    const lazyImages = document.querySelectorAll('img[data-src], .gallery-image');
    lazyImages.forEach(img => {
        if (img.classList.contains('gallery-image') && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
        imageObserver.observe(img);
    });
}

// =================================================
// MÓDULO: WHATSAPP TRACKING
// =================================================

/**
 * Adiciona tracking aos botões do WhatsApp
 */
function initWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            console.log('WhatsApp button clicked:', this.href);
            
            // Feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// =================================================
// MÓDULO: VÍDEO INTERACTIONS
// =================================================

/**
 * Adiciona interatividade aos links de vídeo
 */
function initVideoInteractions() {
    const videoLinks = document.querySelectorAll('.video-link');
    
    videoLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            console.log('Video link clicked:', this.href);
            
            // Feedback visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// =================================================
// MÓDULO: COUNTDOWN
// =================================================

/**
 * Inicializa o contador regressivo para o evento
 */
function initDateCountdown() {
    // Data do evento - 01 de junho de 2025 às 8h
    const eventDate = new Date('2025-06-01T08:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = eventDate - now;
        
        if (timeLeft <= 0) {
            displayEventPassed();
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        createOrUpdateCountdownDisplay(days, hours, minutes);
    }
    
    function createOrUpdateCountdownDisplay(days, hours, minutes) {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        let countdownEl = document.getElementById('countdown');
        
        if (!countdownEl) {
            countdownEl = document.createElement('div');
            countdownEl.id = 'countdown';
            countdownEl.className = 'countdown-timer';
            heroContent.appendChild(countdownEl);
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
    
    function displayEventPassed() {
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.innerHTML = `
                <div class="countdown-title">🎉 O EVENTO JÁ ACONTECEU!</div>
                <div class="countdown-numbers">
                    <div class="countdown-item">
                        <span class="countdown-number">✅</span>
                        <span class="countdown-label">CONCLUÍDO</span>
                    </div>
                </div>
            `;
        }
    }
    
    // Executa a primeira atualização
    updateCountdown();
    
    // Configura atualização automática a cada minuto
    const countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = eventDate - now;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            displayEventPassed();
        } else {
            updateCountdown();
        }
    }, 60000);
}

// =================================================
// LOG DE INICIALIZAÇÃO
// =================================================

console.log('Site totalmente carregado!');
