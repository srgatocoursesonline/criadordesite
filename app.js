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

        // Dados de help COMPLETOS para todos os campos
        this.helpData = {
            // ===== INFORMAÇÕES BÁSICAS DO PROJETO =====
            'nome-empresa': {
                title: 'Nome da Empresa',
                description: 'Nome oficial da empresa ou marca que será representada no site. Este será o nome principal que aparecerá em todo o site.',
                example: 'Exemplos: "TechSolutions Ltda", "Padaria do João", "Consultoria Digital Pro", "Clínica Vida Saudável"',
                tips: 'Use o nome completo e oficial da empresa. Este nome aparecerá no título do site, rodapé, metadados e certificados SSL. Evite abreviações muito técnicas.'
            },
            'setor-atuacao': {
                title: 'Setor de Atuação',
                description: 'Área de negócio ou mercado específico em que a empresa atua. Esta informação ajuda a personalizar o design e funcionalidades.',
                example: 'Exemplos: "Tecnologia da Informação", "Alimentação e Bebidas", "Consultoria Empresarial", "E-commerce de Moda", "Serviços de Saúde", "Educação Online"',
                tips: 'Seja específico para ajudar na personalização do design, cores, linguagem e funcionalidades do site. Isso influencia desde o tom de comunicação até os recursos necessários.'
            },
            'publico-alvo': {
                title: 'Público-Alvo',
                description: 'Descrição detalhada do público que o site pretende atingir, incluindo características demográficas e comportamentais.',
                example: 'Exemplos: "Empresas de médio porte (50-200 funcionários)", "Jovens de 18-35 anos interessados em tecnologia", "Profissionais de TI e desenvolvedores", "Mães de 25-45 anos", "Pequenos empresários do varejo"',
                tips: 'Inclua faixa etária, poder aquisitivo, interesses, comportamento online, dispositivos mais usados e necessidades específicas. Quanto mais detalhado, melhor será a personalização.'
            },
            'objetivo-principal': {
                title: 'Objetivo Principal',
                description: 'Principal meta que o site deve alcançar para o negócio. Define toda a estratégia de desenvolvimento e métricas de sucesso.',
                example: 'Opções: Geração de Leads, Vendas Online, Divulgação da Marca, Suporte ao Cliente, Educação/Informação, Captação de Investidores',
                tips: 'Defina um objetivo claro e mensurável. Isso orientará todas as decisões de design, funcionalidades, call-to-actions e métricas de acompanhamento.'
            },
            'url-desejada': {
                title: 'URL Desejada',
                description: 'Endereço web preferido para o site (nome do domínio). Deve ser memorável e relacionado ao negócio.',
                example: 'Exemplos: "www.minhaempresa.com.br", "loja.exemplo.com", "consultoria-digital.com", "clinicavidasaudavel.com.br"',
                tips: 'Verifique disponibilidade antes de decidir. Prefira nomes curtos, fáceis de lembrar, sem hífens excessivos e relacionados ao negócio. Considere extensões .com.br para Brasil.'
            },
            'data-entrega': {
                title: 'Data de Entrega',
                description: 'Prazo desejado para conclusão e lançamento do site. Deve considerar complexidade e recursos disponíveis.',
                example: 'Considere: Site simples (2-4 semanas), Site médio (1-2 meses), E-commerce (2-4 meses), Site complexo (3-6 meses)',
                tips: 'Seja realista com o prazo. Inclua tempo para desenvolvimento, testes, correções, treinamento e ajustes. Sites complexos podem precisar de mais tempo para garantir qualidade.'
            },

            // ===== IDENTIDADE VISUAL E BRANDING =====
            'logo-empresa': {
                title: 'Logo da Empresa',
                description: 'Logotipo oficial da empresa em formato vetorial de alta qualidade. Elemento central da identidade visual.',
                example: 'Formatos ideais: SVG, AI, EPS, PDF. Também aceita PNG/JPG em alta resolução (mínimo 300 DPI)',
                tips: 'Forneça versões em diferentes cores (colorida, branca, preta), orientações (horizontal, vertical) e tamanhos. Se não tem logo, considere criar antes do site.'
            },
            'manual-marca': {
                title: 'Manual da Marca',
                description: 'Documento que define padrões visuais, cores, tipografia e aplicações corretas da marca.',
                example: 'Inclui: paleta de cores com códigos, fontes oficiais, espaçamentos mínimos, usos corretos e incorretos do logo, aplicações em diferentes fundos',
                tips: 'Se não existe, considere criar um guia básico com cores principais, fontes e regras de uso do logo. Isso garante consistência visual.'
            },
            'paleta-cores': {
                title: 'Paleta de Cores',
                description: 'Cores oficiais da marca definidas em códigos hexadecimais precisos para uso no site.',
                example: 'Exemplo: Azul Principal #1E40AF, Azul Secundário #3B82F6, Branco #FFFFFF, Cinza Escuro #374151, Cinza Claro #F3F4F6',
                tips: 'Inclua cores primárias, secundárias e neutras. Use ferramentas como Adobe Color, Coolors.co para harmonização. Teste acessibilidade das combinações.'
            },
            'cor-primaria': {
                title: 'Cor Primária',
                description: 'Cor principal da marca que será usada em elementos de destaque, botões e links principais.',
                example: 'Exemplos: #1E40AF (azul corporativo), #DC2626 (vermelho vibrante), #059669 (verde confiança), #7C3AED (roxo inovação)',
                tips: 'Escolha uma cor que represente a personalidade da marca e tenha boa legibilidade em fundos claros e escuros. Teste em diferentes dispositivos.'
            },
            'cor-secundaria': {
                title: 'Cor Secundária',
                description: 'Cor complementar que será usada em elementos secundários, hover states e variações.',
                example: 'Deve complementar a cor primária. Se primária é azul #1E40AF, secundária pode ser #3B82F6 (azul mais claro) ou #F59E0B (laranja complementar)',
                tips: 'Deve harmonizar com a cor primária mas ter contraste suficiente. Use teoria das cores: complementares, análogas ou tríades.'
            },
            'cores-neutras': {
                title: 'Cores Neutras',
                description: 'Paleta de cinzas e cores neutras para textos, fundos e elementos de interface.',
                example: 'Exemplo: Preto #000000, Cinza Escuro #374151, Cinza Médio #6B7280, Cinza Claro #D1D5DB, Branco #FFFFFF',
                tips: 'Essencial para legibilidade e hierarquia visual. Inclua pelo menos 5 tons: do mais escuro ao mais claro. Teste contraste com WCAG.'
            },
            'cor-destaque': {
                title: 'Cor de Destaque',
                description: 'Cor especial para chamar atenção em elementos importantes como promoções, alertas ou call-to-actions especiais.',
                example: 'Exemplos: #F59E0B (laranja energia), #EF4444 (vermelho urgência), #10B981 (verde sucesso), #8B5CF6 (roxo premium)',
                tips: 'Use com moderação para não perder o impacto. Ideal para botões de conversão, ofertas especiais e elementos que precisam se destacar.'
            },
            'tipografia-principal': {
                title: 'Tipografia Principal',
                description: 'Fonte principal que será usada nos títulos, headings e elementos de destaque do site.',
                example: 'Exemplos: "Roboto" (moderna), "Open Sans" (amigável), "Montserrat" (elegante), "Poppins" (jovem), "Playfair Display" (sofisticada)',
                tips: 'Escolha fontes legíveis que reflitam a personalidade da marca. Considere fontes do Google Fonts para carregamento rápido. Teste em diferentes tamanhos.'
            },
            'tipografia-secundaria': {
                title: 'Tipografia Secundária',
                description: 'Fonte complementar para textos corridos, parágrafos e elementos de interface.',
                example: 'Exemplos: "Inter" (legível), "Source Sans Pro" (profissional), "Lato" (amigável), "Nunito Sans" (moderna), "System UI" (nativa)',
                tips: 'Deve complementar a fonte principal e garantir excelente legibilidade em textos longos. Priorize legibilidade sobre estilo decorativo.'
            },
            'estilo-visual': {
                title: 'Estilo Visual',
                description: 'Abordagem visual geral que o site deve seguir, definindo o mood e personalidade visual.',
                example: 'Opções: Moderno e Minimalista, Corporativo e Profissional, Criativo e Ousado, Elegante e Sofisticado, Descontraído e Amigável, Industrial e Tecnológico',
                tips: 'Considere o público-alvo, setor de atuação e objetivos. Colete referências visuais de sites admirados. Mantenha consistência em todo o projeto.'
            },
            'referencias-visuais': {
                title: 'Referências Visuais',
                description: 'Sites, designs ou elementos visuais que servem de inspiração para o projeto.',
                example: 'Inclua: URLs de sites admirados, capturas de tela, elementos específicos (layouts, animações, cores), estilos de fotografia',
                tips: 'Inclua referências do mesmo setor e de outros que tenham elementos interessantes. Explique o que especificamente admira em cada referência.'
            },
                        // ===== ESTRUTURA E LAYOUT =====
            'tipo-site': {
                title: 'Tipo de Site',
                description: 'Categoria principal que melhor define o site a ser desenvolvido, determinando funcionalidades e estrutura base.',
                example: 'Opções: Site Institucional, E-commerce, Blog/Portal de Conteúdo, Portfólio, Landing Page, Sistema Web, Site de Serviços',
                tips: 'A escolha define a arquitetura base, funcionalidades necessárias, plugins e tempo de desenvolvimento. Seja específico sobre as necessidades.'
            },
            'paginas-principais': {
                title: 'Páginas Principais',
                description: 'Lista das páginas essenciais que o site deve conter para atender os objetivos do negócio.',
                example: 'Exemplos: Home, Sobre Nós, Produtos/Serviços, Portfólio, Blog, Contato, FAQ, Política de Privacidade, Termos de Uso',
                tips: 'Pense na jornada do usuário desde a chegada até a conversão. Inclua páginas obrigatórias por lei (privacidade, termos) e páginas que geram confiança.'
            },
            'menu-navegacao': {
                title: 'Menu de Navegação',
                description: 'Estrutura e organização do menu principal do site, definindo como os usuários navegarão.',
                example: 'Tipos: Menu Horizontal Superior, Menu Vertical Lateral, Menu Hambúrguer (mobile), Mega Menu (muitas opções), Menu Fixo (sticky)',
                tips: 'Mantenha simplicidade com máximo de 7 itens principais. Use submenus para organizar. Considere comportamento em mobile e desktop.'
            },
            'layout-preferido': {
                title: 'Layout Preferido',
                description: 'Estrutura visual e organização dos elementos na página, definindo como o conteúdo será apresentado.',
                example: 'Opções: Layout em Grid, Uma Coluna Central, Duas Colunas (conteúdo + sidebar), Layout Assimétrico, Design Minimalista, Layout Magazine',
                tips: 'Considere o tipo de conteúdo, público-alvo e como o usuário consumirá a informação. Teste em diferentes dispositivos.'
            },
            'call-to-action': {
                title: 'Call-to-Action Principal',
                description: 'Ação principal que você quer que os visitantes realizem no site. Define conversões e métricas de sucesso.',
                example: 'Exemplos: "Entre em Contato", "Solicite Orçamento", "Compre Agora", "Cadastre-se Grátis", "Baixe o E-book", "Agende Consulta"',
                tips: 'Use verbos no imperativo, seja específico sobre o benefício, crie urgência quando apropriado. Teste diferentes versões para otimizar conversões.'
            },
            'formularios-necessarios': {
                title: 'Formulários Necessários',
                description: 'Tipos de formulários que o site deve incluir para captar leads e facilitar interações.',
                example: 'Tipos: Contato Simples, Orçamento Detalhado, Newsletter, Cadastro de Usuário, Pesquisa de Satisfação, Agendamento, Upload de Arquivos',
                tips: 'Mantenha formulários simples, solicite apenas informações essenciais, use validação em tempo real e confirme submissões.'
            },
            'funcionalidades-especiais': {
                title: 'Funcionalidades Especiais',
                description: 'Recursos específicos e personalizados que o site precisa ter além das funcionalidades padrão.',
                example: 'Exemplos: Chat Online, Calculadora de Preços, Sistema de Agendamento, Galeria de Fotos, Área do Cliente, Integração com CRM',
                tips: 'Liste todas as funcionalidades específicas do seu negócio. Considere integrações com sistemas existentes e automações necessárias.'
            },
            'integracao-sistemas': {
                title: 'Integração com Sistemas',
                description: 'Sistemas externos que precisam se conectar com o site para troca de dados e automações.',
                example: 'Exemplos: CRM (HubSpot, RD Station), E-mail Marketing (Mailchimp), ERP, WhatsApp Business, Google Analytics, Facebook Pixel',
                tips: 'Verifique APIs disponíveis, custos de integração e necessidade de sincronização em tempo real. Documente fluxos de dados.'
            },
            'area-restrita': {
                title: 'Área Restrita',
                description: 'Se o site precisa de áreas com acesso controlado por login e senha para usuários específicos.',
                example: 'Tipos: Área do Cliente, Portal do Parceiro, Dashboard Administrativo, Conteúdo Premium, Curso Online',
                tips: 'Defina níveis de acesso, funcionalidades de cada área, processo de cadastro e recuperação de senha. Considere segurança e LGPD.'
            },

            // ===== RESPONSIVIDADE =====
            'dispositivos-prioritarios': {
                title: 'Dispositivos Prioritários',
                description: 'Tipos de dispositivos mais importantes para o público-alvo, definindo prioridades de otimização.',
                example: 'Dispositivos: Desktop (1920px+), Laptop (1366px), Tablet (768px-1024px), Smartphone (320px-768px), Smart TV',
                tips: 'Use dados do Google Analytics se já tem site, ou pesquise hábitos do seu público. Mobile-first é tendência atual.'
            },
            'breakpoints-personalizados': {
                title: 'Breakpoints Personalizados',
                description: 'Pontos de quebra específicos onde o layout se adapta para diferentes tamanhos de tela.',
                example: 'Padrão: Mobile 320px-768px, Tablet 768px-1024px, Desktop 1024px-1440px, Large Desktop 1440px+',
                tips: 'Use breakpoints padrão do mercado para compatibilidade, mas ajuste conforme necessidades específicas do projeto.'
            },
            'comportamento-mobile': {
                title: 'Comportamento Mobile',
                description: 'Como o site deve se comportar especificamente em dispositivos móveis para melhor experiência.',
                example: 'Recursos: Menu Hambúrguer, Botões Touch-Friendly (44px+), Scroll Vertical, Gestos de Swipe, Click to Call, Teclado Otimizado',
                tips: 'Priorize experiência mobile-first. Considere dedos, telas menores, conexões mais lentas e contexto de uso móvel.'
            },
            'orientacao-tela': {
                title: 'Orientação de Tela',
                description: 'Como o site deve se comportar quando dispositivos móveis são rotacionados.',
                example: 'Comportamentos: Adaptar Layout Automaticamente, Manter Orientação Portrait, Otimizar para Landscape, Bloquear Rotação',
                tips: 'Teste em ambas orientações. Alguns conteúdos funcionam melhor em landscape (vídeos, tabelas) outros em portrait (leitura).'
            },

            // ===== ACESSIBILIDADE =====
            'nivel-wcag': {
                title: 'Nível WCAG',
                description: 'Nível de conformidade com as Diretrizes de Acessibilidade para Conteúdo Web, definindo inclusão digital.',
                example: 'Níveis: A (básico), AA (recomendado e legal), AAA (avançado). WCAG 2.1 AA é padrão internacional.',
                tips: 'WCAG 2.1 AA é recomendado e exigido por lei em muitos países. AAA é ideal para sites governamentais e de saúde.'
            },
            'recursos-acessibilidade': {
                title: 'Recursos de Acessibilidade',
                description: 'Funcionalidades específicas para melhorar a experiência de pessoas com deficiências.',
                example: 'Recursos: Alto Contraste, Aumento de Fonte, Navegação por Teclado, Leitor de Tela, Descrição de Imagens (Alt Text), Legendas em Vídeos',
                tips: 'Considere deficiências visuais, auditivas, motoras e cognitivas. Teste com leitores de tela e navegação apenas por teclado.'
            },
            'publico-pcd': {
                title: 'Público PcD',
                description: 'Se o site atende especificamente pessoas com deficiência ou tem obrigação legal de acessibilidade.',
                example: 'Obrigatório para: Sites Governamentais, Educacionais, Saúde, Empresas Públicas, E-commerce grandes',
                tips: 'Sites públicos e de grande alcance devem priorizar acessibilidade total. Considere certificação e auditorias especializadas.'
            },
            'contraste-cores': {
                title: 'Contraste de Cores',
                description: 'Verificação se as combinações de cores atendem aos padrões mínimos de contraste para legibilidade.',
                example: 'Padrões: Texto normal 4.5:1, Texto grande 3:1, Elementos gráficos 3:1. Use ferramentas como WebAIM Contrast Checker',
                tips: 'Teste todas as combinações de cores do site. Considere daltonismo e diferentes condições de iluminação.'
            },
            'navegacao-teclado': {
                title: 'Navegação por Teclado',
                description: 'Garantir que todas as funcionalidades sejam acessíveis usando apenas o teclado.',
                example: 'Teclas: Tab (navegar), Enter (ativar), Espaço (selecionar), Setas (menus), Esc (fechar). Indicadores visuais de foco',
                tips: 'Teste navegação completa sem mouse. Garanta ordem lógica de foco e indicadores visuais claros.'
            },
            'leitores-tela': {
                title: 'Leitores de Tela',
                description: 'Compatibilidade com softwares que leem o conteúdo da tela para pessoas com deficiência visual.',
                example: 'Leitores: NVDA, JAWS, VoiceOver (Mac), TalkBack (Android). Requer HTML semântico e ARIA labels',
                tips: 'Use HTML semântico, adicione alt text em imagens, labels em formulários e estrutura hierárquica clara.'
            },
            'tamanho-fonte': {
                title: 'Tamanho de Fonte',
                description: 'Definir tamanhos mínimos de fonte e possibilidade de ampliação para melhor legibilidade.',
                example: 'Mínimos: 16px para texto corrido, 14px para elementos de interface. Ampliação até 200% sem perda de funcionalidade',
                tips: 'Evite fontes muito pequenas. Permita zoom até 200%. Use unidades relativas (rem, em) para escalabilidade.'
            },

            // ===== PERFORMANCE =====
            'tempo-carregamento': {
                title: 'Tempo de Carregamento',
                description: 'Tempo máximo aceitável para carregamento completo das páginas, impactando experiência e SEO.',
                example: 'Metas: Ideal até 2 segundos, Bom até 3 segundos, Aceitável até 5 segundos. Mobile pode ser 1s mais lento',
                tips: 'Páginas que carregam em até 3 segundos têm melhor taxa de conversão. Use ferramentas como PageSpeed Insights para medir.'
            },
            'otimizacao-imagens': {
                title: 'Otimização de Imagens',
                description: 'Estratégias para reduzir o tamanho das imagens sem perder qualidade visual.',
                example: 'Técnicas: Formato WebP, Compressão, Lazy Loading, Responsive Images, CDN, Sprites CSS',
                tips: 'Imagens representam 60-70% do peso de uma página. Use ferramentas como TinyPNG, ImageOptim. Considere formatos modernos.'
            },
            'cdn-necessario': {
                title: 'CDN Necessário',
                description: 'Se o site precisa de uma rede de distribuição de conteúdo para melhorar velocidade global.',
                example: 'Recomendado para: Sites globais, E-commerce, Alta audiência, Muitas imagens/vídeos. Provedores: Cloudflare, AWS CloudFront',
                tips: 'CDN melhora velocidade para usuários distantes do servidor. Essencial para sites com audiência internacional.'
            },
            'cache-estrategia': {
                title: 'Estratégia de Cache',
                description: 'Como o site armazenará dados temporariamente para acelerar carregamentos futuros.',
                example: 'Tipos: Cache do Navegador, Cache do Servidor, Cache de CDN, Cache de Banco de Dados. Tempos: 1 ano para assets, 1 dia para HTML',
                tips: 'Configure cache adequadamente para balance entre performance e atualizações. Use versionamento para assets.'
            },
            'minificacao-codigo': {
                title: 'Minificação de Código',
                description: 'Processo de reduzir o tamanho dos arquivos CSS, JavaScript e HTML removendo espaços e comentários.',
                example: 'Ferramentas: Webpack, Gulp, Parcel para automação. Redução típica: 20-40% no tamanho dos arquivos',
                tips: 'Essencial para performance. Use ferramentas de build automáticas. Mantenha versões originais para desenvolvimento.'
            },
                        // ===== SEO (Search Engine Optimization) =====
            'palavras-chave': {
                title: 'Palavras-chave Principais',
                description: 'Termos que o público usa para encontrar seus produtos/serviços nos mecanismos de busca.',
                example: 'Exemplos: "consultoria digital São Paulo", "desenvolvimento web responsivo", "marketing online para PMEs", "clínica dermatológica Belo Horizonte"',
                tips: 'Use ferramentas como Google Keyword Planner, SEMrush, Ubersuggest. Foque em long-tail keywords com menos concorrência mas alta intenção.'
            },
            'concorrentes-seo': {
                title: 'Concorrentes SEO',
                description: 'Sites concorrentes que aparecem bem posicionados nos resultados de busca para suas palavras-chave.',
                example: 'Analise: URLs dos top 10 resultados, suas estratégias de conteúdo, palavras-chave que usam, estrutura de links',
                tips: 'Analise pelo menos 5 concorrentes principais. Veja suas estratégias de conteúdo, palavras-chave, backlinks e estrutura técnica.'
            },
            'meta-descriptions': {
                title: 'Meta Descriptions',
                description: 'Descrições que aparecem nos resultados de busca do Google, influenciando taxa de cliques.',
                example: 'Estrutura: "Palavra-chave + benefício + call-to-action". Máximo 160 caracteres. Ex: "Desenvolvimento web profissional em SP. Sites responsivos e otimizados. Orçamento grátis!"',
                tips: 'Seja persuasivo, inclua palavra-chave principal, benefício claro e call-to-action. É o "anúncio" gratuito do seu site no Google.'
            },
            'estrutura-urls': {
                title: 'Estrutura de URLs',
                description: 'Como as URLs das páginas serão organizadas para facilitar navegação e SEO.',
                example: 'Boas práticas: /servicos/desenvolvimento-web/, /blog/dicas-seo/, /contato/. Evite: /page?id=123, URLs muito longas',
                tips: 'Use URLs amigáveis, incluam palavras-chave, sejam descritivas e mantenham hierarquia lógica. Evite caracteres especiais.'
            },
            'sitemap-xml': {
                title: 'Sitemap XML',
                description: 'Arquivo que lista todas as páginas do site para facilitar indexação pelos mecanismos de busca.',
                example: 'Inclui: URLs de todas as páginas, data de modificação, frequência de atualização, prioridade relativa',
                tips: 'Gere automaticamente, atualize quando adicionar páginas, submeta ao Google Search Console e Bing Webmaster Tools.'
            },
            'robots-txt': {
                title: 'Arquivo Robots.txt',
                description: 'Arquivo que instrui os robôs dos mecanismos de busca sobre quais páginas podem ou não indexar.',
                example: 'Bloquear: /admin/, /carrinho/, /checkout/. Permitir: /blog/, /produtos/, /servicos/. Incluir sitemap',
                tips: 'Bloqueie páginas administrativas, de checkout, duplicadas. Sempre inclua referência ao sitemap XML.'
            },
            'schema-markup': {
                title: 'Schema Markup',
                description: 'Código estruturado que ajuda mecanismos de busca a entender melhor o conteúdo do site.',
                example: 'Tipos: Empresa (LocalBusiness), Produtos, Artigos, FAQ, Avaliações, Eventos, Receitas',
                tips: 'Use schema apropriado para seu tipo de negócio. Pode gerar rich snippets nos resultados de busca, melhorando CTR.'
            },
            'velocidade-seo': {
                title: 'Velocidade para SEO',
                description: 'Otimizações específicas de velocidade que impactam diretamente no ranking dos mecanismos de busca.',
                example: 'Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1. Use PageSpeed Insights para medir',
                tips: 'Google usa velocidade como fator de ranking. Foque em Core Web Vitals, otimize para mobile, use AMP se necessário.'
            },

            // ===== SEGURANÇA =====
            'certificado-ssl': {
                title: 'Certificado SSL',
                description: 'Certificado digital que garante conexão segura (HTTPS) entre usuário e servidor.',
                example: 'Tipos: Let\'s Encrypt (gratuito), DV (Domain Validated), OV (Organization Validated), EV (Extended Validation)',
                tips: 'Essencial para SEO, confiança e LGPD. Google penaliza sites sem HTTPS. EV é recomendado para e-commerce.'
            },
            'backup-automatico': {
                title: 'Backup Automático',
                description: 'Sistema de backup automático do site, banco de dados e arquivos para recuperação em emergências.',
                example: 'Frequências: Diário (sites dinâmicos), Semanal (sites estáticos), Mensal (arquivos). Mantenha múltiplas versões',
                tips: 'Configure backups automáticos, teste restauração regularmente, mantenha cópias em locais diferentes (nuvem + local).'
            },
            'firewall-waf': {
                title: 'Firewall/WAF',
                description: 'Web Application Firewall que protege contra ataques maliciosos, tentativas de invasão e vulnerabilidades.',
                example: 'Provedores: Cloudflare, Sucuri, ModSecurity, AWS WAF. Protege contra: SQL injection, XSS, DDoS, bots maliciosos',
                tips: 'WAF é essencial para sites com dados sensíveis, e-commerce, formulários. Configure regras específicas para seu tipo de site.'
            },
            'atualizacoes-seguranca': {
                title: 'Atualizações de Segurança',
                description: 'Plano para manter sistema, plugins e temas sempre atualizados com patches de segurança.',
                example: 'Cronograma: WordPress core (imediato), Plugins críticos (semanal), Temas (mensal), PHP/servidor (conforme necessário)',
                tips: 'Atualizações previnem 90% dos ataques. Teste em ambiente de desenvolvimento antes de aplicar em produção.'
            },
            'monitoramento-seguranca': {
                title: 'Monitoramento de Segurança',
                description: 'Sistema de monitoramento contínuo para detectar tentativas de invasão e atividades suspeitas.',
                example: 'Ferramentas: Wordfence, Sucuri Security, Malware Detection, Log Analysis, Uptime Monitoring',
                tips: 'Configure alertas em tempo real, monitore tentativas de login, scaneie malware regularmente, analise logs de acesso.'
            },

            // ===== TESTES =====
            'testes-dispositivos': {
                title: 'Testes em Dispositivos',
                description: 'Dispositivos reais onde o site será testado para garantir funcionamento perfeito.',
                example: 'Essenciais: iPhone (Safari), Android (Chrome), iPad, Laptop Windows, Desktop Mac. Diferentes tamanhos de tela',
                tips: 'Teste em dispositivos reais, não apenas emuladores. Inclua diferentes sistemas operacionais, navegadores e tamanhos de tela.'
            },
            'testes-navegadores': {
                title: 'Testes em Navegadores',
                description: 'Navegadores onde o site deve funcionar perfeitamente, considerando compatibilidade e funcionalidades.',
                example: 'Prioritários: Chrome (70%), Safari (15%), Firefox (8%), Edge (5%). Teste versões atuais e 1-2 anteriores',
                tips: 'Priorize navegadores mais usados pelo seu público. Verifique Google Analytics para dados específicos. Teste funcionalidades JavaScript.'
            },
            'testes-velocidade': {
                title: 'Testes de Velocidade',
                description: 'Ferramentas e métricas para medir e otimizar a velocidade de carregamento do site.',
                example: 'Ferramentas: Google PageSpeed Insights, GTmetrix, Pingdom, WebPageTest, Lighthouse. Metas: >90 no PageSpeed',
                tips: 'Teste regularmente, em diferentes horários e localizações. Foque em Core Web Vitals. Otimize baseado nos resultados.'
            },
            'testes-formularios': {
                title: 'Testes de Formulários',
                description: 'Verificação completa de todos os formulários do site para garantir funcionamento e entrega.',
                example: 'Teste: Validação de campos, mensagens de erro, confirmação de envio, recebimento de e-mails, integração com CRM',
                tips: 'Teste todos os cenários: campos obrigatórios, formatos inválidos, spam protection, notificações automáticas.'
            },
            'testes-seguranca': {
                title: 'Testes de Segurança',
                description: 'Verificações de segurança para identificar vulnerabilidades antes do lançamento.',
                example: 'Testes: SQL Injection, XSS, CSRF, Upload de arquivos, força bruta em login, exposição de dados sensíveis',
                tips: 'Use ferramentas como OWASP ZAP, realizar pentests, verificar configurações de servidor, testar backup/restore.'
            },
            'testes-acessibilidade': {
                title: 'Testes de Acessibilidade',
                description: 'Verificação de conformidade com padrões de acessibilidade e usabilidade para pessoas com deficiências.',
                example: 'Ferramentas: WAVE, axe DevTools, Lighthouse Accessibility, testes manuais com leitores de tela',
                tips: 'Teste navegação por teclado, contraste de cores, alt text em imagens, estrutura semântica, compatibilidade com leitores de tela.'
            },
            'testes-seo': {
                title: 'Testes de SEO',
                description: 'Verificação de elementos técnicos de SEO antes do lançamento para garantir boa indexação.',
                example: 'Verificar: Meta tags, estrutura de URLs, sitemap XML, robots.txt, schema markup, velocidade, mobile-friendly',
                tips: 'Use Google Search Console, teste rich snippets, verifique indexação, analise estrutura de links internos.'
            },

            // ===== PÓS-LANÇAMENTO =====
            'manutencao-preventiva': {
                title: 'Manutenção Preventiva',
                description: 'Plano de manutenção regular para manter o site funcionando perfeitamente e seguro.',
                example: 'Atividades: Atualizações de segurança, backup verification, monitoramento uptime, otimização performance, limpeza de spam',
                tips: 'Manutenção preventiva evita problemas maiores e custos de recuperação. Documente todas as atividades realizadas.'
            },
            'analytics-configuracao': {
                title: 'Configuração de Analytics',
                description: 'Ferramentas de análise para monitorar performance, comportamento dos usuários e conversões.',
                example: 'Essenciais: Google Analytics 4, Google Search Console, Facebook Pixel, Hotjar/Crazy Egg para heatmaps',
                tips: 'Configure desde o lançamento para ter dados históricos completos. Defina goals, eventos e conversões importantes.'
            },
            'estrategia-conteudo': {
                title: 'Estratégia de Conteúdo',
                description: 'Plano para criação e publicação regular de conteúdo para manter site ativo e melhorar SEO.',
                example: 'Atividades: Blog semanal, posts redes sociais, newsletters mensais, atualizações de produtos, cases de sucesso',
                tips: 'Conteúdo regular melhora SEO e mantém audiência engajada. Crie calendário editorial e mantenha consistência.'
            },
            'monitoramento-uptime': {
                title: 'Monitoramento de Uptime',
                description: 'Sistema para monitorar se o site está sempre online e funcionando corretamente.',
                example: 'Ferramentas: UptimeRobot, Pingdom, StatusCake. Alertas: E-mail, SMS, Slack quando site fica offline',
                tips: 'Configure monitoramento 24/7 com alertas imediatos. Monitore não só homepage mas páginas críticas como checkout.'
            },
            'plano-crescimento': {
                title: 'Plano de Crescimento',
                description: 'Estratégia para evolução do site conforme crescimento do negócio e novas necessidades.',
                example: 'Fases: Lançamento básico, adição de funcionalidades, otimizações baseadas em dados, expansão para novos mercados',
                tips: 'Planeje evolução baseada em métricas reais. Mantenha flexibilidade para adicionar funcionalidades conforme necessidade.'
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

    // Resto dos métodos da classe (setupAccordion, validateField, etc. - mantém os mesmos do código anterior)
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
        const focusableElements = this.form.querySelectorAll(
            'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
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

    async loadJsPDF() {
        return new Promise((resolve, reject) => {
            if (window.jspdf && window.jspdf.jsPDF) {
                resolve(window.jspdf.jsPDF);
                return;
            }

            if (window.jsPDF) {
                resolve(window.jsPDF);
                return;
            }

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
        this.generatePdfBtn.classList.add('loading');
        this.generatePdfBtn.disabled = true;
        this.generatePdfBtn.textContent = 'Carregando biblioteca...';

        try {
            const jsPDF = await this.loadJsPDF();
            this.generatePdfBtn.textContent = 'Gerando PDF...';
            await new Promise(resolve => setTimeout(resolve, 500));

            const doc = new jsPDF();
            const formData = this.collectFormData();
            const margin = 20;
            const pageWidth = doc.internal.pageSize.width;
            const maxWidth = pageWidth - (margin * 2);
            let yPosition = margin;

            const checkPageBreak = (neededHeight = 10) => {
                if (yPosition + neededHeight > doc.internal.pageSize.height - margin) {
                    doc.addPage();
                    yPosition = margin;
                }
            };

            const addWrappedText = (text, x, y, maxWidth, fontSize = 10) => {
                doc.setFontSize(fontSize);
                const lines = doc.splitTextToSize(text, maxWidth);
                doc.text(lines, x, y);
                return lines.length * (fontSize * 0.35);
            };

            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text('Checklist Completo para Criação de Site Profissional', margin, yPosition);
            yPosition += 10;

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

            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('Resumo do Progresso', margin, yPosition);
            yPosition += 8;

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            const totalPercentage = Math.round((this.completedFields / this.totalFields) * 100);
            doc.text(`Progresso Geral: ${totalPercentage}% (${this.completedFields}/${this.totalFields} itens)`, margin, yPosition);
            yPosition += 10;

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

            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Detalhamento por Seção', margin, yPosition);
            yPosition += 12;

            this.accordionHeaders.forEach((header) => {
                const sectionId = header.getAttribute('aria-controls');
                const sectionTitle = header.querySelector('.section-title').textContent;
                const sectionNumber = header.querySelector('.section-number').textContent;

                checkPageBreak(20);

                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text(`${sectionNumber}. ${sectionTitle}`, margin, yPosition);
                yPosition += 10;

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

            const fileName = `checklist-site-profissional-${today.replace(/\//g, '-')}.pdf`;
            doc.save(fileName);

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
            this.generatePdfBtn.classList.remove('loading');
            this.generatePdfBtn.disabled = false;
            this.generatePdfBtn.textContent = '📄 Gerar PDF';
        }
    }

    showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

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

        const colors = {
            success: '#32b8c6',
            error: '#ff5459',
            warning: '#e68161',
            info: '#6c7477'
        };

        notification.style.backgroundColor = colors[type] || colors.info;
        document.body.appendChild(notification);

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
        let label = document.querySelector(`label[for="${field.id}"]`);

        if (!label) {
            label = field.closest('label');
        }

        if (!label) {
            let prev = field.previousElementSibling;
            while (prev && prev.tagName !== 'LABEL') {
                prev = prev.previousElementSibling;
            }
            label = prev;
        }

        if (label) {
            const labelText = label.cloneNode(true);
            const helpIcon = labelText.querySelector('.help-icon');
            if (helpIcon) {
                helpIcon.remove();
            }
            return labelText.textContent.replace(/\s*\*\s*$/, '').trim();
        }

        return field.name || field.id || 'Campo sem nome';
    }
}

// Inicialização e estilos
document.addEventListener('DOMContentLoaded', () => {
    new ChecklistApp();
});

// Estilos CSS completos
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    .help-icon {
        background: none; border: none; color: var(--color-primary); cursor: pointer;
        padding: 4px; margin-left: 8px; border-radius: 50%; display: inline-flex;
        align-items: center; justify-content: center; transition: all 0.2s ease;
        vertical-align: middle; line-height: 1; width: 24px; height: 24px; flex-shrink: 0;
    }

    .help-icon:hover {
        background-color: var(--color-primary); color: var(--color-background); transform: scale(1.1);
    }

    .help-icon:focus {
        outline: 2px solid var(--color-primary); outline-offset: 2px;
        background-color: var(--color-primary); color: var(--color-background);
    }

    .help-icon svg { width: 16px; height: 16px; pointer-events: none; }

    .tooltip {
        position: absolute; background: var(--color-surface); border: 1px solid var(--color-border);
        border-radius: 12px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15); padding: 0;
        max-width: 420px; min-width: 320px; z-index: 10000; animation: tooltipFadeIn 0.3s ease;
        font-family: var(--font-family-base);
    }

    @keyframes tooltipFadeIn {
        from { opacity: 0; transform: translateY(-10px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .tooltip-header {
        display: flex; justify-content: space-between; align-items: center; padding: 16px 20px;
        border-bottom: 1px solid var(--color-border); border-radius: 12px 12px 0 0;
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
    }

    .tooltip-title {
        margin: 0; font-size: 16px; font-weight: 600; color: var(--color-background); line-height: 1.3;
    }

    .tooltip-close {
        background: none; border: none; color: var(--color-background); cursor: pointer;
        padding: 6px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
        transition: all 0.2s ease; opacity: 0.8;
    }

    .tooltip-close:hover {
        background-color: rgba(255, 255, 255, 0.2); opacity: 1; transform: scale(1.1);
    }

    .tooltip-close:focus {
        outline: 2px solid rgba(255, 255, 255, 0.5); outline-offset: 2px;
    }

    .tooltip-close svg { width: 16px; height: 16px; pointer-events: none; }

    .tooltip-content { padding: 20px; }

    .tooltip-description {
        margin: 0 0 16px 0; color: var(--color-text); font-size: 14px; line-height: 1.6; font-weight: 400;
    }

    .tooltip-example, .tooltip-tips {
        margin: 16px 0 0 0; padding: 14px 16px; border-radius: 8px; font-size: 13px;
        line-height: 1.5; border-left: 4px solid;
    }

    .tooltip-example {
        background-color: rgba(var(--color-success-rgb), 0.08); border-color: var(--color-success);
        border-left-color: var(--color-success);
    }

    .tooltip-example strong {
        color: var(--color-success); font-weight: 600; font-size: 12px;
        text-transform: uppercase; letter-spacing: 0.5px;
    }

    .tooltip-tips {
        background-color: rgba(var(--color-warning-rgb), 0.08); border-color: var(--color-warning);
        border-left-color: var(--color-warning);
    }

    .tooltip-tips strong {
        color: var(--color-warning); font-weight: 600; font-size: 12px;
        text-transform: uppercase; letter-spacing: 0.5px;
    }

    .tooltip-example p, .tooltip-tips p {
        margin: 8px 0 0 0; color: var(--color-text); font-weight: 400;
    }

    .form-label {
        display: flex; align-items: center; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;
    }

    .checkbox-label {
        display: flex; align-items: flex-start; gap: 12px; cursor: pointer;
        font-size: 14px; line-height: 1.5; padding: 4px 0;
    }

    .checkbox-label .help-icon { margin-left: 8px; margin-top: 2px; align-self: flex-start; }

    @media (max-width: 768px) {
        .tooltip {
            max-width: 90vw; min-width: 280px; left: 5vw !important; right: 5vw !important; margin: 0 auto;
        }
        .tooltip-header { padding: 12px 16px; }
        .tooltip-title { font-size: 15px; }
        .tooltip-content { padding: 16px; }
    }

    @media (max-width: 480px) {
        .tooltip {
            max-width: 95vw; min-width: 260px; left: 2.5vw !important; right: 2.5vw !important;
        }
        .tooltip-content { padding: 14px; }
        .tooltip-example, .tooltip-tips { padding: 12px; font-size: 12px; }
        .tooltip-description { font-size: 13px; }
        .help-icon { width: 22px; height: 22px; margin-left: 6px; }
        .help-icon svg { width: 14px; height: 14px; }
    }

    .tooltip:focus { outline: 3px solid var(--color-primary); outline-offset: 2px; }
    .help-icon { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
`;
document.head.appendChild(style);

// Event listeners adicionais
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        document.querySelector('.main')?.focus();
    }
});

document.addEventListener('change', (e) => {
    if (e.target.matches('input, select, textarea')) {
        e.target.style.transform = 'scale(1.02)';
        setTimeout(() => { e.target.style.transform = ''; }, 150);
    }
});

document.addEventListener('submit', (e) => {
    if (e.target.id === 'checklistForm') {
        e.preventDefault();
        return false;
    }
});

window.ChecklistApp = ChecklistApp;          

