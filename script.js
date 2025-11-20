// Atualizar ano no footer automaticamente
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Adicionar animação suave ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Adicionar efeito de hover suave nos links de contato
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Sistema de visualização de certificados
    const modal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const certificateButtons = document.querySelectorAll('.certificate-btn');

    // Função para abrir o modal
    function openModal(imageSrc, title) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll do body
    }

    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll do body
    }

    // Adicionar event listeners aos botões de certificado
    certificateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-certificate');
            const title = this.getAttribute('data-title');
            if (imageSrc && title) {
                openModal(imageSrc, title);
            }
        });
    });

    // Fechar modal ao clicar no botão de fechar
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Fechar modal ao clicar no overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Fechar modal ao pressionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevenir fechamento ao clicar na imagem
    if (modalImage) {
        modalImage.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});

