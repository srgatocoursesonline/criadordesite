Rodrigo, vejo que os ícones de ajuda estão aparecendo, mas não estão funcionando ao clicar. Vou identificar e corrigir os problemas no código. O issue provavelmente está na forma como estou encontrando os inputs associados aos labels ou na inicialização do sistema de help.

Aqui está o código JavaScript corrigido e otimizado:

```javascript
// Professional Website Checklist Application
class ChecklistApp {
    constructor() {
        this.form = document.getElementById('checklistForm');
        this.progressBar = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.generatePdfBtn = document.getElementById('generatePdfBtn');
        this.accordionHeaders = document.querySelectorAll('.accordion-header');
        this.accordionContents = document.querySelectorAll('.accordion-content');
        this.totalFields = 0;
        this.completedFields = 0;

        this.sectionData = {
            'info-basicas': { total: 6, completed: 0 },
            'identidade-visual': { total: 13, completed: 0 },
            'estrutura-layout': { total: 13, completed: 0 },
            'responsividade': { total: 7, completed: 0 },
            'acessibilidade': { total: 10, completed: 0 },
            'performance': { total: 11, completed: 0 },
            'seo': { total: 11, completed: 0 },
            'seguranca': { total: 7, completed: 0 },
            'testes': { total: 10, completed: 0 },
            'pos-lancamento': { total: 7, completed: 0 }
        };

        // Dados de help para todos os campos
        this.helpData = {
            // Informações Básicas do Projeto
            'nome-empresa': {
                title: 'Nome da Empresa',
                description: 'Nome oficial da empresa ou marca que será representada no site.',
                example: 'Exemplo: "TechSolutions Ltda", "Padaria do João", "Consultoria Digital Pro"',
                tips: 'Use o nome completo e oficial da empresa. Este nome aparecerá no título do site, rodapé e metadados.'
            },
            'setor-atuacao': {
                title: 'Setor de Atuação',
                description: 'Área de negócio ou mercado em que a empresa atua.',
                example: 'Exemplo: "Tecnologia", "Alimentação", "Consultoria", "E-commerce", "Saúde"',
                tips: 'Seja específico para ajudar na personalização do design e conteúdo do site.'
            },
            'publico-alvo': {
                title: 'Público-Alvo',
                description: 'Descrição detalhada do público que o site pretende atingir.',
                example: 'Exemplo: "Empresas de médio porte", "Jovens de 18-35 anos", "Profissionais de TI"',
                tips: 'Inclua faixa etária, interesses, comportamento online e necessidades específicas.'
            },
            'objetivo-principal': {
                title: 'Objetivo Principal',
                description: 'Principal meta que o site deve alcançar para o negócio.',
                example: 'Geração de leads, vendas online, divulgação da marca, suporte ao cliente',
                tips: 'Defina um objetivo claro e mensurável para orientar todas as decisões de design e funcionalidade.'
            },
            'url-desejada': {
                title: 'URL Desejada',
                description: 'Endereço web preferido para o site (domínio).',
                example: 'Exemplo: "www.minhaempresa.com.br", "loja.exemplo.com"',
                tips: 'Verifique disponibilidade do domínio. Prefira nomes curtos, fáceis de lembrar e relacionados ao negócio.'
            },
            'data-entrega': {
                title: 'Data de Entrega',
                description: 'Prazo desejado para conclusão e lançamento do site.',
                example: 'Considere tempo para desenvolvimento, testes e ajustes',
                tips: 'Seja realista com o prazo. Sites complexos podem levar 2-6 meses para desenvolvimento completo.'
            },

            // Identidade Visual e Branding
            'logo-empresa': {
                title: 'Logo da Empresa',
                description: 'Logotipo oficial da empresa em formato vetorial de alta qualidade.',
                example: 'Formatos ideais: SVG, AI, EPS. Também aceita PNG/JPG em alta resolução',
                tips: 'Forneça versões em diferentes cores (colorida, branca, preta) e orientações (horizontal, vertical).'
            },
            'manual-marca': {
                title: 'Manual da Marca',
                description: 'Documento que define padrões visuais, cores, tipografia e aplicações da marca.',
                example: 'Inclui paleta de cores, fontes, espaçamentos, usos corretos e incorretos do logo',
                tips: 'Se não existe, considere criar um guia básico com cores e fontes principais da marca.'
            },
            'paleta-cores': {
                title: 'Paleta de Cores',
                description: 'Cores oficiais da marca definidas em códigos hexadecimais.',
                example: 'Exemplo: Azul #1E40AF, Branco #FFFFFF, Cinza #6B7280',
                tips: 'Inclua cores primárias, secundárias e neutras. Use ferramentas como Adobe Color para harmonização.'
            },
            'tipografia-principal': {
                title: 'Tipografia Principal',
                description: 'Fonte principal que será usada nos títulos e textos do site.',
                example: 'Exemplo: "Roboto", "Open Sans", "Montserrat", "Poppins"',
                tips: 'Escolha fontes legíveis e que reflitam a personalidade da marca. Considere fontes do Google Fonts.'
            },
            'tipografia-secundaria': {
                title: 'Tipografia Secundária',
                description: 'Fonte complementar para textos corridos e elementos secundários.',
                example: 'Exemplo: "Inter", "Source Sans Pro", "Lato"',
                tips: 'Deve complementar a fonte principal e garantir boa legibilidade em textos longos.'
            },
            'estilo-visual': {
                title: 'Estilo Visual',
                description: 'Abordagem visual geral que o site deve seguir.',
                example: 'Moderno, minimalista, corporativo, criativo, elegante, descontraído',
                tips: 'Considere o público-alvo e setor de atuação. Colete referências visuais de sites admirados.'
            },
            'referencias-visuais': {
                title: 'Referências Visuais',
                description: 'Sites, designs ou elementos visuais que servem de inspiração.',
                example: 'URLs de sites admirados, imagens de referência, estilos específicos',
                tips: 'Inclua tanto referências do mesmo setor quanto de outros que tenham elementos interessantes.'
            },

            // Estrutura e Layout
            'tipo-site': {
                title: 'Tipo de Site',
                description: 'Categoria principal que melhor define o site a ser desenvolvido.',
                example: 'Site institucional, e-commerce, blog, portfólio, landing page',
                tips: 'A escolha define a estrutura base e funcionalidades necessárias.'
            },
            'paginas-principais': {
                title: 'Páginas Principais',
                description: 'Lista das páginas essenciais que o site deve conter.',
                example: 'Home, Sobre, Serviços, Produtos, Contato, Blog, Portfólio',
                tips: 'Pense na jornada do usuário e inclua páginas que atendam suas necessidades.'
            },
            'menu-navegacao': {
                title: 'Menu de Navegação',
                description: 'Estrutura e organização do menu principal do site.',
                example: 'Menu horizontal, vertical, hambúrguer, mega menu, dropdown',
                tips: 'Mantenha simplicidade e máximo de 7 itens no menu principal para melhor usabilidade.'
            },
            'layout-preferido': {
                title: 'Layout Preferido',
                description: 'Estrutura visual e organização dos elementos na página.',
                example: 'Layout em grid, uma coluna, duas colunas, assimétrico, minimalista',
                tips: 'Considere o tipo de conteúdo e como o usuário consumirá a informação.'
            },
            'call-to-action': {
                title: 'Call-to-Action Principal',
                description: 'Ação principal que você quer que os visitantes realizem no site.',
                example: '"Entre em Contato", "Compre Agora", "Solicite Orçamento", "Cadastre-se"',
                tips: 'Use verbos no imperativo e seja específico sobre o que acontece após o clique.'
            },
            'formularios-necessarios': {
                title: 'Formulários Necessários',
                description: 'Tipos de formulários que o site deve incluir.',
                example: 'Contato, orçamento, newsletter, cadastro, pesquisa de satisfação',
                tips: 'Mantenha formulários simples e solicite apenas informações essenciais.'
            },

            // Responsividade
            'dispositivos-prioritarios': {
                title: 'Dispositivos Prioritários',
                description: 'Tipos de dispositivos mais importantes para o público-alvo.',
                example: 'Desktop, smartphone, tablet, smart TV',
                tips: 'Considere dados de analytics se já possui um site, ou pesquise hábitos do seu público.'
            },
            'breakpoints-personalizados': {
                title: 'Breakpoints Personalizados',
                description: 'Pontos de quebra específicos para adaptação do layout.',
                example: 'Mobile: 320px-768px, Tablet: 768px-1024px, Desktop: 1024px+',
                tips: 'Use breakpoints padrão do mercado, mas ajuste conforme necessidades específicas.'
            },
            'comportamento-mobile': {
                title: 'Comportamento Mobile',
                description: 'Como o site deve se comportar em dispositivos móveis.',
                example: 'Menu hambúrguer, botões maiores, scroll vertical, gestos touch',
                tips: 'Priorize a experiência mobile-first, considerando dedos e telas menores.'
            },

            // Acessibilidade
            'nivel-wcag': {
                title: 'Nível WCAG',
                description: 'Nível de conformidade com as diretrizes de acessibilidade web.',
                example: 'A (básico), AA (recomendado), AAA (avançado)',
                tips: 'WCAG 2.1 AA é o padrão recomendado e exigido por lei em muitos países.'
            },
            'recursos-acessibilidade': {
                title: 'Recursos de Acessibilidade',
                description: 'Funcionalidades específicas para melhorar a acessibilidade.',
                example: 'Alto contraste, aumento de fonte, navegação por teclado, leitor de tela',
                tips: 'Considere usuários com deficiências visuais, auditivas, motoras e cognitivas.'
            },
            'publico-pcd': {
                title: 'Público PcD',
                description: 'Se o site atende especificamente pessoas com deficiência.',
                example: 'Sim, se for site governamental, educacional ou de saúde',
                tips: 'Sites públicos e de grande alcance devem priorizar acessibilidade total.'
            },

            // Performance
            'tempo-carregamento': {
                title: 'Tempo de Carregamento',
                description: 'Tempo máximo aceitável para carregamento completo das páginas.',
                example: 'Ideal: até 3 segundos, Aceitável: até 5 segundos',
                tips: 'Páginas que carregam em até 3 segundos têm melhor taxa de conversão.'
            },
            'otimizacao-imagens': {
                title: 'Otimização de Imagens',
                description: 'Estratégias para reduzir o tamanho das imagens sem perder qualidade.',
                example: 'WebP, compressão, lazy loading, responsive images',
                tips: 'Imagens representam 60-70% do peso de uma página. Otimização é essencial.'
            },
            'cdn-necessario': {
                title: 'CDN Necessário',
                description: 'Se o site precisa de uma rede de distribuição de conteúdo.',
                example: 'Sim para sites globais, e-commerce, alta audiência',
                tips: 'CDN melhora velocidade para usuários em diferentes regiões geográficas.'
            },

            // SEO
            'palavras-chave': {
                title: 'Palavras-chave Principais',
                description: 'Termos que o público usa para encontrar seus produtos/serviços.',
                example: '"consultoria digital", "desenvolvimento web", "marketing online"',
                tips: 'Use ferramentas como Google Keyword Planner, SEMrush ou Ubersuggest para pesquisa.'
            },
            'concorrentes-seo': {
                title: 'Concorrentes SEO',
                description: 'Sites concorrentes que aparecem bem nos resultados de busca.',
                example: 'URLs de sites concorrentes que rankeiam bem no Google',
                tips: 'Analise suas estratégias de conteúdo, palavras-chave e estrutura.'
            },
            'meta-descriptions': {
                title: 'Meta Descriptions',
                description: 'Descrições que aparecem nos resultados de busca do Google.',
                example: 'Máximo 160 caracteres, incluindo palavra-chave principal',
                tips: 'Seja persuasivo e inclua call-to-action. É o "anúncio" do seu site no Google.'
            },

            // Segurança
            'certificado-ssl': {
                title: 'Certificado SSL',
                description: 'Certificado que garante conexão segura (HTTPS).',
                example: 'Let\'s Encrypt (gratuito), Certificados pagos (EV, OV)',
                tips: 'Essencial para SEO e confiança. Google penaliza sites sem HTTPS.'
            },
            'backup-automatico': {
                title: 'Backup Automático',
                description: 'Sistema de backup automático do site e banco de dados.',
                example: 'Diário, semanal, mensal, com múltiplas versões',
                tips: 'Configure backups automáticos e teste a restauração periodicamente.'
            },
            'firewall-waf': {
                title: 'Firewall/WAF',
                description: 'Proteção contra ataques maliciosos e tentativas de invasão.',
                example: 'Cloudflare, Sucuri, ModSecurity, firewalls de hosting',
                tips: 'WAF (Web Application Firewall) é essencial para sites com dados sensíveis.'
            },

            // Testes
            'testes-dispositivos': {
                title: 'Testes em Dispositivos',
                description: 'Dispositivos reais onde o site será testado.',
                example: 'iPhone, Android, iPad, laptops, desktops',
                tips: 'Teste em dispositivos reais, não apenas emuladores. Inclua diferentes tamanhos de tela.'
            },
            'testes-navegadores': {
                title: 'Testes em Navegadores',
                description: 'Navegadores onde o site deve funcionar perfeitamente.',
                example: 'Chrome, Firefox, Safari, Edge, Opera',
                tips: 'Priorize navegadores mais usados pelo seu público. Verifique analytics para dados.'
            },
            'testes-velocidade': {
                title: 'Testes de Velocidade',
                description: 'Ferramentas para medir e otimizar a velocidade do site.',
                example: 'Google PageSpeed, GTmetrix, Pingdom, WebPageTest',
                tips: 'Teste regularmente e mantenha score acima de 90 no PageSpeed Insights.'
            },

            // Pós-Lançamento
            'manutencao-preventiva': {
                title: 'Manutenção Preventiva',
                description: 'Plano de manutenção regular para manter o site funcionando bem.',
                example: 'Atualizações mensais, backups, monitoramento, otimizações',
                tips: 'Manutenção preventiva evita problemas maiores e mantém performance.'
            },
            'analytics-configuracao': {
                title: 'Configuração Analytics',
                description: 'Ferramentas de análise para monitorar performance do site.',
                example: 'Google Analytics, Google Search Console, Hotjar, Crazy Egg',
                tips: 'Configure desde o lançamento para ter dados históricos completos.'
            },
            'estrategia-conteudo': {
                title: 'Estratégia de Conteúdo',
                description: 'Plano para criação e publicação regular de conteúdo.',
                example: 'Blog semanal, posts redes sociais, newsletters, atualizações',
                tips: 'Conteúdo regular melhora SEO e mantém audiência engajada.'
            }
        };

        this.init();
    }

    init() {
        this.setupAccordion();
        this.setupFormValidation();
        this.setupProgressTracking();
        this.setupPdfGeneration();
        this.setupKeyboardNavigation();
        this.loadSavedData();
        this.calculateTotalFields();
        this.updateProgress();
        
        // Aguarda o DOM estar completamente carregado antes de configurar o help
        setTimeout(() => {
            this.setupHelpSystem();
        }, 100);
    }

    setupHelpSystem() {
        console.log('Configurando sistema de help...');
        
        // Adiciona ícones de help a todos os campos
        this.addHelpIcons();
        
        // Event listeners para tooltips com event delegation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.help-icon')) {
                e.preventDefault();
                e.stopPropagation();
                const helpIcon = e.target.closest('.help-icon');
                console.log('Clicou no help icon:', helpIcon.getAttribute('data-field'));
                this.showTooltip(helpIcon);
            } else if (!e.target.closest('.tooltip')) {
                this.hideAllTooltips();
            }
        });

        // Fecha tooltip com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAllTooltips();
            }
        });

        console.log('Sistema de help configurado!');
    }

    addHelpIcons() {
        // Busca por todos os inputs, selects e textareas que tenham name
        const formElements = this.form.querySelectorAll('input[name], select[name], textarea[name]');
        
        formElements.forEach(element => {
            const fieldName = element.getAttribute('name');
            
            if (this.helpData[fieldName]) {
                console.log('Adicionando help icon para:', fieldName);
                
                // Encontra o label associado
                const label = this.findLabelForInput(element);
                
                if (label) {
                    // Verifica se já não tem um help icon
                    if (!label.querySelector('.help-icon')) {
                        const helpIcon = this.createHelpIcon(fieldName);
                        label.appendChild(helpIcon);
                        console.log('Help icon adicionado para:', fieldName);
                    }
                } else {
                    console.log('Label não encontrado para:', fieldName);
                }
            }
        });
    }

    findLabelForInput(input) {
        // Método 1: Busca por label com atributo 'for'
        if (input.id) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) return label;
        }
        
        // Método 2: Busca por label pai
        const parentLabel = input.closest('label');
        if (parentLabel) return parentLabel;
        
        // Método 3: Busca por label irmão anterior
        let sibling = input.previousElementSibling;
        while (sibling) {
            if (sibling.tagName === 'LABEL') {
                return sibling;
            }
            sibling = sibling.previousElementSibling;
        }
        
        // Método 4: Busca por label no mesmo container
        const container = input.closest('.form-group, .fieldset, .checkbox-group');
        if (container) {
            const label = container.querySelector('label');
            if (label) return label;
        }
        
        return null;
    }

    createHelpIcon(fieldName) {
        const helpIcon = document.createElement('button');
        helpIcon.className = 'help-icon';
        helpIcon.type = 'button';
        helpIcon.setAttribute('data-field', fieldName);
        helpIcon.setAttribute('aria-label', `Ajuda para ${this.helpData[fieldName].title}`);
        helpIcon.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
        `;
        
        return helpIcon;
    }

    showTooltip(helpIcon) {
        const fieldName = helpIcon.getAttribute('data-field');
        const helpInfo = this.helpData[fieldName];
        
        console.log('Mostrando tooltip para:', fieldName, helpInfo);
        
        if (!helpInfo) {
            console.log('Informação de help não encontrada para:', fieldName);
            return;
        }

        // Remove tooltip existente
        this.hideAllTooltips();

        // Cria novo tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">
                <h4 class="tooltip-title">${helpInfo.title}</h4>
                <button class="tooltip-close" aria-label="Fechar ajuda">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="tooltip-content">
                <p class="tooltip-description">${helpInfo.description}</p>
                <div class="tooltip-example">
                    <strong>Exemplo:</strong>
                    <p>${helpInfo.example}</p>
                </div>
                <div class="tooltip-tips">
                    <strong>Dica:</strong>
                    <p>${helpInfo.tips}</p>
                </div>
            </div>
        `;

        // Adiciona ao body
        document.body.appendChild(tooltip);
        
        // Posiciona o tooltip
        this.positionTooltip(tooltip, helpIcon);

        // Event listener para fechar
        const closeBtn = tooltip.querySelector('.tooltip-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideAllTooltips();
        });

        // Foco no tooltip para acessibilidade
        tooltip.setAttribute('tabindex', '-1');
        tooltip.focus();

        console.log('Tooltip criado e exibido');
    }

    positionTooltip(tooltip, trigger) {
        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top = triggerRect.top + scrollTop - tooltipRect.height - 10;
        let left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);

        // Ajusta se sair da tela pela direita
        if (left + tooltipRect.width > viewportWidth + scrollLeft - 20) {
            left = viewportWidth + scrollLeft - tooltipRect.width - 20;
        }

        // Ajusta se sair da tela pela esquerda
        if (left < scrollLeft + 20) {
            left = scrollLeft + 20;
        }

        // Se não cabe acima, coloca abaixo
        if (top < scrollTop + 20) {
            top = triggerRect.bottom + scrollTop + 10;
        }

        tooltip.style.position = 'absolute';
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.zIndex = '10000';
    }

    hideAllTooltips() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => {
            tooltip.remove();
        });
    }

    setupAccordion() {
        this.accordionHeaders.forEach((header, index) => {
            header.addEventListener('click', (e) => {
                this.toggleAccordion(header);
            });

            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleAccordion(header);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.focusNextHeader(index);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.focusPrevHeader(index);
                }
            });
        });
    }

    toggleAccordion(header) {
        const content = document.getElementById(header.getAttribute('aria-controls'));
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        // Close all other accordions
        this.accordionHeaders.forEach(h => {
            if (h !== header) {
                h.setAttribute('aria-expanded', 'false');
                const otherContent = document.getElementById(h.getAttribute('aria-controls'));
                otherContent.classList.remove('expanded');
            }
        });

        // Toggle current accordion
        header.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('expanded', !isExpanded);

        // Scroll to section if opening
        if (!isExpanded) {
            setTimeout(() => {
                header.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }

    focusNextHeader(currentIndex) {
        const nextIndex = (currentIndex + 1) % this.accordionHeaders.length;
        this.accordionHeaders[nextIndex].focus();
    }

    focusPrevHeader(currentIndex) {
        const prevIndex = currentIndex === 0 ? this.accordionHeaders.length - 1 : currentIndex - 1;
        this.accordionHeaders[prevIndex].focus();
    }

    setupFormValidation() {
        const requiredFields = this.form.querySelectorAll('input[required], select[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('change', () => this.validateField(field));
        });
    }

    validateField(field) {
        const isEmpty = !field.value.trim();
        field.classList.toggle('error', isEmpty);
        
        // Update progress after validation
        setTimeout(() => this.updateProgress(), 50);
    }

    setupProgressTracking() {
        const allInputs = this.form.querySelectorAll('input, select, textarea');
        
        allInputs.forEach(input => {
            input.addEventListener('input', () => this.updateProgress());
            input.addEventListener('change', () => this.updateProgress());
        });
    }

    calculateTotalFields() {
        const allInputs = this.form.querySelectorAll('input[data-section], select[data-section], textarea[data-section]');
        this.totalFields = allInputs.length;
    }

    updateProgress() {
        let totalCompleted = 0;

        // Update each section
        Object.keys(this.sectionData).forEach(sectionId => {
            const sectionFields = this.form.querySelectorAll(`[data-section="${sectionId}"]`);
            let sectionCompleted = 0;

            sectionFields.forEach(field => {
                if (field.type === 'checkbox') {
                    if (field.checked) sectionCompleted++;
                } else {
                    if (field.value.trim()) sectionCompleted++;
                }
            });

            this.sectionData[sectionId].completed = sectionCompleted;
            totalCompleted += sectionCompleted;

            // Update section counter
            const counter = document.getElementById(`counter-${sectionId}`);
            if (counter) {
                counter.textContent = `${sectionCompleted}/${this.sectionData[sectionId].total}`;
            }
        });

        // Update main progress
        this.completedFields = totalCompleted;
        const percentage = Math.round((this.completedFields / this.totalFields) * 100);
        
        this.progressBar.style.width = `${percentage}%`;
        this.progressText.textContent = `${percentage}% Completo`;
        
        // Save data
        this.saveData();
    }

    setupPdfGeneration() {
        this.generatePdfBtn.addEventListener('click', () => {
            this.generatePDF();
        });
    }

    setupKeyboardNavigation() {
        // Focus management for form elements
        const focusableElements = this.form.querySelectorAll(
            'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    // Let default tab behavior work
                    return;
                }
            });
        });
    }

    saveData() {
        const formData = new FormData(this.form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                               data[key] = value;
            }
        }

        // Save checkboxes that aren't checked
        const checkboxes = this.form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                data[checkbox.name] = 'false';
            }
        });

        try {
            sessionStorage.setItem('checklistData', JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save data to sessionStorage:', e);
        }
    }

    loadSavedData() {
        try {
            const savedData = sessionStorage.getItem('checklistData');
            if (savedData) {
                const data = JSON.parse(savedData);
                Object.entries(data).forEach(([key, value]) => {
                    const element = this.form.querySelector(`[name="${key}"]`);
                    if (element) {
                        if (element.type === 'checkbox') {
                            element.checked = value === 'on' || value === true;
                        } else {
                            element.value = value;
                        }
                    }
                });
            }
        } catch (e) {
            console.warn('Could not load saved data:', e);
        }
    }

    // Função para carregar jsPDF dinamicamente se necessário
    async loadJsPDF() {
        return new Promise((resolve, reject) => {
            // Verifica se jsPDF já está carregado
            if (window.jspdf && window.jspdf.jsPDF) {
                resolve(window.jspdf.jsPDF);
                return;
            }

            // Verifica outras formas de acesso à biblioteca
            if (window.jsPDF) {
                resolve(window.jsPDF);
                return;
            }

            // Carrega a biblioteca dinamicamente
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                if (window.jspdf && window.jspdf.jsPDF) {
                    resolve(window.jspdf.jsPDF);
                } else if (window.jsPDF) {
                    resolve(window.jsPDF);
                } else {
                    reject(new Error('jsPDF não pôde ser carregado'));
                }
            };
            script.onerror = () => reject(new Error('Erro ao carregar jsPDF'));
            document.head.appendChild(script);
        });
    }

    async generatePDF() {
        // Atualiza o estado visual do botão
        this.generatePdfBtn.classList.add('loading');
        this.generatePdfBtn.disabled = true;
        this.generatePdfBtn.textContent = 'Carregando biblioteca...';

        try {
            // Carrega jsPDF se necessário
            const jsPDF = await this.loadJsPDF();
            
            this.generatePdfBtn.textContent = 'Gerando PDF...';

            // Aguarda um momento para o feedback visual
            await new Promise(resolve => setTimeout(resolve, 500));

            // Cria o documento PDF
            const doc = new jsPDF();

            // Coleta dados do formulário
            const formData = this.collectFormData();

            // Configuração do PDF
            const margin = 20;
            const pageWidth = doc.internal.pageSize.width;
            const maxWidth = pageWidth - (margin * 2);
            let yPosition = margin;

            // Função auxiliar para adicionar nova página se necessário
            const checkPageBreak = (neededHeight = 10) => {
                if (yPosition + neededHeight > doc.internal.pageSize.height - margin) {
                    doc.addPage();
                    yPosition = margin;
                }
            };

            // Função auxiliar para adicionar texto com quebra de linha
            const addWrappedText = (text, x, y, maxWidth, fontSize = 10) => {
                doc.setFontSize(fontSize);
                const lines = doc.splitTextToSize(text, maxWidth);
                doc.text(lines, x, y);
                return lines.length * (fontSize * 0.35);
            };

            // Cabeçalho
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text('Checklist Completo para Criação de Site Profissional', margin, yPosition);
            yPosition += 10;

            // Informações da empresa e data
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            const today = new Date().toLocaleDateString('pt-BR');
            doc.text(`Data: ${today}`, margin, yPosition);
            yPosition += 8;

            if (formData['nome-empresa']) {
                doc.text(`Empresa: ${formData['nome-empresa']}`, margin, yPosition);
                yPosition += 8;
            }

            yPosition += 5;

            // Resumo do progresso
                        doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('Resumo do Progresso', margin, yPosition);
            yPosition += 8;

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            const totalPercentage = Math.round((this.completedFields / this.totalFields) * 100);
            doc.text(`Progresso Geral: ${totalPercentage}% (${this.completedFields}/${this.totalFields} itens)`, margin, yPosition);
            yPosition += 10;

            // Resumos das seções
            const sectionNames = {
                'info-basicas': 'Informações Básicas',
                'identidade-visual': 'Identidade Visual',
                'estrutura-layout': 'Estrutura e Layout',
                'responsividade': 'Responsividade',
                'acessibilidade': 'Acessibilidade',
                'performance': 'Performance',
                'seo': 'SEO',
                'seguranca': 'Segurança',
                'testes': 'Testes',
                'pos-lancamento': 'Pós-Lançamento'
            };

            Object.entries(this.sectionData).forEach(([sectionId, data]) => {
                const percentage = Math.round((data.completed / data.total) * 100);
                const sectionName = sectionNames[sectionId] || sectionId;
                doc.text(`${sectionName}: ${percentage}% (${data.completed}/${data.total})`, margin + 10, yPosition);
                yPosition += 6;
            });

            yPosition += 10;
            checkPageBreak(20);

            // Seções detalhadas
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Detalhamento por Seção', margin, yPosition);
            yPosition += 12;

            // Processa cada seção
            this.accordionHeaders.forEach((header) => {
                const sectionId = header.getAttribute('aria-controls');
                const sectionTitle = header.querySelector('.section-title').textContent;
                const sectionNumber = header.querySelector('.section-number').textContent;

                checkPageBreak(20);

                // Cabeçalho da seção
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text(`${sectionNumber}. ${sectionTitle}`, margin, yPosition);
                yPosition += 10;

                // Campos da seção
                const sectionElement = document.getElementById(sectionId);
                const fields = sectionElement.querySelectorAll('input, select, textarea');

                doc.setFontSize(9);
                doc.setFont(undefined, 'normal');

                fields.forEach(field => {
                    checkPageBreak(8);

                    const label = this.getFieldLabel(field);
                    let value = '';
                    let status = '';

                    if (field.type === 'checkbox') {
                        status = field.checked ? ' ✓' : ' ✗';
                        value = field.checked ? 'Sim' : 'Não';
                    } else {
                        value = field.value || 'Não preenchido';
                        status = field.value ? ' ✓' : ' ✗';
                    }

                    const text = `${status} ${label}: ${value}`;
                    const textHeight = addWrappedText(text, margin + 5, yPosition, maxWidth - 5, 9);
                    yPosition += textHeight + 2;
                });

                yPosition += 8;
            });

            // Rodapé em todas as páginas
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setFont(undefined, 'normal');
                doc.text(
                    `Página ${i} de ${pageCount} - Checklist Profissional`,
                    margin,
                    doc.internal.pageSize.height - 10
                );
            }

            // Salva o PDF
            const fileName = `checklist-site-profissional-${today.replace(/\//g, '-')}.pdf`;
            doc.save(fileName);

            // Feedback de sucesso
            this.showNotification('PDF gerado com sucesso!', 'success');

        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            let errorMessage = 'Erro ao gerar o PDF. ';
            
            if (error.message.includes('jsPDF')) {
                errorMessage += 'Problema ao carregar a biblioteca. Verifique sua conexão com a internet.';
            } else {
                errorMessage += 'Tente novamente em alguns instantes.';
            }
            
            this.showNotification(errorMessage, 'error');
        } finally {
            // Restaura o estado do botão
            this.generatePdfBtn.classList.remove('loading');
            this.generatePdfBtn.disabled = false;
            this.generatePdfBtn.textContent = '📄 Gerar PDF';
        }
    }

    // Função para exibir notificações
    showNotification(message, type = 'info') {
        // Remove notificação existente se houver
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease;
        `;

        // Define cores baseadas no tipo
        const colors = {
            success: '#32b8c6',
            error: '#ff5459',
            warning: '#e68161',
            info: '#6c7477'
        };

        notification.style.backgroundColor = colors[type] || colors.info;

        // Adiciona ao documento
        document.body.appendChild(notification);

        // Remove após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    collectFormData() {
        const formData = {};
        const inputs = this.form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                formData[input.name] = input.checked;
            } else {
                formData[input.name] = input.value;
            }
        });

        return formData;
    }

    getFieldLabel(field) {
        // Tenta encontrar label pelo atributo 'for'
        let label = document.querySelector(`label[for="${field.id}"]`);

        if (!label) {
            // Tenta encontrar label pai
            label = field.closest('label');
        }

        if (!label) {
            // Tenta encontrar label irmão anterior
            let prev = field.previousElementSibling;
            while (prev && prev.tagName !== 'LABEL') {
                prev = prev.previousElementSibling;
            }
            label = prev;
        }

        if (label) {
            // Remove o ícone de help do texto do label
            const labelText = label.cloneNode(true);
            const helpIcon = labelText.querySelector('.help-icon');
            if (helpIcon) {
                helpIcon.remove();
            }
            return labelText.textContent.replace(/\s*\*\s*$/, '').trim();
        }

        // Fallback para nome ou id do campo
        return field.name || field.id || 'Campo sem nome';
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ChecklistApp();
});

// Adiciona estilos para animação de notificação e tooltips
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    /* Estilos para ícones de help */
    .help-icon {
        background: none;
        border: none;
        color: var(--color-primary);
        cursor: pointer;
        padding: 4px;
        margin-left: 8px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        vertical-align: middle;
        line-height: 1;
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    }

    .help-icon:hover {
        background-color: var(--color-primary);
        color: var(--color-background);
        transform: scale(1.1);
    }

    .help-icon:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
        background-color: var(--color-primary);
        color: var(--color-background);
    }

    .help-icon svg {
        width: 16px;
        height: 16px;
        pointer-events: none;
    }

    /* Estilos para tooltips */
    .tooltip {
        position: absolute;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        padding: 0;
        max-width: 420px;
        min-width: 320px;
        z-index: 10000;
        animation: tooltipFadeIn 0.3s ease;
        font-family: var(--font-family-base);
    }

    @keyframes tooltipFadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .tooltip-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid var(--color-border);
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
        border-radius: 12px 12px 0 0;
    }

    .tooltip-title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--color-background);
        line-height: 1.3;
    }

    .tooltip-close {
        background: none;
        border: none;
        color: var(--color-background);
        cursor: pointer;
        padding: 6px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        opacity: 0.8;
    }

    .tooltip-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
        opacity: 1;
        transform: scale(1.1);
    }

    .tooltip-close:focus {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: 2px;
    }

    .tooltip-close svg {
        width: 16px;
        height: 16px;
        pointer-events: none;
    }

    .tooltip-content {
        padding: 20px;
    }

    .tooltip-description {
        margin: 0 0 16px 0;
        color: var(--color-text);
        font-size: 14px;
        line-height: 1.6;
        font-weight: 400;
    }

    .tooltip-example,
    .tooltip-tips {
        margin: 16px 0 0 0;
        padding: 14px 16px;
        border-radius: 8px;
        font-size: 13px;
        line-height: 1.5;
        border-left: 4px solid;
    }

    .tooltip-example {
        background-color: rgba(var(--color-success-rgb), 0.08);
        border-color: var(--color-success);
        border-left-color: var(--color-success);
    }

    .tooltip-example strong {
        color: var(--color-success);
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .tooltip-tips {
        background-color: rgba(var(--color-warning-rgb), 0.08);
        border-color: var(--color-warning);
        border-left-color: var(--color-warning);
    }

    .tooltip-tips strong {
        color: var(--color-warning);
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .tooltip-example p,
    .tooltip-tips p {
        margin: 8px 0 0 0;
        color: var(--color-text);
        font-weight: 400;
    }

    /* Melhor integração com labels */
    .form-label {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 8px;
    }

    .checkbox-label {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        cursor: pointer;
        font-size: 14px;
        line-height: 1.5;
        padding: 4px 0;
    }

    .checkbox-label .help-icon {
        margin-left: 8px;
        margin-top: 2px;
        align-self: flex-start;
    }

    /* Responsividade para tooltips */
    @media (max-width: 768px) {
        .tooltip {
            max-width: 90vw;
            min-width: 280px;
            left: 5vw !important;
            right: 5vw !important;
            margin: 0 auto;
        }

        .tooltip-header {
            padding: 12px 16px;
        }

        .tooltip-title {
            font-size: 15px;
        }

        .tooltip-content {
            padding: 16px;
        }
    }

    @media (max-width: 480px) {
        .tooltip {
            max-width: 95vw;
            min-width: 260px;
            left: 2.5vw !important;
            right: 2.5vw !important;
        }
        
        .tooltip-content {
            padding: 14px;
        }
        
        .tooltip-example,
        .tooltip-tips {
            padding: 12px;
            font-size: 12px;
        }

        .tooltip-description {
            font-size: 13px;
        }

        .help-icon {
            width: 22px;
            height: 22px;
            margin-left: 6px;
        }

        .help-icon svg {
            width: 14px;
            height: 14px;
        }
    }

    /* Melhorias de acessibilidade */
    .tooltip:focus {
        outline: 3px solid var(--color-primary);
        outline-offset: 2px;
    }

    /* Animação suave para hover nos help icons */
    .help-icon {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Overlay sutil quando tooltip está aberto */
    .tooltip::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.1);
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        animation: overlayFadeIn 0.3s ease forwards;
    }

    @keyframes overlayFadeIn {
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Adiciona helpers de acessibilidade por teclado
document.addEventListener('keydown', (e) => {
    // Pula para o conteúdo principal com Alt+M
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        document.querySelector('.main')?.focus();
    }
});

// Adiciona feedback visual para interações de formulário
document.addEventListener('change', (e) => {
    if (e.target.matches('input, select, textarea')) {
        // Adiciona animação sutil para mostrar que o campo foi atualizado
        e.target.style.transform = 'scale(1.02)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

// Previne submissão do formulário
document.addEventListener('submit', (e) => {
    if (e.target.id === 'checklistForm') {
        e.preventDefault();
        return false;
    }
});

// Exporta funcionalidade para uso futuro potencial
window.ChecklistApp = ChecklistApp;
            
                
