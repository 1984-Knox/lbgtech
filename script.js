// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Alternar ícone do menu
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Restaurar ícone do menu
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Slider de Depoimentos
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // Função para mostrar um slide específico
    function showSlide(index) {
        // Atualizar a posição do slider
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        
        // Atualizar os dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Inicializar o slider
    showSlide(0);
    
    // Adicionar evento de clique aos dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
        });
    });
    
    // Avançar slide automaticamente a cada 5 segundos
    setInterval(() => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= testimonials.length) {
            nextSlide = 0;
        }
        showSlide(nextSlide);
    }, 5000);
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-toggle').textContent = '+';
                }
            });
            
            // Alternar o estado do item atual
            item.classList.toggle('active');
            toggle.textContent = item.classList.contains('active') ? '-' : '+';
        });
    });
    
    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulação de envio do formulário
            alert('Obrigado pelo contato! Retornaremos em breve.');
            contactForm.reset();
        });
    }
    
    // Efeito de rolagem suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular a posição de rolagem considerando o header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header com efeito de scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Animação de elementos ao rolar a página
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .process-step, .about-content, .testimonial-content, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Aplicar estilo inicial aos elementos animados
    document.querySelectorAll('.service-card, .process-step, .about-content, .testimonial-content, .blog-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Executar animação no carregamento e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Pop-up de intenção de saída
    const exitPopup = document.getElementById('exit-intent-popup');
    const closePopup = document.querySelector('.close-popup');
    let showOnce = false;
    
    // Função para mostrar o pop-up
    function showExitPopup() {
        if (!showOnce) {
            exitPopup.style.display = 'flex';
            showOnce = true;
        }
    }
    
    // Detectar quando o mouse sai da janela (intenção de saída)
    document.addEventListener('mouseleave', (e) => {
        // Se o mouse sair pela parte superior da janela
        if (e.clientY < 5) {
            // Aguardar 2 segundos antes de mostrar o pop-up
            setTimeout(showExitPopup, 2000);
        }
    });
    
    // Fechar o pop-up ao clicar no X
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            exitPopup.style.display = 'none';
        });
    }
    
    // Fechar o pop-up ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === exitPopup) {
            exitPopup.style.display = 'none';
        }
    });
    
    // Formulário do pop-up
    const popupForm = document.getElementById('popup-form');
    
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio do formulário
            alert('Obrigado! Seu e-book será enviado para o e-mail informado.');
            exitPopup.style.display = 'none';
        });
    }
    
    // Lazy loading para imagens
    if ('loading' in HTMLImageElement.prototype) {
        // Navegador suporta lazy loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que não suportam lazy loading nativo
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(lazyLoadScript);
    }
    
    // Minificação de CSS e JS em produção
    // Nota: Esta é uma simulação, em um ambiente real seria feito via ferramentas de build
    function isProductionEnvironment() {
        return window.location.hostname !== 'localhost' && 
               window.location.hostname !== '127.0.0.1';
    }
    
    if (isProductionEnvironment()) {
        console.log('Ambiente de produção detectado. Recursos otimizados carregados.');
    }
});

// Adicionar cache para recursos estáticos
// Nota: Esta é uma simulação, em um ambiente real seria implementado via Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Em um ambiente real, registraria um service worker aqui
        console.log('Service Worker disponível, mas não registrado nesta demonstração.');
    });
}

