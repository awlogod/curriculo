// Atualizar ano no footer automaticamente
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Navegação Mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Tabs de Habilidades
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona active no selecionado
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Animação de números nas estatísticas
    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        };

        updateNumber();
    };

    // Observer para animar números quando visíveis
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar números do card ATUALMENTE
                const currentStatNumbers = entry.target.querySelectorAll('.current-stat-number');
                currentStatNumbers.forEach(statNumber => {
                    if (!statNumber.classList.contains('animated')) {
                        statNumber.classList.add('animated');
                        animateNumber(statNumber);
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        statsObserver.observe(heroSection);
    }

    // Interatividade do caminho SVG
    const currentCard = document.querySelector('.hero-current-card');
    const connectorPath = document.querySelector('.connector-path');
    const connectorDots = document.querySelectorAll('.connector-dot');
    const heroContent = document.querySelector('.hero-content');

    if (currentCard && connectorPath) {
        // Efeito ao passar o mouse no card
        currentCard.addEventListener('mouseenter', function() {
            connectorPath.style.strokeWidth = '3.5';
            connectorPath.style.opacity = '1';
            connectorDots.forEach(dot => {
                dot.style.r = '5';
                dot.style.opacity = '1';
            });
        });

        currentCard.addEventListener('mouseleave', function() {
            connectorPath.style.strokeWidth = '2.5';
            connectorPath.style.opacity = '0.7';
            connectorDots.forEach(dot => {
                dot.style.r = '4';
                dot.style.opacity = '0.8';
            });
        });

        // Efeito ao passar o mouse no conteúdo principal
        if (heroContent) {
            heroContent.addEventListener('mouseenter', function() {
                connectorPath.style.strokeWidth = '3';
                connectorPath.style.opacity = '0.9';
            });

            heroContent.addEventListener('mouseleave', function() {
                connectorPath.style.strokeWidth = '2.5';
                connectorPath.style.opacity = '0.7';
            });
        }

        // Efeito de scroll - caminho fica mais visível quando a seção está visível
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    connectorPath.style.opacity = '0.8';
                    connectorPath.style.animation = 'drawPath 5s ease-in-out forwards, pulsePath 3s ease-in-out 5s infinite';
                } else {
                    connectorPath.style.opacity = '0.4';
                }
            });
        }, { threshold: 0.3 });

        if (heroSection) {
            heroObserver.observe(heroSection);
        }
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
    const certificateButtons = document.querySelectorAll('.certificate-btn, .diploma-cert-btn');

    // Função para abrir o modal
    function openModal(imageSrc, title) {
        // Construir o caminho completo da imagem
        const imagePath = `images/certificados/${imageSrc}.jpg`;
        modalImage.src = imagePath;
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

    // Sistema de Habilidades Interativo
    const skillsData = {
        javascript: {
            name: 'JavaScript',
            logo: 'JS',
            category: 'frontend',
            experience: 'Desde 2022 ~ 3 anos',
            description: 'Utilizo JavaScript para construir aplicações web dinâmicas, interativas e modernas. Desenvolvo tanto no frontend quanto no backend, criando soluções completas e escaláveis.',
            knowledges: [
                'Desenvolvimento frontend e backend',
                'Manipulação do DOM e eventos',
                'Async/await e Promises',
                'ES6+ e recursos modernos',
                'Integração com APIs REST',
                'Desenvolvimento de chatbots'
            ]
        },
        typescript: {
            name: 'TypeScript',
            logo: 'TS',
            category: 'frontend',
            experience: 'Desde 2023 ~ 2 anos',
            description: 'Utilizo TypeScript para adicionar tipagem estática ao JavaScript, melhorando a qualidade do código, a manutenibilidade e a experiência de desenvolvimento.',
            knowledges: [
                'Tipos e interfaces',
                'Generics e utility types',
                'Integração com React e Node.js',
                'Configuração de projetos TypeScript',
                'Type guards e type assertions',
                'Desenvolvimento de bibliotecas tipadas'
            ]
        },
        react: {
            name: 'React',
            logo: '⚛',
            category: 'frontend',
            experience: 'Desde 2023 ~ 2 anos',
            description: 'Crio interfaces reativas com React, priorizando componentização, acessibilidade e performance. Desenvolvo aplicações modernas e escaláveis.',
            knowledges: [
                'Hooks e Context API',
                'Componentes funcionais',
                'React Router e navegação',
                'Integração com APIs REST',
                'Gerenciamento de estado',
                'Otimização de performance'
            ]
        },
        nodejs: {
            name: 'Node.js',
            logo: 'N',
            category: 'backend',
            experience: 'Desde 2022 ~ 3 anos',
            description: 'Crio serviços escaláveis com Node.js, usando o event loop de forma eficiente. Desenvolvo APIs robustas e sistemas backend performáticos.',
            knowledges: [
                'Criação de APIs RESTful',
                'Express.js e frameworks',
                'Manipulação de arquivos e streams',
                'Integração com bancos de dados',
                'Autenticação e autorização',
                'Desenvolvimento de chatbots'
            ]
        },
        java: {
            name: 'Java',
            logo: 'J',
            category: 'backend',
            experience: 'Desde 2023 ~ 2 anos',
            description: 'Desenvolvo aplicações robustas com Java, utilizando orientação a objetos, padrões de design e boas práticas de desenvolvimento.',
            knowledges: [
                'Programação orientada a objetos',
                'Collections e Streams API',
                'Spring Framework',
                'Maven e Gradle',
                'Testes unitários',
                'Desenvolvimento de APIs'
            ]
        },
        htmlcss: {
            name: 'HTML/CSS',
            logo: '◉',
            category: 'frontend',
            experience: 'Desde 2022 ~ 3 anos',
            description: 'Crio interfaces modernas e responsivas com HTML5 e CSS3, utilizando layouts flexíveis, animações e design systems.',
            knowledges: [
                'HTML5 semântico',
                'CSS3 avançado e Flexbox/Grid',
                'Design responsivo',
                'Animações e transições',
                'Pré-processadores CSS',
                'Acessibilidade web'
            ]
        },
        git: {
            name: 'Git & GitHub',
            logo: 'G',
            category: 'tools',
            experience: 'Desde 2022 ~ 3 anos',
            description: 'Utilizo Git e GitHub para controle de versão, colaboração em equipe e gerenciamento de projetos de software.',
            knowledges: [
                'Controle de versão',
                'Branches e merge',
                'Pull requests e code review',
                'GitHub Actions e CI/CD',
                'Gerenciamento de repositórios',
                'Colaboração em equipe'
            ]
        },
        apis: {
            name: 'APIs',
            logo: 'API',
            category: 'backend',
            experience: 'Desde 2022 ~ 3 anos',
            description: 'Desenvolvo e consumo APIs RESTful e GraphQL, criando integrações robustas e documentadas para sistemas diversos.',
            knowledges: [
                'Design de APIs REST',
                'Autenticação e segurança',
                'Documentação com Swagger',
                'Versionamento de APIs',
                'Rate limiting e caching',
                'Integração com serviços externos'
            ]
        },
        c: {
            name: 'C',
            logo: 'C',
            category: 'backend',
            experience: 'Desde 2023 ~ 2 anos',
            description: 'Desenvolvo aplicações em C, focando em performance, gerenciamento de memória e programação de baixo nível.',
            knowledges: [
                'Programação estruturada',
                'Ponteiros e gerenciamento de memória',
                'Estruturas de dados',
                'Algoritmos e otimização',
                'Compilação e debugging',
                'Programação de sistemas'
            ]
        },
        cpp: {
            name: 'C++',
            logo: 'C++',
            category: 'backend',
            experience: 'Desde 2023 ~ 2 anos',
            description: 'Utilizo C++ para desenvolver aplicações de alto desempenho, aproveitando orientação a objetos e recursos modernos da linguagem.',
            knowledges: [
                'Orientação a objetos',
                'STL e containers',
                'Templates e generics',
                'Gerenciamento de memória',
                'Multithreading',
                'Otimização de performance'
            ]
        },
        csharp: {
            name: 'C#',
            logo: 'C#',
            category: 'backend',
            experience: 'Desde 2023 ~ 2 anos',
            description: 'Desenvolvo aplicações com C# e .NET, criando soluções robustas e escaláveis para diferentes plataformas.',
            knowledges: [
                'Programação orientada a objetos',
                '.NET Framework e Core',
                'LINQ e collections',
                'ASP.NET e APIs',
                'Entity Framework',
                'Desenvolvimento de aplicações desktop'
            ]
        },
        blip: {
            name: 'Plataforma Blip',
            logo: 'B',
            category: 'tools',
            experience: 'Desde 2024 ~ 1 ano',
            description: 'Desenvolvo chatbots e automações na plataforma Blip, criando fluxos conversacionais inteligentes para WhatsApp, Instagram e outras plataformas.',
            knowledges: [
                'Criação de fluxos conversacionais',
                'Integração com APIs externas',
                'Automação de atendimento',
                'Análise e métricas',
                'Configuração de chatbots',
                'Otimização de conversas'
            ]
        },
        chatbots: {
            name: 'Chatbots',
            logo: '🤖',
            category: 'tools',
            experience: 'Desde 2024 ~ 1 ano',
            description: 'Desenvolvo chatbots inteligentes para múltiplas plataformas, criando experiências conversacionais que melhoram o atendimento e automatizam processos.',
            knowledges: [
                'Desenvolvimento de chatbots',
                'NLP e processamento de linguagem',
                'Integração com WhatsApp e Instagram',
                'Automação de processos',
                'Análise de conversas',
                'Otimização de fluxos'
            ]
        }
    };

    // Elementos
    const skillCards = document.querySelectorAll('.skill-tech-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('skills-search-input');
    const showMoreBtn = document.getElementById('show-more-skills');
    const detailCard = document.getElementById('skill-detail-card');
    const detailLogo = document.getElementById('detail-logo');
    const detailName = document.getElementById('detail-name');
    const detailExperience = document.getElementById('detail-experience');
    const detailDescription = document.getElementById('detail-description');
    const detailKnowledges = document.getElementById('detail-knowledges');

    let currentFilter = 'all';
    let showAllSkills = false;

    // Função para atualizar o card de detalhes
    function updateDetailCard(skillKey) {
        const skill = skillsData[skillKey];
        if (!skill) return;

        detailLogo.textContent = skill.logo;
        detailName.textContent = skill.name;
        detailExperience.textContent = skill.experience;
        detailDescription.textContent = skill.description;

        // Dividir conhecimentos em duas colunas
        const midPoint = Math.ceil(skill.knowledges.length / 2);
        const leftColumn = skill.knowledges.slice(0, midPoint);
        const rightColumn = skill.knowledges.slice(midPoint);

        detailKnowledges.innerHTML = `
            <div class="knowledges-column">
                ${leftColumn.map(k => `<div class="knowledge-item">• ${k}</div>`).join('')}
            </div>
            <div class="knowledges-column">
                ${rightColumn.map(k => `<div class="knowledge-item">• ${k}</div>`).join('')}
            </div>
        `;

        // Mostrar o card de detalhes
        if (detailCard) {
            detailCard.style.display = 'block';
        }
    }

    // Selecionar card de habilidade
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover active de todos
            skillCards.forEach(c => c.classList.remove('active'));
            // Adicionar active no selecionado
            this.classList.add('active');
            
            const skillKey = this.getAttribute('data-skill');
            updateDetailCard(skillKey);
        });
    });

    // Filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            filterSkills();
        });
    });

    // Função de filtro
    function filterSkills() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        skillCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.querySelector('.tech-name').textContent.toLowerCase();
            const skillKey = card.getAttribute('data-skill');
            const skillName = skillsData[skillKey]?.name.toLowerCase() || '';

            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = searchTerm === '' || 
                name.includes(searchTerm) || 
                skillName.includes(searchTerm) ||
                category.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                if (showAllSkills || !card.classList.contains('hidden')) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Busca
    if (searchInput) {
        searchInput.addEventListener('input', filterSkills);
    }

    // Mostrar mais habilidades
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            showAllSkills = !showAllSkills;
            const hiddenCards = document.querySelectorAll('.skill-tech-card.hidden');
            
            hiddenCards.forEach(card => {
                if (showAllSkills) {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                } else {
                    card.classList.add('hidden');
                    if (!card.classList.contains('active')) {
                        card.style.display = 'none';
                    }
                }
            });

            this.innerHTML = showAllSkills 
                ? `Mostrar menos <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>`
                : `Mostrar mais <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;
            
            filterSkills();
        });
    }

    // Inicializar com JavaScript selecionado
    const firstCard = document.querySelector('.skill-tech-card[data-skill="javascript"]');
    if (firstCard && detailCard) {
        firstCard.classList.add('active');
        updateDetailCard('javascript');
    }

    // ============================================
    // INDICADOR DE PROGRESSO DE SCROLL
    // ============================================
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }

    // ============================================
    // BOTÃO VOLTAR AO TOPO
    // ============================================
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // TOGGLE DE TEMA CLARO/ESCURO
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Verificar tema salvo
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
        });
    }

    // ============================================
    // ANIMAÇÕES FADE-IN
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // ============================================
    // ESTATÍSTICAS DO GITHUB
    // ============================================
    async function fetchGitHubStats() {
        const username = 'awlogod';
        try {
            // Buscar informações do usuário
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok) throw new Error('Erro ao buscar dados do usuário');
            const userData = await userResponse.json();

            // Atualizar estatísticas básicas
            const repoCount = document.getElementById('repo-count');
            const followersCount = document.getElementById('followers-count');
            const starsCount = document.getElementById('stars-count');
            const contribCount = document.getElementById('contrib-count');

            if (repoCount) repoCount.textContent = userData.public_repos || 0;
            if (followersCount) followersCount.textContent = userData.followers || 0;

            // Buscar TODOS os repositórios (pode ter mais de 100)
            let allRepos = [];
            let page = 1;
            let hasMore = true;

            while (hasMore) {
                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`);
                if (!reposResponse.ok) break;
                const reposData = await reposResponse.json();
                
                if (reposData.length === 0) {
                    hasMore = false;
                } else {
                    allRepos = allRepos.concat(reposData);
                    page++;
                    // Limitar a 5 páginas (500 repositórios) para evitar muitas requisições
                    if (reposData.length < 100 || page > 5) {
                        hasMore = false;
                    }
                }
            }

            // Calcular total de stars
            const totalStars = allRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            if (starsCount) starsCount.textContent = totalStars;

            // Buscar linguagens com tamanho do código (mais preciso)
            const languagesMap = {};
            
            // Buscar linguagens de cada repositório
            for (const repo of allRepos) {
                if (repo.language) {
                    // Usar o tamanho do repositório como peso
                    const size = repo.size || 1;
                    languagesMap[repo.language] = (languagesMap[repo.language] || 0) + size;
                }
            }

            // Se não tiver dados de tamanho, usar contagem simples
            if (Object.keys(languagesMap).length === 0) {
                for (const repo of allRepos) {
                    if (repo.language) {
                        languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
                    }
                }
            }

            // Ordenar e exibir top 5 linguagens
            const sortedLanguages = Object.entries(languagesMap)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

            const languagesBars = document.getElementById('languages-bars');
            if (languagesBars && sortedLanguages.length > 0) {
                const total = sortedLanguages.reduce((sum, [, count]) => sum + count, 0);
                languagesBars.innerHTML = sortedLanguages.map(([lang, count]) => {
                    const percentage = ((count / total) * 100).toFixed(1);
                    return `
                        <div class="language-bar">
                            <span class="language-name-bar">${lang}</span>
                            <div class="language-progress-bar">
                                <div class="language-progress-fill" style="width: ${percentage}%"></div>
                            </div>
                            <span class="language-percentage">${percentage}%</span>
                        </div>
                    `;
                }).join('');
            } else if (languagesBars) {
                languagesBars.innerHTML = '<p style="color: var(--text-secondary);">Carregando linguagens...</p>';
            }

            // Calcular contribuições aproximadas (commits totais estimados)
            // Como não temos acesso direto aos commits via API pública sem autenticação,
            // vamos usar uma estimativa baseada no número de repositórios e atividade
            if (contribCount) {
                // Estimativa: número de repositórios * commits médios por repo
                // Baseado em repositórios ativos e atualizados recentemente
                const activeRepos = allRepos.filter(repo => {
                    const updatedDate = new Date(repo.updated_at);
                    const sixMonthsAgo = new Date();
                    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                    return updatedDate > sixMonthsAgo;
                }).length;
                
                // Estimativa conservadora: 5-10 commits por repositório ativo
                const estimatedCommits = Math.max(allRepos.length * 3, activeRepos * 8);
                contribCount.textContent = estimatedCommits.toLocaleString();
            }

        } catch (error) {
            console.error('Erro ao buscar estatísticas do GitHub:', error);
            // Definir valores padrão em caso de erro
            const repoCount = document.getElementById('repo-count');
            const followersCount = document.getElementById('followers-count');
            const starsCount = document.getElementById('stars-count');
            const contribCount = document.getElementById('contrib-count');
            if (repoCount) repoCount.textContent = '0';
            if (followersCount) followersCount.textContent = '0';
            if (starsCount) starsCount.textContent = '0';
            if (contribCount) contribCount.textContent = '0';
            
            const languagesBars = document.getElementById('languages-bars');
            if (languagesBars) {
                languagesBars.innerHTML = '<p style="color: var(--text-secondary);">Erro ao carregar linguagens</p>';
            }
        }
    }

    // Chamar função de estatísticas do GitHub
    fetchGitHubStats();

    // ============================================
    // FORMULÁRIO DE CONTATO
    // ============================================
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Desabilitar botão durante envio
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Enviando...</span>';

            try {
                // Aqui você pode integrar com EmailJS ou outro serviço
                // Por enquanto, apenas simula o envio
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Mostrar mensagem de sucesso
                formMessage.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';

                // Limpar formulário
                contactForm.reset();

                // Ocultar mensagem após 5 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } catch (error) {
                formMessage.textContent = 'Erro ao enviar mensagem. Tente novamente mais tarde.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <span>Enviar Mensagem</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                `;
            }
        });
    }

    // ============================================
    // COPIAR EMAIL
    // ============================================
    const emailCard = document.querySelector('.contact-card[href^="mailto:"]');
    if (emailCard) {
        emailCard.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'andrewilckaylageoliveira@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const actionSpan = this.querySelector('.contact-action');
                if (actionSpan) {
                    const originalText = actionSpan.textContent;
                    actionSpan.textContent = 'Copiado!';
                    setTimeout(() => {
                        actionSpan.textContent = originalText;
                    }, 2000);
                }
            });
        });
    }

    // ============================================
    // GERAR PDF DO CURRÍCULO AUTOMATICAMENTE
    // ============================================
    async function generatePDF() {
        // Verificar se a biblioteca está carregada
        if (typeof html2pdf === 'undefined') {
            alert('Biblioteca de PDF não carregada. Abrindo página de impressão...');
            window.open('curriculo.html', '_blank');
            return;
        }

        // Mostrar loading
        const loadingMsg = document.createElement('div');
        loadingMsg.id = 'pdf-loading';
        loadingMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(15, 23, 42, 0.95); color: white; padding: 2rem 3rem; border-radius: 12px; z-index: 10000; text-align: center; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px);';
        loadingMsg.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 1rem;">📄</div>
            <div style="font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: 600;">Gerando PDF...</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">Aguarde um momento</div>
        `;
        document.body.appendChild(loadingMsg);

        try {
            // Abrir a página do currículo em um iframe oculto
            const iframe = document.createElement('iframe');
            iframe.style.cssText = 'position: absolute; width: 0; height: 0; border: none;';
            iframe.src = 'curriculo.html';
            document.body.appendChild(iframe);

            // Aguardar o iframe carregar
            await new Promise((resolve) => {
                iframe.onload = resolve;
                // Timeout de segurança
                setTimeout(resolve, 2000);
            });

            // Aguardar um pouco mais para garantir que o conteúdo está renderizado
            await new Promise(resolve => setTimeout(resolve, 500));

            // Tentar acessar o conteúdo do iframe
            let curriculoContent;
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                curriculoContent = iframeDoc.querySelector('.curriculo-container');
            } catch (e) {
                // Se houver erro de CORS, abrir em nova aba
                console.warn('Erro de CORS, abrindo página de impressão');
                window.open('curriculo.html', '_blank');
                loadingMsg.remove();
                iframe.remove();
                return;
            }

            if (!curriculoContent) {
                throw new Error('Conteúdo do currículo não encontrado');
            }

            // Configurações do PDF
            const opt = {
                margin: [10, 10, 10, 10],
                filename: 'Curriculo_Andre_Wilckay.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    windowWidth: 900
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            };

            // Gerar e baixar o PDF
            await html2pdf().set(opt).from(curriculoContent).save();
            
            // Remover loading e iframe
            loadingMsg.remove();
            iframe.remove();
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            loadingMsg.innerHTML = `
                <div style="font-size: 1.5rem; margin-bottom: 1rem; color: #ef4444;">❌</div>
                <div style="font-size: 1.2rem; margin-bottom: 0.5rem; color: #ef4444; font-weight: 600;">Erro ao gerar PDF</div>
                <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 1rem;">Abrindo página de impressão...</div>
            `;
            
            setTimeout(() => {
                loadingMsg.remove();
                window.open('curriculo.html', '_blank');
            }, 1500);
        }
    }

    // Adicionar event listeners aos botões de download
    const downloadButtons = document.querySelectorAll('.btn-download, .btn-download-cv');
    downloadButtons.forEach(button => {
        // Remover o href original e adicionar evento
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            generatePDF();
        });
    });
});

