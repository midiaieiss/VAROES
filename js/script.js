// =================================================
// INICIALIZAÇÃO PRINCIPAL
// =================================================

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
    initializeFooterLinks();
    ensureFooterVisibility();
});

// =================================================
// VARIÁVEIS GLOBAIS
// =================================================

let leftBanner, rightBanner, bannerStartPosition = 0;
let scrollTicking = false;

// =================================================
// MÓDULO: SIDE BANNERS
// =================================================

/**
 * Inicializa a funcionalidade dos banners laterais
 */
function initSideBanners() {
    leftBanner = document.querySelector('.side-banner-left');
    rightBanner = document.querySelector('.side-banner-right');
    
    if (!leftBanner || !rightBanner) {
        console.warn('Banners laterais não encontrados no DOM');
        return;
    }
    
    calculateBannerPosition();
    setupBannerScrollListener();
    addBannerHoverEffects();
    
    // Executa uma vez no carregamento
    handleBannerScroll();
}

/**
 * Calcula a posição inicial dos banners
 */
function calculateBannerPosition() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    
    if (navbar && hero) {
        bannerStartPosition = navbar.offsetHeight + hero.offsetHeight - 100;
    }
}

/**
 * Configura o listener de scroll otimizado
 */
function setupBannerScrollListener() {
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                handleBannerScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
    
    // Recalcula posições no resize
    window.addEventListener('resize', function() {
        calculateBannerPosition();
        handleBannerScroll();
        ensureFooterVisibility();
    });
}

/**
 * Controla a visibilidade dos banners baseado no scroll
 */
function handleBannerScroll() {
    const scrollY = window.scrollY;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Não mostra banners em telas pequenas
    if (viewportWidth <= 1200) {
        hideBanners();
        return;
    }
    
    // Verifica se deve mostrar os banners
    const shouldShow = scrollY > bannerStartPosition;
    
    // Verifica se o footer está visível
    const footer = document.querySelector('.footer');
    const shouldHideForFooter = footer && footer.getBoundingClientRect().top < viewportHeight + 50;
    
    if (shouldShow && !shouldHideForFooter) {
        showBanners(scrollY);
    } else {
        hideBanners();
    }
}

/**
 * Mostra os banners com posicionamento correto
 */
function showBanners(scrollY) {
    const topOffset = Math.max(20, bannerStartPosition - scrollY + 20);
    
    leftBanner.style.opacity = '1';
    rightBanner.style.opacity = '1';
    leftBanner.classList.add('visible');
    rightBanner.classList.add('visible');
    
    document.documentElement.style.setProperty('--banner-top-offset', `${topOffset}px`);
    document.documentElement.style.setProperty('--banner-bottom-offset', '20px');
}

/**
 * Esconde os banners
 */
function hideBanners() {
    if (leftBanner && rightBanner) {
        leftBanner.style.opacity = '0';
        rightBanner.style.opacity = '0';
        leftBanner.classList.remove('visible');
        rightBanner.classList.remove('visible');
    }
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
 */
function openBannerLink(side) {
    console.log(`Banner ${side} clicado`);
    
    const bannerLinks = {
        left: '#contato',
        right: '#inscricoes'
    };
    
    const link = bannerLinks[side];
    if (!link || link === '#') return;
    
    if (link.startsWith('#')) {
        const targetElement = document.querySelector(link);
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    } else {
        window.open(link, '_blank');
    }
}

// Função global para uso no HTML
window.openBannerLink = openBannerLink;

// =================================================
// MÓDULO: FOOTER
// =================================================

/**
 * Inicializa os links do footer
 */
function initializeFooterLinks() {
    initMapLink();
    initSocialLinks();
}

/**
 * Inicializa o link do mapa
 */
function initMapLink() {
    const footerMapLink = document.querySelector('.footer-map-link');
    if (!footerMapLink) return;
    
    footerMapLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const mapsUrl = 'https://www.google.com/maps/place/R.+dos+Estudantes,+77+-+Centro,+Palmas+-+TO,+77001-014/@-10.1693495,-48.3318892,17z/data=!3m1!4b1!4m6!3m5!1s0x933b33b4cf4c2ff5:0x7c4c4c4c4c4c4c4c!8m2!3d-10.1693495!4d-48.3318892!16s%2Fg%2F11c4c4c4c4';
        window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    });
}

/**
 * Inicializa os links das redes sociais
 */
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const urls = {
                'instagram-link': 'https://www.instagram.com/suaigreja/',
                'youtube-link': 'https://www.youtube.com/@suaigreja'
            };
            
            const url = Object.keys(urls).find(className => this.classList.contains(className));
            if (url && urls[url]) {
                window.open(urls[url], '_blank', 'noopener,noreferrer');
            }
        });
    });
}

/**
 * Garante que o footer seja sempre visível e clicável
 */
function ensureFooterVisibility() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    footer.style.position = 'relative';
    footer.style.zIndex = '100';
    
    const footerElements = footer.querySelectorAll('a, button, iframe');
    footerElements.forEach(element => {
        element.style.position = 'relative';
        element.style.zIndex = '101';
        element.style.pointerEvents = 'auto';
    });
}

// =================================================
// MÓDULO: GALERIA
// =================================================

/**
 * Inicializa a seção de galeria
 */
function initGallerySection() {
    createGallerySection();
    setTimeout(() => setupGalleryNavigation(), 100);
}

/**
 * Cria a estrutura HTML da galeria
 */
function createGallerySection() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent || document.querySelector('.gallery-section')) return;
    
    const gallerySection = document.createElement('div');
    gallerySection.className = 'card gallery-section';
    gallerySection.id = 'gallery-section';
    gallerySection.innerHTML = getGalleryHTML();
    
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        mainContent.insertBefore(gallerySection, contactSection);
    } else {
        mainContent.appendChild(gallerySection);
    }
}

/**
 * Retorna o HTML da galeria
 */
function getGalleryHTML() {
    const images = [
        { src: 'evento1.jpg', alt: 'Momento de oração coletiva', caption: 'Oração Coletiva' },
        { src: 'evento2.jpg', alt: 'Louvor e adoração', caption: 'Louvor & Adoração' },
        { src: 'evento3.jpg', alt: 'Pregação da Palavra', caption: 'Pregação da Palavra' },
        { src: 'evento4.jpg', alt: 'Confraternização entre irmãos', caption: 'Confraternização' },
        { src: 'evento5.jpg', alt: 'Momento de testemunho', caption: 'Testemunhos' },
        { src: 'evento6.jpg', alt: 'Foto oficial do grupo', caption: 'Foto Oficial' }
    ];
    
    const imageItems = images.map(img => `
        <div class="gallery-item">
            <img src="images/gallery/${img.src}" alt="Encontro de Varões 2024 - ${img.alt}" class="gallery-image" loading="lazy">
            <div class="gallery-caption">${img.caption}</div>
        </div>
    `).join('');
    
    return `
        <h2>🖼️ GALERIA DO EVENTO</h2>
        <div class="gallery-container">
            <button class="gallery-nav gallery-prev" aria-label="Imagem anterior">‹</button>
            <div class="gallery-wrapper">
                <div class="gallery-track" id="galleryTrack">${imageItems}</div>
            </div>
            <button class="gallery-nav gallery-next" aria-label="Próxima imagem">›</button>
        </div>
        <div class="gallery-dots" id="galleryDots"></div>
    `;
}

/**
 * Configura toda a navegação da galeria
 */
function setupGalleryNavigation() {
    const elements = getGalleryElements();
    if (!elements) return;
    
    const { track, prevBtn, nextBtn, dotsContainer, items } = elements;
    let currentIndex = 0;
    let isAnimating = false;
    let autoPlayInterval;
    
    // Cria os dots de navegação
    createGalleryDots(dotsContainer, items.length, goToSlide);
    
    // Função principal de navegação
    function goToSlide(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        currentIndex = index;
        
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateGalleryDots(currentIndex);
        
        setTimeout(() => { isAnimating = false; }, 500);
    }
    
    // Event listeners dos botões
    prevBtn.addEventListener('click', () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        goToSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        goToSlide(newIndex);
    });
    
    // Configura funcionalidades adicionais
    setupGalleryAutoPlay();
    setupGalleryTouchSupport(track);
    
    // Funções internas para auto-play
    function setupGalleryAutoPlay() {
        const galleryContainer = document.querySelector('.gallery-container');
        if (!galleryContainer) return;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                goToSlide(currentIndex);
            }, 5000);
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
        }
        
        galleryContainer.addEventListener('mouseenter', stopAutoPlay);
        galleryContainer.addEventListener('mouseleave', startAutoPlay);
        startAutoPlay();
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
    }
    
    // Touch support
    function setupGalleryTouchSupport(track) {
        let startX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const diffX = Math.abs(startX - e.touches[0].clientX);
            if (diffX > 30) e.preventDefault();
        }, { passive: false });
        
        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                } else {
                    currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                }
                goToSlide(currentIndex);
            }
            
            isDragging = false;
        }, { passive: true });
    }
}

/**
 * Obtém os elementos da galeria
 */
function getGalleryElements() {
    const track = document.getElementById('galleryTrack');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const dotsContainer = document.getElementById('galleryDots');
    const items = document.querySelectorAll('.gallery-item');
    
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return null;
    
    return { track, prevBtn, nextBtn, dotsContainer, items };
}

/**
 * Cria os dots de navegação
 */
function createGalleryDots(container, count, callback) {
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = `gallery-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => callback(i));
        container.appendChild(dot);
    }
}

/**
 * Atualiza os dots ativos
 */
function updateGalleryDots(activeIndex) {
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

// =================================================
// MÓDULO: ANIMAÇÕES E INTERAÇÕES
// =================================================

/**
 * Inicializa as animações de scroll
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const elementsToAnimate = document.querySelectorAll(
        '.card, .event-info, .contact-section, .final-cta, .gallery-section'
    );
    
    elementsToAnimate.forEach(element => observer.observe(element));
}

/**
 * Implementa lazy loading para imagens
 */
function initImageLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
                
                if (img.classList.contains('gallery-image')) {
                    img.style.opacity = '1';
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src], .gallery-image');
    lazyImages.forEach(img => {
        if (img.classList.contains('gallery-image') && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
        observer.observe(img);
    });
}

/**
 * Adiciona tracking aos botões do WhatsApp
 */
function initWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp button clicked:', this.href);
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });
}

/**
 * Adiciona interatividade aos links de vídeo
 */
function initVideoInteractions() {
    const videoLinks = document.querySelectorAll('.video-link');
    
    videoLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Video link clicked:', this.href);
            
            this.style.transform = 'scale(0.98)';
            setTimeout(() => { this.style.transform = ''; }, 100);
        });
    });
}

// =================================================
// MÓDULO: COUNTDOWN
// =================================================

/**
 * Inicializa o contador regressivo
 */
function initDateCountdown() {
    const eventDate = new Date('2025-06-01T08:00:00');
    let countdownInterval;
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = eventDate - now;
        
        if (timeLeft <= 0) {
            displayEventPassed();
            if (countdownInterval) clearInterval(countdownInterval);
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
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 60000);
}

// =================================================
// LOG DE INICIALIZAÇÃO
// =================================================

console.log('Site totalmente carregado');
